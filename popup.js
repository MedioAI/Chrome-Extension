document.querySelector("#openMaster").addEventListener("click", () => {
  chrome.tabs.create({ url: "app/index.html" });
});
