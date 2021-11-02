export class Store {
    #products = {};
    #observers = [];

    addProduct(product) {
        this.#products[product.id] = product;
        this.#notifyObservers();
    }

    removeProduct(productName) {
        delete this.#products[productName];
        this.#notifyObservers();
    }

    getProducts() {
        return Object.keys(this.#products).map(k => this.#products[k]); // Transforms the object into an array
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    #notifyObservers() {
        this.#observers.forEach((observer) => observer.update())
    }
}