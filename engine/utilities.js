/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const utilitiesMedioAI = {
  quill: null,

  getSettings: key => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['medioaiSettings'], function (result) {
        resolve(result.medioaiSettings[key])
      })
    })
  },

  setHotKeys: e => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('medioAI-songstudio')
      overlay.style.transform = 'translateX(-100%)'
      document.body.style.overflow = 'auto'

      const overlay2 = document.getElementById('medioAI-tagbuilder')
      overlay2.style.transform = 'translateX(-100%)'
    }

    if ((e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
      const overlay = document.getElementById('medioAI-songstudio')
      overlay.style.transform = 'translateX(0)'
      document.body.style.overflow = 'hidden'
    }

    if ((e.ctrlKey && e.key === 'j') || (e.metaKey && e.key === 'j')) {
      const overlay = document.getElementById('medioAI-tagbuilder')
      overlay.style.transform = 'translateX(0)'
      document.body.style.overflow = 'hidden'
    }
  },

  uuidv4: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  formatDate: date => {
    date = new Date(date)
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: true,
    }

    let formatter = new Intl.DateTimeFormat('en-US', options)
    let formattedParts = formatter.formatToParts(date)

    let month, day, year, time
    for (let part of formattedParts) {
      switch (part.type) {
        case 'month':
          month = part.value
          break
        case 'day':
          day = part.value
          break
        case 'year':
          year = part.value
          break
        case 'hour':
        case 'minute':
        case 'dayPeriod':
          time = (time ? time : '') + part.value + (part.type === 'dayPeriod' ? '' : ':')
          break
      }
    }

    return `${time.trim()} on ${month} ${day}, ${year}`
  },

  randomStartingText: () => {
    return utilitiesMedioAI.placeholders[Math.floor(Math.random() * utilitiesMedioAI.placeholders.length)]
  },

  showNotification: msg => {
    if (document.querySelector('.medioaiNotice')) {
      document.querySelector('.medioaiNotice').remove()
    }

    const notification = document.createElement('div')
    notification.setAttribute(
      'class',
      'medioaiNotice fixed top-2 right-2 p-4 bg-gray-400 border rounded text-gray-300 text-white text-center'
    )
    notification.setAttribute(
      'style',
      'z-index: 999999999999999999; background: #111; color: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.23); border: 1px solid #24CA8B;'
    )

    notification.innerHTML = `<p>${msg}</p>`

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  },

  clearDB: () => {
    chrome.storage.sync.get('medioTags', data => {
      if (data.medioTags) {
        chrome.storage.sync.remove('medioTags', () => {})
      }
    })
    chrome.storage.sync.get('medioLyrics', data => {
      if (data.medioLyrics) {
        chrome.storage.sync.remove('medioLyrics', () => {})
      }
    })
  },

  quill: () => {
    function insertText(quill, text) {
      const range = quill.getSelection()
      if (range) {
        const newText = `${text}\n`
        quill.insertText(range.index, newText)
        quill.setSelection(range.index + newText.length)
      }
    }
    const CustomDropdown = function (quill, options) {
      let toolbar = quill.getModule('toolbar')
      toolbar.addHandler('custom-dropdown', function (value) {
        if (value) {
          insertText(quill, value)
        }
      })
    }

    Quill.register('modules/customDropdown', CustomDropdown)

    utilitiesMedioAI.quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: utilitiesMedioAI.randomStartingText(),
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            'custom-dropdown': function (value) {
              insertText(this.quill, value)
            },
          },
        },
        customDropdown: true,
      },
    })

    function addCommandClass() {
      const editor = document.querySelector('#editor')
      const paragraphs = editor.querySelectorAll('p')
      paragraphs.forEach(p => {
        if (/^\[.*\]$/.test(p.textContent.trim())) {
          p.classList.add('medioCommand')
        } else {
          p.classList.remove('medioCommand')
        }
      })
    }

    utilitiesMedioAI.quill.on('text-change', function () {
      addCommandClass()

      const el = document.getElementById('medioCharactersSelected')
      el.style.display = 'none'

      setTimeout(() => {
        let editor = utilitiesMedioAI.quill.root
        let codeBlocks = editor.querySelectorAll('.ql-code-block')

        codeBlocks.forEach(codeBlock => {
          let text = codeBlock.textContent
          let p = document.createElement('p')
          p.textContent = text
          codeBlock.replaceWith(p)
        })
      }, 0)
    })

    utilitiesMedioAI.quill.on('selection-change', function (range, oldRange, source) {
      const el = document.getElementById('medioCharactersSelected')
      if (range) {
        if (el && range.length == 0) {
          el.style.display = 'none'
        } else {
          const text = utilitiesMedioAI.quill.getText(range.index, range.length)
          const charCount = text.length
          let className = 'text-white font-bold'
          if (charCount > 350) {
            className = 'text-red-500 font-bold'
          }
          el.style.display = 'inline-block'
          el.innerHTML =
            "<strong class='" +
            className +
            "'>" +
            charCount +
            "</strong> characters selected. <em class='italic text-gray-500'>(Recommended: Less than 350 characters per section)</em>"
        }
      } else if (el) {
        el.style.display = 'none'
      }
    })

    document.querySelector('.ql-custom-dropdown').addEventListener('change', function () {
      let value = this.value
      quill.getModule('toolbar').handlers['custom-dropdown'].call(quill, value)
      this.value = ''
    })

    utilitiesMedioAI.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = []

      delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert + '\n',
          })
        }
      })

      delta.ops = ops

      let length = utilitiesMedioAI.quill.getLength()
      let range = { index: 0, length: length }
      if (range.length > 0) {
        utilitiesMedioAI.quill.removeFormat(range, Quill.sources.USER)
      }

      return delta
    })
  },

  placeholders: [
    'Compose an epic song here...',
    'Write a love song...',
    'Pen your next hit single...',
    'Create a catchy chorus...',
    'Start your ballad here...',
    'Write lyrics from the heart...',
    'Craft a song about summer...',
    'Compose a tune for rainy days...',
    'Write a song about adventure...',
    'Create a melody about friendship...',
    'Compose a song about dreams...',
    'Write a song about overcoming obstacles...',
    'Start your song about a journey...',
    'Create a love anthem...',
    'Pen a song about heartbreak...',
    'Compose a lullaby...',
    'Write an empowering song...',
    'Create a festive holiday song...',
    'Compose a song about nostalgia...',
    'Write lyrics about nature...',
    'Start your soulful tune here...',
    'Compose a song for a special occasion...',
    'Write a song inspired by the night sky...',
    'Create a dance track...',
    'Pen a song about new beginnings...',
    'Compose a tune about city life...',
    'Write a song about peace...',
    'Create a whimsical song...',
    'Compose a song about hope...',
    'Write a song about the ocean...',
  ],
}
