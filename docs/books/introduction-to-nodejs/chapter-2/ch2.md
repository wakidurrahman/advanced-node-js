# Chapter 2. Service Mocking

The ability to rapidly create web services with mock data that can run locally is a useful skill.

Learning Objectives

1. Create a local file server with minimal effort.
2. Create a very basic mock service with just Node.js core.
3. Discuss how to rapidly scaffold a Fastify service for more involved mock services.

## Mocking a web service...

```js
const mockData = [
  {
    id: "A1",
    name: "Vacuum Cleaner",
    rrp: "99.99",
    info: "The most powerful vacuum in the world.",
  },
  {
    id: "A2",
    name: "Leaf Blower",
    rrp: "303.33",
    info: "This product will blow your socks off.",
  },
  {
    id: "B1",
    name: "Chocolate Bar",
    rrp: "22.40",
    info: "Deliciously overpriced chocolate.",
  },
];
```

This array represents mock data, with a structure similar to what we would expect from a real-world production service that our frontend application would integrate with.

- Including mock data in the client-side code could make it convoluted, and does not accurately represent the behavior we would expect from a production application since there is no remote fetching involved.
- It also complicates the transition from a local development to a live environment.
- We would need conditional logic to either inject mock data into the client-side code, or inject remote fetching logic instead.
- This criticism would also be true for any type of integration, such as writing a web service that is supposed to fetch data from another web service that we do not have access to.

A better approach in both cases is to place that mock data in a mock service that runs locally. Then the conditional logic for deploying to staging or production would be around which URL to fetch from, instead of alternating between entire sections of code.


The API constant is as follows:

`const API = "http://localhost:3000/"`

We are creating our mock web service, which lets us serve data from `http://localhost:3000`. 
The idea is that this `API` string can now be replaced with the appropriate `host`, based on the `context`. 
For example, a build pipeline could replace the `API` string with a `production` `domain` that resolves to the actual `production` `service` that our mock web service aims to mimic.

project structure flow
```bash

basic-mock-service-with-just-nodejs
├── package-lock.json
├── package.json
├── server.js
└── static
    ├── app.js
    └── index.html
```

By mocking the GET routes in our local mock service, we can separate the client-side code from the data source and simulate the behavior of a real production service during development.

### Creating POST Routes

It is highly recommended that production Node.js services are stateless.

we need to create a data utility library plugin to handle the insertion of new items into the mock data.