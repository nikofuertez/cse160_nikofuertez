// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform float u_Size;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = u_Size;
}`

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = u_FragColor;
    }`

// Global Variable
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    // Get the rendering context for WebGL
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
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

    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    // Get the storage location of Size
    u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    if (!u_Size) {
        console.log('Failed to get the storage location of u_Size');
        return;
    }
}
// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
// Gloabs related to UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;

function addActionsForHtmlUI() {

    document.getElementById('clearC').onclick = function() {
        g_shapesList = [];
        renderAllShapes();
    }

    document.getElementById('Point').onclick = function() { g_selectedType = POINT };
    document.getElementById('Triangle').onclick = function() { g_selectedType = TRIANGLE };
    document.getElementById('Circle').onclick = function() { g_selectedType = CIRCLE };

    document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectedColor[0] = this.value / 100; });
    document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectedColor[1] = this.value / 100; });
    document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectedColor[2] = this.value / 100; });

    document.getElementById('shapeSizeSlide').addEventListener('mouseup', function() { g_selectedSize = this.value; });
    document.getElementById('circleSegmentSlide').addEventListener('mouseup', function() { g_selectedCount = this.value; });

    document.getElementById('drawButton').onclick = function() {
        g_shapesList = [];
        drawPicture();
    }

    document.getElementById('alphaSlider').addEventListener('mouseup', function() { g_selectedColor[3] = this.value / 100; });
}

