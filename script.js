const intro = document.getElementById("intro");
const openButton = document.getElementById("openButton");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const finalButton = document.getElementById("finalButton");
const finalMessage = document.getElementById("finalMessage");

let musicPlaying = false;

document.body.classList.add("locked");

openButton.addEventListener("click", async () => {
  intro.classList.add("hidden");
  document.body.classList.remove("locked");

  createFlowerRain(25);

  try {
    await music.play();

    musicPlaying = true;
    musicButton.textContent = "❚❚";
  } catch {
    musicPlaying = false;
    musicButton.textContent = "♫";
  }
});

musicButton.addEventListener("click", async () => {
  if (musicPlaying) {
    music.pause();

    musicPlaying = false;
    musicButton.textContent = "♫";
  } else {
    try {
      await music.play();

      musicPlaying = true;
      musicButton.textContent = "❚❚";
    } catch {
      alert("Add a song named song.mp3 inside the website folder.");
    }
  }
});

document.querySelectorAll(".flower").forEach((flower) => {
  flower.addEventListener("click", () => {
    modalText.textContent = flower.dataset.message;

    modal.classList.add("show");

    createFlowerRain(10);
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

finalButton.addEventListener("click", () => {
  finalMessage.classList.add("show");
  finalButton.style.display = "none";

  createHeartRain(50);
});

function createFlowerRain(amount) {
  const flowers = ["🌸", "🌷", "🌹", "✨"];

  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");

    item.classList.add("falling-item");

    item.textContent =
      flowers[Math.floor(Math.random() * flowers.length)];

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = 15 + Math.random() * 20 + "px";
    item.style.animationDuration = 5 + Math.random() * 5 + "s";
    item.style.animationDelay = Math.random() * 2 + "s";
    item.style.setProperty(
      "--drift",
      Math.random() * 200 - 100 + "px"
    );

    document.body.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 11000);
  }
}

function createHeartRain(amount) {
  const hearts = ["💗", "💕", "💖", "🌸", "✨"];

  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");

    item.classList.add("falling-item");

    item.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = 18 + Math.random() * 22 + "px";
    item.style.animationDuration = 4 + Math.random() * 5 + "s";
    item.style.animationDelay = Math.random() * 1.5 + "s";
    item.style.setProperty(
      "--drift",
      Math.random() * 250 - 125 + "px"
    );

    document.body.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 10000);
  }
}

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

setInterval(() => {
  createFlowerRain(3);
}, 5000);

const messageToType = "I love you, Rain. Always. 💗";
const typingText = document.getElementById("typingText");

function typeFinalMessage() {
  let index = 0;

  typingText.textContent = "";

  const typingInterval = setInterval(() => {
    typingText.textContent += messageToType[index];

    index++;

    if (index >= messageToType.length) {
      clearInterval(typingInterval);
    }
  }, 70);
}

finalButton.addEventListener("click", () => {
  finalMessage.classList.add("show");
  finalButton.style.display = "none";

  typeFinalMessage();
  createHeartRain(50);
});
