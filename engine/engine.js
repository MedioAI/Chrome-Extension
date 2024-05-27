/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const medioAI = {
  init: () => {
    const checkSidebar = setInterval(() => {
      const sidebar = document.querySelector('aside[aria-label="Sidebar"] nav ul')

      if (sidebar) {
        clearInterval(checkSidebar)
        notificationMedioAI.init()

        const html = uiMedioAI.sidebarLinks
        const sidebar = document.querySelector('aside[aria-label="Sidebar"] nav ul')

        if (sidebar) {
          sidebar.insertAdjacentHTML('beforeend', html)
          tagBuilderMedioAI.init()
          songStudioMedioAI.init()

          utilitiesMedioAI.quill()
          medioAI.tabs()
        }
      }
    }, 100)
  },

  tabs: () => {
    const tabButtons = document.querySelectorAll('.lyric-tab-button')

    tabButtons.forEach(button => {
      button.addEventListener('click', async e => {
        const tab = e.target.dataset.tab
        const tabs = document.querySelectorAll('.lyric-tab')
        document.getElementById('medioCharactersSelected').style.display = 'none'

        tabButtons.forEach(button => {
          button.setAttribute(
            'class',
            'lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3'
          )
        })

        e.target.setAttribute(
          'class',
          'lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black px-3'
        )

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
          chrome.storage.local.get(['medioLyrics'], function (result) {
            const medioLyrics = result.medioLyrics || []
            const libraryItems = document.getElementById('medio-library-items')
            libraryItems.innerHTML = ''

            if (medioLyrics.length === 0) {
              libraryItems.setAttribute('class', 'text-center w-full p-4 text-gray-500')
              libraryItems.innerHTML = `<h3 class='text-2xl text-gray-200 font-bold mb-2'>No Songs Found</h3> <p>Your songs will appear here to edit & manage at any time.</p>`
              return
            }

            medioLyrics.forEach(lyric => {
              const lyricItem = document.createElement('a')
              lyricItem.href = '#'
              lyricItem.classList.add(
                'open-lyric',
                'border',
                'rounded-lg',
                'p-3',
                'text-lg',
                'font-bold',
                'relative'
              )
              lyricItem.setAttribute('data-id', lyric.id)
              lyricItem.innerHTML = `<h3 class="text-xl font-medium">${
                lyric.title
              }</h3> <p class="text-xs mt-1 text-gray-400">${
                lyric.created_at
                  ? utilitiesMedioAI.formatDate(lyric.created_at || Date.now())
                  : '8:20PM on June, 28th, 2024'
              }</p> <button class="deleteMediaSong absolute top-2 right-2 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"/></svg></button>`
              lyricItem.addEventListener('click', () => {
                document.getElementById('lyric-id').value = lyric.id
                document.getElementById('lyric-title').value = lyric.title
                medioAI.quill.root.innerHTML = lyric.content

                const firstTab = document.querySelector('.lyric-tab-button')
                firstTab.click()
                utilitiesMedioAI.showNotification(`Opened Song: "${lyric.title}"`)
              })

              libraryItems.appendChild(lyricItem)
            })

            const deleteButtons = document.querySelectorAll('.deleteMediaSong')
            deleteButtons.forEach(button => {
              button.addEventListener('click', e => {
                e.preventDefault()
                e.stopPropagation()
                const id = e.target.closest('.open-lyric').getAttribute('data-id')

                if (e.target.classList.contains('confirmDelete')) {
                  e.target.closest('.open-lyric').remove()
                  e.target.classList.remove('confirmDelete')

                  chrome.storage.local.get(['medioLyrics'], function (result) {
                    const medioLyrics = result.medioLyrics || []
                    const updatedLyrics = medioLyrics.filter(lyric => lyric.id !== id)

                    chrome.storage.local.set({ medioLyrics: updatedLyrics })

                    utilitiesMedioAI.showNotification('Deleted song from your library.')
                  })
                } else {
                  e.target.classList.add('confirmDelete')

                  setTimeout(() => {
                    e.target.classList.remove('confirmDelete')
                  }, 3000)
                }
              })
            })
          })
        }
      })
    })
  },
}

window.onload = function () {
  medioAI.init()
}
