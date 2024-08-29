// Name: Notifications
// ID: mdwaltersnotifications
// Description: Display notifications.
// License: MIT
// Modified by webmaster
// webmaster: https://www.scratch-cw.top/users/webmaster/

(function (Scratch) {
  "use strict";

  let denied = false;
  let advanced = {};
  /** @type {Notification|null} */
  let notification = null;

  const askForNotificationPermission = async () => {
    try {
      const allowedByVM = await Scratch.canNotify();
      if (!allowedByVM) {
        throw new Error("被VM拒绝"); // Denied by VM
      }

      const allowedByBrowser = await Notification.requestPermission();
      if (!allowedByBrowser) {
        throw new Error("被浏览器拒绝"); // Denied by browser
      }

      denied = false;
      return true;
    } catch (e) {
      denied = true;
      console.warn("无法请求通知权限", e);
      return false;
    }
  };

  const isAndroid = () => navigator.userAgent.includes("Android");

  const getServiceWorkerRegistration = () => {
    if (!("serviceWorker" in navigator)) return null;
    // 这只在Android上需要
    if (!isAndroid()) return null;
    return navigator.serviceWorker.getRegistration();
  };

  class Notifications {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        this._closeNotification();
      });
    }
    getInfo() {
      return {
        id: "mdwaltersnotifications",
        name: Scratch.translate("Notifications"),
        blocks: [
          {
            opcode: "requestPermission",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("request notification permission"),
          },
          {
            opcode: "hasPermission",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("has notification permission"),
            disableMonitor: true,
          },
          {
            opcode: "showNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create notification with text [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
            },
          },
          {
            opcode: "showNotificationMore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create notification with title [title], text [text], other options [opts] (please use extension \"JSON\")"),
            arguments: {
              title: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "来自项目的通知",
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
              opts: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
            },
          },
          {
            opcode: "closeNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("close notification"),
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("advanced setting"),
          },
          {
            opcode: "setOptionsItem",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set the option [name] of notification to [value]"),
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "body",
                menu: "options",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "setTitle",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set the title of notification to [value]"),
            arguments: {
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "来自项目的通知",
              },
            },
          },
          {
            opcode: "showNotificationFromOptions",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create notification with options"),
          },
        ],
        menus: {
          options: [
            { text: Scratch.translate("options body"), value: "body" },
            { text: Scratch.translate("options icon"), value: "icon" },
            { text: Scratch.translate("options tag"), value: "tag" },
            { text: Scratch.translate("options data"), value: "data" },
            { text: Scratch.translate("options image"), value: "image" },
            { text: Scratch.translate("options badge"), value: "badge" },
            { text: Scratch.translate("options silent"), value: "silent" },
            { text: Scratch.translate("options requireInteraction"), value: "requireInteraction" },
            { text: Scratch.translate("options vibrate"), value: "vibrate" },
            { text: Scratch.translate("options timestamp"), value: "timestamp" },
            { text: Scratch.translate("options dir"), value: "dir" },
            { text: Scratch.translate("options lang"), value: "lang" },
          ],
        },
      };
    }

    requestPermission() {
      return askForNotificationPermission();
    }

    hasPermission() {
      if (denied) {
        return false;
      }
      return askForNotificationPermission();
    }

    async _showNotification(text) {
      if (await this.hasPermission()) {
        const title = "来自项目的通知";
        const options = {
          body: text,
        };
        try {
          notification = new Notification(title, options);
        } catch (e) {
          // 在Android上，我们需要通过服务人员。
          const registration = await getServiceWorkerRegistration();
          if (registration) {
            try {
              await registration.showNotification(title, options);
            } catch (e2) {
              console.error("无法显示通知", e, e2);
            }
          } else {
            console.error("无法显示通知", e);
          }
        }
      }
    }

    async _showNotificationMore(title,text,opts) {
      if (await this.hasPermission()) {
        const options = {
          body: text,
          ...opts,
        };
        try {
          notification = new Notification(title, options);
        } catch (e) {
          // 在Android上，我们需要通过服务人员。
          const registration = await getServiceWorkerRegistration();
          if (registration) {
            try {
              await registration.showNotification(title, options);
            } catch (e2) {
              console.error("无法显示通知", e, e2);
            }
          } else {
            console.error("无法显示通知", e);
          }
        }
      }
    }

    showNotification(args) {
      this._showNotification(Scratch.Cast.toString(args.text));
    }

    showNotificationMore(args) {
      const _opts = Scratch.Cast.toString(args.opts);
      var opts;
      try {
        opts = JSON.parse(_opts);
      } catch {
        console.error("参数opts不合法");
        opts = {};
      }
      this._showNotificationMore(Scratch.Cast.toString(args.title),Scratch.Cast.toString(args.text),opts);
    }

    setOptionsItem(args) {
      const name = Scratch.Cast.toString(args.name);
      let value = Scratch.Cast.toString(args.value);
      switch (name) {
      case "silent":
        value = Scratch.Cast.toBoolean(value);
        break;
      case "requireInteraction":
        value = Scratch.Cast.toBoolean(value);
        break;
      case "vibrate":
        try {
          value = JSON.parse(value);
        } catch {
          console.warn("参数value不是标准的JSON字符串，无法将其转换为该option应填类型：数组");
          return;
        }
        break;
      case "timestamp":
        value = Scratch.Cast.toNumber(value);
        break;
      }
      advanced[name] = value;
    }
    setTitle(args) {
      const title = Scratch.Cast.toString(args.value);
      advanced["title"] = title;
    }

    async _showNotificationFromOptions(title,opts) {
      if (await this.hasPermission()) {
        const options = opts;
        try {
          notification = new Notification(title, options);
        } catch (e) {
          // 在Android上，我们需要通过服务人员。
          const registration = await getServiceWorkerRegistration();
          if (registration) {
            try {
              await registration.showNotification(title, options);
            } catch (e2) {
              console.error("无法显示通知", e, e2);
            }
          } else {
            console.error("无法显示通知", e);
          }
        }
      }
    }

    showNotificationFromOptions(args) {
      const {
        title,
        ...opts
      } = advanced;
      this._showNotificationFromOptions(title,opts);
    }

    async _closeNotification() {
      if (notification) {
        notification.close();
        notification = null;
      }

      const registration = await getServiceWorkerRegistration();
      if (registration) {
        const notifications = await registration.getNotifications();
        for (const notification of notifications) {
          notification.close();
        }
      }
    }

    closeNotification() {
      this._closeNotification();
    }
  }

  Scratch.extensions.register(new Notifications());
})(Scratch);
