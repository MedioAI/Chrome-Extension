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
      const udioSidebarSelector = 'a[href="/following"]'
      const sidebar = document.querySelector(udioSidebarSelector)

      if (sidebar) {
        clearInterval(checkSidebar)
        const sidebarButton = document.querySelector('#medioai-link')

        if (!sidebarButton) {
          const sidebar = document.querySelector(udioSidebarSelector)
          // sidebar.parentElement.insertAdjacentHTML('beforeend', uiMedioAI.sidebarRadio)
          sidebar.closest('li').insertAdjacentHTML('beforeend', uiMedioAI.sidebarLinks)

          medioAI.checkSidebar()
          medioAI.toggleSidebar()
          medioAI.fixPlaylist()
          setTimeout(()=> {
            medioAI.fixPlaylist()
          }, 1000)

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

  toggleSidebar: () => {
    const toggleButton = document.querySelector('[aria-label="Sidebar"] button.absolute');
    toggleButton.addEventListener('click', () => {
      
      const subText = document.querySelector('#medioai-link-text');
      subText.style.display = "none";
      setTimeout(()=> {
       medioAI.checkSidebar()
       medioAI.toggleSidebar()
      }, 150)
    });
  },

  checkSidebar: () => {
    const toggleButton = document.querySelector('[aria-label="Sidebar"] button.absolute');
    const sidebar = document.querySelector('[aria-label="Sidebar"]');
    const subText = document.querySelector('#medioai-link-text');
    if (toggleButton.getAttribute('aria-label') === "Collapse Sidebar") {
      subText.style.display = "none";
    } else {
      console.log(sidebar.style.width)
      if (sidebar.style.width != '4rem') {
        subText.style.display = "block";
        setTimeout(()=> {
          medioAI.fixPlaylist()
        }, 10)
      } else {
        subText.style.display = "none";
      }
      
    }
  },

  fixPlaylist: () => {
    const h5Element = document.querySelector("h5.mb-2.mt-4.text-xs.font-semibold.uppercase.tracking-wider.text-gray-500");

    if (h5Element) {
      console.log('fond h5')
      let divElement = h5Element.nextElementSibling.querySelector(".overflow-hidden")
      
      if (divElement) {
        console.log('found')
        divElement.parentElement.classList.add('medioAIShorten')
      }
    }
  }
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