function drawPicture() {
    // Clear the shapes list
    g_shapesList = [];

    // let backg = new Point();
    // backg.position = [0, -0.5]; // Position at the bottom left
    // backg.color = [0.7, 1.0, 1.0, 1.0]; // Green color
    // backg.size = 100; // Set size
    // backg.segments = 30; // Set number of segments for smoothness
    // g_shapesList.push(backg);

    // Add a blue point
    let bluePoint = new Point();
    bluePoint.position = [0.5, -0.5]; // Position at the bottom right
    bluePoint.color = [0.0, 0.7, 1.0, .2]; // Blue color
    bluePoint.size = 1000; // Set size
    g_shapesList.push(bluePoint);

    // hills

    let hills = new Circle();
    hills.position = [1, -1];
    hills.color = [0.0, 0.5, 0.0, 1.0];
    hills.size = 200;
    hills.segments = 30;
    g_shapesList.push(hills);

    let hills2 = new Circle();
    hills2.position = [-.9, -1];
    hills2.color = [0.0, 0.5, 0.0, 1.0];
    hills2.size = 200;
    hills2.segments = 30;
    g_shapesList.push(hills2);
    // DITTO
    let ditto_1 = new Circle();
    ditto_1.position = [0, -0.5]; // Position at the bottom left
    ditto_1.color = [0.7, 0.5, 1.0, 1.0]; // Green color
    ditto_1.size = 75; // Set size
    ditto_1.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(ditto_1);

    let ditto_2 = new Circle();
    ditto_2.position = [-0.4, -0.4]; // Position at the bottom left
    ditto_2.color = [0.7, 0.5, 1.0, 1.0]; // Green color
    ditto_2.size = 40; // Set size
    ditto_2.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(ditto_2);

    let ditto_3 = new Circle();
    ditto_3.position = [-0.4, -0.7]; // Position at the bottom left
    ditto_3.color = [0.7, 0.5, 1.0, 1.0]; // Green color
    ditto_3.size = 40; // Set size
    ditto_3.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(ditto_3);

    let ditto_4 = new Circle();
    ditto_4.position = [.4, -0.7]; // Position at the bottom left
    ditto_4.color = [0.7, 0.5, 1.0, 1.0]; // Green color
    ditto_4.size = 40; // Set size
    ditto_4.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(ditto_4);

    let ditto_5 = new Circle();
    ditto_5.position = [.4, -0.4]; // Position at the bottom left
    ditto_5.color = [0.7, 0.5, 1.0, 1.0]; // Green color
    ditto_5.size = 40; // Set size
    ditto_5.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(ditto_5);

    let ditto_6 = new Circle();
    ditto_6.position = [-.2, -0.25]; // Position at the bottom left
    ditto_6.color = [0.7, 0.5, 1.0, 1.0]; // Green color
    ditto_6.size = 50; // Set size
    ditto_6.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(ditto_6);

    let ditto_7 = new Circle();
    ditto_7.position = [.2, -0.25]; // Position at the bottom left
    ditto_7.color = [0.7, 0.5, 1.0, 1.0]; // Green color
    ditto_7.size = 50; // Set size
    ditto_7.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(ditto_7);

    // Add a red triangle
    let grassblade_1 = new Triangle();
    grassblade_1.position = [-1, -1]; // Position at the top center
    grassblade_1.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_1.size = 50; // Set size
    g_shapesList.push(grassblade_1);

    let grassblade_2 = new Triangle();
    grassblade_2.position = [-.8, -1]; // Position at the top center
    grassblade_2.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_2.size = 50; // Set size
    g_shapesList.push(grassblade_2);

    let grassblade_3 = new Triangle();
    grassblade_3.position = [-.6, -1]; // Position at the top center
    grassblade_3.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_3.size = 50; // Set size
    g_shapesList.push(grassblade_3);

    let grassblade_4 = new Triangle();
    grassblade_4.position = [-.4, -1]; // Position at the top center
    grassblade_4.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_4.size = 50; // Set size
    g_shapesList.push(grassblade_4);

    let grassblade_5 = new Triangle();
    grassblade_5.position = [-.2, -1]; // Position at the top center
    grassblade_5.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_5.size = 50; // Set size
    g_shapesList.push(grassblade_5);

    let grassblade_6 = new Triangle();
    grassblade_6.position = [0, -1]; // Position at the top center
    grassblade_6.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_6.size = 50; // Set size
    g_shapesList.push(grassblade_6);

    let grassblade_7 = new Triangle();
    grassblade_7.position = [0, -1]; // Position at the top center
    grassblade_7.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_7.size = 50; // Set size
    g_shapesList.push(grassblade_7);

    let grassblade_8 = new Triangle();
    grassblade_8.position = [0.2, -1]; // Position at the top center
    grassblade_8.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_8.size = 50; // Set size
    g_shapesList.push(grassblade_8);

    let grassblade_9 = new Triangle();
    grassblade_9.position = [0.4, -1]; // Position at the top center
    grassblade_9.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_9.size = 50; // Set size
    g_shapesList.push(grassblade_9);

    let grassblade_10 = new Triangle();
    grassblade_10.position = [0.6, -1]; // Position at the top center
    grassblade_10.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_10.size = 50; // Set size
    g_shapesList.push(grassblade_10);

    let grassblade_11 = new Triangle();
    grassblade_11.position = [0.8, -1]; // Position at the top center
    grassblade_11.color = [0.5, 0.9, 0.5, 1.0]; // Red color
    grassblade_11.size = 50; // Set size
    g_shapesList.push(grassblade_11);

    // POKEBALL
    let pokeball_1 = new Circle();
    pokeball_1.position = [-.6, -.7]; // Position at the bottom left
    pokeball_1.color = [1.0, 0.0, 0.0, 1.0]; // Green color
    pokeball_1.size = 40; // Set size
    pokeball_1.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(pokeball_1);

    let pokeball_2 = new Circle();
    pokeball_2.position = [-.6, -.7]; // Position at the bottom left
    pokeball_2.color = [0.0, 0.0, 0.0, 1.0]; // Green color
    pokeball_2.size = 15; // Set size
    pokeball_2.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(pokeball_2);

    let pokeball_3 = new Point();
    pokeball_3.position = [-.7, -.7]; // Position at the bottom left
    pokeball_3.color = [0.0, 0.0, 0.0, 1.0]; // Green color
    pokeball_3.size = 17; // Set size
    pokeball_3.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(pokeball_3);

    let pokeball_4 = new Point();
    pokeball_4.position = [-.78, -.7]; // Position at the bottom left
    pokeball_4.color = [0.0, 0.0, 0.0, 1.0]; // Green color
    pokeball_4.size = 17; // Set size
    pokeball_4.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(pokeball_4);

    let pokeball_5 = new Point();
    pokeball_5.position = [-.5, -.7]; // Position at the bottom left
    pokeball_5.color = [0.0, 0.0, 0.0, 1.0]; // Green color
    pokeball_5.size = 17; // Set size
    pokeball_5.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(pokeball_5);

    let pokeball_6 = new Point();
    pokeball_6.position = [-.43, -.7]; // Position at the bottom left
    pokeball_6.color = [0.0, 0.0, 0.0, 1.0]; // Green color
    pokeball_6.size = 17; // Set size
    pokeball_6.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(pokeball_6);

    let pokeball_7 = new Circle();
    pokeball_7.position = [-.6, -.7]; // Position at the bottom left
    pokeball_7.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    pokeball_7.size = 10; // Set size
    pokeball_7.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(pokeball_7);

    // dittosmile

    let face = new Circle();
    face.position = [-.2, -.3];
    face.color = [0.0, 0.0, 0.0, 1.0];
    face.size = 5;
    face.segments = 30;
    g_shapesList.push(face);

    let face2 = new Circle();
    face2.position = [0.2, -.3];
    face2.color = [0.0, 0.0, 0.0, 1.0];
    face2.size = 5;
    face2.segments = 30;
    g_shapesList.push(face2);

    let face3 = new Circle();
    face3.position = [0, -.4];
    face3.color = [0.0, 0.0, 0.0, 1.0]; // Yellow color
    face3.size = 15; // Set size
    face3.segments = 30;
    g_shapesList.push(face3);

    // sun

    let sun = new Triangle();
    sun.position = [0.4, 0.5];
    sun.color = [1.0, 1.0, 0.0, 1.0]; // Yellow color
    sun.size = 25; // Set size
    g_shapesList.push(sun);

    let sun2 = new Triangle();
    sun2.position = [0.3, 0.75];
    sun2.color = [1.0, 1.0, 0.0, 1.0];
    sun2.size = 25;
    g_shapesList.push(sun2);

    let sun3 = new Triangle();
    sun3.position = [0.6, 0.3];
    sun3.color = [1.0, 1.0, 0.0, 1.0];
    sun3.size = 25;
    g_shapesList.push(sun3);

    let sun4 = new Triangle();
    sun4.position = [0.8, 0.2];
    sun4.color = [1.0, 1.0, 0.0, 1.0];
    sun4.size = 25;
    g_shapesList.push(sun4);

    let sun5 = new Circle();
    sun5.position = [0.9, 0.9];
    sun5.color = [1.0, 1.0, 0.0, 1.0];
    sun5.size = 80;
    sun5.segments = 30;
    g_shapesList.push(sun5);

    // more grass

    let ggrassblade_1 = new Triangle();
    ggrassblade_1.position = [-1, -1]; // Position at the top center
    ggrassblade_1.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_1.size = 30; // Set size
    g_shapesList.push(ggrassblade_1);

    let ggrassblade_2 = new Triangle();
    ggrassblade_2.position = [-.8, -1]; // Position at the top center
    ggrassblade_2.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_2.size = 30; // Set size
    g_shapesList.push(ggrassblade_2);

    let ggrassblade_3 = new Triangle();
    ggrassblade_3.position = [-.6, -1]; // Position at the top center
    ggrassblade_3.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_3.size = 30; // Set size
    g_shapesList.push(ggrassblade_3);

    let ggrassblade_4 = new Triangle();
    ggrassblade_4.position = [-.4, -1]; // Position at the top center
    ggrassblade_4.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_4.size = 30; // Set size
    g_shapesList.push(ggrassblade_4);

    let ggrassblade_5 = new Triangle();
    ggrassblade_5.position = [-.2, -1]; // Position at the top center
    ggrassblade_5.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_5.size = 30; // Set size
    g_shapesList.push(ggrassblade_5);

    let ggrassblade_6 = new Triangle();
    ggrassblade_6.position = [0, -1]; // Position at the top center
    ggrassblade_6.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_6.size = 30; // Set size
    g_shapesList.push(ggrassblade_6);

    let ggrassblade_7 = new Triangle();
    ggrassblade_7.position = [0, -1]; // Position at the top center
    ggrassblade_7.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_7.size = 30; // Set size
    g_shapesList.push(ggrassblade_7);

    let ggrassblade_8 = new Triangle();
    ggrassblade_8.position = [0.2, -1]; // Position at the top center
    ggrassblade_8.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_8.size = 30; // Set size
    g_shapesList.push(ggrassblade_8);

    let ggrassblade_9 = new Triangle();
    ggrassblade_9.position = [0.4, -1]; // Position at the top center
    ggrassblade_9.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_9.size = 30; // Set size
    g_shapesList.push(ggrassblade_9);

    let ggrassblade_10 = new Triangle();
    ggrassblade_10.position = [0.6, -1]; // Position at the top center
    ggrassblade_10.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_10.size = 30; // Set size
    g_shapesList.push(ggrassblade_10);

    let ggrassblade_11 = new Triangle();
    ggrassblade_11.position = [0.8, -1]; // Position at the top center
    ggrassblade_11.color = [0.0, 0.5, 0.0, 1.0]; // Red color
    ggrassblade_11.size = 30; // Set size
    g_shapesList.push(ggrassblade_11);

    // clouds
    let cloud = new Circle();
    cloud.position = [-.6, .7]; // Position at the bottom left
    cloud.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    cloud.size = 30; // Set size
    cloud.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(cloud);

    let cloud2 = new Circle();
    cloud2.position = [-.4, .7]; // Position at the bottom left
    cloud2.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    cloud2.size = 30; // Set size
    cloud2.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(cloud2);

    let cloud3 = new Circle();
    cloud3.position = [-.2, .7]; // Position at the bottom left
    cloud3.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    cloud3.size = 30; // Set size
    cloud3.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(cloud3);

    let cloud4 = new Circle();
    cloud4.position = [-.3, .5]; // Position at the bottom left
    cloud4.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    cloud4.size = 30; // Set size
    cloud4.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(cloud4);

    let cloud5 = new Circle();
    cloud5.position = [-.5, .5]; // Position at the bottom left
    cloud5.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    cloud5.size = 30; // Set size
    cloud5.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(cloud5);

    let cloud6 = new Circle();
    cloud6.position = [-.7, .5]; // Position at the bottom left
    cloud6.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    cloud6.size = 30; // Set size
    cloud6.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(cloud6);

    let cloud7 = new Circle();
    cloud7.position = [-.1, .5]; // Position at the bottom left
    cloud4.color = [1.0, 1.0, 1.0, 1.0]; // Green color
    cloud7.size = 30; // Set size
    cloud7.segments = 30; // Set number of segments for smoothness
    g_shapesList.push(cloud7);

    // Render all shapes
    renderAllShapes();
}

function main() {
    setupWebGL();
    connectVariablesToGSL()
    addActionsForHtmlUI();

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = click;

    // Drawing mouse move 
    canvas.onmousemove = function(ev) {
        if (ev.buttons == 1) {
            click(ev);
        }
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);


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
    renderAllShapes();
}

function convertCoordinateEventsToGL(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    return ([x, y]);
}

function renderAllShapes() {

    var startTime = performance.now();
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_shapesList.length;
    for (var i = 0; i < len; i++) {
        g_shapesList[i].render();
    }

    var duration = performance.now() - startTime;
    SendTextToHTML("numdot:" + len + " ms:" + Math.floor(duration) + " fps: " + Math.floor(10000 / duration) / 10, "numdot");
}

function SendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
        console.log("Failes to get " + htmlID);
        return;
    }
    htmlElm.innerHTML = text;
}