"use strict";

export default async function (fastify, opts) {
  /**
   * The `monitorMessages` function accepts the socket instance as an argument and attaches a message listener to it.
   * @param {*} socket
   */
  // Monitoring Messages
  function monitorMessages(socket) {
    /**
     * The listener function will be called every time
     * the client calls the send method of the client-side WebSocket instance.
     */

    socket.on("message", (data) => {
      const message = JSON.parse(data);
      try {
        // The incoming data is parsed, and the `cmd` and `payload` properties are extracted.
        const { cmd, payload } = message;
        // If the `cmd` argument is valid (which in this case means if it is the string 'update-category') then the `sendCurrentOrders` function is called with the value of payload.category.
        if (cmd === "update-category") {
          return sendCurrentOrders(payload.category, socket);
        }
      } catch (error) {
        // In the event of an error, we use Fastify's built-in logger to output that error.
        fastify.log.warn(
          "WebSocket Message (data: %o) Error: %s",
          message,
          err.message
        );
      }
    });
  }

  /**
   * The `sendCurrentOrders` function just factors out
   * the `for of` loop that was in the body of the route handler function
   * @param { } category
   * @param {*} socket
   */
  // Send Current Orders
  function sendCurrentOrders(category, socket) {
    const orders = Array.from(fastify.currentOrders(category));
    for (const order of orders) {
      socket.send(order);
    }
  }

  // category route handler
  fastify.get(
    "/:category",
    { websocket: true },
    async ({ socket }, request) => {
      monitorMessages(socket);
      sendCurrentOrders(request.params.category, socket);

      for await (const order of fastify.realTimeOrders()) {
        if (socket.readyState >= socket.CLOSING) break;
        socket.send(order);
      }
    }
  );

  // A POST route for the  /orders/{ID} endpoint.
  fastify.post("/:id", async (request) => {
    const { id } = request.params;
    fastify.addOrder(id, request.body.amount);
    return { ok: true };
  });
}
