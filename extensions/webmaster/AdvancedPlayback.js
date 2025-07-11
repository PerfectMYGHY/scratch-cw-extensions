// Name: AdvancedPlayback
// ID: advancedplaybackforsynthesizer
// Description: 高级音频播放功能，更偏向于合成器
// License: MIT
// Original: webmaster <https://www.scratch-cw.top/users/webmaster/>

(function (Scratch) {
    /**
     * 音频上下文
     * @type {null | AudioContext}
     */
    let audioContext = null;
    /**
     * 存储音频源的映射
     * @type {{
     *      [key: string]: {
     *          source: AudioBufferSourceNode,
     *          gainNode: GainNode,
     *          pannerNode: StereoPannerNode
     *      }
     * }}
     */
    let audioMap = {};
    /**
     * 音频缓存
     * @type {{ [key: string]: AudioBuffer }}
     */
    let audioCache = {};
    /**
     * 总音量控制节点
     * @type {null | GainNode}
     */
    let masterGainNode = null;
    /**
     * 记录总音量
     * @type {number}
     */
    let masterVolume = 1.0; // 确保 masterGainNode 的音量不会被覆盖

    /**
     * 播放指定ID的音频，从URL加载
     * @param {string} id 播放标志ID
     * @param {string} audioUrl 音频路径
     * @param {boolean} cache 是否缓存播放数据
     * @returns 无
     */
    function playFromURL(id, audioUrl, cache=true) {
        if (cache && audioCache[audioUrl]){
            const buffer = audioCache[audioUrl];
            const source = audioContext.createBufferSource();
            source.buffer = buffer;

            const gainNode = audioContext.createGain();  // 每个音频的独立音量控制
            const pannerNode = audioContext.createStereoPanner();  // 创建左右平衡控制节点
            gainNode.connect(pannerNode);  // 音量控制连接到平衡节点
            pannerNode.connect(masterGainNode);  // 平衡节点连接到总音量控制节点
            masterGainNode.gain.setValueAtTime(masterVolume, audioContext.currentTime);

            source.connect(gainNode);
            audioMap[id] = { source, gainNode, pannerNode }; // 存储每个音频的节点
            source.start();

            // 停止时清除音频
            source.onended = function() {
                delete audioMap[id];
            };
            return new Promise((resolve, reject) => {
                resolve();
            });
        }

        // 创建新的音频源
        return new Promise((resolve, reject) => {
            fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(data => {
                audioContext.decodeAudioData(data, (buffer) => {
                    const source = audioContext.createBufferSource();
                    source.buffer = buffer;

                    const gainNode = audioContext.createGain();  // 每个音频的独立音量控制
                    const pannerNode = audioContext.createStereoPanner();  // 创建左右平衡控制节点
                    gainNode.connect(pannerNode);  // 音量控制连接到平衡节点
                    pannerNode.connect(masterGainNode);  // 平衡节点连接到总音量控制节点
                    masterGainNode.gain.setValueAtTime(masterVolume, audioContext.currentTime);

                    source.connect(gainNode);
                    audioMap[id] = { source, gainNode, pannerNode }; // 存储每个音频的节点
                    source.start();

                    // 停止时清除音频
                    source.onended = function() {
                        delete audioMap[id];
                    };

                    resolve();
                });
            });
        })
    }

    /**
     * 将一个可能是ArrayBuffer或Uint8Array的数组转换为ArrayBuffer
     * @param {ArrayBuffer | Uint8Array} data 数据
     * @returns 转换后的ArrayBuffer
     */
    function ensureArrayBuffer(data) {
        if (data instanceof ArrayBuffer) {
            return data; // 已经是 ArrayBuffer，直接返回
        } else if (data instanceof Uint8Array) {
            return data.buffer; // 获取 Uint8Array 的底层 ArrayBuffer
        } else {
            throw new TypeError("Unsupported data type");
        }
    }

    /**
     * 获取数组的sha-256
     * @param {ArrayBuffer} buffer 要加密的数组
     * @returns 数组的sha-256
     */
    async function hashArrayBuffer(buffer) {
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    /**
     * 播放指定ID的音频，从ArrayBuffer加载
     * @param {string} id 播放标志ID
     * @param {ArrayBuffer | Uint8Array} arrayBuffer 音频数据
     * @returns 无
     */
    function playFromArrayBuffer(id, arrayBuffer) {
        // 创建新的音频源
        return new Promise((resolve, reject) => {
            audioContext.decodeAudioData(ensureArrayBuffer(arrayBuffer).slice(0), (buffer) => {
                const source = audioContext.createBufferSource();
                source.buffer = buffer;
    
                const gainNode = audioContext.createGain();  // 每个音频的独立音量控制
                const pannerNode = audioContext.createStereoPanner();  // 创建左右平衡控制节点
                gainNode.connect(pannerNode);  // 音量控制连接到平衡节点
                pannerNode.connect(masterGainNode);  // 平衡节点连接到总音量控制节点
                masterGainNode.gain.setValueAtTime(masterVolume, audioContext.currentTime);
    
                source.connect(gainNode);
                audioMap[id] = { source, gainNode, pannerNode }; // 存储每个音频的节点
                source.start();
    
                // 停止时清除音频
                source.onended = function() {
                    delete audioMap[id];
                };
                resolve();
            });
        })
    }

    /**
     * 切换播放速度
     * @param {string} id 播放ID
     * @param {number} speed 播放速度
     */
    function changeSpeed(id, speed) {
        if (audioMap[id]!=null) {
            const source = audioMap[id].source;
            source.playbackRate.setValueAtTime(speed, audioContext.currentTime);
        }
    }

    /**
     * 停止指定ID的音频
     * @param {string} id 播放ID
     */
    function stop(id) {
        if (audioMap[id]!=null) {
            audioMap[id].source.stop();
            delete audioMap[id];
        }
    }

    /**
     * 停止所有音频
     */
    function stopAll() {
        for (const id in audioMap) {
            audioMap[id].source.stop();
            delete audioMap[id];
        }
    }

    /**
     * 设置总音量
     * @param {number} volume 设置的音量
     */
    function setMasterVolume(volume) {
        masterVolume = volume;  // 存储新的音量
        masterGainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    }

    /**
     * 获取总音量
     * @returns 总音量
     */
    function getMasterVolume() {
        return masterVolume;
    }

    /**
     * 设置单个音频的音量
     * @param {string} id 播放ID
     * @param {number} volume 音量
     */
    function setVolume(id, volume) {
        if (audioMap[id]!=null) {
            audioMap[id].gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        }
    }

    /**
     * 在指定时间内平滑调整单个音频的音量
     * @param {string} id 播放ID
     * @param {number} targetVolume 到达音量
     * @param {number} duration 持续时长
     */
    function fadeVolume(id, targetVolume, duration) {
        if (audioMap[id]) {
            const now = audioContext.currentTime;
            audioMap[id].gainNode.gain.linearRampToValueAtTime(targetVolume, now + duration);
        }
    }

    /**
     * 获取单个音频的音量
     * @param {string} id 播放ID
     * @returns 当前播放ID的音量
     */
    function getVolume(id) {
        if (audioMap[id]!=null) {
            return audioMap[id].gainNode.gain.value;
        }
        return null;
    }

    /**
     * 设置单个音频的左右平衡
     * @param {string} id 播放ID
     * @param {number} panValue 左右平衡值
     */
    function setPan(id, panValue) {
        if (audioMap[id]!=null) {
            // panValue范围是-1到1, -1为左，1为右，0为中间
            audioMap[id].pannerNode.pan.setValueAtTime(panValue, audioContext.currentTime);
        }
    }

    /**
     * 获取单个音频的左右平衡
     * @param {string} id 播放ID
     * @returns 当前播放ID的左右平衡值
     */
    function getPan(id) {
        if (audioMap[id]!=null) {
            return audioMap[id].pannerNode.pan.value;
        }
        return null;
    }

    // ========================================

    /**
     * 积木图标数据
     * @type {string}
     */
    const iconURI = "";

    class AdvancedPlayback {
        constructor() {
            
        }

        getInfo() {
            return {
                id: "advancedplaybackforsynthesizer",
                name: Scratch.translate({
                    id: "apfs.name",
                    default: "高级音频播放"
                }),
                color1: "#CF63CF",
                color2: "#C94FC9",
                color3: "#BD42BD",
                menuIconURI: iconURI, // 菜单图标，在左侧积木分类栏显示
                blockIconURI: iconURI, // 积木图标，显示在积木最左侧
                blocks: [
                    {
                        opcode: "init",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.init.name",
                            default: "初始化音频播放对象"
                        }),
                    },
                    {
                        opcode: "playFromSprite",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.playFromSprite.name",
                            default: "并发播放音频 [AUDIO]，播放ID [ID]"
                        }),
                        arguments: {
                            "AUDIO": {
                                type: Scratch.ArgumentType.SOUND
                            },
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: "playFromURL",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.playFromURL.name",
                            default: "并发播放音频从URL [URL] 加载，播放ID [ID]"
                        }),
                        arguments: {
                            "URL": {
                                type: Scratch.ArgumentType.STRING
                            },
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: "setSpeed",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.setSpeed.name",
                            default: "设置播放ID为 [ID] 的线程的音调为 [SPEED]"
                        }),
                        arguments: {
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            },
                            "SPEED": {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        opcode: "setVolume",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.setVolume.name",
                            default: "设置播放ID为 [ID] 的线程的音量为 [VOLUME]%"
                        }),
                        arguments: {
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            },
                            "VOLUME": {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        opcode: "setVolumeForSomeTime",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.setVolumeForSomeTime.name",
                            default: "将播放ID为 [ID] 的线程的音量在 [TIME] 秒内滑行到 [VOLUME]%"
                        }),
                        arguments: {
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            },
                            "VOLUME": {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            "TIME": {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        opcode: "getVolume",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({
                            id: "apfs.getVolume.name",
                            default: "获取播放ID为 [ID] 的线程的音量"
                        }),
                        arguments: {
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: "setBLAR",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.setBLAR.name",
                            default: "设置播放ID为 [ID] 的线程的左右平衡为 [BLAR]"
                        }),
                        arguments: {
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            },
                            "BLAR": {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        opcode: "setAllVolume",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.setAllVolume.name",
                            default: "设置总音量为 [VOLUME]%"
                        }),
                        arguments: {
                            "VOLUME": {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        opcode: "getAllVolume",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({
                            id: "apfs.getAllVolume.name",
                            default: "获取当前总音量"
                        })
                    },
                    {
                        opcode: "stopPlay",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.stopPlay.name",
                            default: "停止播放ID为 [ID] 的线程的播放"
                        }),
                        arguments: {
                            "ID": {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: "stopAllPlay",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({
                            id: "apfs.stopAllPlay.name",
                            default: "停止所有播放"
                        })
                    }
                ]

            };
        }

        /**
         * 检查是否初始化过
         * @returns 是否初始化
         */
        _check(){
            return audioContext != null && masterGainNode != null;
        }

        /**
         * 初始化
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        init(args, util) {
            audioContext = new (window.AudioContext || window["webkitAudioContext"])();
            masterGainNode = audioContext.createGain();  // 创建总音量控制节点
            masterGainNode.connect(audioContext.destination);  // 连接到音频输出
        }


        /**
         * 根据声音名称获取声音数据
         * @param {VM.BlockUtility} util 工具对象
         * @param {string} name 声音名称
         */
        _getSoundByName(util, name) { // 一个被内部调用的方法，根据声音名称获取util中声音的数据对象
            const sounds = util.target.getSounds();
            for (const sound of sounds) {
                if (sound.name == name) {
                    return sound;
                }
            }
            return null;
        }

        /**
         * 从角色播放
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        async playFromSprite(args, util) {
            if (!this._check()){
                return;
            }
            var { AUDIO, ID } = args;
            const sound = this._getSoundByName(util, Scratch.Cast.toString(AUDIO)); // 获取音频对象
            // @ts-ignore
            await playFromArrayBuffer(Scratch.Cast.toString(ID), sound.asset.data); // data属性存在，但未标记
        }

        /**
         * 从URL播放
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        async playFromURL(args, util) {
            if (!this._check()){
                return;
            }
            var { URL, ID } = args;
            await playFromURL(Scratch.Cast.toString(ID), Scratch.Cast.toString(URL));
        }

        /**
         * 设置倍速
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        setSpeed(args, util){
            if (!this._check()){
                return;
            }
            var {ID, SPEED} = args;
            const speed = Math.pow(2, Scratch.Cast.toNumber(SPEED) / 120); // 将Scratch音调值转换为倍速值
            changeSpeed(Scratch.Cast.toString(ID), speed);
        }

        /**
         * 设置音量
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        setVolume(args, util){
            if (!this._check()){
                return;
            }
            var {ID, VOLUME} = args;
            setVolume(Scratch.Cast.toString(ID), Scratch.Cast.toNumber(VOLUME)/100);
        }

        /**
         * 在指定时间内滑行到音量
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        setVolumeForSomeTime(args, util){
            if (!this._check()){
                return;
            }
            var {ID, VOLUME, TIME} = args;
            fadeVolume(Scratch.Cast.toString(ID), Scratch.Cast.toNumber(VOLUME)/100, Scratch.Cast.toNumber(TIME));
        }

        /**
         * 获取音量
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         * @returns 音量值
         */
        getVolume(args, util){
            if (!this._check()){
                return;
            }
            var {ID} = args;
            return getVolume(Scratch.Cast.toString(ID))*100;
        }

        /**
         * 设置左右平衡
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        setBLAR(args, util){
            if (!this._check()){
                return;
            }
            var {ID, BLAR} = args;
            setPan(Scratch.Cast.toString(ID), Scratch.Cast.toNumber(BLAR)/100);
        }

        /**
         * 设置总音量
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        setAllVolume(args, util){
            if (!this._check()){
                return;
            }
            var {VOLUME} = args;
            setMasterVolume(Scratch.Cast.toNumber(VOLUME)/100);
        }

        /**
         * 获取总音量
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        getAllVolume(args, util){
            if (!this._check()){
                return;
            }
            return getMasterVolume()*100;
        }

        /**
         * 停止播放某个音频
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        stopPlay(args, util) {
            if (!this._check()){
                return;
            }
            var { ID } = args;
            stop(Scratch.Cast.toString(ID));
        }

        /**
         * 停止全部播放
         * @param {Record<string, string | number | boolean>} args 参数列表
         * @param {VM.BlockUtility} util 工具对象
         */
        stopAllPlay(args, util) {
            if (!this._check()){
                return;
            }
            stopAll();
        }
    }
    Scratch.extensions.register(new AdvancedPlayback());
})(Scratch);
