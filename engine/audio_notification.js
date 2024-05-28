/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const notificationMedioAI = {
  init: () => {
    const target = "a.relative.flex.flex-row.items-center.justify-center.text-sm[href='/my-creations']"

    const observer = new MutationObserver(mutations => {
      mutations.forEach(async mutation => {
        const shouldPlaySound = await engine.getSettings('notification')
        if (
          shouldPlaySound === 'on' &&
          !engine.state.isChecking &&
          mutation.target.innerText &&
          mutation.target.innerText.split('/')[0] === mutation.target.innerText.split('/')[1]
        ) {
          engine.state.isChecking = true
          const sound = await engine.getSettings('notificationsound')
          const audio = new Audio(chrome.runtime.getURL(`sounds/${sound}.mp3`))
          audio.play()

          setTimeout(() => {
            engine.state.isChecking = false
          }, 6000)
        } else {
          engine.state.isChecking = false
        }
      })
    })

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    }

    const checkTargetNode = setInterval(() => {
      const targetNode = document.querySelector(target)
      if (targetNode) {
        observer.observe(targetNode, config)
        clearInterval(checkTargetNode)
      }
    }, 1000)
  },
}
