const app = {
  init: function () {
    chrome.storage.local.get("medioaiSettings", function (data) {
      const settings = data.medioaiSettings;

      if (settings) {
        document.getElementById("notification").value = settings.notification;
        document.getElementById("notificationsound").value =
          settings.notificationsound;
        document.getElementById("slideanimation").value =
          settings.slideanimation;
        document.getElementById("lyrictextsize").value = settings.lyrictextsize;
        document.getElementById("commandcolor").value = settings.commandcolor;
        document.getElementById("aimodel").value = settings.aimodel;
        document.getElementById("openaikey").value = settings.openaikey;
        document.getElementById("claudeapikey").value = settings.claudeapikey;
      }
    });

    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", app.save);
  },

  save: function () {
    const medioaiSettings = {
      notification: document.getElementById("notification").value,
      notificationsound: document.getElementById("notificationsound").value,
      slideanimation: document.getElementById("slideanimation").value,
      commandcolor: document.getElementById("commandcolor").value,
      lyrictextsize: document.getElementById("lyrictextsize").value,
      aimodel: document.getElementById("aimodel").value,
      openaikey: document.getElementById("openaikey").value,
      claudeapikey: document.getElementById("claudeapikey").value,
    };

    chrome.storage.local.set({ medioaiSettings }, function () {
      console.log("app.save", medioaiSettings);
    });
  },
};

app.init();
