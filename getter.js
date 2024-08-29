// const path = process.argv[2] || "./extensions/obviousAlexC/penPlus.js";

// const mc = console;
// console.log = () => {};

// function show(obj) {
// 	mc.log(JSON.stringify(obj));
// }

// window = {
// 	addEventListener: () => {}
// }

// class Skin {
// 	/**
//      * Create a Skin, which stores and/or generates textures for use in rendering.
//      * @param {int} id - The unique ID for this Skin.
//      * @param {RenderWebGL} renderer - The renderer which will use this skin.
//      * @constructor
//      */
//     constructor (id, renderer) {
//         /** @type {RenderWebGL} */
//         this._renderer = renderer;

//         /** @type {int} */
//         this._id = id;

//         /** @type {Vec3} */
//         this._rotationCenter = {};

//         /** @type {WebGLTexture} */
//         this._texture = null;

//         /**
//          * The uniforms to be used by the vertex and pixel shaders.
//          * Some of these are used by other parts of the renderer as well.
//          * @type {Object.<string,*>}
//          * @private
//          */
//         this._uniforms = {
//             /**
//              * The nominal (not necessarily current) size of the current skin.
//              * @type {Array<number>}
//              */
//             u_skinSize: [0, 0],

//             /**
//              * The actual WebGL texture object for the skin.
//              * @type {WebGLTexture}
//              */
//             u_skin: null
//         };

//         /**
//          * A silhouette to store touching data, skins are responsible for keeping it up to date.
//          * @protected
//          */
//         this._silhouette = {};

//         /**
//          * Whether this skin might include private information about the user.
//          */
//         this.private = false;
//     }
// }

// Scratch = {
// 	extensions: {
// 		unsandboxed: true,
// 		register: (cl) => {
// 			show(cl.getInfo());
// 		}
// 	},
// 	Cast: {
// 		toNumber: (value) => {
// 	        // If value is already a number we don't need to coerce it with
// 	        // Number().
// 	        if (typeof value === 'number') {
// 	            // Scratch treats NaN as 0, when needed as a number.
// 	            // E.g., 0 + NaN -> 0.
// 	            if (Number.isNaN(value)) {
// 	                return 0;
// 	            }
// 	            return value;
// 	        }
// 	        const n = Number(value);
// 	        if (Number.isNaN(n)) {
// 	            // Scratch treats NaN as 0, when needed as a number.
// 	            // E.g., 0 + NaN -> 0.
// 	            return 0;
// 	        }
// 	        return n;
// 	    }
// 	},
// 	vm: {
// 		exports: {
// 			twgl: {
// 				createFramebufferInfo: () => {},
// 				resizeFramebufferInfo: () => {},
// 				createProgramInfo:() => {},
// 				createBufferInfoFromArrays: () => {},
// 				setBuffersAndAttributes: () => {},
// 			},
// 			Skin: Skin,
// 		},
// 		renderer: {
// 			_nativeSize: {
// 				width: 480,
// 				height: 360
// 			},
// 			exports: {
// 				twgl: {
// 					createFramebufferInfo: () => {},
// 					resizeFramebufferInfo: () => {},
// 					createProgramInfo:() => {},
// 					createBufferInfoFromArrays: () => {},
// 					setBuffersAndAttributes: () => {},
// 				},
// 				Skin: {

