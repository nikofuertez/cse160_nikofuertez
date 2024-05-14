// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   varying vec2 v_UV;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   void main() {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
        v_UV = a_UV;
   }`


// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_UV;
    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0; 
    uniform sampler2D u_Sampler1; 
    uniform sampler2D u_Sampler2;
    uniform sampler2D u_Sampler3;
    uniform int u_whichTexture;
    void main() {
        if(u_whichTexture == -2){
            gl_FragColor = u_FragColor; }
        else if(u_whichTexture == -1){
            gl_FragColor = vec4(v_UV, 1.0, 1.0); }
        else if(u_whichTexture == 0){
            gl_FragColor = texture2D(u_Sampler0, v_UV);}
        else if(u_whichTexture == 1){
            gl_FragColor = texture2D(u_Sampler1, v_UV); }
            else if(u_whichTexture == 2){
                gl_FragColor = texture2D(u_Sampler2, v_UV); }
            else if(u_whichTexture == 3){
                gl_FragColor = texture2D(u_Sampler3, v_UV); }
        else { 
             gl_FragColor = vec4(1, .2, .2, 1);
        }
     }`

// Global Variable
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
// let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix
let u_ViewMatrix
let u_GlobalRotateMatrix;

let u_whichTexture;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;


function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    // gl = ...
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGSL() {
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    // // Get the storage location of a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // // Get the storage location of a_UV
    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    if (a_UV < 0) {
        console.log('Failed to get the storage location of a_UV');
        return;
    }

    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    // // Get the storage location of Size
    // u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    // if (!u_Size) {
    //     console.log('Failed to get the storage location of u_Size');
    //     return;
    // }

    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) {
        console.log('Failed to get u_GlobalRotateMatrix');
        return;
    }

    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
        console.log('Failed to get the storage location of u_ViewMatrix');
        return;
    }

    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
        console.log('Failed to get the storage location of u_ProjectionMatrix');
        return;
    }

    var u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    if (!u_Sampler0) {
        console.log('Failed to get the storage location of u_sampler0');
        return false;
    }

    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler1) {
        console.log('Failed to get the storage location of u_Sampler1');
        return;
    }

    u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
    if (!u_Sampler2) {
        console.log('Failed to get the storage location of u_Sampler2');
        return;
    }
    u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
    if (!u_Sampler3) {
        console.log('Failed to get the storage location of u_Sampler3');
        return;
    }

    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {
        console.log('Failed to get the storage location of u_whichTexture');
        return;
    }

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}
// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
// Gloabs related to UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 0;
let g_globalAngleX = 0;
let g_globalAngleZ = 0;
let g_legsAngle = 0;
let g_tailAngle = 0;
let g_tailAngle2 = 0;
let g_tailAngleX = 0;
let animationRunning = true;
let prevMouseX = 0;
let prevMouseY = 0;

function addActionsForHtmlUI() {
    document.getElementById('animateButtonOn').onclick = function() {
        animationRunning = x;
        tick();
    };

    document.getElementById('animateButtonOff').onclick = function() {
        animationRunning = false;
    };
    // document.getElementById('Triangle').onclick = function() { g_selectedType = TRIANGLE };
    // document.getElementById('Circle').onclick = function() { g_selectedType = CIRCLE };

    // document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectedColor[0] = this.value / 100; });
    // document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectedColor[1] = this.value / 100; });
    // document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectedColor[2] = this.value / 100; });
    document.getElementById('angleSlideX').addEventListener('mousemove', function() {
        g_globalAngleX = this.value;
        renderScene();
    });


    document.getElementById('angleSlide').addEventListener('mousemove', function() {
        g_globalAngle = this.value;
        renderScene();
    });

    document.getElementById('angleSlideZ').addEventListener('mousemove', function() {
        g_globalAngleZ = this.value;
        renderScene();
    });

    document.getElementById('jointOne').addEventListener('mousemove', function() {
        g_legsAngle = this.value;
        renderScene();
    });

    document.getElementById('jointTwo').addEventListener('mousemove', function() {
        g_tailAngle = this.value;
        renderScene();
    });

    document.getElementById('jointThree').addEventListener('mousemove', function() {
        g_tailAngle2 = this.value;
        renderScene();
    });
    // i utilized chat gpt for the mouse move function -----------
    canvas.onmousedown = function(ev) {
        prevMouseX = ev.clientX;
        prevMouseY = ev.clientY;
    };

    canvas.onmousemove = function(ev) {
        if (ev.buttons === 1) {
            let deltaX = ev.clientX - prevMouseX;
            let deltaY = ev.clientY - prevMouseY;

            // Calculate rotation angles based on mouse movement
            g_globalAngle += deltaX * 0.5;
            g_globalAngleX += deltaY * 0.5;

            renderScene();

            prevMouseX = ev.clientX;
            prevMouseY = ev.clientY;
        }
    };
    // ------------------------------------
    canvas.onmouseup = function(ev) {
        prevMouseX = 0;
        prevMouseY = 0;
    };

}

