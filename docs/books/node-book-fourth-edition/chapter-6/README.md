# NodeJS web Frameworks

NodeJS can be used as a tool to build a variety of systems, including microservices, real-time applications.

> [!TIP]
> One of the most common use cases for Node.js is building web applications.

Node.js core provides a range of _low-level_ `APIs` that allow us to build web applications. As this use case is so common, many `web frameworks` have been created to abstract `web protocols` into :+1: _higher-level_ :shipit: `APIs` for building `web frameworks`.

Few of the most popular web frameworks.

1. Express.js
2. Koa.js
3. Fastify
4. Hapi

## #️⃣ Building web applications with Express

Express, has been and remains the most popular web framework for building web applications in Node.js.

> [!TIP]
> Express.js was a project of the OpenJS Foundation (https://openjsf.org/projects/), and previously the Node.js Foundation.

Web Applications: Express is a minimal and flexible Node.js `web application` framework that provides a robust set of features for web and mobile applications.

Performance: Express provides a thin layer of fundamental `web application` features, without obscuring Node.js features that you know and love.

The `Express.js` framework abstracts the underlying Node.js core `web protocol` APIs provided by the `http` and `https` core `modules`. `Express.js` provides an interface for `routing` and adding `middleware`.

### 📝 Where we create our `Express.js` server, where `app` represents the server.

```js
import express from "express";
const app = express();
```

### 📝 The `app.use()` function is used to register middleware.

```js
import express from "express";
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);
```

In the context of `Express.js`, **_`middleware`_** means functions that execute during the **life cycle of a request**. Express.js `middleware` functions have access to the `request` `(req)` and `response` `(res)` objects.

Middleware can execute

- Code
- Alter/change or operate on the `request` and `response` objects
- End the request response cycle
- Call another middleware.

> [!WARNING]
> The last middleware must end the `request-response` cycle, otherwise the request will **hang**.

The first time we call `app.use()` inside `app.js` file

```js
app.use(express.static(path.join(__dirname, "public")));
```

we pass it the `express.static` method.
The `express.static` method returns a `middleware` function that attempts to locate the supplied path. The `middleware` will create a `write stream` from the specified file and `stream` this to the `request` object. we use the `express.static` function to serve the public directory.

```js
import routes from "./routes/routes.js";

app.use("/", routes);
```

we pass the string `/` as the argument and `routes` where `/` is the **_`mount point`_** for the `middleware` and `routes` is the Express.js router that we
defined in `"./routes/routes.js"`.

> [!TIP]
> A `mount point` is used to restrict `requests` to that match the `mount point`, rather than applying to all incoming `requests`.

The ordering of `Express.js` `middleware` is important, as they execute successively (one after the other). If we were to use `app.use()` to register two middlewares against the same `mount point`, the 👉 first would take `precedence`.

```js
routes.get("/", (req, res) => {
  const title = "Express";
  res.send(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> ${title} </title>
        <link rel="stylesheet" href="styles.css"/>
      </head>
      <body>
        <h1>Hello ${title}! </h1>
        <p>Welcome to ${title}</>
      </body>
    </html>`);
});
```

The route handler function calls `res.send()` to return the `HTML` content. `The send()` method is automatically added to the `response object` by `Express.js`. The `res.send()` method is similar to the `res.end()` method.

### 📝 Adding views with Express.js

Express.js is often used to generate and serve HTML web pages. To achieve this, it is
common to implement a **_view layer_**, which takes care of the generation of the content.
Typically, the content is dynamically created using `templates`.

Add a view layer using the `Embedded JavaScript` (EJS) `templating` engine.

```js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');
```

`app.set()` can be used to alter settings used internally by Express. 

1. The first `app. set()` command sets the `views` namespace to our `views` folder.
2. The second `app.set()` command sets the `view engine`, and in our case, we set it to use the `EJS` view engine.