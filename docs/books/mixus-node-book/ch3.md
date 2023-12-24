# Mixu's Node book

> A book about using Node.js

## 3. Simple messaging application

polling - ভোটগ্রহণ, মতপ্রদান

We will be implementing a simple chat-type application using long polling. 
In our example, we will use simple, manual techniques to get a server up and running quickly. Routing, file serving and error handling are topics which we will expand upon in the later chapters.

Long polling is a simple technique for reading data from a server. The client browser makes a normal request, but the server delays responding if it does not have any new data. 
