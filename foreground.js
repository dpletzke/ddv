/**
 * starts with
 * buys and gains
 * gains
 * trashes
 * exiles
 * tavern mat
 */

// const createCardList = () => {

// };
// createCardList();

// document.querySelectorAll(".log-line > div").forEach((d) => {
//   console.log(d.innerText.split(" "));
// });

document.querySelector(".game-log").addEventListener(
  "DOMNodeInserted",
  function (e) {
    let cards = [];
    document
      .querySelectorAll(".full-card-name.card-name.unselectable")
      .forEach((d) => {
        cards.push(d.innerText.trim());
      });

    document.querySelectorAll(".log-line > div").forEach((d) => {
      d.innerText.split(" ").forEach(w => {
          
      });
    });
  },
  false
);

// document.addEventListener("DOMContentLoaded", function () {
//   console.log(document.querySelector(".lnXdpd"));
// });
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
