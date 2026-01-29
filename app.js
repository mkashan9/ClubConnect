/**
 * ClubConnect - All-in-One Sports Club Management Platform
 * @file Main application logic and utilities
 * @version 1.0.0
 * @author ClubConnect Development Team
 * 
 * This module handles:
 * - Blockchain payment processing
 * - User notifications and confirmations
 * - Authentication and authorization
 * - Dashboard management
 * - Data persistence and retrieval
 */

// ================== CRYPTO PAYMENT CONSTANTS (DEFINED FIRST FOR GLOBAL ACCESS) ==================
/**
 * Owner's wallet address for receiving payments
 * @type {string}
 */
window.OWNER_WALLET_ADDRESS = "0xe2d165ab23cd2ed0cafb969b8bc55b9a71f17b5c";

/**
 * Payment amounts for different operations in ETH
 * @type {Object}
 * @property {string} playerRegistration - Cost to register a player (0.01 ETH)
 * @property {string} coachHiring - Cost to hire a coach (0.02 ETH)
 * @property {string} clubPayment - Cost for club operations (0.05 ETH)
 */
window.PAYMENT_AMOUNTS = {
  playerRegistration: "0.01",
  coachHiring: "0.02",
  clubPayment: "0.05"
};

/** @type {string} Sepolia testnet chain ID */
window.SEPOLIA_CHAIN_ID = "0xaa36a7";

/** @type {string} Polygon mainnet chain ID */
window.POLYGON_CHAIN_ID = "0x89";

/** @type {string|null} Current user's wallet address */
window.currentAccount = null;

/** @type {string|null} Current blockchain network ID */
window.currentChainId = null;

// ================== NOTIFICATION SYSTEM ==================
/**
 * Displays a styled notification message to the user
 * @function showNotification
 * @param {string} message - The notification message to display
 * @param {string} [type='info'] - Notification type: 'success', 'error', 'warning', or 'info'
 * @param {number} [duration=4000] - Display duration in milliseconds (0 = permanent)
 * @returns {void}
 * 
 * @example
 * showNotification('Player registered successfully!', 'success', 4000);
 * showNotification('An error occurred', 'error', 5000);
 */
window.showNotification = function(message, type = 'info', duration = 4000) {
  // Create notification container if it doesn't exist
  let container = document.getElementById('notificationContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notificationContainer';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;
    document.body.appendChild(container);
  }

  // Icon mapping
  const icons = {
    success: '<i class="fas fa-check-circle"></i>',
    error: '<i class="fas fa-times-circle"></i>',
    warning: '<i class="fas fa-exclamation-triangle"></i>',
    info: '<i class="fas fa-info-circle"></i>'
  };

  // Color mapping
  const colors = {
    success: { bg: '#10b981', border: '#059669' },
    error: { bg: '#ef4444', border: '#dc2626' },
    warning: { bg: '#f59e0b', border: '#d97706' },
    info: { bg: '#3b82f6', border: '#2563eb' }
  };

  const color = colors[type] || colors.info;
  const icon = icons[type] || icons.info;

  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    background: ${color.bg};
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    border-left: 4px solid ${color.border};
    box-shadow: 0 10px 40px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    animation: slideInRight 0.3s ease-out;
    min-width: 300px;
    max-width: 400px;
    position: relative;
    overflow: hidden;
  `;

  notification.innerHTML = `
    <div style="font-size: 24px;">${icon}</div>
    <div style="flex: 1;">${message}</div>
    <button onclick="this.parentElement.remove()" style="
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: background 0.2s;
    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
  `;

  // Add animation keyframes if not exists
  if (!document.getElementById('notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  container.appendChild(notification);

  // Auto-remove after duration
  if (duration > 0) {
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }
};

// Custom confirmation dialog
window.showConfirm = function(message, onConfirm, onCancel) {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease-out;
  `;

  // Create confirmation dialog
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    max-width: 450px;
    width: 90%;
    animation: scaleIn 0.3s ease-out;
    font-family: 'Poppins', sans-serif;
  `;

  dialog.innerHTML = `
    <div style="margin-bottom: 24px;">
      <div style="font-size: 48px; text-align: center; color: #3b82f6; margin-bottom: 16px;">
        <i class="fas fa-question-circle"></i>
      </div>
      <p style="font-size: 16px; color: #1f2937; text-align: center; margin: 0; line-height: 1.6;">
        ${message}
      </p>
    </div>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <button id="confirmBtn" style="
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
        font-family: 'Poppins', sans-serif;
      ">Confirm</button>
      <button id="cancelBtn" style="
        background: #e5e7eb;
        color: #4b5563;
        border: none;
        padding: 12px 32px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
        font-family: 'Poppins', sans-serif;
      ">Cancel</button>
    </div>
  `;

  // Add animation styles
  if (!document.getElementById('confirmDialogStyles')) {
    const style = document.createElement('style');
    style.id = 'confirmDialogStyles';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from {
          transform: scale(0.9);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      #confirmBtn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      }
      #cancelBtn:hover {
        transform: translateY(-2px);
        background: #d1d5db;
      }
    `;
    document.head.appendChild(style);
  }

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Handle button clicks
  dialog.querySelector('#confirmBtn').addEventListener('click', () => {
    overlay.remove();
    if (onConfirm) onConfirm();
  });

  dialog.querySelector('#cancelBtn').addEventListener('click', () => {
    overlay.remove();
    if (onCancel) onCancel();
  });

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
      if (onCancel) onCancel();
    }
  });
};

