/**
 * starts with
 * buys and gains
 * gains
 * trashes
 * returns
 */

const cardList = {
  cards: {
    Cellar: {
      expansion: "Base",
      type: ["Action"],
      cost: 2,
    },
    Chapel: {
      expansion: "Base",
      type: ["Action"],
      cost: 2,
    },
    Moat: {
      expansion: "Base",
      type: ["Action", "Reaction"],
      cost: 2,
    },
    Harbinger: {
      expansion: "Base",
      type: ["Action"],
      cost: 3,
    },
    Merchant: {
      expansion: "Base",
      type: ["Action"],
      cost: 3,
    },
    Vassal: {
      expansion: "Base",
      type: ["Action"],
      cost: 3,
    },
    Village: {
      expansion: "Base",
      type: ["Action"],
      cost: 3,
    },
    Workshop: {
      expansion: "Base",
      type: ["Action"],
      cost: 3,
    },
    Bureaucrat: {
      expansion: "Base",
      type: ["Action", "Attack"],
      cost: 4,
    },
    Gardens: {
      expansion: "Base",
      type: ["Victory"],
      cost: 4,
    },
    Militia: {
      expansion: "Base",
      type: ["Action", "Attack"],
      cost: 4,
    },
    Moneylender: {
      expansion: "Base",
      type: ["Action"],
      cost: 4,
    },
    Poacher: {
      expansion: "Base",
      type: ["Action"],
      cost: 4,
    },
    Remodel: {
      expansion: "Base",
      type: ["Action"],
      cost: 4,
    },
    Smithy: {
      expansion: "Base",
      type: ["Action"],
      cost: 4,
    },
    "Throne Room": {
      expansion: "Base",
      type: ["Action"],
      cost: 4,
    },
    Bandit: {
      expansion: "Base",
      type: ["Action", "Attack"],
      cost: 5,
    },
    "Council Room": {
      expansion: "Base",
      type: ["Action"],
      cost: 5,
    },
    Festival: {
      expansion: "Base",
      type: ["Action"],
      cost: 5,
    },
    Laboratory: {
      expansion: "Base",
      type: ["Action"],
      cost: 5,
    },
    Library: {
      expansion: "Base",
      type: ["Action"],
      cost: 5,
    },
    Market: {
      expansion: "Base",
      type: ["Action"],
      cost: 5,
    },
    Mine: {
      expansion: "Base",
      type: ["Action"],
      cost: 5,
    },
    Sentry: {
      expansion: "Base",
      type: ["Action"],
      cost: 5,
    },
    Witch: {
      expansion: "Base",
      type: ["Action", "Attack"],
      cost: 5,
    },
    Artisan: {
      expansion: "Base",
      type: ["Action"],
      cost: 6,
    },
    Copper: {
      expansion: "Base",
      type: ["Treasure"],
      cost: 0,
    },
    Silver: {
      expansion: "Base",
      type: ["Treasure"],
      cost: 3,
    },
    Gold: {
      expansion: "Base",
      type: ["Treasure"],
      cost: 6,
    },
    Estate: {
      expansion: "Base",
      type: ["Victory"],
      cost: 2,
    },
    Duchy: {
      expansion: "Base",
      type: ["Victory"],
      cost: 5,
    },
    Province: {
      expansion: "Base",
      type: ["Victory"],
      cost: 8,
    },
    Curse: {
      expansion: "Base",
      type: ["Curse"],
      cost: 0,
    },
  },
  plurals: {
    Gardens: "Gardens",
    Smithies: "Smithy",
    Laboratories: "Laboratory",
    Libraries: "Library",
    Sentries: "Sentry",
    Witches: "Witch",
    Duchies: "Duchy",
  },
};

console.log(document.querySelector("div"));
console.log(document.readyState);

document.addEventListener(
  "click",
  (e) => {
    let cards = {};
    let tracker = {};
    document.querySelectorAll(".full-card-name.card-name").forEach((d) => {
      const cardName = d.innerText.trim();
      if (!/Boons/.test(cardName)) {
        cards[d.innerText.trim()] = 0;
      }
    });
    document.querySelectorAll(".log-line > div").forEach((d) => {
      const line = d.innerText.slice(0, -1).split(" ");
console.log(line)
      if (
        ["starts", "gains", "returns", "trashes"].filter((w) =>
          line.includes(w)
        ).length >= 1
      ) {
        console.log();
        const player = line[0];

        let cardAmountIndex = -1;
        let cardAmount = 0;

        if (line.includes("starts")) {
          cardAmountIndex = line.findIndex((w) => w === "starts") + 2;
          cardAmount = ["a", "an"].includes(line[cardAmountIndex])
          ? 1
          : Number(line[cardAmountIndex]);
        }

        if (line.includes("gains")) {
          cardAmountIndex = line.findIndex((w) => w === "gains") + 1;
          cardAmount = ["a", "an"].includes(line[cardAmountIndex])
          ? 1
          : Number(line[cardAmountIndex]);
        }

        if (line.includes("trashes")) {
          cardAmountIndex = line.findIndex((w) => w === "trashes") + 1;
          cardAmount = ["a", "an"].includes(line[cardAmountIndex])
          ? -1
          : Number(line[cardAmountIndex]);
        }

        if (line.includes("returns")) {
          cardAmountIndex = line.findIndex((w) => w === "returns") + 1;
          cardAmount = ["a", "an"].includes(line[cardAmountIndex])
          ? -1
          : Number(line[cardAmountIndex]);
        }

        const rawCardName = line.slice(cardAmountIndex + 1).join(" ");
        const cardName =
          Math.abs(cardAmount) > 1
            ? cardList.plurals[rawCardName] || rawCardName.slice(0, -1)
            : rawCardName;

        if (line.includes("starts") && !tracker[player]) {
          tracker[player] = { ...cards };
        }

        tracker[player][cardName] += cardAmount;
        console.log(cardAmountIndex, cardAmount, rawCardName, cardName);
      }
    });
    console.log(cards);
    console.table(tracker);
  },
  false
);
