/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const tagBuilderMedioAI = {
  init: async () => {
    const modal = document.createElement('div')
    modal.id = 'medioAI-tagbuilder'
    const animate = await utilitiesMedioAI.getSettings('slideanimation')
    if (animate === 'on') {
      modal.style.transition = 'transform 0.3s'
    }
    modal.innerHTML = uiMedioAI.tagBuilder
    document.body.appendChild(modal)
    tagBuilderMedioAI.load()
  },

  load: () => {
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
        tagBuilderMedioAI.search(e, totalDBTags)
      })

      tagBuilderMedioAI.events()
    })
  },

  events: () => {
    const lyricBuildertabButtons = document.querySelectorAll('.lyric-buildertab-button')
    lyricBuildertabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tagBuilderMedioAI.tabs()
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

    const medioSaveTags = document.getElementById('medio-saveTags')
    medioSaveTags.addEventListener('click', e => {
      tagBuilderMedioAI.save(e)
    })

    const medioClearTags = document.getElementById('medio-clearTags')
    medioClearTags.addEventListener('click', e => {
      tagBuilderMedioAI.clear(e)
    })

    const medioCopyTags = document.getElementById('medio-copyTags')
    medioCopyTags.addEventListener('click', e => {
      tagBuilderMedioAI.copy(e)
    })

    const closeLyricTagBuilder = document.getElementById('close-lyric-tagbuilder')
    closeLyricTagBuilder.addEventListener('click', () => {
      tagBuilderMedioAI.close()
    })

    const lyricTagBuilderLink = document.getElementById('lyric-tagbuilder-link')
    lyricTagBuilderLink.addEventListener('click', e => {
      tagBuilderMedioAI.open(e)
    })
  },

  open: e => {
    e.preventDefault()
    if (!document.getElementById('medioAI-tagbuilder')) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
      const overlay3 = document.getElementById('medioAI-tagbuilder')
      overlay3.style.transform = 'translateX(0)'
    }
  },

  close: () => {
    const modal = document.getElementById('medioAI-tagbuilder')
    modal.style.transform = 'translateX(-100%)'
    document.body.style.overflow = 'auto'
  },

  clear: e => {
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
  },

  copy: e => {
    navigator.clipboard.writeText(medioTagBox.value)
    e.target.textContent = 'Copied!'
    utilitiesMedioAI.showNotification('Copied tags to clipboard.')
    setTimeout(() => {
      e.target.textContent = 'Copy'
    }, 1000)
  },

  save: e => {
    const tags = medioTagBox.value
    const title = document.querySelector('#medioTagBoxTitle').value
    const tagId = document.querySelector('#mediotag-id').value
    if (!tagId) {
      chrome.storage.sync.get('medioTags', data => {
        const newTags = data.medioTags ? data.medioTags : []
        newTags.push({
          id: utilitiesMedioAI.uuidv4(),
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
  },

  search: (e, totalDBTags) => {
    const search = e.target.value.toLowerCase()
    if (search === '') {
      document.getElementById('medioSearchDropdown').style.display = 'none'
      return
    }
    document.querySelector('#medioSearchClear').innerHTML = iconsMedioAI.clear
    document.querySelector('#medioSearchClear').addEventListener('click', () => {
      document.getElementById('searchTags').value = ''
      document.getElementById('medioSearchDropdown').style.display = 'none'
      document.querySelector('#medioSearchClear').innerHTML = iconsMedioAI.search
    })
    const searchResults = totalDBTags.filter(tag => {
      return tag.toLowerCase().includes(search)
    })
    const medioSearchDropdown = document.getElementById('medioSearchDropdown')
    medioSearchDropdown.innerHTML = ''
    if (searchResults.length === 0) {
      medioSearchDropdown.innerHTML = uiMedioAI.placeholder(
        'No results found',
        'Try another query or add a new tag.'
      )
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
