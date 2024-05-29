/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const medioAITrackCounter = {
  init: () => {
    const avatar = document.getElementById('radix-:r1k:')
    if (!avatar) {
      setTimeout(() => {
        medioAITrackCounter.init()
      }, 2000)
      return
    }
    const username = avatar.querySelector(`img`).alt
    const trackArtist = document.querySelector(
      'body > section > div.mb-\\[150px\\].flex.w-full.flex-row.justify-between > div.ml-auto.mr-4 > div.mt-\\[90px\\] > section > div > div:nth-child(1) > div > div.relative.ml-0.flex.h-full.w-full.flex-grow.flex-col.justify-between.md\\:ml-8.md\\:h-\\[300px\\].\\32 xl\\:h-\\[350px\\] > div:nth-child(1) > form > div > div > div.mb-4.mt-\\[22px\\].flex.flex-row.items-center.md\\:mb-0.md\\:mt-0 > a'
    ).textContent

    if (username !== trackArtist) return

    document
      .querySelector(
        'body > section > div.mb-\\[150px\\].flex.w-full.flex-row.justify-between > div.ml-auto.mr-4 > div.mt-\\[90px\\] > section > div > div:nth-child(1) > div > div.relative.ml-0.flex.h-full.w-full.flex-grow.flex-col.justify-between.md\\:ml-8.md\\:h-\\[300px\\].\\32 xl\\:h-\\[350px\\] > div.bottom-0.mt-5.flex.w-full.justify-between.md\\:flex-col.md\\:space-y-3 > div > div.mb-3.hidden.items-center.md\\:flex'
      )
      .insertAdjacentHTML('beforeend', medioAITrackCounter.ui)

    medioAITrackCounter.events()
  },

  events: () => {
    document.querySelector('#medioAITrackCount').addEventListener('click', () => {
      medioAITrackCounter.count()
    })
  },

  count: () => {
    document.querySelector('#medioAITrackCount span').textContent = 'Counting...'
    document.querySelector('#medioAITrackCount').classList.add('disabled')

    const id = window.location.href.split('/').pop()
    const iframe = document.createElement('iframe')
    iframe.src = 'https://www.udio.com/tree/' + id
    iframe.id = 'medioAITrackCounter'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    iframe.onload = () => {
      const iframeDocument = iframe.contentDocument

      let clicked = 0

      function clickExpand() {
        const expandButtons = Array.from(iframeDocument.querySelectorAll('.relative.cursor-pointer')).filter(
          button => {
            return button.querySelector('svg') !== null && button.classList.length === 2
          }
        )
        if (expandButtons[clicked]) {
          expandButtons[clicked].click()
          clicked++
          setTimeout(() => {
            clickExpand()
          }, 500)
        } else {
          const total = iframeDocument.querySelectorAll('tbody tr').length
          document.querySelector('#medioAITrackCount span').textContent = `Count Credits = ${total}`
          document.querySelector('#medioAITrackCount').classList.remove('disabled')
          iframe.remove()
        }
      }

      clickExpand()
    }
  },

  ui: /* html */ `
  <button id="medioAITrackCount" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3" title="Count Credits" type="button" id="radix-:rac:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
    ${iconsMedioAI.credits}
    <span class="ml-2">Count Credits</span>
  </button>`,
}

window.addEventListener('load', () => {
  setTimeout(() => {
    medioAITrackCounter.init()
  }, 3000)
})
