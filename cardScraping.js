let tracker = {};
document.querySelectorAll("tbody > tr").forEach((row) => {
  const cardName = row.querySelector("td:first-child > span > a > span");
  const expansion = row.querySelector("td:nth-child(2) > a");
  const type = row.querySelector("td:nth-child(3)");
  const cost = row.querySelector("td:nth-child(4) > span:first-child > img");
  // console.log(cost && cost.attributes[0].value[1]);
  // debt && console.log("debt", debt.attributes[0].value);
  // potion && console.log("potion", potion.attributes[0].value);
  if (cardName) {
    tracker[cardName.innerHTML] = {
      expansion: expansion && expansion.innerHTML,
      type: type && type.innerHTML.trim().split(" - "),
      cost: cost && Number(cost.attributes[0].value[1]) || 0
    };
  }
});
