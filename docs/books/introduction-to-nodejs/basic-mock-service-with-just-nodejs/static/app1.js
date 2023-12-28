/**
 * This array represents mock data, 
 * with a structure similar to what we would expect from a real-world production service 
 * that our frontend application would integrate with.

 
 */
const API = "http://localhost:4000";

// button-click event listener

const populateProductsForButton = async () => {
  const products = document.querySelector("#products");
  products.innerHTML = "";
  // The inline array assigned to the mockData constant is now replaced with
  const res = await fetch(API);
  const mockData = await res.json();
  for (const product of mockData) {
    const item = document.createElement("element-details");
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
  "element-details",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById(
        "element-details-template"
      ).content;
      this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true));
    }
  }
);
