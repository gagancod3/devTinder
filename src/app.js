//* Creating server using expressJS
const express = require("express");
const app = express();

//* on URL - localhost:7000



app.use('/user', (req,res,next)=>{
    console.log('callback 1 called');
    res.send('callback 1 called'); // returns from the callback
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