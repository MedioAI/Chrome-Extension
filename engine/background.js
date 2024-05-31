/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

chrome.runtime.onInstalled.addListener(() => {
  const defaultSettings = {
    notification: 'off',
    notificationsound: 'ding',
    slideanimation: 'on',
    commandcolor: '#26BB79',
    lyrictextsize: '18px',
    aimodel: 'openai',
    openaikey: '',
    claudeapikey: '',
  }

  chrome.storage.local.get('medioaiSettings', result => {
    if (!result.medioaiSettings) {
      chrome.storage.local.set({ medioaiSettings: defaultSettings }, () => {})
    }
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openSettings') {
    chrome.tabs.create({ url: 'app/settings.html' })
  }
})
