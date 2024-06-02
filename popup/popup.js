/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

document.querySelector('#openConvert').addEventListener('click', () => {
  chrome.tabs.create({ url: 'app/convert.html' })
})

document.querySelector('#openVisualizer').addEventListener('click', () => {
  chrome.tabs.create({ url: 'app/visualizer.html' })
})

document.querySelector('#openSettings').addEventListener('click', () => {
  chrome.tabs.create({ url: 'app/settings.html' })
})

document.querySelector('#openMetaTags').addEventListener('click', () => {
  chrome.tabs.create({ url: 'app/metatags.html' })
})

document.querySelector('#openTrackCovers').addEventListener('click', () => {
  chrome.tabs.create({ url: 'app/covers.html' })
})
