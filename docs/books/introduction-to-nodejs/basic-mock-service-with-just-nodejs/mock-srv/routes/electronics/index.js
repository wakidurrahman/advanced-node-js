"use strict";
const data = [
  {
    id: "E1",
    name: "Vacuum Cleaner",
    rrp: "99.99",
    info: "The suckiest vacuum in the world.",
  },
  {
    id: "E2",
    name: "Leaf Blower",
    rrp: "303.33",
    info: "This product will blow your socks off.",
  },
];

export default async function (fastify, opts) {
  fastify.get("/", async (request, reply) => {
    return data;
  });

  // POST
  fastify.post("/", async (request, reply) => {
    fastify.mockDataInsert(request, opts.prefix.slice(1), data);
    return data;
  });
}
