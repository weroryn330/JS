const rainImage = new Image();

rainImage.src = "photo.jpg";

rainImage.addEventListener('load', function () {
    const rainCanvas = document.getElementById('canvasRain');
    const ctx = rainCanvas.getContext('2d');

    /** canvas dimensions */
    rainCanvas.width = 999;
    rainCanvas.height = 1500;

    ctx.drawImage(rainImage, 0, 0, rainCanvas.width, rainCanvas.height);
    const pixels = ctx.getImageData(0, 0, rainCanvas.width, rainCanvas.height);

    /** particles array */
    let particles = [];
    /** number of particles to generate */
    const numberOfPatricles = 2000;

    let mappedImage = [];

    for (let y = 0; y < rainCanvas.height; y++) {
        let row = [];
        for (let x = 0; x < rainCanvas.width; x++) {
            /* getting r, g and b from pixels.data array */
            const r = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const g = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const b = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            /* pixel brightness based on r g b components */
            const pixelBrightness = checkBrightness(r, g, b);
            const cell = [
                cellBr = pixelBrightness,
            ];
            row.push(cell);
        }
        mappedImage.push(row);
    }

    console.log(mappedImage);

    /** Function checks the brightness of each pixel */
    function checkBrightness(r, g, b) {
        return Math.sqrt(
            (r * r) * 0.299 +
            (g * g) * 0.587 +
            (b * b) * 0.114
        ) / 100;
    }

    /** Particle class */
    class Particle {

        /** Particle constructor, sets position, velocity and size of each particle */
        constructor() {
            this.x = Math.random() * rainCanvas.width;
            this.y = Math.random() * rainCanvas.height;
            this.speed = 0;
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            this.v = Math.random() * 5;
            this.size = Math.random() * 1.5 + 1;
        }

        /** Updates position of the particle (falling effect) */
        update() {
            // helps us to get into correct info allocated by for loop (sth like iterator)
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            // [row] [cell] [celBr]
            this.speed = mappedImage[this.position1][this.position2][0];
            let movement = (2.5 - this.speed) + this.v;

            this.y += movement;
            if (this.y >= rainCanvas.height) {
                this.y = 0;
                this.x = Math.random() * rainCanvas.width;
            }
        }

        /** Drawing particle on the canvas */
        draw() {
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /* Pushing new patricle to the end of array 'particles' */
    function init() {
        for (let i = 0; i < numberOfPatricles; i++) {
            particles.push(new Particle);
        }
    }

    init();

    /** Animation function, responsible for updating and drawing on canvas */
    function animate() {
        ctx.drawImage(rainImage, 0, 0, rainCanvas.width, rainCanvas.height);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    animate();
});