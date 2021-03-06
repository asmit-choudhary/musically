let songs = NORMAL;

let preOrderSongs;
let isRepeat = false;
// shuffleSong(songs);

// entire audio is controlled inside this element
const audioControls = document.createElement("audio");
audioControls.autoplay = false;
audioControls.setAttribute("preload", "metadata");

let currentSong = 0;
let previousSong = 0;
// const playBtn = document.querySelector("#play-btn");
// const pauseBtn = document.querySelector("#pause-btn");
const waitLoader = document.querySelector('.progress');
const playWrapper = document.querySelector('.play');
const prevBtn = document.querySelector("#pre-song");
const nextBtn = document.querySelector("#next-song");
const songPic = document.querySelector(".picture");
const songPicElem = document.querySelector(".container");
const songNameElem = document.querySelector(".song-name");
const songArtistElem = document.querySelector(".song-artist");
const audioPlayerElem = document.querySelector("#audio-player-element");
// const audioControls = document.querySelector('#audio-controls');
const volumeRange = document.querySelector("#volume-range");
const timeRange = document.querySelector("#music-range");
const shuffleTrack = document.querySelector("#shuffle");
const repeatSongs = document.querySelector("#repeat");
const noRepeatSongs = document.querySelector("#repeat1");

const listButten = document.querySelector(".list-btn");
const angleUp = document.querySelector("#list-up");
const angleDown = document.querySelector("#list-down");
const musicList = document.querySelector(".music-list");

const moodList = document.querySelector(".moods");
const mobileMood = document.querySelector(".mood-list-mobile");

let isPlaying = false;

playWrapper.onclick = playAudio;
prevBtn.addEventListener("click", preTrack);
nextBtn.addEventListener("click", nextTrack);
audioControls.addEventListener("ended", nextTrack);
volumeRange.addEventListener("change", changeVolume);
shuffleTrack.addEventListener("click", shuffleSong);
repeatSongs.addEventListener("click", repeatTrack);
noRepeatSongs.addEventListener("click", noRepeatTrack);

listButten.addEventListener("click", songsList);

moodList.addEventListener("change", moodListChanger);
mobileMood.addEventListener('click', () => moodList.click());
moodList.selectedIndex = 0;    // setting selected "Normal" by default in mood-list


audioControls.load(); 

function playAudio() {
  if(audioControls.paused)
    play(songs[currentSong], false);
  else
    pause();
}

function play(source, isNext) {
  if (audioControls.paused) {
    if (isRepeat) {
      currentTime = 0;
    }
    playWrapper.innerHTML = pauseBtn();
    songPic.style["background-image"] = `url(${source.image})`;
    songPicElem.style["background-image"] = `url(${source.wallpaper})`;
    let songName = wordShortner(extractName(source.name),18);
    songNameElem.children[0].textContent = songName;
    songArtistElem.children[0].textContent = source.artist;
    if (audioControls.currentTime < 3 || isNext) {
      audioControls.setAttribute("src", source.name);
      audioControls.load();
      document.getElementsByTagName('title')[0].innerHTML = songName;
      document.querySelector('.global-title').setAttribute('content', source.image);
      currentSongHighlighter();
      previousSong = currentSong;    // for marking the previous song to remove the playing background(Red).
    }
    audioControls.play();
    settotalTimeOfSong(source);
  }
}


function pause() {
  if (!audioControls.paused) {
    audioControls.pause();
    playWrapper.innerHTML = playBtn();
  }
}

audioControls.onwaiting = startLoad;
audioControls.oncanplay = stopLoad;

function startLoad(){
    playWrapper.innerHTML = waitLoaderAnimation();
}

function stopLoad(){
    playWrapper.innerHTML = pauseBtn();
}




/**
 * Extracts name from the location address of the song.
 */
function extractName(location) {
  let songName = location;
  songName = songName.substring(songName.lastIndexOf("/") + 1);
  let dotPosition = songName.lastIndexOf(".");
  return capitalizeString(songName.substring(0, dotPosition));
}

