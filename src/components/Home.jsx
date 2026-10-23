import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

// Import genuine generated comic book covers
import comicHeroNeon from '../assets/images/comic_hero_neon.jpg';
import comicHeroCosmic from '../assets/images/comic_hero_cosmic.jpg';
import comicHeroTitan from '../assets/images/comic_hero_titan.jpg';
import comicHeroNoir from '../assets/images/comic_hero_noir.jpg';
import comicHeroMecha from '../assets/images/comic_hero_mecha.jpg';
import comicHeroEmerald from '../assets/images/comic_hero_emerald.jpg';

import comicSec2Skyline from '../assets/images/comic_sec2_skyline.jpg';
import comicSec2Ninja from '../assets/images/comic_sec2_ninja.jpg';
import comicSec2Doom from '../assets/images/comic_sec2_doom.jpg';
import comicSec2Western from '../assets/images/comic_sec2_western.jpg';
import comicSec2Pop from '../assets/images/comic_sec2_pop.jpg';
import comicSec2Ronin from '../assets/images/comic_sec2_ronin.jpg';
import spiderGwenImg from '../assets/images/a1.png';

// Subtle Web Audio comic haptic feedback
const playSubtleSound = (type = 'click') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'pop') {
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    }
  } catch {
    // AudioContext blocked until user interaction
  }
};

