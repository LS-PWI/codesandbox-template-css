import {Product} from "../../model/Product.js";

export class ProductFormView {
    #container;

    #productFormNode;
    #productNameInputNodes = {};
    #productSubmitNode;

    #store;

    constructor(container, store) {
        this.#container = container;
        this.#store = store;
    }

    #addEventListenerToSubmitNode(node) {
        node.addEventListener("click", (event) => {
            event.preventDefault();
            let productName = this.#productNameInputNodes["input"].value;

            // Guard clause. If productName is empty, don't do anything.
            if (productName === "") {
                return;
            }

            // Be careful that this 'nextId' implementation does not ensure id uniqueness

            // A workaround would be to store the last Id,
            // every time a product is created, generate the next id by: lastId + 1
            const productId = (this.#store.getProducts().length || 0) + 1

            let product = new Product(productId, productName);
            this.#store.addProduct(product);

            this.#clearProductForm();
        });
    }

    #clearProductForm() {
        this.#productNameInputNodes["input"].value = "";
    }

    render() {
        this.#productFormNode = document.createElement("form");
        this.#productFormNode.setAttribute("id", "create-product-form");

        this.#productNameInputNodes["label"] = document.createElement("label");
        this.#productNameInputNodes["label"].setAttribute("for", "product-name");
        this.#productNameInputNodes["label"].innerHTML = "Product name: ";
        this.#productFormNode.appendChild(this.#productNameInputNodes["label"]);

        this.#productNameInputNodes["input"] = document.createElement("input");
        this.#productNameInputNodes["input"].setAttribute("id", "product-name");
        this.#productNameInputNodes["input"].setAttribute("name", "product-name");
        this.#productFormNode.appendChild(this.#productNameInputNodes["input"]);

        this.#productSubmitNode = document.createElement("input");
        this.#productSubmitNode.setAttribute("type", "submit");
        this.#productSubmitNode.setAttribute("value", "Create");
        this.#addEventListenerToSubmitNode(this.#productSubmitNode);
        this.#productFormNode.appendChild(this.#productSubmitNode);

        this.#container.appendChild(this.#productFormNode);
    }
}