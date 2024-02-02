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

















## #️⃣ Interpreting flame graphs

## #️⃣ Detecting memory leaks

## #️⃣ Optimizing synchronous functions

## #️⃣ Optimizing asynchronous functions

## #️⃣ Working with worker threads
