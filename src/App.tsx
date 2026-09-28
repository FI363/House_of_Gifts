import { useState, useRef, useEffect } from "react";
import "./App.css";

/* ─── Types ─────────────────────────────────────────── */
export type Product = {
  id: string;
  category: "Hampers";
  name: string;
  price: string;
  moq: string;
  tag: string;
  description: string;
  details: string[];
  image: string;
};

/* ─── Media Resolver ────────────────────────────────── */
const productImages = import.meta.glob<string>("./assets/house_media/diwali-hamper-*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const getImg = (name: string) => productImages[`./assets/house_media/${name}`];

/* ─── Products Data ─────────────────────────────────── */
const HAMPERS: Product[] = [
  {
    id: "h-1",
    category: "Hampers",
    name: "Hamper 1",
    price: "₹650",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, cookies, an urli candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Cookies", "Urli candle", "6 chocolates"],
    image: getImg("diwali-hamper-01.jpg"),
  },
  {
    id: "h-2",
    category: "Hampers",
    name: "Hamper 2",
    price: "₹650",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, chocolates, and dhoop cones.",
    details: ["100g cashews", "100g almonds", "Candle", "6 chocolates", "Dhoop cones"],
    image: getImg("diwali-hamper-02.jpg"),
  },
  {
    id: "h-3",
    category: "Hampers",
    name: "Hamper 3",
    price: "₹850",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Candle", "6 chocolates"],
    image: getImg("diwali-hamper-03.jpg"),
  },
  {
    id: "h-4",
    category: "Hampers",
    name: "Hamper 4",
    price: "₹1,050",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, and a candle.",
    details: ["200g cashews", "200g almonds", "Candle"],
    image: getImg("diwali-hamper-04.jpg"),
  },
  {
    id: "h-5",
    category: "Hampers",
    name: "Hamper 5",
    price: "₹1,050",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, and a candle.",
    details: ["200g cashews", "200g almonds", "Candle"],
    image: getImg("diwali-hamper-05.jpg"),
  },
  {
    id: "h-6",
    category: "Hampers",
    name: "Hamper 6",
    price: "₹1,200",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Candle", "8 chocolates"],
    image: getImg("diwali-hamper-06.jpg"),
  },
  {
    id: "h-7",
    category: "Hampers",
    name: "Hamper 7",
    price: "₹1,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Candle", "8 chocolates"],
    image: getImg("diwali-hamper-07.jpg"),
  },
  {
    id: "h-8",
    category: "Hampers",
    name: "Hamper 8",
    price: "₹1,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-08.jpg"),
  },
  {
    id: "h-9",
    category: "Hampers",
    name: "Hamper 9",
    price: "₹1,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-09.jpg"),
  },
  {
    id: "h-10",
    category: "Hampers",
    name: "Hamper 10",
    price: "₹1,550",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, an urli candle, dhoop cones, and chocolates.",
    details: ["200g cashews", "200g almonds", "Urli candle", "Dhoop cones", "6 chocolates"],
    image: getImg("diwali-hamper-10.jpg"),
  },
  {
    id: "h-11",
    category: "Hampers",
    name: "Hamper 11",
    price: "₹1,800",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, and a candle.",
    details: ["200g cashews", "200g almonds", "Candle"],
    image: getImg("diwali-hamper-11.jpg"),
  },
  {
    id: "h-12",
    category: "Hampers",
    name: "Hamper 12",
    price: "₹2,050",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-12.jpg"),
  },
  {
    id: "h-13",
    category: "Hampers",
    name: "Hamper 13",
    price: "₹3,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-13.jpg"),
  },
];

/* ─── WhatsApp helper ────────────────────────────────── */
const WHATSAPP_PHONE = "919876543210";