// Global variables for payment state
let selectedPlanId = null;
let selectedPlanName = null;
let selectedAmountEth = null;

// Helper: ETH string -> wei hex
function ethToWeiHex(ethStr) {
  const [whole, fracRaw = ""] = ethStr.split(".");
  const frac = (fracRaw + "000000000000000000").slice(0, 18);
  const weiStr = whole + frac;
  const weiBigInt = BigInt(weiStr);
  return "0x" + weiBigInt.toString(16);
}

// Setup function for modal button listeners
function setupCryptoModalListeners() {
  const cryptoCloseBtn = document.getElementById("cryptoModalCloseBtn");
  const cryptoModal = document.getElementById("cryptoPaymentModal");
  const connectWalletBtn = document.getElementById("connectWalletBtn");
  const payWithCryptoBtn = document.getElementById("payWithCryptoBtn");
  
  if (cryptoCloseBtn && !cryptoCloseBtn.dataset.listenerAttached) {
    cryptoCloseBtn.addEventListener("click", window.closeCryptoModal);
    cryptoCloseBtn.dataset.listenerAttached = "true";
  }
  if (cryptoModal && !cryptoModal.dataset.listenerAttached) {
    cryptoModal.addEventListener("click", (e) => {
      if (e.target === cryptoModal) {
        window.closeCryptoModal();
      }
    });
    cryptoModal.dataset.listenerAttached = "true";
  }
  if (connectWalletBtn && !connectWalletBtn.dataset.listenerAttached) {
    connectWalletBtn.addEventListener("click", window.connectWallet);
    connectWalletBtn.dataset.listenerAttached = "true";
  }
  if (payWithCryptoBtn && !payWithCryptoBtn.dataset.listenerAttached) {
    payWithCryptoBtn.addEventListener("click", window.payWithCrypto);
    payWithCryptoBtn.dataset.listenerAttached = "true";
  }
}

