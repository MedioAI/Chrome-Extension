const engine = {
  init: () => {
    const sidebar = document.querySelector(
      'aside[aria-label="Sidebar"] nav ul'
    );

    if (sidebar) {
      engine.lyricBarn();
    } else {
      const checkSidebar = setInterval(() => {
        const sidebar = document.querySelector(
          'aside[aria-label="Sidebar"] nav ul'
        );

        if (sidebar) {
          clearInterval(checkSidebar);
          console.log("Me-Dio, a sous chef for Udio.com");
          engine.friesAreDone();
          engine.lyricBarn();
        }
      }, 1000);
    }

    engine.clearDB();
  },

  clearDB: () => {
    chrome.storage.sync.get("medioTags", (data) => {
      if (data.medioTags) {
        chrome.storage.sync.remove("medioTags", () => {
          console.log("medioTags cleared.");
        });
      }
    });
    chrome.storage.sync.get("medioLyrics", (data) => {
      if (data.medioLyrics) {
        chrome.storage.sync.remove("medioLyrics", () => {
          console.log("medioLyrics cleared.");
        });
      }
    });
  },

  lyricBarn: async () => {
    const html = `<div class="-ml-5 pl-[16px]"><div class="relative flex items-center rounded-lg p-2 hover:text-foreground"><a class="mr-4 flex items-center" id="lyric-barn-link" href="#">
    
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 16V4zm-2 6V4q0-.825.588-1.412T4 2h11q.825 0 1.413.588T17 4v.425q-.6.275-1.1.675T15 6V4H4v12h11v-4q.4.5.9.9t1.1.675V16q0 .825-.587 1.413T15 18H6zm4-8h4v-2H6zm13-2q-1.25 0-2.125-.875T16 9t.875-2.125T19 6q.275 0 .525.05t.475.125V1h4v2h-2v6q0 1.25-.875 2.125T19 12M6 11h7V9H6zm0-3h7V6H6z"/></svg>
    
    
    <span class="ml-3 flex-1 whitespace-nowrap font-bold">Song Studio</span>
    
    </a></div></div>
    
    <div class="-ml-5 pl-[16px]"><div class="relative flex items-center rounded-lg p-2 hover:text-foreground"><a class="mr-4 flex items-center" id="lyric-tagbuilder-link" href="#">
    
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="16" cy="17" r="1" fill="currentColor" opacity="0.3"/><path fill="currentColor" d="M3 10h12v2H3zm0 4h8v2H3zm0-8h12v2H3zm14 8.18c-.31-.11-.65-.18-1-.18c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3V8h3V6h-5z"/></svg>
    
    
    <span class="ml-3 flex-1 whitespace-nowrap font-bold">Tag Builder</span>
    
    </a></div></div>`;
    const sidebar = document.querySelector(
      'aside[aria-label="Sidebar"] nav ul'
    );

    if (sidebar) {
      sidebar.insertAdjacentHTML("beforeend", html);

      const overlay = document.createElement("div");
      overlay.id = "lyric-tagbuilder-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.zIndex = "99999999999";
      const animate2 = await engine.getSettings("slideanimation");
      if (animate2 === "on") {
        overlay.style.transition = "transform 0.3s";
      }
      overlay.style.transform = "translateX(-100%)";
      overlay.style.overflowY = "auto";
      overlay.style.padding = "25px";
      overlay.style.boxSizing = "border-box";
      overlay.style.display = "flex";
      overlay.style.flexDirection = "column";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.color = "#fff";
      overlay.style.fontFamily = "Arial, sans-serif";
      overlay.style.fontSize = "16px";
      overlay.style.lineHeight = "1.5";
      overlay.style.fontWeight = "400";

      overlay.innerHTML = /* html */ `
<button
  id="close-lyric-tagbuilder"
  style="
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #fff;
    font-size: 34px;
    cursor: pointer;
    background: #000;
    border-radiu: 100%;
    padding: 6px 12px;
    ">&times;</button>
          <div id="lyric-barn-content">
  <input type="hidden" id="mediotag-id" />

<h1 class="flex items-center space-x-2" style="font-size: 24px; font-weight: 700; margin-bottom: 16px">
  <img src="${chrome.runtime.getURL(
    "icon/128x128.png"
  )}" style="width: 48px; height: 48px; border-radius: 6px; margin-right: 8px" />
  <span class="font-bold">Tag Builder</span>
</h1>

<div
  role="tablist"
  aria-orientation="horizontal"
  class="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2 mb-4"
  tabindex="0"
  data-orientation="horizontal"
  style="outline: none"
>
  <button
    type="button"
    data-tab="build"
    class="lyric-buildertab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 bg-black"
  >
    Build
  </button>
  <button
    type="button"
    data-tab="library"
    class="lyric-buildertab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
  >
    Library
  </button>
</div>

<div  class="lyric-buildertab"  data-tab="build">
  <div class="mb-4 relative">
    <span class="text-sm text-gray-200 mb-2 block">Search & Browse</span>
    <div id="medioSearchClear" class="absolute" style="top: 40px;right:13px">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32"><path fill="currentColor" d="m29.772 26.433l-7.126-7.126a10.43 10.43 0 0 0 1.524-5.42c0-5.794-4.692-10.486-10.482-10.488c-5.79 0-10.484 4.693-10.484 10.485c0 5.79 4.693 10.48 10.484 10.48c1.987 0 3.84-.562 5.422-1.522l7.128 7.127l3.534-3.537zM7.202 13.885a6.496 6.496 0 0 1 6.485-6.486a6.493 6.493 0 0 1 6.484 6.485a6.494 6.494 0 0 1-6.483 6.484a6.496 6.496 0 0 1-6.484-6.485z"/></svg>
    </div>
    <input type="text" id="searchTags" placeholder="Search for tags..." class="w-full border rounded p-2 px-3" />
    <div id="medioSearchDropdown" class="w-full bg-black mt-2 absolute p-4 rounded shadow-xl border flex flex-x-2 flex-y-2 items-start" style="display: none">
      <p class="text-xs text-gray-400">Search results will appear here...</p>
    </div>
  </div>
  <div class="flex space-x-4">
      <div class="w-1/4">
        <select id="medio-builder-genre" class="medioAddTag w-full border rounded p-1"></select>
      </div>
      <div class="w-1/4">
        <select id="medio-builder-artist" class="medioAddTag w-full border rounded p-1"></select>
      </div>
      <div class="w-1/4">
        <select id="medio-builder-emotion" class="medioAddTag w-full border rounded p-1">
          <option value="" selected disabled>Emotion</option>
          <option value="Joyful">Joyful</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Excited">Excited</option>
          <option value="Calm">Calm</option>
          <option value="Anxious">Anxious</option>
          <option value="Energetic">Energetic</option>
          <option value="Peaceful">Peaceful</option>
          <option value="Lively">Lively</option>
          <option value="Melancholic">Melancholic</option>
          <option value="Hopeful">Hopeful</option>
          <option value="Frustrated">Frustrated</option>
          <option value="Content">Content</option>
          <option value="Tense">Tense</option>
          <option value="Happy">Happy</option>
          <option value="Gloomy">Gloomy</option>
          <option value="Enraged">Enraged</option>
          <option value="Thrilled">Thrilled</option>
          <option value="Tranquil">Tranquil</option>
          <option value="Nervous">Nervous</option>
          <option value="Vibrant">Vibrant</option>
          <option value="Serene">Serene</option>
          <option value="Dynamic">Dynamic</option>
          <option value="Reflective">Reflective</option>
          <option value="Optimistic">Optimistic</option>
          <option value="Despairing">Despairing</option>
          <option value="Agitated">Agitated</option>
          <option value="Blissful">Blissful</option>
          <option value="Heavy-hearted">Heavy-hearted</option>
          <option value="Cautious">Cautious</option>
          <option value="Buoyant">Buoyant</option>
          <option value="Tragic">Tragic</option>
          <option value="Furious">Furious</option>
          <option value="Ecstatic">Ecstatic</option>
          <option value="Soothing">Soothing</option>
          <option value="Worried">Worried</option>
          <option value="Animated">Animated</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Euphoric">Euphoric</option>
          <option value="Sentimental">Sentimental</option>
          <option value="Cheerful">Cheerful</option>
          <option value="Morose">Morose</option>
          <option value="Indignant">Indignant</option>
          <option value="Exhilarated">Exhilarated</option>
          <option value="Tranquil">Tranquil</option>
          <option value="Uneasy">Uneasy</option>
          <option value="Lively">Lively</option>
          <option value="Calm">Calm</option>
          <option value="Delighted">Delighted</option>
          <option value="Despondent">Despondent</option>
        </select>
      </div>
      <div class="w-1/4">
        <select id="medio-builder-period" class="medioAddTag w-full border rounded p-1">
            <option value="" selected disabled>Period</option>
            <option value="Baroque">Baroque</option>
            <option value="Classical">Classical</option>
            <option value="Romantic">Romantic</option>
            <option value="20th Century">20th Century</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Renaissance">Renaissance</option>
            <option value="Medieval">Medieval</option>
            <option value="Ancient">Ancient</option>
            <option value="Modern">Modern</option>
            <option value="Postmodern">Postmodern</option>
            <option value="Experimental">Experimental</option>
            <option value="Traditional">Traditional</option>
            <option value="Folk">Folk</option>
            <option value="Electronic">Electronic</option>
            <option value="Jazz Age">Jazz Age</option>
            <option value="Golden Age">Golden Age</option>
            <option value="Industrial Age">Industrial Age</option>
            <option value="Gothic">Gothic</option>
            <option value="Victorian">Victorian</option>
            <option value="Edwardian">Edwardian</option>
            <option value="Impressionist">Impressionist</option>
            <option value="Prehistoric">Prehistoric</option>
            <option value="1901">1901</option>
            <option value="1902">1902</option>
            <option value="1600">1600</option>
            <option value="1610">1610</option>
            <option value="1620">1620</option>
            <option value="1630">1630</option>
            <option value="1640">1640</option>
            <option value="1650">1650</option>
            <option value="1660">1660</option>
            <option value="1670">1670</option>
            <option value="1680">1680</option>
            <option value="1690">1690</option>
            <option value="1700">1700</option>
            <option value="1710">1710</option>
            <option value="1720">1720</option>
            <option value="1730">1730</option>
            <option value="1740">1740</option>
            <option value="1750">1750</option>
            <option value="1760">1760</option>
            <option value="1770">1770</option>
            <option value="1780">1780</option>
            <option value="1790">1790</option>
            <option value="1800">1800</option>
            <option value="1810">1810</option>
            <option value="1820">1820</option>
            <option value="1830">1830</option>
            <option value="1840">1840</option>
            <option value="1850">1850</option>
            <option value="1860">1860</option>
            <option value="1870">1870</option>
            <option value="1880">1880</option>
            <option value="1890">1890</option>
            <option value="1900">1900</option>
            <option value="1910">1910</option>
            <option value="1920">1920</option>
            <option value="1930">1930</option>
            <option value="1940">1940</option>
            <option value="1950">1950</option>
            <option value="1960">1960</option>
            <option value="1970">1970</option>
            <option value="1980">1980</option>
            <option value="1990">1990</option>
            <option value="2000">2000</option>
            <option value="2010">2010</option>
            <option value="2020">2020</option>
            <option value="2030">2030</option>
            <option value="2040">2040</option>
        </select>
      </div>
</div>
    <div class="flex space-x-4 mt-4">
      <div class="w-1/4">
        <select id="medio-builder-region" class="medioAddTag w-full border rounded p-1">
          <option value="" selected disabled>Region</option>
          <optgroup label="Africa">
              <option value="North Africa">North Africa</option>
              <option value="West Africa">West Africa</option>
              <option value="Central Africa">Central Africa</option>
              <option value="East Africa">East Africa</option>
              <option value="Southern Africa">Southern Africa</option>
          </optgroup>
          <optgroup label="Asia">
              <option value="East Asia">East Asia</option>
              <option value="Southeast Asia">Southeast Asia</option>
              <option value="South Asia">South Asia</option>
              <option value="Central Asia">Central Asia</option>
              <option value="West Asia">West Asia</option>
          </optgroup>
          <optgroup label="Europe">
              <option value="Northern Europe">Northern Europe</option>
              <option value="Western Europe">Western Europe</option>
              <option value="Central Europe">Central Europe</option>
              <option value="Eastern Europe">Eastern Europe</option>
              <option value="Southern Europe">Southern Europe</option>
          </optgroup>
          <optgroup label="North America">
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
              <option value="Mexico">Mexico</option>
              <option value="Central America">Central America</option>
          </optgroup>
          <optgroup label="South America">
              <option value="Brazil">Brazil</option>
              <option value="Argentina">Argentina</option>
              <option value="Colombia">Colombia</option>
              <option value="Peru">Peru</option>
          </optgroup>
          <optgroup label="Australia">
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
          </optgroup>
          <optgroup label="Middle East">
              <option value="Middle East">Middle East</option>
              <option value="North Africa">North Africa</option>
          </optgroup>
          <optgroup label="Caribbean">
              <option value="Jamaica">Jamaica</option>
              <option value="Cuba">Cuba</option>
              <option value="Haiti">Haiti</option>
              <option value="Dominican Republic">Dominican Republic</option>
          </optgroup>
          <optgroup label="Central America">
              <option value="Guatemala">Guatemala</option>
              <option value="Belize">Belize</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Panama">Panama</option>
          </optgroup>
          <optgroup label="Pacific Islands">
              <option value="Polynesia">Polynesia</option>
              <option value="Melanesia">Melanesia</option>
              <option value="Micronesia">Micronesia</option>
          </optgroup>
          <optgroup label="Antarctica">
              <option value="Antarctica">Antarctica</option>
          </optgroup>
        </select>
      </div>
      <div class="w-1/4">
        <select id="medio-builder-vocal" class="medioAddTag w-full border rounded p-1">
          <option value="" selected disabled>Vocals</option>
          <option value="Baritone">Baritone</option>
          <option value="Lyric Baritone">Lyric Baritone</option>
          <option value="Dramatic Baritone">Dramatic Baritone</option>
          <option value="Verdi Baritone">Verdi Baritone</option>
          <option value="Heldenbaritone">Heldenbaritone</option>
          <option value="Lyrical Baritone">Lyrical Baritone</option>
          <option value="Tenor">Tenor</option>
          <option value="Spinto Tenor">Spinto Tenor</option>
          <option value="Lyric Tenor">Lyric Tenor</option>
          <option value="Heldentenor">Heldentenor</option>
          <option value="Leggero Tenor">Leggero Tenor</option>
          <option value="Dramatic Tenor">Dramatic Tenor</option>
          <option value="Buffo Tenor">Buffo Tenor</option>
          <option value="Lyrical Tenor">Lyrical Tenor</option>
          <option value="Bass">Bass</option>
          <option value="Basso Profondo">Basso Profondo</option>
          <option value="Basso Buffo">Basso Buffo</option>
          <option value="Basso Cantante">Basso Cantante</option>
          <option value="Bass-Baritone">Bass-Baritone</option>
          <option value="Dramatic Bass">Dramatic Bass</option>
          <option value="Bass Profundo">Bass Profundo</option>
          <option value="Bass-Buffo">Bass-Buffo</option>
          <option value="Raspy">Raspy</option>
          <option value="Breathy">Breathy</option>
          <option value="Smooth">Smooth</option>
          <option value="Gravelly">Gravelly</option>
          <option value="Husky">Husky</option>
          <option value="Velvety">Velvety</option>
          <option value="Clear">Clear</option>
          <option value="Throaty">Throaty</option>
          <option value="Sharp">Sharp</option>
          <option value="Mellow">Mellow</option>
          <option value="Nasal">Nasal</option>
          <option value="Rich">Rich</option>
          <option value="Warm">Warm</option>
          <option value="Tremulous">Tremulous</option>
          <option value="Honeyed">Honeyed</option>
          <option value="Resonant">Resonant</option>
        </select>
      </div>
      <div class="w-1/4">
        <select id="medio-builder-instruments" class="medioAddTag w-full border rounded p-1">
          <option value="" selected disabled>Instruments</option>
          <option value="Violin">Violin</option>
          <option value="Viola">Viola</option>
          <option value="Cello">Cello</option>
          <option value="Double Bass">Double Bass</option>
          <option value="Harp">Harp</option>
          <option value="Guitar">Guitar</option>
          <option value="Bass Guitar">Bass Guitar</option>
          <option value="Electric Guitar">Electric Guitar</option>
          <option value="Acoustic Guitar">Acoustic Guitar</option>
          <option value="Flute">Flute</option>
          <option value="Clarinet">Clarinet</option>
          <option value="Saxophone">Saxophone</option>
          <option value="Oboe">Oboe</option>
          <option value="Bassoon">Bassoon</option>
          <option value="Trumpet">Trumpet</option>
          <option value="Trombone">Trombone</option>
          <option value="French Horn">French Horn</option>
          <option value="Tuba">Tuba</option>
          <option value="Drums">Drums</option>
          <option value="Piano">Piano</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Xylophone">Xylophone</option>
          <option value="Marimba">Marimba</option>
          <option value="Vibraphone">Vibraphone</option>
          <option value="Timpani">Timpani</option>
          <option value="Glockenspiel">Glockenspiel</option>
          <option value="Cymbals">Cymbals</option>
        </select>
      </div>
      <div class="w-1/4">
        <select id="medio-builder-production" class="medioAddTag w-full border rounded p-1">
            <option value="" selected disabled>Production</option>
            <option value="Lo-fi">Lo-fi</option>
            <option value="Hi-fi">Hi-fi</option>
            <option value="Acoustic">Acoustic</option>
            <option value="Electronic">Electronic</option>
            <option value="Analog">Analog</option>
            <option value="Digital">Digital</option>
            <option value="Synthetic">Synthetic</option>
            <option value="Organic">Organic</option>
            <option value="Raw">Raw</option>
            <option value="Processed">Processed</option>
            <option value="Vintage">Vintage</option>
            <option value="Modern">Modern</option>
            <option value="Traditional">Traditional</option>
            <option value="Experimental">Experimental</option>
            <option value="Industrial">Industrial</option>
            <option value="Synthwave">Synthwave</option>
            <option value="Chiptune">Chiptune</option>
            <option value="Ambient">Ambient</option>
            <option value="Grunge">Grunge</option>
            <option value="Acid">Acid</option>
        </select>
      </div>
  </div>
  <div class="py-4">

  <span class="text-sm text-gray-200 mb-2 block">Prompt</span>

      <textarea placeholder="Write music prompt tags here..." class="w-full p-6 rounded border mb-3" id="medioTagBox" style="height: 180px"></textarea>

      <hr class="mt-2 mb-6 border-t border-gray-700" />


      <div class="flex justify-between space-x-4">
        <input id="medioTagBoxTitle" autocomplete="off" type="text" placeholder="Give your tag group a name..." class="w-full p-2 px-4 rounded border mb-3" style="width: 100%;" />
        <div class="flex space-x-1">
          <button id="medio-saveTags">Save</button>
          <button id="medio-clearTags">Clear</button>
          <button id="medio-copyTags">Copy</button>
        </div>
      </div>
  </div>
</div>

<div style="display: none" class="lyric-buildertab" data-tab="library">
  <div id="medio-taglibrary-items" class="grid grid-cols-3 gap-4"></div>
</div>
</div>

          `;

      document.body.appendChild(overlay);

      const lyricBuildertabButtons = document.querySelectorAll(
        ".lyric-buildertab-button"
      );
      const lyricBuildertabs = document.querySelectorAll(".lyric-buildertab");

      lyricBuildertabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const tab = button.getAttribute("data-tab");

          lyricBuildertabButtons.forEach((button) => {
            button.classList.remove("bg-black", "text-foreground");
            button.classList.add("bg-muted", "text-muted-foreground");
          });

          lyricBuildertabs.forEach((tab) => {
            tab.style.display = "none";
          });

          button.classList.remove("bg-muted", "text-muted-foreground");
          button.classList.add("bg-black", "text-foreground");

          const selectedTab = document.querySelector(
            `.lyric-buildertab[data-tab="${tab}"]`
          );

          selectedTab.style.display = "block";

          if (tab === "library") {
            chrome.storage.sync.get("medioTags", (data) => {
              const tags = data.medioTags ? data.medioTags : [];

              const tagLibraryItems = document.getElementById(
                "medio-taglibrary-items"
              );

              tagLibraryItems.innerHTML = "";

              if (tags.length === 0) {
                tagLibraryItems.setAttribute(
                  "class",
                  "text-center w-full p-4 text-gray-500"
                );
                tagLibraryItems.innerHTML =
                  "<h3 class='text-2xl text-gray-200 font-bold mb-2'>No Tags Found</h3> <p>Your tags will appear here to edit & manage at any time.</p>";
                return;
              } else {
                tagLibraryItems.setAttribute("class", "grid grid-cols-3 gap-4");
              }

              tags.forEach((tag, index) => {
                const div = document.createElement("div");
                div.classList.add(
                  "medioopentag",
                  "border",
                  "p-4",
                  "rounded",
                  "text-sm",
                  "relative"
                );

                div.setAttribute("data-id", tag.id);

                div.innerHTML = /* html */ `
                <h2 class="font-bold text-lg">${tag.title}</h2>
                <p class="truncate text-gray-400">${tag.tags}</p>
                <button class="deleteMediaTag absolute top-2 right-2 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"/></svg></button>
                `;

                tagLibraryItems.appendChild(div);
              });

              const medioOpenTag = document.querySelectorAll(".medioopentag");

              medioOpenTag.forEach((tag) => {
                tag
                  .querySelector(".deleteMediaTag")
                  .addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (e.target.classList.contains("confirmDelete")) {
                      const tagId = tag.getAttribute("data-id");

                      chrome.storage.sync.get("medioTags", (data) => {
                        const tags = data.medioTags ? data.medioTags : [];
                        const newTags = tags.filter((tag) => tag.id !== tagId);

                        chrome.storage.sync.set({ medioTags: newTags }, () => {
                          engine.showNotification(
                            "Deleted tag from your library."
                          );
                        });
                      });

                      e.target.closest(".medioopentag").remove();
                    } else {
                      e.target.classList.add("confirmDelete");

                      setTimeout(() => {
                        e.target.classList.remove("confirmDelete");
                      }, 5000);
                    }
                  });
                tag.addEventListener("click", () => {
                  const tags = tag.querySelector("p").textContent;
                  const title = tag.querySelector("h2").textContent;

                  const medioTagBox = document.getElementById("medioTagBox");
                  const medioTagBoxTitle =
                    document.getElementById("medioTagBoxTitle");

                  medioTagBox.value = tags;
                  medioTagBoxTitle.value = title;

                  document.querySelector("#mediotag-id").value =
                    tag.getAttribute("data-id");

                  document
                    .querySelector(`.lyric-buildertab-button[data-tab="build"]`)
                    .click();

                  engine.showNotification(`Opened Tag Group: "${title}"`);
                });
              });
            });
          }
        });
      });

      const medioAddTag = document.querySelectorAll(".medioAddTag");
      const medioTagBox = document.getElementById("medioTagBox");

      medioAddTag.forEach((tag) => {
        tag.addEventListener("change", () => {
          if (tag.value) {
            medioTagBox.value += tag.value + ", ";
            engine.showNotification(`Added "${tag.value}" tag to your prompt.`);
            tag.value = "";
          }
        });
      });

      const artistsJson = chrome.runtime.getURL("database/artists.json");
      const genresJson = chrome.runtime.getURL("database/genres.json");

      const artistsPromise = fetch(artistsJson)
        .then((response) => response.json())
        .then((data) => {
          const artistSelect = document.getElementById("medio-builder-artist");
          const option = document.createElement("option");
          option.value = "";
          option.textContent = "Artist";
          option.disabled = true;
          option.selected = true;
          artistSelect.appendChild(option);
          data.forEach((artist) => {
            const option = document.createElement("option");
            option.value = artist;
            option.textContent = artist;
            artistSelect.appendChild(option);
          });
        });

      const genresPromise = fetch(genresJson)
        .then((response) => response.json())
        .then((data) => {
          const genreSelect = document.getElementById("medio-builder-genre");
          const option = document.createElement("option");
          option.value = "";
          option.textContent = "Genre";
          option.disabled = true;
          option.selected = true;
          genreSelect.appendChild(option);
          data.forEach((artist) => {
            const option = document.createElement("option");
            option.value = artist.name;
            option.textContent = artist.name;
            genreSelect.appendChild(option);
          });
        });

      Promise.all([artistsPromise, genresPromise]).then(() => {
        const totalDBTags = [];
        const allSelectBoxes = document.querySelectorAll(".medioAddTag");

        allSelectBoxes.forEach((select) => {
          select.querySelectorAll("option").forEach((option) => {
            totalDBTags.push(option.value.toLowerCase());
          });
        });

        document.getElementById("searchTags").addEventListener("input", (e) => {
          const search = e.target.value.toLowerCase();

          if (search === "") {
            document.getElementById("medioSearchDropdown").style.display =
              "none";
            return;
          }

          document.querySelector(
            "#medioSearchClear"
          ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12"/></svg>`;

          document
            .querySelector("#medioSearchClear")
            .addEventListener("click", () => {
              document.getElementById("searchTags").value = "";
              document.getElementById("medioSearchDropdown").style.display =
                "none";

              document.querySelector(
                "#medioSearchClear"
              ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32"><path fill="currentColor" d="m29.772 26.433l-7.126-7.126a10.43 10.43 0 0 0 1.524-5.42c0-5.794-4.692-10.486-10.482-10.488c-5.79 0-10.484 4.693-10.484 10.485c0 5.79 4.693 10.48 10.484 10.48c1.987 0 3.84-.562 5.422-1.522l7.128 7.127l3.534-3.537zM7.202 13.885a6.496 6.496 0 0 1 6.485-6.486a6.493 6.493 0 0 1 6.484 6.485a6.494 6.494 0 0 1-6.483 6.484a6.496 6.496 0 0 1-6.484-6.485z"/></svg>`;
            });

          const searchResults = totalDBTags.filter((tag) => {
            return tag.toLowerCase().includes(search);
          });

          const medioSearchDropdown = document.getElementById(
            "medioSearchDropdown"
          );
          medioSearchDropdown.innerHTML = "";

          if (searchResults.length === 0) {
            medioSearchDropdown.innerHTML = `<p class="text-xs text-gray-400">No results found...</p>`;
            return;
          }

          searchResults.forEach((tag) => {
            const span = document.createElement("span");
            span.classList.add(
              "medioSearchTag",
              "py-2",
              "px-4",
              "cursor-pointer",
              "rounded",
              "bg-gray-400",
              "text-sm"
            );
            const words = tag.split(" ");
            const capitalizedWords = words.map(
              (word) => word.charAt(0).toUpperCase() + word.slice(1)
            );
            const capitalizedTag = capitalizedWords.join(" ");
            span.textContent = capitalizedTag;
            medioSearchDropdown.appendChild(span);
          });

          medioSearchDropdown.style.display = "block";

          const medioSearchTags = document.querySelectorAll(".medioSearchTag");

          medioSearchTags.forEach((tag) => {
            tag.addEventListener("click", () => {
              medioTagBox.value += tag.textContent + ", ";
              engine.showNotification(
                `Added "${tag.textContent}" tag to your prompt.`
              );
            });
          });
        });
      });

      const medioSaveTags = document.getElementById("medio-saveTags");
      medioSaveTags.addEventListener("click", (e) => {
        const tags = medioTagBox.value;
        const title = document.querySelector("#medioTagBoxTitle").value;
        const tagId = document.querySelector("#mediotag-id").value;

        if (!tagId) {
          chrome.storage.sync.get("medioTags", (data) => {
            const newTags = data.medioTags ? data.medioTags : [];
            newTags.push({
              id: engine.uuidv4(),
              created_at: new Date().toISOString(),
              tags,
              title: title || "Untitled",
            });
            chrome.storage.sync.set({ medioTags: newTags }, () => {
              engine.showNotification("Created new tag for your library.");
            });
          });

          e.target.textContent = "Saved!";

          setTimeout(() => {
            e.target.textContent = "Save";
          }, 1000);
        } else {
          chrome.storage.sync.get("medioTags", (data) => {
            const tags = data.medioTags ? data.medioTags : [];
            const title = document.querySelector("#medioTagBoxTitle").value;
            const newTags2 = document.getElementById("medioTagBox").value;
            const newTags = tags.map((tag) => {
              if (tag.id === tagId) {
                return {
                  ...tag,
                  tags: newTags2,
                  title: title,
                };
              } else {
                return tag;
              }
            });

            chrome.storage.sync.set({ medioTags: newTags }, () => {
              engine.showNotification("Updated tag in your library.");
            });
          });

          e.target.textContent = "Updated!";

          setTimeout(() => {
            e.target.textContent = "Save";
          }, 1000);
        }
      });

      const medioClearTags = document.getElementById("medio-clearTags");
      medioClearTags.addEventListener("click", (e) => {
        if (e.target.classList.contains("confirmClear")) {
          medioTagBox.value = "";
          document.querySelector("#medioTagBoxTitle").value = "";
          document.querySelector("#mediotag-id").value = "";
          engine.showNotification("Cleared current tags.");
          e.target.classList.remove("confirmClear");
        } else {
          e.target.classList.add("confirmClear");

          setTimeout(() => {
            e.target.classList.remove("confirmClear");
          }, 5000);
        }
      });

      const medioCopyTags = document.getElementById("medio-copyTags");
      medioCopyTags.addEventListener("click", (e) => {
        navigator.clipboard.writeText(medioTagBox.value);

        e.target.textContent = "Copied!";
        engine.showNotification("Copied tags to clipboard.");

        setTimeout(() => {
          e.target.textContent = "Copy";
        }, 1000);
      });

      const closeLyricTagBuilder = document.getElementById(
        "close-lyric-tagbuilder"
      );
      closeLyricTagBuilder.addEventListener("click", () => {
        overlay.style.transform = "translateX(-100%)";
        document.body.style.overflow = "auto";
      });

      const lyricTagBuilderLink = document.getElementById(
        "lyric-tagbuilder-link"
      );
      lyricTagBuilderLink.addEventListener("click", (e) => {
        e.preventDefault();

        if (!document.getElementById("lyric-tagbuilder-overlay")) {
          document.body.style.overflow = "auto";
        } else {
          document.body.style.overflow = "hidden";
          const overlay3 = document.getElementById("lyric-tagbuilder-overlay");
          overlay3.style.transform = "translateX(0)";
        }
      });

      const overlay2 = document.createElement("div");
      overlay2.id = "lyric-barn-overlay";
      overlay2.style.position = "fixed";
      overlay2.style.top = "0";
      overlay2.style.left = "0";
      overlay2.style.width = "100%";
      overlay2.style.height = "100%";
      overlay2.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay2.style.zIndex = "99999999999";
      const animate = await engine.getSettings("slideanimation");
      if (animate === "on") {
        overlay2.style.transition = "transform 0.3s";
      }
      overlay2.style.transform = "translateX(-100%)";
      overlay2.style.overflowY = "auto";
      overlay2.style.padding = "25px";
      overlay2.style.boxSizing = "border-box";
      overlay2.style.display = "flex";
      overlay2.style.flexDirection = "column";
      overlay2.style.alignItems = "center";
      overlay2.style.justifyContent = "center";
      overlay2.style.color = "#fff";
      overlay2.style.fontFamily = "Arial, sans-serif";
      overlay2.style.fontSize = "16px";
      overlay2.style.lineHeight = "1.5";
      overlay2.style.fontWeight = "400";
      overlay2.innerHTML = /* html */ `
<button
  id="close-lyric-barn"
  style="
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #fff;
    font-size: 34px;
    cursor: pointer;
    background: #000;
    border-radiu: 100%;
    padding: 6px 12px;
  "
>
  &times;
</button>

<div id="lyric-barn-content">
  <input type="hidden" id="lyric-id" />

  
  <h1 class="flex items-center space-x-2" style="font-size: 24px; font-weight: 700; margin-bottom: 16px">
  <img src="${chrome.runtime.getURL(
    "icon/128x128.png"
  )}" style="width: 48px; height: 48px; border-radius: 6px; margin-right: 8px" />
  <span class="font-bold">Song Studio</span>
  <span id="medioCharactersSelected" style="display:none" class="text-sm text-gray-300 flex-1 whitespace-nowrap font-medium">0 Characters Selected</span>
</h1>

  <div
  role="tablist"
  aria-orientation="horizontal"
  class="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full  mb-4"
  style="grid-template-columns: repeat(5, minmax(0, 1fr));"
  tabindex="0"
  data-orientation="horizontal"
  style="outline: none"
>
  <button
    type="button"
    data-tab="write"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 bg-black"
  >
    Write
  </button>
  <button
    type="button"
    data-tab="rhyme"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
  >
    Rhyme
  </button>
  <button
    type="button"
    data-tab="ask"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
  >
    Ask
  </button>
  <button
    type="button"
    data-tab="wizard"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
  >
    Co-Writer
  </button>
  <button
    type="button"
    data-tab="library"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
  >
    Library
  </button>
</div>

<div style="display: none" id="mediochattab">
  <div id="medioaichat"></div>
  <div class="flex w-full">
    <textarea id="medioaiMessageBox" placeholder="Write message..." class="w-full"></textarea>
    <button id="medioaiSendMessage">Send</button>
  </div>
</div>

<div style="display: none" id="mediochats"></div>

<div style="display: none" class="lyric-tab" data-tab="ask">
  <div id="medioask" style="display: none">
    <textarea name="medioaskai" id="medioaskai" placeholder="What do you want to ask?"></textarea>
    <div class="flex space-x-2 items-center justify-between mt-2">
      <div class="flex space-x-2">
        <button id="medioAskAIQuestion" class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" d="m14.5.5l.46.197a.5.5 0 0 0-.657-.657zm-14 6l-.197-.46a.5.5 0 0 0-.06.889zm8 8l-.429.257a.5.5 0 0 0 .889-.06zM14.303.04l-14 6l.394.92l14-6zM.243 6.93l5 3l.514-.858l-5-3zM5.07 9.757l3 5l.858-.514l-3-5zm3.889 4.94l6-14l-.92-.394l-6 14zM14.146.147l-9 9l.708.707l9-9z"/></svg> 
          <span>Ask</span>
        </button>

        <button id="medioAskChatList" class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M224 96v128l-39.58-32H88a8 8 0 0 1-8-8v-40h88a8 8 0 0 0 8-8V88h40a8 8 0 0 1 8 8" opacity="0.2"/><path d="M216 80h-32V48a16 16 0 0 0-16-16H40a16 16 0 0 0-16 16v128a8 8 0 0 0 13 6.22L72 154v30a16 16 0 0 0 16 16h93.59L219 230.22a8 8 0 0 0 5 1.78a8 8 0 0 0 8-8V96a16 16 0 0 0-16-16M66.55 137.78L40 159.25V48h128v88H71.58a8 8 0 0 0-5.03 1.78M216 207.25l-26.55-21.47a8 8 0 0 0-5-1.78H88v-32h80a16 16 0 0 0 16-16V96h32Z"/></g></svg> 
          <span>Past Chats</span>
        </button>
      </div>
      <div class="ml-2 text-sm text-gray-400 flex space-x-2 items-center">
          <input id="medioaiIncludeLyrics" name="medioaiIncludeLyrics" type="checkbox" checked />
          <label for="medioaiIncludeLyrics">Include current song lyrics in the request.</label>
      </div>
    </div>

    <hr style="margin: 15px 0" class="my-8 border-t border-gray-700" />

    <h4 class="text-sm text-gray-400 font-medium mb-2">Pre-made Requests</h4>
    <div class="grid grid-cols-4 gap-4" id="medioSuggestions">
      <div class="medioAskAIPremadeQuestion border rounded p-6">
        Check my lyrics for grammar & spelling mistakes.
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
        Write 10 critical social media comments about my song.
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
        Review my song as if you were a music critic.
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
        Give me pointers on how to improve my lyrics.
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest synonyms or alternative phrases for specific words in my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my lyrics more emotionally impactful?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you analyze the overall tone or mood of my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any clichés in my lyrics that I should avoid?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me brainstorm new ideas or themes for my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What poetic devices can I incorporate to enhance my lyrics (e.g., metaphors, similes, imagery)?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my lyrics more relatable to a wider audience?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any inconsistencies or contradictions in my lyrics that need to be addressed?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to improve the flow or rhythm of my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create stronger hooks or memorable phrases in my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any cultural references in my lyrics that might not be universally understood?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me fine-tune the storytelling aspect of my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What can I do to make my lyrics more vivid and descriptive?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any lines or verses in my lyrics that feel out of place or unnecessary?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you provide feedback on the overall structure of my song lyrics (e.g., verse-chorus-bridge)?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I maintain coherence and unity throughout my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make my lyrics more engaging or thought-provoking?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for wordplay or clever turns of phrase in my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me strike a balance between being too literal and too abstract in my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I ensure that my lyrics complement the melody and musical arrangement effectively?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest a suitable rhyme scheme for my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I vary the vocal delivery to enhance the lyrical impact?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What genre-specific elements can I incorporate into my song lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to build tension and release in the song structure?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a memorable pre-chorus section in my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for vocal harmonies in my song lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me establish a consistent narrative arc throughout the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What role can repetition play in reinforcing key themes or ideas in my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use contrast between sections (e.g., verse and chorus) in my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to transition smoothly between different song sections?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a powerful climax in my song lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for call-and-response elements in my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate dynamic shifts in the song structure?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use pauses or silence for dramatic effect in the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What techniques can I use to create a catchy hook for my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to develop a strong opening line for my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a sense of resolution in the song's conclusion?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What considerations should I keep in mind when crafting a bridge section?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song structure more dynamic and engaging?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create contrast between verses to keep the listener engaged?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What elements can I add to create a sense of progression throughout the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a compelling outro for my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use tempo changes to enhance the emotional impact of the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What techniques can I use to make the song lyrics more memorable?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to create a sense of urgency or excitement in the song structure?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use modulation to add interest to the song's progression?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          What role can dynamics play in shaping the overall feel of the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me create a memorable refrain for my song lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use parallelism to reinforce key themes or ideas in my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me turn my heartbreak into a catchy disco anthem?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about laundry detergent more exciting?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest a way to incorporate a kazoo solo into my song about office supplies?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about procrastination sound urgent and important (but still procrastinate on finishing it)?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a love song to my favorite snack food?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I turn my mundane daily routine into an epic rock opera?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make my song about aliens invading Earth more relatable to extraterrestrials?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I incorporate the sound of rubber chickens into my song about existential dread?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a breakup song from the perspective of a houseplant?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about being stuck in traffic more upbeat and danceable?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate humor into my lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I infuse my song with a sense of adventure?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a catchy chorus that sticks in people's heads?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my verses more relatable to listeners?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to build tension and excitement throughout the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a memorable melody for my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me incorporate unexpected twists into the lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song more emotionally resonant?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to add depth and complexity to the lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create contrast between different sections of the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a powerful climax for the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I ensure that my song is engaging from start to finish?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song more dynamic?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create an intriguing narrative arc within the lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me incorporate vivid imagery into the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song more thought-provoking?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song structure more cohesive?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I add layers of meaning to the lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me create a sense of atmosphere in the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I incorporate interesting wordplay into the lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song more visually evocative?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a sense of unity throughout the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a memorable hook for the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I incorporate elements of surprise into the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song more relatable to listeners?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a sense of urgency or excitement in the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me incorporate different perspectives into the lyrics?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song more memorable and impactful?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to add depth and complexity to the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a strong emotional connection with the audience?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a bridge section that provides contrast to the rest of the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the song more interactive or engaging for live performances?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest an attention-grabbing intro for my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a smooth transition from the intro to the first verse?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a memorable outro that leaves a lasting impression?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the outro feel like a satisfying conclusion to the song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest sound effects to enhance the mood of specific song sections, like a [Wolf Howl] for added atmosphere?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I integrate sound effects seamlessly into my song without overpowering the music?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me brainstorm creative sound effect ideas to elevate my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use sound effects to create a sense of narrative or storytelling in my song?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate natural sounds, like birds chirping or waves crashing, into my song for added texture?
      </div>
      <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the use of sound effects feel organic and integral to the overall musical experience?
      </div>
    </div>
  </div>
  <div id="medioapiExplainerask" class="text-center w-full" style="display: none">
    <h3 class='text-2xl text-gray-200 font-bold mb-2 mt-8'>Unavailable</h3> 
    <p>You must add your  <span style="background: #27272A"class="rounded p-2 text-xs">OpenAI</span> API key in order to use this feature.</p>
    <hr class="my-6 border-t border-gray-700" />
    <p>Ask the AI for quick tasks or questions around your lyrics.</p>
  </div>
</div>

<div style="display: none" class="lyric-tab" data-tab="wizard">
  <div id="mediowizard" style="display: none">
    wizard here
  </div>
  <div id="medioapiExplainerwizard" class="text-center w-full" style="display: none">
    <h3 class='text-2xl text-gray-200 font-bold mb-2 mt-8'>Unavailable</h3> 
    <p>You must add your  <span style="background: #27272A"class="rounded p-2 text-xs">OpenAI</span> API key in order to use this feature.</p>
    <hr class="my-6 border-t border-gray-700" />
    <p>Use the <strong>Co-Writer</strong> to craft your lyrics from scratch with the help of an AI.</p>
  </div>
</div>


<div style="display: none" class="lyric-tab" data-tab="rhyme">
  <div class="flex items-center justitfy-between mb-4">
    <input autocomplete="off" type="text" id="wordInput" placeholder="Enter a word to find rhymes..." />
    <button id="lyric-barn-findRhymeClear">Clear</button>
    <button id="lyric-barn-findRhyme">Find Rhymes</button>
  </div>
  <div id="results" class="w-full grid grid-cols-4 gap-2" style="display: none"></div>
  <div id="medioRhymeExplainer" class="text-center w-full">
    <h3 class='text-2xl text-gray-200 font-bold mb-2 mt-8'>Search for Rhymes</h3> 
    <p>Search the <span style="background: #27272A"class="rounded p-2 text-xs">Datamuse</span> free API for any word that might rhyme for catchier lyrics.</p>
  </div>
</div>

<div style="display: none" class="lyric-tab" data-tab="library">
  <div id="medio-library-items" class="grid grid-cols-3 gap-4"></div>
</div>

<div class="lyric-tab" data-tab="write">
  <div id="toolbar" class="flex items-center justify-between ">
    <div class="flex space-x-2">
      <input autocomplete="off" type="text" id="lyric-title" placeholder="Song Title..." />
      <button id="save-lyrics" class="flex items-center space-x-2 medio-toolbar-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2m10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"/></svg>
        <span>Save</span>
      </button>
      <button id="clear-lyrics" class="flex items-center space-x-2 medio-toolbar-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265m.07-3.773c-2.343 0-3.656-1.242-3.656-3.68V13.88c0-2.438 1.313-3.68 3.656-3.68h28.313c2.32 0 3.633 1.242 3.633 3.68v28.24c0 2.438-1.313 3.68-3.633 3.68Zm4.336-9.867a1.86 1.86 0 0 0 1.852 1.875c.515 0 .984-.188 1.312-.54l6.633-6.656l6.656 6.657c.329.328.774.539 1.29.539a1.88 1.88 0 0 0 1.875-1.875c0-.54-.211-.961-.563-1.313l-6.61-6.633l6.634-6.656c.374-.375.562-.797.562-1.289c0-1.031-.82-1.875-1.875-1.875c-.469 0-.867.188-1.242.563l-6.727 6.68l-6.68-6.657c-.351-.328-.75-.54-1.265-.54a1.856 1.856 0 0 0-1.852 1.852c0 .493.211.938.54 1.29l6.632 6.632l-6.633 6.657c-.328.351-.539.773-.539 1.289"/></svg>
        <span>Clear</span>
      </button>
    </div>
    <div class="flex w-full space-x-2 justify-end items-end">
       <select class="ql-custom-dropdown">
          <option selected>Command</option>
          <option value="[Introduction]">Introduction</option>
          <option value="[Opening Theme]">Opening Theme</option>
          <option value="[Verse]">Verse</option>
          <option value="[Pre-Chorus]">Pre-Chorus</option>
          <option value="[Chorus]">Chorus</option>
          <option value="[Chorus Variation]">Chorus Variation</option>
          <option value="[Hook]">Hook</option>
          <option value="[Bridge]">Bridge</option>
          <option value="[Instrumental Break]">Instrumental Break</option>
          <option value="[Solo]">Solo</option>
          <option value="[Interlude]">Interlude</option>
          <option value="[Build-Up]">Build-Up</option>
          <option value="[Drop]">Drop</option>
          <option value="[Breakdown]">Breakdown</option>
          <option value="[Build-Up 2]">Build-Up 2</option>
          <option value="[Second Drop]">Second Drop</option>
          <option value="[Final Chorus]">Final Chorus</option>
          <option value="[Outro]">Outro</option>
          <option value="[Fade out]">Fade out</option>
          <option value="[Fade to end]">Fade to end</option>
          <option value="[Bass Line]">Bass Line</option>
          <option value="[Andante]">Andante</option>
          <option value="[Adagio]">Adagio</option>
          <option value="[Glissando]">Glissando</option>
          <option value="[Accelerando]">Accelerando</option>
          <option value="[Crescendo]">Crescendo</option>
      </select>

      <select class="ql-custom-dropdown">
        <option selected>Structure</option>
        <option value="[Quatrain 1]\n\n[Quatrain 2]\n\n[Quatrain 3]\n\n[Couplet]">Sonnet</option>
        <option value="[Verse]\n\n[Chorus]\n\n[Verse]\n\n[Chorus]\n\n[Bridge]\n\n[Chorus]">Ballad</option>
        <option value="[Line 1]\n\n[Line 2]\n\n[Line 3]">Haiku</option>
        <option value="[Line 1]\n\n[Line 2]\n\n[Line 3]\n\n[Line 4]\n\n[Line 5]">Limerick</option>
        <option value="[A-line]\n\n[A-line]\n\n[B-line]">Blues</option>
        <option value="[Stanza 1]\n\n[Stanza 2]">Quatrain</option>
        <option value="[Strophe]\n\n[Antistrophe]\n\n[Epode]">Ode</option>
        <option value="[Stanza 1]\n\n[Stanza 2]\n\n[Stanza 3]\n\n[Stanza 4]\n\n[Stanza 5]\n\n[Stanza 6]\n\n[Envoi]">Sestina</option>
        <option value="[Tercet 1]\n\n[Tercet 2]\n\n[Tercet 3]\n\n[Tercet 4]\n\n[Final Line]">Terza Rima</option>
        <option value="[Section 1]\n\n[Section 2]\n\n[Section 3]\n\n[Section 4]">Free Verse</option>
      </select>

      <select class="ql-custom-dropdown">
          <option selected>Instrument</option>
          <option value="[Piano Solo]">Piano</option>
          <option value="[Guitar Solo]">Guitar</option>
          <option value="[Bass Solo]">Bass</option>
          <option value="[Drums Solo]">Drums</option>
          <option value="[Violin Solo]">Violin</option>
          <option value="[Cello Solo]">Cello</option>
          <option value="[Flute Solo]">Flute</option>
          <option value="[Clarinet Solo]">Clarinet</option>
          <option value="[Saxophone Solo]">Saxophone</option>
          <option value="[Trumpet Solo]">Trumpet</option>
          <option value="[Trombone Solo]">Trombone</option>
          <option value="[Harp Solo]">Harp</option>
          <option value="[Synthesizer Solo]">Synthesizer</option>
          <option value="[Oboe Solo]">Oboe</option>
          <option value="[Bassoon Solo]">Bassoon</option>
          <option value="[French Horn Solo]">French Horn</option>
          <option value="[Tuba Solo]">Tuba</option>
          <option value="[Accordion Solo]">Accordion</option>
          <option value="[Banjo Solo]">Banjo</option>
          <option value="[Mandolin Solo]">Mandolin</option>
          <option value="[Ukulele Solo]">Ukulele</option>
          <option value="[Harmonica Solo]">Harmonica</option>
          <option value="[Marimba Solo]">Marimba</option>
          <option value="[Xylophone Solo]">Xylophone</option>
          <option value="[Vibraphone Solo]">Vibraphone</option>
          <option value="[Steel Drum Solo]">Steel Drum</option>
          <option value="[Tabla Solo]">Tabla</option>
          <option value="[Sitar Solo]">Sitar</option>
          <option value="[Didgeridoo Solo]">Didgeridoo</option>
          <option value="[Pan Flute Solo]">Pan Flute</option>
          <option value="[Bagpipes Solo]">Bagpipes</option>
          <option value="[Organ Solo]">Organ</option>
          <option value="[Keytar Solo]">Keytar</option>
          <option value="[Tambourine Solo]">Tambourine</option>
          <option value="[Bongos Solo]">Bongos</option>
          <option value="[Congas Solo]">Congas</option>
          <option value="[Timpani Solo]">Timpani</option>
          <option value="[Triangle Solo]">Triangle</option>
          <option value="[Cowbell Solo]">Cowbell</option>
          <option value="[Djembe Solo]">Djembe</option>
          <option value="[Kalimba Solo]">Kalimba</option>
          <option value="[Ocarina Solo]">Ocarina</option>
          <option value="[Zither Solo]">Zither</option>
          <option value="[Lute Solo]">Lute</option>
          <option value="[Baglama Solo]">Baglama</option>
          <option value="[Fiddle Solo]">Fiddle</option>
          <option value="[Balalaika Solo]">Balalaika</option>
          <option value="[Clarinet Solo]">Clarinet</option>
          <option value="[Shakuhachi Solo]">Shakuhachi</option>
          <option value="[Santoor Solo]">Santoor</option>
          <option value="[Erhu Solo]">Erhu</option>
          <option value="[Pipa Solo]">Pipa</option>
          <option value="[Guqin Solo]">Guqin</option>
          <option value="[Koto Solo]">Koto</option>
          <option value="[Shamisen Solo]">Shamisen</option>
          <option value="[Guzheng Solo]">Guzheng</option>
          <option value="[Sarangi Solo]">Sarangi</option>
          <option value="[Sarod Solo]">Sarod</option>
          <option value="[Veena Solo]">Veena</option>
          <option value="[Hurdy Gurdy Solo]">Hurdy Gurdy</option>
          <option value="[Dulcimer Solo]">Dulcimer</option>
          <option value="[Appalachian Dulcimer Solo]">Appalachian Dulcimer</option>
          <option value="[Cimbalom Solo]">Cimbalom</option>
          <option value="[Psaltery Solo]">Psaltery</option>
          <option value="[Bouzouki Solo]">Bouzouki</option>
          <option value="[Oud Solo]">Oud</option>
          <option value="[Rebab Solo]">Rebab</option>
          <option value="[Kora Solo]">Kora</option>
          <option value="[Ngoni Solo]">Ngoni</option>
          <option value="[Mbira Solo]">Mbira</option>
          <option value="[Hang Drum Solo]">Hang Drum</option>
          <option value="[Frame Drum Solo]">Frame Drum</option>
          <option value="[Uilleann Pipes Solo]">Uilleann Pipes</option>
          <option value="[Bandoneon Solo]">Bandoneon</option>
          <option value="[Melodica Solo]">Melodica</option>
          <option value="[Theremin Solo]">Theremin</option>
          <option value="[Glass Harmonica Solo]">Glass Harmonica</option>
          <option value="[Handpan Solo]">Handpan</option>
          <option value="[Laouto Solo]">Laouto</option>
          <option value="[Bodhran Solo]">Bodhran</option>
          <option value="[Soprano Saxophone Solo]">Soprano Saxophone</option>
          <option value="[Tenor Saxophone Solo]">Tenor Saxophone</option>
          <option value="[Baritone Saxophone Solo]">Baritone Saxophone</option>
          <option value="[Bass Clarinet Solo]">Bass Clarinet</option>
          <option value="[Contrabassoon Solo]">Contrabassoon</option>
          <option value="[Piccolo Solo]">Piccolo</option>
          <option value="[Cornet Solo]">Cornet</option>
          <option value="[Flugelhorn Solo]">Flugelhorn</option>
          <option value="[Alto Horn Solo]">Alto Horn</option>
          <option value="[Euphonium Solo]">Euphonium</option>
          <option value="[Sopranino Saxophone Solo]">Sopranino Saxophone</option>
          <option value="[Cimbasso Solo]">Cimbasso</option>
          <option value="[Alto Clarinet Solo]">Alto Clarinet</option>
          <option value="[Bass Flute Solo]">Bass Flute</option>
          <option value="[Contrabass Clarinet Solo]">Contrabass Clarinet</option>
          <option value="[Contrabass Flute Solo]">Contrabass Flute</option>
          <option value="[Subcontrabass Flute Solo]">Subcontrabass Flute</option>
          <option value="[Contrabass Saxophone Solo]">Contrabass Saxophone</option>
          <option value="[Sarrusophone Solo]">Sarrusophone</option>
          <option value="[Octobass Solo]">Octobass</option>
          <option value="[Glass Harp Solo]">Glass Harp</option>
          <option value="[Kalangu Solo]">Kalangu</option>
          <option value="[Thavil Solo]">Thavil</option>
          <option value="[Mridangam Solo]">Mridangam</option>
          <option value="[Tambura Solo]">Tambura</option>
          <option value="[Tar Solo]">Tar</option>
          <option value="[Ghatam Solo]">Ghatam</option>
          <option value="[Kanjira Solo]">Kanjira</option>
          <option value="[Clavichord Solo]">Clavichord</option>
          <option value="[Virginal Solo]">Virginal</option>
          <option value="[Portative Organ Solo]">Portative Organ</option>
          <option value="[Regal Solo]">Regal</option>
          <option value="[Harmonium Solo]">Harmonium</option>
          <option value="[Bandura Solo]">Bandura</option>
          <option value="[Cavaquinho Solo]">Cavaquinho</option>
          <option value="[Charango Solo]">Charango</option>
          <option value="[Cuatro Solo]">Cuatro</option>
          <option value="[Tiple Solo]">Tiple</option>
          <option value="[Crumhorn Solo]">Crumhorn</option>
          <option value="[Rackett Solo]">Rackett</option>
          <option value="[Shawm Solo]">Shawm</option>
          <option value="[Cornamuse Solo]">Cornamuse</option>
          <option value="[Dulzaina Solo]">Dulzaina</option>
          <option value="[Zurna Solo]">Zurna</option>
          <option value="[Suona Solo]">Suona</option>
          <option value="[Bansuri Solo]">Bansuri</option>
          <option value="[Duduk Solo]">Duduk</option>
          <option value="[Shehnai Solo]">Shehnai</option>
          <option value="[Khaen Solo]">Khaen</option>
          <option value="[Kaval Solo]">Kaval</option>
          <option value="[Pennywhistle Solo]">Pennywhistle</option>
          <option value="[Low Whistle Solo]">Low Whistle</option>
      </select>

      <select id="medioextraCommands" class="ql-custom-dropdown">
          <option selected>Extra</option>
          <option value="Lyrics by [Your Name] © 2024">Copyright Stamp 1</option>
          <option value="© 2024 [Your Name]">Copyright Stamp 2</option>
          <option value="[Your Name] - All rights reserved, 2024">Copyright Stamp 3</option>
          <option value="[Spoken Word]">Spoken Word</option>
          <option value="[Wolf Noise]">Wolf Noise</option>
          <option value="[Siren]">Siren</option>
          <option value="[Applause]">Applause</option>
          <option value="[Bell]">Bell</option>
          <option value="[Birds Chirping]">Birds Chirping</option>
          <option value="[Car Horn]">Car Horn</option>
          <option value="[Cat Meow]">Cat Meow</option>
          <option value="[Clapping]">Clapping</option>
          <option value="[Crowd Cheering]">Crowd Cheering</option>
          <option value="[Dog Bark]">Dog Bark</option>
          <option value="[Door Slam]">Door Slam</option>
          <option value="[Drum Roll]">Drum Roll</option>
          <option value="[Explosion]">Explosion</option>
          <option value="[Footsteps]">Footsteps</option>
          <option value="[Gunshot]">Gunshot</option>
          <option value="[Helicopter]">Helicopter</option>
          <option value="[Heartbeat]">Heartbeat</option>
          <option value="[Laughing]">Laughing</option>
          <option value="[Lightning]">Lightning</option>
          <option value="[Motorcycle Rev]">Motorcycle Rev</option>
          <option value="[Ocean Waves]">Ocean Waves</option>
          <option value="[Police Siren]">Police Siren</option>
          <option value="[Rain]">Rain</option>
          <option value="[Rooster Crow]">Rooster Crow</option>
          <option value="[Running Water]">Running Water</option>
          <option value="[Sheep Baa]">Sheep Baa</option>
          <option value="[Sneezing]">Sneezing</option>
          <option value="[Snoring]">Snoring</option>
          <option value="[Thunder]">Thunder</option>
          <option value="[Train Whistle]">Train Whistle</option>
          <option value="[Typewriter]">Typewriter</option>
          <option value="[Water Droplet]">Water Droplet</option>
          <option value="[Whale Song]">Whale Song</option>
          <option value="[Whispering]">Whispering</option>
          <option value="[Wind Blowing]">Wind Blowing</option>
          <option value="[Window Breaking]">Window Breaking</option>
          <option value="[Wolf Howl]">Wolf Howl</option>
          <option value="[Alarm Clock]">Alarm Clock</option>
          <option value="[Audience Laughter]">Audience Laughter</option>
          <option value="[Baby Crying]">Baby Crying</option>
          <option value="[Birdsong]">Birdsong</option>
          <option value="[Door Knock]">Door Knock</option>
          <option value="[Fire Crackling]">Fire Crackling</option>
      </select>
    </div>
  </div>
  <div id="editor"></div>
  <style id="medioCSS">.ql-editor {
    font-size: ${await engine.getSettings("lyrictextsize")};
    }
    .medioCommand {color: ${await engine.getSettings("commandcolor")}}</style>
</div>
</div>`;

      document.body.appendChild(overlay2);

      engine.turnOnQuill();
      engine.changeTab();

      const closeLyricBarn = document.getElementById("close-lyric-barn");
      closeLyricBarn.addEventListener("click", () => {
        overlay2.style.transform = "translateX(-100%)";
        document.body.style.overflow = "auto";
      });

      const findRhymes = document.getElementById("lyric-barn-findRhyme");
      findRhymes.addEventListener("click", () => {
        engine.checkRhymes();
      });

      const findRhymesClear = document.getElementById(
        "lyric-barn-findRhymeClear"
      );
      findRhymesClear.addEventListener("click", () => {
        document.getElementById("wordInput").value = "";
        document.getElementById("results").innerHTML = "";
        document.getElementById("results").style.display = "none";
        document.getElementById("medioRhymeExplainer").style.display = "block";
      });

      const wordInput = document.getElementById("wordInput");
      wordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          engine.checkRhymes();
        }
      });

      const saveLyrics = document.getElementById("save-lyrics");
      saveLyrics.addEventListener("click", () => {
        engine.save();
      });

      const clearLyrics = document.getElementById("clear-lyrics");
      clearLyrics.addEventListener("click", (e) => {
        if (e.target.classList.contains("confirmClear")) {
          document.getElementById("lyric-id").value = "";
          document.getElementById("lyric-title").value = "";
          engine.quill.root.innerHTML = "";
          engine.showNotification("Song lyrics cleared.");
          e.target.classList.remove("confirmClear");
        } else {
          e.target.classList.add("confirmClear");

          setTimeout(() => {
            e.target.classList.remove("confirmClear");
          }, 3000);
        }
      });

      const allPremadeQuestions = document.querySelectorAll(
        ".medioAskAIPremadeQuestion"
      );
      allPremadeQuestions.forEach((question) => {
        question.addEventListener("click", (e) => {
          const text = e.target.innerText;
          const askInput = document.getElementById("medioaskai");
          askInput.value = text;
        });
      });

      const medioaiSendMessage = document.getElementById("medioaiSendMessage");
      medioaiSendMessage.addEventListener("click", () => {
        sendAIMessage();
      });

      const medioaiSendMessageBox =
        document.getElementById("medioaiMessageBox");
      medioaiSendMessageBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          sendAIMessage();
        }
      });

      async function sendAIMessage() {
        const request = document.getElementById("medioaiMessageBox").value;
        const newMessage = document.createElement("div");
        newMessage.classList.add("medioaimessage");
        newMessage.classList.add("medioaiuser");
        newMessage.innerText = request;
        document.querySelector("#medioaichat").append(newMessage);

        const newMessage2 = document.createElement("div");
        newMessage2.classList.add("medioaimessage");
        newMessage2.classList.add("medioaiagent");
        newMessage2.classList.add("mediochatloading");
        newMessage2.innerHTML = `<div class='flex items-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><circle cx="16" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="12" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="8" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle></svg>
          <span class="opacity-50">Typing...</span>
        </div>`;
        document.querySelector("#medioaichat").append(newMessage2);

        document.querySelector("#medioaichat").scrollTop =
          document.querySelector("#medioaichat").scrollHeight;

        document.getElementById("medioaiMessageBox").value = "";

        const openaikey = await engine.getSettings("openaikey");
        await engine.askOpenAI(
          request,
          openaikey,
          true,
          document.querySelector("#medioaichat").getAttribute("data-id")
        );
      }

      const viewpastChats = document.getElementById("medioAskChatList");
      viewpastChats.addEventListener("click", async (e) => {
        document.querySelector("#medioask").style.display = "none";
        document.querySelector("#mediochats").style.display = "block";

        chrome.storage.local.get(["medioaiChats"], (result) => {
          const chats = result.medioaiChats || [];
          const chatList = document.getElementById("mediochats");

          const header = document.createElement("div");
          header.innerHTML = `<div class="flex items-center space-x-2 justify-between mb-2">
          <input id="medioSearchChatList type="text" placeholder="Search..." class="w-full rounded border p-1 px-2" />
          <div id="medioPagination" class="flex items-center" style="width: 400px">
            <button id="medioPrev" class="medioDisabled">Previous</button>
            <div data-current="1" data-max="${chats.length}" id="medioPageCount" class="w-full">
              Page 1 of ${chats.length}
            </div>
            <button id="medioNext">Next</button>
          </div>
        </div>`;

          chatList.innerHTML = "";
          chatList.append(header);
          const container = document.createElement("div");
          container.classList.add("medioListContainer");

          engine.chatHistory = chats;
          let currentPortion = chats.slice(0, engine.perPage);
          let totalPages = chats.length / engine.perPage;
          document.querySelector("#medioPageCount").innerText =
            "1 of " + totalPages + " Pages";
          document
            .querySelector("#medioPageCount")
            .setAttribute("data-max", totalPages);
          document
            .querySelector("#medioPageCount")
            .setAttribute("data-current", 1);

          currentPortion.reverse().forEach((chat) => {
            const newChat = document.createElement("div");
            newChat.setAttribute("data-id", chat.id);
            newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${
              chat.song_title
            }</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`;
            container.append(newChat);
          });

          chatList.append(container);

          const medioPrev = document.getElementById("medioPrev");
          medioPrev.addEventListener("click", async (e) => {
            const current =
              parseInt(
                document
                  .querySelector("#medioPageCount")
                  .getAttribute("data-current")
              ) - 1;

            if (current < 1) {
              document
                .querySelector("#medioPrev")
                .classList.add("medioDisabled");
              return;
            } else {
              document
                .querySelector("#medioPageCount")
                .setAttribute("data-current", current);
              const chats = engine.chatHistory;
              const currentPortion = chats.slice(
                current * engine.perPage - engine.perPage,
                current * engine.perPage
              );
              document
                .querySelector("#medioPrev")
                .classList.remove("medioDisabled");
              container.innerHTML = "";
              currentPortion.reverse().forEach((chat) => {
                const newChat = document.createElement("div");
                newChat.setAttribute("data-id", chat.id);
                newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${
                  chat.song_title
                }</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`;
                container.append(newChat);
              });

              document.querySelector("#medioPageCount").innerText =
                current + " of " + totalPages + " Pages";

              if (parseInt(current) === 1) {
                console.log("HEY", parseInt(current));
                document
                  .querySelector("#medioPrev")
                  .classList.add("medioDisabled");
              }
              if (parseInt(current) !== parseInt(totalPages)) {
                document
                  .querySelector("#medioNext")
                  .classList.remove("medioDisabled");
              }
            }
          });

          const medioNext = document.getElementById("medioNext");
          medioNext.addEventListener("click", async (e) => {
            const current =
              parseInt(
                document
                  .querySelector("#medioPageCount")
                  .getAttribute("data-current")
              ) + 1;
            const max = parseInt(
              document.querySelector("#medioPageCount").getAttribute("data-max")
            );

            if (current > max) {
              e.target.classList.add("medioDisabled");
              return;
            } else {
              if (current === max) {
                e.target.classList.add("medioDisabled");
              }
              document
                .querySelector("#medioPageCount")
                .setAttribute("data-current", current);
              const chats = engine.chatHistory;
              const currentPortion = chats.slice(
                (current - 1) * engine.perPage,
                (current - 1) * engine.perPage + engine.perPage
              );
              document
                .querySelector("#medioPrev")
                .classList.remove("medioDisabled");
              container.innerHTML = "";
              currentPortion.reverse().forEach((chat) => {
                const newChat = document.createElement("div");
                newChat.setAttribute("data-id", chat.id);
                newChat.innerHTML = `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400"><span>${new Date(
          chat.created_at
        ).toLocaleString()}</span> <span style="opacity: 0.5">${
                  chat.song_title
                }</span></p>
      </div>
      <button class="medioChatDelete" data-id="${
        chat.id
      }"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg></button>
    </div>`;
                container.append(newChat);
              });

              document.querySelector("#medioPageCount").innerText =
                current + " of " + totalPages + " Pages";
            }
          });

          const chatItemView = document.querySelectorAll(".medioChatItemView");
          chatItemView.forEach((item) => {
            item.addEventListener("click", async (e) => {
              const chatId = e.target.getAttribute("data-id");
              const chat = chats.find((item) => item.id === chatId);
              document.querySelector("#mediochattab").style.display = "block";
              document.querySelector("#mediochats").style.display = "none";
              document.querySelector("#medioaichat").innerHTML = "";
              document
                .querySelector("#medioaichat")
                .setAttribute("data-id", chat.id);
              chat.messages.forEach((message) => {
                const newMessage = document.createElement("div");
                newMessage.classList.add("medioaimessage");
                newMessage.classList.add(`medioai${message.role}`);
                newMessage.innerHTML = message.content;
                document.querySelector("#medioaichat").append(newMessage);
              });
            });
          });
        });
      });

      const askAIQuestion = document.getElementById("medioAskAIQuestion");
      askAIQuestion.addEventListener("click", async (e) => {
        const request = document.getElementById("medioaskai").value;

        if (!request) {
          engine.showNotification("Please enter a question.");
          return;
        } else {
          document.querySelectorAll(".lyric-tab").forEach((item) => {
            item.style.display = "none";
          });

          document.querySelector("#mediochattab").style.display = "block";
          document.querySelector("#medioaichat").innerHTML = ``;

          const newMessage = document.createElement("div");
          newMessage.classList.add("medioaimessage");
          newMessage.classList.add("medioaiuser");
          newMessage.innerText = request;
          document.querySelector("#medioaichat").append(newMessage);

          const newMessage2 = document.createElement("div");
          newMessage2.classList.add("medioaimessage");
          newMessage2.classList.add("medioaiagent");
          newMessage2.classList.add("mediochatloading");
          newMessage2.innerHTML = `<div class='flex items-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><circle cx="16" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="12" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle><circle cx="8" cy="10" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;1.75;0;0"/></circle></svg>
          <span class="opacity-50">Typing...</span>
        </div>`;
          document.querySelector("#medioaichat").append(newMessage2);

          const currentLyrics = engine.quill.root.innerHTML;
          const songTitle = document.getElementById("lyric-title").value || "";
          let includeLyrics = "";
          if (document.querySelector("#medioaiIncludeLyrics").checked) {
            includeLyrics = `----

        Here are the current song lyrics with title, "${songTitle}" for reference only:
        
        ${currentLyrics}`;
          }
          const system = `You are a song writing assistant. Your goal is to provide helpful feedback and requests given to your by the user. You have lyrics from the user as reference. Always provide your response as html code without code block just the raw HTML formatting your answer. Always provide a robust answer. Do not add your own classnames or IDs. NEVER respond with the full lyrics. Only provide your response to the request. You can ONLY use h1, h2, h3, ul, ol, and p tags only. If you are showing your changes to lyrics, wrap your changes in classname "medioai-highlightyellow". Do not respond with the just the lyrics. If you are not sure what to say ask.
            
        ${includeLyrics}`;

          const id = engine.uuidv4();
          document.querySelector("#medioaichat").setAttribute("data-id", id);

          chrome.storage.local.get(["medioaiChats"], async (result) => {
            const chats = result.medioaiChats || [];
            chats.push({
              id: id,
              created_at: new Date().toISOString(),
              song_id: document.getElementById("lyric-id").value,
              song_title: songTitle,
              name: request || "Untitled Chat",
              messages: [
                {
                  role: "system",
                  content: system,
                },
                {
                  role: "user",
                  content: request,
                },
              ],
            });

            chrome.storage.local.set({ medioaiChats: chats });

            const openaikey = await engine.getSettings("openaikey");
            await engine.askOpenAI(
              [
                {
                  role: "system",
                  content: system,
                },
                {
                  role: "user",
                  content: request,
                },
              ],
              openaikey,
              system,
              false,
              id
            );
          });
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const overlay = document.getElementById("lyric-barn-overlay");
          overlay.style.transform = "translateX(-100%)";
          document.body.style.overflow = "auto";

          const overlay2 = document.getElementById("lyric-tagbuilder-overlay");
          overlay2.style.transform = "translateX(-100%)";
        }

        if ((e.ctrlKey && e.key === "k") || (e.metaKey && e.key === "k")) {
          const overlay = document.getElementById("lyric-barn-overlay");
          overlay.style.transform = "translateX(0)";
          document.body.style.overflow = "hidden";
        }

        if ((e.ctrlKey && e.key === "j") || (e.metaKey && e.key === "j")) {
          const overlay = document.getElementById("lyric-tagbuilder-overlay");
          overlay.style.transform = "translateX(0)";
          document.body.style.overflow = "hidden";
        }
      });

      const lyricBarnLink = document.getElementById("lyric-barn-link");
      lyricBarnLink.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("Lyric Barn link clicked.");

        if (!document.getElementById("lyric-barn-overlay")) {
          document.body.style.overflow = "auto";
        } else {
          document.body.style.overflow = "hidden";
          const overlay = document.getElementById("lyric-barn-overlay");
          overlay.style.transform = "translateX(0)";
        }
      });
    }
  },

  perPage: 2,
  chatHistory: [],

  friesAreDone: () => {
    const target =
      "a.relative.flex.flex-row.items-center.justify-center.text-sm[href='/my-creations']";

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(async (mutation) => {
        const shouldPlaySound = await engine.getSettings("notification");
        if (
          shouldPlaySound === "on" &&
          !engine.state.isChecking &&
          mutation.target.innerText &&
          mutation.target.innerText.split("/")[0] ===
            mutation.target.innerText.split("/")[1]
        ) {
          engine.state.isChecking = true;
          const sound = await engine.getSettings("notificationsound");
          const audio = new Audio(chrome.runtime.getURL(`sounds/${sound}.mp3`));
          audio.play();

          setTimeout(() => {
            engine.state.isChecking = false;
          }, 6000);
        } else {
          engine.state.isChecking = false;
        }
      });
    });

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    const checkTargetNode = setInterval(() => {
      const targetNode = document.querySelector(target);
      if (targetNode) {
        observer.observe(targetNode, config);
        clearInterval(checkTargetNode);
        engine.state.isRunning = true;
        console.log("Autobots out, ready to roll.");
      }
    }, 1000);
  },

  askOpenAI: (messages, openaikey, system, isChat = false, id) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const bearer = "Bearer " + openaikey;

    if (isChat) {
      const chatWindow = document.querySelector("#medioaichat");
      const allMessages = Array.from(chatWindow.children);
      messages = [
        {
          role: "system",
          content: system,
        },
      ];

      allMessages.forEach((message) => {
        if (message.classList.contains("medioaiuser")) {
          messages.push({
            role: "user",
            content: message.innerText,
          });
        } else if (message.classList.contains("medioaiagent")) {
          messages.push({
            role: "assistant",
            content: message.innerText,
          });
        }
      });
    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector("#medioaichat .mediochatloading").remove();
        const newMessage = document.createElement("div");
        newMessage.classList.add("medioaimessage");
        newMessage.classList.add("medioaiagent");
        newMessage.innerHTML = data["choices"][0].message.content;
        document.querySelector("#medioaichat").append(newMessage);
        document.querySelector("#medioaichat").scrollTop =
          document.querySelector("#medioaichat").scrollHeight;

        chrome.storage.local.get(["medioaiChats"], function (result) {
          const chats = result.medioaiChats || [];
          const chatIndex = chats.findIndex((chat) => chat.id === id);

          if (chatIndex > -1) {
            chats[chatIndex].messages.push({
              role: "assistant",
              content: data["choices"][0].message.content,
            });
          }

          chrome.storage.local.set({ medioaiChats: chats });
        });
      })
      .catch((error) => {
        console.log("Something bad happened " + error);
      });
  },

  changeTab: () => {
    const tabButtons = document.querySelectorAll(".lyric-tab-button");

    tabButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const tab = e.target.dataset.tab;
        const tabs = document.querySelectorAll(".lyric-tab");
        document.getElementById("medioCharactersSelected").style.display =
          "none";

        tabButtons.forEach((button) => {
          button.setAttribute(
            "class",
            "lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
          );
        });

        e.target.setAttribute(
          "class",
          "lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black px-3"
        );

        tabs.forEach((tab) => {
          tab.style.display = "none";
        });

        const selectedTab = document.querySelector(
          `.lyric-tab[data-tab=${tab}]`
        );
        selectedTab.style.display = "block";

        document.querySelector("#mediochattab").style.display = "none";
        document.querySelector("#mediochats").style.display = "none";

        if (tab === "rhyme") {
          document.getElementById("wordInput").focus();
          document.getElementById("wordInput").select();
        } else if (tab === "ask") {
          const openaikey = await engine.getSettings("openaikey");

          if (openaikey) {
            document.querySelector("#medioapiExplainerask").style.display =
              "none";
            document.querySelector("#medioask").style.display = "block";
          } else {
            document.querySelector("#medioapiExplainerask").style.display =
              "block";
            document.querySelector("#medioask").style.display = "none";
          }
        } else if (tab === "wizard") {
          const openaikey = await engine.getSettings("openaikey");

          if (openaikey) {
            document.querySelector("#medioapiExplainerwizard").style.display =
              "none";
            document.querySelector("#mediowizard").style.display = "block";
          } else {
            document.querySelector("#medioapiExplainerwizard").style.display =
              "block";
            document.querySelector("#mediowizard").style.display = "none";
          }
        } else if (tab === "library") {
          chrome.storage.local.get(["medioLyrics"], function (result) {
            const medioLyrics = result.medioLyrics || [];
            const libraryItems = document.getElementById("medio-library-items");
            libraryItems.innerHTML = "";

            if (medioLyrics.length === 0) {
              libraryItems.setAttribute(
                "class",
                "text-center w-full p-4 text-gray-500"
              );
              libraryItems.innerHTML = `<h3 class='text-2xl text-gray-200 font-bold mb-2'>No Songs Found</h3> <p>Your songs will appear here to edit & manage at any time.</p>`;
              return;
            }

            medioLyrics.forEach((lyric) => {
              const lyricItem = document.createElement("a");
              lyricItem.href = "#";
              lyricItem.classList.add(
                "open-lyric",
                "border",
                "rounded-lg",
                "p-3",
                "text-lg",
                "font-bold",
                "relative"
              );
              lyricItem.setAttribute("data-id", lyric.id);
              lyricItem.innerHTML = `<h3 class="text-xl font-medium">${
                lyric.title
              }</h3> <p class="text-xs mt-1 text-gray-400">${
                lyric.created_at
                  ? engine.formatDate(lyric.created_at || Date.now())
                  : "8:20PM on June, 28th, 2024"
              }</p> <button class="deleteMediaSong absolute top-2 right-2 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"/></svg></button>`;
              lyricItem.addEventListener("click", () => {
                document.getElementById("lyric-id").value = lyric.id;
                document.getElementById("lyric-title").value = lyric.title;
                engine.quill.root.innerHTML = lyric.content;

                const firstTab = document.querySelector(".lyric-tab-button");
                firstTab.click();
                engine.showNotification(`Opened Song: "${lyric.title}"`);
              });

              libraryItems.appendChild(lyricItem);
            });

            const deleteButtons = document.querySelectorAll(".deleteMediaSong");
            deleteButtons.forEach((button) => {
              button.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = e.target
                  .closest(".open-lyric")
                  .getAttribute("data-id");

                if (e.target.classList.contains("confirmDelete")) {
                  e.target.closest(".open-lyric").remove();
                  e.target.classList.remove("confirmDelete");

                  chrome.storage.local.get(["medioLyrics"], function (result) {
                    const medioLyrics = result.medioLyrics || [];
                    const updatedLyrics = medioLyrics.filter(
                      (lyric) => lyric.id !== id
                    );

                    chrome.storage.local.set({ medioLyrics: updatedLyrics });

                    engine.showNotification("Deleted song from your library.");
                  });
                } else {
                  e.target.classList.add("confirmDelete");

                  setTimeout(() => {
                    e.target.classList.remove("confirmDelete");
                  }, 3000);
                }
              });
            });
          });
        }
      });
    });
  },

  formatDate: (date) => {
    date = new Date(date);
    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    };

    let formatter = new Intl.DateTimeFormat("en-US", options);
    let formattedParts = formatter.formatToParts(date);

    let month, day, year, time;
    for (let part of formattedParts) {
      switch (part.type) {
        case "month":
          month = part.value;
          break;
        case "day":
          day = part.value;
          break;
        case "year":
          year = part.value;
          break;
        case "hour":
        case "minute":
        case "dayPeriod":
          time =
            (time ? time : "") +
            part.value +
            (part.type === "dayPeriod" ? "" : ":");
          break;
      }
    }

    return `${time.trim()} on ${month} ${day}, ${year}`;
  },

  quill: null,

  turnOnQuill: () => {
    function insertText(quill, text) {
      const range = quill.getSelection();
      if (range) {
        const newText = `${text}\n`;
        quill.insertText(range.index, newText);
        quill.setSelection(range.index + newText.length);
      }
    }
    const Delta = Quill.import("delta");
    var CustomDropdown = function (quill, options) {
      let toolbar = quill.getModule("toolbar");
      toolbar.addHandler("custom-dropdown", function (value) {
        if (value) {
          insertText(quill, value);
        }
      });
    };

    Quill.register("modules/customDropdown", CustomDropdown);

    engine.quill = new Quill("#editor", {
      theme: "snow",
      placeholder: engine.randomStartingText(),
      modules: {
        toolbar: {
          container: "#toolbar",
          handlers: {
            "custom-dropdown": function (value) {
              insertText(this.quill, value);
            },
          },
        },
        customDropdown: true,
      },
    });

    function addCommandClass() {
      const editor = document.querySelector("#editor");
      const paragraphs = editor.querySelectorAll("p");
      paragraphs.forEach((p) => {
        if (/^\[.*\]$/.test(p.textContent.trim())) {
          p.classList.add("medioCommand");
        } else {
          p.classList.remove("medioCommand");
        }
      });
    }

    engine.quill.on("text-change", function () {
      addCommandClass();

      const el = document.getElementById("medioCharactersSelected");
      el.style.display = "none";

      setTimeout(() => {
        let editor = engine.quill.root;
        let codeBlocks = editor.querySelectorAll(".ql-code-block");

        codeBlocks.forEach((codeBlock) => {
          let text = codeBlock.textContent;
          let p = document.createElement("p");
          p.textContent = text;
          codeBlock.replaceWith(p);
        });
      }, 0);
    });

    engine.quill.on("selection-change", function (range, oldRange, source) {
      const el = document.getElementById("medioCharactersSelected");
      if (range) {
        if (el && range.length == 0) {
          el.style.display = "none";
        } else {
          const text = engine.quill.getText(range.index, range.length);
          const charCount = text.length;
          let className = "text-white font-bold";
          if (charCount > 350) {
            className = "text-red-500 font-bold";
          }
          el.style.display = "inline-block";
          el.innerHTML =
            "<strong class='" +
            className +
            "'>" +
            charCount +
            "</strong> characters selected. <em class='italic text-gray-500'>(Recommended: Less than 350 characters per section)</em>";
        }
      } else if (el) {
        el.style.display = "none";
      }
    });

    document
      .querySelector(".ql-custom-dropdown")
      .addEventListener("change", function () {
        let value = this.value;
        quill
          .getModule("toolbar")
          .handlers["custom-dropdown"].call(quill, value);
        this.value = "";
      });

    engine.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = [];

      delta.ops.forEach((op) => {
        if (op.insert && typeof op.insert === "string") {
          ops.push({
            insert: op.insert + "\n",
          });
        }
      });

      delta.ops = ops;

      let length = engine.quill.getLength();
      let range = { index: 0, length: length };
      if (range.length > 0) {
        engine.quill.removeFormat(range, Quill.sources.USER);
      }

      // Return the modified delta
      return delta;
    });
  },

  checkRhymes: async () => {
    const word = document.getElementById("wordInput").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";
    document.querySelector("#medioRhymeExplainer").style.display = "none";
    document.querySelector("#results").style.display = "grid";

    if (!word) {
      resultsDiv.innerHTML = "<p>Please enter a word to search for.</p>";

      return;
    }

    try {
      const response = await fetch(
        `https://api.datamuse.com/words?rel_rhy=${word}`
      );
      const data = await response.json();

      if (data.length === 0) {
        resultsDiv.innerHTML = `<p>No rhyming words found for "${word}".</p>`;
        return;
      }

      data.forEach((item) => {
        const listItem = document.createElement("div");
        listItem.setAttribute(
          "class",
          "rhymingWord border p-2 rounded-lg text-lg font-bold"
        );

        listItem.textContent = item.word;
        resultsDiv.appendChild(listItem);
      });

      const rhymingWords = document.querySelectorAll(".rhymingWord");

      rhymingWords.forEach((rhymingWord) => {
        rhymingWord.addEventListener("click", (e) => {
          const text = rhymingWord.textContent;
          e.target.textContent = "Copied!";
          navigator.clipboard.writeText(text);

          setTimeout(() => {
            e.target.textContent = text;
          }, 700);
        });
      });
    } catch (error) {
      resultsDiv.innerHTML = `<p>Error fetching rhyming words: ${error.message}</p>`;
    }
  },

  save: () => {
    const title = document.getElementById("lyric-title").value;
    const id = document.getElementById("lyric-id").value;

    if (!id) {
      const lyrics = {
        title: title || "Untitled",
        content: engine.quill.root.innerHTML,
        id: engine.uuidv4(),
        created_at: new Date().toISOString(),
      };

      chrome.storage.local.get(["medioLyrics"], function (result) {
        const medioLyrics = result.medioLyrics || [];
        medioLyrics.push(lyrics);
        document.getElementById("lyric-id").value = lyrics.id;
        chrome.storage.local.set({ medioLyrics }, function () {
          engine.showNotification("Added new song to your library.");
        });
      });
    } else {
      chrome.storage.local.get(["medioLyrics"], function (result) {
        const medioLyrics = result.medioLyrics || [];
        const lyrics = medioLyrics.find((lyric) => lyric.id === id);
        lyrics.title = title || "Untitled";
        lyrics.content = engine.quill.root.innerHTML;

        chrome.storage.local.set({ medioLyrics }, function () {
          engine.showNotification("Updated song lyrics.");
        });
      });
    }
  },

  uuidv4: () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  },

  randomStartingText: () => {
    return engine.placeholders[
      Math.floor(Math.random() * engine.placeholders.length)
    ];
  },

  showNotification: (msg) => {
    if (document.querySelector(".medioaiNotice")) {
      document.querySelector(".medioaiNotice").remove();
    }

    const notification = document.createElement("div");
    notification.setAttribute(
      "class",
      "medioaiNotice fixed top-2 right-2 p-4 bg-gray-400 border rounded text-gray-300 text-white text-center"
    );
    notification.setAttribute(
      "style",
      "z-index: 999999999999999999; background: #111; color: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.23); border: 1px solid #24CA8B;"
    );

    notification.innerHTML = `<p>${msg}</p>`;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  },

  placeholders: [
    "Compose an epic song here...",
    "Write a love song...",
    "Pen your next hit single...",
    "Create a catchy chorus...",
    "Start your ballad here...",
    "Write lyrics from the heart...",
    "Craft a song about summer...",
    "Compose a tune for rainy days...",
    "Write a song about adventure...",
    "Create a melody about friendship...",
    "Compose a song about dreams...",
    "Write a song about overcoming obstacles...",
    "Start your song about a journey...",
    "Create a love anthem...",
    "Pen a song about heartbreak...",
    "Compose a lullaby...",
    "Write an empowering song...",
    "Create a festive holiday song...",
    "Compose a song about nostalgia...",
    "Write lyrics about nature...",
    "Start your soulful tune here...",
    "Compose a song for a special occasion...",
    "Write a song inspired by the night sky...",
    "Create a dance track...",
    "Pen a song about new beginnings...",
    "Compose a tune about city life...",
    "Write a song about peace...",
    "Create a whimsical song...",
    "Compose a song about hope...",
    "Write a song about the ocean...",
  ],

  getSettings: (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["medioaiSettings"], function (result) {
        resolve(result.medioaiSettings[key]);
      });
    });
  },

  state: {
    isRunning: false,
    isChecking: false,
  },
};

window.onload = function () {
  engine.init();
};
