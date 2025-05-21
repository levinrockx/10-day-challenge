function Element(id) {
    this.id = id;
    const dot = document.createElement('div');
    dot.id = id;
    document.body.appendChild(dot);
    this.domElement = document.getElementById(id);
}

document.body.backgroundColor = "black";
document.body.style.margin = '0px';

Element.prototype.get = function () {
    this.domElement = document.getElementById(id);
    return this.domElement;
}

Element.prototype.setColor = function (color) {
    this.domElement.style.background = color;
    this.domElement.style.position = 'fixed';
    this.domElement.style.transition = 'transform 0.3s ease-out';
}

Element.prototype.setSize = function (size) {
    this.domElement.style.height = size + 'px';
    this.domElement.style.width = size + 'px';
}

Element.prototype.setRadius = function (radius) {
    this.domElement.style.borderRadius = radius + 'px';
}

Element.prototype.setPosition = function (position) {
    this.domElement.style.transform = position;
}

Element.prototype.setPosition = function (x, y) {
    this.domElement.style.transform = `translate(${x}px, ${y}px)`;
};

function makeCircle(id, color) {
    const dot = new Element(id);
    dot.setColor(color);
    dot.setSize(100);
    dot.setRadius(100);
    return dot;
}

const redDot = makeCircle("red-dot", "red");
const blueDot = makeCircle("blue-dot", "blue");

document.addEventListener("mousemove", (e) => {
    const dotSize = 100;
    redDot.setPosition(e.clientX - (dotSize / 1.5), e.clientY - (dotSize / 1.5));
    setTimeout(() => {
        blueDot.setPosition(e.clientX - (dotSize / 2), e.clientY - (dotSize / 2));
    }, 200);
});