// Loads the IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates an <iframe> and YouTube player after the API code downloads
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100vh',
    width: '100vw',
    videoId: 'mNiqpBNE9ik',
    playerVars: {
        'autoplay': 1,
        'controls': 0,           // no player controls
        'showinfo': 0,          // no video title
        'loop': 1,
        'iv_load_policy': 3,    // no annotations
        'disablekb': 1,         // no keyboard controls
        'cc_load_policy': 0,    // no cc
        'modestbranding': 1     // hides youtube logo
    },
    events: {
      'onReady': onPlayerReady,
    }
  });
}

// API will call this function when the video player is ready
function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
}

// Rescales video to fit 16:9 ratio
// Credit to https://codepen.io/anon/pen/bwPgpj
function vidRescale() {
    var w = $(window).width();
    var h = $(window).height();
    if (w / h > 16 / 9) {
        player.setSize(w, w / 16 * 9);
        $('#player').css({'left': '0'});
    } else {
        player.setSize(h / 9 * 16, h);
        $('#player').css({'left': -($('#player').outerWidth() - w) / 2});
    }
}

$(window).on('load resize', function(){
  vidRescale();
  adjustTitleHeight();
});