function initTextures() {

    // img0
    var image = new Image();
    if (!image) {
        console.log('Failed to create the image0 object');
        return false;
    }

    image.onload = function() { sendTextureToGLSL(image); };
    image.src = 'imgs/stone.jpeg';
    // return true;

    // img1
    var image1 = new Image();
    if (!image1) {
        console.log('Failed to create the image1 object');
        return false;
    }

    image1.onload = function() { sendTextureToGLSL1(image1); };
    image1.src = 'imgs/dirt.jpeg';

    // img2
    var image2 = new Image();
    if (!image2) {
        console.log('Failed to create the image2 object');
        return false;
    }

    image2.onload = function() { sendTextureToGLSL2(image2); };
    image2.src = 'imgs/sky.jpeg';

    // img3
    var image3 = new Image();
    if (!image3) {
        console.log('Failed to create the image2 object');
        return false;
    }

    image3.onload = function() { sendTextureToGLSL3(image3); };
    image3.src = 'imgs/grass.png';

    return true;

}

function sendTextureToGLSL(image) {
    var texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // enable texture unit0
    gl.activeTexture(gl.TEXTURE0);
    // bind the texture
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // set the texture params
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // set texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler0, 0);

    console.log('finished stone');
}

function sendTextureToGLSL1(image) {
    var texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // enable texture unit0
    gl.activeTexture(gl.TEXTURE1);
    // bind the texture
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // set the texture params
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // set texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler1, 1);

    console.log('finished dirt');
}

function sendTextureToGLSL2(image) {
    var texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // enable texture unit0
    gl.activeTexture(gl.TEXTURE2);
    // bind the texture
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // set the texture params
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // set texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler2, 2);

    console.log('finished sky');
}

function sendTextureToGLSL3(image) {
    var texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // enable texture unit0
    gl.activeTexture(gl.TEXTURE3);
    // bind the texture
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // set the texture params
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // set texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler3, 3);

    console.log('finished grass');
}

function main() {
    setupWebGL();
    connectVariablesToGSL();
    addActionsForHtmlUI();
    document.onkeydown = keydown;
    initTextures();

    // Register function (event handler) to be called on a mouse press
    // canvas.onmousedown = click;

    // // Drawing mouse move 
    // canvas.onmousemove = function(ev) {
    //     if (ev.buttons == 1) {
    //         click(ev);
    //     }
    // }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Clear <canvas>
    // gl.clear(gl.COLOR_BUFFER_BIT);
    renderScene();

    requestAnimationFrame(tick);
}
var g_startTime = performance.now() / 1000.0;
var g_seconds = performance.now() / 1000.0 - g_startTime;

function tick() {
    if (animationRunning) {
        g_seconds = performance.now() / 1000.0 - g_startTime;
        updateAnimation();
        renderScene();
        requestAnimationFrame(tick);
    }
}

function startAnimation() {
    if (!animationRunning) {
        g_startTime = performance.now() / 1000.0;
        animationRunning = true;
        tick();
    }
}

function stopAnimation() {
    animationRunning = false;
}


function updateAnimation() {
    g_globalAngle += 0.1;
    g_legsAngle = Math.sin(g_seconds * 2) * 45;
    g_tailAngle = Math.sin(g_seconds * 3) * 30;
    g_tailAngleX = Math.cos(g_seconds * 3) * 30;
}

var g_shapesList = [];
var g_selectedCount = 10;

// var g_points = []; // The array for the position of a mouse press
// var g_colors = []; // The array to store the color of a point
// var g_sizes = [];

