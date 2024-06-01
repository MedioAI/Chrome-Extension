/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const { createFFmpeg, fetchFile } = FFmpeg

const ffmpeg = createFFmpeg({
  corePath: chrome.runtime.getURL('lib/ffmpeg-core.js'),
  log: true,
  mainName: 'main',
})

const metatags = {
  init: () => {
    const saveAsDefault = document.getElementById('saveAsDefault')
    saveAsDefault.addEventListener('click', metatags.saveAsDefault)

    const apply = document.getElementById('apply')
    apply.addEventListener('click', metatags.apply)

    metatags.loadDefaults()
  },

  apply: async () => {
    const values = metatags.grabValues()
    const mp3Input = document.getElementById('mp3').files[0]
    if (!mp3Input) {
      alert('Please upload an MP3 file.')
      return
    }

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }

    const mp3Data = await fetchFile(mp3Input)
    ffmpeg.FS('writeFile', 'input.mp3', mp3Data)

    const metadataArgs = []
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        metadataArgs.push('-metadata', `${key}=${value}`)
      }
    }

    await ffmpeg.run('-i', 'input.mp3', ...metadataArgs, '-codec', 'copy', 'output.mp3')

    const data = ffmpeg.FS('readFile', 'output.mp3')
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'output.mp3'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },

  saveAsDefault: () => {
    const values = metatags.grabValues()

    chrome.storage.local.set({ medioaiMetaTagDefaults: values }, function () {
      const status = document.getElementById('notice')
      status.style.display = 'block'
      status.textContent = 'Default values saved.'
      setTimeout(function () {
        status.style.display = 'none'
      }, 2000)
    })
  },

  loadDefaults: () => {
    chrome.storage.local.get('medioaiMetaTagDefaults', function (data) {
      const values = data.medioaiMetaTagDefaults

      if (values) {
        document.getElementById('title').value = values.title
        document.getElementById('artist').value = values.artist
        document.getElementById('album').value = values.album
        document.getElementById('year').value = values.year
        document.getElementById('genre').value = values.genre
        document.getElementById('track').value = values.track
        document.getElementById('comment').value = values.comment
        document.getElementById('composer').value = values.composer
        document.getElementById('publisher').value = values.publisher
        document.getElementById('lyrics').value = values.lyrics
        document.getElementById('trackcopyright').value = values.copyright
        document.getElementById('url').value = values.url
        document.getElementById('original_artist').value = values.original_artist
      }
    })
  },

  grabValues: () => {
    return {
      title: document.getElementById('title').value,
      artist: document.getElementById('artist').value,
      album_artist: document.getElementById('artist').value,
      album: document.getElementById('album').value,
      year: document.getElementById('year').value,
      genre: document.getElementById('genre').value,
      track: document.getElementById('track').value,
      comment: document.getElementById('comment').value,
      composer: document.getElementById('composer').value,
      publisher: document.getElementById('publisher').value,
      lyrics: document.getElementById('lyrics').value,
      original_artist: document.getElementById('original_artist').value,
      copyright: document.getElementById('trackcopyright').value,
      url: document.getElementById('url').value,
    }
  },
}

metatags.init()
