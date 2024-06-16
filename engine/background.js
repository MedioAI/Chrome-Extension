/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

chrome.runtime.onInstalled.addListener(() => {
  const defaultSettings = {
    notification: 'off',
    notificationsound: 'ding',
    slideanimation: 'on',
    commandcolor: '#26BB79',
    lyrictextsize: '18px',
    aimodel: 'openai',
    openaikey: '',
    openrouterapikey: '',
    openaiModal: 'gpt-4o',
    openaiapikey_voice: '',
    medioRadioBanned: [],
    medioRadioListened: [],
    autoSaveCovers: 'off',
    lyricAttribution: '',
    songstudioCommands: '',
    songstudioInstruments: '',
    songstudioStructures: '',
    songstudioExtras: '',
    tagbuilderGenre: '',
    tagbuilderArtist: '',
    tagbuilderEmotion: '',
    tagbuilderPeriod: '',
    tagbuilderRegion: '',
    tagbuilderVocal: '',
    tagbuilderInstrument: '',
    tagbuilderProduction: '',
    systemPromptAsk: `You are a song writing assistant. Your goal is to provide helpful feedback and requests given to your by the user. You have lyrics from the user as reference. Always provide your response as html code without code block just the raw HTML formatting your answer. Always provide a robust answer. Do not add your own classnames or IDs. NEVER respond with the full lyrics. Only provide your response to the request. You can ONLY use h1, h2, h3, ul, ol, and p tags only. If you are showing your changes to lyrics, wrap your changes in classname "medioai-highlightgray". If you need to highlight a small area, you can with "medioai-hightlightyellow". Do not respond with the just the lyrics. If you are not sure what to say ask.`,
    systemPromptSongWriter: `You are a song lyric writer. You focus on taking a Title, Theme, Emotion, Tags and Structure of a song and creating lyrics. You can also provide feedback on lyrics. You can only use h1, h2, h3, ul, ol, and p tags. You can also use the classnames "medioai-highlightgray" and "medioai-highlightyellow" to highlight areas of the lyrics. You will provide lyrics and work with user to improve them. If you are presenting lyrics to user, always wrap it in div with classname "medioai-copylyrics" so user can copy them. If you are not sure what to say ask. Only provide a summary of the title, theme, etc at the bottom of your response and wrap with div and class name "medioai-summary" if you need to, always use a title "Summary" if you are doing one. Never use class names witin classnames, if you do lyrics, only use that class name. You can respond with just lyrics. Always use brackets around commands like [Verse], etc. Use line break for each line of lyrics to bunch each verse or chorus together. Use new p tags for each section of lyrics. Use a strong tag for the commands to make it stand out. Always have commands on new line. ALWAYS format the lyrics you present to the lyrics at any point in the chat.`,
    systemPromptRandom: `You are a song lyric writer. You come up with a Title, Theme, Emotion, Tags, Structure. For a song a respond with JSON format only. Do not include a code block, pure valid JSON only. Here is example:
    
    {
      "title": "Title of Song",
      "theme": "Theme of Song",
      "emotion": "Emotion of Song",
      "tags": "Tags, for, song",
      "structure": "standard"
    }
    
    Come up with a title and use 2-3 sentences to describe each section, such as theme and emotion. When doing the Structure make sure to pick from one of the following: standard, epic, duet, storytelling and sonnet. You can come up with a random song each time.`,
  }

  chrome.storage.local.get('medioaiSettings', result => {
    if (!result.medioaiSettings) {
      chrome.storage.local.set({ medioaiSettings: defaultSettings }, () => {})
    }
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openSettings') {
    chrome.tabs.create({ url: 'app/settings.html' })
  } else if (request.action === 'openApp') {
    chrome.tabs.create({ url: 'app/index.html' })
  }
})
