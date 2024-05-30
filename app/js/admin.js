/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const countButton = document.getElementById('count')
countButton.addEventListener('click', async e => {
  const names = [
    'songstudio/commands',
    'songstudio/extras',
    'songstudio/instruments',
    'songstudio/structures',
    'tagbuilder/emotions',
    'tagbuilder/genres',
    'tagbuilder/artists',
    'tagbuilder/emotions',
    'tagbuilder/instruments',
    'tagbuilder/periods',
    'tagbuilder/regions',
    'tagbuilder/productions',
    'tagbuilder/vocals',
  ]
  let total = 0

  for (let name of names) {
    const data = await fetch(chrome.runtime.getURL(`database/${name}.json`))
      .then(response => response.json())
      .then(data => {
        return data
      })

    if (name === 'tagbuilder/instruments') {
      document.querySelector(`#${name.split('/')[1]}_total.tagbuilder span`).innerHTML = data.length
    } else {
      document.querySelector(`#${name.split('/')[1]}_total span`).innerHTML = data.length
    }

    total += data.length
  }

  document.querySelector('#total span').innerHTML = total
})

const convertButton = document.getElementById('convert')
convertButton.addEventListener('click', async e => {
  const currentJSONFile = chrome.runtime.getURL('database/tagbuilder/genres.json')
  const newJSONFile = chrome.runtime.getURL('database/admin.json')

  const current = await fetch(currentJSONFile)
    .then(response => response.json())
    .then(data => {
      return data
    })

  const data = await fetch(newJSONFile)
    .then(response => response.json())
    .then(data => {
      return data
    })

  const cleaned = []
  for (let i = 0; i < data.length; i++) {
    cleaned.push(data[i])
  }

  const combinedArray = cleaned.concat(current)
  const capitalized = combinedArray.map(word => {
    return word.replace(/\b\w/g, l => l.toUpperCase())
  })
  const unique = capitalized.filter((v, i, a) => a.indexOf(v) === i)
  console.log(unique)
})
