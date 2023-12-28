"use strict";
// A client-side WebSocket connection to our server. This connection will update the relevant order slots with received data.

const API = "http://localhost:3000";
// the URL to which the WebSocket server will respond.
// This should use the URL scheme wss://,
// although some software may allow you to use the insecure ws:// for local connections.
const WS_API = "ws://localhost:3000";

// Populate Products
const populateProducts = async (category, method = "GET", payload) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  // Send Request
  const sendRequestToSever =
    method === "GET"
      ? {}
      : {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };

  // Get Data from backend service
  const response = await fetch(`${API}/${category}`, {
    method,
    ...sendRequestToSever,
  });
  const respondedData = await response.json();

  // Populate products
  for (const product of respondedData) {
    const productItem = document.createElement("product-item");
    // The ID of each product item is added to a data attribute of each created <product-item> element (item.dataset.id = product.id).
    productItem.dataset.id = product.id;
    for (const key of ["name", "rrp", "info"]) {
      const span = document.createElement("span");
      span.slot = key;
      span.textContent = product[key];
      productItem.appendChild(span);
    }

    // Append To DOM
    productList.appendChild(productItem);
  }
};

// Get Elements for DOM
const category = document.getElementById("category"); // Select element.
const addProduct = document.getElementById("add-product"); // Form element.

// Initialization webSocket variable
let socket = null;

// Realtime orders handler using WebSocket
const realTimeOrders = (category) => {
  if (socket) socket.close();
  // Instantiate WebSocket
  // ws://localhost:3000/orders/{category}
  socket = new WebSocket(`${WS_API}/orders/${category}`);

  // The WebSocket connection (socket) listens for real-time messages sent from the server.
  socket.addEventListener("message", ({ data }) => {
    try {
        // newly received order total based on the corresponding ID of the received message 
        const { id, total } = JSON.parse(data);
        // It updates the relevant <product-item> element 
      const item = document.querySelector(`[data-id="${id}"]`);
      if (item === null) return;
      const span =
        item.querySelector('[slot="orders"]') || document.createElement("span");
      span.slot = "orders";
      span.textContent = total;
      item.appendChild(span);
    } catch (error) {
      console.error(error);
    }
  });
};

// Populate products on page load
category.addEventListener("input", async ({ target }) => {
  const { value } = target; // Get selected option value from target object.
  addProduct.style.display = "block";
  await populateProducts(value);
  realTimeOrders(value);
});

// Add product form handler.
addProduct.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { value } = category;
  const { target } = event;
  // Create submit object base on form value
  const payload = {
    name: target.name.value,
    rrp: target.rrp.value,
    info: target.info.value,
  };
  await populateProducts(value, "POST", payload);
  realTimeOrders(value);
  // Reset form input element
  addProduct.reset();
});

// Define custom element
customElements.define(
  "product-item",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById("product-template").content;
      this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true));
    }
  }
);
