// js/booknow.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const travelTypeSelect = document.getElementById("travelType");
  const paymentTypeSelect = document.getElementById("paymentType");
  const travelersInput = document.getElementById("travelersNumber");
  const priceDisplay = document.getElementById("priceDisplay");
  const paymentContainer = document.getElementById("onlinePaymentContainer");
  const paymentMethodSelect = document.getElementById("paymentMethod");
  const paymentMethodArea = document.getElementById("paymentMethodArea");
  const confirmBookingBtn = document.getElementById("confirmBookingBtn");

  // Modal elements
  const modal = document.getElementById("confirmationModal");
  const modalMsg = document.getElementById("modalMsg");
  const modalSendBtn = document.getElementById("modalSendBtn");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");

  // Price per person
  const pricePerPerson = { Public: 1000, Private: 2500 };

  // Track simulated payment status
  let paymentCompleted = false;
  let lastPaymentMethod = ""; // "UPI" | "Card" | "NetBanking"

  // Helper: update price
  function updatePrice() {
    const type = travelTypeSelect.value;
    const travelers = parseInt(travelersInput.value) || 0;
    if (type && travelers > 0) {
      const total = pricePerPerson[type] * travelers;
      priceDisplay.innerHTML = `Total Price: ₹${total}`;
    } else {
      priceDisplay.innerHTML = '';
    }
  }
  travelTypeSelect.addEventListener("change", updatePrice);
  travelersInput.addEventListener("input", updatePrice);

  // Show/hide online payment area based on paymentType
  paymentTypeSelect.addEventListener("change", () => {
    const val = paymentTypeSelect.value;
    paymentCompleted = false;
    lastPaymentMethod = "";
    paymentMethodSelect.value = "";
    paymentMethodArea.innerHTML = "";
    if (val === "Online") {
      paymentContainer.style.display = "block";
    } else {
      paymentContainer.style.display = "none";
    }
  });

  // When user chooses UPI/Card/NetBanking
  paymentMethodSelect && paymentMethodSelect.addEventListener("change", (e) => {
    const method = e.target.value;
    paymentCompleted = false;
    lastPaymentMethod = "";
    renderPaymentMethod(method);
  });

  // Render appropriate payment UI (simulation only)
  function renderPaymentMethod(method) {
    paymentMethodArea.innerHTML = "";
    if (!method) return;

    if (method === "UPI") {
      // Show sample GPay-style QR and instructions
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.alignItems = "center";
      wrapper.style.gap = "12px";

      const hint = document.createElement("p");
      hint.textContent = "Scan the QR (sample) using Google Pay / PhonePe / Paytm. Then click 'I've Paid'.";
      hint.style.margin = "0 0 6px 0";
      wrapper.appendChild(hint);

      // Sample QR - using placeholder QR image (you can replace with a real QR later)
      const qr = document.createElement("img");
      qr.src = "https://tse4.mm.bing.net/th/id/OIP.AzGsz6YA4Aup3paQ_poIAwHaHa?pid=Api&P=0&h=220";
      qr.alt = "GPay QR sample";
      qr.style.width = "220px";
      qr.style.height = "220px";
      qr.style.borderRadius = "12px";
      qr.style.objectFit = "cover";
      qr.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
      wrapper.appendChild(qr);

      const paidBtn = document.createElement("button");
      paidBtn.type = "button";
      paidBtn.textContent = "I've Paid";
      paidBtn.style.padding = "10px 14px";
      paidBtn.style.borderRadius = "10px";
      paidBtn.style.border = "none";
      paidBtn.style.cursor = "pointer";
      paidBtn.style.fontWeight = "600";
      paidBtn.style.background = "#f4d34d";
      paidBtn.addEventListener("click", () => {
        paymentCompleted = true;
        lastPaymentMethod = "UPI";
        showTempToast("Payment marked as completed (simulated).");
      });
      wrapper.appendChild(paidBtn);

      paymentMethodArea.appendChild(wrapper);
    }

    if (method === "Card") {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "8px";

      wrapper.innerHTML = `
        <input id="cardNumber" type="text" placeholder="Card number (xxxx xxxx xxxx xxxx)" maxlength="19" style="padding:12px; border-radius:10px;">
        <input id="cardName" type="text" placeholder="Name on card" style="padding:12px; border-radius:10px;">
        <div style="display:flex; gap:8px;">
          <input id="cardExp" type="text" placeholder="MM/YY" maxlength="5" style="flex:1; padding:12px; border-radius:10px;">
          <input id="cardCvv" type="password" placeholder="CVV" maxlength="4" style="width:110px; padding:12px; border-radius:10px;">
        </div>
      `;
      const payBtn = document.createElement("button");
      payBtn.type = "button";
      payBtn.textContent = "Pay Now (simulate)";
      payBtn.style.padding = "10px 14px";
      payBtn.style.borderRadius = "10px";
      payBtn.style.border = "none";
      payBtn.style.cursor = "pointer";
      payBtn.style.fontWeight = "600";
      payBtn.style.background = "#f4d34d";

      payBtn.addEventListener("click", () => {
        // Basic validation for simulation
        const cn = document.getElementById("cardNumber").value.replace(/\s/g, '');
        const nm = document.getElementById("cardName").value.trim();
        const exp = document.getElementById("cardExp").value.trim();
        const cvv = document.getElementById("cardCvv").value.trim();

        if (cn.length < 12 || nm.length < 2 || exp.length < 4 || cvv.length < 3) {
          alert("Please enter valid (simulated) card details.");
          return;
        }
        paymentCompleted = true;
        lastPaymentMethod = "Card";
        showTempToast("Card payment simulated as completed.");
      });

      wrapper.appendChild(payBtn);
      paymentMethodArea.appendChild(wrapper);
    }

    if (method === "NetBanking") {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "8px";

      const bankSelect = document.createElement("select");
      bankSelect.innerHTML = `
        <option value="">Select Bank</option>
        <option>State Bank of India</option>
        <option>HDFC Bank</option>
        <option>ICICI Bank</option>
        <option>Axis Bank</option>
        <option>Bank of Baroda</option>
      `;
      bankSelect.style.padding = "12px";
      bankSelect.style.borderRadius = "10px";

      const payBtn = document.createElement("button");
      payBtn.type = "button";
      payBtn.textContent = "Pay via NetBanking (simulate)";
      payBtn.style.padding = "10px 14px";
      payBtn.style.borderRadius = "10px";
      payBtn.style.border = "none";
      payBtn.style.cursor = "pointer";
      payBtn.style.fontWeight = "600";
      payBtn.style.background = "#f4d34d";

      payBtn.addEventListener("click", () => {
        if (!bankSelect.value) {
          alert("Please select a bank (simulated).");
          return;
        }
        paymentCompleted = true;
        lastPaymentMethod = "NetBanking";
        showTempToast("NetBanking payment simulated as completed.");
      });

      wrapper.appendChild(bankSelect);
      wrapper.appendChild(payBtn);
      paymentMethodArea.appendChild(wrapper);
    }
  }

  // Small toast helper
  function showTempToast(text) {
    const t = document.createElement("div");
    t.textContent = text;
    t.style.position = "fixed";
    t.style.bottom = "28px";
    t.style.left = "50%";
    t.style.transform = "translateX(-50%)";
    t.style.background = "#222";
    t.style.color = "#fff";
    t.style.padding = "10px 14px";
    t.style.borderRadius = "8px";
    t.style.zIndex = "99999";
    t.style.opacity = "0.95";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  // Booking ID generator
  function generateBookingID() {
    const t = Date.now().toString(36);
    const r = Math.random().toString(36).substring(2, 7).toUpperCase();
    return (t + "-" + r).toUpperCase();
  }

  // Format phone number for wa.me and sms: heuristics
  function formatPhoneForLinks(raw) {
    if (!raw) return "";
    let s = raw.trim();
    s = s.replace(/\s+/g, '');
    // remove leading +
    if (s.startsWith('+')) s = s.substring(1);
    // remove any non-digit
    s = s.replace(/\D/g, '');
    // If 10 digits assume India and prepend 91
    if (s.length === 10) {
      s = '91' + s;
    }
    // If starts with 0 and more than 10, remove leading zeros then prepend 91 if length becomes 10
    while (s.length > 0 && s[0] === '0') s = s.substring(1);
    if (s.length === 10) s = '91' + s;
    return s;
  }

  // Compose message string
  function composeMsg(details) {
    let msg = `Booking Confirmed!\n\n`;
    msg += `Booking ID: ${details.bookingId}\n`;
    msg += `Name: ${details.name}\n`;
    msg += `Email: ${details.email}\n`;
    msg += `Contact: ${details.contact}\n`;
    msg += `Destination: ${details.destination}\n`;
    msg += `Date: ${details.date}\n`;
    msg += `Travel Type: ${details.travelType}\n`;
    msg += `Payment Mode: ${details.paymentMode}\n`;
    msg += `Travelers: ${details.travelers}\n`;
    msg += `Total Price: ₹${details.totalPrice}\n\n`;
    msg += `Thank you for booking with DreamWay Travels!`;
    return msg;
  }

  // On form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Gather values
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const contact = document.getElementById("contactNumber").value.trim();
    const destination = document.getElementById("destinationSelect").value;
    const date = document.getElementById("travelDate").value;
    const travelers = parseInt(document.getElementById("travelersNumber").value) || 0;
    const travelType = travelTypeSelect.value;
    const paymentType = paymentTypeSelect.value;

    // Validate basics
    if (!name || !email || !contact || !destination || !date || !travelers || !travelType || !paymentType) {
      alert("Please fill all required fields.");
      return;
    }

    // If Online payment required, ensure user completed simulated payment
    if (paymentType === "Online") {
      if (!paymentMethodSelect || !paymentMethodSelect.value) {
        alert("Please select an online payment method.");
        return;
      }
      if (!paymentCompleted) {
        alert("Please complete the simulated payment (use the Pay/I've Paid button) before confirming booking.");
        return;
      }
    }

    // compute price
    const totalPrice = (pricePerPerson[travelType] || 0) * travelers;
    const bookingId = generateBookingID();

    // prepare details
    const details = {
      bookingId, name, email, contact, destination, date,
      travelType, paymentMode: paymentType + (paymentType === "Online" ? (" (" + (lastPaymentMethod || "Online") + ")") : ""), travelers, totalPrice
    };

    // Show confirmation modal with details
    const msg = composeMsg(details);
    modalMsg.textContent = msg;
    modalTitle.textContent = "Booking Confirmed";
    modal.style.display = "flex";

    // When user clicks "Send Confirmation" in modal, open mail/whatsapp/sms links
    modalSendBtn.onclick = () => {
      sendConfirmationToUser(details, msg);
    };

    // Close button simply closes modal and resets form
    modalCloseBtn.onclick = () => {
      modal.style.display = "none";
      form.reset();
      paymentContainer.style.display = "none";
      paymentMethodArea.innerHTML = "";
      paymentMethodSelect.value = "";
      priceDisplay.innerHTML = "";
      paymentCompleted = false;
      lastPaymentMethod = "";
    };
  });

  // Send confirmation: opens mailto, wa.me and sms (user device handlers)
  function sendConfirmationToUser(details, msg) {
    // Open email client to user's email
    const emailSubject = `Booking Confirmation - DreamWay Travels (ID: ${details.bookingId})`;
    const mailToLink = `mailto:${encodeURIComponent(details.email)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(msg)}`;
    window.open(mailToLink, "_blank");

    // Format phone for wa.me and sms
    const phoneForLinks = formatPhoneForLinks(details.contact);
    if (phoneForLinks) {
      // WhatsApp
      try {
        const waLink = `https://wa.me/${phoneForLinks}?text=${encodeURIComponent(msg)}`;
        window.open(waLink, "_blank");
      } catch (err) { /* ignore */ }

      // SMS (this handler works only on devices with sms: support)
      try {
        const smsLink = `sms:${phoneForLinks}?body=${encodeURIComponent(msg)}`;
        // Using window.location.href for sms works on mobile more reliably
        window.open(smsLink, "_blank");
      } catch (err) { /* ignore */ }
    } else {
      alert("Could not format the contact number for WhatsApp/SMS. Please ensure you entered a valid number.");
    }

    // Also show a quick toast and leave modal open for user to close
    showTempToast("Confirmation opened in Email / WhatsApp / SMS (device handlers).");
  }

  // Initialization: pre-bind some small UX
  updatePrice();
});
