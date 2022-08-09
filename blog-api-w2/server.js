import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const file = (title) => `blogs-files/${title}.json`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/blogs", (req, res) => {
  const title = req.body.title;
  const content = JSON.stringify(req.body);
  fs.writeFileSync(file(title), content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  const title = req.params.title;
  const content = JSON.stringify(req.body);
  if (fs.existsSync(file(title))) {
    fs.writeFileSync(file(title), content);
    res.end("ok");
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(file(title))) {
    fs.unlinkSync(file(title));
    res.end("ok");
  } else {
    res.status(404).send("This post does not found!");
  }
});

app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(file(title))) {
    const post = fs.readFileSync(file(title));
    res.send(post);
  } else {
    res.status(404).send("This post does not found!");
  }
});

app.get("/blogs", (req, res) => {
  const dir = path.join(__dirname);
  const files = fs.readdirSync(`${dir}/blogs-files`);
  const blogsFileList = files.map((file) => {
    return { title: file };
  });

  if (blogsFileList.length !== 0) {
    res.send(blogsFileList);
    return;
  }
  res.status(404).json("There is no data to display");
});

app.listen(3000);
