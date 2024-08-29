// Name: Color Picker
// ID: shovelColorPicker
// Description: Access your system's color picker.
// By: TheShovel
// License: MIT

(function (Scratch) {
  "use strict";

  const input = document.createElement("input");
  input.type = "color";
  input.value = "#9966ff"; // default scratch-paint color
  input.style.pointerEvents = "none";
  input.style.width = "1px";
  input.style.height = "1px";
  input.style.visibility = "hidden";
  Scratch.renderer.addOverlay(input, "scale-centered");

  input.addEventListener("input", () => {
    Scratch.vm.runtime.startHats("shovelColorPicker_whenChanged");
  });

  let wasMovedThisTick = false;
  Scratch.vm.runtime.on("AFTER_EXECUTE", () => {
    // browser will relayout will happen automatically at the end of the frame; we won't need to do anything
    wasMovedThisTick = false;
  });

  let x = 0;
  let y = 0;
  const updatePosition = () => {
    input.style.transform = `translate(${x}px, ${-y}px)`;
    wasMovedThisTick = true;
  };
  updatePosition();

  class ColorPicker {
    getInfo() {
      return {
        id: "shovelColorPicker",
        name: Scratch.translate("ColorPicker"),
        color1: "#ff7db5",
        color2: "#e0649a",
        color3: "#c14d7f",
        blocks: [
          {
            opcode: "showPicker",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show color picker"),
          },
          {
            opcode: "setPos",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set picker position to x: [X] y: [Y]"),
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set picker color to [COLOR]"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#855CD6",
              },
            },
          },
          {
            opcode: "getColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("color [TYPE] value"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "RGBMenu",
              },
            },
          },
          {
            opcode: "getPos",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("picker [COORD] position"),
            arguments: {
              COORD: {
                type: Scratch.ArgumentType.STRING,
                menu: "POSMenu",
              },
            },
          },
          {
            opcode: "whenChanged",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: Scratch.translate("when color changed"),
          },
        ],
        menus: {
          RGBMenu: {
            acceptReporters: true,
            items: ["hex", "red", "green", "blue"],
          },
          POSMenu: {
            acceptReporters: true,
            items: ["X", "Y"],
          },
        },
      };
    }

    setColor(args) {
      input.value = args.COLOR;
    }

    getColorHEX() {
      return input.value;
    }

    showPicker() {
      // force re-layout if input was moved in the same tick, otherwise in Chrome it will appear in the old location
      // this can be slow, so we avoid it when we can
      if (wasMovedThisTick) {
        input.getBoundingClientRect();
        wasMovedThisTick = false;
      }
      input.click();
    }

    getColor(args) {
      if (args.TYPE === "hex") {
        return input.value;
      } else if (args.TYPE == "red") {
        return Scratch.Cast.toRgbColorObject(input.value).r;
      } else if (args.TYPE == "green") {
        return Scratch.Cast.toRgbColorObject(input.value).g;
      } else if (args.TYPE == "blue") {
        return Scratch.Cast.toRgbColorObject(input.value).b;
      } else {
        return "";
      }
    }

    setPos(args) {
      const newX = Scratch.Cast.toNumber(args.X);
      const newY = Scratch.Cast.toNumber(args.Y);
      if (x !== newX || y !== newY) {
        x = newX;
        y = newY;
        updatePosition();
      }
    }

    getPos(args) {
      if (args.COORD == "X") {
        return x;
      } else if (args.COORD == "Y") {
        return y;
      } else {
        return "";
      }
    }
  }

  Scratch.extensions.register(new ColorPicker());
  // @ts-ignore
})(Scratch);
