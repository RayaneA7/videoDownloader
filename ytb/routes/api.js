const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");

const router = express.Router();

//define variables
let url;
// "https://www.youtube.com/watch?v=nleI7IbpGhc&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp";
let videoInfos = {};

//creating modules
function urlShort(Url) {
	let short;
	short = Url.substring(Url.indexOf("=") + 1, Url.length);
	return short;
}
// console.log(urlShort(url));
//end fo modules creation

//handling requests

router.post("/download", (req, res) => {
	console.log(req.body);
	ytdl
		.getInfo(req.body.url)
		.then((result) => {
			// console.log(result);
			// videoInfos = result;
			videoInfos.title = result.player_response.videoDetails.title;
			videoInfos.author = result.player_response.videoDetails.author;
			let videoFormats = result.formats;
			videoInfos.qualities = [];
			videoInfos.iframeUrl = result.videoDetails.embed.iframeUrl;
			videoInfos.url = urlShort(req.body.url);

			for (let i = 0; i < videoFormats.length; i++) {
				if (videoFormats[i].hasAudio === true && videoFormats[i].qualityLabel) {
					console.log(` codec ${videoFormats[i].mimeType} son format ${videoFormats[i].qualityLabel}
					   et sa qualité est ${videoFormats[i].quality} `);
					console.log(i);
					videoInfos.qualities.push({
						quality: videoFormats[i].qualityLabel,
						container: videoFormats[i].container,
					});
				}
			}
			console.log("done");
		})
		.then((data) => res.send(videoInfos));
	setTimeout(
		() => console.log(videoInfos.title.replace(/[^a-zA-Z ]/g, "")),
		10000
	);
	console.log(req.query);
});

router.get("/download/video", (req, res) => {
	// ytdl(url, {
	// 	filter: (format) =>
	// 		format.container === req.query.container &&
	// 		format.hasAudio === true &&
	// 		format.qualityLabel === req.query.qualityLabel,
	// }).pipe(fs.createWriteStream(`${req.query.title}.${req.query.container}`));
	res.send(videoInfos);
	//before sending the title I will use console.log(str.replace(/[^a-zA-Z ]/g, ""));
});

//handling errors
router.err;

//exportation
module.exports = router;
