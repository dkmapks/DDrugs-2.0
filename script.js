let cash = 1000;
let btcBalance = 0;
let storageUsed = 0;
let storageLimit = 50;

let inventory = {
  kokaina: 0,
  marihuana: 0,
  mefedron: 0,
  amfetamina: 0,
  pixy: 0
};

const warehouseLevels = [
  { cost: 0, limit: 50 },
  { cost: 1000, limit: 200 },
  { cost: 5000, limit: 1000 },
  { cost: 15000, limit: 5000 },
  { cost: 30000, limit: 30000 },
  { cost: 1000000, limit: 100000 }
];

let workers = [
  { name: "Kamil", rate: 30 },
  { name: "Monika", rate: 25 },
  { name: "Bartek", rate: 20 }
];

let travelCities = [
  { name: "Olsztyn", cost: 2500, bonus: 1 },
  { name: "Białystok", cost: 5000, bonus: 2 },
  { name: "Wrocław", cost: 10000, bonus: 4 },
  { name: "Gdańsk", cost: 20000, bonus: 5 },
  { name: "Warszawa", cost: 50000, bonus: 8 },
  { name: "Berlin", cost: 80000, bonus: 10 },
  { name: "Madryt", cost: 120000, bonus: 13 },
  { name: "Rzym", cost: 160000, bonus: 15 },
  { name: "Tokio", cost: 200000, bonus: 20 },
  { name: "Kolumbia", cost: 250000, bonus: 24 },
  { name: "Monako", cost: 400000, bonus: 30 },
  { name: "Hamburg", cost: 1000000, bonus: 50 }
];

function updateUI() {
  document.getElementById("cash").innerText = cash;
  document.getElementById("btc").innerText = btcBalance.toFixed(3);
  document.getElementById("storageUsed").innerText = storageUsed;
  document.getElementById("storageLimit").innerText = storageLimit;

  let invHTML = "";
  for (let drug in inventory) {
    invHTML += `<p>${drug}: ${inventory[drug]}g</p>`;
  }
  document.getElementById("inventory").innerHTML = invHTML;

  let workersHTML = "";
  workers.forEach(w => {
    workersHTML += `<p>${w.name} (stawka ${w.rate} zł/g) <button onclick="giveWork('${w.name}')">Zleć robotę</button></p>`;
  });
  document.getElementById("workers").innerHTML = workersHTML;

  let travelHTML = "";
  travelCities.forEach(c => {
    travelHTML += `<button onclick="travel('${c.name}', ${c.cost}, ${c.bonus})">${c.name} (${c.cost} zł, +${c.bonus} zł/g)</button>`;
  });
  document.getElementById("travel").innerHTML = travelHTML;
}

function buy(type, price) {
  if (cash >= price && storageUsed + 1 <= storageLimit) {
    cash -= price;
    inventory[type]++;
    storageUsed++;
    updateUI();
  }
}

const btc = {
  deposit() {
    let amount = parseFloat(document.getElementById("btcAmount").value);
    if (!isNaN(amount)) btcBalance += amount;
    updateUI();
  },
  withdraw() {
    let amount = parseFloat(document.getElementById("btcAmount").value);
    if (!isNaN(amount) && btcBalance >= amount) btcBalance -= amount;
    updateUI();
  }
};

function giveWork(workerName) {
  let worker = workers.find(w => w.name === workerName);
  if (inventory.marihuana >= 1) {
    inventory.marihuana--;
    cash += worker.rate;
    storageUsed--;
    updateUI();
    alert(`${workerName} sprzedał marihuanę za ${worker.rate} zł`);
  } else {
    alert("Brak towaru dla pracownika");
  }
}

function travel(city, cost, bonus) {
  if (cash >= cost) {
    cash -= cost;
    workers.forEach(w => w.rate += bonus);
    alert(`Podróż do ${city}. Twoje ceny sprzedaży wzrosły o ${bonus} zł/g`);
    updateUI();
  }
}

updateUI();
