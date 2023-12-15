# Getting Started

It covers a wide range of topics and is regularly updated.

## Introduction to Node.js

>A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm. 
একটি Node.js অ্যাপ প্রতিটি অনুরোধের জন্য একটি নতুন থ্রেড তৈরি না করে একটি একক প্রক্রিয়ায় চলে। Node.js তার স্ট্যান্ডার্ড লাইব্রেরিতে অ্যাসিঙ্ক্রোনাস I/O আদিমগুলির একটি সেট সরবরাহ করে যা জাভাস্ক্রিপ্ট কোডকে ব্লক করা থেকে বাধা দেয় এবং সাধারণত, Node.js-এর লাইব্রেরিগুলি নন-ব্লকিং প্যারাডাইম ব্যবহার করে লেখা হয়, ব্লকিং আচরণকে আদর্শের পরিবর্তে ব্যতিক্রম করে তোলে।

> When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.
যখন Node.js একটি I/O ক্রিয়াকলাপ সম্পাদন করে, যেমন নেটওয়ার্ক থেকে পড়া, একটি ডাটাবেস বা ফাইল সিস্টেম অ্যাক্সেস করা, থ্রেড ব্লক করার পরিবর্তে এবং অপেক্ষায় থাকা CPU চক্র নষ্ট করার পরিবর্তে, প্রতিক্রিয়া ফিরে এলে Node.js অপারেশনগুলি পুনরায় শুরু করবে।

> This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.
এটি Node.js-কে থ্রেড কনকারেন্সি পরিচালনার বোঝা প্রবর্তন না করে একটি একক সার্ভারের সাথে হাজার হাজার সমবর্তী সংযোগ পরিচালনা করতে দেয়, যা বাগগুলির একটি উল্লেখযোগ্য উত্স হতে পারে।