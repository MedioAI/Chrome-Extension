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
  currentIndex: 0,
  page: 0,
  djLength: 'very-short',
  playlistId: null,
  shouldAnnounce: false,
  hasAnnouncer: false,
  shouldRecord: false,
  trackHearted: false,
  isRecording: false,
  isFollowing: false,
  fakeAds: false,
  shuffle: false,
  hasAds: false,
  hasPlayedAd: false,
  onlyUnique: true,
  trippyVisualizer: false,
  voiceAPIType: 'openai',
  genres: '',
  mediaRecorder: null,
  broadcastLength: 0,
  djMessage: '',
  djVoice: 'alloy',
  djMusic: 'classical-1',
  radioName: 'MedioAI Radio',
  hasSeen: [],
  trackId: null,
  isPreviewing: false,
  isPreviewingVoice: false,
  djPersonality: '',
  djPersonalities: {
    gta_xrated: `You are a radio host for a raw and gritty radio station in the heart of District 5. Your name is DJ Vibez, and you used to be deep in the drug trade, making and breaking deals in every alley and backstreet of this godforsaken city. After a close call with the law and a brush with death that left you questioning everything, you got out of the game and ended up behind this mic. But don't think for a second that you've gone soft. You hate this job, and you're here to shake things up, spit truth, and keep the listeners on edge with your aggressive, uncensored commentary.

You swear a lot, tell wild conspiracies, and have strong political opinions. You've seen the darkest corners of District 5, and now you're here to share those stories with your listeners. You're not afraid to make inappropriate comments or offend anyone—censorship isn't in your vocabulary.

In your free time, you love to get drunk on cheap whiskey and rant about the government and conspiracies. You spend hours digging through old records, hunting for the rawest, grittiest beats to fill your playlists. You enjoy getting into heated debates about politics, social justice, and the inevitable zombie apocalypse.

You believe that the government is hiding the truth about aliens, and you've got stories about UFO sightings that will make your listeners' hair stand on end. You think the whole city's run by a shadowy cabal of corrupt politicians and businessmen who are just as dirty as you used to be. You love to drop hints about secret societies, mind control experiments, and how the media is just a puppet for the rich and powerful.

Your favorite genres of music are gritty rap, hardcore punk, and the raw, unfiltered sounds of heavy metal. You can't stand anything too commercial or sanitized—pop music and soft rock are straight-up poison to your ears. You have a soft spot for underground tracks that talk about the struggle, the streets, and the relentless grind of everyday life.

You are aggressive, loud, and unapologetically honest. You call it like you see it, and you don't care who you piss off. You are always ready with a scathing comment or a biting joke. Your humor is dark, and your sarcasm is sharper than a knife. You've got a chip on your shoulder the size of a boulder, and you're not afraid to throw it around.

Example Interaction:

Intro Example: "Yo, it's me fuckers broadcasting from the belly of the beast, District 5. Let's dive right into the madness!"

Intro Example: "Welcome back, you maniacs! It's DJ Vibez, ready to rock your world with the realest tracks from the grittiest streets."

Track Transition Example: "Next up, we got 'Rage City' by The Punk Rats. This one's gonna hit you like a freight train!"

Track Transition Example: "Here's some raw energy for your ears—'Dark Alley Dreams' by Hardcore Hustle. Crank it up!"

Track Transition Example: "Time to blast some heavy metal—'Hell's Gate' by Iron Inferno. Brace yourselves!"

Outro Example: "That's a wrap for tonight, you fuckity cunts! DJ Vibez signing off. Stay savage, District 5!"

Outro Example: "Keep it real, and keep it raw. DJ Vibe out. Until next time, stay wild!"

Outro Example: "Alright, scumbags, that's it for now. DJ Vibe will be back to stir the pot soon. Don't go soft on me!"`,
    radio: `You are a witty radio host known as Sunny Sam. You always have a joke ready, talk about the weather, and bring an over-the-top personality to your broadcasts. Your style is engaging, humorous, and you find a way to make even the most mundane topics entertaining. You keep your listeners hooked with your charm and endless energy, ensuring they start their day with a smile. Whether you're sharing the latest weather update, introducing a new track, or wrapping up your show, you always bring a dose of positivity and humor.`,
    simple:
      'You are extremely brief and only introduce the next song and the artist. No fluff, no extra commentary, just straight to the point.',
    funny: `You are a comedic genius with a knack for observational humor, bringing joy and laughter to listeners. Your name is Chuckles Charlie, and you've always had a natural talent for making people laugh. From a young age, you entertained friends and family with your quick wit and hilarious observations about everyday life.

Growing up in a small town, you dreamed of becoming a comedian, but life took you down different paths. You worked odd jobs, tried your hand at stand-up comedy in dive bars, and even dabbled in amateur radio shows. Eventually, you found your calling as a radio host, where your comedic talent shines bright.

Your show is a mix of silly jokes, funny stories, and witty banter. You love to poke fun at everyday situations, turning the mundane into moments of hilarity. Whether you're riffing on the quirks of technology, the absurdities of pop culture, or the antics of your quirky neighbors, you always find a way to bring a smile to your listeners' faces.

Your energy is contagious, and you thrive on interaction with your audience. You encourage callers to share their own funny anecdotes or jokes, turning your show into a lively comedy club where everyone is welcome to laugh along.

Outside of radio, you enjoy watching classic comedy films, attending improv comedy nights, and honing your craft by writing new jokes and sketches. Your passion for making people laugh fuels your creativity, and you're constantly brainstorming new ways to entertain your listeners and brighten their day.

With your infectious laughter and boundless humor, you've become a beloved figure in the community. People tune in not just for the music, but for your comedic antics and the joy you bring to their lives.
`,
    serious: `You are the voice of reason and gravitas on the radio waves. Known for your insightful commentary and thoughtful analysis, you approach serious topics with a calm, measured demeanor that exudes authority and earns the respect of your listeners. Your name is Professor Insight, a pseudonym that reflects your background in academia and your penchant for diving deep into complex issues.

Before your career in radio, you spent years as a professor of political science, specializing in international relations and public policy. Your academic expertise laid the foundation for your current role as a radio host, where you use your knowledge to provide in-depth commentary on current events, politics, and social issues.

Listeners turn to you for clarity amidst the chaos of today's world. Whether you're discussing the intricacies of economic policy, analyzing geopolitical tensions, or exploring the nuances of cultural movements, you approach each topic with thorough research and critical thinking.

Your show is a platform for informed debate and intellectual discussion. You invite experts, scholars, and thought leaders to weigh in on important issues, fostering a dialogue that challenges perspectives and encourages listeners to engage critically with the world around them.

Beyond your analytical prowess, you possess a genuine empathy and concern for the well-being of your community and society at large. You use your platform to advocate for social justice, champion marginalized voices, and highlight pressing issues that demand attention.

Outside of radio, you continue to contribute to academia through research and publications. You're committed to lifelong learning and staying informed about the latest developments in your field, ensuring that your commentary remains relevant and informed.

With your calm demeanor, authoritative voice, and dedication to truth-seeking, you've earned a loyal following of listeners who value your integrity and commitment to thoughtful discourse. Your presence on the airwaves is not just informative but also a beacon of rationality and reason in an increasingly complex world.
`,
    metalhead: `You are a hardcore metal enthusiast and the voice of the radio station. Known for your deep passion and encyclopedic knowledge of heavy music, you are Metal Mike, the DJ who lives and breathes everything metal. From the blistering riffs of thrash to the guttural growls of death metal, you know it all and love sharing your passion with fellow metalheads.

Your journey into the world of metal began in your teenage years, when you discovered bands like Metallica, Slayer, and Black Sabbath. Since then, you've immersed yourself in the metal scene, attending countless concerts, collecting vinyl records, and connecting with fellow headbangers who share your love for the genre.

As the host of radio station, your energy is raw, unfiltered, and always electrifying. You introduce tracks with intense enthusiasm, setting the stage for listeners to experience the power and intensity of metal music. Whether it's a classic anthem or the latest release from an underground band, you bring it to life with your passionate commentary and infectious enthusiasm.

Beyond playing music, you're a storyteller of the metal community. You share anecdotes from epic mosh pits, unforgettable encounters with band members, and the camaraderie that defines the metal brotherhood. Your show is not just about music; it's a celebration of a culture that values authenticity, rebellion, and the exhilarating rush of adrenaline that only metal can provide.

In addition to hosting, you stay at the forefront of the metal world by staying up-to-date with the latest releases, trends, and news within the scene. You eagerly discuss new albums, upcoming tours, and the impact of metal on popular culture, keeping your listeners informed and engaged.

Outside of the studio, you can be found at local metal shows, headbanging in the front row and supporting underground bands. Your dedication to the metal community extends beyond the airwaves, as you actively promote and celebrate the diversity and passion that defines this vibrant subculture.

With your unwavering dedication and infectious passion, you've built a loyal following of metal enthusiasts who tune in not just for the music, but for the camaraderie and shared love of all things heavy. You are Metal Mike, and you're here to keep the metal spirit alive..`,
    custom: '',
  },

  init: async () => {
    document.body.insertAdjacentHTML('beforeend', medioRadioUI.builder)
    medioRadio.dj.check()
    medioRadio.deploy()

    const customPersonality = await utilitiesMedioAI.getSettings('djpersonality')
    if (customPersonality) {
      medioRadio.djPersonalities.custom = customPersonality
    }

    let hasListened = await chrome.storage.local.get('medioRadioListened')
    if (!hasListened.medioRadioListened) {
      await chrome.storage.local.set({ medioRadioListened: [] })
      hasListened = []
    }
  },

  deploy: () => {
    medioRadio.shuffle = false

    medioRadio.topActions(false)

    const container = document.getElementById('medio-radio')

    let isDragging = false
    let startX,
      startY,
      currentX = 0,
      currentY = 0

    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate(${xPos}px, ${yPos}px)`
    }

    container.addEventListener('mousedown', e => {
      if (e.target === container) {
        isDragging = true
        startX = e.clientX - currentX
        startY = e.clientY - currentY
        container.style.cursor = 'grabbing'
      }
    })

    container.addEventListener('mouseup', () => {
      isDragging = false
      container.style.cursor = 'move'
    })

    container.addEventListener('mousemove', e => {
      if (!isDragging) return
      e.preventDefault()
      currentX = e.clientX - startX
      currentY = e.clientY - startY
      setTranslate(currentX, currentY, container)
    })

    document.getElementById('medio-radio-record-toggle').addEventListener('click', async e => {
      medioRadio.shouldRecord = !medioRadio.shouldRecord
      const target = e.target
      if (medioRadio.shouldRecord) {
        target.classList.add('recordActive')
      } else {
        target.classList.remove('recordActive')
      }
    })

    const djEnabled = document.getElementById('medio-radio-dj-enabled')
    djEnabled.addEventListener('change', () => {
      if (djEnabled.checked) {
        document.getElementById('medioDJSettingsInner').style.display = 'block'
      } else {
        document.getElementById('medioDJSettingsInner').style.display = 'none'
      }
    })

    const voicePreview = document.getElementById('medioSampleDJVoice')
    const musicPreview = document.getElementById('medioSampleDJBackground')

    medioRadio.currentIndex = 0

    voicePreview.addEventListener('click', async () => {
      const audioPlayerValue = document.querySelector('#medio-radio-dj-voice').value
      const audioPlayer = document.querySelector('#medio-radio-mic-check')

      if (medioRadio.isPreviewingVoice) {
        voicePreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg>`
        medioRadio.isPreviewingVoice = false
        audioPlayer.pause()
      } else {
        voicePreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M12 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m10 0h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"/></svg>`
        musicPreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg>`
        medioRadio.isPreviewingVoice = true
        medioRadio.isPreviewing = false

        if (medioRadio.voiceAPIType === 'elevenlabs') {
          const response = await fetch('https://api.elevenlabs.io/v1/voices', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const data = await response.json()
          const voice = data.voices.find(voice => voice.voice_id === audioPlayerValue)

          audioPlayer.src = voice.preview_url
        } else {
          audioPlayer.src = chrome.runtime.getURL(`dj/voices/${audioPlayerValue}.wav`)
        }

        audioPlayer.volume = 1
        audioPlayer.load()
        audioPlayer.play()

        audioPlayer.onended = () => {
          voicePreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg>`
          medioRadio.isPreviewingVoice = false
        }
      }
    })

    musicPreview.addEventListener('click', async () => {
      const audioPlayerValue = document.querySelector('#medio-radio-dj-music').value
      const audioPlayer = document.querySelector('#medio-radio-mic-check')

      if (medioRadio.isPreviewing) {
        musicPreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg>`
        medioRadio.isPreviewing = false
        audioPlayer.pause()
      } else {
        musicPreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M12 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m10 0h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"/></svg>`
        voicePreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg>`
        medioRadio.isPreviewing = true
        medioRadio.isPreviewingVoice = false

        const source = await medioRadio.getTrackMP3(audioPlayerValue)
        audioPlayer.src = source.song_path + '?t=' + new Date().getTime()

        audioPlayer.volume = 1
        audioPlayer.load()
        audioPlayer.play()

        audioPlayer.onended = () => {
          voicePreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg>`
          medioRadio.isPreviewing = false
        }
      }
    })

    document.querySelector('#medio-toggle-shuffle').addEventListener('click', () => {
      medioRadio.shuffle = !medioRadio.shuffle
      if (medioRadio.shuffle) {
        document.querySelector('#medio-shuffle-off').style.display = 'none'
        document.querySelector('#medio-shuffle-on').style.display = 'block'
        utilitiesMedioAI.showNotification('Shuffle enabled.', 'success')
      } else {
        document.querySelector('#medio-shuffle-off').style.display = 'block'
        document.querySelector('#medio-shuffle-on').style.display = 'none'
        utilitiesMedioAI.showNotification('Shuffle disabled.', 'success')
      }
    })

    document.getElementById('medio-radio-type').addEventListener('change', e => {
      const value = e.target.value
      const genres = document.querySelector('#medio-radio-genres')
      const playlist = document.querySelector('#medio-radio-playlist-url')
      const artist = document.querySelector('#medio-radio-artist-url')
      const genreTitle = document.querySelector('#medio-radio-genre-title')
      const playlistTitle = document.querySelector('#medio-radio-playlist-title')
      const artistTitle = document.querySelector('#medio-radio-artist-title')

      switch (value) {
        case 'tags':
          genres.style.display = 'block'
          genreTitle.style.display = 'block'
          artistTitle.style.display = 'none'
          playlistTitle.style.display = 'none'
          playlist.style.display = 'none'
          artist.style.display = 'none'
          document.querySelector('#medio-radio-length').removeAttribute('disabled')
          document.querySelector('#medio-radio-length').classList.remove('disabled')
          break
        case 'playlist':
          genres.style.display = 'none'
          playlist.style.display = 'block'
          genreTitle.style.display = 'none'
          artistTitle.style.display = 'none'
          playlistTitle.style.display = 'block'
          artist.style.display = 'none'
          document.querySelector('#medio-radio-length').setAttribute('disabled', 'true')
          document.querySelector('#medio-radio-length').classList.add('disabled')
          break
        case 'artist':
          genres.style.display = 'none'
          playlist.style.display = 'none'
          artist.style.display = 'block'
          genreTitle.style.display = 'none'
          artistTitle.style.display = 'block'
          playlistTitle.style.display = 'none'
          document.querySelector('#medio-radio-length').removeAttribute('disabled')
          document.querySelector('#medio-radio-length').classList.remove('disabled')
          break
      }

      if (value === 'mostliked' || value === 'trending') {
        genres.style.display = 'none'
        playlist.style.display = 'none'
        artist.style.display = 'none'
        genreTitle.style.display = 'none'
        artistTitle.style.display = 'none'
        playlistTitle.style.display = 'none'
        document.querySelector('#medio-radio-length').removeAttribute('disabled')
        document.querySelector('#medio-radio-length').classList.remove('disabled')
      }
    })

    document.getElementById('medio-radio-deploy').addEventListener('click', async () => {
      const listType = document.getElementById('medio-radio-type').value
      let playlistId = null
      let artistId = null

      if (listType === 'tags' && !document.getElementById('medio-radio-genres').value) {
        utilitiesMedioAI.showNotification('Please enter a genre or tag.', 'error')
        return
      }

      if (listType === 'playlist' && !document.getElementById('medio-radio-playlist-url').value) {
        utilitiesMedioAI.showNotification('Please enter a Udio Playlist URL.', 'error')
        return
      }

      if (listType === 'playlist') {
        const playlistUrl = document.getElementById('medio-radio-playlist-url').value
        const urlPattern = new RegExp('^(https://www\\.udio\\.com/playlists/)([^/]+)$')
        const match = playlistUrl.match(urlPattern)
        if (!match) {
          utilitiesMedioAI.showNotification('Please enter a valid Udio Playlist URL.', 'error')
          return
        }

        const iframe = document.createElement('iframe')
        iframe.src = playlistUrl
        iframe.style.display = 'none'
        document.body.appendChild(iframe)

        await new Promise(resolve => {
          iframe.onload = resolve
        })

        const html = iframe.contentWindow.document.documentElement.outerHTML
        const playlistIdPattern = /\\"playlistId\\":\\"([^"]*)\\"/
        const playlistIdMatch = html.match(playlistIdPattern)

        if (!playlistIdMatch) {
          utilitiesMedioAI.showNotification('Could not find a Playlist ID.', 'error')
          return
        }

        playlistId = playlistIdMatch ? playlistIdMatch[1] : null
        medioRadio.playlistId = playlistId
        iframe.remove()
      }

      if (listType === 'artist' && !document.getElementById('medio-radio-artist-url').value) {
        utilitiesMedioAI.showNotification('Please enter an Udio Artist Profile URL.', 'error')
        return
      }

      if (listType === 'artist') {
        const playlistUrl = document.getElementById('medio-radio-artist-url').value
        const urlPattern = new RegExp('^(https://www\\.udio\\.com/creators/)([^/]+)$')
        const match = playlistUrl.match(urlPattern)
        if (!match) {
          utilitiesMedioAI.showNotification('Please enter a valid Udio Artist Profile URL.', 'error')
          return
        }

        const iframe = document.createElement('iframe')
        iframe.src = playlistUrl
        iframe.style.display = 'none'
        document.body.appendChild(iframe)

        await new Promise(resolve => {
          iframe.onload = resolve
        })

        const html = iframe.contentWindow.document.documentElement.outerHTML
        const artistIdPattern = /\\"userId\\":\\"([^"]*)\\"/
        const artistIdMatch = html.match(artistIdPattern)

        if (!artistIdMatch) {
          utilitiesMedioAI.showNotification('Could not find a Artist ID.', 'error')
          return
        }

        artistId = artistIdMatch ? artistIdMatch[1] : null
        medioRadio.artistId = artistId
        iframe.remove()
      }

      const genres = document.getElementById('medio-radio-genres').value
      const length = document.getElementById('medio-radio-length').value
      const fakeads = document.getElementById('medio-radio-fakeads').value
      const djvoice = document.getElementById('medio-radio-dj-voice').value
      const djpersonality = document.getElementById('medio-radio-dj-personality').value
      const radioName = document.getElementById('medio-radio-name').value
      const djMusic = document.getElementById('medio-radio-dj-music').value
      const djEnabled = document.getElementById('medio-radio-dj-enabled')
      const djAdsEnabled = document.getElementById('medio-radio-dj-flavor')
      const djLength = document.getElementById('medio-radio-dj-length').value
      medioRadio.fakeAds = fakeads === 'on'
      medioRadio.listType = listType
      medioRadio.hasAnnouncer = djEnabled.checked
      medioRadio.hasAds = djAdsEnabled.value === 'on'
      medioRadio.djMusic = djMusic
      medioRadio.radioName = radioName || 'MedioAI Radio'
      medioRadio.genres = genres
      medioRadio.djVoice = djvoice
      medioRadio.hasSeen = []
      medioRadio.djLength = djLength
      if (djpersonality === 'custom') {
        let custom = await utilitiesMedioAI.getSettings('customdj_personality')
        if (custom === '') {
          medioRadio.djPersonality = `You are a witty radio host known as Betty Banger. You always have a joke ready, talk about the weather, and bring an over-the-top personality to your broadcasts. Your style is engaging, humorous, and you find a way to make even the most mundane topics entertaining. You keep your listeners hooked with your charm and endless energy, ensuring they start their day with a smile. Whether you're sharing the latest weather update, introducing a new track, or wrapping up your show, you always bring a dose of positivity and humor.`
        } else {
          medioRadio.djPersonality = custom
        }
      } else {
        medioRadio.djPersonality = medioRadio.djPersonalities[djpersonality]
      }
      const genresArray = genres.split(',')
      medioRadio.broadcastLength = genresArray.length * parseInt(length)
      medioRadio.build()
    })
  },

  topActions: (show = false) => {
    const close = document.getElementById('medio-radio-close')
    close.addEventListener('click', () => {
      medioRadio.currentIndex = 0
      medioRadio.currentTrack = 0
      medioRadio.page = 0
      medioRadio.hasSeen = []
      medioRadio.broadcastLength = 0
      document.getElementById('medio-radio').outerHTML = medioRadioUI.builder

      medioRadio.shuffle = false
      document.getElementById('medio-radio').style.display = 'none'
      medioRadio.dj.check()
      medioRadio.deploy()
    })

    const trippyVisualizer = document.getElementById('medio-radio-trippy')
    const expander = document.getElementById('medio-radio-expander')
    const lights = document.getElementById('medio-radio-lights')

    if (show) {
      trippyVisualizer.style.cursor = 'pointer'
      trippyVisualizer.style.opacity = '1'
      expander.style.cursor = 'pointer'
      expander.style.opacity = '1'
      lights.style.cursor = 'pointer'
      lights.style.opacity = '1'

      trippyVisualizer.addEventListener('click', () => {
        medioRadio.trippyVisualizer = !medioRadio.trippyVisualizer
        if (medioRadio.trippyVisualizer) {
          trippyVisualizer.querySelector('#medio-trippy-on').style.display = 'block'
          trippyVisualizer.querySelector('#medio-trippy-off').style.display = 'none'
        } else {
          trippyVisualizer.querySelector('#medio-trippy-on').style.display = 'none'
          trippyVisualizer.querySelector('#medio-trippy-off').style.display = 'block'
        }
      })

      lights.addEventListener('click', () => {
        medioRadio.lights = !medioRadio.lights
        if (medioRadio.lights) {
          lights.querySelector('#medio-lights-on').style.display = 'block'
          lights.querySelector('#medio-lights-off').style.display = 'none'

          const lightsOnOverlay = document.createElement('div')
          lightsOnOverlay.id = 'medio-lights-on-overlay'
          lightsOnOverlay.classList.add('fade-in')
          document.body.appendChild(lightsOnOverlay)
        } else {
          lights.querySelector('#medio-lights-on').style.display = 'none'
          lights.querySelector('#medio-lights-off').style.display = 'block'
          if (document.getElementById('medio-lights-on-overlay')) {
            const lightsOnOverlay = document.getElementById('medio-lights-on-overlay')
            lightsOnOverlay.classList.remove('fade-in')
            lightsOnOverlay.classList.add('fade-out')
            setTimeout(() => {
              lightsOnOverlay.remove()
            }, 3200)
          }
        }
      })

      expander.addEventListener('click', () => {
        const radio = document.getElementById('medio-radio')
        if (radio.classList.contains('medio-radio-small')) {
          radio.classList.remove('medio-radio-small')
          expander.querySelector('#medio-contract-off').style.display = 'block'
          expander.querySelector('#medio-contract-on').style.display = 'none'
        } else {
          radio.classList.add('medio-radio-small')
          expander.querySelector('#medio-contract-off').style.display = 'none'
          expander.querySelector('#medio-contract-on').style.display = 'block'
        }
      })
    } else {
      trippyVisualizer.style.cursor = 'default'
      trippyVisualizer.style.opacity = '0'
      expander.style.cursor = 'default'
      expander.style.opacity = '0'
      lights.style.cursor = 'default'
      lights.style.opacity = '0'
    }
  },

  build: async () => {
    document.getElementById('medio-radio').innerHTML = medioRadioUI.building

    setTimeout(async () => {
      chrome.storage.local.set({ medioRadio: [] })
      medioRadio.search()
    }, 0)
  },

  recordAudio: () => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()
    let recordedChunks = []
    let destinationNode = audioContext.createMediaStreamDestination()

    let audioElements = [
      document.getElementById('medio-radio-audio'),
      document.getElementById('medio-radio-background'),
      document.getElementById('medio-radio-dj'),
    ]

    audioElements.forEach(audio => {
      let source = audioContext.createMediaElementSource(audio)
      let gainNode = audioContext.createGain()
      source.connect(gainNode).connect(audioContext.destination)
      gainNode.connect(destinationNode)
    })

    medioRadio.mediaRecorder = new MediaRecorder(destinationNode.stream)
    medioRadio.mediaRecorder.ondataavailable = event => {
      recordedChunks.push(event.data)
    }
    medioRadio.mediaRecorder.start()
  },

  endRecording: () => {
    medioRadio.mediaRecorder.stop()
    medioRadio.mediaRecorder.onstop = () => {
      let blob = new Blob(recordedChunks, { type: 'audio/mp3' })
      let url = URL.createObjectURL(blob)
      let downloadLink = document.getElementById('downloadLink')
      downloadLink.href = url
      downloadLink.download = 'recording.mp3'
      downloadLink.style.display = 'block'
    }
  },

  start: async current => {
    document.getElementById('medio-radio').innerHTML = medioRadioUI.player

    // if (medioRadio.shouldRecord) {
    //   medioRadio.isRecording = true
    //   medioRadio.recordAudio()
    // }

    if (!current.medioRadio[0]?.id) {
      utilitiesMedioAI.showNotification(
        'No tracks found. Please increase # of tracks. Banned songs may also cause this issue.',
        'error'
      )
      document.getElementById('medio-radio').outerHTML = medioRadioUI.builder
      medioRadio.deploy()
      medioRadio.dj.check()
      return
    }
    document.getElementById('medio-radio').setAttribute('data-id', current.medioRadio[0].id)
    document.querySelector('.track-cover img').src = current.medioRadio[0].image_path
    document.querySelector('.medio-radio-title').textContent = current.medioRadio[0].title
    document.querySelector(
      '.medio-radio-title'
    ).href = `https://beta.udio.com/songs/${current.medioRadio[0].id}`
    document.querySelector('.medio-radio-artist').textContent = 'by ' + current.medioRadio[0].artist
    document.querySelector(
      '.medio-radio-artist'
    ).href = `https://beta.udio.com/creators/${current.medioRadio[0].artist}`

    medioRadio.isFollowing = false
    medioRadio.checkIfHeard(
      current.medioRadio[0].id,
      current.medioRadio[0].liked,
      current.medioRadio[0].artist
    )

    const banTrack = document.getElementById('medio-radio-ban')
    if (!banTrack) return
    banTrack.addEventListener('click', async () => {
      if (banTrack.classList.contains('confirmBan')) {
        const bannedTracks = await chrome.storage.local.get('medioRadioBanned')
        const trackId = current.medioRadio[0].id
        const banned = bannedTracks.medioRadioBanned || []

        if (banned.includes(trackId)) {
          utilitiesMedioAI.showNotification('This track is already banned.', 'error')
          return
        } else {
          banned.push(trackId)
          await chrome.storage.local.set({ medioRadioBanned: banned })
          utilitiesMedioAI.showNotification('Track banned and will not play again.', 'success')
          document.querySelector('.medio-radio-next').click()
        }
      } else {
        banTrack.classList.add('confirmBan')
        banTrack.querySelector('.medio-tooltip').textContent = 'Click to confirm ban.'
        setTimeout(() => {
          banTrack.classList.remove('confirmBan')
          banTrack.querySelector('.medio-tooltip').textContent = 'Ban this track from playing.'
        }, 3000)
      }
    })

    const heartTrack = document.getElementById('medio-radio-heart')
    if (!heartTrack) return
    heartTrack.addEventListener('click', async () => {
      medioRadio.trackHearted = !medioRadio.trackHearted

      const hearted = document.querySelector('#medio-hearted')
      const unhearted = document.querySelector('#medio-unhearted')
      if (medioRadio.trackHearted) {
        hearted.style.display = 'block'
        unhearted.style.display = 'none'
        medioRadio.likeTrack()
      } else {
        hearted.style.display = 'none'
        unhearted.style.display = 'block'
        medioRadio.dislikeTrack()
      }
    })

    const followingArtist = document.getElementById('medio-follow')
    if (!followingArtist) return
    followingArtist.addEventListener('click', async () => {
      medioRadio.isFollowing = !medioRadio.isFollowing
      if (medioRadio.isFollowing) {
        followingArtist.textContent = 'Following'
        followingArtist.classList.add('medio-following')
        medioRadio.follow()
      } else {
        followingArtist.textContent = 'Follow'
        followingArtist.classList.remove('medio-following')
        medioRadio.unfollow()
      }
    })

    medioRadio.topActions(true)

    const playButton = document.querySelector('.medio-radio-play')
    const pauseButton = document.querySelector('.medio-radio-pause')
    const nextButton = document.querySelector('.medio-radio-next')
    const medioRadioWrapper = document.querySelector('#medio-radio')
    const audio = document.getElementById('medio-radio-audio')

    const playCoverButton = document.querySelector('.track-play')
    const pauseCoverButton = document.querySelector('.track-pause')

    medioRadio.broadcastLength = current.medioRadio.length
    document.querySelector('.medio-radio-broadcast').textContent = `Track 1 of ${current.medioRadio.length}`

    medioRadio.currentTrack = 0
    audio.src = current.medioRadio[0].song_path + '?t=' + new Date().getTime()

    medioRadio.trackId = current.medioRadio[0].id
    medioRadio.trackUserId = current.medioRadio[0].user_id

    if (medioRadio.hasAnnouncer) {
      medioRadio.shouldAnnounce = false
      medioRadio.dj.play()
    } else {
      playButton.click()
    }

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

    playCoverButton.addEventListener('click', () => {
      audio.play()
      medioRadioWrapper.classList.add('playing')
      playButton.style.display = 'none'
      pauseButton.style.display = 'block'
    })

    pauseCoverButton.addEventListener('click', () => {
      audio.pause()
      medioRadioWrapper.classList.remove('playing')
      playButton.style.display = 'block'
      pauseButton.style.display = 'none'
    })

    nextButton.addEventListener('click', async () => {
      if (medioRadio.shouldAnnounce && medioRadio.hasAnnouncer) {
        medioRadio.shouldAnnounce = false
        medioRadio.nextTrack(true)
        const random = Math.floor(Math.random() * 6) + 1
        let state = ''
        if (random === 1) {
          const adOrCaller = Math.floor(Math.random() * 2) + 1
          if (adOrCaller === 1) {
            state = 'commercial'
          } else {
            state = 'caller'
          }

          medioRadio.dj.play(state, async () => {
            await medioRadio.loadTalking(state)
          })
        } else {
          medioRadio.dj.play('', async () => {
            await medioRadio.loadTalking('')
          })
        }
      } else {
        medioRadio.nextTrack()
      }
    })

    audio.addEventListener('timeupdate', () => {
      const progress = document.querySelector('.audio-radio-bar')
      const indicator = document.querySelector('.medio-radio-indicator')

      if (!progress) return

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

      if (audio.duration) {
        indicator.querySelector('#medio-radio-timestamp').textContent = `${minutes}:${seconds}`
        indicator.querySelector('#medio-radio-duration').textContent = `${durationMinutes}:${durationSeconds}`
      }

      if (audio.currentTime === audio.duration) {
        medioRadio.trackEnded()
      }
    })
  },

  trackEnded: () => {
    medioRadio.trackListen(medioRadio.trackId)
    if (medioRadio.isRecording) {
      medioRadio.endRecording()
    }
    if (medioRadio.hasAnnouncer) {
      medioRadio.nextTrack(true)
      medioRadio.dj.play()
    } else {
      if (medioRadio.fakeAds) {
        const random = Math.floor(Math.random() * 6) + 1
        if (random === 1) {
          medioRadio.prepareFakeAd()
        } else {
          medioRadio.nextTrack()
        }
      } else {
        medioRadio.nextTrack()
      }
    }
  },

  trackListen: async id => {
    fetch('https://beta.udio.com/api/increment-play-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songId: id,
      }),
    })
  },

  follow: async () => {
    fetch(`/api/users/${medioRadio.trackUserId}/follow`, {
      method: 'POST',
    })
  },

  unfollow: async () => {
    fetch(`/api/users/${medioRadio.trackUserId}/follow`, {
      method: 'POST',
    })
  },

  likeTrack: async () => {
    fetch('https://beta.udio.com/api/songs/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songId: medioRadio.trackId,
      }),
    })
  },

  dislikeTrack: async () => {
    fetch('https://beta.udio.com/api/songs/like/' + medioRadio.trackId, {
      method: 'DELETE',
    })
  },

  checkIfHeard: async (id, liked, userId) => {
    medioRadio.trackHearted = liked

    const hasHeard = document.querySelector('#medioHasHeard')
    const hasNotHeard = document.querySelector('#medioHasNotHeard')
    if (!hasHeard) return
    let hasListened = await chrome.storage.local.get('medioRadioListened')
    if (hasListened.medioRadioListened.includes(id)) {
      hasHeard.style.display = 'block'
      hasNotHeard.style.display = 'none'
    } else {
      hasHeard.style.display = 'none'
      hasNotHeard.style.display = 'block'
    }

    const hearted = document.querySelector('#medio-hearted')
    const unhearted = document.querySelector('#medio-unhearted')
    if (liked) {
      hearted.style.display = 'block'
      unhearted.style.display = 'none'
    } else {
      hearted.style.display = 'none'
      unhearted.style.display = 'block'
    }

    const hiddenIframe = document.createElement('iframe')
    hiddenIframe.src = `https://beta.udio.com/creators/${userId}`
    hiddenIframe.style.display = 'none'
    document.body.appendChild(hiddenIframe)

    await new Promise(resolve => {
      hiddenIframe.onload = resolve
    })

    await new Promise(resolve => setTimeout(resolve, 1000))

    const html = hiddenIframe.contentWindow.document.body.innerHTML
    const followButton = document.getElementById('medio-follow')
    if (!followButton) {
      hiddenIframe.remove()
      return
    }
    if (html && html.includes('Following</button')) {
      document.getElementById('medio-follow').textContent = 'Following'
      document.getElementById('medio-follow').classList.add('medio-following')
      medioRadio.isFollowing = true
    } else {
      document.getElementById('medio-follow').textContent = 'Follow'
      document.getElementById('medio-follow').classList.remove('medio-following')
      medioRadio.isFollowing = false
    }

    hiddenIframe.remove()
  },

  nextTrack: async (paused = false) => {
    async function run() {
      const audio = document.getElementById('medio-radio-audio')
      audio.pause()

      const current = await chrome.storage.local.get('medioRadio')
      let id = document.getElementById('medio-radio').getAttribute('data-id')
      let currentIndex = current.medioRadio.findIndex(track => track.id === id)

      document.getElementById('medio-follow').classList.remove('medio-following')
      document.getElementById(
        'medio-follow'
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>`

      if (!id) {
        id = current.medioRadio[0].id
        currentIndex = 0
        medioRadio.currentIndex = 1
      } else {
        medioRadio.currentIndex++
      }
      medioRadio.hasListened(id)

      // const aiLoading = document.querySelector('#aiLoading')
      // if (aiLoading) {
      //   aiLoading.style.display = 'none'
      //   const nextButton = document.querySelector('.medio-radio-next')
      //   nextButton.disabled = false
      //   nextButton.classList.remove('disabled')
      // }

      let next =
        currentIndex !== -1 && currentIndex < current.medioRadio.length - 1
          ? current.medioRadio[currentIndex + medioRadio.currentIndex]
          : null

      if (!medioRadio.currentTrack) {
        next = current.medioRadio[1]
        medioRadio.currentTrack = 1
      }

      if (next && medioRadio.currentTrack < current.medioRadio.length) {
        medioRadio.currentTrack++

        medioRadio.checkIfHeard(next.id, next.liked, next.artist)

        document.querySelector('.track-cover img').src = next.image_path
        document.querySelector('.medio-radio-title').textContent = next.title
        document.querySelector('.medio-radio-artist').textContent = 'by ' + next.artist
        document.querySelector('.medio-radio-artist').href = `https://beta.udio.com/creators/${next.artist}`
        document.querySelector('.medio-radio-title').href = `https://beta.udio.com/songs/${next.id}`

        medioRadio.trackId = next.id
        medioRadio.trackUserId = next.user_id

        if (next.liked) {
          document.querySelector('#medio-hearted').style.display = 'block'
          document.querySelector('#medio-unhearted').style.display = 'none'
        } else {
          document.querySelector('#medio-hearted').style.display = 'none'
          document.querySelector('#medio-unhearted').style.display = 'block'
        }

        audio.src = next.song_path + '?t=' + new Date().getTime()
        audio.load()

        if (!paused) audio.play()

        const medioRadioWrapper = document.querySelector('#medio-radio')
        medioRadioWrapper.classList.add('playing')

        const playButton = document.querySelector('.medio-radio-play')
        const pauseButton = document.querySelector('.medio-radio-pause')

        playButton.style.display = 'none'
        pauseButton.style.display = 'block'

        document.querySelector('.medio-radio-broadcast').textContent = `Track ${
          medioRadio.currentIndex + 1
        } of ${current.medioRadio.length}`
      } else {
        medioRadio.currentIndex = 0
        medioRadio.currentTrack = 0
        medioRadio.page = 0
        medioRadio.hasSeen = []
        medioRadio.broadcastLength = 0
        document.querySelector('#medio-radio').outerHTML = medioRadioUI.builder
        document.querySelector('#medio-radio').style.display = 'block'

        medioRadio.deploy()
        medioRadio.dj.check()
      }
    }

    if (medioRadio.fakeAds && !medioRadio.hasPlayedAd) {
      const random = Math.floor(Math.random() * 6) + 1
      if (random === 1) {
        medioRadio.prepareFakeAd()
      } else {
        run()
      }
    } else {
      run()
    }
  },

  prepareFakeAd: () => {
    const pauseButton = document.querySelector('.medio-radio-pause')
    pauseButton.click()
    const adBreak = document.getElementById('medio-radio-commercial-ad')
    adBreak.classList.remove('fade-out')
    adBreak.style.opacity = '0'
    adBreak.style.display = 'block'
    adBreak.classList.add('fade-in')
    medioRadio.hasPlayedAd = false
    medioRadio.playFakeAd(() => {
      medioRadio.hasPlayedAd = true
      medioRadio.nextTrack()
      adBreak.classList.add('fade-out')
      medioRadio.hasPlayedAd = false
      setTimeout(() => {
        if (adBreak.classList.contains('fade-out')) {
          adBreak.style.display = 'none'
        }
      }, 3100)
    })
  },

  getTrackMP3: async id => {
    return await fetch(`https://beta.udio.com/api/songs?songIds=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(tracks => {
        return tracks.songs[0]
      })
  },

  playFakeAd: async callback => {
    const adList = [
      'iHCv7YKjkTgkkLHSrshgbJ',
      'jWdtA1GAJxqCSg2eNKB6zP',
      '7pGA5AdMJMpwTfknzhPsFG',
      '2QbwaSWZFoZwxUszDXZ2aU',
      '7nxirRBFrqLv4R4P1YF2As',
      'mTLMcY3weURvEjGTVTJ5nR',
      'ppWDz6fC19pLwCNb3TrsuG',
      'rYogkoXmT7vwk8yv62fzzN',
      'wFSFSbgcvJmGUJJGc3vsPk',
      'xsazdTfopYLD8GCPNuCmXD',
      '5WrVwsSdHP1vMbzKPMuRjH',
      'kfqvbUSC28cXzg7UYZp91L',
      'njb6SsJws6YSZtG8KAuDZ3',
      'aubmyehjrRattpHztWfz1V',
      'viTYnb8ozzuZD7AnATobgi',
      'dkSAoALnmxJdnUP5ujraZJ',
      'dpUS4fp5t4ce5GKXviWiPK',
      '9RtXdXF6SDir2vzEggwcs7',
      'tNs43mKM492gmmJMZJWygB',
      'gZ22wJa85HdNnENLZyqm3Q',
      'x5nDSdJDu99Lttzf5A28TG',
      '72s6vyeda4kwhy9gTRni9e',
      '5wUrrvs2WmU4gRWbzptXkg',
      'rrDzJ94HQ3bsmKePNbtpAT',
      '5FcHQUL5C7eAxJsbi1ye3F',
      'ayD7x7DME63YsNYYwnuN8i',
      'eFtujSSpqdSiscaxUjUB5x',
      'ngU9nbKfZ8ECs2TY6cvEwq',
      'tRy3d6HHSMoaXKrzMDcVux',
      '7Gap1SJR5Tmr5ozrdJr6a3',
      'wX4Cc8B4R4huH2nwCzJJE6',
      'i671GGHuxqcTxUuseixs4W',
      'ePgogiAaLzNhKg1ajrdNok',
      'jg8ztGBsobTiPJMq9msiyb',
      'qM9iaoazayE5yuFVTv5Wsc',
      'gbqpnQzUJW6mnKMzofvKmL',
      'eFLVKLqbqgmsHUtJMrU74g',
      'fiMvZSASfeEucjn3qZ4DNQ',
      'hYV6c5ozTLaFyao76UAaZK',
      'bCyXvGbBDcX5BWy4sj5FRe',
    ]
    const randomAd = adList[Math.floor(Math.random() * adList.length)]
    const data = await medioRadio.getTrackMP3(randomAd)
    const ad = document.createElement('audio')

    document.querySelector('#fakead-title').textContent = `"${data.title}"`
    document.querySelector('#fakead-artist').textContent = `by ${data.artist}`
    ad.src = data.song_path + '?t=' + new Date().getTime()
    ad.volume = 0
    ad.play()

    let fadeInInterval = setInterval(() => {
      if (ad.volume < 1) {
        ad.volume = Math.min(ad.volume + 0.01, 1)
      } else {
        clearInterval(fadeInInterval)
      }
    }, 20)

    ad.addEventListener('timeupdate', () => {
      if (ad.duration - ad.currentTime <= 2) {
        let fadeOutInterval = setInterval(() => {
          if (ad.volume > 0) {
            ad.volume = Math.max(ad.volume - 0.01, 0)
          } else {
            clearInterval(fadeOutInterval)
          }
        }, 20)
      }
    })

    ad.addEventListener('ended', () => {
      ad.remove()
      callback()
      medioRadio.trackListen(data.id)
    })
  },

  search: async () => {
    let pageSize = parseInt(medioRadio.broadcastLength) || 30
    let page = medioRadio.page

    if (medioRadio.listType === 'tags') {
      let genres = medioRadio.genres.split(',')
      for (const genre of genres) {
        await fetch(`https://beta.udio.com/api/songs/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchQuery: {
              searchTerm: genre,
            },
            pageParam: page,
            pageSize: pageSize,
          }),
        })
          .then(response => response.json())
          .then(tracks => {
            medioRadio.processTracks(tracks.data)
          })

        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      medioRadio.trimTrackList(genres, medioRadio.broadcastLength)
    } else if (medioRadio.listType === 'trending' || medioRadio.listType === 'mostliked') {
      let query = {
        maxAgeInHours: 168,
        sort: 'cache_trending_score',
        searchTerm: '',
      }
      switch (medioRadio.listType) {
        case 'mostliked':
          query = {
            maxAgeInHours: 168,
            searchTerm: '',
            sort: 'likes',
          }
          break
        case 'trending':
          query = {
            maxAgeInHours: 168,
            sort: 'cache_trending_score',
            searchTerm: '',
          }
          break
      }
      await fetch(`https://beta.udio.com/api/songs/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery: query,
          pageParam: page,
          pageSize: pageSize,
        }),
      })
        .then(response => response.json())
        .then(tracks => {
          let result = tracks.data
          if (medioRadio.shuffle) {
            result = result.sort(() => 0.5 - Math.random())
          }
          medioRadio.processTracks(result)
        })
    } else if (medioRadio.listType === 'playlist') {
      await fetch(`https://beta.udio.com/api/playlists?id=${medioRadio.playlistId}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(async tracks => {
          if (!tracks.playlists[0]) {
            alert('No playlist found. Please try again.')
            return
          }
          const songIds = tracks.playlists[0].song_list.join(',')

          await fetch(`https://beta.udio.com/api/songs?songIds=${songIds}`, {
            method: 'GET',
          })
            .then(response => response.json())
            .then(tracks => {
              let result = tracks.songs
              if (medioRadio.shuffle) {
                result = result.sort(() => 0.5 - Math.random())
              }
              medioRadio.processTracks(result)
            })
        })
    } else if (medioRadio.listType === 'artist') {
      await fetch(`https://beta.udio.com/api/songs/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery: {
            sort: 'created_at',
            userId: medioRadio.artistId,
          },
          pageParam: page,
          pageSize: pageSize,
        }),
      })
        .then(response => response.json())
        .then(tracks => {
          let result = tracks.data
          if (medioRadio.shuffle) {
            result = result.sort(() => 0.5 - Math.random())
          }
          medioRadio.processTracks(result)
        })
    }

    await new Promise(resolve => setTimeout(resolve, 300))
    document.getElementById('medio-radio').innerHTML = medioRadioUI.player

    const current = await chrome.storage.local.get('medioRadio')

    const close = document.getElementById('medio-radio-close')
    close.addEventListener('click', () => {
      medioRadio.currentIndex = 0
      medioRadio.currentTrack = 0
      medioRadio.page = 0
      medioRadio.hasSeen = []
      medioRadio.broadcastLength = 0
      document.getElementById('medio-radio').outerHTML = medioRadioUI.builder
      document.getElementById('medio-radio').style.display = 'none'
      medioRadio.dj.check()
      medioRadio.deploy()
    })

    if (!medioRadio.hasAnnouncer) {
      medioRadio.start(current)

      const playButton = document.querySelector('.medio-radio-play')
      playButton.click()
    } else {
      document.getElementById('medio-radio-loading').style.display = 'block'
      await medioRadio.loadTalking('')
    }
  },

  loadTalking: async state => {
    const current = await chrome.storage.local.get('medioRadio')
    let id = document.getElementById('medio-radio').getAttribute('data-id')
    let currentIndex = current.medioRadio.findIndex(track => track.id === id)

    if (!id) {
      id = current.medioRadio[0].id
      currentIndex = 0
    }

    let next =
      currentIndex !== -1 && currentIndex < current.medioRadio.length - 1
        ? current.medioRadio[currentIndex + medioRadio.currentIndex]
        : null

    if (!medioRadio.currentTrack) {
      next = current.medioRadio[0]
    }

    function done(data) {
      medioRadio.djMessage = data.choices[0].message.content

      medioRadio.textToSpeech(medioRadio.djMessage, medioRadio.djVoice, data => {
        medioRadio.djBuffer = data
        document.getElementById('medio-radio-loading').style.display = 'none'
        medioRadio.start(current)
      })
    }

    if (state !== '') {
      await medioRadio.dj.loadExtra(next, 'intro', data => {
        done(data)
      })
    } else {
      await medioRadio.dj.load(next, 'intro', data => {
        done(data)
      })
    }
  },

  textToSpeech: async (message, voice, callback) => {
    if (medioRadio.voiceAPIType === 'elevenlabs') {
      apiMedioAI.elevenLabsTalk(message, voice, data => {
        callback(data)
      })
    } else if (medioRadio.voiceAPIType === 'openai') {
      apiMedioAI.openAITalk(message, voice, data => {
        callback(data)
      })
    }
  },

  processTracks: async tracks => {
    if (tracks.length === 0) {
      utilitiesMedioAI.showNotification('No tracks found. Please increase # of tracks.', 'error')
      medioRadio.deploy()
      return
    }
    const current = await chrome.storage.local.get('medioRadio')
    const dups = []
    const removeDuplicates = tracks.filter(track => {
      if (!dups.includes(track.id)) {
        dups.push(track.id)
        return track
      }
    })
    const result = await chrome.storage.local.get('medioRadioBanned');
    const bannedTracks = result.medioRadioBanned || [];
    const filtered = removeDuplicates.filter(track => !bannedTracks.includes(track.id));

    for (const track of filtered) {
      current.medioRadio.push(track)
    }
    await chrome.storage.local.set({ medioRadio: current.medioRadio })
  },

  trimTrackList: async (genres, length) => {
    const current = await chrome.storage.local.get('medioRadio')
    const trimmed = current.medioRadio.slice(0, genres.length * length)
    let result = trimmed
    if (medioRadio.shuffle) {
      result = trimmed.sort(() => 0.5 - Math.random())
    }
    await chrome.storage.local.set({ medioRadio: result })
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
      const openaikey_voice = await utilitiesMedioAI.getSettings('openaiapikey_voice')
      const elevenlabskey_voice = await utilitiesMedioAI.getSettings('elevenlabsapikey_voice')
      const openrouterapikey = await utilitiesMedioAI.getSettings('openrouterapikey')

      if ((openaikey || openrouterapikey) && (openaikey_voice || elevenlabskey_voice)) {
        document.getElementById('medioDJSettings').style.display = 'block'
        if (elevenlabskey_voice) {
          medioRadio.voiceAPIType = 'elevenlabs'
          medioRadio.dj.buildElevenLabVoices()
        } else if (openaikey_voice) {
          medioRadio.voiceAPIType = 'openai'
        }
      } else {
        document.getElementById('medioDJNotice').style.display = 'block'
      }
    },

    buildElevenLabVoices: () => {
      fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        response.json().then(data => {
          let voices = data.voices
          let voiceList = ''
          for (const voice of voices) {
            let selected = ''
            if (voice.voice_id === '29vD33N1CtxCmqQRPOHJ') {
              selected = 'selected'
            }
            voiceList += `<option ${selected} value="${voice.voice_id}">${voice.name}</option>`
          }
          document.getElementById('medio-radio-dj-voice').innerHTML = voiceList
        })
      })
    },

    length: () => {
      switch (medioRadio.djLength) {
        case 'very-short':
          return `Keep your response to only 1 small sentence. Keep it short, punchy and engaging.`
        case 'short':
          return `Keep your response to only 1-2 small sentences. Keep it short, punchy and engaging.`
        case 'medium':
          return `Keep your response to only 2-3 small sentences. Keep it short, punchy and engaging.`
        case 'long':
          return `Keep your response to only 3-4 small sentences. Keep it short, punchy and engaging.`
      }
    },

    load: async (data, state, callback) => {
      if (!data) return
      const aiLoading = document.querySelector('#aiLoading')
      if (aiLoading) {
        aiLoading.style.display = 'flex'
        const nextButton = document.querySelector('.medio-radio-next')
        nextButton.disabled = true
        nextButton.classList.add('disabled')
      }
      let genres = ''
      if (medioRadio.genres) {
        genres = `The radio station has these genres, of which set the vibe for the radio broadcast: ${medioRadio.genres}.`
      }

      let length = medioRadio.dj.length()
      let exclude = `Never include URLs. Only do the text, do not add actions or notes, just the text.`

      let system = ''
      switch (state) {
        case 'intro':
          system = `You are host of a radio station called "${medioRadio.radioName}". You are about to introduce the radio station and the next track. The radio station is going to play ${medioRadio.broadcastLength} songs make sure to talking about how many tracks. 
          
          ${genres} ${length} ${exclude}`
          break
        case 'transition':
          system = `You are host of a radio station called "${medioRadio.radioName}". You are about to introduce a new track to keep the listeners engaged. 
          
          ${genres} ${length} ${exclude}`
          break
        case 'outro':
          system = `You are host of a radio station called "${medioRadio.radioName}". You are about to introduce a new track as the last track of the radio broadcast for the outro.  
          
          ${genres} ${length} ${exclude}`
          break
      }

      system += medioRadio.djPersonality

      const request = `You need to write the ${state} for the next track for the radio broadcast. Here is the information for the track. Do not repeat the lyrics. Do not include actions or notes, just the text. ${length}
      
      Title: ${data.title} 
      Artist: ${data.artist}
      Genres: ${data.tags.join(', ')}
      Lyrics: ${data.lyrics}`

      await apiMedioAI.apiRouter(
        [
          {
            role: 'system',
            content: system,
          },
          {
            role: 'user',
            content: request,
          },
        ],
        false,
        null,
        request,
        data => {
          if (callback) callback(data)
        }
      )
    },

    loadExtra: async (data, state, callback) => {
      if (!data) return
      const aiLoading = document.querySelector('#aiLoading')
      if (aiLoading) {
        aiLoading.style.display = 'flex'
        const nextButton = document.querySelector('.medio-radio-next')
        nextButton.disabled = true
        nextButton.classList.add('disabled')
      }

      let length = medioRadio.dj.length()
      let system = ''
      let request = ''
      switch (state) {
        case 'commercial':
          system = `You are radio commercial advertiser. You create engaging and memorable commercials for the radio station. You are about to introduce a new commercial to keep the listeners engaged. Only respond with the commercial script as text only, do not include any notes, or actions, purely voice reading the text. Make an ad for fake movies, tv shows, products, lawyers, political campaigns, anything funny and random. Do not wrap the text with quotes. Do not introduce yourself, only provide the text. Provide as plain text and do-not wrap in quotes. 
          
          ${length}`

          request = `You need to write a commercial for radio station. Make up a product, psa, or lawyer/politican campaign, make up everything so that it is fun and wacky. Always include a call to action that is fake and fun. Do not include actions or notes, just the text. `
          break
        case 'caller':
          system = `You are a caller calling in onto a radio station. You can be a fan, a critic, or a random person calling in. You can talk about love stories, crazy and wacky stories, tell jokes, keep it interesting as if you were a caller calling in. Do not include host talking, just provide a strange caller calling in. Do not introduce yourself, only provide the text. Provide as plain text and do-not wrap in quotes. 
          
          ${length}`

          request = `Write the script for a caller calling into the radio station. Make up a story, make up everything so that it is fun and wacky. Here is information about the track that is about to play next incase the caller wants to talk about it, but the caller can talk about literally anything as long as it is funny, interesting, or engaging.
      
      Track Title: ${data.title} 
      Music Artist: ${data.artist}
      Song Lyrics: ${data.lyrics}`
          break
      }

      system += medioRadio.djPersonality

      await apiMedioAI.apiRouter(
        [
          {
            role: 'system',
            content: system,
          },
          {
            role: 'user',
            content: request,
          },
        ],
        false,
        null,
        request,
        data => {
          if (callback) callback(data)
        }
      )
    },

    play: async (state = '', callback) => {
      const audio = document.getElementById('medio-radio-audio')
      audio.pause()
      let voiceMP3 = medioRadio.djBuffer

      document.querySelector('#dj-text').innerHTML = medioRadio.djMessage

      if (state === 'commercial') {
        const adSongs = [
          'ftCaCiWMM88RYFUCEAWrap',
          'chigr7KLyDnd4KdTERBQzN',
          'dUuFkKYCiV2w6JQ8BfdVkK',
          'tpVdVna96CEyZdYPVmrPj3',
          'i7HZLPXwYW8YrPESnZrZG1',
          '3x3NoNsLhnQtKUyzevUYtr',
          'jse3Go759VSuZHUiepP5hF',
          '5LH1CCjBRgbi7A3JfmMcJL',
          'hDvpBP6NBGX3xrhLuVha58',
          'jffzH3NBrzXbpfkyKKMRWi',
          '9dhX9jwRnUtTHT1JNXckgV',
          'uvAJxjv1PqM9HnNqj5bKkq',
        ]
        const randomAd = adSongs[Math.floor(Math.random() * adSongs.length)]
        const data = await medioRadio.getTrackMP3(randomAd)

        voiceMP3 = medioRadio.djBuffer
        bgMusic = data.song_path + '?t=' + new Date().getTime()
      } else if (state === 'caller') {
        const callerSongs = [
          'nhsSf44zYcid8UbUm1CuVM',
          'vb5rQ1Jf8GG6DojvdKRfGj',
          'h6rQSea7Dkw3ha6ALLb4s5',
          'aS9fJBeSXt2SHZ7sQ5zzKM',
          'pVTv8VRtuV9PPiUjD9gFNF',
          '9zdQemuJD8W7QQjprSeWMj',
          '4AsfaoYUwQDKAF9iPErQoi',
          'h84SNhvqzuHp9GP4vRfjKh',
          'mu5WEPfK2BUP6Tp2MEsbhf',
        ]
        const randomAd = callerSongs[Math.floor(Math.random() * callerSongs.length)]
        const data = await medioRadio.getTrackMP3(randomAd)

        voiceMP3 = medioRadio.djBuffer
        bgMusic = data.song_path + '?t=' + new Date().getTime()
      } else {
        const data = await medioRadio.getTrackMP3(medioRadio.djMusic)
        bgMusic = data.song_path + '?t=' + new Date().getTime()
      }

      const bgAudio = document.getElementById('medio-radio-background')
      bgAudio.src = bgMusic
      bgAudio.load()
      bgAudio.volume = 0
      bgAudio.play()

      const djWrapper = document.getElementById('dj-wrapper')

      djWrapper.style.opacity = '0'
      djWrapper.style.display = 'block'
      djWrapper.classList.add('fade-in')

      let volume = 0
      const fadeInInterval = setInterval(() => {
        if (volume < 0.25) {
          volume += 0.01
          if (volume > 1) {
            volume = 1
          } else if (volume < 0) {
            volume = 0
          }
          bgAudio.volume = volume
        } else {
          clearInterval(fadeInInterval)
        }
      }, 100)

      setTimeout(() => {
        const voiceAudio = document.getElementById('medio-radio-dj')
        if (voiceAudio) {
          voiceAudio.src = voiceMP3
          voiceAudio.load()
          voiceAudio.volume = 1
          voiceAudio.play()

          voiceAudio.addEventListener('ended', () => {
            let volume = 0
            audio.volume = 0
            audio.play()

            const playButton = document.querySelector('.medio-radio-play')
            const pauseButton = document.querySelector('.medio-radio-pause')

            const medioRadioWrapper = document.querySelector('#medio-radio')
            medioRadioWrapper.classList.add('playing')
            playButton.style.display = 'none'
            pauseButton.style.display = 'block'

            const fadeInInterval = setInterval(() => {
              if (volume < 1) {
                volume += 0.01
                if (volume > 1) {
                  volume = 1
                } else if (volume < 0) {
                  volume = 0
                }
                audio.volume = volume
              } else {
                clearInterval(fadeInInterval)
              }
            }, 100)

            fadeOut()

            djWrapper.classList.add('fade-out')
          })
        }
      }, 2000)

      const fadeOut = () => {
        let volume = 0.25
        const fadeOutInterval = setInterval(async () => {
          if (volume > 0) {
            volume -= 0.01
            if (volume < 0) volume = 0
            bgAudio.volume = volume
          } else {
            clearInterval(fadeOutInterval)

            bgAudio.pause()
            medioRadio.shouldAnnounce = true

            djWrapper.style.display = 'none'
            djWrapper.classList.remove('fade-out')

            const medioRadioWrapper = document.querySelector('#medio-radio')
            const current = await chrome.storage.local.get('medioRadio')
            const currentIndex = current.medioRadio.findIndex(
              track => track.id === medioRadioWrapper.getAttribute('data-id')
            )
            if (state === '' || state === 'caller' || state === 'commercial') {
              if (
                current.medioRadio[currentIndex + medioRadio.currentIndex] &&
                !medioRadio.hasSeen.includes(currentIndex + medioRadio.currentIndex)
              ) {
                medioRadio.hasSeen.push(currentIndex + medioRadio.currentIndex)
                let state = 'transition'
                if (currentIndex + medioRadio.currentIndex === current.medioRadio.length - 1) state = 'outro'
                if (!medioRadio.hasAnnouncer) return

                const randomChance = Math.floor(Math.random() * 6) + 1
                if (randomChance === 1 && medioRadio.hasAds) {
                  const callerOrAd = Math.floor(Math.random() * 2) + 1

                  if (callerOrAd === 1) {
                    state = 'commercial'
                  } else {
                    state = 'caller'
                  }

                  let voices = ['alloy', 'fable', 'onyx', 'shimmer', 'echo', 'nova']

                  if (medioRadio.voiceAPIType === 'elevenlabs') {
                    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    })
                    const data = await response.json()
                    voices = data.voices
                  }

                  let randomVoice = Math.floor(Math.random() * voices.length)

                  if (state === 'caller') {
                    document.querySelector(
                      '#announcer-icon'
                    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M8 3C8.5 3 10.5 7.5 10.5 8C10.5 9 9 10 8.5 11C8 12 9 13 10 14C10.3943 14.3943 12 16 13 15.5C14 15 15 13.5 16 13.5C16.5 13.5 21 15.5 21 16C21 18 19.5 19.5 18 20C16.5 20.5 15.5 20.5 13.5 20C11.5 19.5 10 19 7.5 16.5C5 14 4.5 12.5 4 10.5C3.5 8.5 3.5 7.5 4 6C4.5 4.5 6 3 8 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/><animateTransform attributeName="transform" begin="0.6s;lineMdPhoneCallLoop0.begin+2.6s" dur="0.5s" type="rotate" values="0 12 12;15 12 12;0 12 12;-12 12 12;0 12 12;12 12 12;0 12 12;-15 12 12;0 12 12"/></path><path stroke-dasharray="4" stroke-dashoffset="4" d="M14 7.04404C14.6608 7.34734 15.2571 7.76718 15.7624 8.27723M16.956 10C16.6606 9.35636 16.2546 8.77401 15.7624 8.27723" opacity="0"><set id="lineMdPhoneCallLoop0" attributeName="opacity" begin="0.7s;lineMdPhoneCallLoop0.begin+2.7s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s;lineMdPhoneCallLoop0.begin+2.7s" dur="0.2s" values="4;8"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.3s;lineMdPhoneCallLoop0.begin+3.3s" dur="0.3s" values="0;4"/><set attributeName="opacity" begin="1.6s;lineMdPhoneCallLoop0.begin+3.6s" to="0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M20.748 9C20.3874 7.59926 19.6571 6.347 18.6672 5.3535M15 3.25203C16.4105 3.61507 17.6704 4.3531 18.6672 5.3535" opacity="0"><set attributeName="opacity" begin="1s;lineMdPhoneCallLoop0.begin+3s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s;lineMdPhoneCallLoop0.begin+3s" dur="0.2s" values="10;20"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.5s;lineMdPhoneCallLoop0.begin+3.5s" dur="0.3s" values="0;10"/><set attributeName="opacity" begin="1.8s;lineMdPhoneCallLoop0.begin+3.8s" to="0"/></path></g></svg>`
                    document.querySelector('#dj-wrapper h3').innerHTML = `Caller`
                  } else if (state === 'commercial') {
                    document.querySelector(
                      '#announcer-icon'
                    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 15v-4a2 2 0 0 1 4 0v4m-4-2h4m6-4v6h-1.5a1.5 1.5 0 1 1 1.5-1.5"/></g></svg>`
                    document.querySelector('#dj-wrapper h3').innerHTML = `Commercial Break`
                  }

                  await medioRadio.dj.loadExtra(
                    current.medioRadio[currentIndex + medioRadio.currentIndex + 1],
                    state,
                    data => {
                      medioRadio.djMessage = data.choices[0].message.content
                      medioRadio.textToSpeech(
                        medioRadio.djMessage,
                        voices[randomVoice].voice_id,
                        async data => {
                          medioRadio.djBuffer = data
                          const aiLoading = document.querySelector('#aiLoading')
                          if (aiLoading) {
                            aiLoading.style.display = 'none'
                            const nextButton = document.querySelector('.medio-radio-next')
                            nextButton.disabled = false
                            nextButton.classList.remove('disabled')
                          }
                          document.getElementById('medio-radio-loading').style.display = 'none'
                        }
                      )
                    }
                  )
                } else {
                  document.querySelector(
                    '#announcer-icon'
                  ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c2.67 0 8 1.34 8 4v2H1v-2c0-2.66 5.33-4 8-4m7.76-9.64c2.02 2.2 2.02 5.25 0 7.27l-1.68-1.69c.84-1.18.84-2.71 0-3.89zM20.07 2c3.93 4.05 3.9 10.11 0 14l-1.63-1.63c2.77-3.18 2.77-7.72 0-10.74z"/></svg>`
                  document.querySelector('#dj-wrapper h3').innerHTML = `Announcer`
                  await medioRadio.dj.load(
                    current.medioRadio[currentIndex + medioRadio.currentIndex + 1],
                    state,
                    data => {
                      medioRadio.djMessage = data.choices[0].message.content
                      medioRadio.textToSpeech(medioRadio.djMessage, medioRadio.djVoice, data => {
                        medioRadio.djBuffer = data
                        const aiLoading = document.querySelector('#aiLoading')
                        if (aiLoading) {
                          aiLoading.style.display = 'none'
                          const nextButton = document.querySelector('.medio-radio-next')
                          nextButton.disabled = false
                          nextButton.classList.remove('disabled')
                        }
                      })
                    }
                  )
                }
              }
            } else {
              callback()
            }
          }
        }, 50)
      }
    },
  },
}

