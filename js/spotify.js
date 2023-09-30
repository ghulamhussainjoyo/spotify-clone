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

class Player {
  root;
  playBtn;
  audioElem;
  songCurrentTimeElem;
  songDurationElem;
  audioProgressRangeElem;
  songImg;
  songName;
  songArtist;
  previousBtn;
  nextBtn;
  navLink;
  mainElm;
  songsLibraryELem;
  volumeProgressElem;

  constructor() {
    this.duration = 0;
    this.playIconClassName;
    this.currentSongIndex = 0;
    this.playIconClassName = "ri-play-fill";
    this.pauseIconClassName = "ri-pause-line";
    this.isPlaying = false;

    this.root = document.documentElement;
    this.playBtn = document.querySelector("#play-btn");
    this.audioElem = document.querySelector("#audio-elem");
    this.songCurrentTimeElem = document.querySelector(".song-current-time");
    this.songDurationElem = document.querySelector(".duration");
    this.audioProgressRangeElem = document.querySelector(".audio-progress");
    this.songImg = document.querySelector("#songImg");
    this.songName = document.querySelector("#songName");
    this.songArtist = document.querySelector("#songArtist");
    this.previousBtn = document.querySelector("#previous");
    this.nextBtn = document.querySelector("#next");
    this.navLink = document.querySelectorAll(".navLink");
    this.mainElm = document.querySelector("#main");
    this.songsLibraryELem = document.querySelector("#songLibrary");
    this.librarySongsElem = document.querySelector(".library-songs");
    this.volumeProgressElem = document.querySelector(".volume-progress");

    this.onSongClick = this.onSongClick.bind(this);
  }

  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
      .filter((a) => a)
      .join(":");
  }

  onSongClick(songIndex) {
    alert(songIndex);
  }
}

export default Player;

class LibrarySongs extends Player {
  songs;
  constructor() {
    super();
    this.setSongs = this.setSongs.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.getLibrarySongs = this.getLibrarySongs.bind(this);
  }
  setSongs(songs) {
    this.songs = songs;
  }
  getSongs() {
    return this.songs;
  }
  getLibrarySongs() {
    if (this.songs) {
      const librarySongs = this.songs.map(
        (song) =>
          `<div class="row">
        <div>
          <img src="${song.img}" alt="" />
          <div>
            <h5 id="songName">${song.songName}</h5>
            <p id="artistName">${song.artist}</p>
          </div>
        </div>
        ${song.isPinned ? '<i class="ri-pushpin-fill"></i> ' : " <div></div>"}
      </div>
    `
      );

      return librarySongs.join("");
    } else {
      return "";
    }
  }
}

class Home {
  constructor() {}
}

class Trends {
  constructor() {}

  title() {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.className = "title singer";
    const compiledFor = document.createElement("span");
    compiledFor.textContent = "Compiled for";
    const hitsOfTheWeek = document.createElement("span");
    hitsOfTheWeek.textContent = " Ghulam Hussain";
    p.appendChild(compiledFor);
    p.appendChild(hitsOfTheWeek);
    div.appendChild(p);
    return div.innerHTML;
  }

  trends() {
    const trends = `
        <div class="trending">
        ${this.title()}
        ${this.userPlayList()}
        ${this.title()}
        ${this.userPlayList()}
        ${this.title()}
        ${this.userPlayList()}
        </div>
    `;

    return trends;
  }

  userPlayListItem() {
    const item = `
      <div>
        <i class="ri-heart-fill heart"></i>
        <img src="./assets/avatar_1.jpeg" alt="" />
        <h4>Daily Mix 1</h4>
        <p>Lorem ipsum dolor, sit amet co</p>
      </div>`;
    return item;
  }
  userPlayList() {
    const userPlayerList = ` <div class="user-playlist">
    ${this.userPlayListItem()}
    ${this.userPlayListItem()}
    ${this.userPlayListItem()}
    ${this.userPlayListItem()}
    </div>`;
    return userPlayerList;
  }
}

class Search {
  constructor() {}

  render(songs) {
    const search = `
    <div class="search">
                <div class="search-results">
                    <section class="">
                       ${this.title()}
                        <div class="search-result-container">
                         ${songs
                           .map(({ img, songName, artist }) =>
                             this.resultCard(img, songName, artist)
                           )
                           .join("")}
                        </div>
                    </section>
                  ${this.searchTopResult()}
                </div>
                <div class="artist">

                   ${this.title()}
                    <div class="artist-card-container">
                    ${this.artistCard()}
                    ${this.artistCard()}
                    ${this.artistCard()}
                    ${this.artistCard()}
                    ${this.artistCard()}
                    ${this.artistCard()}
                    </div>
                </div>
            </div>
    `;

    return search;
  }
  title() {
    return `<p class="title">Search Result</p>`;
  }

