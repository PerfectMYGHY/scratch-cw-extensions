// Name: 3D Game Maker
// ID: 3dGameMaker
// Description: 在Scratch中创建3D游戏的扩展
// By: 阿璘过不去

(function (Scratch) {
    // 定义一些公用变量、函数
    const menuIconURI = "";
    const blockIconURI = "";

    class ThreeDGameMaker {
        constructor() {
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.objects = new Map(); // 存储所有3D对象
            this.objectCounter = 0;
            this.isInitialized = false;
            this.animationId = null;

            // 监听舞台大小变化
            if (Scratch.vm && Scratch.vm.runtime) {
                Scratch.vm.runtime.on('PROJECT_LOADED', () => {
                    this.initialize3D();
                });
            }
        }

        _initialize3D() {
            if (this.isInitialized) return;

            try {
                // 动态加载Three.js
                if (typeof THREE === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
                    script.onload = () => this.setupScene();
                    document.head.appendChild(script);
                } else {
                    this.setupScene();
                }
            } catch (error) {
                console.error('3D初始化失败:', error);
            }
        }

        setupScene() {
            // 创建场景
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x87CEEB); // 天蓝色背景

            // 创建相机
            this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.1, 1000);
            this.camera.position.set(0, 5, 10);
            this.camera.lookAt(0, 0, 0);

            // 创建渲染器
            const canvas = document.createElement('canvas');
            this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            this.renderer.setSize(480, 360); // Scratch舞台大小
            this.renderer.shadowMap.enabled = true;

            // 添加到舞台
            const stage = document.querySelector('#stage');
            if (stage) {
                stage.appendChild(this.renderer.domElement);
                this.renderer.domElement.style.position = 'absolute';
                this.renderer.domElement.style.top = '0';
                this.renderer.domElement.style.left = '0';
                this.renderer.domElement.style.zIndex = '1';
            }

            // 添加基础灯光
            const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
            this.scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(10, 10, 5);
            directionalLight.castShadow = true;
            this.scene.add(directionalLight);

            // 开始渲染循环
            this.animate();

            this.isInitialized = true;
        }

        animate() {
            this.animationId = requestAnimationFrame(() => this.animate());
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        }

        createObject(geometry, material, name) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const id = `obj_${this.objectCounter++}`;
            this.objects.set(id, mesh);
            this.scene.add(mesh);

            return id;
        }

        getObject(id) {
            return this.objects.get(id);
        }

        _removeObject(id) {
            const obj = this.objects.get(id);
            if (obj) {
                this.scene.remove(obj);
                this.objects.delete(id);
            }
        }

        getInfo() {
            return {
                id: "3dGameMaker",
                name: "3D游戏制作器",
                docsURI: "https://threejs.org/docs/",
                menuIconURI: menuIconURI,
                blockIconURI: blockIconURI,
                blocks: [
                    {
                        opcode: "initialize3D",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "初始化3D场景"
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "创建3D对象"
                    },
                    {
                        opcode: "createCube",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "创建立方体 [width] [height] [depth] 颜色 [color]",
                        arguments: {
                            width: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            height: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            depth: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            color: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "#ff0000"
                            }
                        }
                    },
                    {
                        opcode: "createSphere",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "创建球体 半径 [radius] 颜色 [color]",
                        arguments: {
                            radius: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            color: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "#00ff00"
                            }
                        }
                    },
                    {
                        opcode: "createPlane",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "创建平面 [width] [height] 颜色 [color]",
                        arguments: {
                            width: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                            height: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                            color: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "#cccccc"
                            }
                        }
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "对象操作"
                    },
                    {
                        opcode: "setPosition",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置对象 [id] 位置 X [x] Y [y] Z [z]",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            },
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: "setRotation",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置对象 [id] 旋转 X [x] Y [y] Z [z]",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            },
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: "setScale",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置对象 [id] 缩放 X [x] Y [y] Z [z]",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            },
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: "moveObject",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "移动对象 [id] X [x] Y [y] Z [z]",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            },
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: "rotateObject",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "旋转对象 [id] X [x] Y [y] Z [z]",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            },
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "相机控制"
                    },
                    {
                        opcode: "setCameraPosition",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置相机位置 X [x] Y [y] Z [z]",
                        arguments: {
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                            z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            }
                        }
                    },
                    {
                        opcode: "setCameraLookAt",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置相机看向 X [x] Y [y] Z [z]",
                        arguments: {
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "实用功能"
                    },
                    {
                        opcode: "removeObject",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "删除对象 [id]",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: "clearAllObjects",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "清除所有3D对象"
                    },
                    {
                        opcode: "getObjectPositionX",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "对象 [id] 的X位置",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: "getObjectPositionY",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "对象 [id] 的Y位置",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: "getObjectPositionZ",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "对象 [id] 的Z位置",
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    }
                ]
            };
        }

        // 积木实现方法
        initialize3D() {
            this._initialize3D();
            return "";
        }

        createCube(args) {
            if (!this.isInitialized) this.initialize3D();

            const geometry = new THREE.BoxGeometry(
                args.width,
                args.height,
                args.depth
            );
            const material = new THREE.MeshPhongMaterial({
                color: args.color
            });

            return this.createObject(geometry, material, 'cube');
        }

        createSphere(args) {
            if (!this.isInitialized) this.initialize3D();

            const geometry = new THREE.SphereGeometry(args.radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({
                color: args.color
            });

            return this.createObject(geometry, material, 'sphere');
        }

        createPlane(args) {
            if (!this.isInitialized) this.initialize3D();

            const geometry = new THREE.PlaneGeometry(args.width, args.height);
            const material = new THREE.MeshPhongMaterial({
                color: args.color,
                side: THREE.DoubleSide
            });

            const id = this.createObject(geometry, material, 'plane');
            const obj = this.getObject(id);
            if (obj) obj.rotation.x = Math.PI / 2; // 让平面水平放置

            return id;
        }

        setPosition(args) {
            const obj = this.getObject(args.id);
            if (obj) {
                obj.position.set(args.x, args.y, args.z);
            }
        }

        setRotation(args) {
            const obj = this.getObject(args.id);
            if (obj) {
                obj.rotation.set(args.x, args.y, args.z);
            }
        }

        setScale(args) {
            const obj = this.getObject(args.id);
            if (obj) {
                obj.scale.set(args.x, args.y, args.z);
            }
        }

        moveObject(args) {
            const obj = this.getObject(args.id);
            if (obj) {
                obj.position.x += args.x;
                obj.position.y += args.y;
                obj.position.z += args.z;
            }
        }

        rotateObject(args) {
            const obj = this.getObject(args.id);
            if (obj) {
                obj.rotation.x += args.x;
                obj.rotation.y += args.y;
                obj.rotation.z += args.z;
            }
        }

        setCameraPosition(args) {
            if (this.camera) {
                this.camera.position.set(args.x, args.y, args.z);
            }
        }

        setCameraLookAt(args) {
            if (this.camera) {
                this.camera.lookAt(args.x, args.y, args.z);
            }
        }

        removeObject(args) {
            this._removeObject(args.id);
        }

        clearAllObjects() {
            for (const [id, obj] of this.objects) {
                this.scene.remove(obj);
            }
            this.objects.clear();
        }

        getObjectPositionX(args) {
            const obj = this.getObject(args.id);
            return obj ? obj.position.x : 0;
        }

        getObjectPositionY(args) {
            const obj = this.getObject(args.id);
            return obj ? obj.position.y : 0;
        }

        getObjectPositionZ(args) {
            const obj = this.getObject(args.id);
            return obj ? obj.position.z : 0;
        }
    }

    Scratch.extensions.register(new ThreeDGameMaker());
})(Scratch);
