"use strict";
// Mock service data
const data = [
  {
    id: "B1",
    name: "Chocolate Bar",
    rrp: "22.40",
    info: "Delicious overpriced chocolate.",
  },
];

export default async function (fastify) {
  fastify.get("/", async function (request, reply) {
    return data;
  });
}
