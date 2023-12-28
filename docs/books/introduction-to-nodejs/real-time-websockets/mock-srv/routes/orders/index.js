"use strict";

export default async function (fastify, opts) {
  fastify.get(
    "/:category",
    { websocket: true },
    async ({ socket }, request) => {
      for (const order of fastify.currentOrders(request.params.category)) {
        socket.send(order);
      }

      for await (const order of fastify.realTimeOrders()) {
        if (socket.readyState >= socket.CLOSING) break;
        socket.send(order);
      }
    }
  );
}