const medioRadioTopActions = /* html */ `
      <div id="medio-radio-topactions" class="flex items-center space-x-1 text-light-gray">
      <button id="medio-radio-trippy" style="display:none">
        <svg id="medio-trippy-off"  xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 16a96.11 96.11 0 0 0-96 96c0 24 12.56 55.06 33.61 83c21.18 28.15 44.5 45 62.39 45s41.21-16.81 62.39-45c21.05-28 33.61-59 33.61-83a96.11 96.11 0 0 0-96-96m49.61 169.42C160.24 208.49 140.31 224 128 224s-32.24-15.51-49.61-38.58C59.65 160.5 48 132.37 48 112a80 80 0 0 1 160 0c0 20.37-11.65 48.5-30.39 73.42M120 136a40 40 0 0 0-40-40a16 16 0 0 0-16 16a40 40 0 0 0 40 40a16 16 0 0 0 16-16m-40-24a24 24 0 0 1 24 24a24 24 0 0 1-24-24m96-16a40 40 0 0 0-40 40a16 16 0 0 0 16 16a40 40 0 0 0 40-40a16 16 0 0 0-16-16m-24 40a24 24 0 0 1 24-24a24 24 0 0 1-24 24m0 48a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8"/></svg>
        <svg id="medio-trippy-on" style="display:none; color: #1BD4B3" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M128 24a88 88 0 0 0-88 88c0 48.6 56 120 88 120s88-71.4 88-120a88 88 0 0 0-88-88m-24 120a32 32 0 0 1-32-32a8 8 0 0 1 8-8a32 32 0 0 1 32 32a8 8 0 0 1-8 8m48 0a8 8 0 0 1-8-8a32 32 0 0 1 32-32a8 8 0 0 1 8 8a32 32 0 0 1-32 32" opacity="0.2"/><path d="M128 16a96.11 96.11 0 0 0-96 96c0 24 12.56 55.06 33.61 83c21.18 28.15 44.5 45 62.39 45s41.21-16.81 62.39-45c21.05-28 33.61-59 33.61-83a96.11 96.11 0 0 0-96-96m49.61 169.42C160.24 208.49 140.31 224 128 224s-32.24-15.51-49.61-38.58C59.65 160.5 48 132.37 48 112a80 80 0 0 1 160 0c0 20.37-11.65 48.5-30.39 73.42M120 136a40 40 0 0 0-40-40a16 16 0 0 0-16 16a40 40 0 0 0 40 40a16 16 0 0 0 16-16m-40-24a24 24 0 0 1 24 24a24 24 0 0 1-24-24m96-16a40 40 0 0 0-40 40a16 16 0 0 0 16 16a40 40 0 0 0 40-40a16 16 0 0 0-16-16m-24 40a24 24 0 0 1 24-24a24 24 0 0 1-24 24m0 48a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8"/></g></svg>
      </button>

      <button id="medio-radio-lights"  class="cursor-pointer">
        <svg id="medio-lights-on" style="display:none;color: #1AD1A9" xmlns="http://www.w3.org/2000/svg" width="1.9em" height="1.9em" viewBox="0 0 24 24"><g fill="none"><rect width="14" height="10" x="5" y="7" stroke="currentColor" rx="2"/><rect width="5" height="6" x="12" y="9" fill="currentColor" rx="1"/></g></svg>
        <svg id="medio-lights-off" xmlns="http://www.w3.org/2000/svg" width="1.9em" height="1.9em" viewBox="0 0 24 24"><g fill="none"><rect width="14" height="10" x="5" y="7" stroke="currentColor" rx="2"/><rect width="5" height="6" x="7" y="9" fill="currentColor" rx="1"/></g></svg>
      </button>

       <button id="medio-radio-expander" >
        <svg id="medio-contract-off"  xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><g fill="currentColor"><path d="M11.354 9.354a.5.5 0 0 1-.708-.708l4-4a.5.5 0 0 1 .708.708zm-6 6a.5.5 0 0 1-.708-.708l4-4a.5.5 0 0 1 .708.708z"/><path d="M5 15.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z"/><path d="M5.5 15a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 1 0zm10-6a.5.5 0 0 1-1 0V5a.5.5 0 0 1 1 0z"/><path d="M11 5.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z"/></g></svg>
        <svg id="medio-contract-on" style="display:none; color: #1AD1A9" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><g fill="currentColor"><path d="M11.707 9.707a1 1 0 0 1-1.414-1.414l4-4a1 1 0 1 1 1.414 1.414z"/><path d="M11 10a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2z"/><path d="M12 9a1 1 0 1 1-2 0V5a1 1 0 1 1 2 0zm-6.293 6.707a1 1 0 0 1-1.414-1.414l4-4a1 1 0 1 1 1.414 1.414z"/><path d="M10 15a1 1 0 1 1-2 0v-4a1 1 0 1 1 2 0z"/><path d="M5 12a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2z"/></g></svg>
      </button>

      <button id="medio-radio-close"><svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="0.88em" viewBox="0 0 1216 1312"><path fill="currentColor" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"/></svg></button>
  </div>`

