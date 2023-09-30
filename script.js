const songCollections = [
  {
    img: "./songs/pardes_katenda.jpeg",
    songName: "pardes katenda",
    artist: "Adnan Dhol",
    src: "./songs/pardesh_katenda.mpeg",
  },
  {
    img: "./songs/sassui.jpeg",
    songName: "Sassui",
    artist: "nafs band",
    src: "./songs/sassui.mpeg",
  },
  {
    img: "./songs/sindhu.jpeg",
    songName: "sindhu",
    artist: "nafs band",
    src: "./songs/sindhu.mpeg",
  },
];

let currentTime = 0;
let duration = 0;
let currentSongIndex = 0;

window.addEventListener("load", (wind) => {
  const doc = wind.currentTarget.document;
  const audioElm = doc.querySelector("#audio-elem");
  const songImg = doc.querySelector("#songImg");
  const songName = doc.querySelector("#songName");
  const songArtist = doc.querySelector("#songArtist");
  // const songsLibraryELem = doc.querySelector("#songLibrary");

  songImg.src = songCollections[currentSongIndex].img;
  songName.textContent = songCollections[currentSongIndex].songName;
  songArtist.textContent = songCollections[currentSongIndex].artist;
  audioElm.setAttribute("src", songCollections[currentSongIndex].src);
});

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
    .filter((a) => a)
    .join(":");
}

//---------- Variables ---------------->
const playIconClassName = "ri-play-fill";
const pauseIconClassName = "ri-pause-line";
let isPlaying = false;

//---------- Elements ---------------->
const root = document.documentElement;
const playBtn = document.querySelector("#play-btn");
const audioElem = document.querySelector("#audio-elem");
const songCurrentTimeElem = document.querySelector(".song-current-time");
const songDurationElem = document.querySelector(".duration");
const audioProgressRangeElem = document.querySelector(".audio-progress");
const songImg = document.querySelector("#songImg");
const songName = document.querySelector("#songName");
const songArtist = document.querySelector("#songArtist");
const previousBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const navLink = document.querySelectorAll(".navLink");
const mainElm = document.querySelector("#main");
const songsLibraryELem = document.querySelector("#songLibrary");

songsLibraryELem.innerHTML = librarySongCards(songCollections);

for (let i = 0; i < songsLibraryELem.children.length; i++) {
  const songName =
    songsLibraryELem.children[i].querySelector("#songName").innerText;

  console.log(songName);
  const songIndex = songCollections.findIndex(
    (song) => song.songName.toLowerCase() === songName.toLowerCase()
  );

  songsLibraryELem.children[i].addEventListener("click", () => {
    playSong(songIndex);
  });
}

// Main

for (let i = 0; i < navLink.length; i++) {
  const navElem = navLink[i];
  navElem.addEventListener("click", () => {
    switch (i) {
      case 0:
        navLink[0].classList.add("active");
        navLink[1].classList.remove("active");
        navLink[2].classList.remove("active");
        mainElm.innerHTML = mainComponent();

        break;

      case 1:
        navLink[0].classList.remove("active");
        navLink[1].classList.add("active");
        navLink[2].classList.remove("active");
        mainElm.innerHTML = trendComponent();

        break;
      case 2:
        navLink[0].classList.remove("active");
        navLink[1].classList.remove("active");
        navLink[2].classList.add("active");
        mainElm.innerHTML = searchComponent();
        break;
    }
  });
}

//----------- Event Listeners ---------------->
audioElem.addEventListener("loadeddata", () => {
  duration = audioElem.duration;
});

audioElem.addEventListener("timeupdate", function (track) {
  const _currentTime = track.currentTarget.currentTime;
  currentTime = _currentTime;
  songCurrentTimeElem.textContent = formatTime(_currentTime);
  const currentTimePercentage = (_currentTime / duration) * 100;
  root.style.setProperty("--audio-progress", `${currentTimePercentage}%`);
  audioProgressRangeElem.value = currentTimePercentage;
});

function onPlayBtnClickHandler() {
  songDurationElem.textContent = formatTime(duration);

  if (isPlaying) {
    playBtn.children[0].classList.remove(pauseIconClassName);
    playBtn.children[0].classList.add(playIconClassName);
    audioElem.pause();
    isPlaying = false;
  } else {
    playBtn.children[0].classList.remove(playIconClassName);
    playBtn.children[0].classList.add(pauseIconClassName);
    audioElem.play();
    // console.log(formatTime(audioElem.duration));
    isPlaying = true;
  }
}

playBtn.addEventListener("click", onPlayBtnClickHandler);

audioProgressRangeElem.addEventListener("change", (value) => {
  const currentSongTime = value.target.value;
  audioElem.currentTime = (currentSongTime / 100) * duration;
});

nextBtn.addEventListener("click", () => {
  // alert("next pressed")
  currentSongIndex = currentSongIndex + 1;
  songImg.src = songCollections[currentSongIndex % songCollection.length].img;
  songName.textContent =
    songCollections[currentSongIndex % songCollection.length].songName;
  songArtist.textContent =
    songCollections[currentSongIndex % songCollection.length].artist;
  audioElem.setAttribute(
    "src",
    songCollection[currentSongIndex % songCollection.length]
  );
  audioElem.play();
});
previousBtn.addEventListener("click", () => {
  currentSongIndex = currentSongIndex - 1;
  if (currentSongIndex < 0) {
    currentSongIndex = songCollection.length - 1;
  }
  songImg.src = songCollections[currentSongIndex].img;
  songName.textContent = songCollections[currentSongIndex].songName;
  songArtist.textContent = songCollections[currentSongIndex].artist;
  audioElem.setAttribute(
    "src",
    songsCollection[currentSongIndex % songCollection.length]
  );
  audioElem.play();
});

