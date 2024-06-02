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
        // document.getElementById('aimodel').value = settings.aimodel
        document.getElementById('openaikey').value = settings.openaikey
        // document.getElementById('claudeapikey').value = settings.claudeapikey
        document.getElementById('autoSaveCovers').value = settings.autoSaveCovers || 'off'
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
      aimodel: '',
      openaikey: document.getElementById('openaikey').value,
      claudeapikey: '',
      keepAdvancedSettings: document.getElementById('keepAdvancedSettings').value,
      manualModeDefault: document.getElementById('manualModeDefault').value,
      autoSaveCovers: document.getElementById('autoSaveCovers').value,
    }

    chrome.storage.local.set({ medioaiSettings }, function () {
      setTimeout(() => {
        notice.style.display = 'none'
      }, 2000)
    })
  },
}

app.init()