export default function Home() {
  // Currency State - Defaults to Indian Rupees (₹ INR)
  const [currency, setCurrency] = useState('INR');

  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Formatting helpers for Indian Rupees and USD
  const membershipPrice = currency === 'INR' ? '₹7,999/mo' : '$99/mo';
  const totalVolumeMetric = currency === 'INR' ? '₹140 Cr+' : '$16.5M+';

  // Hero Card Spreading Animation: false = stacked (1 card visible), true = spread/fanned out
  const [isFanned, setIsFanned] = useState(false);
  const [activeHeroCard, setActiveHeroCard] = useState(null);
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  // Quick View & Toast State
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const heroSectionRef = useRef(null);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Sticky navbar scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fast fan-out animation: starts with 1 card visible (0.35s), then spreads outward quickly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFanned(true);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  // Fast replay animation helper: quickly stacks down to 1 card, then immediately fans out
  const handleReplaySpread = () => {
    playSubtleSound('pop');
    setIsFanned(false);
    setTimeout(() => {
      setIsFanned(true);
    }, 220);
  };

  // 3D Parallax Tilt Handler
  const handleHeroMouseMove = (e) => {
    if (!heroSectionRef.current) return;
    const rect = heroSectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMousePos({ x: 0, y: 0 });
  };

  // 6 Comic Book Hero Cards matching the spreading card deck
  const heroCards = [
    {
      id: 'hero-0',
      isFrontCover: true,
      creator: '@frank.miller',
      artistName: 'Frank Miller & Klaus Janson',
      title: 'Neon Knight #1: The Night Awakens',
      issueNo: 'Issue #1 (1st Appearance)',
      publisher: 'Action Comics Heritage',
      medium: 'Near Mint Certified Archival Edition',
      year: '1974',
      price: 2800,
      priceINR: 238000,
      ethPrice: '1.25 ETH',
      certId: 'Vault Archival #4029184001',
      dimensions: 'Standard Golden Age Archival Frame',
      edition: '1st Print Key Issue #1',
      bids: 24,
      image: comicHeroNeon,
      badgeText: 'Key Issue #1',
    },
    {
      id: 'hero-1',
      creator: '@jack.kirby',
      artistName: 'Jack Kirby & Joe Sinnott',
      title: 'Cosmic Vanguard #42: Celestial Genesis',
      issueNo: 'Issue #42 (Infinity Origin)',
      publisher: 'Marvel Comics Group',
      medium: 'Mint Condition Original Newsstand',
      year: '1982',
      price: 3400,
      priceINR: 289000,
      ethPrice: '1.45 ETH',
      certId: 'Vault Archival #3891047002',
      dimensions: 'Standard Bronze Age Archival Frame',
      edition: 'Holy Grail Key Issue',
      bids: 38,
      image: comicHeroCosmic,
      badgeText: 'Holy Grail',
    },
    {
      id: 'hero-2',
      creator: '@neal.adams',
      artistName: 'Neal Adams & Dick Giordano',
      title: 'Atomic Titan #12: Vault Rampage',
      issueNo: 'Issue #12 (Imperial Vault)',
      publisher: 'DC Comics Heritage',
      medium: 'Bronze Age Origin Masterwork',
      year: '1974',
      price: 4150,
      priceINR: 352750,
      ethPrice: '1.75 ETH',
      certId: 'Vault Archival #4120893003',
      dimensions: 'Standard Bronze Age Archival Frame',
      edition: '1st Print Origin Issue',
      bids: 19,
      image: comicHeroTitan,
      badgeText: 'Bronze Age Key',
    },
    {
      id: 'hero-3',
      creator: '@todd.mcfarlane',
      artistName: 'Todd McFarlane & Greg Capullo',
      title: 'Shadow Protocol #7: The Last Sin',
      issueNo: 'Issue #7 (Noir Special)',
      publisher: 'Dark Horse Noir Graphics',
      medium: 'Limited Edition Foil Variant',
      year: '1991',
      price: 3900,
      priceINR: 331500,
      ethPrice: '1.65 ETH',
      certId: 'Vault Archival #4301948004',
      dimensions: 'Modern Age Certified Frame',
      edition: '1:50 Retailer Foil Incentive',
      bids: 16,
      image: comicHeroNoir,
      badgeText: 'Noir Foil',
    },
    {
      id: 'hero-4',
      creator: '@masamune.shirow',
      artistName: 'Masamune Shirow & Katsuhiro Otomo',
      title: 'Chrono Steel #88: Mecha Titan Clash',
      issueNo: 'Issue #88 (1st Battle Print)',
      publisher: 'Ultra Shonen Shogakukan',
      medium: '1st Edition Japanese Original Manga',
      year: '1988',
      price: 5200,
      priceINR: 442000,
      ethPrice: '2.20 ETH',
      certId: 'Vault Archival #4489201005',
      dimensions: 'Import B6 Manga Archival Frame',
      edition: '1st Edition Original Run',
      bids: 42,
      image: comicHeroMecha,
      badgeText: 'Mecha Grail',
    },
    {
      id: 'hero-5',
      creator: '@jim.starlin',
      artistName: 'Jim Starlin & Bernie Wrightson',
      title: 'Emerald Enigma #1: Power Unleashed',
      issueNo: 'Issue #1 (Secret Keeper)',
      publisher: 'Comic Art Guild Publications',
      medium: 'Direct Market 1st Edition',
      year: '1984',
      price: 4800,
      priceINR: 408000,
      ethPrice: '2.05 ETH',
      certId: 'Vault Archival #4209187006',
      dimensions: 'Bronze Age Certified Frame',
      edition: '1st Appearance Key Issue',
      bids: 21,
      image: comicHeroEmerald,
      badgeText: 'Emerald 1st',
    },
  ];

  // Section 2: Slanted Cascade State & Observer
  const [isSection2Spread, setIsSection2Spread] = useState(false);
  const [activeSection2Card, setActiveSection2Card] = useState(null);
  const section2Ref = useRef(null);

  // Intersection Observer for Section 2 trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSection2Spread(true);
        }
      },
      { threshold: 0.2 }
    );

    if (section2Ref.current) {
      observer.observe(section2Ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleReplaySection2 = () => {
    playSubtleSound('pop');
    setIsSection2Spread(false);
    setTimeout(() => {
      setIsSection2Spread(true);
    }, 700);
  };

  // Section 2 Comic Book Cards matching the slanted cascade
  const section2Cards = [
    {
      id: 'sec2-0',
      creator: '@john.romita',
      artistName: 'John Romita Sr. & Stan Lee',
      title: 'Skyline Reckoning #100: The Final Fight',
      issueNo: 'Centennial Issue #100',
      publisher: 'Marvel Comics Group',
      medium: 'Historic Signature Series Issue',
      year: '1977',
      price: 5400,
      priceINR: 459000,
      ethPrice: '2.30 ETH',
      certId: 'Vault Archival #3982014007',
      dimensions: 'Bronze Age Certified Frame',
      edition: 'Signed by Stan Lee & Romita',
      bids: 53,
      image: comicSec2Skyline,
    },
    {
      id: 'sec2-1',
      creator: '@fiona.staples',
      artistName: 'Fiona Staples & Brian K. Vaughan',
      title: 'Valkyrie Protocol #4: Cyber Blade',
      issueNo: 'Issue #4 (Collector Edition)',
      publisher: 'Image Comics Prime',
      medium: '1:100 Virgin Foil Incentive Edition',
      year: '2019',
      price: 3800,
      priceINR: 323000,
      ethPrice: '1.60 ETH',
      certId: 'Vault Archival #4190823008',
      dimensions: 'Modern Age Certified Frame',
      edition: 'Ultra-Rare 1:100 Virgin Foil',
      bids: 28,
      image: comicSec2Ninja,
    },
    {
      id: 'sec2-2',
      creator: '@george.perez',
      artistName: 'George Pérez & Marv Wolfman',
      title: 'Titan Cipher #1: The Sovereign Throne',
      issueNo: 'Issue #1 (The Reign Begins)',
      publisher: 'Apex Graphic Masterworks',
      medium: 'Premier Newsstand Direct Edition',
      year: '1988',
      price: 4200,
      priceINR: 357000,
      ethPrice: '1.80 ETH',
      certId: 'Vault Archival #4321908009',
      dimensions: 'Copper Age Certified Frame',
      edition: 'Premier Sovereign Debut',
      bids: 33,
      image: comicSec2Doom,
    },
    {
      id: 'sec2-3',
      creator: '@bernie.wrightson',
      artistName: 'Bernie Wrightson & Len Wein',
      title: 'Ghost Desperado #5: Supernatural Showdown',
      issueNo: 'Issue #5 (Weird West)',
      publisher: 'Weird West DC Heritage',
      medium: 'Cult Classic Horrific Western',
      year: '1973',
      price: 6100,
      priceINR: 518500,
      ethPrice: '2.60 ETH',
      certId: 'Vault Archival #3812904010',
      dimensions: 'Bronze Age Certified Frame',
      edition: 'Cult Classic Horrific Western',
      bids: 47,
      image: comicSec2Western,
    },
    {
      id: 'sec2-4',
      creator: '@roy.lichtenstein',
      artistName: 'Roy Lichtenstein & John Buscema',
      title: 'Vintage Valiant #23: Pop Art Heroine',
      issueNo: 'Issue #23 (Battle of the Century)',
      publisher: 'Comic Art Group Golden Publications',
      medium: 'Original 12¢ 1964 Newsstand Issue',
      year: '1964',
      price: 4600,
      priceINR: 391000,
      ethPrice: '1.95 ETH',
      certId: 'Vault Archival #3510928011',
      dimensions: 'Silver Age Certified Frame',
      edition: 'Original 12¢ 1964 Newsstand',
      bids: 39,
      image: comicSec2Pop,
    },
    {
      id: 'sec2-5',
      creator: '@katsuhiro.otomo',
      artistName: 'Katsuhiro Otomo & Jim Lee',
      title: 'Ronin 2099 #15: Neo-Tokyo Variant',
      issueNo: 'Issue #15 (Collectible Variant)',
      publisher: 'Marvel 2099 Cyber Series',
      medium: 'Deluxe Chromium Hologram Cover',
      year: '1994',
      price: 5100,
      priceINR: 433500,
      ethPrice: '2.15 ETH',
      certId: 'Vault Archival #4290184012',
      dimensions: 'Modern Age Certified Frame',
      edition: 'Deluxe Chromium Foil Cover',
      bids: 31,
      image: comicSec2Ronin,
    },
  ];

  return (
    <div className="pallet-app solo-hero-view comic-theme-root">
      {/* 1. Simple Minimalist Navigation Bar */}
      <header className={`pallet-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Brand Logo: Clean & Simple */}
          <a href="#" className="brand-logo" onClick={() => playSubtleSound('click')}>
            <div className="comic-logo-badge">
              <svg
                className="brand-icon comic-bolt"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  fill="#FFDE00"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="brand-title">ComixVault</span>
          </a>

          {/* Simple Clean Desktop Navigation Links */}
          <nav className="desktop-nav">
            <a href="#hero" className="nav-item" onClick={() => playSubtleSound('click')}>
              Home
            </a>
            <a href="#ecommerce" className="nav-item" onClick={() => playSubtleSound('click')}>
              Comics
            </a>
            <a
              href="#pricing"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                playSubtleSound('click');
                showToast(`Pricing: ${membershipPrice}`);
              }}
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                playSubtleSound('click');
                showToast('Contact: vault@comixvault.art');
              }}
            >
              Contact
            </a>
          </nav>

          {/* Simple Clean Actions */}
          <div className="header-actions">
            {/* Interactive Currency Selector - INR / USD */}
            <div className="currency-pill-toggle" role="group" aria-label="Currency selection">
              <button
                className={`curr-btn ${currency === 'INR' ? 'active' : ''}`}
                onClick={() => {
                  setCurrency('INR');
                  playSubtleSound('pop');
                  showToast('Currency set to Indian Rupees (₹ INR)');
                }}
                title="Display prices in Indian Rupees (₹)"
              >
                ₹ INR
              </button>
              <button
                className={`curr-btn ${currency === 'USD' ? 'active' : ''}`}
                onClick={() => {
                  setCurrency('USD');
                  playSubtleSound('pop');
                  showToast('Currency set to US Dollars ($ USD)');
                }}
                title="Display prices in US Dollars ($)"
              >
                $ USD
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className={`bar ${mobileMenuOpen ? 'open-top' : ''}`}></span>
              <span className={`bar ${mobileMenuOpen ? 'open-mid' : ''}`}></span>
              <span className={`bar ${mobileMenuOpen ? 'open-bot' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <div className="mobile-currency-row">
              <div className="currency-pill-toggle">
                <button
                  className={`curr-btn ${currency === 'INR' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrency('INR');
                    playSubtleSound('pop');
                    showToast('Currency set to Indian Rupees (₹ INR)');
                  }}
                >
                  ₹ INR
                </button>
                <button
                  className={`curr-btn ${currency === 'USD' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrency('USD');
                    playSubtleSound('pop');
                    showToast('Currency set to US Dollars ($ USD)');
                  }}
                >
                  $ USD
                </button>
              </div>
            </div>
            <nav className="mobile-nav-links">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
              <a href="#ecommerce" onClick={() => setMobileMenuOpen(false)}>
                Comics
              </a>
              <a
                href="#pricing"
                onClick={() => {
                  setMobileMenuOpen(false);
                  showToast(`Pricing: ${membershipPrice}`);
                }}
              >
                Pricing
              </a>
              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  showToast('Contact: vault@comixvault.art');
                }}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content: Solo Hero Deck & Slanted Cascade Section */}
      <main>
        {/* 1st Section: Comic Book Deck Spreading Showcase */}
        <section
          id="hero"
          className="hero-section comic-hero-bg"
          ref={heroSectionRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          {/* Ambient Comic Glow & Halftone Grid Pattern */}
          <div className="hero-ambient-glow comic-glow"></div>
          <div className="hero-grid-pattern comic-halftone-pattern"></div>

          <div className="hero-container">
            {/* Hero Main Headline with Comic Aesthetic */}
            <h1 className="hero-headline comic-hero-headline animate-slide-up">
              Rare Comic Grails &amp; <br />
              <span className="hero-headline-highlight comic-highlight">Legendary 1st Issues.</span>
            </h1>

            {/* 3D Stack / Fan-Out Comic Book Stage */}
            {/* 3D Stack / Fan-Out Comic Book Stage */}
            <div
              className={`hero-card-stage comic-card-stage ${isFanned ? 'mode-fanned' : 'mode-stacked'}`}
              style={{
                '--tilt-x': `${heroMousePos.y * -6}deg`,
                '--tilt-y': `${heroMousePos.x * 10}deg`,
              }}
            >
              <div className="card-stage-inner">
                {heroCards.map((card, idx) => {
                  const isActive = activeHeroCard === idx;

                  return (
                    <div
                      key={card.id}
                      className={`hero-art-card comic-art-card card-index-${idx} ${isActive ? 'card-active' : ''} ${
                        card.isFrontCover || idx === 0 ? 'front-cover-card' : 'under-card'
                      }`}
                      onMouseEnter={() => {
                        playSubtleSound('click');
                        setActiveHeroCard(idx);
                      }}
                      onMouseLeave={() => setActiveHeroCard(null)}
                      onClick={() => {
                        playSubtleSound('pop');
                        setSelectedArtwork({
                          ...card,
                          artist: card.creator,
                        });
                      }}
                    >
                      {/* Creator & Price Hover Tag with live Indian Rupees */}
                      <div className={`creator-hover-tag comic-hover-tag ${isActive ? 'tag-visible' : ''}`}>
                        <span className="comic-tag-creator">{card.creator}</span>
                        <span className="creator-card-price">
                          {currency === 'INR'
                            ? `₹${card.priceINR.toLocaleString('en-IN')}`
                            : `$${card.price.toLocaleString('en-US')}`}
                        </span>
                      </div>

                      {/* Full-Bleed Comic Book Cover Image - Clean, 100% visible */}
                      <div className="card-cover-wrap comic-cover-wrap">
                        <img src={card.image} alt={card.title} className="card-cover-img comic-img" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subtext describing the Comic Book Vault */}
            <p className="hero-subtext comic-hero-subtext animate-slide-up delay-1">
              Discover vintage Golden &amp; Silver Age first appearances, key issue grails,
              and rare variant graphic novels with cryptographic provenance and insured physical vault storage.
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group animate-slide-up delay-2">
              <button
                className="btn-hero-primary comic-btn-primary"
                onClick={() => {
                  playSubtleSound('pop');
                  showToast(
                    currency === 'INR'
                      ? 'VIP Vault Pass registration opened. ₹7,999/mo plan selected.'
                      : 'VIP Vault Pass registration opened. $99/mo plan selected.'
                  );
                }}
              >
                <span>Join Vault Pass for {membershipPrice}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button
                className="hero-secondary-link comic-secondary-link"
                onClick={() => {
                  playSubtleSound('click');
                  showToast('ComixVault Collector Archive & Catalog 2026');
                }}
              >
                <span>Explore Catalog</span>
                <span className="arrow-hover">→</span>
              </button>
            </div>

            {/* Interactive Animation Control Bar */}
            <div className="animation-state-controls comic-controls">
              <button
                className={`state-toggle-pill ${!isFanned ? 'active' : ''}`}
                onClick={() => {
                  playSubtleSound('click');
                  setIsFanned(false);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="7" y="7" width="10" height="10"></rect>
                </svg>
                Stacked
              </button>

              <button
                className={`state-toggle-pill ${isFanned ? 'active' : ''}`}
                onClick={() => {
                  playSubtleSound('pop');
                  setIsFanned(true);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
                Spread Cards
              </button>

              <button
                className="state-toggle-pill replay-btn"
                onClick={handleReplaySpread}
                title="Replay spreading animation"
              >
                <span>↻ Replay Spread</span>
              </button>
            </div>

            {/* Proof Metrics Strip with Comic Book Stats */}
            <div className="hero-metrics-strip comic-metrics-strip">
              <div className="metric-pill">
                <span className="metric-val">{totalVolumeMetric}</span>
                <span className="metric-lbl">Total Comic Volume</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-pill">
                <span className="metric-val">18,450+</span>
                <span className="metric-lbl">Certified Collector Issues</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-pill">
                <span className="metric-val">Near Mint+</span>
                <span className="metric-lbl">Average Vault Condition</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-pill">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Authenticity Guaranteed</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2nd Section: Comic Exchange with Slanted Cascade Spread ("slanding sprand") */}
        <section
          id="ecommerce"
          className="section-ecommerce comic-exchange-section"
          ref={section2Ref}
        >
          <div className="section2-container">
            <div className="section2-split">
              {/* Left Column: Comic Book Headline Copy & CTAs */}
              <div className="section2-copy-col">
                <span className="section2-eyebrow comic-eyebrow">COMIC VAULT EXCHANGE</span>

                <h2 className="section2-headline comic-headline">
                  Discover, Trade, <br />
                  <span className="section2-accent comic-accent">&amp; Acquire Rare</span> <br />
                  Comic Masterpieces.
                </h2>

                <p className="section2-subtext comic-subtext">
                  A high-frequency exchange where premier comic historians, collectors, and verified archive
                  holders buy, trade, and vault museum-grade grails with instant settlement.
                </p>

                <div className="section2-cta-group">
                  <button
                    className="btn-section2-primary comic-btn-primary"
                    onClick={() => {
                      playSubtleSound('pop');
                      showToast(
                        currency === 'INR'
                          ? 'Vault Pass Membership: ₹7,999/mo selected.'
                          : 'Vault Pass Membership: $99/mo selected.'
                      );
                    }}
                  >
                    Join Vault for {membershipPrice}
                  </button>

                  <button
                    className="btn-section2-link comic-btn-link"
                    onClick={() => {
                      playSubtleSound('click');
                      showToast('Loading Collector Archive & Catalog Data...');
                    }}
                  >
                    Read Guide
                  </button>
                </div>

                {/* Section 2 Animation State Controls */}
                <div className="section2-controls comic-sec2-controls">
                  <button
                    className={`sec2-toggle-pill ${!isSection2Spread ? 'active' : ''}`}
                    onClick={() => {
                      playSubtleSound('click');
                      setIsSection2Spread(false);
                    }}
                  >
                    Stacked Deck
                  </button>

                  <button
                    className={`sec2-toggle-pill ${isSection2Spread ? 'active' : ''}`}
                    onClick={() => {
                      playSubtleSound('pop');
                      setIsSection2Spread(true);
                    }}
                  >
                    Slanted Spread
                  </button>

                  <button
                    className="sec2-toggle-pill replay-btn"
                    onClick={handleReplaySection2}
                    title="Replay slanted cascade animation"
                  >
                    ↻ Replay Slanted Spread
                  </button>
                </div>
              </div>

              {/* Right Column: Slanted Diagonal Cascade Deck of Comic Books */}
              <div className="section2-stage-col">
                <div
                  className={`section2-cascade-stage ${
                    isSection2Spread ? 'mode-slanted-spread' : 'mode-slanted-stacked'
                  }`}
                >
                  <div className="cascade-inner">
                    {section2Cards.map((card, idx) => {
                      const isActive = activeSection2Card === idx;

                      return (
                        <div
                          key={card.id}
                          className={`cascade-art-card comic-cascade-card card-idx-${idx} ${
                            isActive ? 'card-hovered' : ''
                          }`}
                          onMouseEnter={() => {
                            playSubtleSound('click');
                            setActiveSection2Card(idx);
                          }}
                          onMouseLeave={() => setActiveSection2Card(null)}
                          onClick={() => {
                            playSubtleSound('pop');
                            setSelectedArtwork({
                              ...card,
                              artist: card.creator,
                            });
                          }}
                        >
                          {/* Creator & Price Hover Tag in Indian Rupees */}
                          <div className={`creator-hover-tag comic-hover-tag ${isActive ? 'tag-visible' : ''}`}>
                            <span className="comic-tag-creator">{card.creator}</span>
                            <span className="creator-card-price">
                              {currency === 'INR'
                                ? `₹${card.priceINR.toLocaleString('en-IN')}`
                                : `$${card.price.toLocaleString('en-US')}`}
                            </span>
                          </div>

                          <div className="cascade-card-wrap comic-cascade-wrap">
                            <img src={card.image} alt={card.title} className="cascade-card-img comic-img" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3rd Section: Promotional Comic Hero Banner matching reference model with a1.png */}
        <section id="promo-banner" className="section-promo-banner">
          <div className="promo-banner-container">
            <div className="promo-banner-card">
              {/* Left Column: Comic Content */}
              <div className="promo-banner-content">
                <h2 className="promo-banner-title">SPIDER-GWEN</h2>
                <div className="promo-banner-subtitle">FULL METAL</div>
                <div className="promo-banner-offer">
                  <div className="offer-percent">-15%</div>
                  <div className="offer-label">FOR ALL BOOKS</div>
                </div>
                <button
                  className="promo-banner-btn"
                  onClick={() => {
                    playSubtleSound('pop');
                    showToast(
                      currency === 'INR'
                        ? 'Promo code GWEN15 activated! 15% discount applied at checkout.'
                        : 'Promo code GWEN15 activated! 15% discount applied at checkout.'
                    );
                  }}
                >
                  START BUYING
                </button>
              </div>

              {/* Right Column: Dynamic 3D Breakout Character from a1.png */}
              <div className="promo-banner-character-wrap">
                <img
                  src={spiderGwenImg}
                  alt="Spider-Gwen Key Issue Special"
                  className="promo-banner-character-img"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Minimalist Comic Footer */}
      <footer className="simple-comic-footer">
        <div className="footer-container">
          <div className="footer-top-row">
            <div className="footer-brand">
              <div className="comic-logo-badge">
                <svg
                  className="brand-icon comic-bolt"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    fill="#FFDE00"
                    stroke="#111111"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="footer-brand-title">ComixVault</span>
              <span className="footer-brand-tagline">Rare Comic Book &amp; CGC Grails Depository</span>
            </div>

            <nav className="footer-nav-links">
              <a href="#hero" onClick={() => playSubtleSound('click')}>Home</a>
              <a href="#ecommerce" onClick={() => playSubtleSound('click')}>Comics</a>
              <a href="#promo-banner" onClick={() => playSubtleSound('click')}>Special Offer</a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  playSubtleSound('click');
                  showToast(`Pricing: ${membershipPrice}`);
                }}
              >
                Pricing
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playSubtleSound('click');
                  showToast('Contact: vault@comixvault.art');
                }}
              >
                Contact
              </a>
            </nav>
          </div>

          <div className="footer-bottom-row">
            <p className="footer-copyright">
              © 2026 ComixVault Inc. All rights reserved. Depository vaults in Mumbai, London &amp; New York.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🔒 Insured Vault</span>
              <span className="footer-badge">⚡ Live INR / USD</span>
              <span className="footer-badge">✓ Archival Certified</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Comic Book Quick View & Acquisition Modal */}
      {selectedArtwork && (
        <div className="modal-overlay" onClick={() => setSelectedArtwork(null)}>
          <div
            className="modal-card comic-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Comic Book Details"
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedArtwork(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-content-grid">
              {/* Left Image View - Clean, unobstructed */}
              <div className="modal-image-col comic-modal-image-col">
                <div className="comic-modal-slab-frame">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="modal-artwork-img comic-modal-img"
                  />
                </div>
                <div className="modal-provenance-badge comic-provenance-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>100% Certified Original &amp; Vault Insured</span>
                </div>
              </div>

              {/* Right Detail Col */}
              <div className="modal-info-col">
                <div className="modal-artist-header">
                  <div>
                    <h5 className="modal-artist-name">{selectedArtwork.artistName}</h5>
                    <span className="modal-artist-handle comic-artist-handle">{selectedArtwork.creator}</span>
                  </div>
                </div>

                <h3 className="modal-title comic-modal-title">{selectedArtwork.title}</h3>
                <p className="modal-medium comic-modal-medium">{selectedArtwork.medium}</p>

                <div className="modal-specs-table comic-specs-table">
                  <div className="spec-row">
                    <span className="spec-label">Publisher:</span>
                    <span className="spec-value">{selectedArtwork.publisher || 'Marvel Comics Group'}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Issue Key:</span>
                    <span className="spec-value">{selectedArtwork.issueNo || 'Key Issue #1'}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Year:</span>
                    <span className="spec-value">{selectedArtwork.year}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Edition Details:</span>
                    <span className="spec-value comic-spec-grade">{selectedArtwork.edition || '1st Print Key Issue'}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Format:</span>
                    <span className="spec-value">{selectedArtwork.dimensions || 'Archival Collector Frame'}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Vault Status:</span>
                    <span className="spec-value status-available">● Insured in Depository Vault</span>
                  </div>
                </div>

                <div className="modal-price-box comic-modal-price-box">
                  <div className="price-label">Grail Acquisition Price</div>
                  <div className="modal-price-val comic-price-val">
                    {currency === 'INR'
                      ? `₹${(selectedArtwork.priceINR || Math.round(selectedArtwork.price * 85)).toLocaleString('en-IN')}`
                      : `$${selectedArtwork.price.toLocaleString('en-US')}`}
                    <span className="modal-crypto-tag">({selectedArtwork.ethPrice || '1.45 ETH'})</span>
                  </div>
                  {currency === 'INR' && (
                    <div className="modal-inr-equiv">
                      ≈ ${selectedArtwork.price.toLocaleString('en-US')} USD • Instant UPI, Bank Wire &amp; Crypto Settlement
                    </div>
                  )}
                </div>

                <div className="modal-actions-row">
                  <button
                    className="modal-btn-acquire comic-btn-acquire"
                    onClick={() => {
                      const displayPrice = currency === 'INR'
                        ? `₹${(selectedArtwork.priceINR || Math.round(selectedArtwork.price * 85)).toLocaleString('en-IN')}`
                        : `$${selectedArtwork.price.toLocaleString('en-US')}`;
                      showToast(`Grail Acquisition initiated for ${selectedArtwork.title} (${displayPrice}). Vault lock released.`);
                      setSelectedArtwork(null);
                    }}
                  >
                    Acquire Comic Grail
                  </button>
                  <button
                    className="modal-btn-offer comic-btn-bid"
                    onClick={() => {
                      playSubtleSound('click');
                      const minBid = currency === 'INR'
                        ? `₹${Math.round((selectedArtwork.priceINR || (selectedArtwork.price * 85)) * 0.9).toLocaleString('en-IN')}`
                        : `$${Math.round(selectedArtwork.price * 0.9).toLocaleString('en-US')}`;
                      showToast(`Collector bid registered (Starting from ${minBid}). Dispatched to owner.`);
                      setSelectedArtwork(null);
                    }}
                  >
                    Place Collector Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="pallet-toast comic-toast animate-slide-up">
          <span className="toast-sparkle comic-toast-star">⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
