// Name: 代码翻译器
// ID: codeTranslator
// Description: 将C++、Python、Java等编程语言代码翻译成Scratch积木块
// By: 阿璘过不去

(function (Scratch) {
    const menuIconURI = "";
    const blockIconURI = "";

    class CodeTranslator {
        constructor() {
            this.codeInput = "";
            this.selectedLanguage = "python";
            this.translatedBlocks = [];
            this.variables = new Map();
            this.functions = new Map();
        }

        getInfo() {
            return {
                id: "codeTranslator",
                name: "代码翻译器",
                docsURI: "https://example.com/code-translator-docs",
                menuIconURI: menuIconURI,
                blockIconURI: blockIconURI,
                blocks: [
                    {
                        opcode: "inputCode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "输入代码 [code]",
                        arguments: {
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "print(\"Hello World\")"
                            }
                        }
                    },
                    {
                        opcode: "selectLanguage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "选择编程语言 [language]",
                        arguments: {
                            language: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "python",
                                menu: "languages"
                            }
                        }
                    },
                    {
                        opcode: "translateCode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "翻译代码"
                    },
                    {
                        opcode: "showTranslation",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "显示翻译结果"
                    },
                    {
                        opcode: "runTranslatedCode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "运行翻译后的代码"
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "高级功能"
                    },
                    {
                        opcode: "clearVariables",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "清除所有变量"
                    },
                    {
                        opcode: "listFunctions",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "列出所有函数"
                    },
                    {
                        opcode: "debugMode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "调试模式 [enabled]",
                        arguments: {
                            enabled: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "true",
                                menu: "booleanMenu"
                            }
                        }
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "游戏玩法积木"
                    },
                    {
                        opcode: "createGameLoop",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "创建游戏循环 [fps]",
                        arguments: {
                            fps: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 60
                            }
                        }
                    },
                    {
                        opcode: "createSprite",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "创建精灵 [name] 位置 [x] [y]",
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "player"
                            },
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: "moveSprite",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "移动精灵 [name] 方向 [direction] 速度 [speed]",
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "player"
                            },
                            direction: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 90
                            },
                            speed: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            }
                        }
                    },
                    {
                        opcode: "detectCollision",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "检测碰撞 [sprite1] 和 [sprite2]",
                        arguments: {
                            sprite1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "player"
                            },
                            sprite2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "enemy"
                            }
                        }
                    },
                    {
                        opcode: "createAnimation",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "创建动画 [name] 帧数 [frames]",
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "walk"
                            },
                            frames: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4
                            }
                        }
                    }
                ],
                menus: {
                    languages: [
                        { text: "Python", value: "python" },
                        { text: "C++", value: "cpp" },
                        { text: "Java", value: "java" },
                        { text: "JavaScript", value: "javascript" }
                    ],
                    booleanMenu: [
                        { text: "开启", value: "true" },
                        { text: "关闭", value: "false" }
                    ]
                }
            };
        }

        // 代码输入
        inputCode(args) {
            this.codeInput = args.code;
            return `代码已输入: ${args.code.substring(0, 50)}...`;
        }

        // 选择语言
        selectLanguage(args) {
            this.selectedLanguage = args.language;
            return `已选择语言: ${args.language}`;
        }

        // 翻译代码
        translateCode() {
            try {
                this.translatedBlocks = this.translateToScratch(this.codeInput, this.selectedLanguage);
                return "代码翻译完成！";
            } catch (error) {
                return `翻译错误: ${error.message}`;
            }
        }

        // 显示翻译结果
        showTranslation() {
            if (this.translatedBlocks.length === 0) {
                return "请先翻译代码";
            }
            return this.translatedBlocks.join('\n');
        }

        // 运行翻译后的代码
        runTranslatedCode() {
            if (this.translatedBlocks.length === 0) {
                return "没有可运行的代码";
            }

            // 模拟执行翻译后的代码
            for (const block of this.translatedBlocks) {
                this.executeScratchBlock(block);
            }
            return "代码执行完成";
        }

        // 清除变量
        clearVariables() {
            this.variables.clear();
            return "所有变量已清除";
        }

        // 列出函数
        listFunctions() {
            if (this.functions.size === 0) {
                return "没有定义的函数";
            }
            return Array.from(this.functions.keys()).join(', ');
        }

        // 调试模式
        debugMode(args) {
            const enabled = args.enabled === "true";
            return `调试模式 ${enabled ? '开启' : '关闭'}`;
        }

        // 游戏循环
        createGameLoop(args) {
            return `创建游戏循环，帧率: ${args.fps}`;
        }

        // 创建精灵
        createSprite(args) {
            return `创建精灵 ${args.name} 在位置 (${args.x}, ${args.y})`;
        }

        // 移动精灵
        moveSprite(args) {
            return `移动精灵 ${args.name} 方向 ${args.direction} 速度 ${args.speed}`;
        }

        // 检测碰撞
        detectCollision(args) {
            // 简单的碰撞检测模拟
            return Math.random() > 0.5;
        }

        // 创建动画
        createAnimation(args) {
            return `创建动画 ${args.name} 共 ${args.frames} 帧`;
        }

        // 核心翻译逻辑
        translateToScratch(code, language) {
            const blocks = [];

            // 按行分割代码
            const lines = code.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                const trimmedLine = line.trim();
                let translatedBlock = this.translateLine(trimmedLine, language);

                if (translatedBlock) {
                    blocks.push(translatedBlock);
                }
            }

            return blocks;
        }

        // 翻译单行代码
        translateLine(line, language) {
            switch (language) {
                case 'python':
                    return this.translatePython(line);
                case 'cpp':
                    return this.translateCpp(line);
                case 'java':
                    return this.translateJava(line);
                case 'javascript':
                    return this.translateJavaScript(line);
                default:
                    return `未知语言: ${language}`;
            }
        }

        // Python翻译
        translatePython(line) {
            // 变量赋值
            if (line.match(/^\w+\s*=\s*.+$/)) {
                const match = line.match(/^(\w+)\s*=\s*(.+)$/);
                if (match) {
                    const varName = match[1];
                    const value = match[2];
                    this.variables.set(varName, value);
                    return `设置变量 ${varName} 为 ${value}`;
                }
            }

            // 打印语句
            if (line.match(/^print\(/)) {
                const match = line.match(/print\((.+)\)/);
                if (match) {
                    return `说 ${match[1]}`;
                }
            }

            // if语句
            if (line.match(/^if\s+/)) {
                const match = line.match(/if\s+(.+):/);
                if (match) {
                    return `如果 ${this.translateCondition(match[1])} 那么`;
                }
            }

            // for循环
            if (line.match(/^for\s+/)) {
                const match = line.match(/for\s+(\w+)\s+in\s+range\((.+)\):/);
                if (match) {
                    return `重复 ${match[2]} 次`;
                }
            }

            // 函数定义
            if (line.match(/^def\s+/)) {
                const match = line.match(/def\s+(\w+)\(([^)]*)\):/);
                if (match) {
                    const funcName = match[1];
                    const params = match[2] ? match[2].split(',').map(p => p.trim()) : [];
                    this.functions.set(funcName, { params });
                    return `定义函数 ${funcName} 参数: ${params.join(', ')}`;
                }
            }

            return `Python代码: ${line}`;
        }

        // C++翻译
        translateCpp(line) {
            // 变量声明
            if (line.match(/^\w+\s+\w+\s*=\s*.+;/)) {
                const match = line.match(/^(\w+)\s+(\w+)\s*=\s*(.+);/);
                if (match) {
                    const varName = match[2];
                    const value = match[3];
                    this.variables.set(varName, value);
                    return `设置变量 ${varName} 为 ${value}`;
                }
            }

            // cout输出
            if (line.match(/^cout\s*<</)) {
                const match = line.match(/cout\s*<<\s*(.+);/);
                if (match) {
                    return `说 ${match[1]}`;
                }
            }

            // if语句
            if (line.match(/^if\s*\(/)) {
                const match = line.match(/if\s*\((.+)\)\s*{/);
                if (match) {
                    return `如果 ${this.translateCondition(match[1])} 那么`;
                }
            }

            // for循环
            if (line.match(/^for\s*\(/)) {
                const match = line.match(/for\s*\([^;]+;\s*([^;]+);[^)]+\)\s*{/);
                if (match) {
                    return `重复直到 ${this.translateCondition(match[1])}`;
                }
            }

            return `C++代码: ${line}`;
        }

        // Java翻译
        translateJava(line) {
            // 主方法
            if (line.match(/public\s+static\s+void\s+main/)) {
                return "当绿旗被点击";
            }

            // System.out.println
            if (line.match(/System\.out\.println/)) {
                const match = line.match(/System\.out\.println\((.+)\);/);
                if (match) {
                    return `说 ${match[1]}`;
                }
            }

            // 变量声明
            if (line.match(/^\w+\s+\w+\s*=\s*.+;/)) {
                const match = line.match(/^(\w+)\s+(\w+)\s*=\s*(.+);/);
                if (match) {
                    const varName = match[2];
                    const value = match[3];
                    this.variables.set(varName, value);
                    return `设置变量 ${varName} 为 ${value}`;
                }
            }

            return `Java代码: ${line}`;
        }

        // JavaScript翻译
        translateJavaScript(line) {
            // 变量声明
            if (line.match(/^(var|let|const)\s+\w+\s*=/)) {
                const match = line.match(/^(var|let|const)\s+(\w+)\s*=\s*(.+);?/);
                if (match) {
                    const varName = match[2];
                    const value = match[3];
                    this.variables.set(varName, value);
                    return `设置变量 ${varName} 为 ${value}`;
                }
            }

            // console.log
            if (line.match(/^console\.log/)) {
                const match = line.match(/console\.log\((.+)\);/);
                if (match) {
                    return `说 ${match[1]}`;
                }
            }

            // 函数定义
            if (line.match(/^function\s+\w+/)) {
                const match = line.match(/function\s+(\w+)\(([^)]*)\)\s*{/);
                if (match) {
                    const funcName = match[1];
                    const params = match[2] ? match[2].split(',').map(p => p.trim()) : [];
                    this.functions.set(funcName, { params });
                    return `定义函数 ${funcName} 参数: ${params.join(', ')}`;
                }
            }

            return `JavaScript代码: ${line}`;
        }

        // 翻译条件表达式
        translateCondition(condition) {
            // 简单的条件翻译
            return condition
                .replace(/&&/g, '且')
                .replace(/\|\|/g, '或')
                .replace(/==/g, '=')
                .replace(/!=/g, '≠');
        }

        // 执行Scratch积木（模拟）
        executeScratchBlock(block) {
            // 这里可以添加实际的执行逻辑
            console.log(`执行积木: ${block}`);
        }
    }

    Scratch.extensions.register(new CodeTranslator());
})(Scratch);
