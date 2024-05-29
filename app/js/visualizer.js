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
  },

  recordedChunks: [],
  mediaRecorder: null,
  recording: false,
  context: null,
  canvas: null,
  buildButton: null,
  convertButton: null,

  load: async () => {
    visualizer.canvas = document.querySelector('canvas#editor')
    visualizer.context = visualizer.canvas.getContext('2d')
    visualizer.buildButton = document.querySelector('button#build')
    visualizer.convertButton = document.querySelector('button#convert')
    visualizer.restartButton = document.querySelector('button#restart')

    visualizer.convertButton.addEventListener('click', () => {
      visualizer.convert()
    })

    visualizer.buildButton.addEventListener('click', () => {
      visualizer.build()
    })

    visualizer.restartButton.addEventListener('click', () => {
      location.reload()
    })

    const canvas = document.getElementById('editor')
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

    async function handleFile(event) {
      const file = event.target.files[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      audioElement.src = url
      audioBuffer = await fetchFile(file)

      await generateWaveform(url)

      if (coverImage && backgroundImage) {
        document.getElementById('preview').style.display = 'block'
        drawCanvas()
      }
    }

    async function handleCoverImage(event) {
      const file = event.target.files[0]
      if (!file) return

      coverImage = await loadImage(URL.createObjectURL(file))

      if (audioBuffer && backgroundImage) {
        document.getElementById('preview').style.display = 'block'
        drawCanvas()
      }
    }

    async function handleBackgroundImage(event) {
      const file = event.target.files[0]
      if (!file) return

      backgroundImage = await loadImage(URL.createObjectURL(file))

      if (audioBuffer && coverImage) {
        document.getElementById('preview').style.display = 'block'
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

      if (coverImage) {
        ctx.drawImage(coverImage, 20, 20, 200, 200)
      }

      drawWaveform()
    }

    function drawWaveform() {
      const bufferLength = visualizer.analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      visualizer.analyser.getByteTimeDomainData(dataArray)

      ctx.lineWidth = 2
      ctx.strokeStyle = 'white'
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
    }

    function updateWaveform() {
      if (!audioElement.paused && !audioElement.ended) {
        drawCanvas()
        requestAnimationFrame(updateWaveform)
      }
    }

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

  build: async () => {
    const setup = document.querySelector('#setup')
    setup.style.display = 'none'
    const preview = document.querySelector('#preview')
    preview.style.display = 'block'
  },

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
    await ffmpeg.run(...commandStr.split(' ')) // Ensure commandStr is split into arguments
    if (!ffmpeg.FS('readdir', '/').includes(outputFileName)) {
      // Check if the file exists
      throw new Error(`${outputFileName} was not created`)
    }
    const data = ffmpeg.FS('readFile', outputFileName)
    const blob = new Blob([data.buffer])
    downloadFile(blob, outputFileName)
  },
}

visualizer.init()
