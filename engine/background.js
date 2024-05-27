/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * ---
 * Unless... you are planning to improve it of course, then do whatever you want and add your name to the list of contributors on GitHub.
 */

chrome.runtime.onInstalled.addListener(() => {
  const defaultSettings = {
    notification: "on",
    notificationsound: "1",
    slideanimation: "on",
    commandcolor: "#26BB79",
    lyrictextsize: "18px",
    aimodel: "openai",
    openaikey: "",
    claudeapikey: "",
  };

  chrome.storage.local.get("medioaiSettings", (result) => {
    if (!result.medioaiSettings) {
      chrome.storage.local.set({ medioaiSettings: defaultSettings }, () => {
        console.log("Default settings have been saved:", defaultSettings);
      });
    }
  });
});
