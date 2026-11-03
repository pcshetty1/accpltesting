const clientsProductsData = [
  {
    id: "macas",
    name: "MACAS",
    logo: "",
    products: [
      {
        name: "Clutch Plate",
        description: "Clutch plate product.",
        images: ["./images/clientproduct/macas pressure plate.jpg"],
      },
      {
        name: "Pressure Plate",
        description: "Pressure plate product.",
        images: ["./images/clientproduct/macas cltch disc.jpg"],
      },
    ],
  },
  {
    id: "ceekay",
    name: "CEEKAY",
    logo: "",
    products: [
      { 
        name: "Clutch Parts", 
        description: "Clutch components.", 
        images: ["./images/clientproduct/CEEKAY  CLUTCH PARTS.jpg"] 
      },
    ],
  },
  {
    id: "contitech",
    name: "CONTITECH",
    logo: "",
    products: [
      { name: "Fan Belt", 
        description: "Fan belt product.", 
        images: ["./images/clientproduct/CONTITECH FAN BELT TIMING BELT.jpg"] 
      },
    ],
  },
  {
    id: "denso",
    name: "DENSO",
    logo: "",
    products: [
      { 
        name: "Spark Plug", 
        description: "Spark plug product.", 
        images: ["./images/clientproduct/DENSO SPARK PLUG.jpg"] 
      },
      { 
        name: "Compresser", 
        description: "Feed pump product.", 
        images: ["./images/clientproduct/DENSO COMPRESSER.jpg"] 
      },
      { 
        name: "Horn", 
        description: "Horn product.", 
        images: ["./images/clientproduct/DENSO HORN.jpg"] 
      },
    ],
  },
  {
    id: "embros-auto",
    name: "EMBROS AUTO",
    logo: "",
    products: [
      { name: "Axle Shaft", description: "Axle shaft product.", images: [] },
    ],
  },
  {
    id: "gs-international",
    name: "G.S. INTERNATIONAL",
    logo: "",
    products: [
      {
        name: "CBAM / SPDT / HBYT / HBZT / KPMT / MBJS / GNLM / UBBS / MBTB / ASGM / CHRM / SHBC / SHBF",
        description: "Product codes supplied for G.S. International.",
        images: [],
      },
    ],
  },
  {
    id: "haldex",
    name: "HALDEX",
    logo: "",
    products: [
      {
        name: "Automatic Brake Adjuster",
        description: "Automatic brake adjuster product.",
        images: [],
      },
      {
        name: "Manual Brake Adjuster",
        description: "Manual brake adjuster product.",
        images: [],
      },
    ],
  },
  {
    id: "henkel",
    name: "HENKEL",
    logo: "",
    products: [
      { name: "LOCTITE", description: "Adhesive product listing.", images: [] },
    ],
  },
  {
    id: "nbc",
    name: "NBC",
    logo: "",
    products: [
      { name: "Bearings", description: "Bearing product listing.", images: [] },
    ],
  },
  {
    id: "neolite",
    name: "NEOLITE",
    logo: "",
    products: [
      {
        name: "Electrical Parts",
        description: "Electrical parts product.",
        images: [],
      },
      { name: "Side Mirror", description: "Side mirror product.", images: [] },
      {
        name: "Side Indicator",
        description: "Side indicator product.",
        images: [],
      },
    ],
  },
  {
    id: "osram",
    name: "OSRAM",
    logo: "",
    products: [
      { name: "Bulbs", description: "Bulb product listing.", images: [] },
    ],
  },
  {
    id: "purolator",
    name: "PUROLATOR",
    logo: "",
    products: [
      { name: "Oil Filter", description: "Oil filter product.", images: [] },
      {
        name: "Diesel Filter & Filter Kit",
        description: "Diesel filtration products.",
        images: [],
      },
      { name: "Coolant", description: "Coolant product listing.", images: [] },
    ],
  },
  {
    id: "talbros",
    name: "OH TALBROS",
    logo: "",
    products: [
      {
        name: "Suspension",
        description: "Suspension product listing.",
        images: [],
      },
      {
        name: "Steering Gears",
        description: "Steering gear product.",
        images: [],
      },
      { name: "Drive Shaft", description: "Drive shaft product.", images: [] },
      {
        name: "Strut & Mount",
        description: "Strut and mount products.",
        images: [],
      },
    ],
  },
  {
    id: "ramson",
    name: "RAMSON",
    logo: "",
    products: [
      { name: "Cable", description: "Cable product listing.", images: [] },
    ],
  },
  {
    id: "super-circle",
    name: "SUPER CIRCLE",
    logo: "",
    products: [
      { name: "Brake Pads", description: "Brake pad product.", images: [] },
      { name: "Brake Shoes", description: "Brake shoe product.", images: [] },
      {
        name: "Brake Linings",
        description: "Brake lining product.",
        images: [],
      },
    ],
  },
  {
    id: "texspin",
    name: "TEXSPIN",
    logo: "",
    products: [
      { name: "Clutch", description: "Clutch product listing.", images: [] },
      { name: "Water Pump", description: "Water pump product.", images: [] },
      {
        name: "Steering",
        description: "Steering product listing.",
        images: [],
      },
      { name: "Bearings", description: "Bearing product listing.", images: [] },
      { name: "CSC Part", description: "CSC part product.", images: [] },
      {
        name: "Kingpin & U.J. Cross",
        description: "Kingpin and universal joint cross products.",
        images: [],
      },
    ],
  },
  {
    id: "veethree",
    name: "VEETHREE",
    logo: "",
    products: [
      { name: "Meters", description: "Meter product listing.", images: [] },
      { name: "Cables", description: "Cable product listing.", images: [] },
    ],
  },
];

