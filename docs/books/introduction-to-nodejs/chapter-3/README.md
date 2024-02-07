# 💁‍♂️ Going Real-Time.

At the end of this chapter goal

- apply the most common real-time web protocol: WebSockets
- Implement bidirectional communication between server and client.
- Discover how to cater to both read and write real-time functionality.

## Enhancing an HTTP Server with WebSockets

`WebSockets` allow for two-way communication between browsers and servers. Similar to how **`HTTP protocol`** is built on top of the **`TCP protocol`**, the **`WebSocket protocol`** is built on top of the **`HTTP protocol`**. It allows for long-lived connections that start as normal HTTP connections, and then upgrade to socket-like connections.

For more details on the WebSocket protocol, refer to the following resources:
- [Writing WebSocket Client Applications](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
- [Writing WebSocket Servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)