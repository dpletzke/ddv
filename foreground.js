/**
 * starts with
 * buys and gains
 * gains
 * trashes
 * exiles
 * tavern mat
 */

//  ["generated", "Turn", "shuffles", "gets", "plays", "draws"]

document.querySelector(".game-log").addEventListener(
  "DOMNodeInserted",
  (e) => {
    let cards = {};
    document.querySelectorAll(".full-card-name.card-name").forEach((d) => {
      const cardName = d.innerText.trim();
      if (!/Boons/.test(cardName)) {
        cards[d.innerText.trim()] = 0;
      }
    });
    const tracker = {};
    document.querySelectorAll(".log-line > div").forEach((d) => {
      const line = d.innerText.slice(0, -1).split(" ");

      //starts with a Pasture
      //starts with 3 Estates
      //gains a Pasture
      //gains 3 Pastures
      //gains a Council Room
      //gains 3 Council Rooms

      if (["starts", "gains"].filter((w) => line.includes(w)).length >= 1) {
        const player = line[0];
        const cardAmountIndex = line.includes("starts")
          ? line.findIndex((w) => w === "starts") + 2
          : line.findIndex((w) => w === "gains") + 1;
        const cardAmount = ["a", "an"].includes(line[cardAmountIndex])
          ? 1
          : Number(line[cardAmountIndex]);
        const cardName = line.slice(cardAmountIndex + 1).join(" ");

        // removes if more than one card gained
        if (cardAmount > 1) {
          cardName[cardName.length - 1] = cardName[cardName.length - 1].slice(
            0,
            -1
          );
        }

        const penultimateWord = line[line.length - 2];
        const lastWord = ["a", "an"].includes(penultimateWord)
          ? line[line.length - 1]
          : line[line.length - 1].slice(0, -1);
        if (line.includes("starts") && !tracker[line[0]]) {
          tracker[line[0]] = { ...cards };
        }

        if (line.includes("starts")) {
          tracker[line[0]][lastWord] += ["a", "an"].includes(penultimateWord)
            ? 1
            : Number(penultimateWord);
        }

        if (line.includes("gains")) {
          tracker[line[0]][lastWord] += ["a", "an"].includes(penultimateWord)
            ? 1
            : Number(penultimateWord);
        }
      }
    });
    console.log(tracker);
  },
  false
);

// if(document.querySelector('.lnXdpd')) {
// }

// const first = document.createElement('button');
// first.innerText = "SET DATA";
// first.id = "first";

// const second = document.createElement('button');
// second.innerText = "SHOUTOUT TO BACKEND";
// second.id = "second";

// document.querySelector('body').appendChild(first);
// document.querySelector('body').appendChild(second);

// first.addEventListener('click', () => {
//     chrome.storage.local.set({ "password": "123" });
//     console.log("I SET DATA");
// });

// second.addEventListener('click', () => {
//     chrome.runtime.sendMessage({message: 'yo check the storage'});
//     console.log('I SENT THE MESSAGE')
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log(request.message)
// });