// 				},
// 			},
// 			_gl: {
// 			    "VERTEX_ATTRIB_ARRAY_DIVISOR": 35070,
// 			    "MIN": 32775,
// 			    "MAX": 32776,
// 			    "RGBA16F": 34842,
// 			    "RGB16F": 34843,
// 			    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE": 33297,
// 			    "UNSIGNED_NORMALIZED": 35863,
// 			    "QUERY_COUNTER_BITS": 34916,
// 			    "CURRENT_QUERY": 34917,
// 			    "QUERY_RESULT": 34918,
// 			    "QUERY_RESULT_AVAILABLE": 34919,
// 			    "TIME_ELAPSED": 35007,
// 			    "TIMESTAMP": 36392,
// 			    "GPU_DISJOINT": 36795,
// 			    "SRGB": 35904,
// 			    "SRGB_ALPHA": 35906,
// 			    "SRGB8_ALPHA8": 35907,
// 			    "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING": 33296,
// 			    "TEXTURE_MAX_ANISOTROPY": 34046,
// 			    "MAX_TEXTURE_MAX_ANISOTROPY": 34047,
// 			    "FRAGMENT_SHADER_DERIVATIVE_HINT": 35723,
// 			    "HALF_FLOAT": 36193,
// 			    "VERTEX_ARRAY_BINDING": 34229,
// 			    "RGBA32F_EXT": 34836,
// 			    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT": 33297,
// 			    "UNSIGNED_NORMALIZED_EXT": 35863,
// 			    "COMPRESSED_RGB_S3TC_DXT1_EXT": 33776,
// 			    "COMPRESSED_RGBA_S3TC_DXT1_EXT": 33777,
// 			    "COMPRESSED_RGBA_S3TC_DXT3_EXT": 33778,
// 			    "COMPRESSED_RGBA_S3TC_DXT5_EXT": 33779,
// 			    "COMPRESSED_SRGB_S3TC_DXT1_EXT": 35916,
// 			    "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT": 35917,
// 			    "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT": 35918,
// 			    "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT": 35919,
// 			    "UNSIGNED_INT_24_8": 34042,
// 			    "COLOR_ATTACHMENT1": 36065,
// 			    "COLOR_ATTACHMENT2": 36066,
// 			    "COLOR_ATTACHMENT3": 36067,
// 			    "COLOR_ATTACHMENT4": 36068,
// 			    "COLOR_ATTACHMENT5": 36069,
// 			    "COLOR_ATTACHMENT6": 36070,
// 			    "COLOR_ATTACHMENT7": 36071,
// 			    "COLOR_ATTACHMENT8": 36072,
// 			    "COLOR_ATTACHMENT9": 36073,
// 			    "COLOR_ATTACHMENT10": 36074,
// 			    "COLOR_ATTACHMENT11": 36075,
// 			    "COLOR_ATTACHMENT12": 36076,
// 			    "COLOR_ATTACHMENT13": 36077,
// 			    "COLOR_ATTACHMENT14": 36078,
// 			    "COLOR_ATTACHMENT15": 36079,
// 			    "DRAW_BUFFER0": 34853,
// 			    "DRAW_BUFFER1": 34854,
// 			    "DRAW_BUFFER2": 34855,
// 			    "DRAW_BUFFER3": 34856,
// 			    "DRAW_BUFFER4": 34857,
// 			    "DRAW_BUFFER5": 34858,
// 			    "DRAW_BUFFER6": 34859,
// 			    "DRAW_BUFFER7": 34860,
// 			    "DRAW_BUFFER8": 34861,
// 			    "DRAW_BUFFER9": 34862,
// 			    "DRAW_BUFFER10": 34863,
// 			    "DRAW_BUFFER11": 34864,
// 			    "DRAW_BUFFER12": 34865,
// 			    "DRAW_BUFFER13": 34866,
// 			    "DRAW_BUFFER14": 34867,
// 			    "DRAW_BUFFER15": 34868,
// 			    "MAX_COLOR_ATTACHMENTS": 36063,
// 			    "MAX_DRAW_BUFFERS": 34852,
// 				getParameter: () => {},
// 				enable: () => {},
// 				depthFunc: () => {},
// 				beginQuery
// 				: 
// 				() => {},
// 				bindVertexArray
// 				: 
// 				() => {},
// 				createQuery
// 				: 
// 				() => {},
// 				createVertexArray
// 				: 
// 				() => {},
// 				deleteQuery
// 				: 
// 				() => {},
// 				deleteVertexArray
// 				: 
// 				() => {},
// 				drawArraysInstanced
// 				: 
// 				() => {},
// 				drawBuffers
// 				: 
// 				() => {},
// 				drawElementsInstanced
// 				: 
// 				() => {},
// 				endQuery
// 				: 
// 				() => {},
// 				getQuery
// 				: 
// 				() => {},
// 				getQueryObject
// 				: 
// 				() => {},
// 				isQuery
// 				: 
// 				() => {},
// 				isVertexArray
// 				: 
// 				() => {},
// 				queryCounter
// 				: 
// 				() => {},
// 				vertexAttribDivisor
// 				: 
// 				() => {},
// 				drawingBufferColorSpace
// 				: 
// 				"srgb",
// 				drawingBufferFormat
// 				: 
// 				32849,
// 				drawingBufferHeight
// 				: 
// 				306,
// 				drawingBufferWidth
// 				: 
// 				408,
// 				unpackColorSpace
// 				: 
// 				"srgb",
// 				bindFramebuffer: () => {}
// 			},
// 			gl: {
// 			    "VERTEX_ATTRIB_ARRAY_DIVISOR": 35070,
// 			    "MIN": 32775,
// 			    "MAX": 32776,
// 			    "RGBA16F": 34842,
// 			    "RGB16F": 34843,
// 			    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE": 33297,
// 			    "UNSIGNED_NORMALIZED": 35863,
// 			    "QUERY_COUNTER_BITS": 34916,
// 			    "CURRENT_QUERY": 34917,
// 			    "QUERY_RESULT": 34918,
// 			    "QUERY_RESULT_AVAILABLE": 34919,
// 			    "TIME_ELAPSED": 35007,
// 			    "TIMESTAMP": 36392,
// 			    "GPU_DISJOINT": 36795,
// 			    "SRGB": 35904,
// 			    "SRGB_ALPHA": 35906,
// 			    "SRGB8_ALPHA8": 35907,
// 			    "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING": 33296,
// 			    "TEXTURE_MAX_ANISOTROPY": 34046,
// 			    "MAX_TEXTURE_MAX_ANISOTROPY": 34047,
// 			    "FRAGMENT_SHADER_DERIVATIVE_HINT": 35723,
// 			    "HALF_FLOAT": 36193,
// 			    "VERTEX_ARRAY_BINDING": 34229,
// 			    "RGBA32F_EXT": 34836,
// 			    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT": 33297,
// 			    "UNSIGNED_NORMALIZED_EXT": 35863,
// 			    "COMPRESSED_RGB_S3TC_DXT1_EXT": 33776,
// 			    "COMPRESSED_RGBA_S3TC_DXT1_EXT": 33777,
// 			    "COMPRESSED_RGBA_S3TC_DXT3_EXT": 33778,
// 			    "COMPRESSED_RGBA_S3TC_DXT5_EXT": 33779,
// 			    "COMPRESSED_SRGB_S3TC_DXT1_EXT": 35916,
// 			    "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT": 35917,
// 			    "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT": 35918,
// 			    "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT": 35919,
// 			    "UNSIGNED_INT_24_8": 34042,
// 			    "COLOR_ATTACHMENT1": 36065,
// 			    "COLOR_ATTACHMENT2": 36066,
// 			    "COLOR_ATTACHMENT3": 36067,
// 			    "COLOR_ATTACHMENT4": 36068,
// 			    "COLOR_ATTACHMENT5": 36069,
// 			    "COLOR_ATTACHMENT6": 36070,
// 			    "COLOR_ATTACHMENT7": 36071,
// 			    "COLOR_ATTACHMENT8": 36072,
// 			    "COLOR_ATTACHMENT9": 36073,
// 			    "COLOR_ATTACHMENT10": 36074,
// 			    "COLOR_ATTACHMENT11": 36075,
// 			    "COLOR_ATTACHMENT12": 36076,
// 			    "COLOR_ATTACHMENT13": 36077,
// 			    "COLOR_ATTACHMENT14": 36078,
// 			    "COLOR_ATTACHMENT15": 36079,
// 			    "DRAW_BUFFER0": 34853,
// 			    "DRAW_BUFFER1": 34854,
// 			    "DRAW_BUFFER2": 34855,
// 			    "DRAW_BUFFER3": 34856,
// 			    "DRAW_BUFFER4": 34857,
// 			    "DRAW_BUFFER5": 34858,
// 			    "DRAW_BUFFER6": 34859,
// 			    "DRAW_BUFFER7": 34860,
// 			    "DRAW_BUFFER8": 34861,
// 			    "DRAW_BUFFER9": 34862,
// 			    "DRAW_BUFFER10": 34863,
// 			    "DRAW_BUFFER11": 34864,
// 			    "DRAW_BUFFER12": 34865,
// 			    "DRAW_BUFFER13": 34866,
// 			    "DRAW_BUFFER14": 34867,
// 			    "DRAW_BUFFER15": 34868,
// 			    "MAX_COLOR_ATTACHMENTS": 36063,
// 			    "MAX_DRAW_BUFFERS": 34852,
// 				getParameter: () => {},
// 				enable: () => {},
// 				depthFunc: () => {},
// 				beginQuery
// 				: 
// 				() => {},
// 				bindVertexArray
// 				: 
// 				() => {},
// 				createQuery
// 				: 
// 				() => {},
// 				createVertexArray
// 				: 
// 				() => {},
// 				deleteQuery
// 				: 
// 				() => {},
// 				deleteVertexArray
// 				: 
// 				() => {},
// 				drawArraysInstanced
// 				: 
// 				() => {},
// 				drawBuffers
// 				: 
// 				() => {},
// 				drawElementsInstanced
// 				: 
// 				() => {},
// 				endQuery
// 				: 
// 				() => {},
// 				getQuery
// 				: 
// 				() => {},
// 				getQueryObject
// 				: 
// 				() => {},
// 				isQuery
// 				: 
// 				() => {},
// 				isVertexArray
// 				: 
// 				() => {},
// 				queryCounter
// 				: 
// 				() => {},
// 				vertexAttribDivisor
// 				: 
// 				() => {},
// 				drawingBufferColorSpace
// 				: 
// 				"srgb",
// 				drawingBufferFormat
// 				: 
// 				32849,
// 				drawingBufferHeight
// 				: 
// 				306,
// 				drawingBufferWidth
// 				: 
// 				408,
// 				unpackColorSpace
// 				: 
// 				"srgb",
// 				bindFramebuffer: () => {}
// 			},
// 			useHighQualityRender: false,
// 			canvas: {
// 				width: 480,
// 				height: 360,
// 				addEventListener: () => {}
// 			}
// 		},
// 		extensionManager: {
// 			isExtensionLoaded: () => true
// 		},
// 		'targets': [{'isStage': true, 'name': 'Stage', 'variables': {'`jEk@4|i[#Fk?(8x)AV.-my variable': ['我的变量', 0]}, 'lists': {}, 'broadcasts': {}, 'blocks': {}, 'comments': {}, 'currentCostume': 0, 'costumes': [{'name': '背景1', 'dataFormat': 'svg', 'assetId': 'cd21514d0531fdffb22204e0ec5ed84a', 'md5ext': 'cd21514d0531fdffb22204e0ec5ed84a.svg', 'rotationCenterX': 240, 'rotationCenterY': 180}], 'sounds': [], 'volume': 100, 'layerOrder': 0, 'tempo': 60, 'videoTransparency': 50, 'videoState': 'on', 'textToSpeechLanguage': null}, {'isStage': false, 'name': '角色1', 'variables': {}, 'lists': {}, 'broadcasts': {}, 'blocks': {}, 'comments': {}, 'currentCostume': 0, 'costumes': [{'name': '造型1', 'bitmapResolution': 1, 'dataFormat': 'svg', 'assetId': '927d672925e7b99f7813735c484c6922', 'md5ext': '927d672925e7b99f7813735c484c6922.svg', 'rotationCenterX': 30.74937882782359, 'rotationCenterY': 58.864768144346826}], 'sounds': [], 'volume': 100, 'layerOrder': 1, 'visible': true, 'x': 0, 'y': 0, 'size': 100, 'direction': 90, 'draggable': false, 'rotationStyle': 'all around'}], 'monitors': [], 'extensions': [], 'meta': {'semver': '3.0.0', 'vm': '0.2.0', 'agent': ''},
// 		runtime: {
// 			ext_pen: {
// 				_getPenLayerID: () => 0
// 			},
// 			extensionStorage: {
// 				penP: {

