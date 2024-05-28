/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const songStudioMedioAI = {
  init: async () => {
    const modal = document.createElement('div')
    modal.id = 'medioAI-songstudio'
    const animate = await utilitiesMedioAI.getSettings('slideanimation')
    if (animate === 'on') {
      modal.style.transition = 'transform 0.3s'
    }
    modal.innerHTML = await uiMedioAI.songStudio()
    document.body.appendChild(modal)
    utilitiesMedioAI.quill()
    songStudioMedioAI.events()
    songStudioMedioAI.tabs()
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
      songStudioMedioAI.save()
    })

    const clearLyrics = document.getElementById('clear-lyrics')
    clearLyrics.addEventListener('click', e => {
      songStudioMedioAI.clear(e)
    })

    const allPremadeQuestions = document.querySelectorAll('.medioAskAIPremadeQuestion')
    allPremadeQuestions.forEach(question => {
      question.addEventListener('click', e => {
        const text = e.target.innerText
        const askInput = document.getElementById('medioaskai')
        askInput.value = text
      })
    })

    const medioaiSendMessage = document.getElementById('medioaiSendMessage')
    medioaiSendMessage.addEventListener('click', () => {
      apiMedioAI.sendMessage()
    })

    const medioaiSendMessageBox = document.getElementById('medioaiMessageBox')
    medioaiSendMessageBox.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        apiMedioAI.sendMessage()
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
      apiMedioAI.askQuestion()
    })

    document.addEventListener('keydown', e => {
      utilitiesMedioAI.setHotKeys(e)
    })

    const openStudio = document.getElementById('medioai-link')
    openStudio.addEventListener('click', e => {
      songStudioMedioAI.open(e)
    })
  },

  open: e => {
    e.preventDefault()
    if (!document.getElementById('medioAI-songstudio')) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
      const overlay = document.getElementById('medioAI-songstudio')
      overlay.style.transform = 'translateX(0)'
    }
  },

  close: () => {
    const modal = document.getElementById('medioAI-songstudio')
    modal.style.transform = 'translateX(-100%)'
    document.body.style.overflow = 'auto'
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

    if (!id) {
      const lyrics = {
        title: title || 'Untitled',
        content: utilitiesMedioAI.quill.root.innerHTML,
        id: utilitiesMedioAI.uuidv4(),
        created_at: new Date().toISOString(),
      }
      chrome.storage.local.get(['medioLyrics'], function (result) {
        const medioLyrics = result.medioLyrics || []
        medioLyrics.push(lyrics)
        document.getElementById('lyric-id').value = lyrics.id
        chrome.storage.local.set({ medioLyrics }, function () {
          utilitiesMedioAI.showNotification('Added new song to your library.')
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
        } else if (tab === 'ask') {
          const openaikey = await utilitiesMedioAI.getSettings('openaikey')

          if (openaikey) {
            document.querySelector('#medioapiExplainerask').style.display = 'none'
            document.querySelector('#medioask').style.display = 'block'
          } else {
            document.querySelector('#medioapiExplainerask').style.display = 'block'
            document.querySelector('#medioask').style.display = 'none'
          }
        } else if (tab === 'wizard') {
          const openaikey = await utilitiesMedioAI.getSettings('openaikey')

          if (openaikey) {
            document.querySelector('#medioapiExplainerwizard').style.display = 'none'
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
        }
      })
    })
  },
}
