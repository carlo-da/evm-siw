/**
 * Animated 2D Abstract Background with Collision Detection for elements
 */

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.prepend(canvas);

// Canvas styling 
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1';
canvas.style.backgroundColor = '#ffffff';

let width, height;
let shapes = [];

const colors = {
    bordeaux: '#a23a40',
    viola: '#3c2284',
    darkBlue: '#1e2b45'
};

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();


function isOverlapping(x, y, radius, existingShapes) {
    for (let shape of existingShapes) {
        const dx = x - shape.x;
        const dy = y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < (radius + shape.radius + 30)) {
            return true;
        }
    }
    return false;
}

class AbstractShape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = 0.005 + Math.random() * 0.01;
        this.radius = 40;
    }

    update() {
        this.angle += this.velocity;
    }
    draw() {}
}

class DotGrid extends AbstractShape {
    constructor(x, y, rows, cols, color) {
        super(x, y);
        this.rows = rows;
        this.cols = cols;
        this.color = color;
        this.radius = Math.max(rows, cols) * 12;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * 0.2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                ctx.beginPath();
                ctx.arc(c * 12, r * 12, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.restore();
    }
}

class CornerWave extends AbstractShape {
    constructor(x, y, color, size) {
        super(x, y);
        this.color = color;
        this.size = size;
        this.time = Math.random() * 100;
        this.radius = size * 0.8; 
        }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        for (let i = 0; i < Math.PI * 2; i += 0.1) {
            const x = Math.cos(i) * (this.size + Math.sin(i * 3 + this.time) * 20);
            const y = Math.sin(i) * (this.size + Math.cos(i * 2 + this.time) * 15);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.time += 0.02;
    }
}

class RotatingPattern extends AbstractShape {
    constructor(x, y, type) {
        super(x, y);
        this.type = type;
        this.radius = 35;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeStyle = colors.darkBlue;
        ctx.lineWidth = 2;

        if (this.type === 'lines') {
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(-20, i * 8 - 12);
                ctx.lineTo(20, i * 8 - 12);
                ctx.stroke();
            }
        } else if (this.type === 'x') {
            ctx.fillStyle = colors.darkBlue;
            ctx.font = 'bold 16px Arial';
            ctx.fillText('× × ×', -25, 0);
            ctx.fillText('× × ×', -25, 15);
        }
        ctx.restore();
    }
}

class HalfDonut extends AbstractShape {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
        this.thickness = 12;
        this.radius = 30;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI, false);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
    }
}


function addShapeWithSafety(createFn, maxAttempts = 100) {
    for (let i = 0; i < maxAttempts; i++) {

        const tempX = Math.random() * (width * 0.8) + (width * 0.1);
        const tempY = Math.random() * (height * 0.8) + (height * 0.1);
        
        const tempShape = createFn(tempX, tempY);
        
        if (!isOverlapping(tempX, tempY, tempShape.radius, shapes)) {
            shapes.push(tempShape);
            return true;
        }
    }
    return false;
}

function init() {
    shapes = [];
    
    // Waves
    shapes.push(new CornerWave(0, 0, colors.bordeaux, 200));
    shapes.push(new CornerWave(width, height, colors.viola, 220));

    // Dot grids
    addShapeWithSafety((x, y) => new DotGrid(x, y, 4, 4, colors.darkBlue));
    addShapeWithSafety((x, y) => new DotGrid(x, y, 5, 3, colors.viola));

    // Patterns
    addShapeWithSafety((x, y) => new RotatingPattern(x, y, 'lines'));
    addShapeWithSafety((x, y) => new RotatingPattern(x, y, 'lines'));
    addShapeWithSafety((x, y) => new RotatingPattern(x, y, 'x'));

    // Half-donuts
    addShapeWithSafety((x, y) => new HalfDonut(x, y, colors.bordeaux));
    addShapeWithSafety((x, y) => new HalfDonut(x, y, colors.viola));

    // Fill-in elements
    for (let i = 0; i < 6; i++) {
        addShapeWithSafety((x, y) => {
            const d = new HalfDonut(x, y, i % 2 === 0 ? colors.bordeaux : colors.viola);
            d.radius = 15 + Math.random() * 10;
            d.thickness = 6;
            return d;
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    shapes.forEach(shape => {
        shape.update();
        shape.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();