  resultCard(img, songName, artist) {
    const resultCard = `
        <div class="result-card">
          <div>
              <img src="${img}" alt="">
              <h4 id="songName">${songName}</h4>
          </div>
          <p>${artist}</p>
          <p>1.1B Plays</p>
          <p>2:36</p>
      </div>
    `;

    return resultCard;
  }

  searchTopResult() {
    const songStat = `
        <div class="song-stats">
            <p>1.1B Plays</p>
            <p>2:36</p>
        </div>`;

    const tags = ` 
      <div class="song-tags">
          <div>
              <span>song</span>
          </div>
          <div>
              <span>pop</span>
          </div>
      </div>`;

    const searchTopResult = `
              <section class="search-top-result">
                ${this.title()}
                  <div class="top-result-card">
                      <img src="./assets/avatar.jpeg" alt="">
                      <h4>Old Town Road</h4>
                      <p>Lil Nas X</p>
                    ${songStat}
                    ${tags}
                  </div>
              </section>`;
    return searchTopResult;
  }

  artistCard() {
    const artistCard = `
    <div class="artist-card">
        <img src="./assets/avatar.jpeg" alt="">
        <h4 class="artist-name">Lil Nas X</h4>
        <div class="artist-tag">
            <span>artist</span>
        </div>
    </div>
    `;
    return artistCard;
  }
}
class Spotify extends Player {
  // classes ------->
  librarySongs;
  trendComponent;
  searchComponent;

  constructor() {
    super();
    //------------------------ bind
    this.onPlayBtnClickHandler = this.onPlayBtnClickHandler.bind(this);
    this.onNextClickHandler = this.onNextClickHandler.bind(this);
    this.onPreviousClickHandler = this.onPreviousClickHandler.bind(this);
    this.onLoadData = this.onLoadData.bind(this);

    this.onAudioProgressChangeHandler =
      this.onAudioProgressChangeHandler.bind(this);
    this.onAudioTimeUpdateHandler = this.onAudioTimeUpdateHandler.bind(this);
    this.onVolumeChangeHandler = this.onVolumeChangeHandler.bind(this);

    this.menu = this.menu.bind(this);
    this.getLibrarySongs = this.getLibrarySongs.bind(this);
    this.fetchSongs = this.fetchSongs.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
    this.setPlayIcon = this.setPlayIcon.bind(this);
    this.setStopIon = this.setStopIon.bind(this);
    this.playSong = this.playSong.bind(this);

    //------------------------ addEventListener
    this.playBtn.addEventListener("click", this.onPlayBtnClickHandler);
    this.nextBtn.addEventListener("click", this.onNextClickHandler);
    this.previousBtn.addEventListener("click", this.onPreviousClickHandler);
    this.audioElem.addEventListener("loadeddata", this.onLoadData);
    this.audioElem.addEventListener(
      "timeupdate",
      this.onAudioTimeUpdateHandler
    );
    this.audioProgressRangeElem.addEventListener(
      "change",
      this.onAudioProgressChangeHandler
    );
    this.volumeProgressElem.addEventListener(
      "change",
      this.onVolumeChangeHandler
    );

    //------------------------ classes
    const librarySongs = new LibrarySongs();
    this.librarySongs = librarySongs;
    const trendComponent = new Trends();
    this.trendComponent = trendComponent;
    const searchComponent = new Search();
    this.searchComponent = searchComponent;

    //------------------------- methods
    this.menu();
    this.onWindowLoad();
    this.fetchSongs().then((data) => {
      this.songCollections = data;
      this.librarySongs.setSongs(data);
      this.getLibrarySongs();
    });
  }

  async fetchSongs() {
    const data = await fetch("./assets/data/data.json").then((res) =>
      res.json()
    );
    return data;
  }

  renderSearchComponent(songs) {
    this.mainElm.innerHTML = this.searchComponent.render(songs);
    this.addChildEventListeners(
      this.mainElm.querySelector(".search-result-container").children
    );
  }

  menu() {
    for (let i = 0; i < this.navLink.length; i++) {
      const navElem = this.navLink[i];
      navElem.addEventListener("click", () => {
        switch (i) {
          case 0:
            this.navLink[0].classList.add("active");
            this.navLink[1].classList.remove("active");
            this.navLink[2].classList.remove("active");
            // this.mainElm.innerHTML = mainComponent();
            break;

          case 1:
            this.navLink[0].classList.remove("active");
            this.navLink[1].classList.add("active");
            this.navLink[2].classList.remove("active");
            this.mainElm.innerHTML = this.trendComponent.trends();
            break;
          // this.mainElm.innerHTML = trendComponent();

          case 2:
            this.navLink[0].classList.remove("active");
            this.navLink[1].classList.remove("active");
            this.navLink[2].classList.add("active");
            this.renderSearchComponent(this.songCollections);
            break;
        }
      });
    }
  }

