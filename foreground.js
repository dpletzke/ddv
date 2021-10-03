/**
 * starts with
 * buys and gains
 * gains
 * trashes
 * returns
 */

//  ["generated", "Turn", "shuffles", "gets", "plays", "draws"]

document.querySelector(".game-log").addEventListener(
  "DOMNodeInserted",
  (e) => {
    let cards = {};
    const cardList = require("./cardList.json");
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
      //returns
      //trashes

      if (["starts", "gains"].filter((w) => line.includes(w)).length >= 1) {
        const player = line[0];
        const cardAmountIndex = line.includes("starts")
          ? line.findIndex((w) => w === "starts") + 2
          : line.findIndex((w) => w === "gains") + 1;
        const cardAmount = ["a", "an"].includes(line[cardAmountIndex])
          ? 1
          : Number(line[cardAmountIndex]);
        const rawCardName = line.slice(cardAmountIndex + 1).join(" ");
        const cardName =
          cardAmount > 1
            ? cardList.plurals[rawCardName] || rawCardName.slice(0, -1)
            : rawCardName;

        if (line.includes("starts") && !tracker[player]) {
          tracker[player] = { ...cards };
        }

        tracker[player][cardName] += cardAmount;
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
