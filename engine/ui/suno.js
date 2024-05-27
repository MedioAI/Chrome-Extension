/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const uiMedioAi = {
  sidebarLinks: /* html */ `
<div class="-ml-5 pl-[16px]">
  <div class="relative flex items-center rounded-lg p-2 hover:text-foreground">
    <a class="mr-4 flex items-center" id="lyric-barn-link" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4 16V4zm-2 6V4q0-.825.588-1.412T4 2h11q.825 0 1.413.588T17 4v.425q-.6.275-1.1.675T15 6V4H4v12h11v-4q.4.5.9.9t1.1.675V16q0 .825-.587 1.413T15 18H6zm4-8h4v-2H6zm13-2q-1.25 0-2.125-.875T16 9t.875-2.125T19 6q.275 0 .525.05t.475.125V1h4v2h-2v6q0 1.25-.875 2.125T19 12M6 11h7V9H6zm0-3h7V6H6z"
        />
      </svg>

      <span class="ml-3 flex-1 whitespace-nowrap font-bold">Song Studio</span>
    </a>
  </div>
</div>

<div class="-ml-5 pl-[16px]">
  <div class="relative flex items-center rounded-lg p-2 hover:text-foreground">
    <a class="mr-4 flex items-center" id="lyric-tagbuilder-link" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <circle cx="16" cy="17" r="1" fill="currentColor" opacity="0.3" />
        <path
          fill="currentColor"
          d="M3 10h12v2H3zm0 4h8v2H3zm0-8h12v2H3zm14 8.18c-.31-.11-.65-.18-1-.18c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3V8h3V6h-5z"
        />
      </svg>

      <span class="ml-3 flex-1 whitespace-nowrap font-bold">Tag Builder</span>
    </a>
  </div>
</div>  
`,
  tagBuilder: /* html */ ``,

  songStudio: async () => {
    return /* html */ ``
  },

  placeholder: (title, msg) => {
    return /* html */ `
<h3 class='text-2xl text-gray-200 font-bold mb-2'>${title}</h3>
<p>${msg}</p>
`
  },
}
