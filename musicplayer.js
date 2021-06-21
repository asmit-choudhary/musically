const songs = {
    "0" : {
        "name" : "./songs/21 Century.mp3",
        "artist" : "Mankirt Aulakh Ft. Singga",
        "image": "./songs/images/21-Century-Mankirt-Aulakh.jpg",
        "wallpaper":"./songs/images/21-century-Background.jpg"
    },
    "1" :{
        "name" : "./songs/Famous.mp3",
        "artist" : "Sidhu Moose Wala",
        "image": "./songs/images/Famous_480x480_1529137214.jpg",
        "wallpaper":"./songs/images/famous-sidhu-moose-wala-Background.jpg"
    },
    "2": {
        "name" : "./songs/Girlfriend.mp3",
        "artist" : "Jass Manak",
        "image": "./songs/images/girlfriend_480x480_1550087640.jpg",
        "wallpaper":"./songs/images/girlfriend-67979567-background.jpg"
    },
    "3" :{
        "name" : "./songs/Sorry.mp3",
        "artist" : "Justin Bieber",
        "image": "./songs/images/sorry-b375f19b271aa690b075749e76d9b4e9.jpg",
        "wallpaper":"./songs/images/justin-bieber-background.jpg"
    },
    "4" :{
        "name" : "./songs/Dil Mein Ho Tum.mp3",
        "artist" : "Armaan Malik",
        "image": "./songs/images/Dil-mein-ho-tum.jpg",
        "wallpaper":"./songs/images/Dil-Mein-Ho-Tum-Song-Lyrics-background.jpg"
    },
    "5" :{
        "name" : "./songs/Billian Billian.mp3",
        "artist" : "Guri",
        "image": "./songs/images/Billian-Billian.jpg",
        "wallpaper":"./songs/images/Billian-Billian-background.jpg"
    },
    "6" :{
        "name" : "./songs/Made In India.mp3",
        "artist" : "Guru Randhawa",
        "image": "./songs/images/made-in-india.jpg",
        "wallpaper":"./songs/images/made-in-india-background.jpg"
    },
    "7" :{
        "name" : "./songs/Kya Baat hai.mp3",
        "artist" : "Harrdy Sandhu ",
        "image": "./songs/images/kya-baat-hai.jpg",
        "wallpaper":"./songs/images/kya-baat-hai-background.jpg"
    },
    "8" :{
        "name" : "./songs/Nira Ishq.mp3",
        "artist" : "Guri",
        "image": "./songs/images/nira-ishq.jpg",
        "wallpaper":"./songs/images/nira-ishq-background.jpg"
    }
}

const audioControls = document.createElement('audio');
audioControls.autoplay = false;
audioControls.setAttribute('preload', 'metadata');

let currentSong = 0;
const playBtn = document.querySelector('#play-btn');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#pre-song');
const nextBtn = document.querySelector('#next-song');
const songPic = document.querySelector('.picture');
const songPicElem = document.querySelector('.container');
const songNameElem = document.querySelector('.song-name');
const songArtistElem = document.querySelector('.song-artist');
const audioPlayerElem = document.querySelector('#audio-player-element');
// const audioControls = document.querySelector('#audio-controls');
const volumeRange = document.querySelector('#volume-range');
const timeRange = document.querySelector('#music-range');


let isPlaying = false;

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pause);
prevBtn.addEventListener('click', preTrack);
nextBtn.addEventListener('click', nextTrack);
audioControls.addEventListener('ended', nextTrack);
volumeRange.addEventListener("change", changeVolume);


function playAudio(){
    play(songs[currentSong], false);
}

function play(source, isNext){
    if(audioControls.paused){
        pauseBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
        songPic.style["background-image"] = `url(${source.image})`;
        songPicElem.style["background-image"] = `url(${source.wallpaper})`;
        let songName = source.name;
        songName = songName.substring(songName.lastIndexOf('/')+1);
        let dotPosition = songName.lastIndexOf('.');
        songName = songName.substring(0,dotPosition);
        songNameElem.children[0].textContent = songName;
        songArtistElem.children[0].textContent = source.artist;
        if(audioControls.currentTime < 3 || isNext){
            audioControls.setAttribute('src',source.name);
            audioControls.load();
        }
        audioControls.play();
        settotalTimeOfSong(source);
        // isPlaying = !isPlaying;
        // console.log(audioControls);
        // console.log("play->" + audioControls.paused);
    }
}