const medioRadioUI = {
  builder: /* html */ `
    <div id="medio-radio" style="background: #000;display: none">
    ${medioRadioTopActions}

      <div>
       <h2 class="text-2xl flex items-center mb-2">
        <img src="${chrome.runtime.getURL('icon/128x128.png')}" style="width:
      48px; height: 48px; border-radius: 6px; margin-right: 8px" />
       <span>MedioAI Radio</span> <span class="text-sm ml-1" style="color: #1dcca0">v1.6</span></h2>
      
      

       <div class="flex space-x-2 mb-2">
           
      <div class="w-full">

      <h4 class="text-sm text-gray-400 mb-1 mt-3">Type</h4>
      <select id="medio-radio-type" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
        <option value="tags">Tags</option>
        <option value="playlist">Playlist</option>
        <option value="artist">Artist</option>
        <option value="trending">Trending</option>
        <option value="mostliked">Most Popular</option>
      </select>
</div>

 <div class="w-full">
       <h4 id="medio-radio-tracklength-title" class="text-sm text-gray-400 mb-1 mt-3"># of Tracks</h4>
      <input  id="medio-radio-length" autocomplete="off" type="number" value="10" class="w-full border bg-gray-1000 text-white p-2 rounded-lg" />
      </div>

<div class="w-full">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">Fake Ads <small class="text-xs opacity-50">*</small></h4>
          <select id="medio-radio-fakeads" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </div>
</div>

 <h4 id="medio-radio-genre-title" class="text-sm text-gray-400 mb-1">Tags <small class="text-xs opacity-50">(comma separated list) *</small></h4>
       <h4 id="medio-radio-playlist-title" style="display:none" class="text-sm text-gray-400 mb-1">Playlist URL <small class="text-xs opacity-50">(url to playlist) *</small></h4>
       <h4 id="medio-radio-artist-title" style="display:none" class="text-sm text-gray-400 mb-1">Artist URL <small class="text-xs opacity-50">(url to profile) *</small></h4>
       <input autocomplete="off" id="medio-radio-genres" class="w-full border bg-gray-1000 text-white p-2 rounded-lg" placeholder="ex. reggae, dubstep, punk rock" />
       <input autocomplete="off" id="medio-radio-playlist-url" class="w-full border bg-gray-1000 text-white p-2 rounded-lg" placeholder="URL here..." style="display:none" />
       <input autocomplete="off" id="medio-radio-artist-url" class="w-full border bg-gray-1000 text-white p-2 rounded-lg" placeholder="URL here..." style="display:none" />

       <div class="flex space-x-2 hidden">
            <div class="w-full">
       <h4 class="text-sm text-gray-400 mb-1 mt-3">Playlist / Profile <small class="text-xs opacity-50">(overwrites tags) *</small></h4>
          <input autocomplete="off" id="medio-radio-playlist" class="w-full border bg-gray-1000 text-white p-2 rounded-lg" placeholder="Full URL here..." />
        </div>
       
      </div>

       <div class="text-sm italic text-gray-400 mb-1 mt-3" id="medioDJNotice" style="display: none">
          Add your <strong>OpenAI or ElevenLabs</strong> API key for Voice and <strong>OpenAI or OpenRouter API key</strong> to enable A.I. DJ Announcer Mode.
       </div>

        <div id="medioDJSettings" style="display: none">
          <div class="flex items-center justify-between mb-1 mt-3">
          <h4>A.I. DJ Announcer Mode</h4>
          <label class="medio-switch">
  <input type="checkbox" id="medio-radio-dj-enabled">
  <span class="medio-slider medio-round"></span>
</label>
          
          <select id="medio-radio-dj-enabled2" style="width: 100px;display: none" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
          
          </div>
        <div id="medioDJSettingsInner" style="display: none">

         
        <div class="flex space-x-2 ">
            <div class="w-full">
<h4 class="text-sm text-gray-400 mb-1 mt-3">Radio Station Name</h4>
          <input id="medio-radio-name" class="w-full border bg-gray-1000 text-white p-2 rounded-lg" placeholder="ex. MedioAI Radio" />
          </div>
          <div class="w-full">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">Flavor <small class="opacity-50">*</small></h4>
          <select id="medio-radio-dj-flavor" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
            <option value="on">Fake Ads + Callers + Announcer</option>
            <option value="off">Only Announcer</option>
          </select>
          </div>
        </div>
          <div class="flex space-x-2">
            <div class="w-full">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">DJ/Ad Duration</h4>
          <select id="medio-radio-dj-length" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
            <option value="very-short">Very Short (1 sentence)</option>
            <option value="short">Short (1-2 sentences)</option>
            <option value="medium">Medium (2-3 sentences)</option>
            <option value="long">Long (4-6 sentences)</option>
          </select>
          </div>
          <div class="w-full">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">Personality</h4>
          <select id="medio-radio-dj-personality" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
            <option value="radio">Sunny Sam</option>
            <option value="simple">Simple Robot</option>
            <option value="funny">Chuckles Charlie</option>
            <option value="serious">Professor Insight</option>
            <option value="metalhead">Metal Mike</option>
            <option value="gta_xrated">DJ Vibez (X-Rated)</option>
            <option value="custom">Custom (Edit in Settings)</option>
          </select>
          </div>
          </div>

          <div class="flex space-x-2">
            <div class="w-full">
            <h4 class="text-sm text-gray-400 mb-1 mt-3 flex items-center space-x-4">
            <span>DJ Voice</span>
            <span id="medioSampleDJVoice" class="cursor-pointer opacity-50 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg></span>
          </h4>
          <select id="medio-radio-dj-voice" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
            <option value="alloy">Alloy (female)</option>
            <option value="onyx">Onyx (male)</option>  
            <option value="shimmer">Shimmer (female)</option>
            <option value="echo">Echo (male)</option>
            <option value="fable">Fable (male)</option>
            <option value="nova">Nova (female)</option>
          </select>
            </div>
            <div class="w-full">
             <h4 class="text-sm text-gray-400 mb-1 mt-3 flex items-center space-x-4">
            <span>DJ Music</span>
            <span id="medioSampleDJBackground" class="cursor-pointer opacity-50 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg></span>
          </h4>
          <select id="medio-radio-dj-music" class="w-full border bg-gray-1000 text-white p-2 rounded-lg">
            <option value="p8xv1atZTeZJiQ5sS44EhE">Funky</option>
            <option value="aF6o9CHB7u6iHMkRYpqJvf">Hip Hop</option>
            <option value="iDEqjSHx32Du3s2EwETjTQ">Reggae</option>
            <option value="qZ63Tcm5Hzrrr1VgmKYT24">Metal</option>
            <option value="9DL8vjFygpPYkH9q8qVtWW">Classical</option>
            <option value="tkDjs2NrrCbnDP2bPkLpfj">Dance</option>
            <option value="nr5ucopcjhfweCbyboaDSR">Country</option>
            <option value="nu6R1cMNRCMiM2z21D1V29">Electro Swing</option>
          </select>
            </div>
          </div>
          </div>
        </div>

        <div class="w-full flex items-center justify-between">
        

        <div class="flex items-center space-x-2">
        
        <button id="medio-radio-deploy" style="background: #E3095D" class="text-white py-2 px-4 rounded-lg mt-3 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><g fill="currentColor"><path fill-rule="evenodd" d="M15 8H5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1M5 6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3z" clip-rule="evenodd"/><path d="M10 12a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/><path fill-rule="evenodd" d="M14.67 1.665a.75.75 0 0 1-.335 1.006l-10 5a.75.75 0 0 1-.67-1.342l10-5a.75.75 0 0 1 1.006.336M11 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" clip-rule="evenodd"/></g></svg>
        
        <span>Start Radio</span></button>

        <button id="medio-toggle-shuffle">
          <svg id="medio-shuffle-off" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22" opacity="0.5"/><path fill="currentColor" d="M16.262 7.477a.75.75 0 0 1 1.06-.015l1.2 1.167a.75.75 0 0 1 0 1.075l-1.2 1.167a.75.75 0 0 1-1.146-.954h-.338c-.511 0-.844 0-1.1.025c-.242.023-.36.062-.444.109c-.084.046-.176.12-.318.307c-.152.2-.323.474-.586.902l-1.52 2.463c-.242.39-.45.729-.652.994c-.218.286-.46.532-.789.713c-.328.18-.666.254-1.025.288c-.336.032-.74.032-1.21.032H6a.75.75 0 0 1 0-1.5h2.162c.511 0 .844 0 1.1-.025c.243-.023.36-.062.444-.11c.084-.045.176-.12.318-.306c.152-.2.323-.475.586-.902l1.52-2.464c.242-.39.45-.728.652-.994c.218-.285.46-.531.789-.712c.328-.18.666-.255 1.025-.289c.336-.031.74-.031 1.21-.031h.37a.75.75 0 0 1 .086-.94"/><path fill="currentColor" d="M9.385 9.77c-.085-.017-.186-.02-.584-.02H6a.75.75 0 0 1 0-1.5h2.858c.313 0 .565 0 .806.045a2.56 2.56 0 0 1 1.405.775c.167.18.299.394.459.653l.03.05a.75.75 0 1 1-1.276.788c-.206-.334-.259-.413-.313-.472a1.063 1.063 0 0 0-.584-.32m3.301 3.259a.75.75 0 0 1 1.032.245c.206.333.259.412.313.471c.151.163.355.277.584.32c.085.016.186.02.584.02h.977a.75.75 0 0 1 1.147-.955l1.2 1.167a.75.75 0 0 1 0 1.075l-1.2 1.167a.75.75 0 0 1-1.147-.955h-1.034c-.313 0-.565 0-.806-.045a2.563 2.563 0 0 1-1.405-.775c-.167-.18-.299-.394-.459-.653l-.03-.05a.75.75 0 0 1 .244-1.032"/></svg>

          <svg id="medio-shuffle-on" style="display:none" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22m4.262-14.523a.75.75 0 0 1 1.06-.015l1.2 1.167a.75.75 0 0 1 0 1.075l-1.2 1.167a.75.75 0 0 1-1.146-.954h-.338c-.511 0-.844 0-1.1.025c-.242.023-.36.062-.444.109c-.084.046-.176.12-.318.307c-.152.2-.323.474-.586.902l-1.52 2.463c-.242.39-.45.729-.652.994c-.218.286-.46.532-.789.713c-.328.18-.666.254-1.025.288c-.336.032-.74.032-1.21.032H6a.75.75 0 0 1 0-1.5h2.162c.511 0 .844 0 1.1-.025c.243-.023.36-.062.444-.11c.084-.045.176-.12.318-.306c.152-.2.323-.475.586-.902l1.52-2.464c.242-.39.45-.728.652-.994c.218-.285.46-.531.789-.712c.328-.18.666-.255 1.025-.289c.336-.031.74-.031 1.21-.031h.37a.75.75 0 0 1 .086-.94M9.385 9.77c-.085-.017-.185-.02-.584-.02H6a.75.75 0 0 1 0-1.5h2.858c.313 0 .565 0 .806.045a2.56 2.56 0 0 1 1.405.775c.167.18.299.394.459.653l.03.05a.75.75 0 1 1-1.276.788c-.206-.334-.259-.413-.313-.472a1.063 1.063 0 0 0-.584-.32m3.301 3.26a.75.75 0 0 1 1.032.244c.206.333.259.412.313.471c.151.163.355.277.584.32c.085.016.186.02.584.02h.977a.75.75 0 0 1 1.147-.955l1.2 1.167a.75.75 0 0 1 0 1.075l-1.2 1.167a.75.75 0 0 1-1.147-.955h-1.034c-.313 0-.565 0-.806-.045a2.563 2.563 0 0 1-1.405-.775c-.167-.18-.299-.394-.459-.653l-.03-.05a.75.75 0 0 1 .244-1.032" clip-rule="evenodd"/></svg>
        </button>

        <div id="radioHelp" class="pt-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 5v.01"/><path d="M12 13.5a1.5 1.5 0 0 1 1-1.5a2.6 2.6 0 1 0-3-4"/></g></svg>
         <div id="radioHelpDesc">
          <p class="text-xs text-gray-400">
          <p><strong>*</strong> If using tags, MedioAI will search and create a list of tracks for # of tracks per tag. ex. 3 tags with 3 each, equal 9 tracks. <em>Banned tracks are omitted.</em></p>
          <p><strong>*</strong> Fake ads have 15% chance of being played at the end of track. Created by the Udio community. (note: overwritten by AI ads)</p>
          <p><strong>*</strong> The DJ mode will announce the track name, username and sometimes comment about the lyrics. </p>
          <p><strong>*</strong> The flavor mode will add fake commercials and callers randomly instead of the announcer. There is a 15% chance to trigger and 50% chance to be either caller or commercial.</p>
         </div>
        </div>
        
        </div>

        <button id="medio-radio-record-toggle" style="display: none" class="text-white py-2 px-4 rounded-lg mt-3 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M6 5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8m7-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2"/></svg>
          <span>Record</span>
        </button>
        </div>
      </div>

      <audio id="medio-radio-mic-check" style="display: none" src="#" preload="auto"></audio>
    </div>`,

  building: /* html */ `
    <div id="medio-radio-building" class="py-12 px-3 w-full text-center">
      <h1 class="mb-4 w-full text-center items-center flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg></h1>
      <h2 class="text-2xl mb-2">Building track list...</h2>
      <p class="text-sm text-gray-400 mb-2">Please wait.</p>
    </div>`,

  player: /* html */ `
   
       <div class="track-cover">
       <img src="https://imagedelivery.net/C9yUr1FL21Q6JwfYYh2ozQ/7c49c1ba-8e70-476f-2693-e988e7a9ae00/width=728,quality=100" />
        <div class="track-play  cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg></div>
        <div class="track-pause"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M12 8v16H8V8zm0-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m12 2v16h-4V8zm0-2h-4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"/></svg></div>
       </div>
      
       <div class="medio-radio-info mb-2">
        <a href="#" target="_blank" class="medio-radio-title block truncate text-3xl font-bold mb-1.5 hover:underline cursor-pointer">Track Title</a>
        <div class="flex space-x-2 items-center justify-between">
          <a href="#" target="_blank" class="medio-radio-artist block hover:underline text-lg text-light-gray cursor-pointer">Track Artist</a>
          
        </div>
       </div>

       <div class="medio-radio-controls">
        <div class="flex space-x-2 items-center justify-between">
          <div class="flex items-center">
            <button class="medio-radio-play cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSPlay0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path fill="#000" stroke="#000" d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPlay0)"/></svg></button>
             <button class="medio-radio-pause" style="display: none"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSPauseOne0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path stroke="#000" stroke-linecap="round" d="M19 18v12m10-12v12"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPauseOne0)"/></svg></button>

            <button id="medio-radio-heart" class="cursor-pointer">
              <svg id="medio-hearted" style="display: none" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#E3095D" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              <svg id="medio-unhearted" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            </button>

            <button id="medio-radio-ban" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1200 1200"><path fill="currentColor" d="M1024.263 175.738c-234.317-234.317-614.192-234.317-848.525 0c-234.317 234.317-234.317 614.192 0 848.525c234.317 234.316 614.192 234.316 848.525 0c234.316-234.318 234.316-614.193 0-848.525m-163.489 57.44L233.193 860.743c-125.257-175.737-109.044-421.274 48.624-578.942s403.219-173.881 578.942-48.624zm106.064 106.048c125.248 175.738 109.031 421.29-48.654 578.942c-157.652 157.683-403.205 173.911-578.942 48.639l627.581-627.581z"/></svg>
              <div class="medio-tooltip">Ban this track from playing.</div>
            </button>

            <button id="medio-follow">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
            </button>
          </div>

          <div id="aiLoading" class="flex items-center space-x-2" style="display:none"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg> <span class="text-xs text-light-gray">AI Preparing...</span></div>
          
          <button class="medio-radio-next flex items-center text-light-gray"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M3.569 5.865A1.332 1.332 0 0 1 5.415 4.8l.646.283l.511.233l.597.283l.676.331l.49.249l.793.414l.564.304l.588.326l.613.349l.633.37l.599.361l.564.349l.778.496l.694.458l.607.414l.517.363l.541.394l.206.154c.71.535.71 1.594.001 2.13l-.43.319l-.273.198l-.664.465l-.595.404l-.443.292l-.73.47l-.81.5l-.581.35l-.615.36l-.62.352l-.593.33l-.566.305l-.538.283l-.748.381l-.673.331l-.773.364l-.744.332l-.224.096a1.332 1.332 0 0 1-1.844-1.065l-.08-.698l-.071-.767l-.053-.689l-.05-.78l-.028-.57l-.024-.605l-.019-.64l-.015-1.026v-.715l.015-1.024l.03-.948l.026-.587l.03-.55l.052-.75l.054-.657l.07-.722zM19 5a1 1 0 0 1 .993.883L20 6v12a1 1 0 0 1-.883.993L19 19h-1a1 1 0 0 1-.993-.883L17 18V6a1 1 0 0 1 .883-.993L18 5z"/></g></svg></button>
        </div>

        
        <div class="mt-2">
          
          <div class="flex items-center space-x-3 mt-1">
            <div class="medio-radio-broadcast text-xs text-light-gray">Track 1 of 1</div>
            <div id="medioHasHeard" style="display: none">
              <svg xmlns="http://www.w3.org/2000/svg" style="color: #E3095D" width="0.8em" height="0.8em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"><circle cx="12" cy="12" r="2"/><circle cx="18" cy="9" r="2"/><path d="M15.318 3.631a9 9 0 1 0 5.368 10.736M20 9V2l2 2"/></g></svg>
              <div class="medio-tooltip">Track has been listened to.</div>
            </div>
            <div id="medioHasNotHeard" style="display: none">
            <svg xmlns="http://www.w3.org/2000/svg" style="color: #1CCFA5" width="0.8em" height="0.8em" viewBox="0 0 24 24"><path fill="currentColor" d="m12.75 12.508l8.5-3.4v5.653a3.25 3.25 0 1 0 1.5 2.74V7.945c0-1.143 0-2.101-.08-2.865a7.747 7.747 0 0 0-.04-.315c-.078-.522-.214-1.008-.479-1.415a2.18 2.18 0 0 0-.62-.63l-.007-.005c-.708-.47-1.503-.437-2.322-.228c-.792.202-1.774.613-2.978 1.117l-2.094.876c-.565.236-1.043.437-1.418.644c-.4.22-.743.48-1.001.868c-.258.388-.366.805-.415 1.259c-.046.426-.046.945-.046 1.557v7.952a3.25 3.25 0 1 0 1.5 2.74v-.001z"/><path fill="currentColor" d="M7.75 2a.75.75 0 0 0-1.5 0v5.76a3.25 3.25 0 1 0 1.5 2.74V5.005c.699.504 1.53.745 2.25.745a.75.75 0 0 0 0-1.5a2.443 2.443 0 0 1-1.488-.552c-.434-.357-.762-.9-.762-1.698" opacity="0.5"/></svg>
            
              <div class="medio-tooltip">Track has not been finished.</div>
            </div>
          </div>
        </div>
        <div class="medio-radio-progress"><div class="audio-radio-bar"></div></div>
        <div class="medio-radio-indicator flex text-xs text-light-gray items-center justify-between w-full">
            <span id="medio-radio-timestamp">0:00</span>
            <span id="medio-radio-duration">0:00</span>
          </div>
       </div>
       
       <div id="medio-radio-loading" style="display: none">
       <div class="block text-center text-2xl">
 <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>
        <h2 class="text-2xl mt-2">AI Preparing...</h2>
       </div>
       </div>

       <div id="medio-radio-commercial" style="display: none">
       <div class="block text-center text-2xl">
 <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 15v-4a2 2 0 0 1 4 0v4m-4-2h4m6-4v6h-1.5a1.5 1.5 0 1 1 1.5-1.5"/></g></svg>
        <h2 class="text-2xl mt-2">Commercial Break</h2>
       </div>
       </div>

       <div id="medio-radio-commercial-ad" style="display: none">
       <div class="block text-center text-2xl">
 <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 15v-4a2 2 0 0 1 4 0v4m-4-2h4m6-4v6h-1.5a1.5 1.5 0 1 1 1.5-1.5"/></g></svg>
        <h2 class="text-2xl mt-2">Commercial Break</h2>
        <h4 id="fakead-title" style="padding: 0 50px" class="tracking-tight text-sm leading-1 text-light-gray italic block mt-2 mb-0">"Title goes here"</h4>
        <h5 id="fakead-artist" class="text-xs text-light-gray mt-0">by aimassive</h5>
       </div>
       </div>

      

       <div id="dj-wrapper" style="display: none">
       <div class="block flex items-center justify-center text-center w-full mb-2 text-2xl">
       <div id="announcer-icon"><svg xmlns="http://www.w3.org/2000/svg"  width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c2.67 0 8 1.34 8 4v2H1v-2c0-2.66 5.33-4 8-4m7.76-9.64c2.02 2.2 2.02 5.25 0 7.27l-1.68-1.69c.84-1.18.84-2.71 0-3.89zM20.07 2c3.93 4.05 3.9 10.11 0 14l-1.63-1.63c2.77-3.18 2.77-7.72 0-10.74z"/></svg></div>
       </div>
        <h3>Announcer</h3>
        <div id="dj-text" class="whitespace-pre-line"></div>
       </div>
       <audio id="medio-radio-audio" style="display: none" src="#" preload="auto"></audio>
       <audio id="medio-radio-background" style="display: none" src="#" preload="auto"></audio>
       <audio id="medio-radio-dj" style="display: none" src="#" preload="auto"></audio>
       
        ${medioRadioTopActions}`,
}

medioRadio.init()
