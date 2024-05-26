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
