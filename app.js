console.log("🥜 go nuts")
// SECTION global variables

let almonds = 0

let farm = {
  harvestRate: 100,
  shippingRate: 0,

  seasonHarvest: 0,
}

// 👉 trucks and tractors
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

// bees and trees 
let automaticUpgrades = [
  {
    name: 'bees',
    emoji: '🐝',
    price: 50,
    quantity: 0,
    multiplier: 1,
    // automaticUpgrades[0].tier2.name
    tier2: {
      name: 'bees',
      emoji: '🍯',
      price: 75,
      quantity: 0,
      multiplier: 3
    },
  },
  {
    name: 'trees',
    emoji: '🌳',
    price: 75,
    quantity: 0,
    multiplier: 2
  }
];


// SECTION start game and interval

updateStats()


// start interval and trigger auto harvesting
let harvestInterval
function startGame() {
  document.getElementById('start-bg').remove()
  harvestInterval = setInterval(autoHarvest, 3000)
}

function autoHarvest() {
  almonds += farm.shippingRate;
  farm.seasonHarvest += farm.shippingRate

  updateStats()
}


// SECTION player action
function harvestAlmonds() {
  almonds += farm.harvestRate
  farm.seasonHarvest += farm.harvestRate

  updateStats()
}


// SECTION purchase and display modifiers

// 👉 purchase and display trucks and tractors
function purchaseUpgradePerClick(resource) {
  let clickUpgrade = clickUpgrades.find(upgrade => upgrade.name == resource)

  clickUpgrade.quantity += 1,
    almonds -= clickUpgrade.price,
    (clickUpgrade.price += (.2 * clickUpgrade.price)).toFixed(0),
    (farm.harvestRate += 3).toFixed(0)

  // update dashboard - trucks and tractors upgrades purchased
  document.getElementById(`draw-${clickUpgrade.name}`).innerHTML = `<h2><span class="fs-6">${clickUpgrade.emoji}</span> ${clickUpgrade.quantity}</h2><p><i>+3 each harvest</i></p>`


  buyVehicles(clickUpgrade.emoji)
  updateButtonValues(clickUpgrade)
  updateStats()
}

function buyVehicles(resource) {
  let vehiclesElem = document.getElementById('vehicles')
  vehiclesElem.innerText += resource
}

// // 👉 purchase and display bees and trees +
// function purchaseUpgradePerInt(resource) {
//   let intUpgrade = automaticUpgrades.find(upgrade => upgrade.name == resource)

//   intUpgrade.quantity += 1,
//     almonds -= intUpgrade.price,
//     (farm.shippingRate += (intUpgrade.multiplier * intUpgrade.quantity)).toFixed(0),
//     (intUpgrade.price += (.1 * intUpgrade.price)).toFixed(0)

//   // update dashboard — bee and tree updates purchased
//   document.getElementById(`draw-${intUpgrade.name}`).innerHTML = `<h2><span class="fs-6">${intUpgrade.emoji}</span> ${intUpgrade.quantity}</h2><p><i>+5 every 3s</i></p>`

//   if (intUpgrade.name == 'trees') {
//     plantTrees()
//   } else {
//     moreBees()
//   }

//   updateButtonValues(intUpgrade)
//   updateStats()
// }

// 👉 purchase and display bees and trees
function purchaseUpgradePerInt(resource) {
  let intUpgrade = automaticUpgrades.find(upgrade => upgrade.name == resource)

  if (intUpgrade.quantity <= 10) {
    assignUpgradePerInt(intUpgrade)
  } else {
    let intUpgrade2 = intUpgrade.tier2
    assignUpgradePerInt(intUpgrade2)
  }
}

function assignUpgradePerInt(resource) {

  resource.quantity += 1,
    almonds -= resource.price,
    (farm.shippingRate += (resource.multiplier * resource.quantity)).toFixed(0),
    (resource.price += (.1 * resource.price)).toFixed(0)

  // update dashboard — bee and tree updates purchased
  if (resource.name == 'trees') {
    plantTrees()
  } else {
    moreBees()
  }
  updateButtonValues(resource)
  updateStats()
}


// 👉 plant trees when purchased
function plantTrees() {
  let orchardElem = document.getElementById('tree-rows')
  orchardElem.innerText += `🌳`
}

function moreBees() {
  let swarmElem = document.getElementById('new-bees')
  swarmElem.innerText += '🐝  '
}


// SECTION display

// 👉 updates upgrades-available and upgrades-purchased
function updateButtonValues(resource) {
  // buy buttons
  document.getElementById(`buy-${resource.name}-btn`).innerHTML = `${resource.emoji} ${(resource.price).toFixed(0)}`
}

// function updateTierTwoButtons(resource) {
//   // buy buttons
//   document.getElementById(`buy-two-${resource.name}-btn`).innerHTML = `${resource.emoji} ${(resource.price).toFixed(0)}`
// }

// 👉 updates top dashboard
function updateStats() {

  document.getElementById('season').innerHTML = `<span class="fs-6">Season Total:</span><br><h5>${(farm.seasonHarvest).toFixed(0)}</h5>`

  document.getElementById('harvest-rate').innerHTML = `<span class='fs-6'>Harvest Rate(manual):</span><br><h2>${(farm.harvestRate).toFixed(0)}<span class='fs-6'> /click</h2>`

  document.getElementById('almondsSupply').innerHTML = `<span class='fs-6'>Almonds to Sell:</span><h2>${(almonds).toFixed(0)}</h2>`

  document.getElementById('shipping-rate').innerHTML = `<span class='fs-6'>Shipping Rate(auto):</span><br><h2>${(farm.shippingRate).toFixed(0)}<span class='fs-6'> /3s</span></h2>`

  toggleButtons()
}

// check whether buttons should be visible or not
function toggleButtons() {

  clickUpgrades.forEach(clickResource => {
    let clickResourceButtonElem = document.getElementById(`buy-${clickResource.name}-btn`)

    almonds >= clickResource.price ? clickResourceButtonElem.classList.remove('d-none') : clickResourceButtonElem.classList.add('d-none');
  })

  automaticUpgrades.forEach(intResource => {
    let intResourceButtonElem = document.getElementById(`buy-${intResource.name}-btn`)

    almonds >= intResource.price ? intResourceButtonElem.classList.remove('d-none') : intResourceButtonElem.classList.add('d-none');
  })


}



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