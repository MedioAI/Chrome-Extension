/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const medioAI = {
  quill: null,
  perPage: 2,
  chatHistory: [],

  init: () => {
    const sidebar = document.querySelector('aside[aria-label="Sidebar"] nav ul')

    if (sidebar) {
      medioAI.songStudio()
    } else {
      const checkSidebar = setInterval(() => {
        const sidebar = document.querySelector('aside[aria-label="Sidebar"] nav ul')

        if (sidebar) {
          clearInterval(checkSidebar)
          notificationMedioAI.init()
          medioAI.songStudio()
          medioAI.tagBuilder()
        }
      }, 400)
    }
  },

  songStudio: async () => {
    const html = uiMedioAI.sidebarLinks
    const sidebar = document.querySelector('aside[aria-label="Sidebar"] nav ul')

    if (sidebar) {
      sidebar.insertAdjacentHTML('beforeend', html)

      const overlay = document.createElement('div')
      overlay.id = 'lyric-tagbuilder-overlay'
      overlay.style.position = 'fixed'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      overlay.style.zIndex = '99999999999'
      const animate2 = await utilitiesMedioAI.getSettings('slideanimation')
      if (animate2 === 'on') {
        overlay.style.transition = 'transform 0.3s'
      }
      overlay.style.transform = 'translateX(-100%)'
      overlay.style.overflowY = 'auto'
      overlay.style.padding = '25px'
      overlay.style.boxSizing = 'border-box'
      overlay.style.display = 'flex'
      overlay.style.flexDirection = 'column'
      overlay.style.alignItems = 'center'
      overlay.style.justifyContent = 'center'
      overlay.style.color = '#fff'
      overlay.style.fontFamily = 'Arial, sans-serif'
      overlay.style.fontSize = '16px'
      overlay.style.lineHeight = '1.5'
      overlay.style.fontWeight = '400'

      overlay.innerHTML = uiMedioAI.tagBuilder
      document.body.appendChild(overlay)

      const lyricBuildertabButtons = document.querySelectorAll('.lyric-buildertab-button')
      const lyricBuildertabs = document.querySelectorAll('.lyric-buildertab')

      lyricBuildertabButtons.forEach(button => {
        button.addEventListener('click', () => {
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
        })
      })

      const medioAddTag = document.querySelectorAll('.medioAddTag')
      const medioTagBox = document.getElementById('medioTagBox')

      medioAddTag.forEach(tag => {
        tag.addEventListener('change', () => {
          if (tag.value) {
            medioTagBox.value += tag.value + ', '
            tag.value = ''
          }
        })
      })

      const artistsJson = chrome.runtime.getURL('database/artists.json')
      const genresJson = chrome.runtime.getURL('database/genres.json')

      const artistsPromise = fetch(artistsJson)
        .then(response => response.json())
        .then(data => {
          const artistSelect = document.getElementById('medio-builder-artist')
          const option = document.createElement('option')
          option.value = ''
          option.textContent = 'Artist'
          option.disabled = true
          option.selected = true
          artistSelect.appendChild(option)
          data.forEach(artist => {
            const option = document.createElement('option')
            option.value = artist
            option.textContent = artist
            artistSelect.appendChild(option)
          })
        })

      const genresPromise = fetch(genresJson)
        .then(response => response.json())
        .then(data => {
          const genreSelect = document.getElementById('medio-builder-genre')
          const option = document.createElement('option')
          option.value = ''
          option.textContent = 'Genre'
          option.disabled = true
          option.selected = true
          genreSelect.appendChild(option)
          data.forEach(artist => {
            const option = document.createElement('option')
            option.value = artist.name
            option.textContent = artist.name
            genreSelect.appendChild(option)
          })
        })

      Promise.all([artistsPromise, genresPromise]).then(() => {
        const totalDBTags = []
        const allSelectBoxes = document.querySelectorAll('.medioAddTag')

        allSelectBoxes.forEach(select => {
          select.querySelectorAll('option').forEach(option => {
            totalDBTags.push(option.value.toLowerCase())
          })
        })

        document.getElementById('searchTags').addEventListener('input', e => {
          const search = e.target.value.toLowerCase()

          if (search === '') {
            document.getElementById('medioSearchDropdown').style.display = 'none'
            return
          }

          document.querySelector(
            '#medioSearchClear'
          ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12"/></svg>`

          document.querySelector('#medioSearchClear').addEventListener('click', () => {
            document.getElementById('searchTags').value = ''
            document.getElementById('medioSearchDropdown').style.display = 'none'

            document.querySelector(
              '#medioSearchClear'
            ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32"><path fill="currentColor" d="m29.772 26.433l-7.126-7.126a10.43 10.43 0 0 0 1.524-5.42c0-5.794-4.692-10.486-10.482-10.488c-5.79 0-10.484 4.693-10.484 10.485c0 5.79 4.693 10.48 10.484 10.48c1.987 0 3.84-.562 5.422-1.522l7.128 7.127l3.534-3.537zM7.202 13.885a6.496 6.496 0 0 1 6.485-6.486a6.493 6.493 0 0 1 6.484 6.485a6.494 6.494 0 0 1-6.483 6.484a6.496 6.496 0 0 1-6.484-6.485z"/></svg>`
          })

          const searchResults = totalDBTags.filter(tag => {
            return tag.toLowerCase().includes(search)
          })

          const medioSearchDropdown = document.getElementById('medioSearchDropdown')
          medioSearchDropdown.innerHTML = ''

          if (searchResults.length === 0) {
            medioSearchDropdown.innerHTML = `<p class="text-xs text-gray-400">No results found...</p>`
            return
          }

          searchResults.forEach(tag => {
            const span = document.createElement('span')
            span.classList.add(
              'medioSearchTag',
              'py-2',
              'px-4',
              'cursor-pointer',
              'rounded',
              'bg-gray-400',
              'text-sm'
            )
            const words = tag.split(' ')
            const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
            const capitalizedTag = capitalizedWords.join(' ')
            span.textContent = capitalizedTag
            medioSearchDropdown.appendChild(span)
          })

          medioSearchDropdown.style.display = 'block'

          const medioSearchTags = document.querySelectorAll('.medioSearchTag')

          medioSearchTags.forEach(tag => {
            tag.addEventListener('click', () => {
              medioTagBox.value += tag.textContent + ', '
            })
          })
        })
      })

      const medioSaveTags = document.getElementById('medio-saveTags')
      medioSaveTags.addEventListener('click', e => {
        const tags = medioTagBox.value
        const title = document.querySelector('#medioTagBoxTitle').value
        const tagId = document.querySelector('#mediotag-id').value

        if (!tagId) {
          chrome.storage.sync.get('medioTags', data => {
            const newTags = data.medioTags ? data.medioTags : []
            newTags.push({
              id: medioAI.uuidv4(),
              created_at: new Date().toISOString(),
              tags,
              title: title || 'Untitled',
            })
            chrome.storage.sync.set({ medioTags: newTags }, () => {
              utilitiesMedioAI.showNotification('Created new tag for your library.')
            })
          })

          e.target.textContent = 'Saved!'

          setTimeout(() => {
            e.target.textContent = 'Save'
          }, 1000)
        } else {
          chrome.storage.sync.get('medioTags', data => {
            const tags = data.medioTags ? data.medioTags : []
            const title = document.querySelector('#medioTagBoxTitle').value
            const newTags2 = document.getElementById('medioTagBox').value
            const newTags = tags.map(tag => {
              if (tag.id === tagId) {
                return {
                  ...tag,
                  tags: newTags2,
                  title: title,
                }
              } else {
                return tag
              }
            })

            chrome.storage.sync.set({ medioTags: newTags }, () => {
              utilitiesMedioAI.showNotification('Updated tag in your library.')
            })
          })

          e.target.textContent = 'Updated!'

          setTimeout(() => {
            e.target.textContent = 'Save'
          }, 1000)
        }
      })

      const medioClearTags = document.getElementById('medio-clearTags')
      medioClearTags.addEventListener('click', e => {
        if (e.target.classList.contains('confirmClear')) {
          medioTagBox.value = ''
          document.querySelector('#medioTagBoxTitle').value = ''
          document.querySelector('#mediotag-id').value = ''
          utilitiesMedioAI.showNotification('Cleared current tags.')
          e.target.classList.remove('confirmClear')
        } else {
          e.target.classList.add('confirmClear')

          setTimeout(() => {
            e.target.classList.remove('confirmClear')
          }, 5000)
        }
      })

      const medioCopyTags = document.getElementById('medio-copyTags')
      medioCopyTags.addEventListener('click', e => {
        navigator.clipboard.writeText(medioTagBox.value)

        e.target.textContent = 'Copied!'
        utilitiesMedioAI.showNotification('Copied tags to clipboard.')

        setTimeout(() => {
          e.target.textContent = 'Copy'
        }, 1000)
      })

      const closeLyricTagBuilder = document.getElementById('close-lyric-tagbuilder')
      closeLyricTagBuilder.addEventListener('click', () => {
        overlay.style.transform = 'translateX(-100%)'
        document.body.style.overflow = 'auto'
      })

      const lyricTagBuilderLink = document.getElementById('lyric-tagbuilder-link')
      lyricTagBuilderLink.addEventListener('click', e => {
        e.preventDefault()

        if (!document.getElementById('lyric-tagbuilder-overlay')) {
          document.body.style.overflow = 'auto'
        } else {
          document.body.style.overflow = 'hidden'
          const overlay3 = document.getElementById('lyric-tagbuilder-overlay')
          overlay3.style.transform = 'translateX(0)'
        }
      })

      const overlay2 = document.createElement('div')
      overlay2.id = 'lyric-barn-overlay'
      overlay2.style.position = 'fixed'
      overlay2.style.top = '0'
      overlay2.style.left = '0'
      overlay2.style.width = '100%'
      overlay2.style.height = '100%'
      overlay2.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      overlay2.style.zIndex = '99999999999'
      const animate = await utilitiesMedioAI.getSettings('slideanimation')
      if (animate === 'on') {
        overlay2.style.transition = 'transform 0.3s'
      }
      overlay2.style.transform = 'translateX(-100%)'
      overlay2.style.overflowY = 'auto'
      overlay2.style.padding = '25px'
      overlay2.style.boxSizing = 'border-box'
      overlay2.style.display = 'flex'
      overlay2.style.flexDirection = 'column'
      overlay2.style.alignItems = 'center'
      overlay2.style.justifyContent = 'center'
      overlay2.style.color = '#fff'
      overlay2.style.fontFamily = 'Arial, sans-serif'
      overlay2.style.fontSize = '16px'
      overlay2.style.lineHeight = '1.5'
      overlay2.style.fontWeight = '400'
      overlay2.innerHTML = uiMedioAI.songStudio

      document.body.appendChild(overlay2)

      utilitiesMedioAI.quill()
      medioAI.tabs()

      const closeLyricBarn = document.getElementById('close-lyric-barn')
      closeLyricBarn.addEventListener('click', () => {
        overlay2.style.transform = 'translateX(-100%)'
        document.body.style.overflow = 'auto'
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
        medioAI.save()
      })

      const clearLyrics = document.getElementById('clear-lyrics')
      clearLyrics.addEventListener('click', e => {
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
        e.preventDefault()

        if (!document.getElementById('lyric-barn-overlay')) {
          document.body.style.overflow = 'auto'
        } else {
          document.body.style.overflow = 'hidden'
          const overlay = document.getElementById('lyric-barn-overlay')
          overlay.style.transform = 'translateX(0)'
        }
      })
    }
  },

  tabBuilder: () => {},

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
}

window.onload = function () {
  medioAI.init()
}
