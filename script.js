// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.padding = "10px 0";
    header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.padding = "20px 0";
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Modal functions
function openModal(imageSrc) {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImg");
  modalImg.src = imageSrc;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("certModal");
  modal.style.display = "none";
}

// Close modal when clicking outside the image
window.onclick = function (event) {
  const modal = document.getElementById("certModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Resume Functions
function openResumeViewer() {
  const modal = document.getElementById("resumeModal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeResumeViewer() {
  const modal = document.getElementById("resumeModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

function downloadResume() {
  // Create a temporary link to trigger download
  const link = document.createElement("a");
  link.href =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  link.download = "Ravi_Varma_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Close modal if open
  closeResumeViewer();
}

function printResume() {
  const pdfFrame = document.getElementById("resumeFrame");
  pdfFrame.contentWindow.print();
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("resumeModal");
  if (event.target === modal) {
    closeResumeViewer();
  }
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeResumeViewer();
  }
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const formStatus = document.getElementById("formStatus");

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send form data using Formspree
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Success message
        formStatus.textContent =
          "Thank you for your message! I will get back to you soon.";
        formStatus.className = "form-status success";
        formStatus.style.display = "block";
        form.reset();
      } else {
        // Error message
        formStatus.textContent =
          "Oops! There was a problem sending your message. Please try again.";
        formStatus.className = "form-status error";
        formStatus.style.display = "block";
      }
    })
    .catch((error) => {
      // Network error
      formStatus.textContent =
        "Network error. Please check your connection and try again.";
      formStatus.className = "form-status error";
      formStatus.style.display = "block";
    })
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Hide status message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Generate animated code lines in the background
document.addEventListener("DOMContentLoaded", function () {
  const codeBackground = document.getElementById("codeBackground");
  const codeSnippets = [
    "public class Main {",
    "  public static void main(String[] args) {",
    '    System.out.println("Hello World");',
    "  }",
    "}",
    "function calculate(a, b) {",
    "  return a + b;",
    "}",
    "const user = {",
    '  name: "Ravi",',
    '  role: "Developer"',
    "};",
    "SELECT * FROM users WHERE active = 1;",
    'INSERT INTO projects (name) VALUES ("Portfolio");',
    "@SpringBootApplication",
    "public class Application {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(Application.class, args);",
    "  }",
    "}",
    '<div className="container">',
    "  <Header />",
    "  <MainContent />",
    "  <Footer />",
    "</div>",
    "def machine_learning_model():",
    "    model = Sequential()",
    '    model.add(Dense(64, activation="relu"))',
    "    return model",
    "git add .",
    'git commit -m "Update portfolio"',
    "git push origin main",
  ];

  // Create multiple code lines with random positions
  for (let i = 0; i < 40; i++) {
    const codeLine = document.createElement("div");
    codeLine.className = "code-line";

    // Random code snippet
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

    // Add some highlighted elements randomly
    let formattedSnippet = randomSnippet;
    if (Math.random() > 0.7) {
      const words = randomSnippet.split(" ");
      if (words.length > 1) {
        const randomIndex = Math.floor(Math.random() * words.length);
        words[
          randomIndex
        ] = `<span class="code-highlight">${words[randomIndex]}</span>`;
        formattedSnippet = words.join(" ");
      }
    }

    codeLine.innerHTML = formattedSnippet;

    // Random position and animation delay
    codeLine.style.left = Math.random() * 100 + "%";
    codeLine.style.animationDelay = Math.random() * 20 + "s";

    codeBackground.appendChild(codeLine);
  }
});
