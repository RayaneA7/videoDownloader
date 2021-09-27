const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");
const { getInfo } = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const { title } = require("process");
const { format } = require("path");

// getInfo('https://www.youtube.com/watch?v=W1Kttu53qTg')
// .then((result) => {
//     console.log(result.thumbnail_url);
// })
// .catch((err) => {
//     console.log(err)
// });

//define var
let url =
	"https://www.youtube.com/watch?v=nleI7IbpGhc&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp";

ytdl
	.getInfo(url)
	.then((result) => {
		fs.writeFile("infosBasic.txt", JSON.stringify(result), () => {
			console.log("the file is downloaded");
		});
		let downVid = ytdl.downloadFromInfo(result, { quality: 140 });
		// fs.writeFile('infosBasics.txt', result, () => {
		//         console.log('the file is downloaded')
		// })
		// console.log(downVid)
		let audioVedio = ytdl.filterFormats(result.formats, "audio");

		let videoName = result.player_response.videoDetails.title;
		author = result.player_response.videoDetails.author;
		let urlVid = result.player_response.videoDetails.thumbnail.thumbnails;
		for (let i = 0; i < urlVid.length; i++) {
			console.log(urlVid[i].width);
		}
		console.log(author);

		let videoFormats = result.formats;

		for (let i = 0; i < videoFormats.length; i++) {
			if (videoFormats[i].hasAudio === true && videoFormats[i].qualityLabel) {
				console.log(` codec ${videoFormats[i].mimeType} son format ${videoFormats[i].qualityLabel}
                       et sa qualité est ${videoFormats[i].quality} `);
				console.log();
				console.log(i);
			}
		}

		ytdl(url, {
			filter: (format) =>
				format.container === "mp4" &&
				format.hasAudio === true &&
				format.qualityLabel === "360p",
		}).pipe(fs.createWriteStream(`${videoName}.mp4`));
		// .then ((resultat) => {
		//       console.log(`the video ${videoName} has been downloaded`)
		//   });

		// console.log(
		// 	` the file with audio ${vid.hasVideo}  has the url ${
		// 		!vid.hasVideo ? vid.url : false
		// 	} `
		// );
		// console.log(result.player_response.videoDetails);
		// console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});

console.log("hello there");

// (async (videoInfos) => {
// 	let newPromise = ytdl.getInfo(url).then((result) => {
// 		// console.log(result);
// 		videoInfos = result;
// 		arrayInfos.push(result.player_response.videoDetails);
// 	});

// 	await newPromise;

// 	// console.log(videoInfos);
// })();
