console.log("🥜 go nuts")
// SECTION global variables

let almonds = 0

let farm = {
  //harvestAlmonds()
  harvestRate: 100,
  // autoHarvest()
  shippingRate: 0,

  seasonHarvest: 0,
}

let clickUpgrades = [
  {
    name: 'tractors',
    emoji: '🚜',
    price: 40,
    quantity: 0,
    multiplier: 1.1
  },
  {
    name: 'trucks',
    emoji: '🚛',
    price: 25,
    quantity: 0,
    multiplier: 1.5
  }
];

let automaticUpgrades = [
  {
    name: 'bees',
    emoji: '🐝',
    price: 50,
    quantity: 0,
    multiplier: 1.25
  },
  {
    name: 'trees',
    emoji: '🌳',
    price: 75,
    quantity: 0,
    multiplier: 2
  }
];

updateStats()

// SECTION start game and interval

let harvestInterval
function startGame() {
  document.getElementById('start-card').classList.add('d-none')
  // if (!harvestInterval) {
  harvestInterval = setInterval(autoHarvest, 3000)
  // }
}

function autoHarvest() {
  almonds += farm.shippingRate;
  console.log(farm);

  updateStats()
}
// SECTION player action
function harvestAlmonds() {
  almonds += farm.harvestRate
  farm.seasonHarvest += farm.harvestRate
  updateStats()
}

// SECTION modifiers

function purchaseUpgradePerClick(resource) {
  // trucks and tractors
  let clickUpgrade = clickUpgrades.find(upgrade => upgrade.name == resource)
  // console.log("upgrade: ", resource)

  if (almonds > clickUpgrade.price) {
    clickUpgrade.quantity += 1,
      almonds -= clickUpgrade.price,
      (clickUpgrade.price += (clickUpgrade.multiplier * clickUpgrade.price)).toFixed(0),
      (farm.harvestRate += (3 * clickUpgrade.quantity)).toFixed(0)
  } else {
    console.log("didn't upgrade ", resource)
  }

  // document.getElementById(`draw-${clickUpgrade.name}`).innerHTML = `<h2>${clickUpgrade.quantity}</h2>`
  // document.getElementById(`buy-${clickUpgrade.name}-btn`).innerHTML = `${clickUpgrade.emoji} ${(clickUpgrade.price).toFixed(0)}`
  updateResources(clickUpgrade)
  updateStats()
}

function plantTrees() {
  let orchardElem = document.getElementById('orchard')
  orchardElem.innerHTML += `<p>🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳</p>`
  // let orchardElem = document.getElementById('orchard')
  // orchardElem.innerText += '🌳🌳🌳🌳' //this needs to wrap based on the height of the space
}

function purchaseUpgradePerInt(resource) {
  // bees and trees
  let intUpgrade = automaticUpgrades.find(upgrade => upgrade.name == resource)
  // console.log("upgrade: ", resource)

  if (almonds > intUpgrade.price) {
    almonds -= intUpgrade.price,
      intUpgrade.quantity += 1,
      (intUpgrade.price += (.1 * intUpgrade.price)).toFixed(0),
      (farm.shippingRate += (intUpgrade.multiplier * intUpgrade.quantity)).toFixed(0)
  } else {
    console.log("didn't upgrade ", resource)
  }

  if (intUpgrade.name == 'trees') {
    plantTrees()
  }
  // document.getElementById(`draw-${intUpgrade.name}`).innerHTML = `<h2>${intUpgrade.quantity}</h2>`
  // document.getElementById(`buy-${intUpgrade.name}-btn`).innerHTML = `+ ${intUpgrade.emoji} ${(intUpgrade.price).toFixed(0)}`
  updateResources(intUpgrade)
  updateStats()
}



// function toggleButtons(){
//   console.log("check buttons 1");
// if(almonds >)
// }





// SECTION diplay

// >>>>updates upgrades-available and upgrades-purchased
function updateResources(resource) {
  // buy buttons
  document.getElementById(`buy-${resource.name}-btn`).innerHTML = `${resource.emoji} ${(resource.price).toFixed(0)}`

  // upgrade dashboard - upgrades-purchased
  document.getElementById(`draw-${resource.name}`).innerHTML = `<h2><span class="fs-6">${resource.emoji}</span> ${resource.quantity}</h2>`
}

// >>>>updates top dashboard
function updateStats() {

  document.getElementById('season').innerHTML = `<span class="fs-6">Season Total:</span><br><h5>${farm.seasonHarvest}</h5>`

  document.getElementById('harvest-rate').innerHTML = `<span class='fs-6'>Harvest Rate(manual):</span><br><h2>${(farm.harvestRate).toFixed(0)}<span class='fs-6'> /click</h2>`

  document.getElementById('almondsSupply').innerHTML = `<span class='fs-6'>Almonds Harvested:</span><h2>${(almonds).toFixed(0)}</h2>`

  document.getElementById('shipping-rate').innerHTML = `<span class='fs-6'>Shipping Rate(auto):</span><br><h2>${(farm.shippingRate).toFixed(0)}<span class='fs-6'> /3s</span></h2>`

}



// setInterval(function () { harvestAlmonds; test; }, 3000)
// setInterval(harvestAlmonds, 3000)

// let harvestInterval = setInterval(harvestAlmonds`, 3000)




/* stretch
function displayBadge1(){}
unlocked at milestones like boss levelups

function toggleUpgrade1(){}
add/remove d-none — they will float over play area, with justify-content-around, and should shuffle around when more or less become available
*/


/*TODO outline
ACTIONS
[] click image to collect resource
        image with onclick
        function harvest()

ACTION MODIFIERS
[] at least 4 upgrades purchased that increase resource collection
  [] 1 of these must increase the amount collected per click
  [] 1 must increase amount collected per interval



INTERVALS
[] automatic upgrades applied at least every 3 seconds

DISPLAY
[] current resource total is always displayed
[] show quantity of each upgrade that has been purchased
[] show TOTAL amount of resource that WILL BE collected per click
[] show TOTAL amount of resource that WILL BE collected per interval
{} show total amount of resource cumulatively collected
{} badge system for milestones

RULES
[] Cannot purchase upgrade if they do not have enough resource
[] purchasing upgrade decreases current resource by upgrade price
[] each upgrade has different multiplier values and prices
[] upgrade price increases each time it's purchased
{} disable buttons so you can't buy if you don't have enough resource / hide button instead

*/