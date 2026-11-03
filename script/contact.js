
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("aacplContactForm");
  const feedback = document.getElementById("contactFeedback");

  // Replace with AACPL's WhatsApp number:
  // Country code + phone number, digits only.
  const WHATSAPP_NUMBER = "919876543210";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "";

    if (!form.reportValidity()) {
      return;
    }

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      feedback.textContent =
        "WhatsApp is not configured yet. Please update the company WhatsApp number in contact.js.";
      return;
    }

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const enquiryType = document.getElementById("enquiryType").value;
    const message = document.getElementById("contactMessage").value.trim();

    const whatsappMessage = [
      "Hello AACPL Team,",
      "",
      "I would like to make an enquiry.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      ...(email ? [`Email: ${email}`] : []),
      `Enquiry Type: ${enquiryType}`,
      "",
      "Message:",
      message,
      "",
      "Thank you."
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp from the user's submit action.
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    // if (whatsappWindow) {
    //   feedback.textContent =
    //     "WhatsApp opened with your enquiry. Review the message and press Send.";
    // } else {
    //   feedback.textContent =
    //     "If WhatsApp did not open, use this link: " + whatsappURL;
    // }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const locations = [
    {
      name: "Abhijeet Auto Components Pvt. Ltd.",
      shortName: "Uruli Devachi, Pune",
      label: "MAIN LOCATION",
      address: "Sr. No. 35/2/1, Mantarwadi, Opp. Lucky Weight Bridge, Uruli Devachi, Pune – 412308",
      note: "Visit our main location or open Google Maps for directions.",
      query: "Pimpri, Pune, Maharashtra"
    },
    {
      name: "Tal- Hatkanangle, Dist – Kolhapur",
      shortName: "Branch Office",
      label: "BRANCH LOCATION",
      address: "1634, Shiroli (Pulachi), Thamke Building, Behind S.M. Tractors, P.B. Road Tal- Hatkanangle, Dist – Kolhapur – 416 122",
      note: "View this branch on Google Maps and plan your visit.",
      query: "Replace with your second location address"
    },
    {
      name: "Location Three",
      shortName: "Warehouse",
      label: "WAREHOUSE",
      address: "Replace with the complete address of your third location.",
      note: "View this warehouse on Google Maps and get directions.",
      query: "Replace with your third location address"
    },
    {
      name: "Location Four",
      shortName: "Distribution Center",
      label: "DISTRIBUTION CENTER",
      address: "Replace with the complete address of your fourth location.",
      note: "View this distribution center on Google Maps and get directions.",
      query: "Replace with your fourth location address"
    }
  ];

  const map = document.getElementById("locationMap");
  const name = document.getElementById("locationName");
  const label = document.getElementById("locationLabel");
  const address = document.getElementById("locationAddress");
  const note = document.getElementById("locationNote");
  const directions = document.getElementById("locationDirections");
  const cards = document.querySelectorAll(".location-card");

  function selectLocation(index) {
    const location = locations[index];

    if (!location) return;

    const encodedQuery = encodeURIComponent(location.query);

    map.src =
      `https://maps.google.com/maps?q=${encodedQuery}&z=14&output=embed`;

    map.title = `${location.name} on Google Maps`;
    name.textContent = location.name;
    label.textContent = location.label;
    address.textContent = location.address;
    note.textContent = location.note;

    directions.href =
      `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === index;

      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-pressed", String(isActive));
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      selectLocation(Number(card.dataset.location));
    });
  });

  // The first location is selected on initial page load.
  selectLocation(0);
});