// Define crypto functions globally - Get DOM elements dynamically when called
window.openCryptoModal = function(planId, planName, amountEth) {
  const cryptoModal = document.getElementById("cryptoPaymentModal");
  const cryptoSelectedPlanName = document.getElementById("cryptoSelectedPlanName");
  const cryptoSelectedAmount = document.getElementById("cryptoSelectedAmount");
  const cryptoStatus = document.getElementById("cryptoStatus");
  const payWithCryptoBtn = document.getElementById("payWithCryptoBtn");
  
  selectedPlanId = planId;
  selectedPlanName = planName;
  selectedAmountEth = amountEth;

  if (cryptoSelectedPlanName) {
    cryptoSelectedPlanName.textContent = planName;
  }
  if (cryptoSelectedAmount) {
    cryptoSelectedAmount.textContent = `${amountEth} ETH`;
  }
  if (cryptoStatus) {
    cryptoStatus.textContent = window.currentAccount
      ? `Wallet connected: ${window.currentAccount.slice(0, 6)}...${window.currentAccount.slice(-4)}`
      : "Wallet not connected";
    cryptoStatus.classList.remove("error");
  }
  if (payWithCryptoBtn) payWithCryptoBtn.disabled = !window.currentAccount;

  if (cryptoModal) cryptoModal.classList.remove("hidden");
  
  // Ensure button listeners are attached
  setupCryptoModalListeners();
};

window.closeCryptoModal = function() {
  const cryptoModal = document.getElementById("cryptoPaymentModal");
  if (cryptoModal) cryptoModal.classList.add("hidden");
};

window.connectWallet = async function() {
  const cryptoStatus = document.getElementById("cryptoStatus");
  const payWithCryptoBtn = document.getElementById("payWithCryptoBtn");
  
  if (!window.ethereum) {
    showNotification("MetaMask not detected. Please install MetaMask from https://metamask.io", 'error', 6000);
    return;
  }

  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    window.currentChainId = chainId;

    if (chainId !== window.SEPOLIA_CHAIN_ID && chainId !== window.POLYGON_CHAIN_ID) {
      showConfirm(
        "You are on the wrong network.<br><br>Switch to Sepolia Testnet for testing with free test ETH?",
        async () => {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: window.SEPOLIA_CHAIN_ID }],
            });
            window.currentChainId = window.SEPOLIA_CHAIN_ID;
            showNotification("Switched to Sepolia Testnet", 'success');
          } catch (switchErr) {
            if (switchErr.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: window.SEPOLIA_CHAIN_ID,
                    chainName: "Sepolia Testnet",
                    rpcUrls: ["https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
                    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                    blockExplorerUrls: ["https://sepolia.etherscan.io"],
                  },
                ],
              });
              showNotification("Sepolia Testnet added to wallet", 'success');
            }
          }
        }
      );
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.currentAccount = accounts[0];

    if (cryptoStatus) {
      cryptoStatus.classList.remove("error");
      cryptoStatus.classList.add("success");
      cryptoStatus.textContent = `Connected: ${window.currentAccount.slice(0, 6)}...${window.currentAccount.slice(-4)}`;
    }
    if (payWithCryptoBtn) payWithCryptoBtn.disabled = false;

    console.log("Wallet connected:", window.currentAccount);
  } catch (err) {
    console.error("connectWallet error", err);
    if (cryptoStatus) {
      cryptoStatus.classList.add("error");
      cryptoStatus.textContent = "Wallet connection rejected.";
    }
  }
};

window.payWithCrypto = async function() {
  const cryptoStatus = document.getElementById("cryptoStatus");
  
  if (!window.currentAccount) {
    await window.connectWallet();
    if (!window.currentAccount) return;
  }

  if (!selectedPlanId || !selectedAmountEth) {
    showNotification("No plan selected.", 'warning');
    return;
  }

  if (!window.ethereum) {
    showNotification("MetaMask wallet not detected.", 'error');
    return;
  }

  try {
    const valueHex = ethToWeiHex(selectedAmountEth);

    if (cryptoStatus) {
      cryptoStatus.classList.remove("error");
      cryptoStatus.textContent = "Waiting for wallet confirmation…";
    }

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: window.currentAccount,
          to: window.OWNER_WALLET_ADDRESS,
          value: valueHex,
        },
      ],
    });

    if (cryptoStatus) {
      cryptoStatus.classList.remove("error");
      cryptoStatus.classList.add("success");
      cryptoStatus.textContent = `Transaction sent: ${txHash.slice(0, 10)}...`;
    }

    // Update Firestore based on payment type
    await updatePaymentStatus(selectedPlanId, txHash);

    showNotification("Payment transaction sent! Your account will be updated once confirmed on the blockchain.", 'success', 6000);
    window.closeCryptoModal();
  } catch (err) {
    console.error("payWithCrypto error", err);
    if (cryptoStatus) {
      cryptoStatus.classList.add("error");
      cryptoStatus.textContent = "Payment failed or rejected.";
    }
    showNotification("Payment failed or cancelled.", 'error');
  }
};

