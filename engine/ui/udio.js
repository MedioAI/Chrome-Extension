/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const uiMedioAI = {
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

  tagBuilder: /* html */ `
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
  "
>
  &times;
</button>
<div id="lyric-barn-content">
  <input type="hidden" id="mediotag-id" />

  <h1
    class="flex items-center space-x-2"
    style="font-size: 24px; font-weight: 700; margin-bottom: 16px"
  >
    <img src="${chrome.runtime.getURL('icon/128x128.png')}" style="width:
    48px; height: 48px; border-radius: 6px; margin-right: 8px" />
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

  <div class="lyric-buildertab" data-tab="build">
    <div class="mb-4 relative">
      <span class="text-sm text-gray-200 mb-2 block">Search & Browse</span>
      <div
        id="medioSearchClear"
        class="absolute"
        style="top: 40px; right: 13px"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="m29.772 26.433l-7.126-7.126a10.43 10.43 0 0 0 1.524-5.42c0-5.794-4.692-10.486-10.482-10.488c-5.79 0-10.484 4.693-10.484 10.485c0 5.79 4.693 10.48 10.484 10.48c1.987 0 3.84-.562 5.422-1.522l7.128 7.127l3.534-3.537zM7.202 13.885a6.496 6.496 0 0 1 6.485-6.486a6.493 6.493 0 0 1 6.484 6.485a6.494 6.494 0 0 1-6.483 6.484a6.496 6.496 0 0 1-6.484-6.485z"
          />
        </svg>
      </div>
      <input
        type="text"
        id="searchTags"
        placeholder="Search for tags..."
        class="w-full border rounded p-2 px-3"
      />
      <div
        id="medioSearchDropdown"
        class="w-full bg-black mt-2 absolute p-4 rounded shadow-xl border flex flex-x-2 flex-y-2 items-start"
        style="display: none"
      >
        <p class="text-xs text-gray-400">Search results will appear here...</p>
      </div>
    </div>
    <div class="flex space-x-4">
      <div class="w-1/4">
        <select
          id="medio-builder-genre"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-artist"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-emotion"
          class="medioAddTag w-full border rounded p-1"
        >
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
        <select
          id="medio-builder-period"
          class="medioAddTag w-full border rounded p-1"
        >
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
        <select
          id="medio-builder-region"
          class="medioAddTag w-full border rounded p-1"
        >
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
        <select
          id="medio-builder-vocal"
          class="medioAddTag w-full border rounded p-1"
        >
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
        <select
          id="medio-builder-instruments"
          class="medioAddTag w-full border rounded p-1"
        >
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
        <select
          id="medio-builder-production"
          class="medioAddTag w-full border rounded p-1"
        >
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

      <textarea
        placeholder="Write music prompt tags here..."
        class="w-full p-6 rounded border mb-3"
        id="medioTagBox"
        style="height: 180px"
      ></textarea>

      <hr class="mt-2 mb-6 border-t border-gray-700" />

      <div class="flex justify-between space-x-4">
        <input
          id="medioTagBoxTitle"
          autocomplete="off"
          type="text"
          placeholder="Give your tag group a name..."
          class="w-full p-2 px-4 rounded border mb-3"
          style="width: 100%"
        />
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
`,

  songStudio: async () => {
    const logo = chrome.runtime.getURL('icon/128x128.png')
    return /* html */ `
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
    border-radius: 100%;
    padding: 6px 12px;
  "
>
  &times;
</button>

<div id="lyric-barn-content">
  <input type="hidden" id="lyric-id" />

  <h1
    class="flex items-center space-x-2"
    style="font-size: 24px; font-weight: 700; margin-bottom: 16px"
  >
    <img src="${logo}" style="width:
    48px; height: 48px; border-radius: 6px; margin-right: 8px" />
    <span class="font-bold">Song Studio</span>
    <span
      id="medioCharactersSelected"
      style="display: none"
      class="text-sm text-gray-300 flex-1 whitespace-nowrap font-medium"
      >0 Characters Selected</span
    >
  </h1>

  <div
    role="tablist"
    aria-orientation="horizontal"
    class="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full mb-4"
    style="grid-template-columns: repeat(5, minmax(0, 1fr))"
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
      <textarea
        id="medioaiMessageBox"
        placeholder="Write message..."
        class="w-full"
      ></textarea>
      <button id="medioaiSendMessage">Send</button>
    </div>
  </div>

  <div style="display: none" id="mediochats"></div>

  <div style="display: none" class="lyric-tab" data-tab="ask">
    <div id="medioask" style="display: none">
      <textarea
        name="medioaskai"
        id="medioaskai"
        placeholder="What do you want to ask?"
      ></textarea>
      <div class="flex space-x-2 items-center justify-between mt-2">
        <div class="flex space-x-2">
          <button id="medioAskAIQuestion" class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="m14.5.5l.46.197a.5.5 0 0 0-.657-.657zm-14 6l-.197-.46a.5.5 0 0 0-.06.889zm8 8l-.429.257a.5.5 0 0 0 .889-.06zM14.303.04l-14 6l.394.92l14-6zM.243 6.93l5 3l.514-.858l-5-3zM5.07 9.757l3 5l.858-.514l-3-5zm3.889 4.94l6-14l-.92-.394l-6 14zM14.146.147l-9 9l.708.707l9-9z"
              />
            </svg>
            <span>Ask</span>
          </button>

          <button id="medioAskChatList" class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <g fill="currentColor">
                <path
                  d="M224 96v128l-39.58-32H88a8 8 0 0 1-8-8v-40h88a8 8 0 0 0 8-8V88h40a8 8 0 0 1 8 8"
                  opacity="0.2"
                />
                <path
                  d="M216 80h-32V48a16 16 0 0 0-16-16H40a16 16 0 0 0-16 16v128a8 8 0 0 0 13 6.22L72 154v30a16 16 0 0 0 16 16h93.59L219 230.22a8 8 0 0 0 5 1.78a8 8 0 0 0 8-8V96a16 16 0 0 0-16-16M66.55 137.78L40 159.25V48h128v88H71.58a8 8 0 0 0-5.03 1.78M216 207.25l-26.55-21.47a8 8 0 0 0-5-1.78H88v-32h80a16 16 0 0 0 16-16V96h32Z"
                />
              </g>
            </svg>
            <span>Past Chats</span>
          </button>
        </div>
        <div class="ml-2 text-sm text-gray-400 flex space-x-2 items-center">
          <input
            id="medioaiIncludeLyrics"
            name="medioaiIncludeLyrics"
            type="checkbox"
            checked
          />
          <label for="medioaiIncludeLyrics"
            >Include current song lyrics in the request.</label
          >
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
          Can you suggest synonyms or alternative phrases for specific words in
          my lyrics?
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
          What poetic devices can I incorporate to enhance my lyrics (e.g.,
          metaphors, similes, imagery)?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my lyrics more relatable to a wider audience?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any inconsistencies or contradictions in my lyrics that need
          to be addressed?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to improve the flow or rhythm of my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create stronger hooks or memorable phrases in my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any cultural references in my lyrics that might not be
          universally understood?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me fine-tune the storytelling aspect of my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What can I do to make my lyrics more vivid and descriptive?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any lines or verses in my lyrics that feel out of place or
          unnecessary?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you provide feedback on the overall structure of my song lyrics
          (e.g., verse-chorus-bridge)?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I maintain coherence and unity throughout my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make my lyrics more engaging or
          thought-provoking?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for wordplay or clever turns of phrase in
          my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me strike a balance between being too literal and too
          abstract in my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I ensure that my lyrics complement the melody and musical
          arrangement effectively?
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
          Can you suggest ways to build tension and release in the song
          structure?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a memorable pre-chorus section in my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for vocal harmonies in my song lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me establish a consistent narrative arc throughout the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What role can repetition play in reinforcing key themes or ideas in my
          lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use contrast between sections (e.g., verse and
          chorus) in my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to transition smoothly between different song
          sections?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a powerful climax in my song lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for call-and-response elements in my
          lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate dynamic shifts in the song
          structure?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use pauses or silence for dramatic effect in the
          song?
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
          What considerations should I keep in mind when crafting a bridge
          section?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song structure more dynamic and
          engaging?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create contrast between verses to keep the listener engaged?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What elements can I add to create a sense of progression throughout
          the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a compelling outro for my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use tempo changes to enhance the emotional impact of the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What techniques can I use to make the song lyrics more memorable?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to create a sense of urgency or excitement in the
          song structure?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use modulation to add interest to the song's
          progression?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What role can dynamics play in shaping the overall feel of the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me create a memorable refrain for my song lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use parallelism to reinforce key themes or ideas in my
          lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me turn my heartbreak into a catchy disco anthem?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about laundry detergent more exciting?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest a way to incorporate a kazoo solo into my song about
          office supplies?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about procrastination sound urgent and
          important (but still procrastinate on finishing it)?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a love song to my favorite snack food?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I turn my mundane daily routine into an epic rock opera?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make my song about aliens invading Earth more
          relatable to extraterrestrials?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I incorporate the sound of rubber chickens into my song about
          existential dread?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a breakup song from the perspective of a
          houseplant?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about being stuck in traffic more upbeat and
          danceable?
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
          Can you suggest ways to build tension and excitement throughout the
          song?
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
          Can you help me write a bridge section that provides contrast to the
          rest of the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the song more interactive or engaging for live
          performances?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest an attention-grabbing intro for my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a smooth transition from the intro to the first
          verse?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a memorable outro that leaves a lasting
          impression?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the outro feel like a satisfying conclusion to the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest sound effects to enhance the mood of specific song
          sections, like a [Wolf Howl] for added atmosphere?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I integrate sound effects seamlessly into my song without
          overpowering the music?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me brainstorm creative sound effect ideas to elevate my
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use sound effects to create a sense of narrative or
          storytelling in my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate natural sounds, like birds
          chirping or waves crashing, into my song for added texture?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the use of sound effects feel organic and integral to
          the overall musical experience?
        </div>
      </div>
    </div>
    <div
      id="medioapiExplainerask"
      class="text-center w-full"
      style="display: none"
    >
      <h3 class="text-2xl text-gray-200 font-bold mb-2 mt-8">Unavailable</h3>
      <p>
        You must add your
        <span style="background: #27272a" class="rounded p-2 text-xs"
          >OpenAI</span
        >
        API key in order to use this feature.
      </p>
      <hr class="my-6 border-t border-gray-700" />
      <p>Ask the AI for quick tasks or questions around your lyrics.</p>
    </div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="wizard">
    <div id="mediowizard" style="display: none">wizard here</div>
    <div
      id="medioapiExplainerwizard"
      class="text-center w-full"
      style="display: none"
    >
      <h3 class="text-2xl text-gray-200 font-bold mb-2 mt-8">Unavailable</h3>
      <p>
        You must add your
        <span style="background: #27272a" class="rounded p-2 text-xs"
          >OpenAI</span
        >
        API key in order to use this feature.
      </p>
      <hr class="my-6 border-t border-gray-700" />
      <p>
        Use the <strong>Co-Writer</strong> to craft your lyrics from scratch
        with the help of an AI.
      </p>
    </div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="rhyme">
    <div class="flex items-center justitfy-between mb-4">
      <input
        autocomplete="off"
        type="text"
        id="wordInput"
        placeholder="Enter a word to find rhymes..."
      />
      <button id="lyric-barn-findRhymeClear">Clear</button>
      <button id="lyric-barn-findRhyme">Find Rhymes</button>
    </div>
    <div
      id="results"
      class="w-full grid grid-cols-4 gap-2"
      style="display: none"
    ></div>
    <div id="medioRhymeExplainer" class="text-center w-full">
      <h3 class="text-2xl text-gray-200 font-bold mb-2 mt-8">
        Search for Rhymes
      </h3>
      <p>
        Search the
        <span style="background: #27272a" class="rounded p-2 text-xs"
          >Datamuse</span
        >
        free API for any word that might rhyme for catchier lyrics.
      </p>
    </div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="library">
    <div id="medio-library-items" class="grid grid-cols-3 gap-4"></div>
  </div>

  <div class="lyric-tab" data-tab="write">
    <div id="toolbar" class="flex items-center justify-between">
      <div class="flex space-x-2">
        <input
          autocomplete="off"
          type="text"
          id="lyric-title"
          placeholder="Song Title..."
        />
        <button
          id="save-lyrics"
          class="flex items-center space-x-2 medio-toolbar-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2m10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"
            />
          </svg>
          <span>Save</span>
        </button>
        <button
          id="clear-lyrics"
          class="flex items-center space-x-2 medio-toolbar-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 56 56"
          >
            <path
              fill="currentColor"
              d="M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265m.07-3.773c-2.343 0-3.656-1.242-3.656-3.68V13.88c0-2.438 1.313-3.68 3.656-3.68h28.313c2.32 0 3.633 1.242 3.633 3.68v28.24c0 2.438-1.313 3.68-3.633 3.68Zm4.336-9.867a1.86 1.86 0 0 0 1.852 1.875c.515 0 .984-.188 1.312-.54l6.633-6.656l6.656 6.657c.329.328.774.539 1.29.539a1.88 1.88 0 0 0 1.875-1.875c0-.54-.211-.961-.563-1.313l-6.61-6.633l6.634-6.656c.374-.375.562-.797.562-1.289c0-1.031-.82-1.875-1.875-1.875c-.469 0-.867.188-1.242.563l-6.727 6.68l-6.68-6.657c-.351-.328-.75-.54-1.265-.54a1.856 1.856 0 0 0-1.852 1.852c0 .493.211.938.54 1.29l6.632 6.632l-6.633 6.657c-.328.351-.539.773-.539 1.289"
            />
          </svg>
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
          <option
            value="[Quatrain 1]\n\n[Quatrain 2]\n\n[Quatrain 3]\n\n[Couplet]"
          >
            Sonnet
          </option>
          <option
            value="[Verse]\n\n[Chorus]\n\n[Verse]\n\n[Chorus]\n\n[Bridge]\n\n[Chorus]"
          >
            Ballad
          </option>
          <option value="[Line 1]\n\n[Line 2]\n\n[Line 3]">Haiku</option>
          <option
            value="[Line 1]\n\n[Line 2]\n\n[Line 3]\n\n[Line 4]\n\n[Line 5]"
          >
            Limerick
          </option>
          <option value="[A-line]\n\n[A-line]\n\n[B-line]">Blues</option>
          <option value="[Stanza 1]\n\n[Stanza 2]">Quatrain</option>
          <option value="[Strophe]\n\n[Antistrophe]\n\n[Epode]">Ode</option>
          <option
            value="[Stanza 1]\n\n[Stanza 2]\n\n[Stanza 3]\n\n[Stanza 4]\n\n[Stanza 5]\n\n[Stanza 6]\n\n[Envoi]"
          >
            Sestina
          </option>
          <option
            value="[Tercet 1]\n\n[Tercet 2]\n\n[Tercet 3]\n\n[Tercet 4]\n\n[Final Line]"
          >
            Terza Rima
          </option>
          <option
            value="[Section 1]\n\n[Section 2]\n\n[Section 3]\n\n[Section 4]"
          >
            Free Verse
          </option>
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
          <option value="[Appalachian Dulcimer Solo]">
            Appalachian Dulcimer
          </option>
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
          <option value="[Sopranino Saxophone Solo]">
            Sopranino Saxophone
          </option>
          <option value="[Cimbasso Solo]">Cimbasso</option>
          <option value="[Alto Clarinet Solo]">Alto Clarinet</option>
          <option value="[Bass Flute Solo]">Bass Flute</option>
          <option value="[Contrabass Clarinet Solo]">
            Contrabass Clarinet
          </option>
          <option value="[Contrabass Flute Solo]">Contrabass Flute</option>
          <option value="[Subcontrabass Flute Solo]">
            Subcontrabass Flute
          </option>
          <option value="[Contrabass Saxophone Solo]">
            Contrabass Saxophone
          </option>
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
          <option value="Lyrics by [Your Name] © 2024">
            Copyright Stamp 1
          </option>
          <option value="© 2024 [Your Name]">Copyright Stamp 2</option>
          <option value="[Your Name] - All rights reserved, 2024">
            Copyright Stamp 3
          </option>
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
    <style id="medioCSS">
      .ql-editor {
          font-size: ${await utilitiesMedioAI.getSettings('lyrictextsize')};
          }
          .medioCommand {color: ${await utilitiesMedioAI.getSettings('commandcolor')}}
    </style>
  </div>
</div>
`
  },

  placeholder: (title, msg) => {
    return /* html */ `
<h3 class='text-2xl text-gray-200 font-bold mb-2'>${title}</h3>
<p>${msg}</p>
`
  },
}
