import { CustomElement } from './custom-element';

function renderBoard(id, color) {
    const parent = document.body;
    const board = new CustomElement(id, parent);
    board.setBgColor(color).setSize(800, 1000);
    return board;
}

function renderBall(parent, id, color) {
    const ball = new CustomElement(id, parent);
    ball.setBgColor(color).setSize(100, 100).setBorderRadius(100);
    return ball;
}

var board = renderBoard('board', 'black');

var redBall = renderBall(board.getElement(), 'red-ball', 'red');
var blueBall = renderBall(board.getElement(), 'blue-ball', 'blue').setPosition(500, 0, 'absolute');

function animate(ball, initialX) {
    if (ball.animationState && ball.animationState.animationFrameId) {
        cancelAnimationFrame(ball.animationState.animationFrameId);
    }

    let x, y, xVelocity, yVelocity;

    if (ball.animationState) {
        x = ball.animationState.x;
        y = ball.animationState.y;
        xVelocity = ball.animationState.xVelocity;
        yVelocity = ball.animationState.yVelocity;
    } else {
        x = initialX;
        y = 0;
        xVelocity = 0;
        yVelocity = 0;
    }

    ball.animationState = ball.animationState || {};

    const gravity = 0.3;
    const bounceFactor = 0.7;

    function step() {
        const transform = board.getElement().style.transform;
        let rotationAngle = 0;
        if (transform && transform.includes('rotateZ')) {
            const deg = parseFloat(transform.split('(')[1].split('deg)')[0]);
            rotationAngle = deg * Math.PI / 180;
        }

        const ax = gravity * Math.sin(rotationAngle);
        xVelocity += ax;
        x += xVelocity;
        if (x >= 900) { // Ball width is 100, board width is 1000. 1000 - 100 = 900
            x = 900;
            xVelocity = -xVelocity * bounceFactor;
        } else if (x <= 0) {
            x = 0;
            xVelocity = -xVelocity * bounceFactor;
        }

        const ay = gravity * Math.cos(rotationAngle);
        yVelocity += ay;
        y += yVelocity;
        if (y >= 700) { // Ball height is 100, board height is 800. 800 - 100 = 700
            y = 700;
            yVelocity = -yVelocity * bounceFactor;
        } else if (y <= 0) {
            y = 0;
            yVelocity = -yVelocity * bounceFactor;
        }

        if (Math.abs(rotationAngle) < 0.01) {
            xVelocity *= 0.99; // Friction on flat surface
        }
        if (Math.abs(yVelocity) < 0.1 && y >= 699) { // Adjusted for 700 limit
            yVelocity = 0; // Rest on bottom
        }

        ball.setPosition(x, y, 'absolute');

        ball.animationState.x = x;
        ball.animationState.y = y;
        ball.animationState.xVelocity = xVelocity;
        ball.animationState.yVelocity = yVelocity;
        ball.animationState.animationFrameId = requestAnimationFrame(step);
    }

    step();
}

redBall.getElement().addEventListener('click', () => animate(redBall, 100));
blueBall.getElement().addEventListener('click', () => animate(blueBall, 500));

document.body.addEventListener('mousemove', (event) => {
    const boardElement = board.getElement();

    const centerX = window.innerWidth / 2;
    const offsetX = event.clientX - centerX;

    const maxRotationZ = 5; // degrees
    const rotateZ = (offsetX / centerX) * maxRotationZ;

    boardElement.style.transform = `rotateZ(${rotateZ}deg)`;
    boardElement.style.transition = 'transform 0.1s ease-out';
});

document.addEventListener('mouseleave', () => {
    const boardElement = board.getElement();
    boardElement.style.transform = `rotateZ(0deg)`;
});