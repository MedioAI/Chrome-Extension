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
    modal.id = 'lyric-barn-overlay'
    modal.style.position = 'fixed'
    modal.style.top = '0'
    modal.style.left = '0'
    modal.style.width = '100%'
    modal.style.height = '100%'
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    modal.style.zIndex = '99999999999'
    const animate = await utilitiesMedioAI.getSettings('slideanimation')
    if (animate === 'on') {
      modal.style.transition = 'transform 0.3s'
    }
    modal.style.transform = 'translateX(-100%)'
    modal.style.overflowY = 'auto'
    modal.style.padding = '25px'
    modal.style.boxSizing = 'border-box'
    modal.style.display = 'flex'
    modal.style.flexDirection = 'column'
    modal.style.alignItems = 'center'
    modal.style.justifyContent = 'center'
    modal.style.color = '#fff'
    modal.style.fontFamily = 'Arial, sans-serif'
    modal.style.fontSize = '16px'
    modal.style.lineHeight = '1.5'
    modal.style.fontWeight = '400'
    modal.innerHTML = uiMedioAI.songStudio

    document.body.appendChild(modal)

    const closeLyricBarn = document.getElementById('close-lyric-barn')
    closeLyricBarn.addEventListener('click', () => {
      songStudioMedioAI.close()
    })

    const findRhymes = document.getElementById('lyric-barn-findRhyme')
    findRhymes.addEventListener('click', () => {
      apiMedioAI.checkRhymes()
    })

    const findRhymesClear = document.getElementById('lyric-barn-findRhymeClear')
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
      pastChatListMedioAI.init()
    })

    const askAIQuestion = document.getElementById('medioAskAIQuestion')
    askAIQuestion.addEventListener('click', async e => {
      apiMedioAI.askQuestion()
    })

    document.addEventListener('keydown', e => {
      utilitiesMedioAI.setHotKeys(e)
    })

    const lyricBarnLink = document.getElementById('lyric-barn-link')
    lyricBarnLink.addEventListener('click', e => {
      songStudioMedioAI.open(e)
    })
  },

  open: e => {
    e.preventDefault()

    if (!document.getElementById('lyric-barn-overlay')) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
      const overlay = document.getElementById('lyric-barn-overlay')
      overlay.style.transform = 'translateX(0)'
    }
  },

  close: () => {
    const modal = document.getElementById('lyric-barn-overlay')
    modal.style.transform = 'translateX(-100%)'
    document.body.style.overflow = 'auto'
  },

  clear: e => {
    if (e.target.classList.contains('confirmClear')) {
      document.getElementById('lyric-id').value = ''
      document.getElementById('lyric-title').value = ''
      medioAI.quill.root.innerHTML = ''
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
        content: medioAI.quill.root.innerHTML,
        id: medioAI.uuidv4(),
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
        lyrics.content = medioAI.quill.root.innerHTML

        chrome.storage.local.set({ medioLyrics }, function () {
          utilitiesMedioAI.showNotification('Updated song lyrics.')
        })
      })
    }
  },

  tabs: () => {
    const lyricBuildertabs = document.querySelectorAll('.lyric-buildertab')
    const tab = button.getAttribute('data-tab')

    lyricBuildertabButtons.forEach(button => {
      button.classList.remove('bg-black', 'text-foreground')
      button.classList.add('bg-muted', 'text-muted-foreground')
    })

    lyricBuildertabs.forEach(tab => {
      tab.style.display = 'none'
    })

    button.classList.remove('bg-muted', 'text-muted-foreground')
    button.classList.add('bg-black', 'text-foreground')

    const selectedTab = document.querySelector(`.lyric-buildertab[data-tab="${tab}"]`)

    selectedTab.style.display = 'block'

    if (tab === 'library') {
      chrome.storage.sync.get('medioTags', data => {
        const tags = data.medioTags ? data.medioTags : []

        const tagLibraryItems = document.getElementById('medio-taglibrary-items')

        tagLibraryItems.innerHTML = ''

        if (tags.length === 0) {
          tagLibraryItems.setAttribute('class', 'text-center w-full p-4 text-gray-500')

          tagLibraryItems.innerHTML = uiMedioAI.placeholder(
            'No Tags Found',
            'Your tags will appear here to edit & manage at any time.'
          )

          return
        } else {
          tagLibraryItems.setAttribute('class', 'grid grid-cols-3 gap-4')
        }

        tags.forEach(tag => {
          const div = document.createElement('div')
          div.classList.add('medioopentag', 'border', 'p-4', 'rounded', 'text-sm', 'relative')

          div.setAttribute('data-id', tag.id)

          div.innerHTML = /* html */ `
                <h2 class="font-bold text-lg">${tag.title}</h2>
                <p class="truncate text-gray-400">${tag.tags}</p>
                <button class="deleteMediaTag absolute top-2 right-2 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"/></svg></button>
                `

          tagLibraryItems.appendChild(div)
        })

        const medioOpenTag = document.querySelectorAll('.medioopentag')

        medioOpenTag.forEach(tag => {
          tag.querySelector('.deleteMediaTag').addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()

            if (e.target.classList.contains('confirmDelete')) {
              const tagId = tag.getAttribute('data-id')

              chrome.storage.sync.get('medioTags', data => {
                const tags = data.medioTags ? data.medioTags : []
                const newTags = tags.filter(tag => tag.id !== tagId)

                chrome.storage.sync.set({ medioTags: newTags }, () => {
                  utilitiesMedioAI.showNotification('Deleted tag from your library.')
                })
              })

              e.target.closest('.medioopentag').remove()
            } else {
              e.target.classList.add('confirmDelete')

              setTimeout(() => {
                e.target.classList.remove('confirmDelete')
              }, 5000)
            }
          })
          tag.addEventListener('click', () => {
            const tags = tag.querySelector('p').textContent
            const title = tag.querySelector('h2').textContent

            const medioTagBox = document.getElementById('medioTagBox')
            const medioTagBoxTitle = document.getElementById('medioTagBoxTitle')

            medioTagBox.value = tags
            medioTagBoxTitle.value = title

            document.querySelector('#mediotag-id').value = tag.getAttribute('data-id')

            document.querySelector(`.lyric-buildertab-button[data-tab="build"]`).click()

            utilitiesMedioAI.showNotification(`Opened Tag Group: "${title}"`)
          })
        })
      })
    }
  },
}
