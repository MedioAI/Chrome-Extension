/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const apiMedioAI = {
  apiRouter: async (messages, isChat = false, id, request, callback, isJSON = false, key) => {
    const aimodel = await utilitiesMedioAI.getSettings('aimodel')

    switch (aimodel) {
      case 'openai':
        apiMedioAI.openAI(messages, isChat, id, request, callback, isJSON, key)
        break
      case 'openrouterai':
        apiMedioAI.openRouterAI(messages, isChat, id, request, callback, isJSON, key)
        break
      default:
        apiMedioAI.openAI(messages, isChat, id, request, callback, isJSON, key)
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

  openAITalk: async (message, voice = 'alloy', callback) => {
    const url = 'https://api.openai.com/v1/audio/speech'
    const apikey = await utilitiesMedioAI.getSettings('openaikey')
    const bearer = 'Bearer ' + apikey

    const body = {
      model: 'tts-1',
      input: message,
      voice: voice,
      response_format: 'mp3',
    }

    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} - Something went wrong with OpenAI request.`)
          }
          return response.blob()
        })
        .then(blob => {
          const url = URL.createObjectURL(blob)
          callback(url)
        })
        .catch(error => {
          console.log('Something bad happened ' + error)
        })
    } catch (error) {
      utilitiesMedioAI.showNotification(error, 'error')
      if (document.querySelector('#medio-radio-close')) {
        document.querySelector('#medio-radio-close').click()
      }
    }
  },

  openRouterAI: async (messages, isChat = false, id, request, callback, isJSON, key) => {
    const url = 'https://openrouter.ai/api/v1/chat/completions'
    const apikey = await utilitiesMedioAI.getSettings('openrouterapikey')
    const bearer = 'Bearer ' + apikey
    const modal = await utilitiesMedioAI.getSettings('openrouterModal')
    const site_url = 'https://www.udio.com'
    const site_name = 'Udio + MedioAI'

    try {
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
              'HTTP-Referer': `${site_url}`,
              'X-Title': `${site_name}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: modal,
              max_tokens: 1000,
              messages: allMessages,
            }),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`${response.status} - Something went wrong with OpenRouter request.`)
              }
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
            'HTTP-Referer': `${site_url}`,
            'X-Title': `${site_name}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`${response.status} - Something went wrong with OpenRouter request.`)
            }
            return response.json()
          })
          .then(data => {
            if (data.error) {
              utilitiesMedioAI.showNotification(data.error.message, 'error')
              if (document.querySelector('#medio-radio-close')) {
                document.querySelector('#medio-radio-close').click()
              }
              return
            }
            callback(data, id, request)
          })
          .catch(error => {
            utilitiesMedioAI.showNotification(error, 'error')
            if (document.querySelector('#medio-radio-close')) {
              document.querySelector('#medio-radio-close').click()
            }
            console.log('Something bad happened ' + error)
          })
      }
    } catch (error) {
      utilitiesMedioAI.showNotification(error, 'error')
      if (document.querySelector('#medio-radio-close')) {
        document.querySelector('#medio-radio-close').click()
      }
    }
  },

  elevenLabsTalk: async (message, voice_id = '21m00Tcm4TlvDq8ikWAM', callback) => {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`
    const apikey = await utilitiesMedioAI.getSettings('elevenlabsapikey_voice')

    const body = {
      text: message,
      model_id: 'eleven_multilingual_v2',
    }

    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': apikey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} - Something went wrong with ElevenLabs request.`)
          }
          return response.blob()
        })
        .then(blob => {
          const url = URL.createObjectURL(blob)
          callback(url)
        })
        .catch(error => {
          utilitiesMedioAI.showNotification(error, 'error')
          if (document.querySelector('#medio-radio-close')) {
            document.querySelector('#medio-radio-close').click()
          }
          console.log('Something bad happened ' + error)
        })
    } catch (error) {
      utilitiesMedioAI.showNotification(error, 'error')
      if (document.querySelector('#medio-radio-close')) {
        document.querySelector('#medio-radio-close').click()
      }
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
      if (!system) {
        system = `You are a song writing assistant. Your goal is to provide helpful feedback and requests given to your by the user. You have lyrics from the user as reference. Always provide your response as html code without code block just the raw HTML formatting your answer. Always provide a robust answer. Do not add your own classnames or IDs. NEVER respond with the full lyrics. Only provide your response to the request. You can ONLY use h1, h2, h3, ul, ol, and p tags only. If you are showing your changes to lyrics, wrap your changes in classname "medioai-highlightgray". If you need to highlight a small area, you can with "medioai-hightlightyellow". Do not respond with the just the lyrics. If you are not sure what to say ask.`
      }
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

    let system = await utilitiesMedioAI.getSettings('systemPromptSongWriter')
    if (!system) {
      system = `You are a song lyric writer. You focus on taking a Title, Theme, Emotion, Tags and Structure of a song and creating lyrics. You can also provide feedback on lyrics. You can only use h1, h2, h3, ul, ol, and p tags. You can also use the classnames "medioai-highlightgray" and "medioai-highlightyellow" to highlight areas of the lyrics. You will provide lyrics and work with user to improve them. If you are presenting lyrics to user, always wrap it in div with classname "medioai-copylyrics" so user can copy them. If you are not sure what to say ask. Only provide a summary of the title, theme, etc at the bottom of your response and wrap with div and class name "medioai-summary" if you need to, always use a title "Summary" if you are doing one. Never use class names witin classnames, if you do lyrics, only use that class name. You can respond with just lyrics. Always use brackets around commands like [Verse], etc. Use line break for each line of lyrics to bunch each verse or chorus together. Use new p tags for each section of lyrics. Use a strong tag for the commands to make it stand out. Always have commands on new line. ALWAYS format the lyrics you present to the lyrics at any point in the chat.`
    }
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
    let system = await utilitiesMedioAI.getSettings('systemPromptRandom')
    if (!system) {
      system = `You are a song lyric writer. You come up with a Title, Theme, Emotion, Tags, Structure. For a song a respond with JSON format only. Do not include a code block, pure valid JSON only. Here is example:
    
    {
      "title": "Title of Song",
      "theme": "Theme of Song",
      "emotion": "Emotion of Song",
      "tags": "Tags, for, song",
      "structure": "standard"
    }
    
    Come up with a title and use 2-3 sentences to describe each section, such as theme and emotion. When doing the Structure make sure to pick from one of the following: standard, epic, duet, storytelling and sonnet. You can come up with a random song each time.`
    }

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
