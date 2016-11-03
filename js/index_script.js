// Loads the IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates an <iframe> and YouTube player after the API code downloads
var player1;
var player2;
function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player1', {
        height: '100vh',
        width: '100vw',
        videoId: 'Ih2Nn9VB2Xk', 	// Daily Show
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
    player2 = new YT.Player('player2', {
        height: '100vh',
        width: '100vw',
        videoId: 'h1Lfd1aB9YI', 	// John Oliver
        playerVars: {
            'autoplay': 0,
            'controls': 0,          // no player controls
            'showinfo': 0,          // no video title
            'loop': 1,
            'playlist': 'h1Lfd1aB9YI',
            'iv_load_policy': 3,    // no annotations
            'disablekb': 1,         // no keyboard controls
            'cc_load_policy': 0,    // no cc
            'modestbranding': 1,    // hides youtube logo
            'start': 1213,		    // start at rasin segment
            'end': 1265
        },
        events: {
            'onReady': onPlayer23Ready,
        }
    });
    player3 = new YT.Player('player3', {
        height: '100vh',
        width: '100vw',
        videoId: 'Ih2Nn9VB2Xk',
        playerVars: {
            'autoplay': 0,
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
            'onReady': onPlayer23Ready,
        }
    });
}

// API will call this function when the video player is ready
function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
}

// API will call this function when the video player is ready
function onPlayer23Ready(event) {
    event.target.mute();
}

// Rescales video to fit 16:9 ratio
// Credit to https://codepen.io/anon/pen/bwPgpj
function vidRescale() {
    var w = $(window).width();
    var h = $(window).height();
    if (w / h > 16 / 9) {
        player1.setSize(w, w / 16 * 9);
        player2.setSize(w, w / 16 * 9);
        player3.setSize(w, w / 16 * 9);
        $('#player1').css({'left': '0'});
        $('#player2').css({'left': '0'});
        $('#player3').css({'left': '0'});
    } else {
        player1.setSize(h / 9 * 16, h);
        player2.setSize(h / 9 * 16, h);
        player3.setSize(h / 9 * 16, h);
        $('#player1').css({'left': -($('#player1').outerWidth() - w) / 2});
        $('#player2').css({'left': -($('#player2').outerWidth() - w) / 2});
        $('#player3').css({'left': -($('#player3').outerWidth() - w) / 2});
    }
}

$(window).on('load resize', function(){
    vidRescale();
    adjustTitleHeight();
});

// mutes / unmutes videos
$('#player-mute').click(function() {
    if ($(this).hasClass("muted")) {
        player1.unMute();
        player2.unMute();
        player3.unMute();
        $(this).removeClass("muted");
        $(this).addClass("not-muted");
        $(this).html('<i class="fa fa-volume-up" aria-hidden="true"></i>');
    } else {
        player1.mute();
        player2.mute();
        player3.mute();
        $(this).removeClass("not-muted");
        $(this).addClass("muted");
        $(this).html('<i class="fa fa-volume-off" aria-hidden="true"></i>');
    }
});

// hides / shows text, keeping scroll position
var scrollPos = 0;
$('#hide-text').click(function() {
    if ($(this).hasClass("text-hidden")) {
        $('#wrapper').fadeIn();
        $('#player-overlay').fadeIn();
        $('#button-overlay').fadeIn();
        window.scrollTo(0, scrollPos);
        $(this).removeClass("text-hidden");
        $(this).html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
      	$(waypoints).each(function() {
            $(this)[0].enable()
        });
    } else {
        $(waypoints).each(function() {
            $(this)[0].disable()
        });
        scrollPos = $('body').scrollTop();
        $('#wrapper').fadeOut();
        $('#player-overlay').fadeOut();
        $('#button-overlay').fadeOut();
        $(this).addClass("text-hidden");
        $(this).html('<i class="fa fa-eye" aria-hidden="true"></i>');
    }
})


function switchVideos(oldPlayer, oldPlayerId, newPlayer, newPlayerId) {
    oldPlayer.pauseVideo();
    $(oldPlayerId).hide();
    $(newPlayerId).show();
    newPlayer.playVideo();
}

// Connects with waypoints to switch to desired video when scrolling
var waypoints = [];
$('.ha-waypoint').each(function(i) {
	var vid1 = $(this).data('animateUp');
    var vid2 = $(this).data('animateDown');
	var wp = new Waypoint({
		element: $(this),
		handler: function(direction) {
            if (direction == "down") {
                if (vid1 == "player1") {
                    switchVideos(player1, '#player1', player2, '#player2');
                } else if (vid1 == "player2") {
                    switchVideos(player2, '#player2', player3, '#player3');
                }
            } else {
                if (vid2 == "player2") {
                    switchVideos(player2, '#player2', player1, '#player1');
                } else if (vid2 == "player3") {
                    switchVideos(player3, '#player3', player2, '#player2');
                }
            }
		},
		offset: '100%'
	});
	waypoints.push(wp);
});
