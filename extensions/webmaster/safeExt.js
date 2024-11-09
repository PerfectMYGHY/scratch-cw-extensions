// Name: 安全扩展
// ID: safeExt
// Description: 使你的项目更安全，防止别人偷盗你的项目并不标注原著，还抹掉原作者在作品里的声明。

(function (Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("该扩展必须以非沙盒模式运行！！！");
    }

    class safeExt {
        getInfo() {
            return {
                id: "safeExt",
                name: Scratch.translate("Safe Extension"),
                color1: "#fcb103",
                color2: "#db9a37",
                color3: "#db8937",
                docsURI: "https://www.scratch-cw.top/safe/extension/",
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("Warning: This extension is still under development and debugging,"),
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("please do not use it indiscriminately."),
                    },
                    {
                        opcode: "loadSafeID",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("Load your safe ID [ID]"),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "XXXXXXXXXXXXX"
                            }
                        }
                    },
                    {
                        opcode: "loadKeyVariable",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("Load Key Variable [key]"),
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "key"
                            }
                        }
                    },
                ],
                menus: {

                },
            };
        }

        loadSafeID(args) {
            alert(Scratch.translate("The function has not been created."));
        }

        loadKeyVariable(args) {
            alert(Scratch.translate("The function has not been created."));
        }
    }

    Scratch.extensions.register(new safeExt());
})(Scratch);
