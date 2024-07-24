/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const songStudioMedioAI = {
  isOpen: false,

  init: async () => {
    const modal = document.createElement('div')
    modal.id = 'medioAI-songstudio'
    const animate = await utilitiesMedioAI.getSettings('slideanimation')
    if (animate === 'on') {
      modal.style.transition = 'transform 0.3s'
    }
    modal.innerHTML = await uiMedioAI.songStudio()
    document.body.appendChild(modal)

    songStudioMedioAI.detectURLChange((url => {
      if (url && url.includes('udio.com/tree/')) {
        songStudioMedioAI.open()
      } 
    }))

    songStudioMedioAI.load(() => {
      utilitiesMedioAI.quill()
      songStudioMedioAI.events()
      songStudioMedioAI.tabs()
    })

    songStudioMedioAI.spaceKeyDown = event => {
      if (songStudioMedioAI.isOpen && event.code === 'Space') {
        const tagName = event.target.tagName.toLowerCase()
        if (tagName !== 'input' && tagName !== 'textarea') {
          event.preventDefault()
          event.stopImmediatePropagation()
          event.stopPropagation()

          const range = utilitiesMedioAI.quill.getSelection()
          if (range) {
            utilitiesMedioAI.quill.insertText(range.index, ' ')
            utilitiesMedioAI.quill.setSelection(range.index + 1)
          }
        }
      }
    }
    window.addEventListener('keydown', songStudioMedioAI.spaceKeyDown)

    songStudioMedioAI.appButtons()
    setTimeout(() => {
      songStudioMedioAI.seedBox()
    }, 1600)

    // setTimeout(() => {
    //   songStudioMedioAI.trackCovers()
    // }, 2000)
  },

  load: callback => {
    const commandsJson = chrome.runtime.getURL('database/songstudio/commands.json')
    const extrasJson = chrome.runtime.getURL('database/songstudio/extras.json')
    const structuresJson = chrome.runtime.getURL('database/songstudio/structures.json')
    const instrumentsJson = chrome.runtime.getURL('database/songstudio/instruments.json')

    const commandsPromise = utilitiesMedioAI.populateSelect(commandsJson, 'medioaiCommands', 'Command', {
      key: 'songstudioCommands',
      name: 'commands',
    })
    const extrasPromise = utilitiesMedioAI.populateSelect(extrasJson, 'medioextraCommands', 'Extra', {
      key: 'songstudioExtras',
      name: 'extras',
    })
    const structurePromise = utilitiesMedioAI.populateSelect(
      structuresJson,
      'medioaiStructures',
      'Structure',
      {
        key: 'songstudioStructures',
        name: 'structures',
      }
    )
    const instrumentsPromise = utilitiesMedioAI.populateSelect(
      instrumentsJson,
      'medioaiInstruments',
      'Instrument',
      {
        key: 'songstudioInstruments',
        name: 'instruments',
      }
    )

    Promise.all([commandsPromise, extrasPromise, structurePromise, instrumentsPromise]).then(() => {
      callback()
    })
  },

  events: () => {
    const close = document.getElementById('close-medioai')
    close.addEventListener('click', () => {
      songStudioMedioAI.close()
    })

    const findRhymes = document.getElementById('medioai-findRhyme')
    findRhymes.addEventListener('click', () => {
      apiMedioAI.checkRhymes()
    })

    const findRhymesClear = document.getElementById('medioai-findRhymeClear')
    findRhymesClear.addEventListener('click', () => {
      document.getElementById('wordInput').value = ''
      document.getElementById('results').innerHTML = ''
      document.getElementById('results').style.display = 'none'
      document.getElementById('medioRhymeExplainer').style.display = 'block'
    })

    const wordInput = document.getElementById('wordInput')
    wordInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        apiMedioAI.checkRhymes()
      }
    })

    const saveLyrics = document.getElementById('save-lyrics')
    saveLyrics.addEventListener('click', () => {
      saveLyrics.querySelector('span').innerHTML = 'Saving...'
      saveLyrics.disabled = true
      songStudioMedioAI.save()
    })

    const clearLyrics = document.getElementById('clear-lyrics')
    clearLyrics.addEventListener('click', e => {
      songStudioMedioAI.clear(e)
    })

  
    const sendLyrics = document.querySelector('#send-lyrics');
    sendLyrics.addEventListener('click', e => {
      let selectedText = window.getSelection().toString();
      if (!selectedText) {
        utilitiesMedioAI.showNotification('Please select some text first!', 'error')
      } else {
        const lyricBox = document.querySelector('textarea[placeholder="Write custom lyrics here"]');
        if (!lyricBox) {
          utilitiesMedioAI.showNotification('Please select "Custom" to have the lyric box visible.', 'error')
          return;
        } else {
          selectedText = selectedText.replace(/^\s*$(?:\r\n?|\n)/gm, '');
          selectedText = selectedText.replace(/(?<!^)(\n)(\[\w+\])/g, '\n\n$2');
    
          lyricBox.value = selectedText;
          songStudioMedioAI.simulateMouseClick(lyricBox);
          close.click();
        }
      }
    });

    const allPremadeQuestions = document.querySelectorAll('.medioAskAIPremadeQuestion')
    allPremadeQuestions.forEach(question => {
      question.addEventListener('click', e => {
        const text = e.target.innerText
        const askInput = document.getElementById('medioaskai')
        askInput.value = text
      })
    })

    const medioaiSendMessage = document.getElementById('medioaiSendMessage')
    medioaiSendMessage.addEventListener('click', async () => {
      const key = document.querySelector('#medioaichat').getAttribute('data-key')
      await apiMedioAI.sendMessage(key)
    })

    const medioaiSendMessageBox = document.getElementById('medioaiMessageBox')
    medioaiSendMessageBox.addEventListener('keydown', async e => {
      if (e.key === 'Enter') {
        const key = document.querySelector('#medioaichat').getAttribute('data-key')
        await apiMedioAI.sendMessage(key)
      }
    })

    const viewpastChats = document.getElementById('medioAskChatList')
    viewpastChats.addEventListener('click', async e => {
      document.querySelector('#medioask').style.display = 'none'
      document.querySelector('#mediochats').style.display = 'block'
      paginationMedioAI.init('medioaiChats', 'mediochats', item => {
        if (item) {
          document.querySelector('#mediochattab').style.display = 'block'
          document.querySelector('#mediochats').style.display = 'none'
          document.querySelector('#medioaichat').innerHTML = ''
          document.querySelector('#medioaichat').setAttribute('data-id', item.id)
          document.querySelector('#medioaichat').setAttribute('data-key', 'medioaiChats')
          item.messages.forEach((message, index) => {
            if (!index) return

            const newMessage = document.createElement('div')
            newMessage.classList.add('medioaimessage')
            newMessage.classList.add(`medioai${message.role}`)
            newMessage.innerHTML = message.content
            document.querySelector('#medioaichat').append(newMessage)
          })
        }
      })
    })

    const askAIQuestion = document.getElementById('medioAskAIQuestion')
    askAIQuestion.addEventListener('click', async e => {
      document.querySelector('#medioaichat').setAttribute('data-key', 'medioaiChats')
      apiMedioAI.askQuestion()
    })

    document.addEventListener('keydown', e => {
      utilitiesMedioAI.setHotKeys(e)
    })

    const openStudio = document.getElementById('medioai-link')
    openStudio.addEventListener('click', e => {
      songStudioMedioAI.open(e)
    })

    const medioWriteSong = document.getElementById('medioWriteSong')
    medioWriteSong.addEventListener('click', e => {
      document.querySelector('#mediowizard').style.display = 'none'
      document.querySelector('#mediochattab').style.display = 'block'
      document.querySelector('#medioaichat').innerHTML = ''
      document.querySelector('#medioaichat').setAttribute('data-key', 'medioaiSongChats')
      apiMedioAI.writeSong(e)
    })

    const medioSongRollDice = document.getElementById('medioSongRollDice')
    medioSongRollDice.addEventListener('click', e => {
      if (medioSongRollDice.classList.contains('disabled')) return
      medioSongRollDice.classList.add('disabled')
      medioSongRollDice.querySelector('span').innerHTML = 'Generating...'
      apiMedioAI.randomSong(e)
    })

    const medioSongClear = document.getElementById('medioSongClear')
    medioSongClear.addEventListener('click', e => {
      if (medioSongClear.classList.contains('confirmClear')) {
        document.getElementById('mediowriterSongTitle').value = ''
        document.getElementById('mediowriterTags').value = ''
        document.getElementById('mediowriterEmotion').value = ''
        document.getElementById('mediowriterTheme').value = ''
        document.getElementById('mediowriterStructure').value = 'standard'
        utilitiesMedioAI.showNotification('Cleared.')
        medioSongClear.classList.remove('confirmClear')
      } else {
        medioSongClear.classList.add('confirmClear')
        setTimeout(() => {
          medioSongClear.classList.remove('confirmClear')
        }, 3000)
      }
    })

    const medioSongChatList = document.getElementById('medioSongChatList')
    medioSongChatList.addEventListener('click', e => {
      document.querySelector('#mediowizard').style.display = 'none'
      document.querySelector('#mediochats').style.display = 'block'

      paginationMedioAI.init('medioaiSongChats', 'mediochats', item => {
        if (item) {
          document.querySelector('#mediochattab').style.display = 'block'
          document.querySelector('#mediochats').style.display = 'none'
          document.querySelector('#medioaichat').innerHTML = ''
          document.querySelector('#medioaichat').setAttribute('data-id', item.id)
          document.querySelector('#medioaichat').setAttribute('data-key', 'medioaiSongChats')
          item.messages.forEach((message, index) => {
            if (!index) return

            const newMessage = document.createElement('div')
            newMessage.classList.add('medioaimessage')
            newMessage.classList.add(`medioai${message.role}`)
            newMessage.innerHTML = message.content
            document.querySelector('#medioaichat').append(newMessage)
          })
        }
      })
    })
  },

  detectURLChange: (callback) => {
    let currentUrl = window.location.href

    setInterval(function () {
      if (window.location.href !== currentUrl) {
        callback()
        currentUrl = window.location.href
      }
    }, 500)
  },

  open: e => {
    e.preventDefault()
    songStudioMedioAI.isOpen = true

    const app = document.querySelector('section.bg-brand-gray-dark')
    app.setAttribute('style', 'transition: 0.2s;filter: blur(10px);')

    if (!document.getElementById('medioAI-songstudio')) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
      const songstudio = document.getElementById('medioAI-songstudio')
      songstudio.style.transform = 'translateY(0)'

      const savedButton = document.querySelector('.lyric-tab-button[data-tab="library"]')
      if (savedButton.classList.contains('bg-black')) {
        savedButton.click()
      }
    }
  },

  close: () => {
    const modal = document.getElementById('medioAI-songstudio')
    modal.style.transform = 'translateY(-100%)'
    document.body.style.overflow = 'auto'
    songStudioMedioAI.isOpen = false
    const app = document.querySelector('section.bg-brand-gray-dark')
    app.setAttribute('style', '')
  },

  clear: e => {
    if (e.target.classList.contains('confirmClear')) {
      document.getElementById('lyric-id').value = ''
      document.getElementById('lyric-title').value = ''
      utilitiesMedioAI.quill.root.innerHTML = ''
      utilitiesMedioAI.showNotification('Song lyrics cleared.')
      e.target.classList.remove('confirmClear')
    } else {
      e.target.classList.add('confirmClear')
      setTimeout(() => {
        e.target.classList.remove('confirmClear')
      }, 3000)
    }
  },

  save: () => {
    const title = document.getElementById('lyric-title').value
    const id = document.getElementById('lyric-id').value
    const saveLyrics = document.getElementById('save-lyrics')

    if (!id) {
      const lyrics = {
        title: title || 'Untitled',
        content: utilitiesMedioAI.quill.root.innerHTML,
        id: utilitiesMedioAI.uuidv4(),
        created_at: new Date().toISOString(),
      }
      chrome.storage.local.get(['medioLyrics'], function (result) {
        const medioLyrics = result.medioLyrics || []
        medioLyrics.unshift(lyrics)
        document.getElementById('lyric-id').value = lyrics.id
        chrome.storage.local.set({ medioLyrics }, function () {
          utilitiesMedioAI.showNotification('Added new song to your library.')
          saveLyrics.querySelector('span').innerHTML = 'Save'
          saveLyrics.disabled = false
        })
      })
    } else {
      chrome.storage.local.get(['medioLyrics'], function (result) {
        const medioLyrics = result.medioLyrics || []
        const lyrics = medioLyrics.find(lyric => lyric.id === id)
        lyrics.title = title || 'Untitled'
        lyrics.content = utilitiesMedioAI.quill.root.innerHTML

        chrome.storage.local.set({ medioLyrics }, function () {
          utilitiesMedioAI.showNotification('Updated song lyrics.')
          saveLyrics.querySelector('span').innerHTML = 'Save'
          saveLyrics.disabled = false
        })
      })
    }
  },

  tabs: () => {
    const tabButtons = document.querySelectorAll('.lyric-tab-button')

    tabButtons.forEach(button => {
      button.addEventListener('click', async e => {
        const tab = e.target.dataset.tab
        const tabs = document.querySelectorAll('.lyric-tab')

        const className =
          'lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3'

        tabButtons.forEach(button => {
          button.setAttribute('class', className)
        })

        document.getElementById('medioCharactersSelected').style.display = 'none'
        e.target.setAttribute('class', className + ' bg-black')

        tabs.forEach(tab => {
          tab.style.display = 'none'
        })

        const selectedTab = document.querySelector(`.lyric-tab[data-tab=${tab}]`)
        selectedTab.style.display = 'block'
        document.querySelector('#mediochattab').style.display = 'none'
        document.querySelector('#mediochats').style.display = 'none'

        if (tab === 'rhyme') {
          document.getElementById('wordInput').focus()
          document.getElementById('wordInput').select()
        } else if (tab === 'tags') {
          paginationMedioAI.init('medioTags', 'medio-taglibrary-items', item => {
            if (item) {
              const tags = item.tags
              const title = item.title
              const medioTagBox = document.getElementById('medioTagBox')
              const medioTagBoxTitle = document.getElementById('medioTagBoxTitle')
              medioTagBox.value = tags
              medioTagBoxTitle.value = title
              document.querySelector('#mediotag-id').value = item.id
              document.querySelector(`.lyric-tab-button[data-tab="build"]`).click()
              utilitiesMedioAI.showNotification(`Opened Tag Group: "${title}"`)
            }
          })
        } else if (tab === 'ask') {
          const openaikey = await utilitiesMedioAI.getSettings('openaikey')
          const openrouterapikey = await utilitiesMedioAI.getSettings('openrouterapikey')

          if (openaikey || openrouterapikey) {
            document.querySelector('#medioapiExplainerask').style.display = 'none'
            document.querySelector('#medioask').style.display = 'block'
            document.querySelector('[data-tab="ask"]').style.display = 'block'
          } else {
            document.querySelector('#medioapiExplainerask').style.display = 'block'
            document.querySelector('#medioask').style.display = 'none'
          }
        } else if (tab === 'wizard') {
          const openaikey = await utilitiesMedioAI.getSettings('openaikey')
          const openrouterapikey = await utilitiesMedioAI.getSettings('openrouterapikey')

          if (openaikey || openrouterapikey) {
            document.querySelector('#medioapiExplainerwizard').style.display = 'none'
            document.querySelector('[data-tab="wizard"]').style.display = 'block'
            document.querySelector('#mediowizard').style.display = 'block'
          } else {
            document.querySelector('#medioapiExplainerwizard').style.display = 'block'
            document.querySelector('#mediowizard').style.display = 'none'
          }
        } else if (tab === 'library') {
          paginationMedioAI.init('medioLyrics', 'medio-library-items', item => {
            if (item) {
              document.getElementById('lyric-id').value = item.id
              document.getElementById('lyric-title').value = item.title
              utilitiesMedioAI.quill.root.innerHTML = item.content

              const firstTab = document.querySelector('.lyric-tab-button')
              firstTab.click()
              utilitiesMedioAI.showNotification(`Opened Song: "${item.title}"`)
            }
          })
        } else if (tab === 'build') {
          button.textContent = 'Loading...'
          setTimeout(() => {
            button.textContent = 'Tags'
          }, 200)
        }
      })
    })
  },

  appButtons: () => {
    const medioaiSettings = document.getElementById('medioaiSettings')
    medioaiSettings.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openSettings' })
    })

    const medioaiTools = document.getElementById('medioaiTools')
    medioaiTools.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openApp' })
    })

    const medioaiChallenge = document.getElementById('medioaiChallenge')
    medioaiChallenge.addEventListener('click', () => {
      if (!document.querySelector('#medioAI-challenge')) {
        songStudioMedioAI.challenge()
      }
    })

    const medioaiRadio = document.getElementById('medioaiRadio')
    medioaiRadio.addEventListener('click', () => {
      songStudioMedioAI.close()
      document.querySelector('#medio-radio').style.display = 'block'
    })

    const medioaiHelp = document.getElementById('medioaiHelp');
    medioaiHelp.addEventListener('click', () => {
      const isTrainingVisible = document.querySelector('#medioai-training').style.display === 'block';
      
      document.querySelectorAll('.lyric-tab').forEach(tab => {
        tab.style.display = 'none'; 
      });

      if (isTrainingVisible) {
        document.querySelector('#medioai-training-search').style.display = 'block';
        document.querySelector('#medioai-training-videos').style.display = 'grid';
        document.querySelector('#medioai-training-player').style.display = 'none';
        document.querySelector('.lyric-tab[data-tab="write"]').style.display = 'block'
      } else {
        const traingDB = chrome.runtime.getURL('database/training.json');
        fetch(traingDB)
          .then(response => response.json())
          .then(data => {
            const training = data.udio;
            const trainingTab = document.querySelector('#medioai-training-videos');
            trainingTab.innerHTML = '';
            training.forEach(item => {
              const div = document.createElement('div');
              div.innerHTML = `
                <div class="medioai-training-video p-1 border border-gray-900 rounded hover:bg-gray-panel curser-pointer" data-id="articleid">
                  <img src="${item.img}" class="rounded w-full" />
                  <div class="p-2">
                    <h4 class="text-lg text-white my-0 capitalize font-bold">${item.title}</h4>
                    <p class="text-xs  text-muted-foreground">${item.desc}</p>
                  </div>
                </div>
              `;
              trainingTab.appendChild(div);
            });

            const trainingMedio = data.medioai;
            trainingMedio.forEach(item => {
              const div = document.createElement('div');
              div.innerHTML = `
                <div class="medioai-training-video p-1 border border-gray-900 rounded hover:bg-gray-panel curser-pointer" data-id="articleid">
                  <img src="${item.img}" class="rounded w-full" />
                  <div class="p-2">
                    <h4 class="text-lg text-white my-0 capitalize font-bold">${item.title}</h4>
                    <p class="text-xs  text-muted-foreground">${item.desc}</p>
                  </div>
                </div>
              `;
              trainingTab.appendChild(div);
            });

            document.querySelectorAll('.medioai-training-video').forEach(item => {
              item.addEventListener('click', e => {
                const id = e.target.dataset.id;
                document.querySelector('#medioai-training-search').style.display = 'none';
                document.querySelector('#medioai-training-videos').style.display = 'none';
                document.querySelector('#medioai-training-player').style.display = 'block';
              })
            })
          });
      }
      
      const tablist = document.querySelector('#medioai-content div[role="tablist"]');
      tablist.style.display = isTrainingVisible ? '' : 'none'; 
      
      document.querySelector('#medioai-training').style.display = isTrainingVisible ? 'none' : 'block'; 
      medioaiHelp.classList.toggle('active'); 
    });
  },

  challenge: async () => {
    const modal = document.createElement('div')
    modal.id = 'medioAI-challenge'
    modal.innerHTML = `<div id="medioAI-challenge" class="fixed inset-0 bg-black">
      <button id="medioAI-challenge-close" class="absolute top-4 right-4 text-white">&times;</button>
      <button id="medioAI-challenge-generate" class="bg-black text-white px-4 py-2 rounded-md mb-8 border rounded">Regenerate</button>
      <h4 class="text-lg text-gray-400 mb-2 text-center">Write a song about...</h4>
      <h2 class="text-2xl text-center">${await songStudioMedioAI.newChallenge()}</h2>
    </div>`
    document.body.appendChild(modal)

    const close = document.getElementById('medioAI-challenge-close')
    close.addEventListener('click', () => {
      modal.remove()
    })

    const generate = document.getElementById('medioAI-challenge-generate')
    generate.addEventListener('click', async () => {
      document.querySelector('#medioAI-challenge h2').innerHTML = await songStudioMedioAI.newChallenge()
    })
  },

  newChallenge: async () => {
    const json = chrome.runtime.getURL('database/songstudio/challenges.json')

    const current = await fetch(json)
      .then(response => response.json())
      .then(data => {
        return data
      })

    return current[Math.floor(Math.random() * current.length)]
  },

  applyAdvancedSettings: async button => {
    const wrapper = button.closest('h3').nextElementSibling
    if (!wrapper) return

    const allInputs = wrapper.querySelectorAll('input')
    const settings = await songStudioMedioAI.getAdvancedSettings()

    if (settings.seed === undefined) {
      settings.seed = -1
      settings.quality = 0.5
    }

    if (!allInputs[0]) return

    allInputs[0].value = settings.seed
    // allInputs[1].value = settings.quality

    function adjustQualitySlider(percentage) {
      const slider = document.querySelector('.MuiSlider-root .MuiSlider-rail')
      if (!slider) return

      const sliderRect = slider.getBoundingClientRect()
      const clickX = sliderRect.left + percentage * sliderRect.width
      const clickY = sliderRect.top + sliderRect.height / 2
      songStudioMedioAI.simulateMouseClick(slider, clickX, clickY)
    }

    songStudioMedioAI.simulateMouseClick(allInputs[0])
    adjustQualitySlider(settings.quality)

    allInputs[0].addEventListener('change', () => {
      settings.seed = allInputs[0].value
      songStudioMedioAI.setAdvancedSettings(settings)
    })
  },

  simulateMouseClick(element, clickX, clickY) {
    const mouseClickEvents = ['mousedown', 'click', 'mouseup', 'change', 'input']
    mouseClickEvents.forEach(mouseEventType => {
      const event = {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }
      if (clickX && clickY) {
        event.clientX = clickX
        event.clientY = clickY
      }
      element.dispatchEvent(new MouseEvent(mouseEventType, event))
    })
  },

  getAdvancedSettings: () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['medioAIAdvancedSettings'], function (result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(result.medioAIAdvancedSettings)
        }
      })
    })
  },

  setAdvancedSettings: settings => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ medioAIAdvancedSettings: settings }, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve()
        }
      })
    })
  },

  seedBox: () => {
    let buttons = document.querySelectorAll('.transition-all')
    buttons.forEach(button => {
      
      if (button.textContent === 'Advanced Features') {
        setTimeout(() => {
          button.closest('button').addEventListener('click', () => {
            setTimeout(() => {
              songStudioMedioAI.appendSeedBox()
            }, 300)
          })
        }, 500)
        
      }
    })
  },

  appendSeedBox: () => {    
    const seedInput = document.querySelector('input[title="Set Seed"]')
    if (!seedInput) return
    const inputWrapper = document.querySelector('#Seed')
    if (!inputWrapper) return
    inputWrapper.style.zIndex = '9999'
    inputWrapper.nextElementSibling.style.zIndex = '9999'
    inputWrapper.style.position = 'relative'
    const seedBox = document.createElement('div')
    seedBox.innerHTML = `<div class="absolute top-4 right-0 flex items-center justify-center text-white text-xs font-medium rounded-r-md" style="width: 100%;bottom: -78px;z-index:1">
      <button id="medioAIEditSeeds" class="rounded border text-sm text-sm p-1 mr-1">${iconsMedioAI.edit}</button>
      <button id="medioAISaveSeed" class="rounded border text-sm text-sm p-1 mr-1">${iconsMedioAI.save}</button>
      <select id="medioAISeedbank" class="rounded border text-sm p-1 w-full" style="width: 100%"></select>
    </div>`
    inputWrapper.closest('.relative').appendChild(seedBox)

   
    const medioAISeedbank = document.getElementById('medioAISeedbank')
    medioAISeedbank.addEventListener('change', () => {
      seedInput.value = medioAISeedbank.value
      songStudioMedioAI.simulateMouseClick(seedInput)
      medioAISeedbank.value = ''
    })

  
    songStudioMedioAI.populateOptions()

    const medioAISaveSeed = document.getElementById('medioAISaveSeed')
    medioAISaveSeed.addEventListener('click', () => {
      const seed = seedInput.value
      chrome.storage.local.get(['medioAISeeds'], function (result) {
        const seeds = result.medioAISeeds || []
        seeds.push({
          value: seed,
          label: seed,
        })
        chrome.storage.local.set({ medioAISeeds: seeds }, function () {
          utilitiesMedioAI.showNotification('Seed saved.')
          songStudioMedioAI.populateOptions()
        })
      })
    })

    const medioAIEditSeeds = document.getElementById('medioAIEditSeeds')
    medioAIEditSeeds.addEventListener('click', () => {
      chrome.storage.local.get(['medioAISeeds'], function (result) {
        const seeds = result.medioAISeeds || []
        const modal = document.createElement('div')
        modal.id = 'medioAISeedOverlay'
        modal.innerHTML = `<div id="medioAISeedModal" class="fixed inset-0 bg-black text-white">
          <h2 class="text-xl font-bold  mb-4">Your Seeds</h2>
          <ul id="medioAISeedList" class="list-disc"></ul>

          <button id="medioAISeedModalClose" style="font-size: 32px" class="absolute top-4 right-4 text-white">&times;</button>
        </div>`

        const medioAISeedModalClose = modal.querySelector('#medioAISeedModalClose')
        medioAISeedModalClose.addEventListener('click', () => {
          songStudioMedioAI.populateOptions()
          modal.remove()
        })

        document.body.appendChild(modal)
        songStudioMedioAI.loadSeedList(seeds)

        const medioaiInputSeedLabel = document.querySelectorAll('.medioaiInputSeedLabel')
        medioaiInputSeedLabel.forEach(input => {
          input.addEventListener('change', e => {
            const index = e.target.closest('.medioaiSeedItem').dataset.index
            seeds[index].label = e.target.value
            seeds[index].value = e.target.closest('.medioaiSeedItem').querySelector('.medioaiInputSeedNumber').value

            chrome.storage.local.set({ medioAISeeds: seeds }, function () {
              utilitiesMedioAI.showNotification('Seed updated.')
            })
          })
        })

        const medioaiInputSeedNumber = document.querySelectorAll('.medioaiInputSeedNumber')
        medioaiInputSeedNumber.forEach(input => {
          input.addEventListener('change', e => {
            const index = e.target.closest('.medioaiSeedItem').dataset.index
            seeds[index].value = e.target.value
            seeds[index].label = e.target.closest('.medioaiSeedItem').querySelector('.medioaiInputSeedLabel').value

            chrome.storage.local.set({ medioAISeeds: seeds }, function () {
              utilitiesMedioAI.showNotification('Seed updated.')
            })
          })
        })

        
        const medioaiRemoveSeed = document.querySelectorAll('.medioaiRemoveSeed')
        medioaiRemoveSeed.forEach(button => {
          songStudioMedioAI.addDeleteSeed(button, seeds)
        })
      })
    })
  },

  loadSeedList: (seeds) => {
    const medioAISeedList = document.querySelector('#medioAISeedOverlay').querySelector('#medioAISeedList')
    seeds.forEach((seed, index) => {
      const listItem = document.createElement('li')
      let label = seed.label
      if (label === seed.value) {
        label = ''
      }
      listItem.innerHTML = `<div data-index="${index}" class="medioaiSeedItem flex space-x-2 mb-1">
      <div class="w-1/2">
        <input type="text" value="${label}" placeholder="Label" class="medioaiInputSeedLabel w-full px-2 py-1 border rounded" />
      </div>
      <div class="w-1/2 flex space-x-2">
        <input type="text" value="${seed.value}" placeholder="Seed Number" class="medioaiInputSeedNumber w-full px-2 py-1 border rounded" />
        <button class="medioaiRemoveSeed rounded border text-sm text-sm p-2">${iconsMedioAI.trash}</button>
      </div>
    </div>`
      medioAISeedList.appendChild(listItem)
    })
  },

  populateOptions: () => {
    const medioAISeedbank = document.getElementById('medioAISeedbank')
    chrome.storage.local.get(['medioAISeeds'], function (result) {
      const seeds = result.medioAISeeds || []
      medioAISeedbank.innerHTML = '<option value="" selected disabled>Seedbank</option>'
      seeds.forEach(seed => {
        let label = seed.label
        if (label !== seed.value) {
          label = `${seed.label} - ${seed.value}`
        }
        const option = document.createElement('option')
        option.value = seed.value
        option.innerHTML = label
        medioAISeedbank.appendChild(option)
      })
    })
  },

  addDeleteSeed: (button, seeds) => {
    button.addEventListener('click', e => {
      const index = e.target.closest('.medioaiSeedItem').dataset.index
      seeds.splice(index, 1)
      const medioAISeedList = document.querySelector('#medioAISeedList')
      chrome.storage.local.set({ medioAISeeds: seeds }, function () {
        songStudioMedioAI.populateOptions()
        medioAISeedList.innerHTML = ''
        songStudioMedioAI.loadSeedList(seeds)
        utilitiesMedioAI.showNotification('Seed removed.')
        document.querySelector('#medioAISeedModalClose').click()
        document.getElementById('medioAIEditSeeds').click()
      })
    })
  },

  trackCovers: () => {
    const targetNode = document.body
    const config = { attributes: true, childList: true, subtree: true }

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const textPrompt = node.querySelector('textarea[name="prompt"]')
              if (textPrompt) {
                  const textPrompt = node.querySelector('textarea[name="prompt"]')

                  if (textPrompt) {

                    const buttons = node.querySelectorAll('.float-right button')
                    const backButton = Array.from(buttons).find(button => button.textContent === 'Back to Details')
                    if (backButton) {
                      const generateButton = document.createElement('button')
                      generateButton.innerHTML = 'Save Covers'
                      generateButton.setAttribute(
                        'class',
                        'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/5 text-white border-[0.5px] border-white/10 hover:bg-secondary/80 h-10 px-4 rounded-md py-2 mr-3'
                      )
                      generateButton.addEventListener('click', (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        songStudioMedioAI.grabCovers(node, node)
                      })
                      backButton.after(generateButton)
                    }
                  }
                
              }
            }
          })
        }
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
  },

  grabCovers: async (wrapper, node) => {
    const images = []
    const cover1 = document.querySelector('img[alt="generated-image-0"]')
    const cover2 = document.querySelector('img[alt="generated-image-1"]')
    const cover3 = document.querySelector('img[alt="cover"]')
    const prompt = wrapper.querySelector('textarea').value

    if (!cover1) {
      utilitiesMedioAI.showNotification('No covers found. Generate some covers first.', 'error')
      return
    }

    function toBase64(imgSrc) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = function () {
          let canvas = document.createElement('CANVAS')
          let ctx = canvas.getContext('2d')
          let dataURL
          canvas.height = this.naturalHeight
          canvas.width = this.naturalWidth
          ctx.drawImage(this, 0, 0)
          dataURL = canvas.toDataURL()
          resolve(dataURL)
        }
        img.onerror = reject
        img.src = imgSrc
        if (img.complete || img.complete === undefined) {
          img.src = 'data:,'
          img.src = imgSrc
        }
      })
    }

    const base64Cover1 = await toBase64(cover1.src)
    const id1 = utilitiesMedioAI.uuidv4()
    images.push({
      id: id1,
      created_at: new Date().toISOString(),
      prompt: prompt,
      bytes: base64Cover1.length,
    })
    chrome.storage.local.set({ ['medioAICover_' + id1]: base64Cover1 }, function () {})

    const base64Cover2 = await toBase64(cover2.src)
    const id2 = utilitiesMedioAI.uuidv4()
    images.push({
      id: id2,
      created_at: new Date().toISOString(),
      prompt: prompt,
      bytes: base64Cover2.length,
    })
    chrome.storage.local.set({ ['medioAICover_' + id2]: base64Cover2 }, function () {})

    const base64Cover3 = await toBase64(cover3.src)
    const id3 = utilitiesMedioAI.uuidv4()
    images.push({
      id: id3,
      created_at: new Date().toISOString(),
      prompt: prompt,
      bytes: base64Cover3.length,
    })
    chrome.storage.local.set({ ['medioAICover_' + id3]: base64Cover3 }, function () {})

    chrome.storage.local.get(['medioAICovers'], function (result) {
      const covers = result.medioAICovers || []
      covers.unshift(...images)
      chrome.storage.local.set({ medioAICovers: covers }, function () {
        utilitiesMedioAI.showNotification('Saved track (3) covers.')
      })
    })
  },
}
