// ===============================
// ELEMENTS
// ===============================

const intro = document.getElementById("intro");
const openButton = document.getElementById("openButton");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const finalButton = document.getElementById("finalButton");
const finalMessage = document.getElementById("finalMessage");

let musicPlaying = false;

// Make the background music softer.
music.volume = 0.3;

// Prevent scrolling while the introduction is open.
document.body.classList.add("locked");


// ===============================
// OPEN THE WEBSITE
// ===============================

openButton.addEventListener("click", async () => {
  intro.classList.add("hidden");
  document.body.classList.remove("locked");

  // Show the music button if it uses the hidden class.
  musicButton.classList.remove("hidden");

  createFlowerRain(25);

  try {
    await music.play();

    musicPlaying = true;
    musicButton.textContent = "❚❚";
    musicButton.setAttribute("aria-label", "Pause background music");
  } catch (error) {
    console.log("Music could not start automatically:", error);

    musicPlaying = false;
    musicButton.textContent = "♫";
    musicButton.setAttribute("aria-label", "Play background music");
  }
});


// ===============================
// MUSIC BUTTON
// ===============================

musicButton.addEventListener("click", async () => {
  if (musicPlaying) {
    music.pause();

    musicPlaying = false;
    musicButton.textContent = "♫";
    musicButton.setAttribute("aria-label", "Play background music");
  } else {
    try {
      await music.play();

      musicPlaying = true;
      musicButton.textContent = "❚❚";
      musicButton.setAttribute("aria-label", "Pause background music");
    } catch (error) {
      console.log("Music could not play:", error);

      alert(
        "The music could not play. Make sure palagi.mp3 is inside the same folder as index.html."
      );
    }
  }
});


// ===============================
// FLOWER MESSAGES
// ===============================

document.querySelectorAll(".flower").forEach((flower) => {
  flower.addEventListener("click", () => {
    // Use the flower's title.
    if (modalTitle) {
      modalTitle.textContent =
        flower.dataset.title || "A Flower for You";
    }

    // Use the flower's message.
    modalText.textContent =
      flower.dataset.message || "This flower is for you, Babi.";

    modal.classList.add("show");

    createFlowerRain(10);
  });
});


// ===============================
// CLOSE FLOWER MESSAGE
// ===============================

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Close the modal when the dark background is clicked.
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

// Close the modal using the Escape key.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});


// ===============================
// FLIPPING REASON CARDS
// ===============================

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});


// ===============================
// FINAL SURPRISE
// ===============================

finalButton.addEventListener("click", () => {
  finalMessage.classList.add("show");
  finalButton.style.display = "none";

  createHeartRain(50);
});


// ===============================
// FLOWER RAIN
// ===============================

function createFlowerRain(amount) {
  const flowers = ["🌸", "🌷", "🌹", "🌺", "✨"];

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
    }, 12000);
  }
}


// ===============================
// HEART RAIN
// ===============================

function createHeartRain(amount) {
  const hearts = ["💗", "💕", "💖", "💞", "🌸", "✨"];

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
    }, 11000);
  }
}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

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
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});


// ===============================
// OCCASIONAL FALLING FLOWERS
// ===============================

setInterval(() => {
  // Only create flowers after the introduction is closed.
  if (intro.classList.contains("hidden")) {
    createFlowerRain(3);
  }
}, 5000);