function pause(){
    if(!audioControls.paused){
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        audioControls.pause();
        // isPlaying = !isPlaying;
        // console.log("pause->" + audioControls.paused);
    }
}


function setSongAttributes(source){
    songPic.style["background-image"] = `url(${source.image})`;
    songPicElem.style["background-image"] = `url(${source.wallpaper})`;
    let songName = source.name;
    songName = songName.substring(songName.lastIndexOf('/')+1);
    let dotPosition = songName.lastIndexOf('.');
    songName = songName.substring(0,dotPosition);
    songNameElem.children[0].textContent = songName;
    songArtistElem.children[0].textContent = source.artist;
}

function nextTrack(){
    pause();
    currentSong = (currentSong + 1) % Object.keys(songs).length;
    play(songs[currentSong], true);
}

function preTrack(){
    pause();
    let noOfSongs = Object.keys(songs).length;
    currentSong = (currentSong - 1) % noOfSongs;
    if(currentSong < 0) currentSong = noOfSongs - 1;
    play(songs[currentSong], true);
}

document.body.onkeydown = (evt) => {
    evt = evt || window.event;
    if(evt.keyCode == 32 && !audioControls.paused){
        pause();
    }
    else if(evt.keyCode == 32){
        playAudio();
    }
    else if(evt.keyCode == 39){
        nextTrack();
    }
    else if(evt.keyCode == 37){
        preTrack();
    }
    // console.log(evt.keyCode);
}

function changeVolume(evt){
    let val = evt.target.value;
    // console.log('before' + val);
    val = val /100;
    // console.log('after' + val);
    audioControls.volume = val;
}

audioControls.addEventListener('timeupdate', () => {
    timeRange.value = parseInt(((audioControls.currentTime / audioControls.duration)*100));
});

timeRange.addEventListener('change', (evt) => {
    // console.log(evt.target.value);
    timeRange.value = evt.target.value;
    audioControls.currentTime = parseInt((evt.target.value / 100) * audioControls.duration);
    // console.log(parseInt((evt.target.value / 100) * audioControls.duration));
});

window.onload = () =>{
    setSongAttributes(songs[currentSong]);
};

audioControls.addEventListener("timeupdate", function() {
    // console.log(audioControls.currentTime);
    // console.log("duration------->" + audioControls.duration);
    settotalTimeOfSong();
    setcuurentTimeOfSong();
});

function settotalTimeOfSong(){
    if(isNaN(audioControls.duration))
        return;
    let finishTime = document.querySelector("#finish-time");
    let totalTime = Math.ceil(audioControls.duration);
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime - minutes * 60;
    let minutesTick = "" + minutes;
    let secondsTick = "" + seconds;
    if(minutes < 10){ minutesTick = "0" + minutes;}
    if(seconds < 10){ secondsTick = "0" + seconds;}
    // console.log(audioControls.duration);
    finishTime.textContent = minutesTick + ":" + secondsTick;
}

function setcuurentTimeOfSong(){
    if(isNaN(audioControls.currentTime))
        return;
    let startTime = document.querySelector("#start-time");
    let currentTime = Math.floor(audioControls.currentTime);
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime - minutes * 60;
    let minutesTick = "" + minutes;
    let secondsTick = "" + seconds;
    if(minutes < 10){ minutesTick = "0" + minutes;}
    if(seconds < 10){ secondsTick = "0" + seconds;}
    startTime.textContent = minutesTick + ":" + secondsTick;
}

document.querySelector('.mute-btn').addEventListener( 'click', (evt) =>{
    if(audioControls.muted){
        evt.target.style.color = 'white';
        audioControls.muted = false;
        return;    
    }
    audioControls.muted = true;
    evt.target.style.color = 'red';
    console.log('mute-btn');
});

document.querySelector('.full-vol-btn').addEventListener('click', (evt) =>{
    audioControls.volume = 1;
    //evt.target.style.color = 'dodgerBlue';
    volumeRange.value = 100;
    console.log('full-vol-btn');
});