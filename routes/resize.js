const app = require("express").Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

app.use(fileUpload());

app.post("/", async (req, res) => {
  const quality = parseInt(req.query.quality) || 50;

  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  uploadPath = path.join("./uploads", sampleFile.name);

  fs.access("./uploads", (error) => {
    if (error) {
      fs.mkdirSync("./uploads");
    }
  });

  const ref = req.files.file.name;
  await sharp(req.files.file.data)
    .webp({ quality: quality })
    .toFile("./uploads/" + ref);

  // const link = "http://localhost:4000/" + ref;
  // res.send(link);

  res.sendFile(global.__root + "/uploads/" + ref);
});

module.exports = app;
