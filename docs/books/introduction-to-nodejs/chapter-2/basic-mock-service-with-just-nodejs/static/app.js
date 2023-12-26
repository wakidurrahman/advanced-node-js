/**
 * This array represents mock data, 
 * with a structure similar to what we would expect from a real-world production service 
 * that our frontend application would integrate with.

 
 */
const API = "http://localhost:3000/";

// we have replaced the button-click event listener with an input event listener on the select element.
const populateProducts = async (category) => {
  // Search DOM by using query selector
  const products = document.querySelector("#products");
  // Empty DOM at initial
  products.innerHTML = "";

  // The inline array assigned to the mockData constant is now replaced with
  const res = await fetch(`${API}/${category}`);
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

// Find category DOM by id selector
const category = document.querySelector("#category");

category.addEventListener("input", async ({ target }) => {
  await populateProducts(target.value);
});

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

/** 
// button-click event listener

const populateProductsForButton = async () => {
  const products = document.querySelector("#products");
  products.innerHTML = "";
  // The inline array assigned to the mockData constant is now replaced with
  const res = await fetch(API);
  const mockData = await res.json();
  for (const product of mockData) {
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

document.querySelector("#fetch").addEventListener("click", async () => {
  await populateProductsForButton();
});

customElements.define(
  "product-item",
  class Item extends HTMLElement {
    constructor() {
      super();
      const itemTmpl = document.querySelector("#item").content.cloneNode(true);
      this.attachShadow({ mode: "open" }).appendChild(itemTmpl);
    }
  }
);

*/
