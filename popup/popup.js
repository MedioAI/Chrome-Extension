document.querySelector("#openConvert").addEventListener("click", () => {
  chrome.tabs.create({ url: "app/convert.html" });
});

document.querySelector("#openVisualizer").addEventListener("click", () => {
  chrome.tabs.create({ url: "app/visualizer.html" });
});

document.querySelector("#openSettings").addEventListener("click", () => {
  chrome.tabs.create({ url: "app/settings.html" });
});
