//* Creating server using expressJS
const express = require("express");
const app = express();

//* on URL - localhost:7000

app.get('/',(req,res)=> {
    res.send('Welcome ji');
});

//* OR

// app.use((req,res)=> {
//     res.send('Welcome ji');
// });

/*
app.get() -
Handles only GET requests on the root '/' path

app.use() -
> app.use() is middleware.
> With no path specified, it matches all routes & all HTTP methods
*/

//* on URL - localhost:7000/gagan
app.get('/gagan',(req,res)=> {
    res.send('Hello Gagan');
});

//* server listening on port 7000 (localhost:7000)
app.listen(7000, ()=> {
    console.log('server is listening on port 7000');
});