  onWindowLoad() {
    window.addEventListener("load", async (wind) => {
      const songs = await this.fetchSongs();
      const doc = wind.currentTarget.document;
      const audioElm = doc.querySelector("#audio-elem");
      const songImg = doc.querySelector("#songImg");
      const songName = doc.querySelector("#songName");
      const songArtist = doc.querySelector("#songArtist");
      // const songsLibraryELem = doc.querySelector("#songLibrary");

      songImg.src = songs[this.currentSongIndex].img;
      songName.textContent = songs[this.currentSongIndex].songName;
      songArtist.textContent = songs[this.currentSongIndex].artist;
      audioElm.setAttribute("src", songs[this.currentSongIndex].src);
    });
  }

  addChildEventListeners(children) {
    for (let i = 0; i < children.length; i++) {
      const songName = children[i].querySelector("#songName").innerText;

      console.log(songName);
      const songIndex = this.songCollections.findIndex(
        (song) => song.songName.toLowerCase() === songName.toLowerCase()
      );

      children[i].addEventListener("click", () => {
        this.playSong(songIndex);
      });
    }
  }

  getLibrarySongs() {
    this.librarySongsElem.innerHTML = this.librarySongs.getLibrarySongs();
    this.addChildEventListeners(this.librarySongsElem.children);
  }

  playSong(index) {
    this.songImg.src = this.songCollections[index].img;
    this.songName.textContent = this.songCollections[index].songName;
    this.songArtist.textContent = this.songCollections[index].artist;
    this.audioElem.setAttribute("src", this.songCollections[index].src);
    this.audioElem.load();
    this.setPlayIcon();
    this.isPlaying = true;
    this.audioElem.play();
  }

  onLoadData() {
    this.duration = this.audioElem.duration;
  }

  setPlayIcon() {
    this.playBtn.children[0].classList.remove(this.playIconClassName);
    this.playBtn.children[0].classList.add(this.pauseIconClassName);
  }

  setStopIon() {
    this.playBtn.children[0].classList.remove(this.pauseIconClassName);
    this.playBtn.children[0].classList.add(this.playIconClassName);
  }

  onPlayBtnClickHandler() {
    this.songDurationElem.textContent = this.formatTime(this.duration);
    if (this.isPlaying) {
      this.setStopIon();
      this.audioElem.pause();
      this.isPlaying = false;
    } else {
      this.setPlayIcon();
      this.audioElem.play();
      this.isPlaying = true;
    }
  }

  async onPreviousClickHandler() {
    this.currentSongIndex = this.currentSongIndex - 1;
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = this.songCollections.length - 1;
    }
    this.songImg.src = this.songCollections[this.currentSongIndex].img;
    this.songName.textContent =
      this.songCollections[this.currentSongIndex].songName;
    this.songArtist.textContent =
      this.songCollections[this.currentSongIndex].artist;
    this.audioElem.setAttribute(
      "src",
      this.songCollections[this.currentSongIndex % this.songCollections.length]
        .src
    );
    this.setPlayIcon();
    this.isPlaying = true;
    await this.audioElem.load();
    this.audioElem.play();
  }

  onAudioTimeUpdateHandler(track) {
    const progressPercent = parseInt(
      (track.target.currentTime / this.duration) * 100
    );
    this.setAudioProgress(progressPercent);
    // this.root.style.setProperty(cssProperties.audioProgress, `${progressPercent}%`)
    this.audioProgressRangeElem.value = progressPercent;
    this.songCurrentTimeElem.innerHTML = this.formatTime(
      track.target.currentTime
    );

    if (track.target.currentTime === this.duration) {
      console.log("track.target.currentTime");
      this.setStopIon();
      this.setAudioProgress(0);
      this.audioProgressRangeElem.value = 0;
      this.songCurrentTimeElem.innerHTML = this.formatTime(0);
    }
  }

  setAudioProgress(time) {
    this.root.style.setProperty(cssProperties.audioProgress, `${time}%`);
  }

  onAudioProgressChangeHandler(event) {
    const currentTime = event.target.value;
    let audioTrackTime = (currentTime / 100) * this.duration;
    this.audioElem.currentTime = audioTrackTime;
    this.root.style.setProperty(
      cssProperties.audioProgress,
      `${audioTrackTime}%`
    );
  }

  onVolumeChangeHandler(e) {
    const _volume = e.target.value;
    this.audioElem.volume = _volume / 100;
    this.root.style.setProperty(cssProperties.volumeProgress, `${_volume}%`);
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
    this.setPlayIcon();
    this.isPlaying = true;
    this.audioElem.load();
    this.audioElem.play();
  }

  setAudioProgress(time) {
    this.root.style.setProperty(cssProperties.audioProgress, `${time}%`);
  }

  async onPlayButtonHandler() {
    !this.isPlaying ? this.play() : this.pause();
  }
}

new Spotify();
