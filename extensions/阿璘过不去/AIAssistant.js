// Name: AI助手
// ID: aiAssistant
// Description: 提供语音识别、文本转语音、文本分析和简单AI聊天功能
// By: 阿璘过不去

(function (Scratch) {
    // 定义一些公用变量、函数
    const menuIconURI = "";
    const blockIconURI = "";

    class AIAssistant {
        constructor() {
            this.recognition = null;
            this.speechSynthesis = window.speechSynthesis;
            this.lastSpeechResult = "";
            this.isListening = false;
        }

        getInfo() {
            return {
                id: "aiAssistant",
                name: "AI助手",
                docsURI: "https://example.com/ai-assistant-docs",
                menuIconURI: menuIconURI,
                blockIconURI: blockIconURI,
                blocks: [
                    {
                        opcode: "startSpeechRecognition",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "开始语音识别"
                    },
                    {
                        opcode: "stopSpeechRecognition",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "停止语音识别"
                    },
                    {
                        opcode: "getSpeechText",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "识别的语音文本"
                    },
                    "---",
                    {
                        opcode: "speakText",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "朗读文本 [text]",
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "你好，世界！"
                            }
                        }
                    },
                    {
                        opcode: "stopSpeaking",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "停止朗读"
                    },
                    "---",
                    {
                        opcode: "analyzeText",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "分析文本 [text]",
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "这是一个示例文本"
                            }
                        }
                    },
                    {
                        opcode: "countWords",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "统计 [text] 的字数",
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello World"
                            }
                        }
                    },
                    "---",
                    {
                        opcode: "chatWithAI",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "AI回复 [message]",
                        arguments: {
                            message: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "你好"
                            }
                        }
                    },
                    "---",
                    {
                        opcode: "translateWord",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "翻译 [word] 为 [language]",
                        arguments: {
                            word: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hello"
                            },
                            language: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "languages"
                            }
                        }
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "状态检测"
                    },
                    {
                        opcode: "isListeningF",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "正在语音识别？"
                    },
                    {
                        opcode: "isSpeaking",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "正在朗读？"
                    }
                ],
                menus: {
                    languages: [
                        { text: "中文", value: "chinese" },
                        { text: "英文", value: "english" },
                        { text: "日文", value: "japanese" },
                        { text: "法文", value: "french" }
                    ]
                }
            };
        }

        // 开始语音识别
        startSpeechRecognition() {
            if (!('webkitSpeechRecognition' in window)) {
                console.log('浏览器不支持语音识别');
                return;
            }

            if (this.recognition) {
                this.recognition.stop();
            }

            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'zh-CN';

            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                this.lastSpeechResult = finalTranscript || interimTranscript;
            };

            this.recognition.onerror = (event) => {
                console.log('语音识别错误:', event.error);
            };

            this.recognition.start();
            this.isListening = true;
        }

        // 停止语音识别
        stopSpeechRecognition() {
            if (this.recognition) {
                this.recognition.stop();
                this.isListening = false;
            }
        }

        // 获取识别的语音文本
        getSpeechText() {
            return this.lastSpeechResult;
        }

        // 朗读文本
        speakText(args) {
            if (this.speechSynthesis.speaking) {
                this.speechSynthesis.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(args.text);
            utterance.lang = 'zh-CN';
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            this.speechSynthesis.speak(utterance);
        }

        // 停止朗读
        stopSpeaking() {
            if (this.speechSynthesis.speaking) {
                this.speechSynthesis.cancel();
            }
        }

        // 分析文本
        analyzeText(args) {
            const text = args.text;
            const wordCount = text.length;
            const hasQuestion = text.includes('?') || text.includes('？');
            const hasExclamation = text.includes('!') || text.includes('！');

            let analysis = `文本长度: ${wordCount} 字符`;
            if (hasQuestion) analysis += "，包含疑问";
            if (hasExclamation) analysis += "，包含感叹";

            return analysis;
        }

        // 统计字数
        countWords(args) {
            const text = args.text;
            return text.length;
        }

        // AI聊天回复
        chatWithAI(args) {
            const message = args.message.toLowerCase();
            const responses = {
                '你好': ['你好！', '嗨！', '很高兴见到你！'],
                '你叫什么名字': ['我是AI助手', '我叫小AI', '我是你的AI朋友'],
                '今天天气怎么样': ['今天天气不错', '看起来要下雨了', '阳光明媚的一天'],
                '再见': ['再见！', '下次再见！', '保重！'],
                '谢谢': ['不客气！', '很高兴能帮助您', '随时为您服务']
            };

            // 查找匹配的回复
            for (const [key, value] of Object.entries(responses)) {
                if (message.includes(key)) {
                    const randomIndex = Math.floor(Math.random() * value.length);
                    return value[randomIndex];
                }
            }

            // 默认回复
            const defaultResponses = [
                '很有趣的问题！',
                '我不太明白，能再说一遍吗？',
                '这个我需要学习一下',
                '让我们换个话题吧'
            ];
            const randomIndex = Math.floor(Math.random() * defaultResponses.length);
            return defaultResponses[randomIndex];
        }

        // 翻译单词
        translateWord(args) {
            const word = args.word.toLowerCase();
            const language = args.language;

            const dictionary = {
                'hello': { chinese: '你好', japanese: 'こんにちは', french: 'bonjour' },
                'goodbye': { chinese: '再见', japanese: 'さようなら', french: 'au revoir' },
                'thank you': { chinese: '谢谢', japanese: 'ありがとう', french: 'merci' },
                'yes': { chinese: '是', japanese: 'はい', french: 'oui' },
                'no': { chinese: '不', japanese: 'いいえ', french: 'non' },
                'cat': { chinese: '猫', japanese: '猫', french: 'chat' },
                'dog': { chinese: '狗', japanese: '犬', french: 'chien' }
            };

            if (dictionary[word] && dictionary[word][language]) {
                return dictionary[word][language];
            } else {
                return `无法翻译 "${word}"`;
            }
        }

        // 检查是否正在语音识别
        isListeningF() {
            return this.isListening;
        }

        // 检查是否正在朗读
        isSpeaking() {
            return this.speechSynthesis.speaking;
        }
    }

    Scratch.extensions.register(new AIAssistant());
})(Scratch);