function createWhatsAppLink(product?: Product) {
  if (!product) {
    const text = encodeURIComponent(
      "Hello The House of Gifts! I am browsing your Diwali 2026 Catalogue and would like to enquire about festive gifting options."
    );
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  }
  const text = encodeURIComponent(
    `Hello The House of Gifts!\n\nI am interested in ordering / enquiring about:\n• Product: ${product.name}\n• Category: ${product.category}\n• Price: ${product.price}\n• Minimum Order: ${product.moq}\n\nPlease share availability, bulk pricing, and dispatch details.`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

/* ─── Carousel Component ─────────────────────────────── */
function ProductCarouselRow({
  categoryTitle,
  categorySubtitle,
  categoryTag,
  items,
  onSelectProduct,
  reverse = false,
}: {
  categoryTitle: string;
  categorySubtitle: string;
  categoryTag: string;
  items: Product[];
  onSelectProduct: (p: Product) => void;
  reverse?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for a seamless continuous scroll loop
  const duplicatedItems = [...items, ...items, ...items];

  const handleManualScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-row-wrapper">
      {/* Category Row Header */}
      <div className="carousel-row-header">
        <div className="carousel-title-group">
          <span className="carousel-tag">{categoryTag}</span>
          <h2 className="carousel-category-title">{categoryTitle}</h2>
          <p className="carousel-category-subtitle">{categorySubtitle}</p>
        </div>

        {/* Carousel controls (pause indicator & manual scroll arrows) */}
        <div className="carousel-controls">
          <button
            className="carousel-control-btn"
            onClick={() => handleManualScroll("left")}
            aria-label={`Scroll ${categoryTitle} left`}
          >
            ←
          </button>
          <button
            className="carousel-control-btn"
            onClick={() => handleManualScroll("right")}
            aria-label={`Scroll ${categoryTitle} right`}
          >
            →
          </button>
          <span className="carousel-hover-hint">
            {isPaused ? "⏸ Paused (Hovering)" : "▶ Auto-scrolling · Hover to pause"}
          </span>
        </div>
      </div>

      {/* Horizontal Continuous Auto-Scroll Track */}
      <div
        className="carousel-viewport"
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`carousel-track ${reverse ? "carousel-track--reverse" : ""} ${
            isPaused ? "carousel-track--paused" : ""
          }`}
        >
          {duplicatedItems.map((product, idx) => (
            <article
              key={`${product.id}-${idx}`}
              className="catalogue-card"
              onClick={() => onSelectProduct(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelectProduct(product)}
              aria-label={`View ${product.name}, price ${product.price}`}
            >
              <div className="catalogue-card-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="catalogue-card-img"
                />
                <div className="catalogue-card-badge">{product.tag}</div>
                <div className="catalogue-card-hover-action">
                  <span>View Details & Enquire ↗</span>
                </div>
              </div>

              <div className="catalogue-card-info">
                <h3 className="catalogue-card-title">{product.name}</h3>
                <div className="catalogue-card-meta">
                  <span className="catalogue-card-price">{product.price}</span>
                  <span className="catalogue-card-moq">Min. {product.moq}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main App Component ─────────────────────────────── */
export default function App() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show topbar at or near top of the page
      if (currentScrollY <= 40) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY + 6) {
        // Scrolling down -> hide topbar
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY - 6) {
        // Scrolling up -> show topbar
        setHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (activeProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  return (
    <div className="app">
      {/* ─── HEADER / NAVIGATION ──────────────────────── */}
      <header className={`site-header ${!headerVisible ? "site-header--hidden" : ""}`}>
        <a href="#hero" className="brand-lockup">
          <span className="brand-crest">🪔</span>
          <div className="brand-text">
            <span className="brand-name">THE HOUSE OF GIFTS</span>
            <span className="brand-sub">DIWALI CATALOGUE · 2026</span>
          </div>
        </a>

        <nav className="header-nav">
          <a href="#collections">Collections</a>
          <a href="#hampers">Hampers</a>
          <a href="#contact">Concierge & Contact</a>
        </nav>

        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="header-whatsapp-btn"
        >
          <span className="whatsapp-icon">💬</span>
          <span>WhatsApp Enquiry</span>
        </a>
      </header>

      {/* ─── HERO SECTION ─────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-sparkle">✦</span>
              <span>FESTIVE DIWALI CATALOGUE · 2026</span>
              <span className="badge-sparkle">✦</span>
            </div>

            <h1 className="hero-heading">
              The Art of Festive Gifting,
              <br />
              <span className="hero-heading-accent">Curated with Light.</span>
            </h1>

            <p className="hero-subtext">
              Explore 13 thoughtfully assembled Diwali hampers featuring dry
              fruits, chocolates, candles, and festive treats. Each hamper has a
              minimum order of 50 pieces.
            </p>

            <div className="hero-actions">
              <a href="#collections" className="btn btn-gold">
                Browse Collections ↓
              </a>
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <span>💬 Quick WhatsApp Order</span>
              </a>
            </div>

            <div className="hero-highlights">
              <div className="highlight-pill">
                <span className="highlight-icon">✨</span>
                <span>Artisan Handcrafted</span>
              </div>
              <div className="highlight-pill">
                <span className="highlight-icon">🏷</span>
                <span>Custom Corporate Branding</span>
              </div>
              <div className="highlight-pill">
                <span className="highlight-icon">🚚</span>
                <span>Pan-India Express Dispatch</span>
              </div>
            </div>
          </div>

          {/* Strong Diwali Hero Visual */}
          <div className="hero-visual-frame">
            <div className="hero-image-aura" aria-hidden="true" />
            <div className="hero-image-container">
              <img
                src={getImg("diwali-hamper-01.jpg")}
                alt="Hamper 1 with cashews, almonds, cookies, an urli candle, and chocolates"
                className="hero-main-img"
              />
              <div className="hero-image-overlay">
                <span className="hero-caption-title">Hamper 1</span>
                <span className="hero-caption-sub">From ₹650 · Minimum 50 pieces</span>
              </div>
              <div className="hero-floating-badge">
                <span>🪔 Curated for Diwali</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Marquee Ribbon */}
        <div className="diwali-ribbon">
          <div className="diwali-ribbon-track">
            <span>🪔 13 DIWALI HAMPERS</span>
            <span className="ribbon-sep">✦</span>
            <span>CASHEWS · ALMONDS · PISTACHIOS</span>
            <span className="ribbon-sep">✦</span>
            <span>CHOCOLATES · COOKIES · CANDLES</span>
            <span className="ribbon-sep">✦</span>
            <span>MINIMUM ORDER 50 PIECES</span>
            <span className="ribbon-sep">✦</span>
            <span>DHOOP CONES & FESTIVE TREATS</span>
            <span className="ribbon-sep">✦</span>
            <span>PAN-INDIA DISPATCH</span>
            <span className="ribbon-sep">✦</span>
            <span>🪔 13 DIWALI HAMPERS</span>
            <span className="ribbon-sep">✦</span>
            <span>CASHEWS · ALMONDS · PISTACHIOS</span>
            <span className="ribbon-sep">✦</span>
            <span>CHOCOLATES · COOKIES · CANDLES</span>
            <span className="ribbon-sep">✦</span>
            <span>MINIMUM ORDER 50 PIECES</span>
            <span className="ribbon-sep">✦</span>
            <span>DHOOP CONES & FESTIVE TREATS</span>
            <span className="ribbon-sep">✦</span>
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS SECTION ───────────────────────── */}
      <section className="collections-section" id="collections">
        <div className="section-intro">
          <span className="section-eyebrow">CURATED FESTIVE ROWS</span>
          <h2 className="section-title">Diwali Collections</h2>
          <p className="section-desc">
            Browse all 13 hampers with their listed inclusions, catalogue prices,
            and minimum order quantity. Prices may change with availability,
            order quantity, customisation, and market conditions; the final price
            will be confirmed when you order.
          </p>
        </div>

        {/* Category Row 1: Hampers */}
        <div id="hampers" className="collection-row-anchor">
          <ProductCarouselRow
            categoryTag="2026 CATALOGUE"
            categoryTitle="Festive Hampers"
            categorySubtitle="13 hampers · Minimum order 50 pieces each"
            items={HAMPERS}
            onSelectProduct={setActiveProduct}
            reverse={false}
          />
        </div>
      </section>

      {/* ─── CONTACT SECTION (Directly below Collections) ── */}
      <section className="contact-section" id="contact">
        <div className="contact-card-container">
          <div className="contact-ornament" aria-hidden="true">
            <span className="diwali-flame-icon">🪔</span>
          </div>

          <span className="contact-eyebrow">BESPOKE CONCIERGE & BULK ORDERS</span>
          <h2 className="contact-heading">Plan Your Diwali Gifting With Us</h2>
          <p className="contact-text">
            Whether you require tailored corporate hampers with custom company logo
            branding, curated luxury boxes for clients, or bulk festive deliveries
            across multiple locations in India, our gifting specialists are at your service.
          </p>

          <div className="contact-cta-wrapper">
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp-large"
            >
              <span className="whatsapp-large-icon">💬</span>
              <span>Enquire & Order on WhatsApp</span>
            </a>
          </div>

          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-item-icon">📱</span>
              <h4>WhatsApp Concierge</h4>
              <p>Instant digital catalog, quotes & sample requests</p>
              <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                +91 93304 53857
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">💼</span>
              <h4>Corporate Desk</h4>
              <p>GST invoices, bulk discount tiers & custom branding</p>
              <a href="tel:+919876543211">+91 93304 53857</a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">✉️</span>
              <h4>Email Inquiries</h4>
              <p>Send your corporate gifting requirements</p>
              <a href="mailto:houseofgifts.hj@gmail.com">houseofgifts.hj@gmail.com</a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">📍</span>
              <h4>Dispatch Centers</h4>
              <p>Pan-India logistics to 19,000+ pin codes</p>
              <span>Kolkatta</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a href="#hero" className="brand-lockup">
              <span className="brand-crest">🪔</span>
              <div className="brand-text">
                <span className="brand-name">THE HOUSE OF GIFTS</span>
                <span className="brand-sub">PREMIUM FESTIVE CATALOGUE</span>
              </div>
            </a>
            <p className="footer-brand-text">
              Crafting auspicious moments and cherished connections through thoughtful,
              artisan-made Diwali celebrations.
            </p>
          </div>

          <div className="footer-nav-block">
            <div className="footer-links-group">
              <h5>Catalogue</h5>
              <a href="#hampers">Festive Hampers</a>
              <a href="#collections">All Collections</a>
            </div>

            <div className="footer-links-group">
              <h5>Concierge</h5>
              <a href="#contact">Corporate Orders</a>
              <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp Chat
              </a>
              <a href="mailto:concierge@thehouseofgifts.in">Custom Quotes</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 The House of Gifts. All rights reserved.</p>
          <div className="footer-festive-wish">
            <span>✦ Wishing You a Joyous and Prosperous Diwali ✦</span>
          </div>
        </div>
      </footer>

      {/* ─── PRODUCT MODAL (With Diwali Ornamental Border) ─ */}
      {activeProduct && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeProduct.name}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Elegant Minimalist Diwali Ornamental Trim Corners (Rose Gold, Gold & Silver) */}
            <div className="diwali-ornament-corner tl" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                <path d="M2 38 V12 C2 6.5 6.5 2 12 2 H38" stroke="url(#roseGoldGrad)" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="url(#goldGrad)" />
                <path d="M12 2 C18 6 22 10 24 16" stroke="url(#silverGrad)" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8b4b8" />
                    <stop offset="50%" stopColor="#c5828d" />
                    <stop offset="100%" stopColor="#9e535e" />
                  </linearGradient>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5e4bd" />
                    <stop offset="50%" stopColor="#c5a059" />
                    <stop offset="100%" stopColor="#8c6e30" />
                  </linearGradient>
                  <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#d8dbe2" />
                    <stop offset="100%" stopColor="#9fa5b2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="diwali-ornament-corner tr" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                <path d="M38 38 V12 C38 6.5 33.5 2 28 2 H2" stroke="url(#roseGoldGrad)" strokeWidth="2" />
                <circle cx="28" cy="12" r="3" fill="url(#goldGrad)" />
                <path d="M28 2 C22 6 18 10 16 16" stroke="url(#silverGrad)" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="diwali-ornament-corner bl" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                <path d="M2 2 V28 C2 33.5 6.5 38 12 38 H38" stroke="url(#roseGoldGrad)" strokeWidth="2" />
                <circle cx="12" cy="28" r="3" fill="url(#goldGrad)" />
                <path d="M12 38 C18 34 22 30 24 24" stroke="url(#silverGrad)" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="diwali-ornament-corner br" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                <path d="M38 2 V28 C38 33.5 33.5 38 28 38 H2" stroke="url(#roseGoldGrad)" strokeWidth="2" />
                <circle cx="28" cy="28" r="3" fill="url(#goldGrad)" />
                <path d="M28 38 C22 34 18 30 16 24" stroke="url(#silverGrad)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Modal Close Button */}
            <button
              className="modal-close-btn"
              onClick={() => setActiveProduct(null)}
              aria-label="Close product view"
            >
              ✕
            </button>

            <div className="modal-body">
              {/* Product Visual */}
              <div className="modal-media-col">
                <div className="modal-img-wrap">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="modal-product-img"
                  />
                  <div className="modal-product-tag">{activeProduct.tag}</div>
                </div>
              </div>

              {/* Product Info & WhatsApp CTA */}
              <div className="modal-details-col">
                <div className="modal-header-meta">
                  <span className="modal-category-label">
                    Festive Hamper · Edition 2026
                  </span>
                  <h2 className="modal-product-name">{activeProduct.name}</h2>
                </div>

                <div className="modal-pricing-box">
                  <div className="price-item">
                    <span className="price-label">Catalogue Price</span>
                    <span className="price-val">{activeProduct.price}</span>
                  </div>
                  <div className="moq-divider" />
                  <div className="moq-item">
                    <span className="moq-label">Minimum Order</span>
                    <span className="moq-val">{activeProduct.moq}</span>
                  </div>
                </div>

                <p className="modal-desc">{activeProduct.description}</p>

                <div className="modal-inclusions">
                  <h4 className="inclusions-title">Curated Inclusions & Details:</h4>
                  <ul className="inclusions-list">
                    {activeProduct.details.map((detail, i) => (
                      <li key={i}>
                        <span className="inclusion-bullet">✦</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary WhatsApp Order CTA */}
                <div className="modal-actions-box">
                  <a
                    href={createWhatsAppLink(activeProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-modal"
                  >
                    <span className="whatsapp-icon">💬</span>
                    <span>Order / Enquire on WhatsApp</span>
                  </a>
                  <p className="modal-note">
                    ⚡ Instant assistance with customization, corporate branding & bulk orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}