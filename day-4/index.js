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

function animate(ball, x) {
    let y = 0;

    let velocity = 0;
    const gravity = 0.3;
    const bounceFactor = 0.7;

    function step() {
        velocity += gravity;
        y += velocity;
        if (y >= 700) {
            y = 700;
            velocity = -velocity * bounceFactor;
        } else if (y <= 0) {
            y = 0;
            velocity = -velocity * bounceFactor;
        }
        if (Math.abs(velocity) < 0.1) {
            velocity = 0;
        }
        ball.setPosition(x, y, 'absolute');
        requestAnimationFrame(step)
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