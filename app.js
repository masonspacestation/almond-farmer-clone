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


// SECTION start game and interval

updateStats()

// start interval and trigger auto harvesting
let harvestInterval
function startGame() {
  document.getElementById('start-card').classList.add('d-none')
  // if (!harvestInterval) {
  harvestInterval = setInterval(autoHarvest, 3000)
  // }
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

  toggleButtons()
  updateStats()
}

// SECTION modifiers

// 👉 purchase trucks and tractors
function purchaseUpgradePerClick(resource) {
  let clickUpgrade = clickUpgrades.find(upgrade => upgrade.name == resource)

  if (almonds > clickUpgrade.price) {
    clickUpgrade.quantity += 1,
      almonds -= clickUpgrade.price,
      (clickUpgrade.price += (clickUpgrade.multiplier * clickUpgrade.price)).toFixed(0),
      (farm.harvestRate += (3 * clickUpgrade.quantity)).toFixed(0)
  } else {
    console.log("didn't upgrade ", resource)
  }

  // if (clickUpgrade.name == 'trucks')
  buyVehicles(clickUpgrade.emoji)
  updateResources(clickUpgrade)
  updateStats()
}

// 👉 purchase bees and trees
function purchaseUpgradePerInt(resource) {
  let intUpgrade = automaticUpgrades.find(upgrade => upgrade.name == resource)

  if (almonds > intUpgrade.price) {
    intUpgrade.quantity += 1,
      almonds -= intUpgrade.price,
      (farm.shippingRate += (intUpgrade.multiplier * intUpgrade.quantity)).toFixed(0),
      (intUpgrade.price += (.1 * intUpgrade.price)).toFixed(0)
  } else {
    console.log("didn't upgrade ", resource)
  }

  if (intUpgrade.name == 'trees') {
    plantTrees()
  }

  updateResources(intUpgrade)
  updateStats()
}

// 👉 plant trees when purchased
function plantTrees() {
  // set the first trees on the page at load, and just add to them here
  let orchardElem = document.getElementById('tree-rows')
  orchardElem.innerText += `🌳`
}

function moreBees() {

  // let beeTemplate =
  //   `<marquee behavior="alternate" scrollamount="9">
  // <marquee behavior="alternate" direction="up" scrollamount="10">
  // <span id="new-bees" class="vertical-text">🐝</span>
  // </marquee>
  // </marquee>`

  let swarmElem = document.getElementById('new-bees')
  swarmElem.innerHTML += `<span id="new-bees">🐝</span>`

  // swarmElem.innerHTML += `<p id="new-bees" class="vertical-text">${beeTemplate}</p>`
  // let marqueeX = swarmElem.querySelector('.swarm>marquee')
  // let marqueeY = swarmElem.querySelector('swarm>marquee')
}

function buyVehicles(resource) {
  let vehiclesElem = document.getElementById('vehicles')
  vehiclesElem.innerText += resource
}



// SECTION diplay

// 👉 updates upgrades-available and upgrades-purchased
function updateResources(resource) {
  // buy buttons
  document.getElementById(`buy-${resource.name}-btn`).innerHTML = `${resource.emoji} ${(resource.price).toFixed(0)}`

  // document.getElementById(`buy-${resource.name}-btn`).innerHTML = `${resource.emoji} ${(resource.price).toFixed(0)}`

  // upgrade dashboard - upgrades-purchased
  document.getElementById(`draw-${resource.name}`).innerHTML = `<h2><span class="fs-6">${resource.emoji}</span> ${resource.quantity}</h2>`

  toggleButtons()
}

// 👉 updates top dashboard
function updateStats() {

  document.getElementById('season').innerHTML = `<span class="fs-6">Season Total:</span><br><h5>${(farm.seasonHarvest).toFixed(0)}</h5>`

  document.getElementById('harvest-rate').innerHTML = `<span class='fs-6'>Harvest Rate(manual):</span><br><h2>${(farm.harvestRate).toFixed(0)}<span class='fs-6'> /click</h2>`

  document.getElementById('almondsSupply').innerHTML = `<span class='fs-6'>Almonds to Sell:</span><h2>${(almonds).toFixed(0)}</h2>`

  document.getElementById('shipping-rate').innerHTML = `<span class='fs-6'>Shipping Rate(auto):</span><br><h2>${(farm.shippingRate).toFixed(0)}<span class='fs-6'> /3s</span></h2>`

  toggleButtons()
}


function toggleButtons() {
  console.log("check tractors buttons");


  clickUpgrades.forEach(clickResource => {
    console.log('clickResource= ', clickResource);
    let clickResourceButtonElem = document.getElementById(`buy-${clickResource.name}-btn`)
    console.log(clickResourceButtonElem);
    almonds >= clickResource.price ? clickResourceButtonElem.classList.remove('d-none') : clickResourceButtonElem.classList.add('d-none');
  })

  automaticUpgrades.forEach(intResource => {
    console.log('intResource= ', intResource);
    let intResourceButtonElem = document.getElementById(`buy-${intResource.name}-btn`)
    console.log(intResourceButtonElem);
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