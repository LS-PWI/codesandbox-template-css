import {Store} from "../store/Store.js";
import {ProductFormView} from "../components/ProductForm/ProductFormView.js";
import {ProductListView} from "../components/ProductList/ProductListView.js";

document.addEventListener("DOMContentLoaded", () => {
    let store = new Store();

    let productFormView = new ProductFormView(document.getElementById("create-product"), store)
    productFormView.render();

    let productListView = new ProductListView(document.getElementById("products"), store);
    productListView.render();
});