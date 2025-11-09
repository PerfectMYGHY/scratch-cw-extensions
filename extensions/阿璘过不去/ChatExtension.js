// Name: 联机聊天
// ID: OnlineChat
// Description: 实现Scratch项目间的实时联机聊天功能
// By: 阿璘过不去

(function (Scratch) {
    'use strict';

    // 定义一些公用变量
    const menuIconURI = "";
    const blockIconURI = "";

    class ChatExtension {
        constructor() {
            this.ws = null;
            this.connected = false;
            this.username = "匿名用户";
            this.userList = [];
            this.messageHistory = [];
            this.maxHistory = 50;
            this.defaultServer = "wss://echo.websocket.org"; // 公共WebSocket测试服务器
        }

        getInfo() {
            return {
                id: "OnlineChat",
                name: "联机聊天",
                docsURI: "https://github.com/your-repo/online-chat-extension",
                menuIconURI: menuIconURI,
                blockIconURI: blockIconURI,
                blocks: [
                    {
                        opcode: "connect",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "连接到聊天服务器 [server]",
                        arguments: {
                            server: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: this.defaultServer
                            }
                        }
                    },
                    {
                        opcode: "disconnect",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "断开连接"
                    },
                    {
                        opcode: "setUsername",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置用户名为 [username]",
                        arguments: {
                            username: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "匿名用户"
                            }
                        }
                    },
                    {
                        opcode: "sendMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "发送消息 [message]",
                        arguments: {
                            message: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "你好！"
                            }
                        }
                    },
                    "---",
                    {
                        opcode: "isConnected",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "已连接到服务器？"
                    },
                    {
                        opcode: "getUsername",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "我的用户名"
                    },
                    {
                        opcode: "getUserCount",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "在线用户数量"
                    },
                    {
                        opcode: "getUserList",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "在线用户列表"
                    },
                    {
                        opcode: "getLastMessage",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "最后收到的消息"
                    },
                    {
                        opcode: "getMessageSender",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "最后消息的发送者"
                    },
                    "---",
                    {
                        opcode: "whenMessageReceived",
                        blockType: Scratch.BlockType.HAT,
                        text: "当收到新消息",
                        isEdgeActivated: false
                    },
                    {
                        opcode: "whenUserJoined",
                        blockType: Scratch.BlockType.HAT,
                        text: "当用户加入聊天室",
                        isEdgeActivated: false
                    },
                    {
                        opcode: "whenUserLeft",
                        blockType: Scratch.BlockType.HAT,
                        text: "当用户离开聊天室",
                        isEdgeActivated: false
                    },
                    {
                        opcode: "whenConnected",
                        blockType: Scratch.BlockType.HAT,
                        text: "当连接成功",
                        isEdgeActivated: false
                    },
                    {
                        opcode: "whenDisconnected",
                        blockType: Scratch.BlockType.HAT,
                        text: "当连接断开",
                        isEdgeActivated: false
                    }
                ]
            };
        }

        // 连接到服务器
        connect(args) {
            if (this.connected) {
                console.log("已经连接到服务器");
                return;
            }

            const server = args.server || this.defaultServer;

            try {
                this.ws = new WebSocket(server);

                this.ws.onopen = () => {
                    this.connected = true;
                    console.log("成功连接到聊天服务器");
                    // 触发连接成功事件
                    this._triggerEvent("connected");

                    // 发送加入消息
                    this._sendJoinMessage();
                };

                this.ws.onmessage = (event) => {
                    this._handleMessage(event.data);
                };

                this.ws.onclose = () => {
                    this.connected = false;
                    console.log("连接已断开");
                    this._triggerEvent("disconnected");
                };

                this.ws.onerror = (error) => {
                    console.error("WebSocket错误:", error);
                    this.connected = false;
                };

            } catch (error) {
                console.error("连接失败:", error);
            }
        }

        // 断开连接
        disconnect() {
            if (this.ws) {
                this.ws.close();
                this.ws = null;
            }
            this.connected = false;
            this.userList = [];
        }

        // 设置用户名
        setUsername(args) {
            const newUsername = args.username.trim();
            if (newUsername && newUsername !== this.username) {
                this.username = newUsername;
                // 如果已连接，通知服务器用户名变更
                if (this.connected) {
                    this._sendJoinMessage();
                }
            }
        }

        // 发送消息
        sendMessage(args) {
            if (!this.connected || !this.ws) {
                console.log("未连接到服务器，无法发送消息");
                return;
            }

            const message = args.message.trim();
            if (!message) {
                console.log("消息不能为空");
                return;
            }

            const messageData = {
                type: "message",
                username: this.username,
                content: message,
                timestamp: Date.now()
            };

            try {
                this.ws.send(JSON.stringify(messageData));
            } catch (error) {
                console.error("发送消息失败:", error);
            }
        }

        // 发送加入消息
        _sendJoinMessage() {
            if (this.connected && this.ws) {
                const joinData = {
                    type: "join",
                    username: this.username,
                    timestamp: Date.now()
                };
                this.ws.send(JSON.stringify(joinData));
            }
        }

        // 处理接收到的消息
        _handleMessage(data) {
            try {
                const message = JSON.parse(data);

                switch (message.type) {
                    case "message":
                        this.messageHistory.push(message);
                        // 限制历史消息数量
                        if (this.messageHistory.length > this.maxHistory) {
                            this.messageHistory.shift();
                        }
                        this._triggerEvent("messageReceived");
                        break;

                    case "join":
                        if (!this.userList.includes(message.username)) {
                            this.userList.push(message.username);
                            this._triggerEvent("userJoined");
                        }
                        break;

                    case "leave":
                        const index = this.userList.indexOf(message.username);
                        if (index > -1) {
                            this.userList.splice(index, 1);
                            this._triggerEvent("userLeft");
                        }
                        break;

                    case "userlist":
                        if (Array.isArray(message.users)) {
                            this.userList = message.users;
                        }
                        break;
                }

            } catch (error) {
                console.error("解析消息失败:", error);
            }
        }

        // 触发事件
        _triggerEvent(eventName) {
            // 使用Scratch的事件系统触发相应事件
            if (Scratch.vm && Scratch.vm.runtime) {
                console.log("触发事件：", `OnlineChat_when${eventName[0].toUpperCase()+eventName.slice(1)}`);
                Scratch.vm.runtime.startHats(`OnlineChat_when${eventName[0].toUpperCase()+eventName.slice(1)}`);
            }
        }

        // 检查连接状态
        isConnected() {
            return this.connected;
        }

        // 获取用户名
        getUsername() {
            return this.username;
        }

        // 获取用户数量
        getUserCount() {
            return this.userList.length;
        }

        // 获取用户列表
        getUserList() {
            return this.userList.join(", ");
        }

        // 获取最后收到的消息
        getLastMessage() {
            if (this.messageHistory.length === 0) {
                return "";
            }
            const lastMessage = this.messageHistory[this.messageHistory.length - 1];
            return lastMessage.content || "";
        }

        // 获取最后消息的发送者
        getMessageSender() {
            if (this.messageHistory.length === 0) {
                return "";
            }
            const lastMessage = this.messageHistory[this.messageHistory.length - 1];
            return lastMessage.username || "";
        }

        // 事件处理函数
        whenMessageReceived() {
            return false; // 由_triggerEvent控制
        }

        whenUserJoined() {
            return false; // 由_triggerEvent控制
        }

        whenUserLeft() {
            return false; // 由_triggerEvent控制
        }

        whenConnected() {
            return false; // 由_triggerEvent控制
        }

        whenDisconnected() {
            return false; // 由_triggerEvent控制
        }
    }

    // 注册扩展
    Scratch.extensions.register(new ChatExtension());
})(Scratch);