// 				}
// 			},
// 			on: () => {},
// 			renderer: {
// 				_nativeSize: {
// 					width: 480,
// 					height: 360
// 				},
// 				exports: {
// 					twgl: {
// 						createFramebufferInfo: () => {},
// 						resizeFramebufferInfo: () => {},
// 						createProgramInfo:() => {},
// 						createBufferInfoFromArrays: () => {},
// 						setBuffersAndAttributes: () => {},
// 					}
// 				},
// 				_gl: {
// 				    "VERTEX_ATTRIB_ARRAY_DIVISOR": 35070,
// 				    "MIN": 32775,
// 				    "MAX": 32776,
// 				    "RGBA16F": 34842,
// 				    "RGB16F": 34843,
// 				    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE": 33297,
// 				    "UNSIGNED_NORMALIZED": 35863,
// 				    "QUERY_COUNTER_BITS": 34916,
// 				    "CURRENT_QUERY": 34917,
// 				    "QUERY_RESULT": 34918,
// 				    "QUERY_RESULT_AVAILABLE": 34919,
// 				    "TIME_ELAPSED": 35007,
// 				    "TIMESTAMP": 36392,
// 				    "GPU_DISJOINT": 36795,
// 				    "SRGB": 35904,
// 				    "SRGB_ALPHA": 35906,
// 				    "SRGB8_ALPHA8": 35907,
// 				    "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING": 33296,
// 				    "TEXTURE_MAX_ANISOTROPY": 34046,
// 				    "MAX_TEXTURE_MAX_ANISOTROPY": 34047,
// 				    "FRAGMENT_SHADER_DERIVATIVE_HINT": 35723,
// 				    "HALF_FLOAT": 36193,
// 				    "VERTEX_ARRAY_BINDING": 34229,
// 				    "RGBA32F_EXT": 34836,
// 				    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT": 33297,
// 				    "UNSIGNED_NORMALIZED_EXT": 35863,
// 				    "COMPRESSED_RGB_S3TC_DXT1_EXT": 33776,
// 				    "COMPRESSED_RGBA_S3TC_DXT1_EXT": 33777,
// 				    "COMPRESSED_RGBA_S3TC_DXT3_EXT": 33778,
// 				    "COMPRESSED_RGBA_S3TC_DXT5_EXT": 33779,
// 				    "COMPRESSED_SRGB_S3TC_DXT1_EXT": 35916,
// 				    "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT": 35917,
// 				    "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT": 35918,
// 				    "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT": 35919,
// 				    "UNSIGNED_INT_24_8": 34042,
// 				    "COLOR_ATTACHMENT1": 36065,
// 				    "COLOR_ATTACHMENT2": 36066,
// 				    "COLOR_ATTACHMENT3": 36067,
// 				    "COLOR_ATTACHMENT4": 36068,
// 				    "COLOR_ATTACHMENT5": 36069,
// 				    "COLOR_ATTACHMENT6": 36070,
// 				    "COLOR_ATTACHMENT7": 36071,
// 				    "COLOR_ATTACHMENT8": 36072,
// 				    "COLOR_ATTACHMENT9": 36073,
// 				    "COLOR_ATTACHMENT10": 36074,
// 				    "COLOR_ATTACHMENT11": 36075,
// 				    "COLOR_ATTACHMENT12": 36076,
// 				    "COLOR_ATTACHMENT13": 36077,
// 				    "COLOR_ATTACHMENT14": 36078,
// 				    "COLOR_ATTACHMENT15": 36079,
// 				    "DRAW_BUFFER0": 34853,
// 				    "DRAW_BUFFER1": 34854,
// 				    "DRAW_BUFFER2": 34855,
// 				    "DRAW_BUFFER3": 34856,
// 				    "DRAW_BUFFER4": 34857,
// 				    "DRAW_BUFFER5": 34858,
// 				    "DRAW_BUFFER6": 34859,
// 				    "DRAW_BUFFER7": 34860,
// 				    "DRAW_BUFFER8": 34861,
// 				    "DRAW_BUFFER9": 34862,
// 				    "DRAW_BUFFER10": 34863,
// 				    "DRAW_BUFFER11": 34864,
// 				    "DRAW_BUFFER12": 34865,
// 				    "DRAW_BUFFER13": 34866,
// 				    "DRAW_BUFFER14": 34867,
// 				    "DRAW_BUFFER15": 34868,
// 				    "MAX_COLOR_ATTACHMENTS": 36063,
// 				    "MAX_DRAW_BUFFERS": 34852,
// 					getParameter: () => {},
// 					enable: () => {},
// 					depthFunc: () => {},
// 					beginQuery
// 					: 
// 					() => {},
// 					bindVertexArray
// 					: 
// 					() => {},
// 					createQuery
// 					: 
// 					() => {},
// 					createVertexArray
// 					: 
// 					() => {},
// 					deleteQuery
// 					: 
// 					() => {},
// 					deleteVertexArray
// 					: 
// 					() => {},
// 					drawArraysInstanced
// 					: 
// 					() => {},
// 					drawBuffers
// 					: 
// 					() => {},
// 					drawElementsInstanced
// 					: 
// 					() => {},
// 					endQuery
// 					: 
// 					() => {},
// 					getQuery
// 					: 
// 					() => {},
// 					getQueryObject
// 					: 
// 					() => {},
// 					isQuery
// 					: 
// 					() => {},
// 					isVertexArray
// 					: 
// 					() => {},
// 					queryCounter
// 					: 
// 					() => {},
// 					vertexAttribDivisor
// 					: 
// 					() => {},
// 					drawingBufferColorSpace
// 					: 
// 					"srgb",
// 					drawingBufferFormat
// 					: 
// 					32849,
// 					drawingBufferHeight
// 					: 
// 					306,
// 					drawingBufferWidth
// 					: 
// 					408,
// 					unpackColorSpace
// 					: 
// 					"srgb",
// 					bindFramebuffer: () => {}
// 				},
// 				gl: {
// 				    "VERTEX_ATTRIB_ARRAY_DIVISOR": 35070,
// 				    "MIN": 32775,
// 				    "MAX": 32776,
// 				    "RGBA16F": 34842,
// 				    "RGB16F": 34843,
// 				    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE": 33297,
// 				    "UNSIGNED_NORMALIZED": 35863,
// 				    "QUERY_COUNTER_BITS": 34916,
// 				    "CURRENT_QUERY": 34917,
// 				    "QUERY_RESULT": 34918,
// 				    "QUERY_RESULT_AVAILABLE": 34919,
// 				    "TIME_ELAPSED": 35007,
// 				    "TIMESTAMP": 36392,
// 				    "GPU_DISJOINT": 36795,
// 				    "SRGB": 35904,
// 				    "SRGB_ALPHA": 35906,
// 				    "SRGB8_ALPHA8": 35907,
// 				    "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING": 33296,
// 				    "TEXTURE_MAX_ANISOTROPY": 34046,
// 				    "MAX_TEXTURE_MAX_ANISOTROPY": 34047,
// 				    "FRAGMENT_SHADER_DERIVATIVE_HINT": 35723,
// 				    "HALF_FLOAT": 36193,
// 				    "VERTEX_ARRAY_BINDING": 34229,
// 				    "RGBA32F_EXT": 34836,
// 				    "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT": 33297,
// 				    "UNSIGNED_NORMALIZED_EXT": 35863,
// 				    "COMPRESSED_RGB_S3TC_DXT1_EXT": 33776,
// 				    "COMPRESSED_RGBA_S3TC_DXT1_EXT": 33777,
// 				    "COMPRESSED_RGBA_S3TC_DXT3_EXT": 33778,
// 				    "COMPRESSED_RGBA_S3TC_DXT5_EXT": 33779,
// 				    "COMPRESSED_SRGB_S3TC_DXT1_EXT": 35916,
// 				    "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT": 35917,
// 				    "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT": 35918,
// 				    "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT": 35919,
// 				    "UNSIGNED_INT_24_8": 34042,
// 				    "COLOR_ATTACHMENT1": 36065,
// 				    "COLOR_ATTACHMENT2": 36066,
// 				    "COLOR_ATTACHMENT3": 36067,
// 				    "COLOR_ATTACHMENT4": 36068,
// 				    "COLOR_ATTACHMENT5": 36069,
// 				    "COLOR_ATTACHMENT6": 36070,
// 				    "COLOR_ATTACHMENT7": 36071,
// 				    "COLOR_ATTACHMENT8": 36072,
// 				    "COLOR_ATTACHMENT9": 36073,
// 				    "COLOR_ATTACHMENT10": 36074,
// 				    "COLOR_ATTACHMENT11": 36075,
// 				    "COLOR_ATTACHMENT12": 36076,
// 				    "COLOR_ATTACHMENT13": 36077,
// 				    "COLOR_ATTACHMENT14": 36078,
// 				    "COLOR_ATTACHMENT15": 36079,
// 				    "DRAW_BUFFER0": 34853,
// 				    "DRAW_BUFFER1": 34854,
// 				    "DRAW_BUFFER2": 34855,
// 				    "DRAW_BUFFER3": 34856,
// 				    "DRAW_BUFFER4": 34857,
// 				    "DRAW_BUFFER5": 34858,
// 				    "DRAW_BUFFER6": 34859,
// 				    "DRAW_BUFFER7": 34860,
// 				    "DRAW_BUFFER8": 34861,
// 				    "DRAW_BUFFER9": 34862,
// 				    "DRAW_BUFFER10": 34863,
// 				    "DRAW_BUFFER11": 34864,
// 				    "DRAW_BUFFER12": 34865,
// 				    "DRAW_BUFFER13": 34866,
// 				    "DRAW_BUFFER14": 34867,
// 				    "DRAW_BUFFER15": 34868,
// 				    "MAX_COLOR_ATTACHMENTS": 36063,
// 				    "MAX_DRAW_BUFFERS": 34852,
// 					getParameter: () => {},
// 					enable: () => {},
// 					depthFunc: () => {},
// 					beginQuery
// 					: 
// 					() => {},
// 					bindVertexArray
// 					: 
// 					() => {},
// 					createQuery
// 					: 
// 					() => {},
// 					createVertexArray
// 					: 
// 					() => {},
// 					deleteQuery
// 					: 
// 					() => {},
// 					deleteVertexArray
// 					: 
// 					() => {},
// 					drawArraysInstanced
// 					: 
// 					() => {},
// 					drawBuffers
// 					: 
// 					() => {},
// 					drawElementsInstanced
// 					: 
// 					() => {},
// 					endQuery
// 					: 
// 					() => {},
// 					getQuery
// 					: 
// 					() => {},
// 					getQueryObject
// 					: 
// 					() => {},
// 					isQuery
// 					: 
// 					() => {},
// 					isVertexArray
// 					: 
// 					() => {},
// 					queryCounter
// 					: 
// 					() => {},
// 					vertexAttribDivisor
// 					: 
// 					() => {},
// 					drawingBufferColorSpace
// 					: 
// 					"srgb",
// 					drawingBufferFormat
// 					: 
// 					32849,
// 					drawingBufferHeight
// 					: 
// 					306,
// 					drawingBufferWidth
// 					: 
// 					408,
// 					unpackColorSpace
// 					: 
// 					"srgb",
// 					bindFramebuffer: () => {}
// 				},
// 				useHighQualityRender: false,
// 				canvas: {
// 					width: 480,
// 					height: 360,
// 					addEventListener: () => {}
// 				}
// 			}
// 		}
// 	},
// 	translate: (a) => a.default,
// 	BlockType: {
// 	    /**
// 	     * Boolean reporter with hexagonal shape
// 	     */
// 	    BOOLEAN: 'Boolean',

