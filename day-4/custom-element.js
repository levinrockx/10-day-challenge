export class CustomElement {
    #id;
    #el;
    #parent;
    constructor(id, parent) {
        this.#id = id;
        this.#parent = parent;
        this.#create();
    }
    #create() {
        this.#el = document.createElement('div');
        this.#parent.appendChild(this.#el);
        this.#el.id = this.#id;
    }
    remove() {
        const el = this.getElement();
        const parent = this.getParent();
        parent.removeChild(el);
        return this;
    }
    getElement() {
        if (!this.#el) {
            throw new Error('Element not created');
        }
        return this.#el;
    }
    getId() {
        return this.#id;
    }
    getParent() {
        if (!this.#parent) {
            throw new Error('No parent found');
        }
        return this.#parent;
    }
    setBgColor(color) {
        const el = this.getElement();
        el.style.backgroundColor = color;
        return this;
    }
    setSize(height, width) {
        const el = this.getElement();
        el.style.height = height + 'px';
        el.style.width = width + 'px';
        return this;
    }
    setBorderRadius(radius) {
        const el = this.getElement();
        el.style.borderRadius = radius + 'px';
        return this;
    }
    setPosition(x, y, position = 'relative') {
        const el = this.getElement();
        el.style.position = position;
        el.style.transform = `translate(${x}px, ${y}px)`;
        return this;
    }
}