console.log("🥜 go nuts")
// SECTION global variables

let almonds = 0

let farm = {
  harvestRate: 100,
  shippingRate: 3,

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
    multiplier: 2
  },
  {
    name: 'trees',
    emoji: '🌳',
    price: 75,
    quantity: 0,
    multiplier: 4
  }
];

updateStats()


// SECTION player action
function harvestAlmonds() {
  almonds += farm.harvestRate
  farm.seasonHarvest += farm.harvestRate
  updateStats()
}

// SECTION modifiers

function upgradePerClick(resource) {
  // trucks and tractors
  let clickUpgrade = clickUpgrades.find(upgrade => upgrade.name == resource)
  // console.log("upgrade: ", resource)

  if (almonds > clickUpgrade.price) {
    clickUpgrade.quantity += 1,
      almonds -= clickUpgrade.price,
      (clickUpgrade.price += (1.05 * clickUpgrade.price)).toFixed(0),
      (farm.harvestRate += (3 * clickUpgrade.quantity)).toFixed(0)
  } else {
    console.log("didn't upgrade ", resource)
  }

  // document.getElementById(`draw-${clickUpgrade.name}`).innerHTML = `<h2>${clickUpgrade.quantity}</h2>`
  // document.getElementById(`buy-${clickUpgrade.name}-btn`).innerHTML = `${clickUpgrade.emoji} ${(clickUpgrade.price).toFixed(0)}`
  updateResources(clickUpgrade)
  updateStats()
}


function upgradePerInt(resource) {
  // bees and trees
  let intUpgrade = automaticUpgrades.find(upgrade => upgrade.name == resource)
  // console.log("upgrade: ", resource)

  if (almonds > intUpgrade.price) {
    almonds -= intUpgrade.price,
      intUpgrade.quantity += 1,
      (intUpgrade.price += (1.05 * intUpgrade.price)).toFixed(0),
      (farm.shippingRate += (3 * intUpgrade.quantity)).toFixed(0)
  } else {
    console.log("didn't upgrade ", resource)
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


function updateStats() {
  // drawAlmondsSupply()
  // drawShippingRate()
  // drawHarvestRate()
  // drawSeasonHarvest()
  document.getElementById('almondsSupply').innerHTML = `<h2>${(almonds).toFixed(0)}</h2>`
  document.getElementById('shipping-rate').innerHTML = `<span class='fs-6'>Shipping Rate(auto):</span><br><h2>${(farm.shippingRate).toFixed(0)}</h2>`
  document.getElementById('harvest-rate').innerHTML = `<span class='fs-6'>Harvest Rate(manual):</span><br><h2>${(farm.harvestRate).toFixed(0)}</h2>`
  document.getElementById('season').innerHTML = `<span class="fs-6">Season Total:</span><br><h5>${farm.seasonHarvest}</h5>`
}


// SECTION diplay

function updateResources(resource) {
  document.getElementById(`draw-${resource.name}`).innerHTML = `<h2><span class="fs-6">${resource.emoji}</span> ${resource.quantity}</h2>`

  document.getElementById(`buy-${resource.name}-btn`).innerHTML = `${resource.emoji} ${(resource.price).toFixed(0)}`
}




// function drawAlmondsSupply() {
//   document.getElementById('almondsSupply').innerHTML = `<h2>${(almonds).toFixed(0)}</h2>`
// }

// function drawShippingRate() {
//   // console.log('🚜 🚛 shipping upgrade purchased')
//   document.getElementById('shipping-rate').innerHTML = `<h2>${(farm.shippingRate).toFixed(0)}</h2>`
//   // bees and trees increase amount per interval (for stretch, could also speed up the interval at milestones); tractors and trucks increase amount per click
// }

// function drawHarvestRate() {
//   // console.log('🐝 🌳 harvest upgrade purchased');
//   document.getElementById('harvest-rate').innerHTML = `<h2>${(farm.harvestRate).toFixed(0)}</h2>`
// }


// function drawSeasonHarvest() {
//   // console.log('📦📦📦 season harvest');
//   document.getElementById('season').innerHTML = `<h5>Season Total: ${farm.seasonHarvest}</h5>`
// }


// SECTION interval
function startGame() {

  document.getElementById('start-card').classList.add('d-none')
  // startCardElem.innerHTML = `<h5>Season Total: ${farm.seasonHarvest}</h5>`

}

// let harvestInterval = setInterval(harvestAlmonds, 3000)

/* stretch
function displayBadge1(){}
unlocked at milestones like boss levelups

function toggleUpgrade1(){}
add/remove d-none — they will float over play area, with justify-content-around, and should shuffle around when more or less become available
*/







/*!SECTION
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