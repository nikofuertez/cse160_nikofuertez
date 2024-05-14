class Cube {
    constructor() {
        this.type = 'cube';
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
        this.textureNum = -2;
    }

    render() {
        // var xy = this.position;
        var rgba = this.color;
        // var size = this.size;
        // this.matrix = new Matrix();
        gl.uniform1i(u_whichTexture, this.textureNum);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Front of Cube
        drawTriangle3DUV([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0], [0, 0, 1, 1, 1, 0]);
        drawTriangle3DUV([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0], [0, 0, 1, 1, 0, 1]);
        // Back of Cube
        drawTriangle3DUV([0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0], [0, 0, 0, 1, 1, 1])
        drawTriangle3DUV([0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0], [0, 0, 1, 1, 1, 0]);

        gl.uniform4f(u_FragColor, rgba[0] - .08, rgba[1] - .08, rgba[2] - .08, rgba[3]);
        // Top
        drawTriangle3DUV([0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0, 0, 0, 1, 1, 1]);
        drawTriangle3DUV([0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0], [0, 0, 1, 1, 1, 0]);
        // Bottom
        drawTriangle3DUV([0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], [0, 0, 1, 1, 1, 0])
        drawTriangle3DUV([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0], [0, 0, 0, 1, 1, 1]);
        gl.uniform4f(u_FragColor, rgba[0] - .10, rgba[1] - .10, rgba[2] - .10, rgba[3]);
        // Left
        drawTriangle3DUV([0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0], [0, 0, 1, 1, 1, 0]);
        drawTriangle3DUV([0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0], [0, 0, 1, 1, 0, 1]);
        // Right
        drawTriangle3DUV([1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0], [0, 0, 1, 1, 1, 0]);
        drawTriangle3DUV([1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], [0, 0, 1, 1, 0, 1]);

        // let angleStep = 360 / this.segments;
        // for (var angle = 0; angle < 360; angle = angle + angleStep) {
        //     let centerPt = [xy[0], xy[1]];
        //     let angle1 = angle;
        //     let angle2 = angle + angleStep;
        //     let vec1 = [Math.cos(angle1 * Math.PI / 180) * d, Math.sin(angle1 * Math.PI / 180) * d];
        //     let vec2 = [Math.cos(angle2 * Math.PI / 180) * d, Math.sin(angle2 * Math.PI / 180) * d];
        //     let pt1 = [centerPt[0] + vec1[0], centerPt[1] + vec1[1]];
        //     let pt2 = [centerPt[0] + vec2[0], centerPt[1] + vec2[1]];

        //     drawTriangle([xy[0], xy[1], pt1[0], pt1[1], pt2[0], pt2[1]]);
        // }
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    }
}