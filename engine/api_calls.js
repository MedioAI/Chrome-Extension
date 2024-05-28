/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const apiMedioAI = {
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

  askOpenAI: (messages, openaikey, isChat = false, id, request) => {
    const url = 'https://api.openai.com/v1/chat/completions'
    const bearer = 'Bearer ' + openaikey

    if (isChat) {
      chrome.storage.local.get(['medioaiChats'], function (result) {
        console.log(
          result.medioaiChats,
          result.medioaiChats.find(chat => chat.id === id),
          id
        )
        const allMessages = result.medioaiChats.find(chat => chat.id === id).messages

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
            model: 'gpt-4o',
            messages: allMessages,
          }),
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            apiMedioAI.update(data, id, request)
          })
          .catch(error => {
            console.log('Something bad happened ' + error)
          })
      })
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: messages,
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          apiMedioAI.update(data, id, request)
        })
        .catch(error => {
          console.log('Something bad happened ' + error)
        })
    }
  },

  update: (data, id, request) => {
    document.querySelector('#medioaichat .mediochatloading').remove()
    const newMsg = document.createElement('div')
    newMsg.classList.add('medioaimessage')
    newMsg.classList.add('medioaiagent')
    newMsg.innerHTML = data['choices'][0].message.content
    document.querySelector('#medioaichat').append(newMsg)
    document.querySelector('#medioaichat').scrollTop = document.querySelector('#medioaichat').scrollHeight

    chrome.storage.local.get(['medioaiChats'], function (result) {
      const chats = result.medioaiChats || []
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

      chrome.storage.local.set({ medioaiChats: chats })
    })
  },

  askQuestion: () => {
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
        includeLyrics = `----

        Here are the current song lyrics with title, "${songTitle}" for reference only:
        
        ${currentLyrics}`
      }
      const system = `You are a song writing assistant. Your goal is to provide helpful feedback and requests given to your by the user. You have lyrics from the user as reference. Always provide your response as html code without code block just the raw HTML formatting your answer. Always provide a robust answer. Do not add your own classnames or IDs. NEVER respond with the full lyrics. Only provide your response to the request. You can ONLY use h1, h2, h3, ul, ol, and p tags only. If you are showing your changes to lyrics, wrap your changes in classname "medioai-highlightgray". If you need to highlight a small area, you can with "medioai-hightlightyellow". Do not respond with the just the lyrics. If you are not sure what to say ask.
            
        ${includeLyrics}`

      const id = utilitiesMedioAI.uuidv4()
      document.querySelector('#medioaichat').setAttribute('data-id', id)

      chrome.storage.local.get(['medioaiChats'], async result => {
        const chats = result.medioaiChats || []
        chats.push({
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

        const openaikey = await utilitiesMedioAI.getSettings('openaikey')
        await apiMedioAI.askOpenAI(
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
          openaikey,
          false,
          id,
          request
        )
      })
    }
  },

  sendMessage: async () => {
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

    const openaikey = await utilitiesMedioAI.getSettings('openaikey')
    await apiMedioAI.askOpenAI(
      request,
      openaikey,
      true,
      document.querySelector('#medioaichat').getAttribute('data-id'),
      request
    )
  },
}
