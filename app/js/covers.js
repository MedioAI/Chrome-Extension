/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const covers = {
  init: () => {
    covers.load()
  },

  load: () => {
    const coverWrapper = document.getElementById('covers')
    chrome.storage.local.get('medioAICovers', async data => {
      const allCovers = data.medioAICovers

      if (!covers || allCovers.length === 0) {
        coverWrapper.setAttribute('class', 'flex items-center justify-center w-full text-xs italic')
        coverWrapper.innerHTML =
          '<p class="text-gray-300">No covers saved yet. Create a cover in Udio and click to save it to re-use later. Or enable auto-saving to save all covers.</p>'
        return
      }

      let total = allCovers.length
      let total_size = 0

      if (allCovers) {
        for (let index = 0; index < allCovers.length; index++) {
          const element = allCovers[index]
          total_size += element.bytes

          const cover_image = await new Promise((resolve, reject) => {
            chrome.storage.local.get('medioAICover_' + element.id, function (data) {
              resolve(data['medioAICover_' + element.id])
            })
          })
          const html = /* html */ `<div class="relative coverWrapper" data-index="${index}">
          <img
            src="${cover_image}"
            class="open cursor-pointer rounded-lg mb-2"
          />
          <h3 class="hidden text-xs text-gray-300 mb-2 truncate">${element.prompt}</h3>
          <div class="flex items-center space-x-2 justify-between">
            <div class="flex space-x-2">
              <button class="open btn text-sm p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8.5V4m0 0h4.5M4 4l5.5 5.5m10.5-1V4m0 0h-4.5M20 4l-5.5 5.5M4 15.5V20m0 0h4.5M4 20l5.5-5.5m10.5 1V20m0 0h-4.5m4.5 0l-5.5-5.5"/></svg>
              </button>
              <button class="download btn text-sm p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5l-4 5l-4-5m9 8h.01"
                  />
                </svg>
              </button>
              <button class="remove btn text-sm p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>`

          coverWrapper.innerHTML += html
        }

        document.getElementById('total').innerText = total
        document.getElementById('total_size').innerText = utilitiesMedioAI.formatBytes(total_size)

        const open = document.querySelectorAll('.open')
        open.forEach(element => {
          element.addEventListener('click', e => {
            covers.open(e)
          })
        })

        const download = document.querySelectorAll('.download')
        download.forEach(element => {
          element.addEventListener('click', e => {
            covers.download(e)
          })
        })

        const remove = document.querySelectorAll('.remove')
        remove.forEach(element => {
          element.addEventListener('click', e => {
            if (element.classList.contains('confirmDelete')) {
              covers.remove(e)
            } else {
              element.classList.add('confirmDelete')

              setTimeout(() => {
                element.classList.remove('confirmDelete')
              }, 3000)
            }
          })
        })
      }
    })
  },

  open: event => {
    const index = event.target.closest('.coverWrapper').dataset.index
    chrome.storage.local.get('medioAICovers', async data => {
      const covers = data.medioAICovers
      const cover = covers[index]
      // overlay with modal
      const overlay = document.createElement('div')
      overlay.setAttribute('class', 'fixed inset-0 bg-black bg-opacity-50 z-50')

      const modal = document.createElement('div')
      modal.setAttribute('class', 'fixed inset-0 flex items-center justify-center z-50')

      const cover_image = await new Promise((resolve, reject) => {
        chrome.storage.local.get('medioAICover_' + cover.id, function (data) {
          resolve(data['medioAICover_' + cover.id])
        })
      })
      modal.innerHTML = /* html */ `
        <div id="coverPreview" class="relative w-full max-w-2xl bg-black rounded-lg p-4">
          <img src="${cover_image}" lazy="true" class="rounded-lg w-full" />
          <h4 class="text-base mb-1 mt-6 text-gray-400">Prompt</h4>
          <h3 class="text-2xl">${covers[index].prompt}</h3>
        </div>

        <button class="close fixed top-2 right-2 p-2" style="font-size: 34px">
          &times;
        </button>
      `
      overlay.appendChild(modal)
      modal.querySelector('.close').addEventListener('click', () => {
        overlay.remove()
      })
      document.body.appendChild(overlay)

      document.addEventListener('keydown', e => {
        if (overlay && e.key === 'Escape') {
          overlay.remove()
        }
      })
    })
  },

  download: event => {
    const index = event.target.closest('.coverWrapper').dataset.index
    chrome.storage.local.get('medioAICovers', function (data) {
      const covers = data.medioAICovers
      const cover = covers[index]
      const a = document.createElement('a')
      a.href = cover.image
      a.download = 'cover.png'
      a.click()
    })
  },

  remove: event => {
    const index = event.target.closest('.coverWrapper').dataset.index
    chrome.storage.local.get('medioAICovers', function (data) {
      const covers = data.medioAICovers
      covers.splice(index, 1)
      chrome.storage.local.set({ medioAICovers: covers }, function () {
        event.target.closest('.coverWrapper').remove()
      })
    })
  },
}

covers.init()
