/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const pastChatListMedioAI = {
  init: () => {
    document.querySelector('#medioask').style.display = 'none'
    document.querySelector('#mediochats').style.display = 'block'

    chrome.storage.local.get(['medioaiChats'], result => {
      const chats = result.medioaiChats || []
      const chatList = document.getElementById('mediochats')

      const header = document.createElement('div')
      header.innerHTML = `<div class="flex items-center space-x-2 justify-between mb-2">
          <input id="medioSearchChatList" type="text" placeholder="Search..." class="w-full rounded border p-1 px-2" />
          <div id="medioPagination" class="flex items-center" style="width: 400px">
            <button id="medioPrev" class="medioDisabled">Previous</button>
            <div data-current="1" data-max="${chats.length}" id="medioPageCount" class="w-full">
              Page 1 of ${chats.length}
            </div>
            <button id="medioNext">Next</button>
          </div>
        </div>`

      chatList.innerHTML = ''
      chatList.append(header)
      const container = document.createElement('div')
      container.classList.add('medioListContainer')

      medioAI.chatHistory = chats
      let currentPortion = chats.slice(0, medioAI.perPage)
      let totalPages = chats.length / medioAI.perPage
      document.querySelector('#medioPageCount').innerText = '1 of ' + totalPages + ' Pages'
      document.querySelector('#medioPageCount').setAttribute('data-max', totalPages)
      document.querySelector('#medioPageCount').setAttribute('data-current', 1)

      currentPortion.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${chat.song_title}</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`
        container.append(newChat)
      })

      chatList.append(container)

      const searchBox = document.querySelector('#medioSearchChatList')
      searchBox.addEventListener('input', e => {
        const search = e.target.value.toLowerCase()
        const chats = medioAI.chatHistory

        if (search === '') {
          container.innerHTML = ''
          const firstChats = chats.slice(0, medioAI.perPage)
          firstChats.reverse().forEach(chat => {
            const newChat = document.createElement('div')
            newChat.setAttribute('data-id', chat.id)
            newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${chat.song_title}</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`
            container.append(newChat)
          })

          document.querySelector('#medioPageCount').setAttribute('data-current', '1')
          document.querySelector('#medioPageCount').setAttribute('data-max', chats.length)
          document.querySelector('#medioPageCount').innerHTML = `Page 1 of ${chats.length}`

          document.querySelector('#medioPrev').classList.add('medioDisabled')
          document.querySelector('#medioNext').classList.remove('medioDisabled')

          return
        }

        const filteredChats = chats.filter(chat => {
          if (chat.name) {
            return chat.name.toLowerCase().includes(search) || chat.song_title.toLowerCase().includes(search)
          } else {
            return chat.song_title.toLowerCase().includes(search)
          }
        })

        container.innerHTML = ''

        filteredChats.reverse().forEach(chat => {
          const newChat = document.createElement('div')
          newChat.setAttribute('data-id', chat.id)
          newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${chat.song_title}</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`
          container.append(newChat)
        })

        document.querySelector('#medioPageCount').innerHTML = '1 of 1 Pages'

        document.querySelector('#medioPrev').classList.add('medioDisabled')
        document.querySelector('#medioNext').classList.add('medioDisabled')
      })

      const medioPrev = document.getElementById('medioPrev')
      medioPrev.addEventListener('click', async e => {
        const current = parseInt(document.querySelector('#medioPageCount').getAttribute('data-current')) - 1

        if (current < 1) {
          document.querySelector('#medioPrev').classList.add('medioDisabled')
          return
        } else {
          document.querySelector('#medioPageCount').setAttribute('data-current', current)
          const chats = medioAI.chatHistory
          const currentPortion = chats.slice(
            current * medioAI.perPage - medioAI.perPage,
            current * medioAI.perPage
          )
          document.querySelector('#medioPrev').classList.remove('medioDisabled')
          container.innerHTML = ''
          currentPortion.reverse().forEach(chat => {
            const newChat = document.createElement('div')
            newChat.setAttribute('data-id', chat.id)
            newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${chat.song_title}</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`
            container.append(newChat)
          })

          document.querySelector('#medioPageCount').innerText = current + ' of ' + totalPages + ' Pages'

          if (parseInt(current) === 1) {
            document.querySelector('#medioPrev').classList.add('medioDisabled')
          }
          if (parseInt(current) !== parseInt(totalPages)) {
            document.querySelector('#medioNext').classList.remove('medioDisabled')
          }
        }
      })

      const medioNext = document.getElementById('medioNext')
      medioNext.addEventListener('click', async e => {
        const current = parseInt(document.querySelector('#medioPageCount').getAttribute('data-current')) + 1
        const max = parseInt(document.querySelector('#medioPageCount').getAttribute('data-max'))

        if (current > max) {
          e.target.classList.add('medioDisabled')
          return
        } else {
          if (current === max) {
            e.target.classList.add('medioDisabled')
          }
          document.querySelector('#medioPageCount').setAttribute('data-current', current)
          const chats = medioAI.chatHistory
          const currentPortion = chats.slice(
            (current - 1) * medioAI.perPage,
            (current - 1) * medioAI.perPage + medioAI.perPage
          )
          document.querySelector('#medioPrev').classList.remove('medioDisabled')
          container.innerHTML = ''
          currentPortion.reverse().forEach(chat => {
            const newChat = document.createElement('div')
            newChat.setAttribute('data-id', chat.id)
            newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${chat.song_title}</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`
            container.append(newChat)
          })

          document.querySelector('#medioPageCount').innerText = current + ' of ' + totalPages + ' Pages'
        }
      })

      const chatItemView = document.querySelectorAll('.medioChatItemView')
      chatItemView.forEach(item => {
        item.addEventListener('click', async e => {
          const chatId = e.target.getAttribute('data-id')
          const chat = chats.find(item => item.id === chatId)
          document.querySelector('#mediochattab').style.display = 'block'
          document.querySelector('#mediochats').style.display = 'none'
          document.querySelector('#medioaichat').innerHTML = ''
          document.querySelector('#medioaichat').setAttribute('data-id', chat.id)
          chat.messages.forEach(message => {
            const newMessage = document.createElement('div')
            newMessage.classList.add('medioaimessage')
            newMessage.classList.add(`medioai${message.role}`)
            newMessage.innerHTML = message.content
            document.querySelector('#medioaichat').append(newMessage)
          })
        })
      })
    })
  },
}
