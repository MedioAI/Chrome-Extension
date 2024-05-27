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
    modal.id = 'lyric-tagbuilder-overlay'
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

    modal.innerHTML = uiMedioAI.tagBuilder
    document.body.appendChild(modal)

    const lyricBuildertabButtons = document.querySelectorAll('.lyric-buildertab-button')

    lyricBuildertabButtons.forEach(button => {
      button.addEventListener('click', () => {
        songStudioMedioAI.tabs()
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
        tagBuilderMedioAI.search(e)
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
    if (!document.getElementById('lyric-tagbuilder-overlay')) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
      const overlay3 = document.getElementById('lyric-tagbuilder-overlay')
      overlay3.style.transform = 'translateX(0)'
    }
  },

  close: () => {
    const modal = document.getElementById('lyric-tagbuilder-overlay')
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
  },

  search: e => {
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
  },
}
