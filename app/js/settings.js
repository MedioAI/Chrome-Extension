/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const app = {
  init: function () {
    chrome.storage.local.get('medioaiSettings', function (data) {
      const settings = data.medioaiSettings

      if (settings) {
        document.getElementById('notification').value = settings.notification
        document.getElementById('notificationsound').value = settings.notificationsound
        document.getElementById('slideanimation').value = settings.slideanimation
        document.getElementById('lyrictextsize').value = settings.lyrictextsize
        document.getElementById('commandcolor').value = settings.commandcolor
        document.getElementById('keepAdvancedSettings').value = settings.keepAdvancedSettings || 'off'
        document.getElementById('manualModeDefault').value = settings.manualModeDefault || 'off'
        document.getElementById('aimodel').value = settings.aimodel || 'openai'
        document.getElementById('openaikey').value = settings.openaikey
        document.getElementById('autoSaveCovers').value = settings.autoSaveCovers || 'off'
        document.getElementById('lyricAttribution').value = settings.lyricAttribution || ''
        document.getElementById('openrouterapikey').value = settings.openrouterapikey || ''
        document.getElementById('openaiModal').value = settings.openaiModal || 'gpt-4o'
        document.getElementById('openrouterModal').value = settings.openrouterModal || 'openai/gpt-4o'
        document.getElementById('systemPromptRandom').value =
          settings.systemPromptRandom ||
          `You are a song lyric writer. You come up with a Title, Theme, Emotion, Tags, Structure. For a song a respond with JSON format only. Do not include a code block, pure valid JSON only. Here is example:
    
    {
      "title": "Title of Song",
      "theme": "Theme of Song",
      "emotion": "Emotion of Song",
      "tags": "Tags, for, song",
      "structure": "standard"
    }
    
    Come up with a title and use 2-3 sentences to describe each section, such as theme and emotion. When doing the Structure make sure to pick from one of the following: standard, epic, duet, storytelling and sonnet. You can come up with a random song each time.`
        document.getElementById('systemPromptAsk').value =
          settings.systemPromptAsk ||
          `You are a song writing assistant. Your goal is to provide helpful feedback and requests given to your by the user. You have lyrics from the user as reference. Always provide your response as html code without code block just the raw HTML formatting your answer. Always provide a robust answer. Do not add your own classnames or IDs. NEVER respond with the full lyrics. Only provide your response to the request. You can ONLY use h1, h2, h3, ul, ol, and p tags only. If you are showing your changes to lyrics, wrap your changes in classname "medioai-highlightgray". If you need to highlight a small area, you can with "medioai-hightlightyellow". Do not respond with the just the lyrics. If you are not sure what to say ask.`
        document.getElementById('systemPromptSongWriter').value =
          settings.systemPromptSongWriter ||
          `You are a song lyric writer. You focus on taking a Title, Theme, Emotion, Tags and Structure of a song and creating lyrics. You can also provide feedback on lyrics. You can only use h1, h2, h3, ul, ol, and p tags. You can also use the classnames "medioai-highlightgray" and "medioai-highlightyellow" to highlight areas of the lyrics. You will provide lyrics and work with user to improve them. If you are presenting lyrics to user, always wrap it in div with classname "medioai-copylyrics" so user can copy them. If you are not sure what to say ask. Only provide a summary of the title, theme, etc at the bottom of your response and wrap with div and class name "medioai-summary" if you need to, always use a title "Summary" if you are doing one. Never use class names witin classnames, if you do lyrics, only use that class name. You can respond with just lyrics. Always use brackets around commands like [Verse], etc. Use line break for each line of lyrics to bunch each verse or chorus together. Use new p tags for each section of lyrics. Use a strong tag for the commands to make it stand out. Always have commands on new line. ALWAYS format the lyrics you present to the lyrics at any point in the chat.`

        if (settings.aimodel === 'openai') {
          document.getElementById('openai').style.display = 'block'
          document.getElementById('openrouter').style.display = 'none'
        } else if (settings.aimodel === 'openrouterai') {
          document.getElementById('openai').style.display = 'none'
          document.getElementById('openrouter').style.display = 'block'
        }
      }
    })

    const aimodel = document.getElementById('aimodel')
    aimodel.addEventListener('change', function (e) {
      const value = e.target.value
      if (value === 'openai' || value === '') {
        document.getElementById('openai').style.display = 'block'
        document.getElementById('openrouter').style.display = 'none'
      } else if (value === 'openrouterai') {
        document.getElementById('openai').style.display = 'none'
        document.getElementById('openrouter').style.display = 'block'
      }
    })

    const showAdvancedSettings = document.getElementById('showAdvancedSettings')
    showAdvancedSettings.addEventListener('click', function () {
      const advancedSettings = document.getElementById('advancedSettings')

      if (advancedSettings.style.display === 'block') {
        showAdvancedSettings.textContent = 'Show Advanced Settings'
        advancedSettings.style.display = 'none'
      } else {
        showAdvancedSettings.textContent = 'Hide Advanced Settings'
        advancedSettings.style.display = 'block'
      }
    })

    const playSound = document.getElementById('playSound')
    playSound.addEventListener('click', function () {
      const sound = document.getElementById('notificationsound').value
      const audio = new Audio(chrome.runtime.getURL(`../../sounds/${sound}.mp3`))
      audio.play()
    })

    const saveButton = document.getElementById('save')
    saveButton.addEventListener('click', app.save)

    Coloris({
      el: '.coloris',
      wrap: true,
      rtl: false,
      theme: 'default',
      themeMode: 'dark',
      margin: 2,
      format: 'hex',
      formatToggle: false,
      alpha: true,
      forceAlpha: false,
      swatchesOnly: false,
      focusInput: true,
      selectInput: false,
      clearButton: false,
      clearLabel: 'Clear',
      closeButton: false,
      closeLabel: 'Close',
      swatches: [
        '#264653',
        '#2a9d8f',
        '#e9c46a',
        'rgb(244,162,97)',
        '#e76f51',
        '#d62828',
        'navy',
        '#07b',
        '#0096c7',
        '#00b4d880',
        'rgba(0,119,182,0.8)',
      ],
      defaultColor: '#26BB79',
    })
  },

  save: function () {
    const notice = document.getElementById('notice')
    notice.style.display = 'block'

    const medioaiSettings = {
      notification: document.getElementById('notification').value,
      notificationsound: document.getElementById('notificationsound').value,
      slideanimation: document.getElementById('slideanimation').value,
      commandcolor: document.getElementById('commandcolor').value,
      lyrictextsize: document.getElementById('lyrictextsize').value,
      aimodel: document.getElementById('aimodel').value,
      openaikey: document.getElementById('openaikey').value,
      openrouterapikey: document.getElementById('openrouterapikey').value,
      keepAdvancedSettings: document.getElementById('keepAdvancedSettings').value,
      manualModeDefault: document.getElementById('manualModeDefault').value,
      autoSaveCovers: document.getElementById('autoSaveCovers').value,
      lyricAttribution: document.getElementById('lyricAttribution').value,
      openaiModal: document.getElementById('openaiModal').value,
      openrouterModal: document.getElementById('openrouterModal').value,
      systemPromptRandom: document.getElementById('systemPromptRandom').value,
      systemPromptAsk: document.getElementById('systemPromptAsk').value,
      systemPromptSongWriter: document.getElementById('systemPromptSongWriter').value,
    }

    chrome.storage.local.set({ medioaiSettings }, function () {
      setTimeout(() => {
        notice.style.display = 'none'
      }, 2000)
    })
  },
}

app.init()