function click(ev) {

    // Extract the event click and return it in WebGL coords
    let [x, y] = convertCoordinateEventsToGL(ev);

    // Create and store the new point
    let point;
    if (g_selectedType === POINT) {
        point = new Point();
    } else if (g_selectedType === TRIANGLE) {
        point = new Triangle();
    } else if (g_selectedType === CIRCLE) {
        point = new Circle();
        point.segments = g_selectedCount;
    }
    point.position = [x, y];
    point.color = g_selectedColor.slice();
    point.size = g_selectedSize;
    g_shapesList.push(point);

    // Store the coordinates to g_points array
    // g_points.push([x, y]);

    // // Store the color to g_colors array
    // g_colors.push(g_selectedColor.slice());

    // // store the size to array
    // g_sizes.push(g_selectedSize);

    // Draw every shape that is supposed to be in the canvas
    renderScene();
}

function convertCoordinateEventsToGL(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    return ([x, y]);
}

// var g_eye = [0, 0, 3];
// var g_at = [0, 0, -100];
// var g_up = [0, 1, 0];

function keydown(ev) {
    if (ev.keyCode == 68) { // D right
        g_eye[0] += 0.2;
    } else if (ev.keyCode == 65) { // A left
        g_eye[0] -= 0.2;
    } else if (ev.keyCode == 87) { // W forward

        // ----- these three following lines were written with the help of CHATGPT -----
        var forward = [g_at[0] - g_eye[0], g_at[1] - g_eye[1], g_at[2] - g_eye[2]];
        var length = Math.sqrt(forward[0] * forward[0] + forward[1] * forward[1] + forward[2] * forward[2]);
        forward = [forward[0] / length, forward[1] / length, forward[2] / length];
        // ----------------------------------------------------------------------------
        g_eye[0] += forward[0] * 0.2;
        g_eye[1] += forward[1] * 0.2;
        g_eye[2] += forward[2] * 0.2;
    } else if (ev.keyCode == 83) { // S back
        var forward = [g_at[0] - g_eye[0], g_at[1] - g_eye[1], g_at[2] - g_eye[2]];
        var length = Math.sqrt(forward[0] * forward[0] + forward[1] * forward[1] + forward[2] * forward[2]);
        forward = [forward[0] / length, forward[1] / length, forward[2] / length];
        g_eye[0] -= forward[0] * 0.2;
        g_eye[1] -= forward[1] * 0.2;
        g_eye[2] -= forward[2] * 0.2;
    } else if (ev.keyCode == 81) { // Q rotate left
        var angle = 0.15; // Adjust as needed
        var x = g_at[0] - g_eye[0];
        var z = g_at[2] - g_eye[2];
        // ----- these two following lines were written with the help of CHATGPT -----
        g_at[0] = g_eye[0] + (x * Math.cos(angle) - z * Math.sin(angle));
        g_at[2] = g_eye[2] + (x * Math.sin(angle) + z * Math.cos(angle));
        // ----------------------------------------------------------------------------
        g_eye[0] += forward[0] * 0.2;
    } else if (ev.keyCode == 69) { // E rotate right
        var angle = -0.15;
        var x = g_at[0] - g_eye[0];
        var z = g_at[2] - g_eye[2];
        g_at[0] = g_eye[0] + (x * Math.cos(angle) - z * Math.sin(angle));
        g_at[2] = g_eye[2] + (x * Math.sin(angle) + z * Math.cos(angle));
    } else if (ev.keyCode == 38) { // up arrow
        g_eye[1] += 0.2;
    } else if (ev.keyCode == 40) { // down arrow
        g_eye[1] -= 0.2;
    }

    renderScene();
    console.log(ev.keyCode);
}
var g_eye = [0, 0, 5];
var g_at = [0, 0, -100];
var g_up = [0, 1, 0];

var g_map = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

function drawMap() {
    for (x = 0; x < 32; x++) {
        for (y = 0; y < 32; y++) {
            if (x == 0 || x == 31 || y == 0 || y == 31) {
                var block = new Cube();
                block.textureNum = 0;
                block.color = [0.8, 1.0, 1.0, 1.0];
                block.matrix.translate(0, -1, 0); // Adjust height
                block.matrix.scale(.3, 1.5, .3); // Adjust height
                block.matrix.translate(x - 16, 0, y - 16);
                block.render();
            }
        }
    }
}



