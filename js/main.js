$(document).ready(function() {

  const EL_VIDEO_LIST = $('#video-list'),
  EL_PLAYER = $('#player')
  EL_SEARCH_BOX = $('#search-box');
  let videosArr = [];

  // https://www.w3schools.com/jquery/ajax_getjson.asp
  function init(){
    $.getJSON('json/videos.json', function(data){
      videosArr = data.videos;
      displayVideos(videosArr);
      // addClickListners();
    });
    EL_SEARCH_BOX.on('keyup', function(event){
      event.preventDefault();
      displayVideosByTitle($(this).val());
    });
  }
  
  function displayVideos(videos){
  let string ='';
  $.each(videos, function(i, video) {
    string += getVideoHtml(video);
  });

  EL_VIDEO_LIST.html(string);
  addClickListners();
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
  function addClickListners(){
    $('.video-item').on('click', function(){
      let videoId = $(this).data('id');
      playVideo(videoId);

      // getting the HTML data attribute called id out 
      // let id = $(this).data('id')
      // EL_PLAYER.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1`)
    });
  }

  function playVideo(id){
    EL_PLAYER.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1`)
  }

  function displayVideosByTitle(title){
    let filteredVideos = [];
    
    $.each(videosArr, function(i, video) {
    if (video.title.includes(title)) {
      filteredVideos.push(video);
      }
    });
    displayVideos(filteredVideos);
  }

  init();
})