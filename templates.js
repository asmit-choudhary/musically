/**
 * @returns template of play button
 */
const playBtn = function() {
    return `<i class="fa fa-play-circle fa-3x" id="play-btn"></i>`;
}


/**
 * @returns template of pause button
 */
const pauseBtn = function() {
    return `<i class="fa fa-pause-circle fa-3x" id="pause-btn"></i>`;
}


/**
 * @returns template of loader animation
 */
const waitLoaderAnimation = function() {
    return `<div class="progress circular"></div>`;
}


/**
 * @returns template of song element in songs list
 */
const songElement = function(key, image, name, artist){
    return `<div class="music-item" onclick = "playListSong(${key})">
                <div class="items">
                <img
                    class="song-image"
                    src= ${image}
                    loading = "lazy"
                />
                </div>
                <div class="contant">
                <div class="items"><h5>${name}</h5></div>
                <div class="items"  style="color: #ddd; font-size:0.7em;">${artist}</div>
                </div>
            </div>`;
}