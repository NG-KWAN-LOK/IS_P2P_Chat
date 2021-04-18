var path = require("path");
var express = require("express");

var app = express();

app.use(express.static(path.join(__dirname, "build")));
app.set("port", process.env.PORT || 8080);

var server = app.listen(app.get("port"), function () {
  console.log("listening on port ", server.address().port);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});
