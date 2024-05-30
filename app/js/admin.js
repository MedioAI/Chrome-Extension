/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

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
