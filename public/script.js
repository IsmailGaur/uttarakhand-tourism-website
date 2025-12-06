// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }

  // Category Navigation for Destinations Page
  const categoryLinks = document.querySelectorAll(".category-link")
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      categoryLinks.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Get target category
      const target = this.getAttribute("href").substring(1)

      // Hide all categories
      const categories = document.querySelectorAll(".destination-category")
      categories.forEach((cat) => {
        cat.style.display = "none"
      })

      // Show target category
      const targetCategory = document.getElementById(target)
      if (targetCategory) {
        targetCategory.style.display = "block"
        targetCategory.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })

  // Cost Calculator
  const calculateBtn = document.getElementById("calculate-btn")
  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateTripCost)
  }

  // Contact Form
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Initialize destination categories (show first one by default)
  const firstCategory = document.querySelector(".destination-category")
  if (firstCategory) {
    const categories = document.querySelectorAll(".destination-category")
    categories.forEach((cat, index) => {
      cat.style.display = index === 0 ? "block" : "none"
    })
  }
})

// Cost Calculator Function
function calculateTripCost() {
  const people = Number.parseInt(document.getElementById("people").value) || 1
  const duration = Number.parseInt(document.getElementById("duration").value) || 1
  const travelType = document.getElementById("travel-type").value
  const accommodation = document.getElementById("accommodation").value
  const destinationType = document.getElementById("destination-type").value
  const foodPreference = document.getElementById("food-preference").value

  // Base costs per person per day
  const costs = {
    transport: {
      train: 1500,
      bus: 800,
      flight: 8000,
      car: 2000,
    },
    accommodation: {
      budget: 750,
      "mid-range": 2250,
      luxury: 5000,
    },
    food: {
      local: 300,
      mid: 650,
      fine: 1200,
    },
    activities: {
      religious: 500,
      "hill-station": 800,
      adventure: 1500,
      wildlife: 1200,
      mixed: 1000,
    },
  }

  // Calculate costs
  const transportCost = costs.transport[travelType] * people
  const accommodationCost = costs.accommodation[accommodation] * duration * people
  const foodCost = costs.food[foodPreference] * duration * people
  const activityCost = costs.activities[destinationType] * duration * people
  const localTransportCost = 300 * duration * people

  const subtotal = transportCost + accommodationCost + foodCost + activityCost + localTransportCost
  const miscCost = Math.round(subtotal * 0.1)
  const totalCost = subtotal + miscCost
  const perPersonCost = Math.round(totalCost / people)

  // Display results
  document.getElementById("transport-cost").textContent = `₹${transportCost.toLocaleString()}`
  document.getElementById("accommodation-cost").textContent = `₹${accommodationCost.toLocaleString()}`
  document.getElementById("food-cost").textContent = `₹${foodCost.toLocaleString()}`
  document.getElementById("activity-cost").textContent = `₹${activityCost.toLocaleString()}`
  document.getElementById("local-transport-cost").textContent = `₹${localTransportCost.toLocaleString()}`
  document.getElementById("misc-cost").textContent = `₹${miscCost.toLocaleString()}`
  document.getElementById("total-cost").textContent = `₹${totalCost.toLocaleString()}`
  document.getElementById("per-person-cost").textContent = `₹${perPersonCost.toLocaleString()}`

  // Show result section
  document.getElementById("result-section").style.display = "block"
  document.getElementById("result-section").scrollIntoView({ behavior: "smooth" })

  // Update saving tips based on selections
  updateSavingTips(accommodation, travelType, destinationType)
}

// Update saving tips based on user selections
function updateSavingTips(accommodation, travelType, destinationType) {
  const tipsElement = document.getElementById("saving-tips")
  const tips = [
    "Book accommodations in advance for better rates",
    "Travel during off-season for discounted prices",
    "Use public transportation for local travel",
    "Try local street food for authentic and affordable meals",
    "Look for package deals that include multiple activities",
  ]

  if (accommodation === "luxury") {
    tips.push("Consider mid-range hotels to save 30-40% on accommodation")
  }

  if (travelType === "flight") {
    tips.push("Book flights 2-3 months in advance for better deals")
    tips.push("Consider train travel to save significantly on transportation")
  }

  if (destinationType === "adventure") {
    tips.push("Join group treks to share guide and equipment costs")
    tips.push("Carry your own gear to avoid rental charges")
  }

  // Update the tips list
  tipsElement.innerHTML = tips.map((tip) => `<li>${tip}</li>`).join("")
}

// Contact Form Handler
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitBtn = e.target.querySelector(".submit-button")
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! We will get back to you within 24 hours.")
    e.target.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
}

// Scroll to Top Button
function createScrollToTopButton() {
  const scrollBtn = document.createElement("button")
  scrollBtn.innerHTML = "↑"
  scrollBtn.className = "scroll-to-top"
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c5530;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `

  document.body.appendChild(scrollBtn)

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = "block"
    } else {
      scrollBtn.style.display = "none"
    }
  })

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}

// Initialize scroll to top button
createScrollToTopButton()

// Image lazy loading
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  lazyLoadImages()
}

// Add loading animation to buttons
function addLoadingAnimation() {
  const buttons = document.querySelectorAll(".cta-button, .card-button, .calculate-button")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading")
        setTimeout(() => {
          this.classList.remove("loading")
        }, 2000)
      }
    })
  })
}

// Initialize loading animations
addLoadingAnimation()

// Weather API integration (placeholder)
function getWeatherInfo(location) {
  // This would integrate with a real weather API
  const weatherData = {
    kedarnath: { temp: "5°C", condition: "Cold", humidity: "80%" },
    nainital: { temp: "18°C", condition: "Pleasant", humidity: "65%" },
    auli: { temp: "2°C", condition: "Snow", humidity: "90%" },
  }

  return weatherData[location] || { temp: "N/A", condition: "N/A", humidity: "N/A" }
}

// Form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#e74c3c"
      isValid = false
    } else {
      field.style.borderColor = "#ddd"
    }
  })

  return isValid
}

// Add form validation to all forms
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault()
        alert("Please fill in all required fields.")
      }
    })
  })
})

// Search functionality (for future enhancement)
function initializeSearch() {
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase()
      const cards = document.querySelectorAll(".destination-card, .activity-card")

      cards.forEach((card) => {
        const text = card.textContent.toLowerCase()
        if (text.includes(query)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  }
}

// Initialize search if search input exists
initializeSearch()
