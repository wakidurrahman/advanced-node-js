# 💁‍♂️ Performance Optimization

In the case of a web server, this could be measuring how many requests our server can handle per second.

To identify the specific bottlenecks in an application using tools such as

- flame graphs
- memory profilers

Identifying a bottleneck is the first step to understanding where the optimization work should begin, and performance tools can help us determine the starting point.

## #️⃣ Benchmarking HTTP requests

HTTP communications are the foundation of many Node.js applications and microservices.
To be able to optimize, we must first record a baseline measure of our application's performance. Once we've recorded the baseline, we will be able to determine the impact of our optimizations.

> [!IMPORTANT]
> To create a baseline, it is necessary to **simulate** the load on the application and record how it responds.For an HTTP based application, the **simulation** of HTTP `requests` sent to the server is required.

`autocannon` is a cross-platform HTTP benchmarking tool written in Node.js and published to the `npm` registry.

> [!NOTE]
> We will be using the `autocannon` tool to benchmark an `Express.js` web server.

Globally install the `autocannon` module

```sh
$ npm install --global autocannon
```

Start the Express.js web server

```sh
$ npm start
```

Now, we can use the `autocannon` tool to benchmark our HTTP requests.

To run a load test with `autocannon`:

```sh
$ autocannon -c 100 http://localhost:3000/

$ autocannon -c 100 -d 20 http://localhost:3000/
```

we used `autocannon` to load test our Express.js web server at the http://localhost:3000 endpoint.

### 📝 Benchmarking HTTP POST requests

`autocannon` module provides the ability to send requests using other `HTTP` methods, such as HTTP POST.

Command to load test the HTTP POST request.

- `-c/--connections`: The number of concurrent connections to use. default: 10.
- `-d/--duration`: The number of seconds to run the autocannon. default: 10.
- `-a/--amoun`: The number of requests to make before exiting the benchmark.
- `-m/--method`: METHOD The HTTP method to use. default: 'GET'.
- `-H/--headers`: The request headers.
- `-b/--body`: BODY The body of the request.

```sh
$ autocannon -c 100 -d 15 -m POST -H 'content-type=application/json' -b '{ "hello": "world"}' http://localhost:3000/
```

### 📝  Replicating a production environment

It is important to replicate the production environment as closely as possible; otherwise, we may produce misleading results.

> [!TIP]
> The behavior of applications in development and production may differ, which can result in performance differences.
## #️⃣ Interpreting flame graphs

## #️⃣ Detecting memory leaks

## #️⃣ Optimizing synchronous functions

## #️⃣ Optimizing asynchronous functions

## #️⃣ Working with worker threads
