const songs = {
    "0" : {
        "name" : "./songs/21 Century.mp3",
        "artist" : "Mankirt Aulakh Ft. Singga",
        "image": "./songs/images/21-Century-Mankirt-Aulakh.jpg",
        "wallpaper":"./songs/images/21-century-Background.jpg"
    },
    "1" :{
        "name" : "./songs/FAMOUS.mp3",
        "artist" : "SIDHU MOOSE WALA",
        "image": "./songs/images/Famous_480x480_1529137214.jpg",
        "wallpaper":"./songs/images/famous-sidhu-moose-wala-Background.jpg"
    },
    "2": {
        "name" : "./songs/GIRLFRIEND.mp3",
        "artist" : "JASS MANAK",
        "image": "./songs/images/girlfriend_480x480_1550087640.jpg",
        "wallpaper":"./songs/images/girlfriend-67979567-background.jpg"
    },
    "3" :{
        "name" : "./songs/Sorry.mp3",
        "artist" : "Justin Bieber",
        "image": "./songs/images/sorry-b375f19b271aa690b075749e76d9b4e9.jpg",
        "wallpaper":"./songs/images/justin-bieber-background.jpg"
    }
}

const audioControls = document.createElement('audio');
audioControls.autoplay = false;
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
    if(!isPlaying){
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
        audioControls.setAttribute('src',source.name);
        if(audioControls.currentTime < 3 || isNext) audioControls.load();
        audioControls.play();
        isPlaying = !isPlaying;
    }
}

function pause(){
    if(isPlaying){
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        audioControls.pause();
        isPlaying = !isPlaying;
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
    if(evt.keyCode == 32 && isPlaying){
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
}

function changeVolume(evt){
    let val = evt.target.value;
    console.log('before' + val);
    val = val /100;
    console.log('after' + val);
    audioControls.volume = val;
}

audioControls.addEventListener('timeupdate', () => {
    timeRange.value = parseInt(((audioControls.currentTime / audioControls.duration)*100));
});

timeRange.addEventListener('change', (evt) => {
    console.log(evt.target.value);
    timeRange.value = evt.target.value;
    audioControls.currentTime = parseInt((evt.target.value / 100) * audioControls.duration);
    console.log(parseInt((evt.target.value / 100) * audioControls.duration));
});

window.onload = () =>{
    setSongAttributes(songs[currentSong]);
};
