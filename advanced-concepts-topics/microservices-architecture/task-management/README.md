# Microservice Using Node.js

Build a microservice using `Node.js`. I will create a `scalable`, `robust`, `reliable` and `performant` solution by using the popular `Node.js stack`.

## Build a microservice on the `Task Management` web service

**_Features_**

- Create a task with a `name` and `description`.
- Get task by its identifier(ID).
- update task `status`/`name`/`description`.

**_Some application requirements_**

- The task should be created with the `status` `‘new’`;
- Available status transitions: `‘new’ , ‘active’, ‘canceled’, ‘completed’`.
  - from `‘new’` to `‘active’`
  - from `‘new’` to `‘canceled’`
  - from `‘active’` to `‘completed’`
  - from `‘active’` to `‘canceled’`;

**_The main non-functional requirements_**

- _Scalability_ — microservice should be able to handle an increasing amount of requests
- _Elasticity_ — microservice should be able to handle spikes
- _Performance_ — microservice should respond quickly for better user experience
- Resilience — microservice should be fault-tolerant and able to recover so that it can continue to function correctly;
- _Monitoring_ — microservice should provide ways to monitor its health;
- _Observability_ — microservice should generate log stream and metrics to be able to maintain it;
- _Testability_ — microservice should be easy to test;
- _Stateless_ — microservice should not store client context, instead, state should be stored in the database;
- _Deployability_ — microservice should be easy to deploy and update.

When developing a web application with Node.js. Let's discuss how to achieve these requirements in the following steps.

## Technology Stack/ Tech stack

Technology stack you will use to build a web service from the scratch. I’m going to use Node.js.

1. `Node.js` programming language JavaScript
2. `MongoDB` I need to persist the data between web requests. It’s a complex task to develop scalable `stateful` web `services`. So it’s recommended to keep your web application `stateless` and persist state in the external `database` instead. To develop this service, I will use the popular document-oriented database `MongoDB`. `MongoDB` is a `NoSQL` database that provides a few benefits over SQL databases:
   - _Schemaless_ — MongoDB collection (analog to SQL table) can hold documents with different schemas.
   - _Scalability_ — MongoDB is designed to be scaled out across many servers
   - _Performance_ — MongoDB is optimized for read-heavy workloads and can store large amounts of data.
3. `express.js` Web Framework is needed to build web applications. It handles a lot of everyday tasks that are required when developing web services. To name a few: routing, security, binding, etc.
4. `joi` Validation is an important part of web applications because you never know how users will use your API. Intruders might break your application by providing some invalid input.
5. `express-mongo-sanitize` Providing some dangerous MongoDB injection that can drop collection is still possible. To sanitize web requests
6. `dotenv` You need to make your application configurable so the same build artifact can be run in different environments by changing the configuration. The standard approach is to provide configuration via environment variables. (This library loads content from a file named `.env` and sets content from this file to `environment variables`)
7. `ESLint` With JavaScript applications, you can easily enforce code style and follow the same rules when developing your applications. ESLint improves code quality and might detect some bugs. It can identify security vulnerabilities. You can force your team to follow the rules introduced by ESLint by including ESLint checks during continuous integration (CI). (Static Analysis )
8. `Jest` (Different test types exist: unit, integration, load, end-to-end (E2E). Libraries for testing JavaScript applications is `Jest`. With `Jest`, I will implement `unit` and `integration tests`. )
9. `winston` Application log stream helps you to ‘remotely debug’ web service. You can simply identify the code execution path and explain the request logic in different circumstances if you cover your code with logs. The most popular package to collect JavaScript logs is winston: It’s a simple but powerful logging library that helps you collect logs using different transports (console, file, etc.). You can also change the log format (simple text, JSON, etc.).
10. `express-prom-bundle` With metrics, you can monitor the health of your application. You can see the number of incoming requests, average request execution time, number of `5XX` responses, etc. Having metrics, you can set up different monitors that, in case something goes wrong, will notify you by e-mail, notifications, etc. I will install `Prometheus` middleware that will collect standard web application metrics.
11. `Monitoring Stack` Log stream and metrics should be collected in some database so later that can be used to `monitor` them or `visualize`. I will use the next stack to collect and visualize logs and metrics

    - _Prometheus_ — open-source monitoring alerting toolkit that uses a pull model to collect metrics
    - _Promtail_ — an agent that contains and ships logs;
    - _Loki_ — log aggregation system
    - _Grafana_ — observability system.

12. `Docker` To create the local stack needed to develop and test the application locally, I’m going to use Docker. With `Docker Compose`, you can define all the infrastructure with a single `compose.yml` file.
13. `Continuous Integration` To be sure commits do not break anything, you need continuous integration (CI). I will use GitHub Actions
14. `Develop Application ` I’ve started with application structure and found a great repository that helped me to follow [suitable project styles](https://github.com/hagopj13/node-express-boilerplate)

## Develop Application

