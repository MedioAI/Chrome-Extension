/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const medioAI = {
  init: () => {
    const checkSidebar = setInterval(() => {
      const udioSidebarSelector = 'a[title="Search"]'
      const sidebar = document.querySelector(udioSidebarSelector)

      if (sidebar) {
        clearInterval(checkSidebar)
        const sidebarButton = document.querySelector('#medioai-link')

        if (!sidebarButton) {
          const sidebar = document.querySelector(udioSidebarSelector)
          sidebar.parentElement.insertAdjacentHTML('beforeend', uiMedioAI.sidebarRadio)
          sidebar.parentElement.insertAdjacentHTML('beforeend', uiMedioAI.sidebarLinks)
          notificationMedioAI.init()
          songStudioMedioAI.init()
          setTimeout(() => {
            tagBuilderMedioAI.init()
          }, 100)
        }

        medioAITrackCounter.load()
      }
    }, 100)
  },
}

window.onload = () => {
  medioAI.init()

  let oldURL = window.location.href
  setInterval(() => {
    if (window.location.href !== oldURL) {
      oldURL = window.location.href
      medioAI.init()
    }
  }, 100)
}
