const engine = {
  init: () => {
    console.log("Me-Dio, a sous chef for Udio.com");
    engine.friesAreDone();
  },

  friesAreDone: () => {
    const target =
      "a.relative.flex.flex-row.items-center.justify-center.text-sm[href='/my-creations']";

    console.log("Sir, the fries are in oven. Please let the DJ cook.");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(
          "HAL observing Udio numbers:",
          mutation.target.innerText || "not found"
        );

        if (
          !engine.state.isChecking &&
          mutation.target.innerText &&
          mutation.target.innerText.split("/")[0] ===
            mutation.target.innerText.split("/")[1]
        ) {
          engine.state.isChecking = true;
          let audio = new Audio(chrome.runtime.getURL("ding.mp3"));
          audio.play();

          if (Notification.permission === "granted") {
            let notification = new Notification("Fries are done!");
          } else if (
            Notification.permission !== "denied" ||
            Notification.permission === "default"
          ) {
            Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                let notification = new Notification("Fries are done!");
              }
            });
          }

          console.log("Target aquired. Ding! Ding! Ding!");
          console.log("Overheating, waiting 6 seconds...");

          setTimeout(() => {
            engine.state.isChecking = false;
            console.log("Battle tank is ready to roll.");
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

  state: {
    isRunning: false,
    isChecking: false,
  },
};

setTimeout(() => {
  engine.init();
}, 5000);
