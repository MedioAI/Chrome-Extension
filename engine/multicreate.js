/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const medioAIMultiCreate = {
  total: 2,
  isRunning: false,

  init: () => {
    setTimeout(() => {
      const url = window.location.href
      if (!url) return
      if (url.includes('udio.com/create')) {
        medioAIMultiCreate.appendButton()
      }

      songStudioMedioAI.detectURLChange(url => {
        if (!url) return
        if (url.includes('udio.com/create')) {
          medioAIMultiCreate.appendButton()
        }
      })
    }, 1000)
  },

  appendButton: () => {
    const elementCheck = document.querySelector('#medioai-multi-create')
    if (elementCheck) return
    const target = document.querySelector('button[title="Upload audio file"]').parentNode
    const html = `<div><button id="medioai-multi-create" class="button button--primary button--small">2x</button></div>`
    target.insertAdjacentHTML('afterend', html)
    document.querySelector('#prompt').style.paddingRight = '215px'

    document.querySelector('#medioai-multi-create').addEventListener('click', e => {
      if (medioAIMultiCreate.total < 12) {
        medioAIMultiCreate.total += 2
      } else {
        medioAIMultiCreate.total = 2
      }

      e.target.innerText = `${medioAIMultiCreate.total}x`
    })

    document
      .querySelector(
        'body > section > div.flex.min-h-0.flex-1 > div.ml-0.mr-4.flex.flex-col > section > div > div:nth-child(1) > div > div > div > div.mr-6 > div > div > div.flex.items-center.rounded-md.text-secondary-foreground.transition-colors > button',
      )
      .addEventListener('click', e => {
        if (!medioAIMultiCreate.isRunning) {
          const clickAmount = medioAIMultiCreate.total / 2 - 1

          console.log('hijacked the click', clickAmount)
          if (clickAmount > 0 && clickAmount <= 6) {
            medioAIMultiCreate.automateGens(clickAmount)
          }
        }
      })
  },

  automateGens: clickAmount => {
    medioAIMultiCreate.isRunning = true
    const button = document.querySelector(
      'body > section > div.flex.min-h-0.flex-1 > div.ml-0.mr-4.flex.flex-col > section > div > div:nth-child(1) > div > div > div > div.mr-6 > div > div > div.flex.items-center.rounded-md.text-secondary-foreground.transition-colors > button',
    )

    console.log('automateGens', clickAmount)
    for (let i = 0; i < clickAmount; i++) {
      console.log('looping', i)
      setTimeout(
        () => {
          if (i <= clickAmount) {
            console.log('clicked button', i)
            button.click()
            if (i === clickAmount) {
              console.log('completed')
              medioAIMultiCreate.isRunning = false
            }
          } else {
            console.log('completed')
          }
        },
        5000 * (i + 1),
      )
    }
  },
}
