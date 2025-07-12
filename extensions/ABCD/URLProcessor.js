// Name: URLProcessor
// ID: urlprocessor
// Description: 一些URL处理操作
// License: MIT
// Original: ABCD <https://www.scratch-cw.top/users/ABCD/>

(function (Scratch) {
  "use strict";

  class URLProcessor {
    constructor(runtime) {

    }

    getInfo() {
      return {
        name: Scratch.translate({
          id: "name",
          default: "URL处理操作",
        }),
        id: "urlprocessor",
        blocks: [
          {
            opcode: "getURLOption",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "url.option.getter.text",
              default: "获取URL属性 [OPTION] 的数据",
            }),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  id: "url.option.getter.option.default",
                  default: "属性",
                }),
              },
            }
          },
          {
            opcode: 'getCurrentUrl',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "url.getter.text",
              default: "获取当前页面 URL",
            })
          }
        ],
      };
    }

    /**
     * 获取URL属性
     * @author ABCD
     * @param {{ OPTION: string; }} args
     * @returns {string} URL参数
     */
    getURLOption(args) {
      // 获取 URL 参数
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get(args.OPTION);

      // 检查参数是否存在
      if (param === null) {
        return '未找到参数';
      }

      // 返回参数值
      return param;
    }

    /**
     * 获取当前页面 URL
     * @author ABCD
     * @returns {string} 页面URL
     */
    getCurrentUrl() {
      const fullUrl = window.location.href;
      console.log(fullUrl);
      return fullUrl;
    }
  }

  Scratch.extensions.register(new URLProcessor());

  // !!!!!!!!!!!!!!!!!!! unsandbox 方法不存在！已默认注释！ !!!!!!!!!!!!!!!!!!!!
  // Scratch.extensions.unsandbox(async function (script, util) {
  //   const parts = script.split(' ');
  //   const opcode = parts[0];
  //   console.log(script, parts, util);
  //   if (opcode === 'getCurrentUrl') {
  //     const result = util.extension.getCurrentUrl();
  //     return result;
  //   }
  //   return script;
  // });
})(Scratch);
