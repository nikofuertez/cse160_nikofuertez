var ctx;
var canvas;

function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('mycanvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');
    // Draw a black square canvas
    ctx.fillStyle = 'black'; // Set black color
    ctx.fillRect(0, 0, 400, 400); // Fill a square with the color

    //------------------------------------------------------------------
    var v1 = new Vector3([2.25, 2.25, 0]); // Set the z coordinate to zero
    drawVector(v1, "red"); // drawing a red vector
    document.getElementById('drawButton').addEventListener('click', handleDrawEvent);
    document.getElementById('drawButton2').addEventListener('click', handleDrawOperationEvent);

    function drawVector(v, color) {
        var canvasX = canvas.width / 2
        var canvasY = canvas.height / 2

        ctx.strokeStyle = color; // Set color
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20, v.elements[2] * 20);
        ctx.stroke();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black'; // Set black color
        ctx.fillRect(0, 0, 400, 400); // Fill a square with the color
    }

    function handleDrawEvent() {
        // 1. Clear the canvas
        clearCanvas();

        // 2. Read the values of the text boxes to create v1
        // COLOR
        ctx.strokeStyle = 'red';
        // COORDINATES
        var x1 = document.getElementById('x1').value;
        var y1 = document.getElementById('y1').value;
        var x2 = document.getElementById('x2').value;
        var y2 = document.getElementById('y2').value;
        // 3. CALL DRAW VECTOR
        var v1 = new Vector3([x1, y1, 0]);
        drawVector(v1, "red");
        var v2 = new Vector3([x2, y2, 0]);
        drawVector(v2, "blue");


    }

    function handleDrawOperationEvent() {
        console.log("handleDrawOperationEvent called");
        // 1. Clear the canvas
        clearCanvas();
        // 2/3. Read the values of the text boxes to create v1 and call drawVector(v1, "red") .Read the values of the text boxes to create v2 and call drawVector(v2, "blue") .  
        var x1 = document.getElementById('x1').value;
        var y1 = document.getElementById('y1').value;
        var x2 = document.getElementById('x2').value;
        var y2 = document.getElementById('y2').value;
        var scalar = document.getElementById('scalr').value;

        var v1 = new Vector3([x1, y1, 0]);
        drawVector(v1, "red");
        var v2 = new Vector3([x2, y2, 0]);
        drawVector(v2, "blue");

        // 4. Read the value of the selector and call the respective Vector3 function.
        var operator = document.getElementById('oper').value;
        var v3;
        var v4;
        // ADD
        if (operator == "Add") {
            v3 = v1.add(v2);
            drawVector(v3, "green");
            // SUBTRACT
        } else if (operator == "Subtract") {
            v3 = v1.sub(v2);
            drawVector(v3, "green");
            // MULTIPLY
        } else if (operator == "Multiply") {
            v3 = v1.mul(scalar);
            v4 = v2.mul(scalar);
            drawVector(v3, "green");
            drawVector(v4, "green");
            // DIVIDE
        } else if (operator == "Divide") {
            v3 = v1.div(scalar);
            v4 = v2.div(scalar);
            drawVector(v3, "green");
            drawVector(v4, "green");
            // MAGNITUDE
        } else if (operator == "Magnitude") {
            console.log("Magnitude v1: " + v1.magnitude());
            console.log("Magnitude v2: " + v2.magnitude());
            // NORMALIZE
        } else if (operator == "Normalize") {
            var v1Norm = v1.normalize();
            drawVector(v1Norm, "green");
            var v2Norm = v2.normalize();
            drawVector(v2Norm, "green");
        } else if (operator == "AngleB") {
            console.log("Angle: " + (angleBetween(v1, v2)).toFixed(2));
        } else if (operator == "Area") {
            console.log("Area of this triangle: " + (areaTriangle(v1, v2)).toFixed(2));
        }
    }

    function angleBetween(v1, v2) {
        var m1 = v1.magnitude();
        var m2 = v2.magnitude();
        var magProduct = m1 * m2;
        var dotProduct = Vector3.dot(v1, v2);
        var angleRadians = Math.acos(dotProduct / magProduct);
        angleRadians *= 180 / Math.PI;

        return angleRadians;
    }

    function areaTriangle(v1, v2) {
        let area = Vector3.cross(v1, v2).magnitude();
        area = area / 2;
        return area;
    }


}
document.addEventListener('DOMContentLoaded', main);