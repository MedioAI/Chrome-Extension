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
    const emotionsJson = chrome.runtime.getURL('database/emotions.json')
    const periodsJson = chrome.runtime.getURL('database/periods.json')
    const regionsJson = chrome.runtime.getURL('database/regions.json')
    const vocalsJson = chrome.runtime.getURL('database/vocals.json')
    const productionsJson = chrome.runtime.getURL('database/productions.json')
    const instrumentsJson = chrome.runtime.getURL('database/instruments.json')

    function populateSelect(jsonUrl, elementId, placeholder) {
      return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
          const select = document.getElementById(elementId)
          const option = document.createElement('option')
          option.value = ''
          option.textContent = placeholder
          option.disabled = true
          option.selected = true
          select.appendChild(option)
          data.forEach(item => {
            const option = document.createElement('option')
            option.value = item
            option.textContent = item
            select.appendChild(option)
          })
        })
    }

    const artistsPromise = populateSelect(artistsJson, 'medio-builder-artist', 'Artist')
    const genresPromise = populateSelect(genresJson, 'medio-builder-genre', 'Genre')
    const emotionsPromise = populateSelect(emotionsJson, 'medio-builder-emotion', 'Emotion')
    const periodsPromise = populateSelect(periodsJson, 'medio-builder-period', 'Period')
    const regionsPromise = populateSelect(regionsJson, 'medio-builder-region', 'Region')
    const vocalsPromise = populateSelect(vocalsJson, 'medio-builder-vocal', 'Vocal')
    const productionsPromise = populateSelect(productionsJson, 'medio-builder-production', 'Production')
    const instrumentsPromise = populateSelect(instrumentsJson, 'medio-builder-instruments', 'Production')

    Promise.all([
      artistsPromise,
      genresPromise,
      emotionsPromise,
      periodsPromise,
      regionsPromise,
      vocalsPromise,
      productionsPromise,
      instrumentsPromise,
    ]).then(() => {
      const totalDBTags = []
      const allSelectBoxes = document.querySelectorAll('.medioAddTag')

      allSelectBoxes.forEach(select => {
        select.querySelectorAll('option').forEach(option => {
          totalDBTags.push(option.value.toLowerCase())
        })
      })

      tagBuilderMedioAI.events()
    })
  },

  events: () => {
    document.getElementById('searchTags').addEventListener('input', e => {
      tagBuilderMedioAI.search(e, totalDBTags)
    })

    const lyricBuildertabButtons = document.querySelectorAll('.lyric-buildertab-button')
    lyricBuildertabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tagBuilderMedioAI.tabs(button, lyricBuildertabButtons)
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
      chrome.storage.local.get('medioTags', data => {
        const newTags = data.medioTags ? data.medioTags : []
        newTags.push({
          id: utilitiesMedioAI.uuidv4(),
          created_at: new Date().toISOString(),
          tags,
          title: title || 'Untitled',
        })
        chrome.storage.local.set({ medioTags: newTags }, () => {
          utilitiesMedioAI.showNotification('Created new tag for your library.')
        })
      })
      e.target.textContent = 'Saved!'
      setTimeout(() => {
        e.target.textContent = 'Save'
      }, 1000)
    } else {
      chrome.storage.local.get('medioTags', data => {
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
        chrome.storage.local.set({ medioTags: newTags }, () => {
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

  tabs: (button, lyricBuildertabButtons) => {
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
      paginationMedioAI.init('medioTags', 'medio-taglibrary-items', item => {
        if (item) {
          const tags = item.tags
          const title = item.title
          const medioTagBox = document.getElementById('medioTagBox')
          const medioTagBoxTitle = document.getElementById('medioTagBoxTitle')
          medioTagBox.value = tags
          medioTagBoxTitle.value = title
          document.querySelector('#mediotag-id').value = item.id
          document.querySelector(`.lyric-buildertab-button[data-tab="build"]`).click()
          utilitiesMedioAI.showNotification(`Opened Tag Group: "${title}"`)
        }
      })
    }
  },
}