// 	    /**
// 	     * A button (not an actual block) for some special action, like making a variable
// 	     */
// 	    BUTTON: 'button',

// 	    /**
// 	     * A text label (not an actual block) for adding comments or labling blocks
// 	     */
// 	    LABEL: 'label',

// 	    /**
// 	     * Command block
// 	     */
// 	    COMMAND: 'command',

// 	    /**
// 	     * Specialized command block which may or may not run a child branch
// 	     * The thread continues with the next block whether or not a child branch ran.
// 	     */
// 	    CONDITIONAL: 'conditional',

// 	    /**
// 	     * Specialized hat block with no implementation function
// 	     * This stack only runs if the corresponding event is emitted by other code.
// 	     */
// 	    EVENT: 'event',

// 	    /**
// 	     * Hat block which conditionally starts a block stack
// 	     */
// 	    HAT: 'hat',

// 	    /**
// 	     * Specialized command block which may or may not run a child branch
// 	     * If a child branch runs, the thread evaluates the loop block again.
// 	     */
// 	    LOOP: 'loop',

// 	    /**
// 	     * General reporter with numeric or string value
// 	     */
// 	    REPORTER: 'reporter',

// 	    /**
// 	     * Arbitrary scratch-blocks XML.
// 	     */
// 	    XML: 'xml'
// 	},
// 	ArgumentType: {
// 	    /**
// 	     * Numeric value with angle picker
// 	     */
// 	    ANGLE: 'angle',

