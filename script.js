const blockTypes = [
  "grass", "grass", "stone", "grass", "stone", "grass", "php", "stone",
  "grass", "stone", "diamond", "grass", "stone", "cat", "grass", "stone",
  "php", "grass", "stone", "grass", "diamond", "stone", "grass", "grass",
  "stone", "grass", "cat", "stone", "grass", "php", "stone", "grass",
  "grass", "stone", "grass", "diamond", "stone", "grass", "cat", "stone"
];

const messages = {
  grass: [
    "Dirt acquired. Website progress unchanged.",
    "Grass block mined. The deployment pipeline is now 0.2% more cozy.",
    "You found soil. Backend secrets remain safely imaginary."
  ],
  stone: [
    "Stone block mined. Java build time increased by one dramatic sigh.",
    "Cobblestone collected. Perfect for another unfinished side project.",
    "Stone says: 200 OK, but emotionally 503."
  ],
  diamond: [
    "Diamond found. Spend it wisely on one more server.",
    "Rare gem acquired. The cat immediately claimed ownership.",
    "Diamond! This almost counts as finishing the website."
  ],
  php: [
    "PHP ore discovered. It emits powerful legacy energy.",
    "PHP is the best. This message is legally binding on this website.",
    "You mined PHP. The page now supports enterprise-grade jokes."
  ],
  cat: [
    "Cat block! The only production dependency that matters.",
    "Meow approved. Ship it.",
    "The cat pressed deploy. Nobody knows what changed."
  ]
};

const pickaxes = ["wood", "stone", "iron", "diamond", "PHP"];
let score = 0;
let toastTimer;
const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const entered = [];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}

function buildBlocks() {
  const grid = document.querySelector("[data-block-grid]");
  const scoreNode = document.querySelector("[data-score]");
  const pickaxeNode = document.querySelector("[data-pickaxe]");
  const messageNode = document.querySelector("[data-game-message]");

  if (!grid || !scoreNode || !pickaxeNode || !messageNode) return;

  blockTypes.forEach((type, index) => {
    const block = document.createElement("button");
    block.className = "block";
    block.type = "button";
    block.dataset.type = type;
    block.setAttribute("aria-label", `Mine ${type} block ${index + 1}`);

    block.addEventListener("click", () => {
      if (block.classList.contains("mined")) return;
      block.classList.add("mined");
      score += type === "diamond" ? 5 : type === "php" ? 4 : type === "cat" ? 3 : 1;
      scoreNode.textContent = String(score);
      pickaxeNode.textContent = pickaxes[Math.min(pickaxes.length - 1, Math.floor(score / 8))];
      messageNode.textContent = randomItem(messages[type]);
    });

    grid.append(block);
  });
}

function wireButtons() {
  const chaosButton = document.querySelector("[data-chaos-button]");
  const finishButton = document.querySelector("[data-finish-button]");

  if (chaosButton) chaosButton.addEventListener("click", () => {
    document.body.classList.toggle("chaos-mode");
    showToast(document.body.classList.contains("chaos-mode")
      ? "Chaos deployed. Rollback unavailable until coffee."
      : "Chaos paused. Logs still suspicious.");
  });

  if (finishButton) finishButton.addEventListener("click", () => {
    showToast("Website completion failed: task depends on \"one more feature\".");
  });
}

function wireKonami() {
  window.addEventListener("keydown", (event) => {
    entered.push(event.key);
    entered.splice(0, entered.length - konami.length);

    if (konami.every((key, index) => key === entered[index])) {
      if (!document.querySelector(".konami-cat")) {
        const cat = document.createElement("div");
        cat.className = "konami-cat";
        cat.textContent = "🐈";
        cat.setAttribute("aria-hidden", "true");
        document.body.append(cat);
      }
      showToast("Secret cat mode unlocked. The backend is still definitely not here.");
    }
  });
}

const yearNode = document.querySelector("[data-year]");
if (yearNode) yearNode.textContent = new Date().getFullYear();
buildBlocks();
wireButtons();
wireKonami();
