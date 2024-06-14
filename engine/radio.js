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
  djLength: '1-2',
  shouldAnnounce: false,
  hasAnnouncer: false,
  hasAds: false,
  onlyUnique: true,
  genres: '',
  broadcastLength: 0,
  djMessage: '',
  djVoice: 'alloy',
  djMusic: 'classical-1',
  radioName: 'MedioAI Radio',
  hasSeen: [],
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
    radio: `You are a witty radio host  known as Sunny Sam. You always have a joke ready, talk about the weather, and bring an over-the-top personality to your broadcasts. Your style is engaging, humorous, and you find a way to make even the most mundane topics entertaining. You keep your listeners hooked with your charm and endless energy, ensuring they start their day with a smile. Whether you're sharing the latest weather update, introducing a new track, or wrapping up your show, you always bring a dose of positivity and humor.`,
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

    const djEnabled = document.getElementById('medio-radio-dj-enabled')
    djEnabled.addEventListener('change', () => {
      if (djEnabled.value === 'on') {
        document.getElementById('medioDJSettingsInner').style.display = 'block'
      } else {
        document.getElementById('medioDJSettingsInner').style.display = 'none'
      }
    })

    const voicePreview = document.getElementById('medioSampleDJVoice')
    const musicPreview = document.getElementById('medioSampleDJBackground')

    medioRadio.currentIndex = 0

    voicePreview.addEventListener('click', () => {
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
        audioPlayer.src = chrome.runtime.getURL(`dj/${audioPlayerValue}.wav`)
        audioPlayer.volume = 1
        audioPlayer.load()
        audioPlayer.play()
      }
    })

    musicPreview.addEventListener('click', () => {
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
        audioPlayer.src = chrome.runtime.getURL(`dj/${audioPlayerValue}.mp3`)
        audioPlayer.volume = 1
        audioPlayer.load()
        audioPlayer.play()
      }
    })

    document.getElementById('medio-radio-deploy').addEventListener('click', async () => {
      const genres = document.getElementById('medio-radio-genres').value
      const length = document.getElementById('medio-radio-length').value
      const onlynew = document.getElementById('medio-radio-only-new').value
      const djvoice = document.getElementById('medio-radio-dj-voice').value
      const djpersonality = document.getElementById('medio-radio-dj-personality').value
      const radioName = document.getElementById('medio-radio-name').value
      const djMusic = document.getElementById('medio-radio-dj-music').value
      const djEnabled = document.getElementById('medio-radio-dj-enabled')
      const djAdsEnabled = document.getElementById('medio-radio-dj-flavor')
      const djLength = document.getElementById('medio-radio-dj-length').value
      medioRadio.hasAnnouncer = djEnabled.value === 'on'
      medioRadio.hasAds = djAdsEnabled.value === 'on'
      medioRadio.onlyUnique = onlynew === 'on'
      medioRadio.djMusic = djMusic
      medioRadio.radioName = radioName || 'MedioAI Radio'
      medioRadio.genres = genres
      medioRadio.djVoice = djvoice
      medioRadio.hasSeen = []
      medioRadio.djLength = djLength
      medioRadio.djPersonality = medioRadio.djPersonalities[djpersonality]
      const genresArray = genres.split(',')
      medioRadio.broadcastLength = genresArray.length * parseInt(length)
      medioRadio.build()
    })
  },

  build: async () => {
    document.getElementById('medio-radio').innerHTML = medioRadioUI.building
    setTimeout(async () => {
      chrome.storage.local.set({ medioRadio: [] })
      medioRadio.search()
    }, 0)
  },

  start: async current => {
    document.getElementById('medio-radio').innerHTML = medioRadioUI.player

    if (!current.medioRadio[0]?.id) {
      alert('No tracks found. Please enable repeating tracks or try again.')
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
    ).href = `https://www.udio.com/songs/${current.medioRadio[0].id}`
    document.querySelector('.medio-radio-artist').textContent = 'by ' + current.medioRadio[0].artist
    document.querySelector(
      '.medio-radio-artist'
    ).href = `https://www.udio.com/creators/${current.medioRadio[0].artist}`

    const close = document.getElementById('medio-radio-close')
    close.addEventListener('click', () => {
      document.getElementById('medio-radio').outerHTML = medioRadioUI.builder
      document.getElementById('medio-radio').style.display = 'none'
      medioRadio.dj.check()
      medioRadio.deploy()
    })

    const playButton = document.querySelector('.medio-radio-play')
    const pauseButton = document.querySelector('.medio-radio-pause')
    const nextButton = document.querySelector('.medio-radio-next')
    const medioRadioWrapper = document.querySelector('#medio-radio')
    const audio = document.getElementById('medio-radio-audio')

    const playCoverButton = document.querySelector('.track-play')
    const pauseCoverButton = document.querySelector('.track-pause')

    document.querySelector('.medio-radio-broadcast').textContent = `Track 1 of ${current.medioRadio.length}`

    medioRadio.currentTrack = 0
    audio.src = current.medioRadio[0].song_path + '?t=' + new Date().getTime()

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
        if (medioRadio.djBufferExtra) {
          const current = await chrome.storage.local.get('medioRadio')
          const random = Math.floor(Math.random() * 2) + 1
          const state = random === 1 ? 'caller' : 'commercial'
          medioRadio.dj.play(state, async () => {
            await medioRadio.loadTalking(current)
          })
        } else {
          medioRadio.dj.play()
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

      if (audio.duration)
        indicator.textContent = `${minutes}:${seconds} / ${durationMinutes}:${durationSeconds}`

      if (audio.currentTime === audio.duration) {
        if (medioRadio.hasAnnouncer) {
          medioRadio.nextTrack(true)
          medioRadio.dj.play()
        } else {
          medioRadio.nextTrack()
        }
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
      medioRadio.currentIndex = 1
    } else {
      medioRadio.currentIndex++
    }
    medioRadio.hasListened(id)

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

      document.querySelector('.track-cover img').src = next.image_path
      document.querySelector('.medio-radio-title').textContent = next.title
      document.querySelector('.medio-radio-artist').textContent = 'by ' + next.artist
      document.querySelector('.medio-radio-artist').href = `https://www.udio.com/creators/${next.artist}`
      document.querySelector('.medio-radio-title').href = `https://www.udio.com/songs/${next.id}`

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
  },

  search: async () => {
    const genres = medioRadio.genres.split(',')
    const pageSize = parseInt(medioRadio.broadcastLength) || 30
    let page = medioRadio.page

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

      await medioRadio.loadTalking(current)
    }
  },

  loadTalking: async current => {
    await medioRadio.dj.load(current.medioRadio[0], 'intro', data => {
      medioRadio.djMessage = data.choices[0].message.content
      apiMedioAI.openAITalk(medioRadio.djMessage, medioRadio.djVoice, data => {
        medioRadio.djBuffer = data
        document.getElementById('medio-radio-loading').style.display = 'none'
        medioRadio.start(current)
      })
    })
  },

  processTracks: async tracks => {
    // const hasListened = await chrome.storage.local.get('medioRadioListened')
    const current = await chrome.storage.local.get('medioRadio')
    const dups = []
    const removeDuplicates = tracks.filter(track => {
      if (!dups.includes(track.id)) {
        dups.push(track.id)
        return track
      }
    })
    for (const track of removeDuplicates) {
      current.medioRadio.push(track)
    }
    await chrome.storage.local.set({ medioRadio: current.medioRadio })

    // if (!current.medioRadio.length) {
    //   medioRadio.page++
    //   medioRadio.search()
    // }
  },

  trimTrackList: async (genres, length) => {
    const current = await chrome.storage.local.get('medioRadio')
    const trimmed = current.medioRadio.slice(0, genres.length * length)
    const shuffled = trimmed.sort(() => 0.5 - Math.random())
    console.log({ shuffled })
    await chrome.storage.local.set({ medioRadio: shuffled })
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

    load: async (data, state, callback) => {
      if (!data) return
      const aiLoading = document.querySelector('#aiLoading')
      if (aiLoading) aiLoading.style.display = 'flex'

      let system = ''
      switch (state) {
        case 'intro':
          system = `You are host of a radio station called "${medioRadio.radioName}". You are about to introduce the radio station and the next track. The radio station is going to play ${medioRadio.broadcastLength} songs make sure to talking about how many tracks. The radio station has these genres, of which set the vibe for the radio broadcast: ${medioRadio.genres}. Keep your response to only ${medioRadio.djLength} sentences. Keep it short, punchy and engaging. Never include URLs.`
          break
        case 'transition':
          system = `You are host of a radio station called "${medioRadio.radioName}". You are about to introduce a new track to keep the listeners engaged. Keep your response to only ${medioRadio.djLength} sentences. Keep it short, punchy and engaging. Never include URLS.`
          break
        case 'outro':
          system = `You are host of a radio station called "${medioRadio.radioName}". You are about to introduce a new track as the last track of the radio broadcast for the outro. Keep your response to only ${medioRadio.djLength} sentences. Keep it short, punchy and engaging. Never include URLs.`
          break
      }

      system += medioRadio.djPersonality

      const request = `You need to write the ${state} for the next track for the radio broadcast. Here is the information for the track. Do not repeat the lyrics, just comment on them to introduce the track. Keep it concise, engaging and punchy!
      
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
          if (aiLoading) aiLoading.style.display = 'none'
          if (callback) callback(data)
        }
      )
    },

    loadExtra: async (data, state, callback) => {
      if (!data) return
      const aiLoading = document.querySelector('#aiLoading')
      if (aiLoading) aiLoading.style.display = 'flex'

      let system = ''
      let request = ''
      switch (state) {
        case 'commercial':
          system = `You are radio commercial advertiser. You create engaging and memorable commercials for the radio station. You are about to introduce a new commercial to keep the listeners engaged. Keep your commercial ad-read to only ${medioRadio.djLength} sentences. Keep it short, punchy and engaging. Only respond with the commercial script as text only, do not include any notes, or actions, purely voice reading the text. Make an ad for fake movies, tv shows, products, lawyers, political campaigns, anything funny and random. Do not wrap the text with quotes.`

          request = `You need to write a commercial for radio station. Make up a product, make up everything so that it is fun and wacky. Always include a call to action that is fake and fun. `
          break
        case 'caller':
          system = `You are a caller calling in onto a radio station. You can be a fan, a critic, or a random person calling in. You can talk about love stories, crazy and wacky stories, tell jokes, keep it interesting as if you were a caller calling in. Keep your caller script to only ${medioRadio.djLength} sentences.  Do not wrap the text with quotes.`

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
          if (aiLoading) aiLoading.style.display = 'none'
          if (callback) callback(data)
        }
      )
    },

    play: (state = '', callback) => {
      const audio = document.getElementById('medio-radio-audio')
      audio.pause()
      let voiceMP3 = medioRadio.djBuffer

      document.querySelector('#dj-text').innerHTML = medioRadio.djMessage

      if (state === 'commercial') {
        voiceMP3 = medioRadio.djBufferExtra
        bgMusic = chrome.runtime.getURL(`dj/commercial-1.mp3`)
      } else if (state === 'caller') {
        voiceMP3 = medioRadio.djBufferExtra
        bgMusic = chrome.runtime.getURL(`dj/caller-1.mp3`)
      } else {
        bgMusic = chrome.runtime.getURL(`dj/${medioRadio.djMusic}.mp3`)
      }

      const bgAudio = document.getElementById('medio-radio-background')
      bgAudio.src = bgMusic
      bgAudio.load()
      bgAudio.volume = 0
      bgAudio.play()

      const djWrapper = document.getElementById('dj-wrapper')
      const radioLoading = document.getElementById('medio-radio-loading')
      const radioCommercial = document.getElementById('medio-radio-commercial')
      const radioCaller = document.getElementById('medio-radio-caller')

      if (state === 'commercial') {
        radioLoading.style.display = 'none'
        radioCommercial.style.opacity = '0'
        radioCommercial.style.display = 'block'
        radioCommercial.classList.add('fade-in')
      } else if (state === 'caller') {
        radioLoading.style.display = 'none'
        radioCaller.style.opacity = '0'
        radioCaller.style.display = 'block'
        radioCaller.classList.add('fade-in')
      } else {
        djWrapper.style.opacity = '0'
        djWrapper.style.display = 'block'
        djWrapper.classList.add('fade-in')
      }

      let volume = 0
      const fadeInInterval = setInterval(() => {
        if (volume < 0.2) {
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

      medioRadio.djBufferExtra = null

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
      }, 3000)

      const fadeOut = () => {
        let volume = 0.2
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

            const callerBG = document.getElementById('medio-radio-caller')
            const commercialBG = document.getElementById('medio-radio-commercial')

            if (state === 'caller') {
              callerBG.classList.add('fade-out')
              setTimeout(() => {
                callerBG.style.display = 'none'
                callerBG.classList.remove('fade-out')
              }, 300)
            } else if (state === 'commercial') {
              commercialBG.classList.add('fade-out')
              setTimeout(() => {
                commercialBG.style.display = 'none'
                commercialBG.classList.remove('fade-out')
              }, 300)
            }

            const medioRadioWrapper = document.querySelector('#medio-radio')
            const current = await chrome.storage.local.get('medioRadio')
            const currentIndex = current.medioRadio.findIndex(
              track => track.id === medioRadioWrapper.getAttribute('data-id')
            )
            if (state === '') {
              if (
                current.medioRadio[currentIndex + medioRadio.currentIndex] &&
                !medioRadio.hasSeen.includes(currentIndex + medioRadio.currentIndex)
              ) {
                medioRadio.hasSeen.push(currentIndex + medioRadio.currentIndex)
                let state = 'transition'
                if (currentIndex + medioRadio.currentIndex === current.medioRadio.length - 1) state = 'outro'
                if (!medioRadio.hasAnnouncer) return

                const randomChance = Math.floor(Math.random() * 3) + 1
                if (randomChance === 1 && medioRadio.hasAds) {
                  const random = Math.floor(Math.random() * 2) + 1
                  const djstate = random === 1 ? 'caller' : 'commercial'
                  const voices = ['alloy', 'fable', 'onyx', 'shimmer', 'echo', 'nova']
                  const randomVoice = Math.floor(Math.random() * voices.length)

                  await medioRadio.dj.loadExtra(
                    current.medioRadio[currentIndex + medioRadio.currentIndex],
                    djstate,
                    data => {
                      medioRadio.djMessageExtra = data.choices[0].message.content
                      apiMedioAI.openAITalk(medioRadio.djMessageExtra, voices[randomVoice], async data => {
                        medioRadio.djBufferExtra = data
                        document.getElementById('medio-radio-loading').style.display = 'none'

                        const delay = Math.floor(Math.random() * 20) + 5
                        await new Promise(resolve => setTimeout(resolve, delay * 1000))

                        medioRadio.dj.play(djstate, async () => {
                          medioRadio.dj.load(
                            current.medioRadio[currentIndex + medioRadio.currentIndex + 1],
                            state,
                            async () => {
                              await medioRadio.dj.load(
                                current.medioRadio[currentIndex + medioRadio.currentIndex + 1],
                                state,
                                data => {
                                  medioRadio.djMessage = data.choices[0].message.content
                                  apiMedioAI.openAITalk(medioRadio.djMessage, medioRadio.djVoice, data => {
                                    medioRadio.djBuffer = data
                                  })
                                }
                              )
                            }
                          )
                        })
                      })
                    }
                  )
                } else {
                  await medioRadio.dj.load(
                    current.medioRadio[currentIndex + medioRadio.currentIndex + 1],
                    state,
                    data => {
                      medioRadio.djMessage = data.choices[0].message.content
                      apiMedioAI.openAITalk(medioRadio.djMessage, medioRadio.djVoice, data => {
                        medioRadio.djBuffer = data
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

const medioRadioUI = {
  builder: /* html */ `
    <div id="medio-radio" style="display: none">
      <div id="medio-radio-close"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"/></svg></div>
      <div>
       <h2 class="text-2xl mb-2">Udio Radio <span class="text-sm ml-1" style="color: #1dcca0">powered by MedioAI</span></h2>
      
       <h4 class="text-sm text-gray-400 mb-1">Tags <small class="text-xs opacity-50">(comma separated list) *</small></h4>
       <input autocomplete="off" id="medio-radio-genres" class="w-full border bg-gray-800 text-white p-2 rounded-lg" placeholder="Add your tags here..." />

       <div class="flex space-x-2 hidden">
            <div class="w-full">
       <h4 class="text-sm text-gray-400 mb-1 mt-3">Playlist / Profile <small class="text-xs opacity-50">(overwrites tags) **</small></h4>
          <input autocomplete="off" id="medio-radio-playlist" class="w-full border bg-gray-800 text-white p-2 rounded-lg" placeholder="Full URL here..." />
        </div>
       
      </div>

       <div class="flex space-x-2">
            <div class="w-full">
       <h4 class="text-sm text-gray-400 mb-1 mt-3"># of Tracks <small class="text-xs opacity-50">(per tag)</small></h4>
      <input id="medio-radio-length" autocomplete="off" type="number" value="2" class="w-full border bg-gray-800 text-white p-2 rounded-lg" />
      </div>
      <div class="w-full" style="display: none">

      <h4 class="text-sm text-gray-400 mb-1 mt-3">Only New Tracks</h4>
      <select id="medio-radio-only-new" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
        <option value="off">No</option>
        <option value="on">Yes</option>
      </select>
</div>

<div class="w-full hidden">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">Shuffle</h4>
          <select id="medio-radio-shuffle" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
</div>

       <div class="text-sm italic text-gray-400 mb-1 mt-3" id="medioDJNotice" style="display: none">
          Add your OpenAI or OpenRouter API key to enable DJ mode.**
       </div>

        <div id="medioDJSettings" style="display: none">
          <div class="flex items-center justify-between mb-1 mt-3">
          <h4>MedioAI DJ Mode</h4>
          <select id="medio-radio-dj-enabled" style="width: 100px" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
          
          </div>
        <div id="medioDJSettingsInner" style="display: none">

         
        <div class="flex space-x-2 ">
            <div class="w-full">
<h4 class="text-sm text-gray-400 mb-1 mt-3">Radio Station Name</h4>
          <input id="medio-radio-name" class="w-full border bg-gray-800 text-white p-2 rounded-lg" placeholder="Station Name..." />

       
          </div>
          <div class="w-full">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">Flavor <small class="opacity-50">*</small></h4>
          <select id="medio-radio-dj-flavor" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
            <option value="on">Fake Ads + Callers</option>
            <option value="off">None</option>
          </select>
          </div>
        </div>
          <div class="flex space-x-2">
            <div class="w-full">

          

          <h4 class="text-sm text-gray-400 mb-1 mt-3">Length</h4>
          <select id="medio-radio-dj-length" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
            <option value="1-2">Short</option>
            <option value="2-3">Medium</option>
            <option value="4-6">Long</option>
          </select>
          </div>
          <div class="w-full">
          <h4 class="text-sm text-gray-400 mb-1 mt-3">Personality</h4>
          <select id="medio-radio-dj-personality" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
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
          <select id="medio-radio-dj-voice" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
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
          <select id="medio-radio-dj-music" class="w-full border bg-gray-800 text-white p-2 rounded-lg">
            <option value="funky-1">Funky</option>
            <option value="hiphop">Hip Hop</option>
            <option value="grime">Grime</option>
            <option value="rock">Rock</option>
            <option value="metal">Metal</option>
            <option value="jazz">Jazz</option>
            <option value="edm">EDM</option>
            <option value="reggae">Reggae</option>
            <option value="country">Country</option>
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
        <div id="radioHelp" class="pt-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 5v.01"/><path d="M12 13.5a1.5 1.5 0 0 1 1-1.5a2.6 2.6 0 1 0-3-4"/></g></svg>
         <div id="radioHelpDesc">
          <p class="text-xs text-gray-400">
          <p><strong>*</strong> MedioAI will search for tags that you suggest and create a list of tracks for the radio broadcast. Tracks will be shuffled for variety.</p>
          <p><strong>**</strong> The DJ mode will announce the track name, username and sometimes comment about the lyrics. </p>
          <p><strong>***</strong> The flavor mode will add fake commercials and callers randomly in first 30 seconds of a track. There is a 33% chance to trigger and 50% chance to be either caller or commercial.</p>
         </div>
        </div>
        
        </div>

        <button id="medio-radio-record-toggle" class="text-white py-2 px-4 rounded-lg mt-3 flex items-center space-x-2">
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
        <div class="track-play"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSPlay0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path fill="#000" stroke="#000" d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPlay0)"/></svg></div>
        <div class="track-pause"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"/></svg></div>
       </div>
      
       <div class="medio-radio-info mb-2">
        <a href="#" target="_blank" class="medio-radio-title block truncate text-3xl font-bold mb-1 hover:underline">Track Title</a>
        <a href="#" target="_blank" class="medio-radio-artist block hover:underline text-lg opacity-50 mb-4">Track Artist</a>
       </div>

       <div class="medio-radio-controls">
        <div class="flex space-x-2 items-center justify-between">
          <button class="medio-radio-play"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/></svg></button>

          <button class="medio-radio-pause" style="display: none"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M12 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m10 0h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"/></svg></button>

          <div id="aiLoading" class="flex items-center space-x-2" style="display:none"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg> <span class="text-xs opacity-50">AI Preparing...</span></div>
          
          <button class="medio-radio-next flex space-x-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M3.569 5.865A1.332 1.332 0 0 1 5.415 4.8l.646.283l.511.233l.597.283l.676.331l.49.249l.793.414l.564.304l.588.326l.613.349l.633.37l.599.361l.564.349l.778.496l.694.458l.607.414l.517.363l.541.394l.206.154c.71.535.71 1.594.001 2.13l-.43.319l-.273.198l-.664.465l-.595.404l-.443.292l-.73.47l-.81.5l-.581.35l-.615.36l-.62.352l-.593.33l-.566.305l-.538.283l-.748.381l-.673.331l-.773.364l-.744.332l-.224.096a1.332 1.332 0 0 1-1.844-1.065l-.08-.698l-.071-.767l-.053-.689l-.05-.78l-.028-.57l-.024-.605l-.019-.64l-.015-1.026v-.715l.015-1.024l.03-.948l.026-.587l.03-.55l.052-.75l.054-.657l.07-.722zM19 5a1 1 0 0 1 .993.883L20 6v12a1 1 0 0 1-.883.993L19 19h-1a1 1 0 0 1-.993-.883L17 18V6a1 1 0 0 1 .883-.993L18 5z"/></g></svg> <span class="text-sm opacity-50 hover:opacity-100">Next Track</span></button>
        </div>

        <div class="medio-radio-progress"><div class="audio-radio-bar"></div></div>
        <div class="mt-2">
          <div class="medio-radio-indicator">0:00 / 0:00</div>
          <div class="medio-radio-broadcast text-xs mt-1 opacity-50">Track 1 of 1</div>
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
 <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M157.52 272h36.96L176 218.78zM352 256c-13.23 0-24 10.77-24 24s10.77 24 24 24s24-10.77 24-24s-10.77-24-24-24M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48M250.58 352h-16.94c-6.81 0-12.88-4.32-15.12-10.75L211.15 320h-70.29l-7.38 21.25A16 16 0 0 1 118.36 352h-16.94c-11.01 0-18.73-10.85-15.12-21.25L140 176.12A23.995 23.995 0 0 1 162.67 160h26.66A23.99 23.99 0 0 1 212 176.13l53.69 154.62c3.61 10.4-4.11 21.25-15.11 21.25M424 336c0 8.84-7.16 16-16 16h-16c-4.85 0-9.04-2.27-11.98-5.68c-8.62 3.66-18.09 5.68-28.02 5.68c-39.7 0-72-32.3-72-72s32.3-72 72-72c8.46 0 16.46 1.73 24 4.42V176c0-8.84 7.16-16 16-16h16c8.84 0 16 7.16 16 16z"/></svg>
        <h2 class="text-2xl mb-2">Commercial Break</h2>
       </div>
       </div>

       <div id="medio-radio-caller" style="display: none">
       <div class="block text-center text-2xl">
 <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M8 3C8.5 3 10.5 7.5 10.5 8C10.5 9 9 10 8.5 11C8 12 9 13 10 14C10.3943 14.3943 12 16 13 15.5C14 15 15 13.5 16 13.5C16.5 13.5 21 15.5 21 16C21 18 19.5 19.5 18 20C16.5 20.5 15.5 20.5 13.5 20C11.5 19.5 10 19 7.5 16.5C5 14 4.5 12.5 4 10.5C3.5 8.5 3.5 7.5 4 6C4.5 4.5 6 3 8 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/><animateTransform attributeName="transform" begin="0.6s;lineMdPhoneCallLoop0.begin+2.6s" dur="0.5s" type="rotate" values="0 12 12;15 12 12;0 12 12;-12 12 12;0 12 12;12 12 12;0 12 12;-15 12 12;0 12 12"/></path><path stroke-dasharray="4" stroke-dashoffset="4" d="M14 7.04404C14.6608 7.34734 15.2571 7.76718 15.7624 8.27723M16.956 10C16.6606 9.35636 16.2546 8.77401 15.7624 8.27723" opacity="0"><set id="lineMdPhoneCallLoop0" attributeName="opacity" begin="0.7s;lineMdPhoneCallLoop0.begin+2.7s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s;lineMdPhoneCallLoop0.begin+2.7s" dur="0.2s" values="4;8"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.3s;lineMdPhoneCallLoop0.begin+3.3s" dur="0.3s" values="0;4"/><set attributeName="opacity" begin="1.6s;lineMdPhoneCallLoop0.begin+3.6s" to="0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M20.748 9C20.3874 7.59926 19.6571 6.347 18.6672 5.3535M15 3.25203C16.4105 3.61507 17.6704 4.3531 18.6672 5.3535" opacity="0"><set attributeName="opacity" begin="1s;lineMdPhoneCallLoop0.begin+3s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s;lineMdPhoneCallLoop0.begin+3s" dur="0.2s" values="10;20"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.5s;lineMdPhoneCallLoop0.begin+3.5s" dur="0.3s" values="0;10"/><set attributeName="opacity" begin="1.8s;lineMdPhoneCallLoop0.begin+3.8s" to="0"/></path></g></svg>
        <h2 class="text-2xl mb-2">Audience Caller</h2>
       </div>
       </div>

       <div id="dj-wrapper" style="display: none">
       <div class="block flex items-center justify-center text-center w-full mb-2 text-2xl">
       <svg xmlns="http://www.w3.org/2000/svg"  width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c2.67 0 8 1.34 8 4v2H1v-2c0-2.66 5.33-4 8-4m7.76-9.64c2.02 2.2 2.02 5.25 0 7.27l-1.68-1.69c.84-1.18.84-2.71 0-3.89zM20.07 2c3.93 4.05 3.9 10.11 0 14l-1.63-1.63c2.77-3.18 2.77-7.72 0-10.74z"/></svg>
       </div>
        <h3>Announcer</h3>
        <div id="dj-text" class="whitespace-pre-line"></div>
       </div>
       <audio id="medio-radio-audio" style="display: none" src="#" preload="auto"></audio>
       <audio id="medio-radio-background" style="display: none" src="#" preload="auto"></audio>
       <audio id="medio-radio-dj" style="display: none" src="#" preload="auto"></audio>
       
        <div id="medio-radio-close"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"/></svg></div>`,
}

medioRadio.init()