// 	    /**
// 	     * Boolean value with hexagonal placeholder
// 	     */
// 	    BOOLEAN: 'Boolean',

// 	    /**
// 	     * Numeric value with color picker
// 	     */
// 	    COLOR: 'color',

// 	    /**
// 	     * Numeric value with text field
// 	     */
// 	    NUMBER: 'number',

// 	    /**
// 	     * String value with text field
// 	     */
// 	    STRING: 'string',

// 	    /**
// 	     * String value with matrix field
// 	     */
// 	    MATRIX: 'matrix',

// 	    /**
// 	     * MIDI note number with note picker (piano) field
// 	     */
// 	    NOTE: 'note',

// 	    /**
// 	     * Inline image on block (as part of the label)
// 	     */
// 	    IMAGE: 'image',

// 	    /**
// 	     * Name of costume in the current target
// 	     */
// 	    COSTUME: 'costume',

// 	    /**
// 	     * Name of sound in the current target
// 	     */
// 	    SOUND: 'sound'
// 	},
// 	TargetType: {
// 	    /**
// 	     * Rendered target which can move, change costumes, etc.
// 	     */
// 	    SPRITE: 'sprite',

// 	    /**
// 	     * Rendered target which cannot move but can change backdrops
// 	     */
// 	    STAGE: 'stage'
// 	},
// };

