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
    videoId: 'Ih2Nn9VB2Xk',
    playerVars: {
        'autoplay': 1,
        'controls': 0,          // no player controls
        'showinfo': 0,          // no video title
        'loop': 1,
        'playlist': 'Ih2Nn9VB2Xk',
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


$('#player-mute').click(function() {
  if ($(this).hasClass("muted")) {
    player.unMute();
    $(this).removeClass("muted");
    $(this).addClass("not-muted");
    $(this).html('<i class="fa fa-volume-up" aria-hidden="true"></i>');
  } else {
    player.mute();
    $(this).removeClass("not-muted");
    $(this).addClass("muted");
    $(this).html('<i class="fa fa-volume-off" aria-hidden="true"></i>');
  }
});

var scrollPos = 0;
$('#hide-text').click(function() {
  if ($(this).hasClass("text-hidden")) {
    $('#wrapper').fadeIn();
    $('#player-overlay').fadeIn();
    // scrollto scrollPos
    window.scrollTo(0, scrollPos);
    $(this).removeClass("text-hidden");
    $(this).html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
  } else {
    scrollPos = $('body').scrollTop();
    $('#wrapper').fadeOut();
    $('#player-overlay').fadeOut();
    $(this).addClass("text-hidden");
    $(this).html('<i class="fa fa-eye" aria-hidden="true"></i>');
  }
})
