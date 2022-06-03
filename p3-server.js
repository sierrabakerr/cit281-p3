//import the built-in fs package, and assign the package to a constant variable called fs
const fs = require("fs");
//import the third-party fastify package, and assign the package to a constant variable called fastify
const fastify = require("fastify")();
//import the coinCount function from the p3-module.js code module file
const { coinCount } = require("./p3-modules.js");

/*Add a GET route for / that reads and returns index.html using the readFile() fs function. 

Use an arrow function for the second parameter of readFile(). Use Node.js __dirname variable to get the appropriate path for index.html. 
If no error occurs, also include a status code of 200. 
If an error occurs, return a status code of 500.
Add a fastify listen() section to support running the p3-server.js as a web server.
Use localhost as the IP address, and port 8080. The code must also output to the console the IP and port of the listening web server.
*/

/*<li><a href="/coin?denom=25&count=3">3 x 25 coin = 75</a></li>
<li><a href="/coins?option=1">Option 1 = 35</a></li>
<li><a href="/coins?option=2">Option 2 = 57</a></li>
<li><a href="/coins?option=3">Option 3 = 57</a></li> <!--(Extra Credit)-->*/

//Part 8
fastify.get("/",(request, reply) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
  if (err) {
  console.log(err);
  reply.code(500);
  reply.header('Content-Type', 'text/html'); //Include the appropriate Content-Type MIME header type.
  reply.send("ERROR IN REQUEST");
  } else {
  reply.code(200);
  console.log("URL: ", request.query);
  reply.header('Content-Type', 'text/html');
  reply.send(data);
  }
  });
  });
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server listening on ${address}`);
  });

  //Part 9
  fastify.get("/coin",(request, reply) => {
  let {denom = 0, count = 0} = request.query;

  denom = parseInt(denom);
  count = parseInt(count);
  let coinValue = coinCount ({denom, count});

  reply
  .code(200)
  .header("Content-Type", "text/html; charset=utf-8")
  .send(
  `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
  );
});

//Part 10
fastify.get("/coins",(request, reply) => {
  let {option} = request.query;
  option = parseInt(option);

  let coinValue;
option = parseInt(option);
  let coins = [{denom: 25, count: 2},
  {denom: 1, count: 7}]; 

switch (option) {

  case 1:  
  coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });; //Option = 1
  break;

  case 2:  
  coinValue = coinCount(...coins); //Option = 2      
  break;

  case 3:
   coinValue = coinCount(coins); //Extra credit: option = 3
   break;

  default:
  coinValue = 0;
  break;
}
  reply
  .code(200)
  .header("Content-Type", "text/html; charset=utf-8")
  .send(
    `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
  );
});