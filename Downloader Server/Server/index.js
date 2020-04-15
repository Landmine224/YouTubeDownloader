const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();

app.use(cors());

app.listen(4000, () => {
	console.log('Server Works !!! At port 4000');
});

app.get('/download', (req,res) => {
	var url = req.query.url;
	var title = req.query.vid_name;
	var type = req.query.type;
	var download_obj = {format:type};
	if(type == "mp3"){
		download_obj.filter = 'audioonly';
	}
	res.header('Content-Disposition', 'attachment; filename='+title+'.'+type);
	ytdl(url, download_obj)
	.pipe(res);
});