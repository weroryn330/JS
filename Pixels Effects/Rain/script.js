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

    /** Particle class */
    class Particle {

        /** Particle constructor, sets position, velocity and size of each particle */
        constructor() {
            this.x = Math.random() * rainCanvas.width;
            this.y = Math.random() * rainCanvas.height;
            this.v = Math.random() * 5;
            this.size = Math.random() * 1.5 + 1;
        }

        /** Updates position of the particle (falling effect) */
        update() {
            this.y += this.v;
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