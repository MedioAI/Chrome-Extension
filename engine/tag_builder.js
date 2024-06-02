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
    tagBuilderMedioAI.load()
  },

  load: () => {
    const artistsJson = chrome.runtime.getURL('database/tagbuilder/artists.json')
    const genresJson = chrome.runtime.getURL('database/tagbuilder/genres.json')
    const emotionsJson = chrome.runtime.getURL('database/tagbuilder/emotions.json')
    const periodsJson = chrome.runtime.getURL('database/tagbuilder/periods.json')
    const regionsJson = chrome.runtime.getURL('database/tagbuilder/regions.json')
    const vocalsJson = chrome.runtime.getURL('database/tagbuilder/vocals.json')
    const productionsJson = chrome.runtime.getURL('database/tagbuilder/productions.json')
    const instrumentsJson = chrome.runtime.getURL('database/tagbuilder/instruments.json')

    const artistsPromise = utilitiesMedioAI.populateSelect(artistsJson, 'medio-builder-artist', 'Artist')
    const genresPromise = utilitiesMedioAI.populateSelect(genresJson, 'medio-builder-genre', 'Genre')
    const emotionsPromise = utilitiesMedioAI.populateSelect(emotionsJson, 'medio-builder-emotion', 'Emotion')
    const periodsPromise = utilitiesMedioAI.populateSelect(periodsJson, 'medio-builder-period', 'Period')
    const regionsPromise = utilitiesMedioAI.populateSelect(regionsJson, 'medio-builder-region', 'Region')
    const vocalsPromise = utilitiesMedioAI.populateSelect(vocalsJson, 'medio-builder-vocal', 'Vocal')
    const productionsPromise = utilitiesMedioAI.populateSelect(
      productionsJson,
      'medio-builder-production',
      'Production'
    )
    const instrumentsPromise = utilitiesMedioAI.populateSelect(
      instrumentsJson,
      'medio-builder-instruments',
      'Instrument'
    )

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

      tagBuilderMedioAI.events(totalDBTags)
    })
  },

  events: totalDBTags => {
    document.getElementById('searchTags').addEventListener('input', e => {
      tagBuilderMedioAI.search(e, totalDBTags)
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
        newTags.unshift({
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
