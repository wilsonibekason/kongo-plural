const fs = require("fs");
let PORT = 3000;
let HOST = 3000;
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>hello</title></head>");
    res.write(
      "<body><h1>Hello Text</h1><form action='/message' method='POST'><input type='text' name='message' /> <button type='submit'>Send<button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(parsedBody, message);
      fs.writeFileSync("newmsg.txt", message);
    });
    fs.writeFile("message.txt", "Dummy Text created", (err) => {
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  console.log(req.headers, req.url);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>hello</title></head>");
  res.write("<body><h1>Hello Text</h1>");
  res.write("</html>");
  res.end();
};

const requestNewHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    // res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
      <head>
        <title>Hello</title>
      </head>
<style>
.text{
    font-size: large;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;
}
</style>
      <body>
        <h1 class="text">Hello Text</h1>
        <form action='/message' method='POST'>
          <input type='text' name='message' />
          <button type='submit'>Send</button>
        </form>
      </body>
    </html>
  `);
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`
  <html>
    <head>
      <title>Hello</title>
    </head>
<style>
.text{
  font-size: large;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;
}
</style>
    <body>
      <h1 class="text">Hello Text</h1>
    </body>
  </html>
`);
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: "SomeText",
  newHandler: requestNewHandler,
};
