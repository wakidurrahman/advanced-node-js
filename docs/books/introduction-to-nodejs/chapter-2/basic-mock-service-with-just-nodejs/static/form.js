"use strict";

// API URL
const API = "http://localhost:3000";

// we have replaced the button-click event listener with an input event listener on the select element.
// Populate products From API method
const populateProducts = async (category, method = "GET", payload) => {
  // Search DOM by using query selector
  const products = document.querySelector("#products");
  // Empty DOM at initial
  products.innerHTML = "";

  // Request
  const clientRequestObj =
    method === "GET"
      ? {}
      : {
          header: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };

  // The inline array assigned to the mockData constant is now replaced with
  const res = await fetch(`${API}/${category}`, {
    method,
    ...clientRequestObj,
  });
  const data = await res.json();

  for (const product of data) {
    const item = document.createElement("product-item");
    for (const key of ["name", "rrp", "info"]) {
      const span = document.createElement("span");
      span.slot = key;
      span.textContent = product[key];
      item.appendChild(span);
    }
    products.appendChild(item);
  }
};

// Get elements select DOM
const category = document.querySelector("#category");
// GET elements form DOM
const addProduct = document.querySelector("#add-product");

// Populate Products
category.addEventListener("input", async ({ target }) => {
  addProduct.style.display = "block";
  await populateProducts(target.value);
});

console.log("category", category.value)

// Add product
addProduct.addEventListener("submit", async (event) => {
    event.preventDefault();
  const { target } = event;
  console.log(category);
  const payload = {
    name: target.name.value,
    rrp: target.rrp.value,
    info: target.info.value,
  };
  await populateProducts(category.value, "POST", payload);
  target.reset();
});

// Custom element.
customElements.define(
  "product-item",
  class Item extends HTMLElement {
    constructor() {
      super();
      const itemTmpl = document.querySelector("#item").content;
      this.attachShadow({ mode: "open" }).appendChild(itemTmpl.cloneNode(true));
    }
  }
);
