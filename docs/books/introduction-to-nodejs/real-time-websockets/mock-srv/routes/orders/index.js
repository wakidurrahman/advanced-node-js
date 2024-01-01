"use strict";

export default async function (fastify, opts) {
  // Monitoring Messages
  function monitorMessages(socket) {
    socket.on("message", (data) => {
      try {
        const { cmd, payload } = JSON.parse(data);
        if (cmd === "update-category") {
          sendCurrentOrders(payload.category, socket);
        }
      } catch (error) {
        fastify.log.warn(
          "WebSocket Message (data: %o) Error: %s",
          data,
          err.message
        );
      }
    });
  }

  // Send Current Orders
  function sendCurrentOrders(category, socket) {
    for (const order of fastify.currentOrders(category)) {
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
}
