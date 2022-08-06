import http from "http";
import fs from "fs";

const writeResponse = (res, contentType, fileExtension) => {
  fs.readFile(`./index.${fileExtension}`, "utf-8", (err, data) => {
    res.writeHead(200, { "Content-Type": `${contentType}` });
    res.write(data);
    res.end();
  });
};

let server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      writeResponse(res, "text/html", "html");
      break;
    case "/index.css":
      writeResponse(res, "text/css", "css");
      break;
    case "/index.js":
      writeResponse(res, "text/javascript", "js");
  }
});

server.listen(3000);