const PRODUCT_CONFIG = { contactUrl: "contact.html" };
let activeModalClient = null;
let previousFocusedElement = null;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#clients-products-container");
  if (!container) {
    console.error(
      'AACPL Products: Add <section id="clients-products-container"></section> to the HTML.',
    );
    return;
  }
  renderClientProducts(container);
  initializeProductModal();
});

function escapeHTML(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}
function productImages(product) {
  if (!product) return [];
  if (Array.isArray(product.images)) return product.images.filter(Boolean);
  if (typeof product.images === "string" && product.images.trim())
    return [product.images.trim()];
  return [];
}
function firstProductImage(product) {
  return productImages(product)[0] || "";
}

function renderClientProducts(container) {
  container.innerHTML = "";
  clientsProductsData.forEach((client) => {
    const card = document.createElement("article");
    card.className = "client-product-card";
    card.dataset.clientId = client.id;
    const firstProduct = client.products[0] || {
      name: "Product details to be added",
      description: "",
      images: [],
    };
    const firstImage = firstProductImage(firstProduct);

    card.innerHTML = `
      <header class="client-product-card__header">
        ${client.logo ? `<img class="client-product-card__logo" src="${escapeHTML(client.logo)}" alt="${escapeHTML(client.name)} logo" loading="lazy">` : ""}
        <h2 class="client-product-card__company">${escapeHTML(client.name)}</h2>
      </header>
      <div class="client-product-card__carousel" aria-label="${escapeHTML(client.name)} products">
        <div class="client-product-card__image-wrap">
          <img class="client-product-card__image" ${firstImage ? `src="${escapeHTML(firstImage)}"` : ""} alt="${escapeHTML(firstProduct.name)}" loading="lazy" ${firstImage ? "" : "hidden"}>
          <div class="client-product-card__placeholder" ${firstImage ? "hidden" : ""}><span>Product image will be added soon.</span></div>
          <button type="button" class="product-arrow product-arrow--prev" aria-label="Previous product" ${client.products.length <= 1 ? "hidden" : ""}>❮</button>
          <button type="button" class="product-arrow product-arrow--next" aria-label="Next product" ${client.products.length <= 1 ? "hidden" : ""}>❯</button>
          <div class="client-product-card__details" aria-live="polite">
            <h3 class="client-product-card__product-name">${escapeHTML(firstProduct.name)}</h3>
            <p class="client-product-card__description">${escapeHTML(firstProduct.description || "")}</p>
            <p class="client-product-card__counter">${client.products.length ? "1" : "0"} / ${client.products.length}</p>
          </div>
        </div>
      </div>
      <div class="client-product-card__actions">
        <button type="button" class="product-view-more" data-action="view-more" ${client.products.length ? "" : "disabled"}>View More</button>
        <a class="product-enquiry" href="${escapeHTML(PRODUCT_CONFIG.contactUrl)}?company=${encodeURIComponent(client.name)}">Enquire Now <span aria-hidden="true">→</span></a>
      </div>`;
    container.appendChild(card);
    initializeClientCarousel(card, client);
  });
}

