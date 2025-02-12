// Name: AdvancedFileOperations
// ID: advancedfileoperationsbyabcd
// Description: 一些更高级的文件操作
// License: MIT
// Original: ABCD <https://www.scratch-cw.top/users/ABCD/>

(function (Scratch) {
    class AdvancedFileOperations {
        constructor(runtime) {
          this.fileInput = document.createElement('input');
          this.fileInput.type = 'file';
          this.fileInput.style.display = 'none';
          document.body.appendChild(this.fileInput);
          this.fileInput.addEventListener('change', this.handleFileUpload.bind(this));
          
          this.inputStorage = {}; // 用于存储每个模块的输入内容
          
          this.runtime = runtime;
          this.inputs = new Map(); // 用于存储每个积木块的输入值
        }
      
        getInfo() {
          return {
            name: Scratch.translate({
                id: "name",
                default: "高级文件操作"
            }),
            id: 'advancedfileoperationsbyabcd', // 这里的 ID 可以根据需要修改为更具描述性的值
            blocks: [
                {
                    blockType: Scratch.BlockType.LABEL,
                    text: Scratch.translate({
                      id: "label.upload",
                      default: "上传文件"
                    })
                },
              {
                opcode: 'uploadFileAndGetBase64',
                blockType: Scratch.BlockType.REPORTER,
                text: Scratch.translate({
                  id: "upload.name",
                  default: '上传文件并获取Base64码'
                })
              },
              {
                blockType: Scratch.BlockType.LABEL,
                text: Scratch.translate({
                  id: "fileSaver",
                  default: "文件保存"
                })
              },
              {
                opcode: 'saveBase64AsFile',
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate({
                  id: "saver.name",
                  default: '将Base64编码 [BASE64] 保存为文件 [FILENAME]'
                }),
                arguments: {
                  BASE64: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Base64编码字符串'
                  },
                  FILENAME: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'output'
                  }
                }
              },
              {
                blockType: Scratch.BlockType.LABEL,
                text: Scratch.translate({
                  id: "TempVar.label",
                  default: "高级暂存变量"
                })
              },
              {
                opcode: 'getTextInput',
                blockType: Scratch.BlockType.REPORTER,
                text: '获取变量 [TEXT]的数据', // 添加输入框参数
                arguments: {
                  TEXT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '我的高级变量' // 修改预制值为“我的高级变量”
                  }
                }
              },
              {
                opcode: 'setTextInput',
                blockType: Scratch.BlockType.COMMAND,
                text: '更改变量 [NEW_TEXT]的数据',
                arguments: {
                  NEW_TEXT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '我的高级变量' // 修改预制值为“我的高级变量”
                  }
                }
              },
              {
                blockType: Scratch.BlockType.LABEL,
                text: Scratch.translate({
                  id: "prompt.label",
                  default: "浏览器级询问"
                })
              },
              {
                opcode: 'getTextInputForPrompt',
                blockType: Scratch.BlockType.REPORTER,
                text: '获取用户输入',
                fn: 'getTextInputForPrompt'
              }
            ]
          };
        }
      
        uploadFileAndGetBase64() {
          return new Promise((resolve, reject) => {
            this.fileInput.click();
            this.resolve = resolve;
            this.reject = reject;
          });
        }
      
        handleFileUpload(event) {
          const file = event.target.files[0];
          if (!file) {
            this.reject('No file selected');
            return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            // @ts-ignore
            const base64String = e.target.result.split(',')[1];
            this.resolve(base64String);
          };
          reader.onerror = (e) => {
            this.reject('Error reading file');
          };
          reader.readAsDataURL(file);
        }

        saveBase64AsFile(args) {
          const base64String = args.BASE64;
          const filename = args.FILENAME;
      
          // 将Base64编码解码为二进制数据
          const binaryString = atob(base64String);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
      
          // 创建Blob对象
          const blob = new Blob([bytes], { type: 'application/octet-binary' });
      
          // 创建文件下载链接
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
      
          // 释放URL对象
          URL.revokeObjectURL(url);
        }

        getTextInput(args) {
          // 返回对应模块的内容输入
          const id = args.TEXT;
          return this.inputStorage[id] || ''; // 如果没有找到对应的ID，则返回空字符串
        }
      
        setTextInput(args) {
          // 弹出输入框，并更新对应模块的输入内容
          const id = args.NEW_TEXT;
          this.showTextInputDialog(id).then((newInput) => {
            this.inputStorage[id] = newInput; // 将输入的内容保存到对应的模块ID中
          });
        }
      
        // 弹出输入框的代码
        showTextInputDialog(id) {
          return new Promise((resolve, reject) => {
            const dialog = document.createElement('div');
            dialog.style.position = 'fixed';
            dialog.style.top = '50%';
            dialog.style.left = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
            dialog.style.padding = '20px';
            dialog.style.border = '1px solid #ccc';
            dialog.style.background = '#fff';
            dialog.style.zIndex = '1001';
      
            const textarea = document.createElement('textarea');
            textarea.style.width = '100%';
            textarea.style.height = '100px';
            textarea.style.boxSizing = 'border-box';
            textarea.value = this.inputStorage[id] || ''; // 默认值为当前模块的保存内容
      
            const closeButton = document.createElement('button');
            closeButton.textContent = '确定';
            closeButton.style.display = 'block';
            closeButton.style.marginTop = '10px';
            closeButton.addEventListener('click', () => {
              document.body.removeChild(dialog);
              resolve(textarea.value); // 返回输入框的内容
            });
      
            dialog.appendChild(textarea);
            dialog.appendChild(closeButton);
            document.body.appendChild(dialog);
      
            textarea.focus();
          });
        }

        getTextInputForPrompt() {
          return new Promise((resolve, reject) => {
            const userInput = prompt('请输入文本：');
            if (userInput !== null) {
              this.inputs.set('textInput', userInput);
              resolve(userInput);
            } else {
              resolve(this.inputs.get('textInput') || '');
            }
          });
        }
      }
      
      Scratch.extensions.register(new AdvancedFileOperations());
})(Scratch);
