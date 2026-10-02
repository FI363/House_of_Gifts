import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import fiyaVideo from "./assets/fiya.mp4";

/* ─── Types ─────────────────────────────────────────── */
export type Product = {
  id: string;
  number: number;
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
const productImages = import.meta.glob<string>("./assets/house_media/diwali-hamper-*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const getImg = (name: string) => productImages[`./assets/house_media/${name}`];

/* ─── Products Data ─────────────────────────────────── */
const HAMPERS: Product[] = [
  {
    id: "h-1",
    number: 1,
    category: "Hampers",
    name: "Hamper 1",
    price: "₹650",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, cookies, an urli candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Cookies", "Urli candle", "6 chocolates"],
    image: getImg("diwali-hamper-01.webp"),
  },
  {
    id: "h-2",
    number: 2,
    category: "Hampers",
    name: "Hamper 2",
    price: "₹650",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, chocolates, and dhoop cones.",
    details: ["100g cashews", "100g almonds", "Candle", "6 chocolates", "Dhoop cones"],
    image: getImg("diwali-hamper-02.webp"),
  },
  {
    id: "h-3",
    number: 3,
    category: "Hampers",
    name: "Hamper 3",
    price: "₹850",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Candle", "6 chocolates"],
    image: getImg("diwali-hamper-03.webp"),
  },
  {
    id: "h-4",
    number: 4,
    category: "Hampers",
    name: "Hamper 4",
    price: "₹1,050",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, and a candle.",
    details: ["200g cashews", "200g almonds", "Candle"],
    image: getImg("diwali-hamper-04.webp"),
  },
  {
    id: "h-5",
    number: 5,
    category: "Hampers",
    name: "Hamper 5",
    price: "₹1,050",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, and a candle.",
    details: ["200g cashews", "200g almonds", "Candle"],
    image: getImg("diwali-hamper-05.webp"),
  },
  {
    id: "h-6",
    number: 6,
    category: "Hampers",
    name: "Hamper 6",
    price: "₹1,200",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Candle", "8 chocolates"],
    image: getImg("diwali-hamper-06.webp"),
  },
  {
    id: "h-7",
    number: 7,
    category: "Hampers",
    name: "Hamper 7",
    price: "₹1,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, a candle, and chocolates.",
    details: ["200g cashews", "200g almonds", "Candle", "8 chocolates"],
    image: getImg("diwali-hamper-07.webp"),
  },
  {
    id: "h-8",
    number: 8,
    category: "Hampers",
    name: "Hamper 8",
    price: "₹1,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-08.webp"),
  },
  {
    id: "h-9",
    number: 9,
    category: "Hampers",
    name: "Hamper 9",
    price: "₹1,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-09.webp"),
  },
  {
    id: "h-10",
    number: 10,
    category: "Hampers",
    name: "Hamper 10",
    price: "₹1,550",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, an urli candle, dhoop cones, and chocolates.",
    details: ["200g cashews", "200g almonds", "Urli candle", "Dhoop cones", "6 chocolates"],
    image: getImg("diwali-hamper-10.webp"),
  },
  {
    id: "h-11",
    number: 11,
    category: "Hampers",
    name: "Hamper 11",
    price: "₹1,800",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, and a candle.",
    details: ["200g cashews", "200g almonds", "Candle"],
    image: getImg("diwali-hamper-11.webp"),
  },
  {
    id: "h-12",
    number: 12,
    category: "Hampers",
    name: "Hamper 12",
    price: "₹2,050",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-12.webp"),
  },
  {
    id: "h-13",
    number: 13,
    category: "Hampers",
    name: "Hamper 13",
    price: "₹3,500",
    moq: "50 pcs",
    tag: "Diwali Hamper",
    description: "Cashews, almonds, pistachios, and chocolates.",
    details: ["200g cashews", "200g almonds", "200g pistachios", "6 chocolates"],
    image: getImg("diwali-hamper-13.webp"),
  },
];