function setSongAttributes(source) {
  songPic.style["background-image"] = `url(${source.image})`;
  songPicElem.style["background-image"] = `url(${source.wallpaper})`;
  let songName = source.name;
  songName = songName.substring(songName.lastIndexOf("/") + 1);
  let dotPosition = songName.lastIndexOf(".");
  songName = songName.substring(0, dotPosition);
  songNameElem.children[0].textContent = songName;
  songArtistElem.children[0].textContent = source.artist;
}

function nextTrack(evt, current = currentSong) {
  pause();
  currentSong = (current + 1) % Object.keys(songs).length;
  play(songs[currentSong], true);
}

function preTrack() {
  pause();
  let noOfSongs = Object.keys(songs).length;
  currentSong = (currentSong - 1) % noOfSongs;
  if (currentSong < 0) currentSong = noOfSongs - 1;
  play(songs[currentSong], true);
}

document.body.onkeydown = (evt) => {
  evt = evt || window.event;
  if (evt.keyCode == 32 && !audioControls.paused) {
    pause();
  } else if (evt.keyCode == 32) {
    playAudio();
  } else if (evt.keyCode == 39) {
    nextTrack(currentSong);
  } else if (evt.keyCode == 37) {
    preTrack();
  }
  else if(evt.keyCode == 176){
    nextTrack(currentSong);
  }
  else if(evt.keyCode == 177){
    preTrack();
  }
  // console.log(evt.keyCode);
};

function changeVolume(evt) {
  let val = evt.target.value;
  val = val / 100;
  audioControls.volume = val;
}

audioControls.addEventListener("timeupdate", () => {
  timeRange.value = parseInt(
    (audioControls.currentTime / audioControls.duration) * 100
  );
  colorSlider(timeRange, timeRange.value);
});

timeRange.addEventListener("change", (evt) => {
  timeRange.value = evt.target.value;
  audioControls.currentTime = parseInt((evt.target.value / 100) * audioControls.duration) || 0;
  colorSlider(timeRange, timeRange.value);
});


volumeRange.oninput = (evt) => {colorSlider(volumeRange, evt.target.value)};

function colorSlider(elem, value) {
  elem.style.background = 'linear-gradient(to right, black 0%, red ' + value + '%, #fff ' + value + '%, white 100%)';
};

window.onload = () => {
  setSongAttributes(songs[currentSong]);
};

audioControls.addEventListener("timeupdate", function () {
  settotalTimeOfSong();
  setcuurentTimeOfSong();
});

function settotalTimeOfSong() {
  if (isNaN(audioControls.duration)) return;
  let finishTime = document.querySelector("#finish-time");
  let totalTime = Math.ceil(audioControls.duration);
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime - minutes * 60;
  let minutesTick = "" + minutes;
  let secondsTick = "" + seconds;
  if (minutes < 10) {
    minutesTick = "0" + minutes;
  }
  if (seconds < 10) {
    secondsTick = "0" + seconds;
  }
  // console.log(audioControls.duration);
  finishTime.textContent = minutesTick + ":" + secondsTick;
}

function setcuurentTimeOfSong() {
  if (isNaN(audioControls.currentTime)) return;
  let startTime = document.querySelector("#start-time");
  let currentTime = Math.floor(audioControls.currentTime);
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime - minutes * 60;
  let minutesTick = "" + minutes;
  let secondsTick = "" + seconds;
  if (minutes < 10) {
    minutesTick = "0" + minutes;
  }
  if (seconds < 10) {
    secondsTick = "0" + seconds;
  }
  startTime.textContent = minutesTick + ":" + secondsTick;
}

document.querySelector(".mute-btn").addEventListener("click", (evt) => {
  if (audioControls.muted) {
    evt.target.style.color = "white";
    audioControls.muted = false;
    return;
  }
  audioControls.muted = true;
  evt.target.style.color = "red";
  // console.log("mute-btn");
});

document.querySelector(".full-vol-btn").addEventListener("click", (evt) => {
  audioControls.volume = 1;
  volumeRange.value = 100;
});

let isShuffled = false;

