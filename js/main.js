$(document).ready(function() {

  const videoList = $('#video-list'),
  player = $('#player');

  // https://www.w3schools.com/jquery/ajax_getjson.asp
  function init(){
    $.getJSON('json/videos.json', function(data){
      displayVideos(data.videos);
      addListners();
    });
  }
  
  function displayVideos(videos){
  let string ='';
  $.each(videos, function(i, video) {
    string += getVideoHtml(video);
  });

  videoList.html(string);
  }
  
  function getVideoHtml(video){
    return `<div class="video-item" data-id="${video.id}">
      <div>
        <img src="https://img.youtube.com/vi/${video.id}/default.jpg" alt="This is a YouTube video called ${video.title}"></img>
      </div>
      <div>
        <h3>${video.title}</h3>
        <p>${video.category}</p>
      </div>
    </div>
    `
  }
  function addListners(){
    $('.video-item').on('click', function(){
      console.log($(this));
      let videoId = $(this).data('id');
      playVideo(videoId);

      // getting the HTML data attribute called id out 
      // let id = $(this).data('id')
      // player.attr('src', `https://www.youtube.com/embed/<<<your ID here>>>?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1`)
    });
  }

  function playVideo(id){
    player.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1`)
  }

  init();
})