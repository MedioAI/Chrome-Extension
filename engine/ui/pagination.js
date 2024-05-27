/*
 * Icons from Iconify.com
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const paginationMedioAI = {
  chatHistory: [],
  perPage: 2,

  init: (key, id, callback) => {
    chrome.storage.local.get([key], result => {
      const items = result[key] || []
      const container = document.getElementById(id)
      const header = document.createElement('div')
      const wrapper = document.createElement('div')

      header.innerHTML = paginationMedioAI.header(items.length)
      container.innerHTML = ''
      container.append(header)
      wrapper.classList.add('medioListContainer')
      paginationMedioAI.chatHistory = items

      const currentPortion = items.slice(0, paginationMedioAI.perPage)
      const totalPages = Math.ceil(items.length / paginationMedioAI.perPage)

      document.querySelector('#medioPageCount').innerText = '1 of ' + totalPages + ' Pages'
      document.querySelector('#medioPageCount').setAttribute('data-max', totalPages)
      document.querySelector('#medioPageCount').setAttribute('data-current', 1)

      currentPortion.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        wrapper.append(newChat)
      })

      container.append(wrapper)
      paginationMedioAI.events(key, callback, items, wrapper, totalPages)
    })
  },

  events: (key, callback, items, wrapper, totalPages) => {
    const searchBox = document.querySelector('#medioSearchChatList')
    searchBox.addEventListener('input', e => {
      paginationMedioAI.search(e.target.value, wrapper, totalPages)
      paginationMedioAI.open(key, items, callback)
    })

    const medioPrev = document.getElementById('medioPrev')
    medioPrev.addEventListener('click', async e => {
      paginationMedioAI.previous(e, wrapper, totalPages)
      paginationMedioAI.open(key, items, callback)
    })

    const medioNext = document.getElementById('medioNext')
    medioNext.addEventListener('click', async e => {
      paginationMedioAI.next(e, wrapper, totalPages)
      paginationMedioAI.open(key, items, callback)
    })

    paginationMedioAI.open(key, items, callback)
  },

  open: (key, items, callback) => {
    const chatItemView = document.querySelectorAll('.medioChatItem')
    chatItemView.forEach(item => {
      item.addEventListener('click', async e => {
        const id = e.target.closest('.medioChatItem').getAttribute('data-id')
        const item = items.find(item => item.id === id)
        callback(item)
      })
    })

    const medioChatDelete = document.querySelectorAll('.medioChatItem .medioChatDelete')
    medioChatDelete.forEach(item => {
      item.addEventListener('click', async e => {
        const el = e.target.closest('.medioChatItem')
        const id = el.getAttribute('data-id')

        if (el.classList.contains('confirmDelete')) {
          const index = items.findIndex(item => item.id === id)
          items.splice(index, 1)

          chrome.storage.local.set({ [key]: items }, () => {
            el.remove()
          })
        } else {
          el.classList.add('confirmDelete')
          setTimeout(() => {
            el.classList.remove('confirmDelete')
          }, 3000)
        }
      })
    })
  },

  search: (value, wrapper, totalPages) => {
    const search = value.toLowerCase()
    const chats = paginationMedioAI.chatHistory

    if (search === '') {
      wrapper.innerHTML = ''
      const firstChats = chats.slice(0, paginationMedioAI.perPage)
      firstChats.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        wrapper.append(newChat)
      })

      document.querySelector('#medioPageCount').setAttribute('data-current', '1')
      document.querySelector('#medioPageCount').setAttribute('data-max', chats.length)
      document.querySelector('#medioPageCount').innerHTML = `Page 1 of ${totalPages}`
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

    wrapper.innerHTML = ''

    if (!filteredChats.length) {
      wrapper.innerHTML = '<p class="italic opacity-50">Nothing found...</p>'
    }

    filteredChats.reverse().forEach(chat => {
      const newChat = document.createElement('div')
      newChat.setAttribute('data-id', chat.id)
      newChat.innerHTML = paginationMedioAI.block(chat)
      wrapper.append(newChat)
    })

    document.querySelector('#medioPageCount').innerHTML = '1 of 1 Pages'
    document.querySelector('#medioPrev').classList.add('medioDisabled')
    document.querySelector('#medioNext').classList.add('medioDisabled')
  },

  previous: (e, wrapper, totalPages) => {
    const current = parseInt(document.querySelector('#medioPageCount').getAttribute('data-current')) - 1

    if (current < 1) {
      document.querySelector('#medioPrev').classList.add('medioDisabled')
      return
    } else {
      document.querySelector('#medioPageCount').setAttribute('data-current', current)
      const chats = paginationMedioAI.chatHistory
      const currentPortion = chats.slice(
        current * paginationMedioAI.perPage - paginationMedioAI.perPage,
        current * paginationMedioAI.perPage
      )
      document.querySelector('#medioPrev').classList.remove('medioDisabled')
      wrapper.innerHTML = ''
      currentPortion.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        wrapper.append(newChat)
      })

      document.querySelector('#medioPageCount').innerText = current + ' of ' + totalPages + ' Pages'

      if (parseInt(current) === 1) {
        document.querySelector('#medioPrev').classList.add('medioDisabled')
      }
      if (parseInt(current) !== parseInt(totalPages)) {
        document.querySelector('#medioNext').classList.remove('medioDisabled')
      }
    }
  },

  next: (e, container, totalPages) => {
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
      const chats = paginationMedioAI.chatHistory
      const currentPortion = chats.slice(
        (current - 1) * paginationMedioAI.perPage,
        (current - 1) * paginationMedioAI.perPage + paginationMedioAI.perPage
      )
      document.querySelector('#medioPrev').classList.remove('medioDisabled')
      container.innerHTML = ''
      currentPortion.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        container.append(newChat)
      })

      document.querySelector('#medioPageCount').innerText = current + ' of ' + totalPages + ' Pages'
    }
  },

  header: length => {
    return /* html */ `<div class="flex items-center space-x-2 justify-between mb-2">
          <input id="medioSearchChatList" type="text" autocomplete="off" placeholder="Search..." class="w-full rounded border p-1 px-2" />
          <div id="medioPagination" class="flex items-center" style="width: 400px">
            <button id="medioPrev" class="medioDisabled">Previous</button>
            <div data-current="1" data-max="${length}" id="medioPageCount" class="w-full">
              Page 1 of ${length}
            </div>
            <button id="medioNext">Next</button>
          </div>
        </div>`
  },

  block: item => {
    return /* html */ `<div data-id="${
      item.id
    }" class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${item.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400">
        <span style="opacity: 0.5">${utilitiesMedioAI.formatDate(item.created_at || Date.now())}</span> 
        <span style="opacity: 0.5">${item.song_title}</span></p>
      </div>
      <button class="medioChatDelete" data-id="${item.id}">
        ${iconsMedioAI.trash}
      </button>
    </div>`
  },
}