// require(path);

gettingExtensionsInfo = true; // Start Get Mode
extensionInfos = []; // Create List
extensions = [
  // This file supports comments
  "lab/text",
  "stretch",
  "gamepad",
  "box2d",
  "files",
  "pointerlock",
  "cursor",
  "runtime-options",
  "fetch",
  "text",
  "local-storage",
  "true-fantom/base",
  "bitwise",
  "Skyhigh173/bigint",
  "utilities",
  "sound",
  "Lily/Video",
  "iframe",
  "Clay/htmlEncode",
  "Xeltalliv/clippingblending",
  "clipboard",
  "obviousAlexC/penPlus",
  "penplus",
  "Xeltalliv/simple3D",
  "Lily/Skins",
  "obviousAlexC/SensingPlus",
  "CubesterYT/KeySimulation",
  "Lily/ClonesPlus",
  "Lily/LooksPlus",
  "Lily/MoreEvents",
  "Lily/ListTools",
  "veggiecan/mobilekeyboard",
  "NexusKitten/moremotion",
  "CubesterYT/WindowControls",
  "veggiecan/browserfullscreen",
  "shreder95ua/resolution",
  "XmerOriginals/closecontrol",
  "navigator",
  "battery",
  "TheShovel/CustomStyles",
  "TheShovel/ColorPicker",
  "NexusKitten/controlcontrols",
  "mdwalters/notifications",
  "XeroName/Deltatime",
  "ar",
  "encoding",
  "Lily/SoundExpanded",
  "Lily/TempVariables2",
  "Lily/MoreTimers",
  "clouddata-ping",
  "cloudlink",
  "true-fantom/network",
  "true-fantom/math",
  "true-fantom/regexp",
  "true-fantom/couplers",
  "Lily/AllMenus",
  "Lily/HackedBlocks",
  "Lily/Cast",
  "-SIPC-/time",
  "-SIPC-/consoles",
  "ZXMushroom63/searchApi",
  "TheShovel/ShovelUtils",
  "Lily/Assets",
  "SharkPool/Font-Manager",
  "DNin/wake-lock",
  "Skyhigh173/json",
  "mbw/xml",
  "numerical-encoding-2",
  "cs2627883/numericalencoding",
  "DT/cameracontrols",
  "TheShovel/CanvasEffects",
  "Longboost/color_channels",
  "CST1229/zip",
  "CST1229/images",
  "TheShovel/LZ-String",
  "0832/rxFS2",
  "NexusKitten/sgrab",
  "NOname-awa/graphics2d",
  "NOname-awa/more-comparisons",
  "JeremyGamer13/tween",
  "rixxyx",
  "Lily/lmsutils",
  "qxsck/data-analysis",
  "qxsck/var-and-list",
  "vercte/dictionaries",
  "godslayerakp/http",
  "godslayerakp/ws",
  "Lily/CommentBlocks",
  "veggiecan/LongmanDictionary",
  "CubesterYT/TurboHook",
  "Alestore/nfcwarp",
  "itchio",
  "gamejolt",
  "obviousAlexC/newgroundsIO",
  "Lily/McUtils" // McUtils should always be the last item.
];

// extensionManager.loadExtensionURL // Load Extension From URL
(async () => {
	var idx = 0;
	for (const name of extensions) {
		const url = `https://scratch-cw.top:8007/${name}.js`;
		await extensionManager.loadExtensionURL(url);
		console.log(`Geted ${name} (${++idx}/${extensions.length})`);
	}
	console.log(extensionInfos);
})();