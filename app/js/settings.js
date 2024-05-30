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
        // document.getElementById('aimodel').value = settings.aimodel
        document.getElementById('openaikey').value = settings.openaikey
        // document.getElementById('claudeapikey').value = settings.claudeapikey
      }
    })

    const saveButton = document.getElementById('save')
    saveButton.addEventListener('click', app.save)
  },

  save: function () {
    const medioaiSettings = {
      notification: document.getElementById('notification').value,
      notificationsound: document.getElementById('notificationsound').value,
      slideanimation: document.getElementById('slideanimation').value,
      commandcolor: document.getElementById('commandcolor').value,
      lyrictextsize: document.getElementById('lyrictextsize').value,
      aimodel: '',
      openaikey: document.getElementById('openaikey').value,
      claudeapikey: '',
    }

    chrome.storage.local.set({ medioaiSettings }, function () {
      alert('Settings saved!')
    })
  },
}

app.init()
