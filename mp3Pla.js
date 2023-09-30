const songs = [
  {
    isPinned: true,
    img: "./assets/avatar.jpeg",
    artist: "Adnan Dhol",
    name: "Pardes Katenda",
    url: "./songs/pardesh_katenda.mpeg",
  },
  {
    isPinned: false,
    img: "./assets/avatar_2.jpeg",
    artist: "Nufs Band",
    name: "Ji Sassui",
    url: "./songs/sassui.mpeg",
  },
  {
    isPinned: false,
    img: "./assets/avatar_1.jpeg",
    artist: "Nufs Band",
    name: "Sindhu",
    url: "./songs/sindhu.mpeg",
  },
];

class LibrarySongs {
  songs;
  constructor() {
    this.songs = songs;
  }
  getLibrarySongs() {
    const librarySongs = this.songs.map(
      (song) => `<div class="row">
                <div>
                    <img src=${song.img} alt="" />
                    <div>
                        <h5>${song.name}</h5>
                        <p>${song.artist}</p>
                    </div>
                </div>
                ${
                  song.isPinned
                    ? '<i class="ri-pushpin-fill"></i> '
                    : " <div></div>"
                }
                
            </div>
            `
    );
    return librarySongs.join("");
  }

  addSong() {}

  removeSong() {}
}

const cssProperties = {
  primary: "--primary",
  secondary: "--secondary",
  tertiary: "--tertiary",
  accent: "--accent",
  bgGray: "--bg-gray",
  bgGrayDark: "--bg-gray-dark",
  contentPrimary: "--content-primary",
  audioProgress: "--audio-progress",
  volumeProgress: "--volume-progress",
};

class Mp3PLayer {
  root;
  audio;
  playBtn;
  pauseIcon;
  playIcon;
  isPlaying;
  duration;
  durationElem;
  songProgressElem;
  currentTime;
  audioProgress;
  volumeProgress;
  isAudioProgressSelected;
  librarySongs;
  librarySongsElem;
  constructor() {
    this.isAudioProgressSelected = false;
    this.root = document.documentElement;
    this.playing = false;
    this.pauseIcon = "ri-pause-line";
    this.playIcon = "ri-play-fill";

    // <-------- element selectors ------------->
    this.audio = document.querySelector("audio");
    this.librarySongsElem = document.querySelector(".library-songs");
    this.playBtn = document.querySelector("#play-btn");
    this.audioProgress = document.querySelector(".audio-progress");
    this.volumeProgress = document.querySelector(".volume-progress");
    this.durationElem = document.querySelector(".duration");
    this.songProgressElem = document.querySelector(".song-progress");
    // <-------- bind methods ------------->
    this.onPlayButtonHandler = this.onPlayButtonHandler.bind(this);
    this.onAudioTimeUpdateHandler = this.onAudioTimeUpdateHandler.bind(this);
    this.play = this.play.bind(this);
    this.setAudioProgress = this.setAudioProgress.bind(this);
    this.onAudioProgressChangeHandler =
      this.onAudioProgressChangeHandler.bind(this);
    this.onVolumeChangeHandler = this.onVolumeChangeHandler.bind(this);
    this.setPlayIcon = this.setPlayIcon.bind(this);
    this.setStopIon = this.setStopIon.bind(this);
    this.getLibrarySongs = this.getLibrarySongs.bind(this);
    // <-------- event listener ------------->
    this.playBtn.addEventListener("click", this.onPlayButtonHandler);
    this.audio.addEventListener("timeupdate", this.onAudioTimeUpdateHandler);
    this.audioProgress.addEventListener(
      "change",
      this.onAudioProgressChangeHandler
    );
    this.volumeProgress.addEventListener("change", this.onVolumeChangeHandler);
    this.duration = this.audio.duration;
    this.currentTime = this.audio.currentTime;
    this.root.style.setProperty(cssProperties.audioProgress, this.currentTime);

    // this.audio.currentTime = 60
    // console.log(this.audio.currentTime)
    const librarySongs = new LibrarySongs();
    this.librarySongs = librarySongs;

    // this.nextBtn.addEventListener("click", this.onNextClickHandler);
    // this.previousBtn.addEventListener("click", this.onPreviousClickHandler);

    this.getLibrarySongs();
  }

  getLibrarySongs() {
    this.librarySongsElem.innerHTML = this.librarySongs.getLibrarySongs();
  }

  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
      .filter((a) => a)
      .join(":");
  }

  setPlayIcon() {
    const playClassList = this.playBtn.children[0].classList;
    playClassList.remove(this.playIcon);
    playClassList.add(this.pauseIcon);
  }

  setStopIon() {
    const playClassList = this.playBtn.children[0].classList;
    playClassList.remove(this.pauseIcon);
    playClassList.add(this.playIcon);
  }

  play() {
    this.setPlayIcon();
    this.audio.play();
    console.log(this.audio.duration);
    this.isPlaying = true;
    this.duration = this.audio.duration;
    this.durationElem.innerHTML = this.formatTime(this.audio.duration);
  }

  pause() {
    this.setStopIon();
    this.audio.pause();
    this.isPlaying = false;
  }

  onNextClickHandler() {
    const currentSongIndex =
      (this.currentSongIndex + 1) % this.songCollections.length;
    const currentSong = this.songCollections[currentSongIndex];
    this.currentSongIndex = currentSongIndex;
    this.songImg.src = currentSong.img;
    this.songName.textContent = currentSong.songName;
    this.songArtist.textContent = currentSong.artist;

    this.audioElem.setAttribute("src", currentSong.src);
    this.audioElem.load();
    this.audioElem.play();
  }

  onPreviousClickHandler() {
    this.currentSongIndex = this.currentSongIndex - 1;
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = this.songCollections.length - 1;
    }
    this.songImg.src = this.songCollections[currentSongIndex].img;
    this.songName.textContent = this.songCollections[currentSongIndex].songName;
    this.songArtist.textContent = this.songCollections[currentSongIndex].artist;
    this.audioElem.setAttribute(
      "src",
      this.songsCollection[this.currentSongIndex % this.songCollections.length]
    );
    this.audioElem.load();
    this.audioElem.play();
  }

  onAudioTimeUpdateHandler(track) {
    const progressPercent = parseInt(
      (track.target.currentTime / this.duration) * 100
    );
    this.setAudioProgress(progressPercent);
    // this.root.style.setProperty(cssProperties.audioProgress, `${progressPercent}%`)
    this.audioProgress.value = progressPercent;
    this.songProgressElem.innerHTML = this.formatTime(track.target.currentTime);

    if (track.target.currentTime === this.duration) {
      this.setStopIon();
      this.setAudioProgress(0);
      this.audioProgress.value = 0;
      this.songProgressElem.innerHTML = this.formatTime(0);
    }
  }

  setAudioProgress(timer) {
    this.root.style.setProperty(cssProperties.audioProgress, `${timer}%`);
  }

  onAudioProgressChangeHandler(event) {
    const currentTime = event.target.value;
    let audioTrackTime = (currentTime / 100) * this.duration;
    this.audio.currentTime = audioTrackTime;
    this.root.style.setProperty(
      cssProperties.audioProgress,
      `${audioTrackTime}%`
    );
  }

  onVolumeChangeHandler(e) {
    const _volume = e.target.value;
    this.audio.volume = _volume / 100;
    this.root.style.setProperty(cssProperties.volumeProgress, `${_volume}%`);
  }
  async onPlayButtonHandler() {
    !this.isPlaying ? this.play() : this.pause();
  }
}

const mp3Player = new Mp3PLayer();

// mp3Player.getLibrarySongs();
