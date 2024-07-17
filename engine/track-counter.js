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
    setTimeout(()=> {
      const url = window.location.href
      if (!url) return
      if (url.includes('udio.com/tree/')) {
        medioAITrackCounter.appendButton()
      }
  
      songStudioMedioAI.detectURLChange(url => {
        if (!url) return
        if (url.includes('udio.com/tree/')) {
          medioAITrackCounter.appendButton()
        }
      })
    }, 1000)
    
  },

  appendButton: () => {
    const allHeaders = document.querySelectorAll('.text-muted-foreground')
    const header = Array.from(allHeaders).find(header => header.textContent === 'Track')
    const button = document.createElement('div')
    button.innerHTML = `<button id="medioAITrackCount" class="items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/5 text-white border-[0.5px] border-white/10 hover:bg-secondary/80 px-4 rounded-md py-2 flex items-center text-xs space-x-2">${iconsMedioAI.credits} <span>Count Credits</span></button>`

    button.setAttribute('class', 'ml-6')
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      medioAITrackCounter.count()
    })
    header.parentElement.appendChild(button)
  },

  events: () => {
    const trackCounter = document.querySelector('#medioAITrackCount')
    if (!trackCounter) return
    trackCounter.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      medioAITrackCounter.count()
    })

    const describeSong = document.querySelector('#medioAIDescribeSong')
    if (!describeSong) return
    describeSong.addEventListener('click', async e => {
      e.preventDefault()
      e.stopPropagation()
      const aimodel = await utilitiesMedioAI.getSettings('aimodel')
      if (!aimodel) {
        utilitiesMedioAI.showNotification('Add your AI model in the settings.')
        return
      }
      try {
        describeSong.querySelector('span').textContent = 'Writing...'
        describeSong.classList.add('disabled')

        const messages = [
          {
            role: 'system',
            content:
              'You are going to take lyrics and title and write a short description that is below 200 characters about the lyrics. The user will provide the lyrics and title. The lyrics may contain lyric commands such as [verse], etc but you can ignore that. Do not include the title or lyrics in the description, just describe it in 200 characters or less. Do NOT make up stuff about the music as you have not heard it. Just describe the lyrics and title.',
          },
          {
            role: 'user',
            content: `
              Title: ${document.querySelector('input[placeholder="Enter a song name"]').value}
              Lyrics: ${document.querySelector('textarea[placeholder="Enter lyrics here"]').value}
            `,
          },
        ]
        apiMedioAI.openAI(
          messages,
          false,
          null,
          'Describe the song.',
          data => {
            const textbox = document.querySelector('input[placeholder="Describe your song"]')
            textbox.value = data.choices[0].message.content
            songStudioMedioAI.simulateMouseClick(textbox)
            describeSong.querySelector('span').textContent = 'AI Description Writer'
            describeSong.classList.remove('disabled')
          },
          false,
          null
        )
      } catch (error) {
        utilitiesMedioAI.showNotification('Error: ' + error, 'error')
      }
    })
  },

  count: () => {
    document.querySelector('#medioAITrackCount span').textContent = 'Counting...'
    document.querySelector('#medioAITrackCount').classList.add('disabled')

    const id = window.location.href.split('/').pop()
    const iframe = document.createElement('iframe')
    iframe.src = 'https://beta.udio.com/tree/' + id
    iframe.id = 'medioAITrackCounter'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    iframe.onload = () => {
      setTimeout(() => {
        const iframeDocument = iframe.contentDocument

        const expandButton = iframeDocument.querySelector('.ml-2.-translate-x-2.px-0')
        songStudioMedioAI.simulateMouseClick(expandButton)

        setTimeout(() => {
          const total = iframeDocument.querySelectorAll('section button[role="checkbox"]').length - 1
          document.querySelector('#medioAITrackCount span').textContent = `Credits Used = ${total}`
          document.querySelector('#medioAITrackCount').classList.remove('disabled')
          iframe.remove()
        }, 1200)
      }, 1200)
    }
  },

  appendLyricAttribution: () => {
    const lyricEditorTextarea = document.querySelector('textarea[placeholder="Enter lyrics here"]')
    const div = lyricEditorTextarea.closest('.w-1\\/2').nextElementSibling

    const attributionBox = document.createElement('div')
    let insertAttribution = document.getElementById('medioaiInsertAttribution')
    if (insertAttribution) return

    attributionBox.innerHTML = `<div class="mt-2">
    
      <h3 class="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">MedioAI Tools</h3>

      <div class="flex items-center space-x-2 p-2 rounded-md border mt-2">
        <button id="medioaiInsertAttribution" class="items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/5 text-white border-[0.5px] border-white/10 hover:bg-secondary/80 px-4 rounded-md py-2 flex items-center text-xs space-x-2">${iconsMedioAI.insert}  <span>Insert Song Preface</span></button>
        
        <button id="medioAIDescribeSong" class="items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/5 text-white border-[0.5px] border-white/10 hover:bg-secondary/80 px-4 rounded-md py-2 flex items-center text-xs space-x-2">${iconsMedioAI.ai} <span>AI Description Writer</span></button>
      </div>
    </div>`

    div.appendChild(attributionBox)
    insertAttribution = document.getElementById('medioaiInsertAttribution')
    insertAttribution.addEventListener('click', async e => {
      e.preventDefault()
      e.stopPropagation()
      const domTextarea = document.querySelector('textarea[placeholder="Enter lyrics here"]')

      const text = domTextarea.value
      let attr = await utilitiesMedioAI.getSettings('lyricAttribution')
      if (!attr) {
        utilitiesMedioAI.showNotification('Add your lyric attribution in the settings.')
      }

      const attribution = `${attr}\n\n`
      const textarea = document.querySelector('textarea[placeholder="Enter lyrics here"]')
      textarea.focus()
      textarea.value = attribution + text
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    })

    medioAITrackCounter.events()
  },
}
