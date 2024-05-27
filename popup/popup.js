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

document.querySelector("#openConvert").addEventListener("click", () => {
  chrome.tabs.create({ url: "app/convert.html" });
});

document.querySelector("#openVisualizer").addEventListener("click", () => {
  chrome.tabs.create({ url: "app/visualizer.html" });
});

document.querySelector("#openSettings").addEventListener("click", () => {
  chrome.tabs.create({ url: "app/settings.html" });
});
