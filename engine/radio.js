/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const medioRadio = {
  currentTrack: 0,

  init: async () => {
    document.body.insertAdjacentHTML('beforeend', medioRadioUI.builder)
    medioRadio.dj.check()

    document.getElementById('medio-radio-deploy').addEventListener('click', async () => {
      const genres = document.getElementById('medio-radio-genres').value
      const length = document.getElementById('medio-radio-length').value
      const onlynew = document.getElementById('medio-radio-only-new').value
      const djvoice = document.getElementById('medio-radio-dj-voice').value
      const djpersonality = document.getElementById('medio-radio-dj-personality').value
      medioRadio.build({
        genres,
        length,
        onlynew,
        djvoice,
        djpersonality,
      })
    })
  },

  build: async data => {
    document.getElementById('medio-radio').innerHTML = medioRadioUI.building
    setTimeout(async () => {
      const current = await chrome.storage.local.get('medioRadio')

      if (current.medioRadio.length > 0) {
        medioRadio.start(current, data)
      } else {
        chrome.storage.local.set({ medioRadio: [] })
        medioRadio.search(data)
      }
    }, 0)
  },

  start: (current, data) => {
    document.getElementById('medio-radio').innerHTML = medioRadioUI.player
    document.getElementById('medio-radio').setAttribute('data-id', current.medioRadio[0].id)
    document.querySelector('.track-cover img').src = current.medioRadio[0].image_path
    document.querySelector('.medio-radio-title').textContent = current.medioRadio[0].title
    document.querySelector(
      '.medio-radio-title'
    ).href = `https://www.udio.com/songs/${current.medioRadio[0].id}`
    document.querySelector('.medio-radio-artist').textContent = 'by ' + current.medioRadio[0].artist
    document.querySelector(
      '.medio-radio-artist'
    ).href = `https://www.udio.com/creators/${current.medioRadio[0].artist}`

    const playButton = document.querySelector('.medio-radio-play')
    const pauseButton = document.querySelector('.medio-radio-pause')
    const nextButton = document.querySelector('.medio-radio-next')
    const medioRadioWrapper = document.querySelector('#medio-radio')
    const audio = document.getElementById('medio-radio-audio')

    document.querySelector('.medio-radio-broadcast').textContent = `Track 1 of ${current.medioRadio.length}`

    medioRadio.currentTrack = 0
    audio.src = current.medioRadio[0].song_path + '?t=' + new Date().getTime()

    medioRadio.dj.play()

    playButton.addEventListener('click', () => {
      audio.play()
      medioRadioWrapper.classList.add('playing')
      playButton.style.display = 'none'
      pauseButton.style.display = 'block'
    })

    pauseButton.addEventListener('click', () => {
      audio.pause()
      medioRadioWrapper.classList.remove('playing')
      playButton.style.display = 'block'
      pauseButton.style.display = 'none'
    })

    nextButton.addEventListener('click', async () => {
      medioRadio.nextTrack()
    })

    audio.addEventListener('timeupdate', () => {
      const progress = document.querySelector('.audio-radio-bar')
      const indicator = document.querySelector('.medio-radio-indicator')

      const percent = (audio.currentTime / audio.duration) * 100
      progress.style.width = percent + '%'

      const current = Math.floor(audio.currentTime)
      let minutes = Math.floor(current / 60)
      let seconds = current - minutes * 60

      if (seconds < 10) seconds = '0' + seconds
      if (minutes < 10) minutes = '0' + minutes

      const duration = Math.floor(audio.duration)
      let durationMinutes = Math.floor(duration / 60)
      let durationSeconds = duration - durationMinutes * 60

      if (durationSeconds < 10) durationSeconds = '0' + durationSeconds
      if (durationMinutes < 10) durationMinutes = '0' + durationMinutes

      if (audio.duration)
        indicator.textContent = `${minutes}:${seconds} / ${durationMinutes}:${durationSeconds}`

      if (audio.currentTime === audio.duration) {
        medioRadio.nextTrack(true)
        medioRadio.dj.play()
      }
    })
  },

  nextTrack: async (paused = false) => {
    const audio = document.getElementById('medio-radio-audio')
    audio.pause()

    const current = await chrome.storage.local.get('medioRadio')
    let id = document.getElementById('medio-radio').getAttribute('data-id')
    let currentIndex = current.medioRadio.findIndex(track => track.id === id)

    if (!id) {
      id = current.medioRadio[0].id
      currentIndex = 0
    }

    let next =
      currentIndex !== -1 && currentIndex < current.medioRadio.length - 1
        ? current.medioRadio[currentIndex + 1]
        : null

    if (!medioRadio.currentTrack) {
      next = current.medioRadio[1]
      medioRadio.currentTrack = 1
    }

    if (next && medioRadio.currentTrack < current.medioRadio.length) {
      medioRadio.currentTrack++
      medioRadio.hasListened(id)
      console.log(next)
      document.querySelector('.track-cover img').src = next.image_path
      document.querySelector('.medio-radio-title').textContent = next.title
      document.querySelector('.medio-radio-artist').textContent = 'by ' + next.artist
      document.querySelector('.medio-radio-artist').href = `https://www.udio.com/creators/${next.artist}`
      document.querySelector('.medio-radio-title').href = `https://www.udio.com/songs/${next.id}`

      audio.src = next.song_path + '?t=' + new Date().getTime()
      audio.load()

      if (!paused) audio.play()

      audio.addEventListener('stalled', function () {
        console.log('radio has stalled')
      })

      playButton.style.display = 'none'
      pauseButton.style.display = 'block'

      document.querySelector('.medio-radio-broadcast').textContent = `Track ${currentIndex + 2} of ${
        current.medioRadio.length
      }`
    } else {
      document.querySelector('#medio-radio').outerHTML = medioRadioUI.builder
      medioRadio.dj.check()
    }
  },

  search: async data => {
    const genres = data.genres.split(',')

    for (const genre of genres) {
      await fetch(`https://www.udio.com/api/songs/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery: {
            sort: 'cache_trending_score',
            searchTerm: genre,
          },
          pageParam: 0,
          pageSize: data.length || 30,
        }),
      })
        .then(response => response.json())
        .then(tracks => {
          medioRadio.processTracks(tracks.data)
        })

      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    medioRadio.trimTrackList(genres, data.length)
    document.getElementById('medio-radio').innerHTML = medioRadioUI.player
  },

  processTracks: async tracks => {
    const current = await chrome.storage.local.get('medioRadio')
    for (const track of tracks) {
      current.medioRadio.push(track)
    }
    await chrome.storage.local.set({ medioRadio: current.medioRadio })
  },

  trimTrackList: async (genres, length) => {
    const current = await chrome.storage.local.get('medioRadio')
    const trimmed = current.medioRadio.slice(0, genres.length * length)
    await chrome.storage.local.set({ medioRadio: trimmed })
  },

  hasListened: async id => {
    const current = await chrome.storage.local.get('medioRadioListened')

    if (current.medioRadioListened && !current.medioRadioListened.includes(id)) {
      current.medioRadioListened.push(id)
    }

    await chrome.storage.local.set({ medioRadioListened: current.medioRadioListened })
  },

  dj: {
    check: async () => {
      const openaikey = await utilitiesMedioAI.getSettings('openaikey')
      const openrouterapikey = await utilitiesMedioAI.getSettings('openrouterapikey')

      if (openaikey || openrouterapikey) {
        document.getElementById('medioDJSettings').style.display = 'block'
      } else {
        document.getElementById('medioDJNotice').style.display = 'block'
      }
    },

    load: (data, state) => {
      // check state if intro, transition or outro
      // get text from openai api
      // convert to audio speech
      // store audio to be played
    },

    play: (bgMusic, voice) => {
      const audio = document.getElementById('medio-radio-audio')
      audio.pause()

      bgMusic = bgMusic || chrome.runtime.getURL('dj/radio-bg-classical.mp3')
      voice = voice || chrome.runtime.getURL('dj/sample-voice.mp3')

      const bgAudio = document.getElementById('medio-radio-background')
      bgAudio.src = bgMusic
      bgAudio.load()
      bgAudio.volume = 0
      bgAudio.play()

      const djWrapper = document.getElementById('dj-wrapper')
      djWrapper.style.display = 'block'

      let volume = 0
      const fadeInInterval = setInterval(() => {
        if (volume < 0.7) {
          volume += 0.01
          bgAudio.volume = volume
        } else {
          clearInterval(fadeInInterval)
        }
      }, 100)

      setTimeout(() => {
        const voiceAudio = document.getElementById('medio-radio-dj')
        voiceAudio.src = voice
        voiceAudio.load()
        voiceAudio.play()

        voiceAudio.addEventListener('ended', () => {
          let volume = 0
          audio.volume = 0
          audio.play()
          const fadeInInterval = setInterval(() => {
            if (volume < 0.7) {
              volume += 0.01
              audio.volume = volume
            } else {
              clearInterval(fadeInInterval)
            }
          }, 100)
          fadeOut()
        })
      }, 2500)

      const fadeOut = () => {
        let volume = 0.7
        const fadeOutInterval = setInterval(() => {
          if (volume > 0) {
            volume -= 0.01
            if (volume < 0) volume = 0
            bgAudio.volume = volume
          } else {
            clearInterval(fadeOutInterval)
            bgAudio.pause()
            djWrapper.style.display = 'none'
          }
        }, 100)
      }
    },
  },
}

const medioRadioUI = {
  builder: /* html */ `
    <div id="medio-radio">
      <div>
       <h2 class="text-2xl mb-2">Udio Radio <span class="text-sm ml-1" style="color: #1dcca0">powered by MedioAI</span></h2>
      
       <h4 class="text-sm text-gray-400 mb-1">Add your genre tags <small class="text-xs">(comma separated list) *</small></h4>
       <textarea id="medio-radio-genres" class="w-full border w-full h-16 p-2 bg-gray-800 text-white rounded-lg">reggae, punk</textarea>

       <h4 class="text-sm text-gray-400 mb-1 mt-3">Length</h4>
      <select id="medio-radio-length" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
        <option value="1">Short (10 tracks per tag)</option>
        <option value="2">Medium (20 tracksper tag)</option>
        <option value="3">Long (30 tracks per tag)</option>
      </select>

      <h4 class="text-sm text-gray-400 mb-1 mt-3">Only New Tracks</h4>
      <select id="medio-radio-only-new" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
        <option value="on">Yes</option>
        <option value="off">No (repeat heard tracks)</option>
      </select>


       <div class="text-sm italic text-gray-400 mb-1 mt-3" id="medioDJNotice" style="display: none">
          Add your OpenAI or OpenRouter API key to enable DJ mode.**
       </div>

        <div id="medioDJSettings" style="display: none">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">DJ Voice</h4>
          <select id="medio-radio-dj-voice" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
            <option value="1">Voice 1</option>
            <option value="2">Voice 2</option>
          </select>

          <h4 class="text-sm text-gray-400 mb-1 mt-3">DJ Personality</h4>
          <select id="medio-radio-dj-personality" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
            <option value="1">GTA style (PG)</option>
            <option value="2">GTA style (X-Rated)</option>
            <option value="3">Radio Host</option>
            <option value="4">Simple Robot</option>
          </select>
        </div>

        <button id="medio-radio-deploy" style="background: #E3095D" class="text-white py-2 px-4 rounded-lg mt-3">Search & Deploy</button>
        <p class="text-xs text-gray-400 mt-4">* MedioAI will search for tags that you suggest and create a list of tracks for the radio broadcast. Tracks will never be repeated. **The DJ mode will announce the track name, username and sometimes comment about the lyrics.</p>
      </div>
    </div>`,

  building: /* html */ `
       <h2 class="text-2xl mb-2">Building track list...</h2>
       <p class="text-sm text-gray-400 mb-2">Please wait.</p>`,

  player: /* html */ `
       <div class="track-cover">
        <img src="https://medioai.com/assets/img/logo.png" />
        <div class="track-play"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSPlay0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path fill="#000" stroke="#000" d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPlay0)"/></svg></div>
        <div class="track-pause"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"/></svg></div>
       </div>
      
       <div class="medio-radio-info mb-2">
        <a href="#" class="medio-radio-title block truncate text-3xl font-bold mb-1 hover:underline">Track Title</a>
        <a href="#" target="_blank" class="medio-radio-artist block hover:underline text-lg opacity-50 mb-4">Track Artist</a>
       </div>

       <div class="medio-radio-controls">
        <div class="flex space-x-2 items-center justify-between">
          <button class="medio-radio-play"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg></button>

          <button class="medio-radio-pause" style="display: none"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M12 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m10 0h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"/></svg></button>
          
          <button class="medio-radio-next flex space-x-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M3.569 5.865A1.332 1.332 0 0 1 5.415 4.8l.646.283l.511.233l.597.283l.676.331l.49.249l.793.414l.564.304l.588.326l.613.349l.633.37l.599.361l.564.349l.778.496l.694.458l.607.414l.517.363l.541.394l.206.154c.71.535.71 1.594.001 2.13l-.43.319l-.273.198l-.664.465l-.595.404l-.443.292l-.73.47l-.81.5l-.581.35l-.615.36l-.62.352l-.593.33l-.566.305l-.538.283l-.748.381l-.673.331l-.773.364l-.744.332l-.224.096a1.332 1.332 0 0 1-1.844-1.065l-.08-.698l-.071-.767l-.053-.689l-.05-.78l-.028-.57l-.024-.605l-.019-.64l-.015-1.026v-.715l.015-1.024l.03-.948l.026-.587l.03-.55l.052-.75l.054-.657l.07-.722zM19 5a1 1 0 0 1 .993.883L20 6v12a1 1 0 0 1-.883.993L19 19h-1a1 1 0 0 1-.993-.883L17 18V6a1 1 0 0 1 .883-.993L18 5z"/></g></svg> <span class="text-sm opacity-50 hover:opacity-100">Next Track</span></button>
        </div>

        <div class="medio-radio-progress"><div class="audio-radio-bar"></div></div>
        <div class="mt-2">
          <div class="medio-radio-indicator">0:00 / 0:00</div>
          <div class="medio-radio-broadcast text-xs mt-1 opacity-50">Track 1 of 1</div>
        </div>
       </div>
       
       <div id="dj-wrapper" style="display: none">
        <h3>Announcer</h3>
        <div id="dj-text">
          <p>Welcome to MedioRadio for Udio. We starting off with <strong class="highlighted-track">"Loving Jah" by AmegaBeats</strong>. This song is about loving the herb.</p>
          <p>Let's spin it rasta!</p>
        </div>
       </div>
       <audio id="medio-radio-audio" style="display: none" src="#" preload="auto"></audio>
       <audio id="medio-radio-background" style="display: none" src="#" preload="auto"></audio>
       <audio id="medio-radio-dj" style="display: none" src="#" preload="auto"></audio>`,
}

medioRadio.init()
