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
      resultsDiv.innerHTML = '<p>Please enter a word to search for.</p>'

      return
    }

    try {
      const response = await fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
      const data = await response.json()

      if (data.length === 0) {
        resultsDiv.innerHTML = `<p>No rhyming words found for "${word}".</p>`
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

  askOpenAI: (messages, openaikey, system, isChat = false, id) => {
    const url = 'https://api.openai.com/v1/chat/completions'
    const bearer = 'Bearer ' + openaikey

    if (isChat) {
      const chatWindow = document.querySelector('#medioaichat')
      const allMessages = Array.from(chatWindow.children)
      messages = [
        {
          role: 'system',
          content: system,
        },
      ]

      allMessages.forEach(message => {
        if (message.classList.contains('medioaiuser')) {
          messages.push({
            role: 'user',
            content: message.innerText,
          })
        } else if (message.classList.contains('medioaiagent')) {
          messages.push({
            role: 'assistant',
            content: message.innerText,
          })
        }
      })
    }

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
        document.querySelector('#medioaichat .mediochatloading').remove()
        const newMessage = document.createElement('div')
        newMessage.classList.add('medioaimessage')
        newMessage.classList.add('medioaiagent')
        newMessage.innerHTML = data['choices'][0].message.content
        document.querySelector('#medioaichat').append(newMessage)
        document.querySelector('#medioaichat').scrollTop = document.querySelector('#medioaichat').scrollHeight

        chrome.storage.local.get(['medioaiChats'], function (result) {
          const chats = result.medioaiChats || []
          const chatIndex = chats.findIndex(chat => chat.id === id)

          if (chatIndex > -1) {
            chats[chatIndex].messages.push({
              role: 'assistant',
              content: data['choices'][0].message.content,
            })
          }

          chrome.storage.local.set({ medioaiChats: chats })
        })
      })
      .catch(error => {
        console.log('Something bad happened ' + error)
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

      const newMessage = document.createElement('div')
      newMessage.classList.add('medioaimessage')
      newMessage.classList.add('medioaiuser')
      newMessage.innerText = request
      document.querySelector('#medioaichat').append(newMessage)

      const newMessage2 = document.createElement('div')
      newMessage2.classList.add('medioaimessage')
      newMessage2.classList.add('medioaiagent')
      newMessage2.classList.add('mediochatloading')
      newMessage2.innerHTML = `<div class='flex items-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><circle cx="16" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="12" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="8" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle></svg>
          <span class="opacity-50">Typing...</span>
        </div>`
      document.querySelector('#medioaichat').append(newMessage2)

      const currentLyrics = medioAI.quill.root.innerHTML
      const songTitle = document.getElementById('lyric-title').value || ''
      let includeLyrics = ''
      if (document.querySelector('#medioaiIncludeLyrics').checked) {
        includeLyrics = `----

        Here are the current song lyrics with title, "${songTitle}" for reference only:
        
        ${currentLyrics}`
      }
      const system = `You are a song writing assistant. Your goal is to provide helpful feedback and requests given to your by the user. You have lyrics from the user as reference. Always provide your response as html code without code block just the raw HTML formatting your answer. Always provide a robust answer. Do not add your own classnames or IDs. NEVER respond with the full lyrics. Only provide your response to the request. You can ONLY use h1, h2, h3, ul, ol, and p tags only. If you are showing your changes to lyrics, wrap your changes in classname "medioai-highlightyellow". Do not respond with the just the lyrics. If you are not sure what to say ask.
            
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
          name: request || 'Untitled Chat',
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
          system,
          false,
          id
        )
      })
    }
  },

  sendMessage: async () => {
    const request = document.getElementById('medioaiMessageBox').value
    const newMessage = document.createElement('div')
    newMessage.classList.add('medioaimessage')
    newMessage.classList.add('medioaiuser')
    newMessage.innerText = request
    document.querySelector('#medioaichat').append(newMessage)

    const newMessage2 = document.createElement('div')
    newMessage2.classList.add('medioaimessage')
    newMessage2.classList.add('medioaiagent')
    newMessage2.classList.add('mediochatloading')
    newMessage2.innerHTML = `<div class='flex items-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><circle cx="16" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="12" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="8" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle></svg>
          <span class="opacity-50">Typing...</span>
        </div>`
    document.querySelector('#medioaichat').append(newMessage2)

    document.querySelector('#medioaichat').scrollTop = document.querySelector('#medioaichat').scrollHeight

    document.getElementById('medioaiMessageBox').value = ''

    const openaikey = await utilitiesMedioAI.getSettings('openaikey')
    await apiMedioAI.askOpenAI(
      request,
      openaikey,
      true,
      document.querySelector('#medioaichat').getAttribute('data-id')
    )
  },
}
