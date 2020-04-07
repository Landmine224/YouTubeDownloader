var mp3Btn = document.getElementById('mp3');
var	mp4Btn = document.getElementById('mp4');
var URLinput = document.querySelector('.URL-input');
var startPoint = document.querySelector('.start');
var endPoint = document.querySelector('.end');
var server = 'http://localhost:4000';
var type;

mp3Btn.addEventListener('click', () => {
	type = "mp3";
	download(URLinput.value, type, "asdf");
});


mp4Btn.addEventListener('click', () => {
	type="mp4";
	download(URLinput.value, type, "asdf");
});

async function download(query, format, title) {
	if(query.includes("watch")){
		var index = URLinput.value.indexOf("watch?v=")+8;
		var vidId = URLinput.value.slice(index, URLinput.length);
		title =  await vidSnippet(vidId);
		window.location.href = `${server}/download?url=${query}&vid_name=${title}&type=${type}`;
		
	} else {
	if(startPoint.value == ""){
			startPoint.value = 1;
		} 
		console.log(startPoint.value);
		if(endPoint.value == ""){
			endPoint.value = 1;
		}
		console.log(endPoint.value);
		getPlaylist(query);
	}
}

 async function getPlaylist(url){
	 var playlistId;
	 var index = url.indexOf("list=");
	 var playlistId = url.slice(index+5, url.length);
	 
	 if(endPoint.value > 50){
		 endPoint.value = 50;
	 } 
	 const response = await fetch(
	 "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId="+playlistId+"&key=AIzaSyBoZxIlEUuC5L_X6MzkvyXsx71EL-lRkIs");
	 const playlist = await response.json();
	 playlist_length = playlist.items.length;
	 console.log(playlist);
	 if(endPoint.value > playlist_length){
		 endPoint.value = playlist_length
	 }
	 for(var i = startPoint.value-1; i < endPoint.value; i++){
		 var vidId = playlist.items[i].snippet.resourceId.videoId;
		 var title = vidSnippet(vidId);
		 
		 sleep(2500);
		 download("https://www.youtube.com/watch?v="+vidId, type, title);
		 
	 }
	 
 }
 
 async function vidSnippet(vidId){
	 const response = await fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+vidId+"&key=AIzaSyBoZxIlEUuC5L_X6MzkvyXsx71EL-lRkIs")
	 const vid_json = await response.json();
	 var title = vid_json.items[0].snippet.title;
	 return title;
 }
 
 function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
 
 
