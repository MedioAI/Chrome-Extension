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

const visualizer = {
  init: async () => {
    visualizer.load()
    visualizer.upload()
  },

  recordedChunks: [],
  mediaRecorder: null,
  recording: false,
  context: null,
  canvas: null,
  convertButton: null,

  load: async () => {
    visualizer.canvas = document.querySelector('canvas#visualizeEditor')
    visualizer.context = visualizer.canvas.getContext('2d')
    visualizer.convertButton = document.querySelector('button#convert')
    visualizer.restartButton = document.querySelector('button#restart')

    visualizer.convertButton.addEventListener('click', () => {
      visualizer.convert()
    })

    visualizer.restartButton.addEventListener('click', () => {
      location.reload()
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

    let audioBuffer, coverImage, backgroundImage

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }

    mp3Input.addEventListener('change', handleFile)
    coverImgInput.addEventListener('change', handleCoverImage)
    bgImgInput.addEventListener('change', handleBackgroundImage)

    let progressBar = {
      x: 20,
      y: 50,
      width: 70,
      height: 10,
      color: 'white',
    }

    let handle = {
      x: progressBar.x,
      y: progressBar.y,
      radius: 10,
      color: 'white',
    }

    let subtitleY = 0

    async function handleFile(event) {
      const file = event.target.files[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      audioElement.src = url
      audioBuffer = await fetchFile(file)

      await generateWaveform(url)

      if (coverImage && backgroundImage) {
        drawCanvas()
      }
    }

    async function handleCoverImage(event) {
      const file = event.target.files[0]
      if (!file) return

      coverImage = await loadImage(URL.createObjectURL(file))

      if (audioBuffer && backgroundImage) {
        drawCanvas()
      }
    }

    async function handleBackgroundImage(event) {
      const file = event.target.files[0]
      if (!file) return

      backgroundImage = await loadImage(URL.createObjectURL(file))

      if (audioBuffer && coverImage) {
        drawCanvas()
      }
    }

    function loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('Failed to load image'))
      })
    }

    async function generateWaveform(url) {
      const audioContext = new AudioContext()
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      const buffer = await audioContext.decodeAudioData(arrayBuffer)

      waveform = buffer.getChannelData(0)

      const source = audioContext.createMediaElementSource(audioElement)

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048

      source.connect(analyser)
      analyser.connect(audioContext.destination)

      visualizer.analyser = analyser
    }

    function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (backgroundImage) {
        ctx.globalAlpha = 0.2
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
      }

      drawWaveform()

      function truncateText(ctx, text, maxWidth) {
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
      }

      if (coverImage) {
        const baseSize = 46
        const width = ctx.canvas.width * 0.3
        const height = coverImage.height * (width / coverImage.width)
        const x = 60
        const y = (ctx.canvas.height - height) / 2

        ctx.drawImage(coverImage, x, y, width, height)

        ctx.font = `bold ${baseSize * 2}px Arial`
        ctx.fillStyle = 'white'
        const titleX = x + width + 60
        const titleY = y + 50
        let title = document.querySelector('#title').value
        title = truncateText(ctx, title, ctx.canvas.width - titleX)
        ctx.fillText(title, titleX, titleY)

        ctx.font = `bold ${baseSize * 1}px Arial`
        subtitleY = titleY + 60
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'

        let subtitle = document.querySelector('#subtitle').value
        subtitle = truncateText(ctx, subtitle, ctx.canvas.width - titleX)
        ctx.fillText(subtitle, titleX, subtitleY)

        progressBar = {
          x: titleX,
          y: subtitleY + 60,
          width: ctx.canvas.width - width - 200,
          height: 10,
          color: 'rgba(255, 255, 255, 0.3)',
        }
      }
    }

    function drawWaveform() {
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

      ctx.beginPath()
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.lineWidth = progressBar.height
      ctx.strokeStyle = progressBar.color
      ctx.moveTo(progressBar.x, progressBar.y + progressBar.height / 2)
      ctx.lineTo(progressBar.x + progressBar.width, progressBar.y + progressBar.height / 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(handle.x, handle.y + subtitleY + 15, handle.radius, 0, Math.PI * 2, false)
      ctx.fillStyle = handle.color
      ctx.fill()
    }

    function updateWaveform() {
      if (!audioElement.paused && !audioElement.ended) {
        drawCanvas()
        requestAnimationFrame(updateWaveform)
      }
    }

    audioElement.addEventListener('timeupdate', function () {
      handle.x = progressBar.x + (this.currentTime / this.duration) * progressBar.width
      drawWaveform()
    })

    audioElement.addEventListener('play', () => {
      updateWaveform()
      console.log('playing')
    })
  },

  convert: () => {
    visualizer.recording = !visualizer.recording
    if (visualizer.recording) {
      visualizer.convertButton.textContent = 'Stop'
      const stream = visualizer.canvas.captureStream(25)
      visualizer.mediaRecorder = new MediaRecorder(stream, {
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
    } else {
      visualizer.convertButton.textContent = 'Record'
      visualizer.mediaRecorder.stop()
      setTimeout(() => {
        const blob = new Blob(visualizer.recordedChunks, {
          type: 'video/webm',
        })

        visualizer.webm2Mp4(blob)
      }, 0)
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

  // webm2Mp4: async blob => {
  //   const reader = new FileReader()
  //   reader.onload = async () => {
  //     const mp3Reader = new FileReader()
  //     mp3Reader.onload = async () => {
  //       const inputFileName = 'input.webm'
  //       const outputFileName = 'output.mp4'
  //       const finalOutputFileName = 'final_output.mp4'
  //       const commandStr = `-i ${inputFileName} -i ${'audio.mp3'}  -c:v libx264 -pix_fmt yuv420p -c:a aac ${finalOutputFileName}`
  //       await visualizer.runFFmpeg(inputFileName, outputFileName, commandStr, blob, mp3Reader.result)
  //     }
  //     const mp3Input = document.getElementById('mp3')
  //     mp3Reader.readAsArrayBuffer(mp3Input.files[0])
  //   }
  //   reader.readAsArrayBuffer(blob)
  // },

  webm2Mp4: async blob => {
    const reader = new FileReader()
    reader.onload = async () => {
      const inputFileName = 'input.webm'
      const outputFileName = 'output.mp4'
      const commandStr = `-i ${inputFileName} -c:v libx264 -pix_fmt yuv420p -c:a aac ${outputFileName}`
      await visualizer.runFFmpeg(inputFileName, outputFileName, commandStr, blob)
    }
    reader.readAsArrayBuffer(blob)
  },

  runFFmpeg: async (inputFileName, outputFileName, commandStr, file, audioFile) => {
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
    // ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audioFile))
    await ffmpeg.run(...commandStr.split(' '))
    if (!ffmpeg.FS('readdir', '/').includes(outputFileName)) {
      throw new Error(`${outputFileName} was not created`)
    }
    const data = ffmpeg.FS('readFile', outputFileName)
    const blob = new Blob([data.buffer])
    downloadFile(blob, outputFileName)
  },
}

visualizer.init()
