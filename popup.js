document.querySelector("#openMaster").addEventListener("click", () => {
  // open the Master page master.html
  chrome.tabs.create({ url: "master.html" });
});
