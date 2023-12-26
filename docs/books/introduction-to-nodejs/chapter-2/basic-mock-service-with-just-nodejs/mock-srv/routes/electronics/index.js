"use strict";
const data = [
  {
    id: "A1",
    name: "Vacuum Cleaner",
    rrp: "99.99",
    info: "The suckiest vacuum in the world.",
  },
  {
    id: "A2",
    name: "Leaf Blower",
    rrp: "303.33",
    info: "This product will blow your socks off.",
  },
];

export default async function (fastify) {
  fastify.get("/", async function (request, reply) {
    return data;
  });
}
