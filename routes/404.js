const express = require("express");
const router = express.Router();
const path = require("path");
const HTML = `<html> <style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> <body>  <div style='display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f9f9f9;'>
<h1 style='font-size: 4rem; margin-bottom: 0;'>Page Not Found</h1>
<img src='https://th.bing.com/th/id/OIP.ADlFHdE1Blf2lAAzDQgBUAHaFL?w=239&h=180&c=7&r=0&o=5&pid=1.7' style='margin-top: 1rem; max-width: 100%; height: auto; animation: fadeInUp 0.8s ease-in-out;'>
<p style='margin-top: 1rem; font-size: 1.2rem; text-align: center; color: #555;'>Oops! The page you are looking for might have been removed or is temporarily unavailable. <br>Please check the URL and try again or go back to the <a href='/' style='color: #4CAF50; text-decoration: none;'>homepage</a>.</p>
</div> </body> </html>
`;

router.use((req, res, next) => {
  //   res.status(404).send(HTML);
  //   res.status(404).sendFile(__dirname, "../", "views", "404.html");
  res.render("404", { pageTitle: "Not Found Page" });
});
  
module.exports = router;