// =============== BUTTON UTILITY FUNCTIONS ===============
function disableButton(btn) {
  if (!btn) return;
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'not-allowed';
  const originalText = btn.innerText;
  btn.dataset.originalText = originalText;
  btn.dataset.originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
}

function enableButton(btn) {
  if (!btn) return;
  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  if (btn.dataset.originalHtml) {
    btn.innerHTML = btn.dataset.originalHtml;
  } else if (btn.dataset.originalText) {
    btn.innerText = btn.dataset.originalText;
  }
}

function disableAllButtons(container) {
  if (!container) container = document;
  const buttons = container.querySelectorAll('button:not([disabled])');
  buttons.forEach(btn => {
    btn.dataset.wasEnabled = 'true';
    disableButton(btn);
  });
  return buttons;
}

function enableAllButtons(buttons) {
  if (!buttons) return;
  buttons.forEach(btn => {
    if (btn.dataset.wasEnabled === 'true') {
      enableButton(btn);
      delete btn.dataset.wasEnabled;
    }
  });
}

// =============== Video Background Autoplay ===============
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.hero-video');
  if (video) {
    // Force play with error handling
    video.play().catch(function(error) {
      console.log('Video autoplay failed:', error);
      // Retry after user interaction
      document.body.addEventListener('click', function() {
        video.play().catch(e => console.log('Video play retry failed:', e));
      }, { once: true });
    });
  }
});

// =============== Mobile Menu Toggle ===============
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navRight = document.querySelector(".nav-right");

if (navToggle && navRight) {
  navToggle.addEventListener("click", () => {
    navRight.classList.toggle("open");
    navToggle.classList.toggle("active");
    // change icon
    navToggle.innerHTML = navRight.classList.contains("open")
      ? "<i class='fas fa-times'></i>"
      : "<i class='fas fa-bars'></i>";
  });

  // Close menu on link click (mobile)
  if (navMenu) {
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (navRight.classList.contains("open")) {
          navRight.classList.remove("open");
          navToggle.innerHTML = "<i class='fas fa-bars'></i>";
        }
      });
    });
  }
}

// =============== Sticky Header ===============
const header = document.getElementById("header");
const showOnPx = 50;
const scrollContainer = () => document.documentElement || document.body;

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// =============== Back To Top Button ===============
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =============== Animated Counters ===============
const counters = document.querySelectorAll(".stat-number");
const speed = 150; // lower = faster

const runCounters = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const updateCount = () => {
        const target = +counter.dataset.target;
        const count = +counter.innerText.replace(/[^0-9]/g, "");
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = counter.dataset.target.includes("+") || target > 1000
            ? `${target.toLocaleString()}+`
            : target.toLocaleString();
        }
      };
      updateCount();
      observer.unobserve(counter);
    }
  });
};

const counterObserver = new IntersectionObserver(runCounters, {
  threshold: 0.6,
});

counters.forEach((counter) => counterObserver.observe(counter));

// =============== Testimonials Carousel ===============
const track = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");
const dotsContainer = document.getElementById("carouselDots");
let slideIndex = 0;
let slidesToShow = 1;
let slides = [];

