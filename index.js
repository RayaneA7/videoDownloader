const express = require("express");
const app = express();

//middelwares
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// must try it
//initialise routes
app.use("/api", require("./routes/api"));

//errors handling middleware
app.use((err, req, res, next) => {
	res.status(422).send({ error: err });
});

//server listenning for requests
app.listen(process.env.port || 3000, () => {
	console.log("the server is listening");
});
