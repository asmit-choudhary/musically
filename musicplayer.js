const songs = {
    "0" : {
        "name" : "./songs/21 Century.mp3",
        "artist" : "Mankirt Aulakh Ft. Singga"
    },
    "1" :{
        "name" : "./songs/FAMOUS.mp3",
        "artist" : "SIDHU MOOSE WALA"
    },
    "2": {
        "name" : "./songs/GIRLFRIEND.mp3",
        "artist" : "JASS MANAK"
    },
    "3" :{
        "name" : "./songs/Sorry.mp3",
        "artist" : "Justin Bieber"
    }
}

let audioElement = document.createElement('audio');
let currentSong = 0;
const playBtn = document.querySelector('#play-btn');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#pre-song');
const nextBtn = document.querySelector('#next-song');
const audioPlayerElem = document.querySelector('#audio-player-element');
const audioControls = document.querySelector('#audio-controls');

let isPlaying = false;

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pause);
prevBtn.addEventListener('click', preTrack);
nextBtn.addEventListener('click', nextTrack);


function playAudio(evt){
    // evt.target.classList.toggle('fa-play-circle');
    // evt.target.classList.toggle('fa-pause-circle');
    // document.querySelector('#audio-player-element').src = songs[currentSong].name;
    // isPlaying = !isPlaying;
    // if(isPlaying){
    //     document.querySelector('#audio-controls').play();
    // }
    // else{
    //     document.querySelector('#audio-controls').pause();
    // }
    play(songs[currentSong].name, false);
}

function play(source, isNext){
    if(!isPlaying){
        pauseBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
        audioPlayerElem.setAttribute('src',source);
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


function nextTrack(){
    // if(!isPlaying){
    //     document.querySelector('#play-btn').classList.toggle('fa-play-circle');
    //     document.querySelector('#play-btn').classList.toggle('fa-pause-circle');
    //     isPlaying = !isPlaying;
    // }
    
    // document.querySelector('#audio-controls').pause();
    // currentSong = (currentSong + 1) % Object.keys(songs).length;
    // console.log(currentSong);
    // document.querySelector('#audio-player-element').setAttribute('src',songs[currentSong].name);
    // document.querySelector('#audio-controls').load();
    // document.querySelector('#audio-controls').play();

    pause();
    currentSong = (currentSong + 1) % Object.keys(songs).length;
    play(songs[currentSong].name, true);
}

function preTrack(){
    // if(!isPlaying){
    //     document.querySelector('#play-btn').classList.toggle('fa-play-circle');
    //     document.querySelector('#play-btn').classList.toggle('fa-pause-circle');
    //     isPlaying = !isPlaying;
    // }
    // document.querySelector('#audio-controls').pause();
    // let noOfSongs = Object.keys(songs).length;
    // currentSong = (currentSong - 1) % noOfSongs;
    // if(currentSong < 0) currentSong = noOfSongs - 1;
    // document.querySelector('#audio-player-element').setAttribute('src',songs[currentSong].name);
    // document.querySelector('#audio-controls').load();
    // document.querySelector('#audio-controls').play();

    pause();
    let noOfSongs = Object.keys(songs).length;
    currentSong = (currentSong - 1) % noOfSongs;
    if(currentSong < 0) currentSong = noOfSongs - 1;
    play(songs[currentSong].name, true);
}

// myAudio = document.getElementById('total-time');
//   myAudio.addEventListener('canplaythrough', function() {
//     this.currentTime = 0;
//     this.play();
//   });