/**
 * Utils
 */

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const intersection = (arrA, arrB) => {
  return arrA.filter((item) => arrB.includes(item));
};

const addTextNode = (target, text) => {
  const node = document.createTextNode(text);
  target.appendChild(node);
};

const makeChildNode = (target, type, classNames) => {
  const node = document.createElement(type);
  target.appendChild(node);
  if (Array.isArray(classNames)) {
    classNames.forEach((cn) => {
      node.classList.add(cn);
    });
  } else if (typeof classNames === "string") {
    node.classList.add(classNames);
  }
  return node;
};

const toggleBetweenVisibility = (
  primaryClick,
  primaryTarget,
  secondaryClick,
  secondaryTarget
) => {
  primaryClick.addEventListener("click", () => {
    primaryTarget.classList.add("closed");
    secondaryTarget.classList.remove("closed");
  });
  secondaryClick.addEventListener("click", () => {
    primaryTarget.classList.remove("closed");
    secondaryTarget.classList.add("closed");
  });
};

/**
 * hardcoded list
 */

const cardList = {
  plurals: {
    Gardens: "Gardens",
    Smithies: "Smithy",
    Laboratories: "Laboratory",
    Libraries: "Library",
    Sentries: "Sentry",
    Witches: "Witch",
    Duchies: "Duchy",
    Ironworks: "Ironworks",
    Nobles: "Nobles",
    Embargoes: "Embargo",
    Smugglers: "Smugglers",
    Treasuries: "Treasury",
    Apothecaries: "Apothecary",
    Universities: "University",
    Quarries: "Quarry",
    Cities: "City",
    Goons: "Goons",
    Platina: "Platinum",
    Colonies: "Colony",
    "Horse Traders": "Horse Traders",
    "Young Witches": "Young Witch",
    "Horns of Plenty": "Horn of Plenty",
    "Hunting Parties": "Hunting Party",
    Fairgrounds: "Fairgrounds",
    "Bags of Gold": "Bag of Gold",
    Followers: "Followers",
    Princesses: "Princess",
    Crossroads: "Crossroads",
    Duchesses: "Duchess",
    "Jacks of All Trades": "Jack of All Trades",
    Embassies: "Embassy",
    "Ill-Gotten Gains": "Ill-Gotten Gains",
    Stables: "Stables",
    Amories: "Armory",
    Fortresses: "Fortress",
    Rats: "Rats",
    "Band of Misfits": "Band of Misfits",
    "Dame Mollies": "Dame Molly",
    "Sir Baileies": "Sir Bailey",
    "Sir Destries": "Sir Destry",
    Mercenaries: "Mercenary",
    Spoils: "Spoils",
    Necropolises: "Necropolis",
    "Coins of the Realm": "Coin of the Realm",
    Transmogrifies: "Transmogrify",
    "Distant Lands": "Distant Lands",
    "Haunted Woods": "Haunted Woods",
    "Lost Cities": "Lost City",
    Heroes: "Hero",
    Settlers: "Settlers",
    Enchantresses: "Enchantress",
    Rocks: "Rocks",
    Legionaries: "Legionary",
    Monasteries: "Monastery",
    Cemeteries: "Cemetery",
    "Dens of Sin": "Den of Sin",
    "Tragic Heroes": "Tragic Hero",
    Wishes: "Wish",
    "Zombie Spies": "Zombie Spy",
    Pouches: "Pouch",
    Lackeys: "Lackeys",
    Researches: "Research",
    "Old Witches": "Old Witch",
    Spices: "Spices",
    Supplies: "Supplies",
    Cavalries: "Cavalry",
    Hostelries: "Hostelry",
    Liveries: "Livery",
    Sanctuaries: "Sanctuary",
    Churches: "Church",
    Stashes: "Stash",
  },
};

/**
 * Helpers
 */

const findCardOwnership = (tracker, card) => {
  return Object.values(tracker).map((ownedCards) => ownedCards[card] ?? 0);
};

const makeTable = (target, tracker, cards) => {
  console.log(tracker);
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
  const table = makeChildNode(target, "table");
  const tableHead = makeChildNode(table, "thead");
  const tableHeadRow = makeChildNode(tableHead, "tr");
  makeChildNode(tableHeadRow, "th");

  Object.keys(tracker).forEach((player) => {
    const playerHeader = makeChildNode(tableHeadRow, "th", "player-name");
    addTextNode(playerHeader, player);
  });

  const tableBody = makeChildNode(table, "tbody");

  cards.forEach((_, card) => {
    const cardOwnership = findCardOwnership(tracker, card);
    if (cardOwnership.some((num) => num > 0)) {
      const tableBodyRow = makeChildNode(tableBody, "tr");
      const cardName = makeChildNode(tableBodyRow, "td", "card-title");
      addTextNode(cardName, card);
      cardOwnership.forEach((num) => {
        const tableData = makeChildNode(tableBodyRow, "td", "card-amount");
        addTextNode(tableData, num);
      });
    }
  });
};