function trendComponent() {
  const hitsOfWeek = `
              <p class="title greeting">
                    <span>Hits</span>
                    <span> of the weeks</span>
                </p>`;

  const hitsOfMonth = `
              <p class="title greeting">
                <span>Hits</span>
                <span> of month</span>
              </p>
            `;
  const userPlaylistCard = `
                <div>
                      <img src="./assets/avatar_1.jpeg" alt="" />
                      <h4>Daily Mix 1</h4>
                      <p>Lorem ipsum dolor, sit</p>
                </div>
                    `;
  const userPlayList = `
            <div class="user-playlist">
            ${userPlaylistCard}
            ${userPlaylistCard}
            ${userPlaylistCard}
            </div>`;

  const result = `
                ${hitsOfWeek}
                ${userPlayList}
                ${hitsOfMonth}
                ${userPlayList}
                ${hitsOfMonth}
                ${userPlayList}
                `;

  return result;
}

function mainComponent() {
  const greeting = `  <p class="title greeting">Good Evening</p>`;
  const favouriteSong = ` <section class="frequently-song">
        <div>
            <img src="./assets/avatar.jpeg" alt="" />
            <div class="song-details">
                <div>
                    <h5>Tulle Matta</h5>
                    <p>Sherya Ghosal</p>
                </div>
                <p>
                    <span>+</span>
                    <span>364 songs</span>
                </p>
            </div>
        </div>

        <!-- reaction  -->
        <div class="reactions">
            <h5>241 Likes</h5>

            <div class="avatars">
                <img src="./assets/avatar.jpeg" alt="" />
                <img src="./assets/avatar_1.jpeg" alt="" />
                <img src="./assets/avatar_2.jpeg" alt="" />
                <img src="./assets/avatar_3.jpeg" alt="" />
                <img src="./assets/avatar.jpeg" alt="" />
                <p>
                    <span>+</span>
                    <span>236</span>
                </p>
            </div>
        </div>
      </section>`;

  const favouriteSongs = `<div class=" frequently-songs">
            ${favouriteSong}
            ${favouriteSong}
              </div>`;

  const title = ` <p class="title singer">
                    <span> Compiled for </span>
                    <span> Ghulam Hussain </span>
                  </p>
                  `;

  const playListCard = ` <div>
                          <img src="./assets/avatar_1.jpeg" alt="" />
                          <h4>Daily Mix 1</h4>
                          <p>Lorem ipsum dolor, sit amet co</p>
                        </div>`;

  const userPlayList = `<div class="user-playlist">
                          ${playListCard}
                          ${playListCard}
                          ${playListCard}
                          ${playListCard}
                          </div>`;

  const result = `${greeting}
                    ${favouriteSongs}
                    ${title}
                    ${userPlayList}
                    ${title}
                    ${userPlayList}
    `;

  return result;
}

function searchComponent() {
  const resultCard = `
            <div class="result-card">
            <div>
                <img src="./assets/avatar.jpeg" alt="">
                <h4>Old Town Road</h4>
            </div>
            <p>Lil Nas X</p>
            <p>1.1B Plays</p>
            <p>2:36</p>
          </div>
            `;

  const artistCard = `<div class="artist-card">
            <img src="./assets/avatar.jpeg" alt="">
            <h4 class="artist-name">Lil Nas X</h4>

            <div class="artist-tag">
                <span>artist</span>
            </div>
          </div>`;

  const topResultCard = `  <div class="top-result-card">
  <img src="./assets/avatar.jpeg" alt="">
  <h4>Old Town Road</h4>
  <p>Lil Nas X</p>
  <div class="song-stats">
      <p>1.1B Plays</p>
      <p>2:36</p>
  </div>
  <div class="song-tags">
      <div>
          <span>song</span>
      </div>
      <div>
          <span>pop</span>
      </div>

  </div>
</div>`;

  const result = `<div class="search-results">
                <section>
                    <p class="title">Search Result</p>
                    <div class="search-result-container">
                
                      ${resultCard}
                      ${resultCard}
                      ${resultCard}
                      
                    </div>
                </section>
                <section class="search-top-result">
                    <p class="title">top result</p>
                  ${topResultCard}
                </section>
              </div>

              <div class="artist">

                <p class="title">Artist</p>
                <div class="artist-card-container">
                
              ${artistCard}
              ${artistCard}
              ${artistCard}
              ${artistCard}
              ${artistCard}
                </div>
              </div>
              `;

  return result;
}

function playSong(index) {
  // console.log(songCollections[index].img);
  songImg.src = songCollections[index].img;
  songName.textContent = songCollections[index].songName;
  songArtist.textContent = songCollections[index].artist;
  audioElem.setAttribute("src", songCollections[index].src);
  audioElem.load();
  playBtn.children[0].classList.remove(playIconClassName);
  playBtn.children[0].classList.add(pauseIconClassName);
  isPlaying = true;
  audioElem.play();
}

function librarySongCards(arr) {
  let result = "";

  for (let i = 0; i < arr.length; i++) {
    result += `<div data-${i} class="row">
              <div>
                  <img src=${arr[i].img} alt="" />
                    <div>
                            <h5 id="songName">${arr[i].songName}</h5>
                            <p>${arr[i].artist}</p>
                        </div>
                    </div>
                  </div>`;
  }

  return result;
}