if (track) {
  slides = Array.from(track.children);
  // Create dots
  slides.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("carousel-dot");
    if (idx === 0) dot.classList.add("active");
    dot.dataset.index = idx;
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  const updateCarousel = () => {
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach((d) => d.classList.remove("active"));
    dots[slideIndex].classList.add("active");
  };

  const moveToNext = () => {
    slideIndex = (slideIndex + 1) % slides.length;
    updateCarousel();
  };

  const moveToPrev = () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  };

  nextBtn.addEventListener("click", moveToNext);
  prevBtn.addEventListener("click", moveToPrev);
  dots.forEach((dot) => dot.addEventListener("click", (e) => {
    slideIndex = +e.target.dataset.index;
    updateCarousel();
  }));

  // Auto-play every 6 seconds
  let autoPlay = setInterval(moveToNext, 6000);
  [nextBtn, prevBtn, ...dots].forEach((el) => {
    el.addEventListener("mouseenter", () => clearInterval(autoPlay));
    el.addEventListener("mouseleave", () => (autoPlay = setInterval(moveToNext, 6000)));
  });
}

// =============== Scroll Reveal Animations ===============
const animatedElements = document.querySelectorAll(".animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-slide-up");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

animatedElements.forEach((el) => {
  // Pause animation until reveal
  el.style.animationPlayState = "paused";
  revealObserver.observe(el);
});


// =============== Hero Dashboard Card Carousel ===============
document.addEventListener("DOMContentLoaded", function () {
  const stack = document.querySelector(".hero-dashboard-stack");
  if (!stack) return;

  let cards = Array.from(stack.querySelectorAll(".hero-dashboard-card"));
  if (cards.length < 3) return;

  const applyLayout = () => {
    // Clear classes
    cards.forEach((c) => {
      c.classList.remove(
        "hero-dashboard-card--left",
        "hero-dashboard-card--center",
        "hero-dashboard-card--right"
      );
    });

    // Map array positions to visual positions
    cards[0].classList.add("hero-dashboard-card--left");
    cards[1].classList.add("hero-dashboard-card--center");
    cards[2].classList.add("hero-dashboard-card--right");
  };

  const rotateCards = () => {
    // Move first card to end -> change order -> new layout
    const first = cards.shift();
    cards.push(first);
    applyLayout();
  };

  // Initial layout
  applyLayout();

  // Click: when user clicks ANY card, rotate to next role
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      rotateCards();
    });
  });

  // Auto-rotate every 5 seconds
  let autoTimer = setInterval(rotateCards, 5000);

  // When user interacts, reset timer (so it feels responsive)
  stack.addEventListener("click", () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(rotateCards, 5000);
  });
});
const CHAT_SECRET = "clubconnect-demo-team-secret"; // demo only

function encryptMessage(plainText) {
  return CryptoJS.AES.encrypt(plainText, CHAT_SECRET).toString();
}

function decryptMessage(cipherText) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, CHAT_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8) || "[decryption error]";
  } catch (e) {
    return "[decryption error]";
  }
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Keep local references for use within app.js
const OWNER_WALLET_ADDRESS = window.OWNER_WALLET_ADDRESS;
const PAYMENT_AMOUNTS = window.PAYMENT_AMOUNTS;
const SEPOLIA_CHAIN_ID = window.SEPOLIA_CHAIN_ID;
const POLYGON_CHAIN_ID = window.POLYGON_CHAIN_ID;
let currentAccount = window.currentAccount;
let currentChainId = window.currentChainId;

// Crypto functions and helpers already defined at top of file

async function updatePaymentStatus(planId, txHash) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userData = { 
      registrationPaid: true,
      registrationTxHash: txHash,
      registrationPaidAt: new Date()
    };

    await updateDoc(userRef, userData);
    console.log("Payment status updated in Firestore");
  } catch (err) {
    console.error("Error updating payment status:", err);
  }
}

// Attach to pricing buttons
const payButtons = document.querySelectorAll(".pay-crypto-btn");
payButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const planId = btn.getAttribute("data-plan-id");
    const planName = btn.getAttribute("data-plan-name") || "Selected Plan";
    const amountEth =
      btn.getAttribute("data-amount-eth") || "0.0005";
    openCryptoModal(planId, planName, amountEth);
  });
});


// Try to setup listeners on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCryptoModalListeners);
} else {
  setupCryptoModalListeners();
}