const readLine = (line, tracker, shouldGainFromExile) => {
  if (line.includes("invests")) return;

  const startIndex = line.findIndex((w) => w === "starts");
  const gainsIndex = line.findIndex((w) => w === "gains");
  const exilesIndex = line.findIndex((w) => w === "exiles");
  const receivesIndex = line.findIndex((w) => w === "receives");
  const trashesIndex = line.findIndex((w) => w === "trashes");
  const returnsIndex = line.findIndex((w) => w === "returns");

  const relevantIndex = [
    startIndex,
    gainsIndex,
    exilesIndex,
    receivesIndex,
    trashesIndex,
    returnsIndex,
  ].find((index) => index !== -1);

  let cardDeclarationsStart = -1;
  let cardDeclarationsEnd = Infinity;
  let player;

  if (relevantIndex === undefined) return;
  player = line.slice(0, relevantIndex).join(" ");

  if (startIndex > -1) {
    cardDeclarationsStart = startIndex + 2;
  }

  if (gainsIndex > -1) {
    cardDeclarationsStart = gainsIndex + 1;
    const buysIndex = line.findIndex((w) => w === "buys");
    player = line
      .slice(0, Math.min(gainsIndex, buysIndex > -1 ? buysIndex : Infinity))
      .join(" ");
  }

  if (exilesIndex > -1) {
    cardDeclarationsStart = exilesIndex + 1;
  }

  if (receivesIndex > -1) {
    cardDeclarationsStart = receivesIndex + 1;
  }

  if (trashesIndex > -1) {
    cardDeclarationsStart = trashesIndex + 1;
  }

  if (returnsIndex > -1) {
    cardDeclarationsStart = returnsIndex + 1;
    cardDeclarationsEnd = line.includes("pile") ? line.length - 4 : Infinity;
  }

  tracker[player] ??= {};

  const cardDeclarations = line
    .slice(cardDeclarationsStart, cardDeclarationsEnd)
    .join(" ");
  const cardChangeList = cardDeclarations.split(/,\s|\sand\s/g);
  cardChangeList.map((cardDeclaration) => {
    const rawAmount = cardDeclaration.split(" ")[0];
    let amount = ["a", "an"].includes(rawAmount) ? 1 : Number(rawAmount);
    amount *=
      ["returns", "trashes"].filter((w) => line.includes(w)).length >= 1
        ? -1
        : 1;
    amount *= line.includes("exiles") && !shouldGainFromExile ? 0 : 1;
    const rawCardName = cardDeclaration.split(" ").slice(1).join(" ");
    const cardName =
      Math.abs(amount) > 1
        ? cardList.plurals[rawCardName] || rawCardName.slice(0, -1)
        : rawCardName;
    tracker[player][cardName] = (tracker[player][cardName] ?? 0) + amount;
  });
};
/**
 * Constants
 */

let tableContainer;
const cards = new Map();

/**
 * Listeners
 */

const documentObserver = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    const { type, target, addedNodes } = mutation;
    let tracker = {};

    if (type !== "childList") {
      continue;
    }

    const mutationsClasses = Array.from(addedNodes)[0]
      ?.attributes?.class?.nodeValue.split(" ")
      .filter((item) => !["", "\n"].includes(item));

    if (!mutationsClasses) continue;
    if (
      intersection(mutationsClasses, ["mini-card", "unselectable"]).length >= 2
    ) {
      target.querySelectorAll(".full-card-name.card-name").forEach((d) => {
        if (!cards.has()) cards.set(d.innerText.trim(), 0);
      });
    }
    if (
      intersection(mutationsClasses, ["full-card", "unselectable"]).length >= 2
    ) {
      target.querySelectorAll(".full-card-name.card-name").forEach((d) => {
        if (!cards.has()) cards.set(d.innerText.trim(), 0);
      });
    }
    if (mutationsClasses.includes("actual-log")) {
      document.querySelectorAll(".log-line > div").forEach((d, i, logs) => {
        const previousLine = logs[i - 1] && logs[i - 1].innerText;
        const shouldGainFromExile =
          previousLine &&
          (previousLine.includes("Camel Train") ||
            previousLine.includes("Way of the Camel") ||
            previousLine.includes("Way of the Worm") ||
            previousLine.includes("buys Transport") ||
            previousLine.includes("buys Invest") ||
            logs[i - 3]?.innerText.includes("Coven") ||
            logs[i - 2]?.innerText.includes("buys Enclave"));
        const line = d.innerText.slice(0, -1).split(" ");
        readLine(line, tracker, shouldGainFromExile);
      });
      if (tableContainer) {
        makeTable(tableContainer, tracker, cards);
      }
    }
    if (mutationsClasses.includes("game-page")) {
      const ddvContainer = makeChildNode(
        document.querySelector(".game-page"),
        "div",
        "ddv-container"
      );
      dragElement(ddvContainer);
      const floatingToggle = makeChildNode(
        ddvContainer,
        "div",
        "floating-toggle"
      );
      const extTitle = makeChildNode(floatingToggle, "span", "extension-title");
      addTextNode(extTitle, "DDV");
      const openPaletteContainer = makeChildNode(ddvContainer, "div", [
        "open-palette-container",
        "closed",
      ]);
      const closeButton = makeChildNode(
        openPaletteContainer,
        "button",
        "close-button"
      );
      addTextNode(closeButton, "×");
      tableContainer = makeChildNode(
        openPaletteContainer,
        "div",
        "table-container"
      );
      toggleBetweenVisibility(
        floatingToggle,
        floatingToggle,
        closeButton,
        openPaletteContainer
      );
      makeTable(tableContainer, tracker, cards);
    }
  }
});

documentObserver.observe(document, {
  attributes: true,
  childList: true,
  subtree: true,
});

// Later, you can stop observing
// documentObserver.disconnect();
