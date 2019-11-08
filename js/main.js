$(document).ready(function() {

  const EL_VIDEO_LIST = $('#video-list'),
  EL_PLAYER = $('#player'),
  EL_SEARCH_BOX = $('#search-box'),
  EL_CATEGORY_LIST = $('#category-list'),
  EL_SCREEN_LINKS = $('.screen-link'),
  EL_SCREENS = $('.screen'),
  // Akash
  EL_CATEGORY_SEARCH_BOX = $('#search-category-box');
  let videosArr = [];
  let categoriesArr =[];

  // https://www.w3schools.com/jquery/ajax_getjson.asp
  function init(){
    console.log (EL_SCREENS);
    $.getJSON('json/videos.json', function(data){
      videosArr = data.videos;
      displayVideos(videosArr);
    });
    // Akash Parameters only exist inside the function they are being passed into
    // The anonymous function is called a callback function
    // callback function = function that is called when the method/or function finishes executing its task
    $.getJSON('json/categories.json', function(data){
      categoriesArr = data.categories;
      displayCategories(categoriesArr);
    });
    EL_SEARCH_BOX.on('keyup', function(event){
      event.preventDefault();
      if(event.which === 13){
        let video = getVideoById($(this).val())
        if (video){
          displayVideos([video]);
        } else{
          displayVideosByTitle($(this).val());
        }
      }
    });
    EL_SCREEN_LINKS.on('click', switchScreens);
    EL_SCREENS.slice(1).hide();    
      // Akash
    EL_CATEGORY_SEARCH_BOX.on('keyup', function(event){
      event.preventDefault();
      displayVideosByAkashCategory($(this).val());
    });
  }
    function displayVideos(videos){
    let string ='';
    $.each(videos, function(i, video) {
      string += getVideoHtml(video);
    });
    EL_VIDEO_LIST.html(string);
    addVidoeListners();
  }
  function displayCategories(categoriesArr){
    let string ='';
    // Anon Fx here is getting two things the .each method passes - index & category
    $.each(categoriesArr, function(i, categoriesArr) {
      string += getCategoryHtml(categoriesArr);
    });
    EL_CATEGORY_LIST.html(string);
    addCategoryListners();
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
  function getCategoryHtml(categoriesArr){
    return `<li class="category-item" data-category="${categoriesArr.slug}"><h4>${categoriesArr.title}</h4></li>
    `
  }
  function addVidoeListners(){
    $('.video-item').on('click', function(){
      let videoId = $(this).data('id');
      playVideo(videoId);
    });
  }
  function addCategoryListners(){
    $('.category-item').on('click', function(){
      let category = $(this).data('category');
      displayVideosByCategory(category);
    })
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
  function displayVideosByCategory(category){
    let filteredVideos = [];
    $.each(videosArr, function(i, video) {
    if (category === video.category) {
      filteredVideos.push(video);
      }
    });
    displayVideos(filteredVideos);
  }
  // Akash
  function displayVideosByAkashCategory(category){
    let filteredVideos = [];
    $.each(videosArr, function(i, video) {
    if (video.category.includes(category)) {
      filteredVideos.push(video);
      }
    });
    displayVideos(filteredVideos);
  }
  function getVideoById(input){
    for(let i = 0; i < videosArr.length; i++){
      if (input === videosArr[i].id){
        return videosArr[i];
      }
    }
    return null;
  }
  function switchScreens(){
    EL_SCREENS.hide();
    $('#' + $(this).data('screen')).show();
  }

  // Akash webcam
$('#switch').click(function(){ 
  if ($(this).prop('checked')){
      $('.menu').removeClass('off').addClass('on');
  } else {
     $('.menu').removeClass('on').addClass('off');
  }
});
  init();
})