function initializeClientCarousel(card, client) {
  let currentIndex = 0;
  const image = card.querySelector(".client-product-card__image");
  const placeholder = card.querySelector(".client-product-card__placeholder");
  const name = card.querySelector(".client-product-card__product-name");
  const description = card.querySelector(".client-product-card__description");
  const counter = card.querySelector(".client-product-card__counter");
  const prev = card.querySelector(".product-arrow--prev");
  const next = card.querySelector(".product-arrow--next");

  function showProduct(index) {
    if (!client.products.length) {
      image.hidden = true;
      placeholder.hidden = false;
      name.textContent = "Product details to be added";
      description.textContent = "";
      counter.textContent = "0 / 0";
      prev.hidden = true;
      next.hidden = true;
      return;
    }
    currentIndex = (index + client.products.length) % client.products.length;
    const product = client.products[currentIndex];
    const path = firstProductImage(product);
    name.textContent = product.name;
    description.textContent = product.description || "";
    counter.textContent = `${currentIndex + 1} / ${client.products.length}`;
    if (path) {
      image.src = path;
      image.alt = product.name;
      image.hidden = false;
      placeholder.hidden = true;
    } else {
      image.removeAttribute("src");
      image.alt = `${product.name}: image not available`;
      image.hidden = true;
      placeholder.hidden = false;
    }
    prev.hidden = next.hidden = client.products.length <= 1;
  }
  prev.addEventListener("click", () => showProduct(currentIndex - 1));
  next.addEventListener("click", () => showProduct(currentIndex + 1));
  card
    .querySelector(".product-view-more")
    .addEventListener("click", () => openProductModal(client));
  image.addEventListener("error", () => {
    image.hidden = true;
    placeholder.hidden = false;
  });
  showProduct(0);
}

function initializeProductModal() {
  const modal = document.querySelector("#productModal");
  if (!modal) return;
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("product-modal-open");
    activeModalClient = null;
    if (
      previousFocusedElement &&
      typeof previousFocusedElement.focus === "function"
    )
      previousFocusedElement.focus();
  }
  modal.addEventListener("click", (event) => {
    if (
      event.target.matches("[data-close-modal]") ||
      event.target.closest("#closeProductModal")
    )
      closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "Tab") {
      const focusable = [
        ...modal.querySelectorAll("button:not([disabled]), a[href]"),
      ].filter((el) => !el.hidden);
      if (!focusable.length) return;
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  window.closeAACPLProductModal = closeModal;
}

function openProductModal(client) {
  const modal = document.querySelector("#productModal");
  if (!modal) return;
  activeModalClient = client;
  previousFocusedElement = document.activeElement;
  modal.querySelector("#modalCompanyName").textContent = client.name;
  const gallery = modal.querySelector("#productModalGallery");
  gallery.innerHTML = "";

  /* Important: collect images only from this selected company, across its products. */
  const companyImages = client.products.flatMap((product) =>
    productImages(product).map((src, index) => ({
      src,
      productName: product.name,
      imageNumber: index + 1,
    })),
  );

  if (!companyImages.length) {
    const empty = document.createElement("p");
    empty.className = "product-modal__empty";
    empty.textContent = `No product images have been added for ${client.name} yet. Add paths to the images arrays in product.js.`;
    gallery.appendChild(empty);
  } else {
    companyImages.forEach((item) => {
      const article = document.createElement("article");
      article.className = "modal-product-item";
      const wrap = document.createElement("div");
      wrap.className = "modal-product-image-wrap";
      const img = document.createElement("img");
      img.className = "modal-product-image";
      img.src = item.src;
      img.alt = `${item.productName}, image ${item.imageNumber}`;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        article.remove();
        if (!gallery.querySelector(".modal-product-item")) {
          const empty = document.createElement("p");
          empty.className = "product-modal__empty";
          empty.textContent = `No available image files were found for ${client.name}. Check the image paths in product.js.`;
          gallery.appendChild(empty);
        }
      });
      const caption = document.createElement("p");
      caption.className = "modal-product-caption";
      caption.textContent =
        item.productName +
        (productImages(client.products.find((p) => p.name === item.productName))
          .length > 1
          ? ` — Image ${item.imageNumber}`
          : "");
      wrap.appendChild(img);
      article.append(wrap, caption);
      gallery.appendChild(article);
    });
  }

  const enquiry = modal.querySelector("#modalEnquireBtn");
  enquiry.href = `${PRODUCT_CONFIG.contactUrl}?company=${encodeURIComponent(client.name)}`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("product-modal-open");
  modal.querySelector("#closeProductModal").focus();
}
