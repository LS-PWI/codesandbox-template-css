export class ProductListView {
    #container;
    #productListNode;

    #store;

    constructor(container, store) {
        this.#container = container;
        this.#store = store;
        this.#store.addObserver(this);
    }
    #createProduct(product) {
        let productId = product.id;
        let productName = product.name;

        let listItemNode = document.createElement("li");
        listItemNode.innerHTML = `<strong>Product name</strong>: ${productName}`;
        listItemNode.setAttribute(`data-product-id`, productId);

        let deleteButtonNode = document.createElement("button");
        deleteButtonNode.innerHTML = "Delete";
        listItemNode.appendChild(deleteButtonNode);
        deleteButtonNode.addEventListener("click", (event) => {
            event.preventDefault();

            // productId reference is enclosed in the callback scope
            this.#removeProduct(productId);

            // You can also get the prodect id if previously set as a custom attribute
            console.log(event.target.parentNode.getAttribute("data-product-id"));
        });

        return listItemNode;
    }

    #addProductToList(product) {
        let productNode = this.#createProduct(product);

        this.#productListNode.appendChild(productNode);
    }

    #removeProduct(productId) {
        this.#store.removeProduct(productId);
    }

    update() {
        this.render();
    }

    render() {
        if (this.#productListNode !== undefined) {
            this.#container.removeChild(this.#productListNode);
        }

        this.#productListNode = document.createElement("ul");
        this.#productListNode.setAttribute("id", "product-list");

        this.#store.getProducts().forEach((product) => this.#addProductToList(product));

        this.#container.appendChild(this.#productListNode);
    }
}