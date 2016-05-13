function Player() {
    var video = document.getElementById('video'),
        pauseScreen = document.getElementById('screen'),
        screenButton = document.getElementById('screen-button'),
        progressBar = document.getElementById('progressbar'),
        progressBarContainer = document.getElementById('progressbar-container'),
        playButton = document.getElementById('play-button'),
        timefield = document.getElementById('time-field'),
        soundButton = document.getElementById('sound-button'),
        soundBar = document.getElementById('soundbar'),
        soundBarContainer = document.getElementById('soundbar-container'),
        fullscreenButton = document.getElementById('fullscreen-button'),
        update = null;

    video.load();
    
    video.addEventListener('canplay', function() {
        playButton.addEventListener('click', playOrPause, false);
        progressBarContainer.addEventListener('click', skip, false);
        soundButton.addEventListener('click', muteOrUnmute, false);
        soundBarContainer.addEventListener('click', changeVolume, false);
        fullscreenButton.addEventListener('click', fullscreen, false);
        screenButton.addEventListener('click', playOrPause, false);
        
        updatePlayer();
    }, false);
    
    
    function playOrPause() {
        if (video.paused) {
            video.play();
            playButton.src = 'images/pause.png';
            
            setInterval(updatePlayer, 25);
            
            screenButton.src = 'images/play.png';
            pauseScreen.style.display = 'none';
        } else {
            video.pause();
            playButton.src = 'images/play.png';
            clearInterval(update);
            
            screenButton.src = 'images/play.png';
            pauseScreen.style.display = 'block';
        }
    }

    function updatePlayer()  {
        var percentage = (video.currentTime / video.duration) * 100;
        
        progressBar.style.width = percentage + '%';
        timefield.innerHTML = getFormattedTime();
        
        if (video.ended) {
            clearInterval(update);
            playButton.src = 'images/replay.png';
            pauseScreen.style.display = 'block';
            screenButton.src = 'images/replay.png';
        } else if (video.paused) {
            playButton.src = 'images/play.png';
            screenButton.src = 'images/play.png';
        }
    }
    
    function skip(e) {
        var mouseX = e.pageX - progressBarContainer.offsetLeft,
            width = window.getComputedStyle(progressBarContainer).getPropertyValue('width');
            
        width = parseFloat(width.substr(0, width.length - 2));
        
        video.currentTime = (mouseX / width) * video.duration;
        updatePlayer();
    }
    
    function getFormattedTime() {
        var seconds = Math.round(video.currentTime),
            minutes = Math.floor(seconds / 60),
            
            totalSeconds = Math.round(video.duration),
            totalMinutes = Math.floor(totalSeconds / 60);
        
        if (minutes > 0) {
            seconds -= minutes * 60;
        }
            
        if (seconds.toString().length === 1) {
            seconds = '0' + seconds;
        }
        
        if (totalMinutes > 0) {
            totalSeconds -= totalMinutes * 60;
        }
        
        if (totalSeconds.toString().length === 1) {
            totalSeconds = '0' + totalSeconds;
        }

        return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
    }
    
    function muteOrUnmute() {
        if (!video.muted) {
            video.muted = true;
            soundButton.src = 'images/mute.png';
            soundBar.style.display = 'none';
        } else {
            video.muted = false;
            soundButton.src = 'images/sound.png';
            soundBar.style.display = 'block';
        }
    }
    
    function changeVolume(e) {
        var mouseX = e.pageX - soundBarContainer.offsetLeft,
            width = window.getComputedStyle(soundBarContainer).getPropertyValue('width');
            
        width = parseFloat(width.substr(0, width.length - 2));
        
        video.volume = (mouseX / width);
        
        soundBar.style.width = (mouseX / width) * 100 + '%';
        
        video.muted = false;
        soundButton.src = 'images/sound.png';
        soundBar.style.display = 'block';
    }
    
    function fullscreen() {
         if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullscreen) {
            video.mozRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }
    
}