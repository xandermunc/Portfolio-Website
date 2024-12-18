const canvas = document.getElementById("sineCanvas");
const trigger = document.querySelector(".trigger");
const ctx = canvas.getContext("2d");
const infoDiv = document.getElementById("info");

const width = canvas.width;
const height = canvas.height;

const maxAmplitude = 50;
const frequency = 0.05;
const speed = 0.8;
const transitionSpeed = 0.1;

let phase = 0;
let rotationAngle = 0;
let targetRotationAngle = 0;
let isHovered = false;
let amplitude = 0;

let targetRotationY = 0;
let targetRotationX = 0;
let rotationY = 0;
let rotationX = 0;
const amplitude3D = 50;

function drawSineWave2D() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    const scale = isHovered ? 0.85 : 1;
    ctx.scale(scale, scale);

    ctx.beginPath();
    for (let x = -width / 4; x < width / 4; x++) {
        const y = amplitude * Math.sin(frequency * (x + phase));

        const xRotated = x * Math.cos(rotationAngle) - y * Math.sin(rotationAngle);
        const yRotated = x * Math.sin(rotationAngle) + y * Math.cos(rotationAngle);

        const projectedX = xRotated;
        const projectedY = -yRotated;

        ctx.lineTo(projectedX, projectedY);
    }

    ctx.strokeStyle = "#09f";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
}

function drawSineWave3D() {
    ctx.save();
    ctx.translate(width / 2, height / 2);

    ctx.beginPath();
    for (let x = -width / 4; x < width / 4; x++) {
        const y = amplitude3D * Math.sin(frequency * (x + phase));
        const z = (x / width) * 50;

        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);

        const xRotated = cosY * x + sinY * z;
        const zRotated = -sinY * x + cosY * z;
        const yRotated = cosX * y - sinX * zRotated;

        const projectedX = xRotated;
        const projectedY = -yRotated;

        ctx.lineTo(projectedX, projectedY);
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
}

function animate() {
    phase += speed;

    rotationAngle += (targetRotationAngle - rotationAngle) * 0.1;

    if (isHovered) {
        amplitude += (maxAmplitude - amplitude) * transitionSpeed;
    } else {
        amplitude += (0 - amplitude) * transitionSpeed;
    }

    drawSineWave2D();
    drawSineWave3D();

    rotationX += (targetRotationX - rotationX) * 0.1;
    rotationY += (targetRotationY - rotationY) * 0.1;

    requestAnimationFrame(animate);
}

trigger.addEventListener("mouseenter", () => {
    isHovered = true;
    targetRotationAngle = 40 * (Math.PI / 180);
    targetRotationX = -45 * (Math.PI / 180);
    targetRotationY = -45 * (Math.PI / 180);
});

trigger.addEventListener("mouseleave", () => {
    isHovered = false;
    targetRotationAngle = 0;
    targetRotationX = 0;
    targetRotationY = 0;
});

animate();

const canvas2 = document.getElementById("sound-wave");
const trigger2 = document.querySelector(".sound-trigger");
const ctx2 = canvas2.getContext("2d");

const width2 = canvas2.width;
const height2 = canvas2.height;

const amplitude2 = 50;
const frequency2 = 0.05;
const speed2 = 0.8;

let phase2 = 0;
let targetRotationY2 = 0;
let targetRotationX2 = 0;
let rotationY2 = 0;
let rotationX2 = 0;

function drawSineWave2() {
    ctx2.clearRect(0, 0, width2, height2);

    ctx2.save();
    ctx2.translate(width2 / 2, height2 / 2);

    ctx2.beginPath();
    for (let x2 = -width2 / 4; x2 < width2 / 4; x2++) {
        const y2 = amplitude2 * Math.sin(frequency2 * (x2 + phase2));
        const z2 = (x2 / width2) * 50;

        const cosY2 = Math.cos(rotationY2);
        const sinY2 = Math.sin(rotationY2);
        const cosX2 = Math.cos(rotationX2);
        const sinX2 = Math.sin(rotationX2);

        const xRotated2 = cosY2 * x2 + sinY2 * z2;
        const zRotated2 = -sinY2 * x2 + cosY2 * z2;
        const yRotated2 = cosX2 * y2 - sinX2 * zRotated2;

        const projectedX2 = xRotated2;
        const projectedY2 = -yRotated2;

        ctx2.lineTo(projectedX2, projectedY2);
    }

    ctx2.strokeStyle = "black";
    ctx2.lineWidth = 4;
    ctx2.stroke();
    ctx2.restore();
}

function animate2() {
    phase2 += speed2;

    rotationX2 += (targetRotationX2 - rotationX2) * 0.1;
    rotationY2 += (targetRotationY2 - rotationY2) * 0.1;

    drawSineWave2();
    requestAnimationFrame(animate2); 
}

trigger2.addEventListener("mouseenter", () => {
    targetRotationX2 = -45 * (Math.PI / 180);
    targetRotationY2 = -45 * (Math.PI / 180);
});

trigger2.addEventListener("mouseleave", () => {
    targetRotationX2 = 0;
    targetRotationY2 = 0;
});

animate2(); 