/* ─── WhatsApp helper ────────────────────────────────── */
const WHATSAPP_PHONE = "919330453857";

function createWhatsAppLink(product?: Product) {
  const message = product
    ? `Hi, I would like to enquire about hamper number ${product.number}.`
    : "Hello The House of Gifts! I am browsing your Diwali 2026 Catalogue and would like to enquire about festive gifting options.";
  const params = new URLSearchParams({ phone: WHATSAPP_PHONE, text: message });
  return `https://api.whatsapp.com/send?${params.toString()}`;
}

/* ─── Hero Carousel Component ────────────────────────── */
function HeroCarousel({
  items,
  onSelectProduct,
}: {
  items: Product[];
  onSelectProduct: (product: Product) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="hero-carousel-container">
      <div className="hero-carousel-track">
        {items.map((item, idx) => {
          let position = "hidden";
          const diff = (idx - currentIndex + items.length) % items.length;
          if (diff === 0) position = "center";
          else if (diff === 1) position = "right";
          else if (diff === items.length - 1) position = "left";
          else if (diff > 1 && diff <= items.length / 2) position = "hidden-right";
          else position = "hidden-left";

          return (
            <div
              key={item.id}
              className={`hero-carousel-card ${position}`}
              role="button"
              tabIndex={position === "center" ? 0 : -1}
              aria-hidden={position !== "center"}
              aria-label={`View details for ${item.name}`}
              onClick={() => onSelectProduct(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectProduct(item);
                }
              }}
            >
              <img src={item.image} alt={item.name} className="hero-carousel-img" />
              <div className="hero-image-overlay">
                <span className="hero-caption-title">{item.name}</span>
                <span className="hero-caption-sub">From {item.price} · {item.moq}</span>
              </div>
              <div className="hero-floating-badge">
                <span>🪔 Curated for Diwali</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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

        {/* Carousel controls and manual scroll arrows */}
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
            Auto-scrolling · Select a card for details
          </span>
        </div>
      </div>

      {/* Horizontal Continuous Auto-Scroll Track */}
      <div className="carousel-viewport" ref={scrollRef}>
        <div className={`carousel-track ${reverse ? "carousel-track--reverse" : ""}`}>
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
        {/* ─── Diwali Floral Vine Trim ───────────────── */}
        <svg
          className="header-vine-trim"
          viewBox="0 0 1200 44"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <g stroke="rgb(197,160,89)" fill="none">
            {/* Main horizontal vine */}
            <path strokeWidth="1.5" strokeOpacity="0.8" d="M0,40 L1200,40" />

            {/* LEFT CURL 1 — sweeps up and rightward (inward) */}
            <path strokeWidth="1.1" d="M120,40 C122,28 136,14 150,18 C164,22 162,35 150,38" />
            <g transform="translate(152,16)">
              <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
              <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
              <circle r="1.8" fill="rgb(197,160,89)" />
            </g>
            <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M189,40 C192,32 204,33 201,40Z" />

            {/* LEFT CURL 2 */}
            <path strokeWidth="1.1" d="M290,40 C292,28 306,14 320,18 C334,22 332,35 320,38" />
            <g transform="translate(322,16)">
              <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
              <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
              <circle r="1.8" fill="rgb(197,160,89)" />
            </g>
            <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M357,40 C360,32 372,33 369,40Z" />

            {/* LEFT CURL 3 */}
            <path strokeWidth="1.1" d="M458,40 C460,28 474,14 488,18 C502,22 500,35 488,38" />
            <g transform="translate(490,16)">
              <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
              <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
              <circle r="1.8" fill="rgb(197,160,89)" />
            </g>
            <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M525,40 C528,32 540,33 537,40Z" />

            {/* CENTER LOTUS */}
            <g transform="translate(600,34)">
              <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" />
              <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(60)" />
              <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(120)" />
              <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(180)" />
              <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(240)" />
              <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(300)" />
              <circle r="3.5" fill="rgb(197,160,89)" />
              <circle r="1.8" fill="rgb(245,228,189)" />
            </g>

            {/* RIGHT CURL 3 — sweeps up and leftward (inward) */}
            <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M663,40 C660,32 648,33 651,40Z" />
            <path strokeWidth="1.1" d="M742,40 C740,28 726,14 712,18 C698,22 700,35 712,38" />
            <g transform="translate(710,16)">
              <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
              <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
              <circle r="1.8" fill="rgb(197,160,89)" />
            </g>

            {/* RIGHT CURL 2 */}
            <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M843,40 C840,32 828,33 831,40Z" />
            <path strokeWidth="1.1" d="M910,40 C908,28 894,14 880,18 C866,22 868,35 880,38" />
            <g transform="translate(878,16)">
              <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
              <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
              <circle r="1.8" fill="rgb(197,160,89)" />
            </g>

            {/* RIGHT CURL 1 */}
            <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M1011,40 C1008,32 996,33 999,40Z" />
            <path strokeWidth="1.1" d="M1080,40 C1078,28 1064,14 1050,18 C1036,22 1038,35 1050,38" />
            <g transform="translate(1048,16)">
              <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
              <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
              <circle r="1.8" fill="rgb(197,160,89)" />
            </g>
          </g>
        </svg>
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
            <HeroCarousel items={HAMPERS} onSelectProduct={setActiveProduct} />
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
        {/* ─── Collections Intro Section ────────────────── */}
        <div className="collections-intro-section">
          <div className="intro-section-inner">
            {/* Left side: Diwali video */}
            <div className="intro-section-media">
              <video
                src={fiyaVideo}
                autoPlay
                loop
                muted
                playsInline
                className="intro-section-video"
                aria-label="Diwali decorative flame video"
              />
              <div className="intro-media-overlay" aria-hidden="true" />
            </div>
            {/* Right side: Text content */}
            <div className="intro-section-text">
              <span className="section-eyebrow">CURATED FESTIVE ROWS</span>
              <h2 className="section-title">Diwali Collections</h2>
              <p className="section-desc">
                Browse all 13 hampers with their listed inclusions, catalogue prices,
                and minimum order quantity. Prices may change with availability,
                order quantity, customisation, and market conditions; the final price
                will be confirmed when you order.
              </p>

              <div className="intro-section-highlights">
                <div className="intro-highlight">
                  <span className="intro-highlight-icon">✦</span>
                  <div>
                    <strong>Premium Dry Fruits</strong>
                    <span>Hand-selected cashews, almonds & pistachios sourced from trusted suppliers</span>
                  </div>
                </div>
                <div className="intro-highlight">
                  <span className="intro-highlight-icon">✦</span>
                  <div>
                    <strong>Artisan Candles & Diyas</strong>
                    <span>Handcrafted urli candles and traditional diyas to illuminate celebrations</span>
                  </div>
                </div>
                <div className="intro-highlight">
                  <span className="intro-highlight-icon">✦</span>
                  <div>
                    <strong>Corporate Customisation</strong>
                    <span>Add your company logo, personalised notes & branded packaging</span>
                  </div>
                </div>
              </div>

              <a href="#hampers" className="intro-section-cta">
                Explore Hampers ↓
              </a>
            </div>
          </div>
        </div>

        {/* Category Row 1: Hampers Card */}
        <div id="hampers" className="collection-row-anchor collections-carousel-card">


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
              <span className="contact-item-icon">
                <svg viewBox="0 0 48 48" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Diya base */}
                  <ellipse cx="24" cy="36" rx="14" ry="5" fill="#c5a059" opacity="0.85" />
                  <ellipse cx="24" cy="36" rx="10" ry="3.5" fill="#f5e4bd" opacity="0.6" />
                  {/* Diya bowl */}
                  <path d="M12,36 Q14,28 24,26 Q34,28 36,36 Z" fill="#c5a059" />
                  <path d="M14,35 Q16,29 24,27.5 Q32,29 34,35 Z" fill="#f5e4bd" opacity="0.5" />
                  {/* Flame */}
                  <path d="M24,26 Q21,18 24,10 Q27,18 24,26Z" fill="#e8a838" />
                  <path d="M24,24 Q22.5,19 24,13 Q25.5,19 24,24Z" fill="#f5d76e" />
                  <ellipse cx="24" cy="12" rx="2.5" ry="4" fill="#ffe8a0" opacity="0.7" />
                  {/* Glow */}
                  <circle cx="24" cy="16" r="6" fill="#f5d76e" opacity="0.15" />
                </svg>
              </span>
              <h4>WhatsApp Concierge</h4>
              <p>Instant digital catalog, quotes & sample requests</p>
              <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                +91 93304 53857
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">
                <svg viewBox="0 0 48 48" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Lotus / Rangoli */}
                  <g transform="translate(24,26)">
                    <ellipse cy="-10" rx="3.5" ry="9" fill="#c5828d" opacity="0.7" />
                    <ellipse cy="-10" rx="3.5" ry="9" fill="#c5828d" opacity="0.7" transform="rotate(60)" />
                    <ellipse cy="-10" rx="3.5" ry="9" fill="#c5828d" opacity="0.7" transform="rotate(120)" />
                    <ellipse cy="-10" rx="3.5" ry="9" fill="#c5828d" opacity="0.7" transform="rotate(180)" />
                    <ellipse cy="-10" rx="3.5" ry="9" fill="#c5828d" opacity="0.7" transform="rotate(240)" />
                    <ellipse cy="-10" rx="3.5" ry="9" fill="#c5828d" opacity="0.7" transform="rotate(300)" />
                    <circle r="5" fill="#c5a059" />
                    <circle r="2.8" fill="#f5e4bd" />
                  </g>
                </svg>
              </span>
              <h4>Instagram</h4>
              <p>Follow us for gifting inspiration & updates</p>
              <a
                href="https://www.instagram.com/_house_of_gifts__/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @_house_of_gifts__
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">
                <svg viewBox="0 0 48 48" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Festive envelope */}
                  <rect x="6" y="14" width="36" height="24" rx="3" fill="#c5a059" opacity="0.85" />
                  <rect x="8" y="16" width="32" height="20" rx="2" fill="#f5e4bd" opacity="0.6" />
                  <path d="M6,14 L24,30 L42,14" stroke="#c5a059" strokeWidth="2" fill="none" />
                  <path d="M6,38 L18,26" stroke="#c5a059" strokeWidth="1.2" opacity="0.5" />
                  <path d="M42,38 L30,26" stroke="#c5a059" strokeWidth="1.2" opacity="0.5" />
                  {/* Small sparkle on top */}
                  <path d="M24,10 L25,13 L28,14 L25,15 L24,18 L23,15 L20,14 L23,13 Z" fill="#e8a838" opacity="0.8" />
                </svg>
              </span>
              <h4>Email Inquiries</h4>
              <p>Send your corporate gifting requirements</p>
              <a href="mailto:houseofgifts.hj@gmail.com">houseofgifts.hj@gmail.com</a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">
                <svg viewBox="0 0 48 48" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Festive lantern */}
                  <line x1="24" y1="4" x2="24" y2="10" stroke="#c5a059" strokeWidth="1.5" />
                  <rect x="20" y="8" width="8" height="3" rx="1" fill="#c5a059" />
                  {/* Lantern body */}
                  <path d="M16,11 Q14,24 18,36 L30,36 Q34,24 32,11 Z" fill="#c5a059" opacity="0.85" />
                  <path d="M18,13 Q16.5,24 19,34 L29,34 Q31.5,24 30,13 Z" fill="#f5e4bd" opacity="0.5" />
                  {/* Inner glow */}
                  <ellipse cx="24" cy="23" rx="5" ry="8" fill="#ffe8a0" opacity="0.4" />
                  {/* Flame inside */}
                  <path d="M24,27 Q22,22 24,17 Q26,22 24,27Z" fill="#e8a838" opacity="0.9" />
                  <path d="M24,25 Q23,22 24,19 Q25,22 24,25Z" fill="#f5d76e" />
                  {/* Base */}
                  <rect x="17" y="36" width="14" height="3" rx="1" fill="#c5a059" />
                  <ellipse cx="24" cy="40" rx="8" ry="2" fill="#c5a059" opacity="0.3" />
                </svg>
              </span>
              <h4>Dispatch Centers</h4>
              <p>Pan-India logistics to 19,000+ pin codes</p>
              <span>Kolkata</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────── */}
      <footer className="site-footer">
        {/* Floral Vine Divider Trim */}
        <div className="section-divider-wrap footer-vine-divider">
          <svg
            className="section-vine-trim"
            viewBox="0 0 1200 44"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <g stroke="rgb(197,160,89)" fill="none">
              <path strokeWidth="1.5" strokeOpacity="0.8" d="M0,40 L1200,40" />

              {/* LEFT CURL 1 */}
              <path strokeWidth="1.1" d="M120,40 C122,28 136,14 150,18 C164,22 162,35 150,38" />
              <g transform="translate(152,16)">
                <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
                <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
                <circle r="1.8" fill="rgb(197,160,89)" />
              </g>
              <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M189,40 C192,32 204,33 201,40Z" />

              {/* LEFT CURL 2 */}
              <path strokeWidth="1.1" d="M290,40 C292,28 306,14 320,18 C334,22 332,35 320,38" />
              <g transform="translate(322,16)">
                <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
                <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
                <circle r="1.8" fill="rgb(197,160,89)" />
              </g>
              <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M357,40 C360,32 372,33 369,40Z" />

              {/* LEFT CURL 3 */}
              <path strokeWidth="1.1" d="M460,40 C462,28 476,14 490,18 C504,22 502,35 490,38" />
              <g transform="translate(492,16)">
                <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
                <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
                <circle r="1.8" fill="rgb(197,160,89)" />
              </g>
              <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M527,40 C530,32 542,33 539,40Z" />

              {/* CENTER LOTUS */}
              <g transform="translate(600,34)">
                <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" />
                <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(60)" />
                <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(120)" />
                <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(180)" />
                <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(240)" />
                <ellipse strokeWidth="0.9" cy="-8" rx="2.5" ry="6" transform="rotate(300)" />
                <circle r="3.5" fill="rgb(197,160,89)" />
                <circle r="1.8" fill="rgb(245,228,189)" />
              </g>

              {/* RIGHT CURL 3 */}
              <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M663,40 C660,32 648,33 651,40Z" />
              <path strokeWidth="1.1" d="M742,40 C740,28 726,14 712,18 C698,22 700,35 712,38" />
              <g transform="translate(710,16)">
                <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
                <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
                <circle r="1.8" fill="rgb(197,160,89)" />
              </g>

              {/* RIGHT CURL 2 */}
              <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M843,40 C840,32 828,33 831,40Z" />
              <path strokeWidth="1.1" d="M910,40 C908,28 894,14 880,18 C866,22 868,35 880,38" />
              <g transform="translate(878,16)">
                <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
                <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
                <circle r="1.8" fill="rgb(197,160,89)" />
              </g>

              {/* RIGHT CURL 1 */}
              <path strokeWidth="0.7" fill="rgb(197,160,89)" fillOpacity="0.22" d="M1011,40 C1008,32 996,33 999,40Z" />
              <path strokeWidth="1.1" d="M1080,40 C1078,28 1064,14 1050,18 C1036,22 1038,35 1050,38" />
              <g transform="translate(1048,16)">
                <ellipse strokeWidth="0.8" ry="3.5" rx="1.5" />
                <ellipse strokeWidth="0.8" rx="3.5" ry="1.5" />
                <circle r="1.8" fill="rgb(197,160,89)" />
              </g>
            </g>
          </svg>
        </div>

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
      <Analytics />
    </div>
  );
}