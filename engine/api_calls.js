/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const apiMedioAI = {
  apiRouter: async (messages, isChat = false, id, request, callback, isJSON, key) => {
    const aimodel = await utilitiesMedioAI.getSettings('aimodel')

    switch (aimodel) {
      case 'openai':
        apiMedioAI.openAI(messages, isChat, id, request, callback, isJSON, key)
        break
      case 'claudeai':
        apiMedioAI.claudeAI(messages, isChat, id, request, callback, isJSON, key)
        break
      case 'openrouterai':
        apiMedioAI.openRouterAI(messages, isChat, id, request, callback, isJSON, key)
        break
    }
  },

  openAI: async (messages, isChat = false, id, request, callback, isJSON, key) => {
    const url = 'https://api.openai.com/v1/chat/completions'
    const apikey = await utilitiesMedioAI.getSettings('openaikey')
    const bearer = 'Bearer ' + apikey
    const modal = await utilitiesMedioAI.getSettings('openaiModal')

    if (isChat) {
      chrome.storage.local.get([key], function (result) {
        const allMessages = result[key].find(chat => chat.id === id).messages
        allMessages.push({
          role: 'user',
          content: messages,
        })

        fetch(url, {
          method: 'POST',
          headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: modal,
            messages: allMessages,
          }),
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            callback(data, id, request)
          })
          .catch(error => {
            console.log('Something bad happened ' + error)
          })
      })
    } else {
      let body = {
        model: modal,
        messages: messages,
      }

      if (isJSON) {
        body = {
          model: modal,
          response_format: { type: 'json_object' },
          messages: messages,
        }
      }

      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          callback(data, id, request)
        })
        .catch(error => {
          console.log('Something bad happened ' + error)
        })
    }
  },

  openRouterAI: async (messages, isChat = false, id, request, callback, isJSON, key) => {
    const url = 'https://openrouter.ai/api/v1/chat/completions'
    const apikey = await utilitiesMedioAI.getSettings('openrouterapikey')
    const bearer = 'Bearer ' + apikey
    const modal = await utilitiesMedioAI.getSettings('openrouterModal')
    const YOUR_SITE_URL = 'https://www.udio.com'
    const YOUR_SITE_NAME = 'Udio + MedioAI'

    if (isChat) {
      chrome.storage.local.get([key], function (result) {
        const allMessages = result[key].find(chat => chat.id === id).messages
        allMessages.push({
          role: 'user',
          content: messages,
        })

        fetch(url, {
          method: 'POST',
          headers: {
            Authorization: bearer,
            'HTTP-Referer': `${YOUR_SITE_URL}`,
            'X-Title': `${YOUR_SITE_NAME}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: modal,
            max_tokens: 1000,
            messages: allMessages,
          }),
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            callback(data, id, request)
          })
          .catch(error => {
            console.log('Something bad happened ' + error)
          })
      })
    } else {
      let body = {
        model: modal,
        max_tokens: 1000,
        messages: messages,
      }

      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: bearer,
          'HTTP-Referer': `${YOUR_SITE_URL}`,
          'X-Title': `${YOUR_SITE_NAME}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          callback(data, id, request)
        })
        .catch(error => {
          console.log('Something bad happened ' + error)
        })
    }
  },

  checkRhymes: async () => {
    const word = document.getElementById('wordInput').value
    const resultsDiv = document.getElementById('results')
    resultsDiv.innerHTML = ''
    document.querySelector('#medioRhymeExplainer').style.display = 'none'
    document.querySelector('#results').style.display = 'grid'
    if (!word) {
      resultsDiv.innerHTML = '<p class="italic opacity-50 text-sm">Nothing found, try again.</p>'
      return
    }
    try {
      const response = await fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
      const data = await response.json()

      if (data.length === 0) {
        resultsDiv.innerHTML = `<p class="italic opacity-50 text-sm">Nothing found for "${word}".</p>`
        return
      }

      data.forEach(item => {
        const listItem = document.createElement('div')
        listItem.setAttribute('class', 'rhymingWord border p-2 rounded-lg text-lg font-bold')
        listItem.textContent = item.word
        resultsDiv.appendChild(listItem)
      })

      const rhymingWords = document.querySelectorAll('.rhymingWord')
      rhymingWords.forEach(rhymingWord => {
        rhymingWord.addEventListener('click', e => {
          const text = rhymingWord.textContent
          e.target.textContent = 'Copied!'
          navigator.clipboard.writeText(text)
          setTimeout(() => {
            e.target.textContent = text
          }, 700)
        })
      })
    } catch (error) {
      resultsDiv.innerHTML = `<p>Error fetching rhyming words: ${error.message}</p>`
    }
  },

  update: (key, data, id, request) => {
    document.querySelector('#medioaichat .mediochatloading').remove()
    const newMsg = document.createElement('div')
    newMsg.classList.add('medioaimessage')
    newMsg.classList.add('medioaiagent')
    newMsg.innerHTML = data['choices'][0].message.content
    document.querySelector('#medioaichat').append(newMsg)
    document.querySelector('#medioaichat').scrollTop = document.querySelector('#medioaichat').scrollHeight

    chrome.storage.local.get([key], function (result) {
      const chats = result[key] || []
      const chatIndex = chats.findIndex(chat => chat.id === id)

      if (chatIndex > -1) {
        chats[chatIndex].messages.push({
          role: 'user',
          content: request,
        })
        chats[chatIndex].messages.push({
          role: 'assistant',
          content: data['choices'][0].message.content,
        })
      }

      chats.forEach(chat => {
        chat.messages = chat.messages.filter(
          (msg, index, self) => index === self.findIndex(t => t.content === msg.content)
        )
      })

      chrome.storage.local.set({ [key]: chats })
    })
  },

  askQuestion: async () => {
    const request = document.getElementById('medioaskai').value

    if (!request) {
      utilitiesMedioAI.showNotification('Please enter a question.')
      return
    } else {
      document.querySelectorAll('.lyric-tab').forEach(item => {
        item.style.display = 'none'
      })
      document.querySelector('#mediochattab').style.display = 'block'
      document.querySelector('#medioaichat').innerHTML = ``

      const newMsg = document.createElement('div')
      newMsg.classList.add('medioaimessage')
      newMsg.classList.add('medioaiuser')
      newMsg.innerText = request
      document.querySelector('#medioaichat').append(newMsg)

      const tempMsg = document.createElement('div')
      tempMsg.classList.add('medioaimessage')
      tempMsg.classList.add('medioaiagent')
      tempMsg.classList.add('mediochatloading')
      tempMsg.innerHTML = `
        <div class='flex items-center space-x-2'>
          ${iconsMedioAI.typing}
          <span class="opacity-50">Typing...</span>
        </div>`
      document.querySelector('#medioaichat').append(tempMsg)

      const currentLyrics = utilitiesMedioAI.quill.root.innerHTML
      const songTitle = document.getElementById('lyric-title').value || ''
      let includeLyrics = ''
      if (document.querySelector('#medioaiIncludeLyrics').checked) {
        includeLyrics = `
          ----

          Here are the current song lyrics with title, "${songTitle}" for reference only:
          
          ${currentLyrics}
        `
      }

      let system = await utilitiesMedioAI.getSettings('systemPromptAsk')
      system += includeLyrics

      const id = utilitiesMedioAI.uuidv4()
      document.querySelector('#medioaichat').setAttribute('data-id', id)

      chrome.storage.local.get(['medioaiChats'], async result => {
        const chats = result.medioaiChats || []
        chats.unshift({
          id: id,
          created_at: new Date().toISOString(),
          song_id: document.getElementById('lyric-id').value,
          song_title: songTitle,
          title: request || 'Untitled Chat',
          messages: [
            {
              role: 'system',
              content: system,
            },
            {
              role: 'user',
              content: request,
            },
          ],
        })

        chrome.storage.local.set({ medioaiChats: chats })

        await apiMedioAI.apiRouter(
          [
            {
              role: 'system',
              content: system,
            },
            {
              role: 'user',
              content: request,
            },
          ],
          false,
          id,
          request,
          data => {
            apiMedioAI.update('medioaiChats', data, id, request)
          }
        )
      })
    }
  },

  sendMessage: async key => {
    const request = document.getElementById('medioaiMessageBox').value
    const newMsg = document.createElement('div')
    newMsg.classList.add('medioaimessage')
    newMsg.classList.add('medioaiuser')
    newMsg.innerText = request
    document.querySelector('#medioaichat').append(newMsg)

    const tempMsg = document.createElement('div')
    tempMsg.classList.add('medioaimessage')
    tempMsg.classList.add('medioaiagent')
    tempMsg.classList.add('mediochatloading')
    tempMsg.innerHTML = `
        <div class='flex items-center space-x-2'>
          ${iconsMedioAI.typing}
          <span class="opacity-50">Typing...</span>
        </div>`
    document.querySelector('#medioaichat').append(tempMsg)
    document.querySelector('#medioaichat').scrollTop = document.querySelector('#medioaichat').scrollHeight
    document.getElementById('medioaiMessageBox').value = ''
    const id = document.querySelector('#medioaichat').getAttribute('data-id')

    await apiMedioAI.apiRouter(
      request,
      true,
      id,
      request,
      data => {
        apiMedioAI.update(key, data, id, request)
      },
      false,
      key
    )
  },

  writeSong: async e => {
    const title = document.querySelector('#mediowriterSongTitle').value
    const theme = document.querySelector('#mediowriterTheme').value
    const emotion = document.querySelector('#mediowriterEmotion').value
    const tags = document.querySelector('#mediowriterTags').value
    const structure = document.querySelector('#mediowriterStructure').value
    const request = `Write a song for me, called "${title || 'Untitled Song'}".`
    const details = `
      Here are the details of the song you are writing:
        
      Title: ${title || 'Untitled Song'}
      Theme: ${theme}
      Emotion: ${emotion}
      Tags: ${tags}
      Structure: ${structure}
    `

    let system = await utilitiesMedioAI.getSettings('systemPromptAsk')
    system += details

    const newMsg = document.createElement('div')
    newMsg.classList.add('medioaimessage')
    newMsg.classList.add('medioaiuser')
    newMsg.innerText = `Write a song for me, called "${title || 'Untitled Song'}".`
    document.querySelector('#medioaichat').append(newMsg)

    const tempMsg = document.createElement('div')
    tempMsg.classList.add('medioaimessage')
    tempMsg.classList.add('medioaiagent')
    tempMsg.classList.add('mediochatloading')
    tempMsg.innerHTML = `
        <div class='flex items-center space-x-2'>
          ${iconsMedioAI.typing}
          <span class="opacity-50">Typing...</span>
        </div>`
    document.querySelector('#medioaichat').append(tempMsg)

    const id = utilitiesMedioAI.uuidv4()
    document.querySelector('#medioaichat').setAttribute('data-id', id)

    chrome.storage.local.get(['medioaiSongChats'], async result => {
      const chats = result.medioaiSongChats || []
      chats.push({
        id: id,
        created_at: new Date().toISOString(),
        title: title || 'Untitled Song',
        messages: [
          {
            role: 'system',
            content: system,
          },
          {
            role: 'user',
            content: request,
          },
        ],
      })

      chrome.storage.local.set({ medioaiSongChats: chats })

      await apiMedioAI.apiRouter(
        [
          {
            role: 'system',
            content: system,
          },
          {
            role: 'user',
            content: request,
          },
        ],
        false,
        id,
        request,
        data => {
          apiMedioAI.update('medioaiSongChats', data, id, request)
        }
      )
    })
  },

  randomSong: async e => {
    const title = document.querySelector('#mediowriterSongTitle')
    const theme = document.querySelector('#mediowriterTheme')
    const emotion = document.querySelector('#mediowriterEmotion')
    const tags = document.querySelector('#mediowriterTags')
    const structure = document.querySelector('#mediowriterStructure')
    const request = `Please come up with a random song for me. Here are the details to follow.
    
    Title, Theme, Emotion, Tags, Structure.
    `
    const system = await utilitiesMedioAI.getSettings('systemPromptRandom')

    await apiMedioAI.apiRouter(
      [
        {
          role: 'system',
          content: system,
        },
        {
          role: 'user',
          content: request,
        },
      ],
      false,
      null,
      null,
      data => {
        data = JSON.parse(data.choices[0].message.content)
        title.value = data.title
        theme.value = data.theme
        emotion.value = data.emotion
        tags.value = data.tags
        structure.value = data.structure
        document.getElementById('medioSongRollDice').querySelector('span').innerHTML = 'Randomize'
        document.getElementById('medioSongRollDice').classList.remove('disabled')
      },
      true
    )
  },
}
