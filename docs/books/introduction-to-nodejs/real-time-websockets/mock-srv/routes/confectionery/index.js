"use strict";
// Mock service data
const data = [
  {
    id: "C1",
    name: "Chocolate Bar",
    rrp: "22.40",
    info: "Delicious overpriced chocolate.",
  },
];

export default async function (fastify, opts) {
  // GET request handler method
  fastify.get("/", async (request, reply) => {
    return data;
  });
  // POST request handler method
  fastify.post("/", async (request, replay) => {
    // The opts.prefix contains the route prefix for our route.
    // We pass opts.prefix.slice(1) (which strips the leading forward slash)
    fastify.mockDataInsert(request, opts.prefix.slice(1), data);
    return data;
  });
}