function shuffleSong() {
  let shuffledarr = [];
  let size = Object.keys(songs).length;
  let shuffleBtn = document.querySelector("#shuffle");
  if (!isShuffled) {
    shuffleBtn.style.color = "#e72c30";
    for (let i = 0; i < size; i++) shuffledarr.push(i);

    for (let i = size - 1; i >= 0; i--) {
      let min = 0;
      let max = size - 1;
      let j = Math.floor(Math.random() * (max - min + 1) + min);
      let temp = shuffledarr[i];
      shuffledarr[i] = shuffledarr[j];
      shuffledarr[j] = temp;
    }

    let tempSongs = {};
    for (let i = 0; i < size; i++) {
      tempSongs[i] = songs[shuffledarr[i]];
    }
    addMusicCells(tempSongs);
    // console.log(tempSongs);
    preOrderSongs = songs;
    songs = tempSongs;
    isShuffled = !isShuffled;
  } else {
    shuffleBtn.style.color = "white";
    songs = preOrderSongs;
    isShuffled = !isShuffled;
    addMusicCells(songs);
  }

  // console.log(arr);
}

function repeatTrack() {
  if (!isRepeat) {
    repeatSongs.classList.add("hidden");
    noRepeatSongs.classList.remove("hidden");
    currentSong--;
    isRepeat = !isRepeat;
  }
}

function noRepeatTrack() {
  if (isRepeat) {
    repeatSongs.classList.remove("hidden");
    noRepeatSongs.classList.add("hidden");
    isRepeat = !isRepeat;
  }
}

function capitalizeString(str) {
  let newstr = "";
  for (let i = 0; i < str.length; i++) {
    if (i == 0 || str.charAt(i - 1) == " ") {
      newstr += str.charAt(i).toUpperCase();
    } else {
      newstr += str.charAt(i).toLowerCase();
    }
  }
  return newstr;
}

function songsList() {
  angleDown.classList.toggle("hidden");
  angleUp.classList.toggle("hidden");
  musicList.classList.toggle("hidden");
}

function playListSong(current) {
  currentSong = current - 1;
  nextTrack(current - 1);
}

function musicCellTemplate(key, image, name, artist) {
  return songElement(key, image, name, artist);
}


function addMusicCells(songs) {
  musicList.innerHTML = "";
  for (const [key, value] of Object.entries(songs)) {
    // currentSong = key;
    musicList.innerHTML += musicCellTemplate(key, value.image, wordShortner(extractName(value.name), 17), wordShortner(value.artist, 35));
  }
}

function currentSongHighlighter(){
  let currentElement = document.querySelector(".music-list").children.item(currentSong);
  let previousElement = document.querySelector(".music-list").children.item(previousSong);

  // previousElement.style.backgroundColor = "rgba(40, 44, 52, 0.4)";
  previousElement.style.backgroundImage = "linear-gradient(to right, rgba(40,44,52,0.4), rgba(40,44,52,0.4))";
  currentElement.style.backgroundImage = "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))";
  // console.log(currentElement);
}

addMusicCells(songs);

function wordShortner(word, length) {
  return word.length < length ? word : word.substr(0,length) + "...";
}


function moodListChanger(evt){
  // console.log("changed....");
  let mood = evt.target.value;
  // console.log(mood);
  currentSong = -1;
  previousSong = 0;
  switch(mood){
      case "happy": songs = HAPPY;
                    addMusicCells(songs);
                    break;
      case "sad": songs = SAD;
                  addMusicCells(songs);
                  break;
      case "high": songs = HIGH;
                   addMusicCells(songs);
                   break;
      case "joyfull": songs = JOYFUL;
                      addMusicCells(songs);
                      break;
      case "sporty": songs = SPORTY;
                      addMusicCells(songs);
                      break;
      case "romantic": songs = ROMANTIC;
                       addMusicCells(songs);
                       break;
      case "aggressive": songs = AGGRESSIVE;
                         addMusicCells(songs);
                         break; 
      case "rap": songs = RAP;
                  addMusicCells(songs);
                  break;  
      default: songs = NORMAL;
               addMusicCells(songs);
               break;         
  }
}


/**
 * Happy
 * Sad 
 * Meditative
 * Depressed
 * High
 * Neutral -> Normal all songs
 * Joyfull
 * Sporty
 * Romantic
 * Aggressive
 */