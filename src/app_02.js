//* Creating server using expressJS
const express = require("express");
const app = express();

//* on URL - localhost:7000


/*

//* app.get()

> Used to define route handlers for GET requests only.

> It’s a final route handler, not middleware, unless you call next().

> It matches the exact path (unless path parameters or wildcards are used).

*/

//* on URL - localhost:7000/user

// app.get('/user',(req,res)=> {
//     res.send('Hello user');
// });

/*
//* app.use()

> Used to mount middleware functions or entire routers.

> It matches all HTTP methods (GET, POST, PUT, etc.) by default.

> It does not check for an exact path match unless specified.

> If you don’t specify a path, it applies to all routes.

*/

// app.use('/user', (req,res,next)=>{
//     res.send('user called');
//     // console.log('user called');
//     // next();
// });

//* next() 

/*

* next() is a callback function provided by Express to pass control from one middleware or route handler "to the next in the stack".

* When next() is called → Express moves to the next matching function in that stack.

* If next() is not called, Express stops there — and no other middleware/route below executes.

*/

// app.use('/user2', (req,res)=>{
//     res.send('user called 2');
// });

//* declare '/' at last if using app.use() - Recommended
/*
* 
*/
// app.use('/', (req,res) => {
//     res.send('Hello there');
// });

//* Types of HTTPS Request Methods -

//* GET Request
app.get('/user',(req,res)=> {
    res.send('Hello user');
});

//* POST Request
app.post('/user',(req,res)=> {
    res.send('User added');
});

//* DELETE Request
app.delete('/user',(req,res)=> {
    res.send('User deleted');
});

//* PUT Request
app.put('/user',(req,res)=> {
    res.send('User updated');
});

//* PATCH Request
app.patch('/user',(req,res)=> {
    res.send('User patched (minor changes to existing one)');
});

//* RegExp 

// Below URL pattern works fine with express old versions like v4
// app.get('/ab?c', (req, res) => {
//   res.send("matched pattern ");
// });

//* (I) 

// We're currently using v5 which throws with above syntax, to make it work we do -
app.get(/^\/ab?c$/, (req, res) => {
  res.send("matched pattern for /abc or /ac");
});

//* localhost:7000/ac

// We can also group optionals
app.get(/^\/e(james)?h$/, (req,res) => {
    res.send("matched pattern starts with 'e' and ends with 'h' and 'james' is optional in between");
});

//* localhost:7000/ad    localhost:7000/abcd  

/*

Explanation:

^ → start of string

^\/ — anchors to the start and matches the literal leading '/'. In a JS regex literal the '/' delimiter must be escaped as '\/'

$ → end of string

b? → “b” is optional

* The entire string must match exactly /abc or /ac

*/

//* (II)

app.get(/^\/pq+r$/, (req,res) => {
    res.send('matched pattern starts with "p" and ends with "r" with n numbers of "q" inbewteen');
});

//* example : localhost:7000/pqqqqqqqr

app.get(/^\/a+b$/, (req, res) => {
  res.send("matched pattern starts with 'a' and ends with 'b' with n number of 'a' in between it");
});

//* example : localhost:7000/aaaaaab

//* (III)

app.get(/^\/q.*r$/, (req,res) => {
    res.send('matched pattern starts with "q" and ends with "r" with anything inbewteen them');
});

//* example : localhost:7000/qYouCanAddWhateverYouWantHerer

app.get(/^\/.*z$/, (req, res) => {
  res.send("matched pattern ends with 'z' and before 'z', anything is acceptable");
});

//* example : localhost:7000/YouCanAddWhateverYouWantHerez

//* On URL - 'localhost:7000/ or localhost:7000' 
app.get('/',(req,res)=> {
    res.send('Welcome there');
});


//* Read Query Parameters (req.query)
app.get('/userdetail', (req,res) => {
    console.log(req.query); // shows request parameters
    //prints - [Object: null prototype] { userID: '7', profile: 'developer' }
    // we can also destructure 
    const {userID} = req.query;
    console.log(userID); // 7
    res.send(`details for user with id:${req.query.userID} is shown`);
});

/*
* Query parameters appear after the ? in a URL.

* Express automatically parses them into an object under req.query.

* Values are always strings, e.g. { userID: '7', profile: 'developer' }

*Use case:

* When you want optional or filter-based data (e.g. /search?term=nodejs&page=2)

* When the parameters don’t identify a unique resource but act as filters.

*/
//* Read Route Parameters (req.params)
app.get('/userdetail/:profile/:id', (req,res) => {
    console.log(req.params); // shows request parameters
    //prints - [Object: null prototype] { userID: '7', profile: 'developer' }
    
    res.send(`details for user of profile:${req.params.profile} with id:${req.params.id} is shown`);
});

/*
*How it works:

* ':id' is a route parameter defined in the URL pattern.

* Express extracts it directly from the path and places it in 'req.params'.

* It is used for identifying specific resources.

*Use case:

*When you are retrieving or operating on a specific resource, such as:

/users/7

/products/1234

/orders/1001/items

*/

//* Combined Query & Route Parameter
app.get('/userdetail/:id', (req,res) => {
    console.log(req.query?.profile); //developer
    res.send(`details fetched for id:${req.params.id} with profile:${req.query?.profile}`);
});


/*
Above, We have utilized both Query and route parameters.
*/

//* server listening on port 7000 (localhost:7000)
app.listen(7000, ()=> {
    console.log('server is listening on port 7000');
});