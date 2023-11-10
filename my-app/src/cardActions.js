let currentCard = 0
const cards = document.querySelectorAll(".card")
const next_img = document.querySelector(".next-img")
const media_images = document.querySelectorAll(".media-images")

function showCard(index) {
  for (let i = 0; i < cards.length; i++) {
    if (i === index) {
      cards[i].classList.add("active")
    } else {
      cards[i].classList.remove("active")
    }
  }
}

function showNextCard() {
  currentCard = (currentCard + 1) % cards.length
  showCard(currentCard)
}

function showPrevCard() {
  currentCard = (currentCard - 1 + cards.length) % cards.length
  showCard(currentCard)
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    showNextCard()
  } else if (event.key === "ArrowLeft") {
    showPrevCard()
  }
})

document.addEventListener("click", function () {
  showNextCard()
})

showCard(currentCard)

next_img.addEventListener("mouseenter", function () {
  next_img.style.cursor = "pointer"
})

next_img.addEventListener("mouseleave", function () {
  next_img.style.cursor = "auto"
})

media_images.forEach((media_images) => {
  media_images.addEventListener("mouseenter", function () {
    media_images.style.cursor = "pointer"
  })

  media_images.addEventListener("mouseleave", function () {
    media_images.style.cursor = "auto"
  })
})