function renderScene() {

    var startTime = performance.now();

    var projMat = new Matrix4();
    projMat.setPerspective(50, 1 * canvas.width / canvas.height, 1, 100);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    var viewMat = new Matrix4();
    viewMat.setLookAt(g_eye[0], g_eye[1], g_eye[2], g_at[0], g_at[1], g_at[2], g_up[0], g_up[1], g_up[2]);
    // viewMat.setLookAt(0, 0, 3, 0, 0, -100, 0, 1, 0);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

    var globalRotMatY = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
    var globalRotMatX = new Matrix4().setRotate(g_globalAngleX, 1, 0, 0);
    var globalRotMatZ = new Matrix4().setRotate(g_globalAngleZ, 0, 0, 1);


    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 1, 0, 0)
    globalRotMat.multiply(globalRotMatX);
    globalRotMat.multiply(globalRotMatY);
    globalRotMat.multiply(globalRotMatZ);

    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // var len = g_shapesList.length;
    // for (var i = 0; i < len; i++) {
    //     g_shapesList[i].render();
    // }

    //draw the body cube
    // var body = new Cube();
    // body.color = [1.0, 0.0, 0.0, 1.0];
    // body.matrix.translate(-.25, -.5, 0.0);
    // body.matrix.scale(0.5, 1, .5);
    // body.render();

    // // draw a left arm
    // var leftArm = new Cube();
    // leftArm.color = [1.0, 1.0, 0.0, 1.0];
    // leftArm.matrix.translate(.7, 0.0, 0.0);
    // leftArm.matrix.rotate(45, 0, 0, 1);
    // leftArm.matrix.scale(0.25, .7, .5);
    // leftArm.render();

    // // draw a test arm
    // var boxTest = new Cube();
    // boxTest.color = [1.0, 0.0, 1.0, 1.0];
    // boxTest.matrix.translate(0, 0, -.50, 0.0);
    // boxTest.matrix.rotate(30, 1, 0, 0);
    // boxTest.matrix.scale(0.5, .5, .5);
    // boxTest.render();

    var floor = new Cube();
    floor.color = [1.0, 0.0, 0.0, 1.0];
    floor.textureNum = 1;
    floor.matrix.translate(-0, -.75, -0);
    floor.matrix.scale(35, .01, 35);
    floor.matrix.translate(-.15, 0, -.15);
    floor.render();

    var floor2 = new Cube();
    floor2.color = [1.0, 0.0, 0.0, 1.0];
    floor2.textureNum = 3;
    floor2.matrix.translate(-3, -.70, -3);
    floor2.matrix.scale(9.7, .01, 9.7);
    floor2.matrix.translate(-.15, 0, -.15);
    floor2.render();

    var sky = new Cube();
    sky.color = [1.0, 0.0, 0.0, 1.0];
    sky.textureNum = 2;
    sky.matrix.scale(50, 50, 50);
    sky.matrix.translate(-.5, -.5, -.5);
    sky.render();


    var ball = new Cube();
    ball.color = [1.0, 0.0, 0.0, 1.0];
    ball.matrix.translate(0, -.5, -3);
    ball.matrix.scale(.2, .2, .2);
    ball.render();

    var body = new Cube();
    body.color = [0.8, 0.8, 0.8, 1.0];
    body.matrix.translate(-0.45, -0.4, 0.0);
    body.matrix.scale(0.5, 0.4, 0.5);
    body.render();

    var body2 = new Cube();
    body2.color = [0.8, 0.8, 0.8, 1.0];
    body2.matrix.translate(-0.45, -0.4, -0.3);
    body2.matrix.scale(0.5, 0.45, 0.3);
    body2.render();

    var body3 = new Cube();
    body3.color = [0.8, 0.8, 0.8, 1.0];
    body3.matrix.translate(-0.45, -0.4, -0.5);
    body3.matrix.scale(0.45, 0.39, 0.2);
    body3.render();

    var ears1 = new Cube();
    ears1.color = [0.6, 0.6, 0.6, 1.0];
    ears1.matrix.translate(-0.45, -.01, -0.35);
    ears1.matrix.scale(0.1, 0.15, 0.05);
    ears1.render();

    var ears2 = new Cube();
    ears2.color = [0.6, 0.6, 0.6, 1.0];
    ears2.matrix.translate(-.05, -.01, -0.35);
    ears2.matrix.scale(0.1, 0.15, 0.05);
    ears2.render();

    var leg1 = new Cube();
    leg1.color = [0.8, 0.8, 0.8, 1.0];
    leg1.matrix.translate(-0.4, -0.28, -0.2);
    leg1.matrix.rotate(-g_legsAngle, 1, 0, 0);
    leg1.matrix.translate(0, -0.4, 0);
    leg1.matrix.scale(0.1, 0.5, 0.1);
    leg1.render();

    var leg2 = new Cube();
    leg2.color = [0.8, 0.8, 0.8, 1.0];
    leg2.matrix.translate(-0.1, -0.38, -0.2);
    leg2.matrix.rotate(-g_legsAngle, 1, 0, 0);
    leg2.matrix.translate(0, -0.3, 0);
    leg2.matrix.scale(0.1, 0.5, 0.1);
    leg2.render();

    var leg3 = new Cube();
    leg3.color = [0.8, 0.8, 0.8, 1.0];
    leg3.matrix.translate(-0.4, -0.38, 0.2);
    leg3.matrix.rotate(g_legsAngle, 1, 0, 0);
    leg3.matrix.translate(0, -0.3, 0);
    leg3.matrix.scale(0.1, 0.5, 0.1);
    leg3.render();

    var leg4 = new Cube();
    leg4.color = [0.8, 0.8, 0.8, 1.0];
    leg4.matrix.translate(-0.1, -0.38, 0.2);
    leg4.matrix.rotate(g_legsAngle, 1, 0, 0);
    leg4.matrix.translate(0, -0.3, 0);
    leg4.matrix.scale(0.1, 0.5, 0.1);
    leg4.render();

    var tail = new Cube();
    tail.color = [0.8, 0.8, 0.8, 1.0];
    tail.matrix.translate(-0.25, -0.3, 0.5);
    tail.matrix.rotate(g_tailAngle, 0, 0, 1);
    var tailCoord = new Matrix4(tail.matrix);
    tail.matrix.scale(0.1, 0.1, 0.3);
    tail.render();

    var tail2 = new Cube();
    tail2.color = [0.6, 0.6, 0.6, 1.0];
    tail2.matrix = tailCoord;
    tail2.matrix.translate(0, 0, 0.3);
    tail2.matrix.rotate(g_tailAngle2, 0, 1, 0);
    tail2.matrix.rotate(g_tailAngle * 0.01, 0, 0, 1);
    tail2.matrix.rotate(g_tailAngle * 0.01, 0, 0, 1);
    tail2.matrix.scale(0.15, 0.15, 0.15);
    tail2.render();

    var snout = new Cube();
    snout.color = [0.8, 0.7, 0.5, 1.0];
    snout.matrix.translate(-0.33, -0.4, -0.7);
    snout.matrix.scale(0.25, 0.25, 0.3);
    snout.render();

    var eyes1 = new Cube();
    eyes1.color = [0.2, 0.2, 0.2, 1.0];
    eyes1.matrix.translate(-.08, -0.15, -0.55);
    eyes1.matrix.scale(0.05, 0.05, 0.05);
    eyes1.render();

    var eyes2 = new Cube();
    eyes2.color = [0.2, 0.2, 0.2, 1.0];
    eyes2.matrix.translate(-.37, -0.15, -0.55);
    eyes2.matrix.scale(0.05, 0.05, 0.05);
    eyes2.render();

    var nose = new Cube();
    nose.color = [0.2, 0.2, 0.2, 1.0];
    nose.matrix.translate(-.25, -0.2, -0.75);
    nose.matrix.scale(0.08, 0.08, 0.08);
    nose.render();

    drawMap();
    var duration = performance.now() - startTime;
    // SendTextToHTML("numdot:" + len + " ms:" + Math.floor(duration) + " fps: " + Math.floor(10000 / duration) / 10, "numdot");
    var duration = performance.now() - startTime;
    SendTextToHTML(" ms:" + Math.floor(duration) + " fps: " + Math.floor(10000 / duration) / 10, "fps");
}



function SendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    htmlElm.innerHTML = text;
}

function SendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
        console.log("Failes to get " + htmlID);
        return;
    }
    htmlElm.innerHTML = text;
}