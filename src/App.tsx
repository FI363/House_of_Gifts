import { useState, useRef, useEffect } from "react";
import "./App.css";

/* ─── Types ─────────────────────────────────────────── */
export type Product = {
  id: string;
  category: "Hampers" | "Gifts";
  name: string;
  price: string;
  moq: string;
  tag: string;
  description: string;
  details: string[];
  image: string;
};

/* ─── Media Resolver ────────────────────────────────── */
const BASE = "/src/assets/house_media/";
const getImg = (name: string) => `${BASE}${encodeURIComponent(name)}`;

/* ─── Products Data ─────────────────────────────────── */
const HAMPERS: Product[] = [
  {
    id: "h-1",
    category: "Hampers",
    name: "The Royal Silver Thali Hamper",
    price: "₹4,499",
    moq: "5 units",
    tag: "Imperial Signature",
    description:
      "An imperial silver-filigree celebration thali adorned with multi-wick scented floral candle, pure silk brocade dry-fruit potlis, artisan hazelnut pralines, and fragrant dried rose petals.",
    details: [
      "Artisan handcrafted silver filigree thali",
      "3 Silk brocade potlis with jumbo Mamra nuts",
      "Box of gold-foiled Belgian hazelnut pralines",
      "Centerpiece aroma candle with brass accents",
      "Handwritten wax-sealed Diwali greeting card",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.18 AM (1).jpeg"),
  },
  {
    id: "h-2",
    category: "Hampers",
    name: "The Maharaja Festive Casket",
    price: "₹3,199",
    moq: "10 units",
    tag: "Best Seller",
    description:
      "An ornate Persian teal & gold motif treasure chest containing Californian almonds, whole cashews, salted pistachios, and gold-dusted chocolate spheres.",
    details: [
      "Reusable keepsake designer embossed tin",
      "600g premium imported graded dry fruits",
      "Handcrafted golden chocolate truffles",
      "Pure brass diya included",
      "Diwali festive certification card",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.18 AM.jpeg"),
  },
  {
    id: "h-3",
    category: "Hampers",
    name: "The Sovereign Mithai & Dry Fruit Trunk",
    price: "₹3,799",
    moq: "8 units",
    tag: "Grand Trunk",
    description:
      "A handcrafted royal trunk featuring tiered compartments of gourmet roasted nuts, silver-foiled artisan mithai, and a pair of solid brass oil lamps.",
    details: [
      "Engraved reusable wooden trunk with brass latch",
      "Artisanal saffron & pistachio sweets",
      "Irani pistachios & Mamra almonds",
      "Pair of traditional hand-carved brass diyas",
      "Custom corporate brass plaque available",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (8).jpeg"),
  },
  {
    id: "h-4",
    category: "Hampers",
    name: "The Shahi Noor Celebration Hamper",
    price: "₹3,499",
    moq: "6 units",
    tag: "Limited Reserve",
    description:
      "A majestic hamper pairing dark cocoa pralines, exotic trail mix, a pure brass lotus diya, and organic wild forest honey with wooden dipper.",
    details: [
      "Pure brass lotus flower diya",
      "Organic wild forest honey jar with dipper",
      "Artisanal 70% dark chocolates",
      "Rich Turkish figs & walnut halves",
      "Royal satin ribbon & embossed gold seal",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (2).jpeg"),
  },
  {
    id: "h-5",
    category: "Hampers",
    name: "The Marigold Heritage Basket",
    price: "₹2,899",
    moq: "10 units",
    tag: "Festive Classic",
    description:
      "Woven luxury hamper packed with pure desi ghee savouries, hand-rolled kaju sweets, roasted macadamias, and aromatic saffron incense cones.",
    details: [
      "Eco-luxe woven storage basket with lid",
      "Pure desi ghee sweets (zero preservatives)",
      "Botanical dhoop cones with brass burner",
      "Handcrafted festive silk tassel adornment",
      "Doorstep pan-India express dispatch",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (1).jpeg"),
  },
  {
    id: "h-6",
    category: "Hampers",
    name: "The Amber Royale Corporate Hamper",
    price: "₹2,599",
    moq: "15 units",
    tag: "Corporate Choice",
    description:
      "Sleek and opulent presentation crafted for esteemed colleagues and clients, including airtight gourmet dry fruit jars, roasted seeds, and celebratory scented tea-lights.",
    details: [
      "Dual airtight crystal-glass jars",
      "Custom corporate logo belly-band & card",
      "Gold-foiled rigid luxury gift box",
      "GST invoice provided with bulk orders",
      "Individual multi-address shipping support",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (3).jpeg"),
  },
  {
    id: "h-7",
    category: "Hampers",
    name: "The Jewel of Ayodhya Hamper",
    price: "₹4,999",
    moq: "3 units",
    tag: "Connoisseur",
    description:
      "The pinnacle of Diwali hospitality — pure Kashmiri saffron, silver-coated cardamom, organic wild honey, Iranian dates, and hand-chiseled brass diyas.",
    details: [
      "1g Pure Kashmir Saffron (Mongra Grade)",
      "Solid brass hand-carved diya pair",
      "Stuffed Medjool dates with roasted almond",
      "Velvet-lined royal festive presentation box",
      "Personalized laser-engraved greeting message",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (4).jpeg"),
  },
  {
    id: "h-8",
    category: "Hampers",
    name: "The Rangoli Festive Hamper",
    price: "₹2,199",
    moq: "15 units",
    tag: "Popular",
    description:
      "Festive celebration box showcasing vibrant Indian rangoli motifs, assorted traditional namkeens, cashew bites, and festive decorative tealights.",
    details: [
      "Artistic rangoli keepsake lid",
      "4 assorted gourmet dry fruits & savory treats",
      "Set of 4 hand-poured festive tealights",
      "Diwali festival note card with envelope",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (5).jpeg"),
  },
];

const GIFTS: Product[] = [
  {
    id: "g-1",
    category: "Gifts",
    name: "The Golden Noor Mithai Box",
    price: "₹1,699",
    moq: "10 units",
    tag: "Artisan Mithai",
    description:
      "A luxurious 9-compartment gold-lacquered box featuring gold-leafed pistachio squares, rose petal chocolates, a hand-cast brass tealight, and dual glass jars of whole cashews and roasted almonds.",
    details: [
      "9-section artisan keepsake gift tray",
      "Hand-cast brass center tealight candle",
      "Dual airtight glass dry fruit jars",
      "Gold foil geometric Indian motif box",
      "100% vegetarian & freshly prepared",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (10).jpeg"),
  },
  {
    id: "g-2",
    category: "Gifts",
    name: "The Artisanal Couverture Gift Box",
    price: "₹1,499",
    moq: "12 units",
    tag: "Chocolatier",
    description:
      "Handcrafted Belgian chocolates infused with Kashmiri saffron, roasted almond slivers, salted caramel, and rose ganache in a velvet-finish box.",
    details: [
      "16-piece gourmet festive chocolate selection",
      "Single-origin Belgian chocolate couverture",
      "Festive edible gold dust garnish",
      "Insulated temperature-controlled dispatch",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (6).jpeg"),
  },
  {
    id: "g-3",
    category: "Gifts",
    name: "The Saffron & Almond Heritage Casket",
    price: "₹1,899",
    moq: "8 units",
    tag: "Signature Gift",
    description:
      "Glass jars of handpicked Mamra almonds and golden Kashmiri saffron strands presented in an emerald and gold foiled festive keepsake casket.",
    details: [
      "Pure Kashmiri Mongra Saffron (1g)",
      "Grade-A handpicked Mamra Almonds (250g)",
      "Gold metal screw-cap airtight jars",
      "Includes festive culinary recipe card",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (7).jpeg"),
  },
  {
    id: "g-4",
    category: "Gifts",
    name: "The Brass Diya & Sacred Dhoop Set",
    price: "₹1,299",
    moq: "15 units",
    tag: "Sacred Festive",
    description:
      "Traditional hand-cast solid brass diyas paired with botanical herbal dhoop cones and pure cow ghee wicks for an auspicious Diwali pooja.",
    details: [
      "Solid pure brass diya (lifetime keepsake)",
      "Pure botanical herbal incense with brass stand",
      "Cotton organic ghee wicks gift pack",
      "Auspicious festive gold-stamped packaging",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (9).jpeg"),
  },
  {
    id: "g-5",
    category: "Gifts",
    name: "The Festive Dry Fruit Quartet",
    price: "₹1,599",
    moq: "10 units",
    tag: "Healthy Luxury",
    description:
      "Four sealed compartments containing smoked Californian almonds, salted whole cashews, Afghan green raisins, and Turkish sun-dried apricots.",
    details: [
      "400g net weight premium dry fruits",
      "Foil-sealed freshness guarantee",
      "Reusable partition tray with clear acrylic lid",
      "Hand-tied festive gold ribbon bow",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (11).jpeg"),
  },
  {
    id: "g-6",
    category: "Gifts",
    name: "The Velvet Charm Keepsake Box",
    price: "₹1,799",
    moq: "10 units",
    tag: "Bespoke",
    description:
      "Royal deep crimson velvet box with custom gold foil crest, enclosing artisanal cashew burfi, roasted hazelnut dragees, and an aromatic soy wax candle.",
    details: [
      "Plush velvet touch presentation box",
      "Hand-poured warm amber soy candle",
      "Artisan confection duo with gold foil",
      "Customizable festive note card included",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (12).jpeg"),
  },
  {
    id: "g-7",
    category: "Gifts",
    name: "The Diya & Sweet Harmony Box",
    price: "₹1,199",
    moq: "20 units",
    tag: "Festive Essential",
    description:
      "A delightful compact Diwali gift featuring terracotta hand-painted diyas, assorted miniature dry fruit sweet bites, and a celebratory greeting note.",
    details: [
      "Pair of hand-painted terracotta diyas",
      "Individually sealed gourmet mithai bites",
      "Ideal for team, family & guest gifting",
      "Prompt express delivery across India",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (13).jpeg"),
  },
  {
    id: "g-8",
    category: "Gifts",
    name: "The Celestial Dry Fruit Duo",
    price: "₹999",
    moq: "25 units",
    tag: "Corporate Value",
    description:
      "Two airtight crystal jars of jumbo cashews and roasted almonds housed in a sleek navy and gold geometric festive gift box.",
    details: [
      "Twin 200g jars (Cashews & Almonds)",
      "Custom branded sleeve option for bulk orders",
      "Pre-tied satin ribbon finish",
      "Corporate GST invoicing available",
    ],
    image: getImg("WhatsApp Image 2026-09-18 at 2.04.19 AM (14).jpeg"),
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
          <a href="#gifts">Gifts</a>
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
              Welcome to our 2026 Diwali Product Catalogue. Discover thoughtfully
              assembled festive hampers, artisanal sweets, gourmet dry fruits, and
              hand-cast brass keepsakes — curated exclusively for bespoke personal
              and corporate gifting.
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
                src={getImg("WhatsApp Image 2026-09-18 at 2.04.18 AM (1).jpeg")}
                alt="Diwali Signature Silver Thali Hamper with Lit Floral Candle"
                className="hero-main-img"
              />
              <div className="hero-image-overlay">
                <span className="hero-caption-title">The Royal Silver Thali Edition</span>
                <span className="hero-caption-sub">Featured 2026 Masterpiece</span>
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
            <span>🪔 BESPOKE FESTIVE HAMPERS</span>
            <span className="ribbon-sep">✦</span>
            <span>PURE GHEE ARTISAN MITHAI</span>
            <span className="ribbon-sep">✦</span>
            <span>CALIFORNIAN NUTS & SAFFRON</span>
            <span className="ribbon-sep">✦</span>
            <span>HAND-CAST BRASS DIYAS</span>
            <span className="ribbon-sep">✦</span>
            <span>CORPORATE LOGO EMBOSSING</span>
            <span className="ribbon-sep">✦</span>
            <span>PAN-INDIA DISPATCH</span>
            <span className="ribbon-sep">✦</span>
            <span>🪔 BESPOKE FESTIVE HAMPERS</span>
            <span className="ribbon-sep">✦</span>
            <span>PURE GHEE ARTISAN MITHAI</span>
            <span className="ribbon-sep">✦</span>
            <span>CALIFORNIAN NUTS & SAFFRON</span>
            <span className="ribbon-sep">✦</span>
            <span>HAND-CAST BRASS DIYAS</span>
            <span className="ribbon-sep">✦</span>
            <span>CORPORATE LOGO EMBOSSING</span>
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
            Explore our curated catalogue presented in continuous horizontal rows.
            Hover over any product to pause scrolling, and click for full details,
            inclusions, and direct WhatsApp enquiry.
          </p>
        </div>

        {/* Category Row 1: Hampers */}
        <div id="hampers" className="collection-row-anchor">
          <ProductCarouselRow
            categoryTag="CATEGORY 01"
            categoryTitle="Festive Hampers"
            categorySubtitle="Opulent royal silver thalis, heirloom caskets, and bespoke multi-tier celebration trunks"
            items={HAMPERS}
            onSelectProduct={setActiveProduct}
            reverse={false}
          />
        </div>

        {/* Category Row 2: Gifts */}
        <div id="gifts" className="collection-row-anchor">
          <ProductCarouselRow
            categoryTag="CATEGORY 02"
            categoryTitle="Thoughtful Gifts"
            categorySubtitle="Artisanal mithai boxes, Belgian couverture selections, sacred brass diyas, and dry fruit caskets"
            items={GIFTS}
            onSelectProduct={setActiveProduct}
            reverse={true}
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
                +91 98765 43210
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">💼</span>
              <h4>Corporate Desk</h4>
              <p>GST invoices, bulk discount tiers & custom branding</p>
              <a href="tel:+919876543211">+91 98765 43211</a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">✉️</span>
              <h4>Email Inquiries</h4>
              <p>Send your corporate gifting requirements</p>
              <a href="mailto:concierge@thehouseofgifts.in">concierge@thehouseofgifts.in</a>
            </div>

            <div className="contact-item">
              <span className="contact-item-icon">📍</span>
              <h4>Dispatch Centers</h4>
              <p>Pan-India logistics to 19,000+ pin codes</p>
              <span>Mumbai · New Delhi · Bengaluru</span>
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
              <a href="#gifts">Thoughtful Gifts</a>
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
                    {activeProduct.category === "Hampers" ? "Festive Hamper" : "Diwali Gift"} · Edition 2026
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