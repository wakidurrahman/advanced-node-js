# 💁‍♂️ NodeJS web Frameworks

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

Express.js is often used to generate and serve HTML web pages. To achieve this, it is common to implement a **_view layer_**, which takes care of the generation of the content.
Typically, the content is dynamically created using `templates`.

Add a view layer using the `Embedded JavaScript` (EJS) `templating` engine.

```js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
```

`app.set()` can be used to alter settings used internally by Express.

1. The first `app. set()` command sets the `views` namespace to our `views` folder.
2. The second `app.set()` command sets the `view engine`, and in our case, we set it to use the `EJS` view engine.

We configured Express.js to use the `EJS` view engine, created an `EJS` template, and instructed Express.js to `render` the template on the index (/) route.

### 📝 Creating custom middleware with Express.js

Express.js supports custom middleware. This means we can create middleware that implements any logic that we require for our web server.

```js
/**
 * Create a middleware that logs the HTTP method and URL of the received request.
 */

function logsHttpMethodAndUrl() {
  return (req, res, next) => {
    console.log("Request received: ", req.method, req.url);
    next();
  };
}

export default logsHttpMethodAndUrl;
```

Middleware can be used for a variety of use cases including

- 👉 setting customer headers,
- 👉 parsing and/or manipulating a request,
- 👉 session handling
- 👉 implementing custom protocols on top of HTTP.

and so on.

### 📝 Generating an Express.js application

Express.js provides a generator that scaffolds you a skeleton application.

```bash
$ npx express-generator --view=ejs express-generated-apps

$ npx express-generator --view=ejs --css=sass  express-generated-with-sass-apps


```

### 📝 Handling `POST` requests and route parameters

HTTP `POST` requests are commonly used to submit HTML form data.

The `body-parser` module is a middleware that parses the incoming `request` body and then `exposes` that on a `body property` on the `request` object (`req.body`).

```js
import bodyParser from "body-parser";
/**
 * Need to pass bodyParser to `app.use()` to instruct the server to use the middleware:
 */

app.use(
  bodyParser.urlencoded({
    extended: false, // option instructs body-parser to use the querystring library for URL parsing. Omitting this setting or setting it to true will instruct body-parser to use the qs library instead.
  })
);
```

> [!IMPORTANT]
> The `{ extended: false }` option instructs `body-parser` to use the `querystring` library for URL parsing. Omitting this setting or setting it to `true` will instruct `body-parser` to use the `qs` library instead. The main difference is that `qs` supports nested objects. However, `qs` has options that if not configured correctly could lead to `denial-of-service` attacks.

### 📝 Router methods

```js
import express from "express";
const router = express.Router();
// get
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// post
router.post("/", (req, res) => {
  res.send("Got a POST request");
});

// put
router.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

// delete
router.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

router.all();
```

Express.js also exposes a router.all() method. The `router.all()` method is used to define a request handler that responds to all requests to the specified endpoint, regardless of the HTTP method.

### 📝 Using the NODE_ENV environment variable

Express.js anticipates `NODE_ENV` as a variable name. `NODE_ENV` is used to specify which `environment` the application is running in. This is typically either set to the `dev` or `production` values, indicating whether you're `developing` your application or running it in `production`.

`Express.js` has inbuilt behavior changes for when `NODE_ENV` is set to `production`. The features provided in `production` mode include

- caching of view templates and CSS files,
- less verbose error messages.

It is possible to implement custom behaviors by using the `NODE_ENV` variable.

If you want multiple `production` or `development` specific behaviors, it would be worthwhile storing the `NODE_ENV` as a constant in your file.

```js
const dev = process.env.NODE_ENV !== "production";
if (dev) {
  // dev specific behaviors here
}
```

You can set the environment variable in the Terminal you're using to start the process with:

```sh
$ export NODE_ENV=production
```

Alternatively, you can pass it as an environment variable directly to the Node.js process:

```sh
$ NODE_ENV=production node index.js
```
