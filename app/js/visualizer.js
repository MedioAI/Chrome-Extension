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
  mainName: 'main',
  log: true,
})

const visualizer = {
  init: async () => {
    visualizer.load()
    visualizer.upload()
  },

  recordedChunks: [],
  mediaRecorder: null,
  recording: false,
  audio: null,
  context: null,
  canvas: null,
  recordButton: null,
  convertButton: null,
  audioBuffer: null,
  coverImage: null,
  backgroundImage: null,
  progressBar: null,
  handle: null,
  subtitleY: 0,

  load: async () => {
    visualizer.canvas = document.querySelector('canvas#visualizeEditor')
    visualizer.context = visualizer.canvas.getContext('2d')
    visualizer.recordButton = document.querySelector('button#record')
    visualizer.convertButton = document.querySelector('button#convert')

    visualizer.recordButton.addEventListener('click', () => {
      visualizer.record()
    })

    const addCoverImg = document.getElementById('addCoverImg')
    const addBgImg = document.getElementById('addBgImg')

    addCoverImg.addEventListener('click', () => {
      document.getElementById('coverImg').click()
    })

    addBgImg.addEventListener('click', () => {
      document.getElementById('bgImg').click()
    })

    const canvas = document.getElementById('visualizeEditor')
    const ctx = canvas.getContext('2d')
    const audioElement = document.getElementById('audio')
    const mp3Input = document.getElementById('mp3')
    const coverImgInput = document.getElementById('coverImg')
    const bgImgInput = document.getElementById('bgImg')

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }

    mp3Input.addEventListener('change', handleFile)
    coverImgInput.addEventListener('change', handleCoverImage)
    bgImgInput.addEventListener('change', handleBackgroundImage)

    visualizer.progressBar = {
      x: 20,
      y: 50,
      width: 70,
      height: 10,
      color: 'white',
    }

    visualizer.handle = {
      x: visualizer.progressBar.x,
      y: visualizer.progressBar.y,
      radius: 10,
      color: 'white',
    }

    async function handleFile(event) {
      const file = event.target.files[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      visualizer.audio = file
      audioElement.src = url
      visualizer.audioBuffer = await fetchFile(file)

      await visualizer.generateWaveform(url)
      audioElement.volume = 0
      audioElement.play()
      setTimeout(async () => {
        audioElement.pause()
        audioElement.currentTime = 0
        audioElement.volume = 1
      }, 300)
    }

    async function handleCoverImage(event) {
      const file = event.target.files[0]
      if (!file) return

      visualizer.coverImage = await visualizer.loadImage(URL.createObjectURL(file))

      if (visualizer.audioBuffer) {
        visualizer.drawCanvas()
      }
    }

    async function handleBackgroundImage(event) {
      const file = event.target.files[0]
      if (!file) return

      backgroundImage = await visualizer.loadImage(URL.createObjectURL(file))

      if (visualizer.audioBuffer) {
        visualizer.drawCanvas()
      }
    }

    audioElement.addEventListener('timeupdate', function () {
      console.log('timeupdate')
      visualizer.handle.x =
        visualizer.progressBar.x + (this.currentTime / this.duration) * visualizer.progressBar.width
      visualizer.drawWaveform()
    })

    audioElement.addEventListener('play', () => {
      console.log('playing')
      visualizer.updateWaveform()
    })
  },

  async generateWaveform(url) {
    const audioContext = new AudioContext()
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = await audioContext.decodeAudioData(arrayBuffer)

    waveform = buffer.getChannelData(0)
    const audioElement = document.getElementById('audio')
    const source = audioContext.createMediaElementSource(audioElement)

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    visualizer.analyser = analyser
  },

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Failed to load image'))
    })
  },

  updateWaveform() {
    const audioElement = document.getElementById('audio')
    if (!audioElement.paused && !audioElement.ended) {
      visualizer.drawCanvas()
      requestAnimationFrame(visualizer.updateWaveform)
    }

    if (audioElement.paused) {
      visualizer.drawCanvas()
    }
  },

  drawWaveform() {
    const canvas = document.getElementById('visualizeEditor')
    const ctx = canvas.getContext('2d')

    const bufferLength = visualizer.analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    visualizer.analyser.getByteTimeDomainData(dataArray)

    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.beginPath()

    const sliceWidth = (canvas.width * 1.0) / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = (v * canvas.height) / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
    }

    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()

    // Existing gray progress bar
    ctx.beginPath()
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = visualizer.progressBar.height
    ctx.strokeStyle = visualizer.progressBar.color // Gray color
    ctx.moveTo(visualizer.progressBar.x, visualizer.progressBar.y + visualizer.progressBar.height / 2)
    ctx.lineTo(
      visualizer.progressBar.x + visualizer.progressBar.width,
      visualizer.progressBar.y + visualizer.progressBar.height / 2
    )
    ctx.stroke()

    // Filled progress bar (red)
    ctx.beginPath()
    ctx.strokeStyle = 'red' // Red color for the filled part
    // Assuming handle.x represents the current progress position
    // Ensure that the filled length does not exceed the total width of the progress bar
    let filledLength = Math.min(visualizer.handle.x - visualizer.progressBar.x, visualizer.progressBar.width)
    ctx.moveTo(visualizer.progressBar.x, visualizer.progressBar.y + visualizer.progressBar.height / 2)
    ctx.lineTo(
      visualizer.progressBar.x + filledLength,
      visualizer.progressBar.y + visualizer.progressBar.height / 2
    )
    ctx.stroke()

    // Handle and other elements
    ctx.beginPath()
    ctx.arc(
      visualizer.handle.x,
      visualizer.handle.y + visualizer.subtitleY + 15,
      visualizer.handle.radius,
      0,
      Math.PI * 2,
      false
    )
    ctx.fillStyle = visualizer.handle.color
    ctx.fill()
  },

  async drawCanvas() {
    const canvas = document.getElementById('visualizeEditor')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (!visualizer.coverImage) {
      visualizer.coverImage = await visualizer.loadImage(
        chrome.runtime.getURL('app/images/visualizer-default-cover.png')
      )
      backgroundImage = await visualizer.loadImage(
        chrome.runtime.getURL('app/images/visualizer-default-bg.png')
      )
    }

    if (backgroundImage) {
      ctx.globalAlpha = 0.2
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
    }

    visualizer.drawWaveform()

    const baseSize = 46
    const width = ctx.canvas.width * 0.3
    const height = visualizer.coverImage.height * (width / visualizer.coverImage.width)
    const x = 60
    const y = (ctx.canvas.height - height) / 2

    ctx.drawImage(visualizer.coverImage, x, y, width, height)

    ctx.font = `bold ${baseSize * 2}px Arial`
    ctx.fillStyle = 'white'
    const titleX = x + width + 60
    const titleY = y + 230
    let title = document.querySelector('#title').value
    title = visualizer.truncateText(ctx, title, ctx.canvas.width - titleX)
    ctx.fillText(title, titleX, titleY)

    ctx.font = `bold ${baseSize * 1}px Arial`
    visualizer.subtitleY = titleY + 80
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'

    let subtitle = document.querySelector('#subtitle').value
    subtitle = visualizer.truncateText(ctx, subtitle, ctx.canvas.width - titleX)
    ctx.fillText(subtitle, titleX, visualizer.subtitleY)

    visualizer.progressBar = {
      x: titleX,
      y: visualizer.subtitleY + 60,
      width: ctx.canvas.width - width - 200,
      height: 10,
      color: 'rgba(255, 255, 255, 0.3)',
    }
  },

  truncateText(ctx, text, maxWidth) {
    let width = ctx.measureText(text).width
    let ellipsis = '...'
    let ellipsisWidth = ctx.measureText(ellipsis).width

    if (width <= maxWidth || width <= ellipsisWidth) {
      return text
    } else {
      let i = text.length
      while (width >= maxWidth - ellipsisWidth && i-- > 0) {
        text = text.substring(0, i)
        width = ctx.measureText(text).width
      }

      return text + ellipsis
    }
  },

  record: () => {
    document.getElementById('recordingOverlay').style.display = 'block'

    const audioElement = document.getElementById('audio')
    audioElement.currentTime = 0
    audioElement.volume = 0
    audioElement
      .play()
      .then(() => {
        visualizer.updateWaveform()
      })
      .catch(error => {
        console.error('Error playing audio:', error)
      })

    const durationInSeconds = Math.min(audioElement.duration, 900)
    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = Math.floor(durationInSeconds % 60)
    const durationFormatted = `${minutes} minute${minutes !== 1 ? 's' : ''} & ${seconds} second${
      seconds !== 1 ? 's' : ''
    }`

    document.getElementById('progressLength').textContent = durationFormatted

    audioElement.onended = () => {
      visualizer.mediaRecorder.stop()
      visualizer.mediaRecorder.onstop = async () => {
        const blob = new Blob(visualizer.recordedChunks, {
          type: 'video/webm',
        })

        document.getElementById('videoLoading').style.display = 'none'
        document.getElementById('videoConvertingWrapper').style.display = 'block'
        visualizer.webm2Mp4(blob)
      }
    }

    const videoStream = visualizer.canvas.captureStream(30)
    visualizer.mediaRecorder = new MediaRecorder(videoStream, {
      mimeType: 'video/webm;codecs=vp9',
      ignoreMutedMedia: true,
    })
    visualizer.recordedChunks = []
    visualizer.mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        visualizer.recordedChunks.push(e.data)
      }
    }
    visualizer.mediaRecorder.start()
    visualizer.mediaRecorder.onerror = event => {
      console.error('MediaRecorder error:', event)
    }
  },

  upload: () => {
    var upload = document.getElementById('upload')
    var mp3 = document.getElementById('mp3')

    upload.addEventListener('dragover', function (e) {
      e.preventDefault()
      upload.style.backgroundColor = '#323232'
      upload.style.borderColor = '#656565'
    })

    upload.addEventListener('dragleave', function (e) {
      e.preventDefault()
      upload.style.backgroundColor = ''
    })

    upload.addEventListener('drop', function (e) {
      e.preventDefault()
      mp3.files = e.dataTransfer.files
      upload.style.backgroundColor = ''
      document.getElementById('upload').style.display = 'none'
      document.getElementById('visualizer').style.display = 'block'
      document.querySelector('#loadedFile span').innerHTML = mp3.files[0].name
    })

    upload.addEventListener('click', function () {
      mp3.click()
    })

    mp3.addEventListener('change', function () {
      document.getElementById('upload').style.display = 'none'
      document.getElementById('visualizer').style.display = 'block'
      document.querySelector('#loadedFile span').innerHTML = mp3.files[0].name
    })
  },

  webm2Mp4: async blob => {
    const reader = new FileReader()
    reader.onload = async () => {
      const inputFileName = 'input.webm'
      const outputFileName = 'output.mp4'
      const commandStr = `-i ${inputFileName} -c:v libx264 -preset veryfast -r 30 -pix_fmt yuv420p -c:a aac ${outputFileName}`
      await visualizer.runFFmpeg(inputFileName, outputFileName, commandStr, blob)
    }
    reader.readAsArrayBuffer(blob)
  },

  mergeMP3andMP4: async (inputFileName, videoBlob) => {
    const videoFileName = inputFileName;
  const audioFileName = 'inputAudio.mp3';
  const outputFileName = 'mergedOutput.mp4';

  ffmpeg.FS('writeFile', videoFileName, await fetchFile(videoBlob));
  ffmpeg.FS('writeFile', audioFileName, new Uint8Array(await visualizer.audioBuffer));

  const commandStr = `-i ${videoFileName} -i ${audioFileName} -c:v copy -c:a aac -shortest ${outputFileName}`;
  
  await ffmpeg.run(...commandStr.split(' '));

  if (!ffmpeg.FS('readdir', '/').includes(outputFileName)) {
    throw new Error(`${outputFileName} was not created`);
  }

  const data = ffmpeg.FS('readFile', outputFileName);
  const mergedBlob = new Blob([data.buffer], { type: 'video/mp4' });

  return mergedBlob;
  },

  runFFmpeg: async (inputFileName, outputFileName, commandStr, file) => {
    if (ffmpeg.isLoaded()) {
      await ffmpeg.exit()
    }

    await ffmpeg.load()

    function downloadFile(blob, fileName) {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = fileName
      a.click()
    }

    ffmpeg.FS('writeFile', inputFileName, await fetchFile(file))

    const modifiedCommandStr = `${commandStr}`
    await ffmpeg.run(...modifiedCommandStr.split(' '))

    if (!ffmpeg.FS('readdir', '/').includes(outputFileName)) {
      throw new Error(`${outputFileName} was not created`)
    }

    const data = ffmpeg.FS('readFile', outputFileName)
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' })

    const newBlob = await visualizer.mergeMP3andMP4(outputFileName, videoBlob)

    downloadFile(newBlob, outputFileName)

    document.getElementById('videoConvertingWrapper').style.display = 'none'
    document.getElementById('videoPreview').style.display = 'block'
    document.getElementById('recordingOverlay').style.display = 'none'
  },
}

visualizer.init()
