//* Creating server using expressJS
const express = require("express");
const app = express();

//* on URL - localhost:7000



app.use('/user', (req,res,next)=>{
    console.log('callback 1 called');
    // res.send('callback 1 called'); // returns from the callback
    next(); // goes to next callback in the stack
}, (req,res)=>{
    console.log('callback 2 called');
    res.send('callback 2 called'); 
    // gives error when already res.send() from previous and next() was executed afterwards
    /*
    Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    */
});

// Even if we declare next() before res.send(), it might print callback 2 but when res.send() in callback 1 is executed it gives error.
// Therefore, when using next() avoid using res.send in the same callback function
// there's another way to do same

app.use('/user1', (req,res,next)=>{
    console.log('callback 1 called');
    // res.send('callback 1 called'); // returns from the callback
    next(); // goes to next callback in the stack
});

app.use('/user1', (req,res,next)=>{
    console.log('callback 2 called');
    res.send('callback 2 called'); // returns from the callback
});

//* Another scenario

app.use('/user2', (req,res,next)=>{
    console.log('callback 1 called');
    res.send('callback 1 called'); // returns from the callback
});

app.use('/user2', (req,res,next)=>{
    console.log('callback 2 called');
    next();
});

// In Above case, If it went to user2 callback 1 and returned, it won't go to anyother user2 route function
// We can say that as 'callback 2 called' is not consoled 

//* NOTE: these callback function are called as 'Middleware'

//* next()

/*

* next() is a callback function provided by Express to pass control from one middleware or route handler "to the next in the stack".

* When next() is called → Express moves to the next matching function in that stack.

* If next() is not called, Express stops there — and no other middleware/route below executes.

*/

//* server listening on port 7000 (localhost:7000)
app.listen(7000, ()=> {
    console.log('server is listening on port 7000');
});