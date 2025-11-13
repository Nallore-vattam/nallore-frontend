import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import domainsData from "../components/mainjsons/Services.json";
import { useNavigate } from "react-router-dom";
import "./PreviewServices.css";

const ServicesPreview = () => {
  const { currentLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 768);
  const touchStartX = useRef(null);
  const touchDelta = useRef(0);

  const domainCount = domainsData.domains.length;

  const getFontClass = () => {
    switch (currentLanguage) {
      case "ta": return "tamil-font";
      case "hi": return "hindi-font";
      default: return "english-font";
    }
  };

  const safeTranslate = (key, fallback = "") => {
    try {
      const translated = t ? t(key) : null;
      return translated && translated !== key ? translated : fallback;
    } catch {
      return fallback;
    }
  };

  // responsive
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // auto-rotate on mobile
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setCurrentIndex(i => (i + 1) % domainCount);
    }, 2600);
    return () => clearInterval(id);
  }, [isMobile, domainCount]);

  // wrap distance helper (returns -n..0..+n centered)
  const relDiff = useCallback((index) => {
    let raw = index - currentIndex;
    // wrap around
    if (raw > domainCount / 2) raw -= domainCount;
    if (raw < -domainCount / 2) raw += domainCount;
    return raw;
  }, [currentIndex, domainCount]);

  const handleDomainClick = (domain) => {
    navigate(`/services/${domain.key}`);
  };

  // touch handlers for swipe on mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    touchDelta.current = 0;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    touchDelta.current = x - touchStartX.current;
  };
  const onTouchEnd = () => {
    const thresh = 40;
    if (touchDelta.current > thresh) setCurrentIndex(i => (i - 1 + domainCount) % domainCount);
    else if (touchDelta.current < -thresh) setCurrentIndex(i => (i + 1) % domainCount);
    touchStartX.current = null;
    touchDelta.current = 0;
  };

  // Desktop orbit preserved
  // (uses absolute positioning in CSS; desktop animation implemented below via requestAnimationFrame)
  const orbitContainerRef = useRef(null);
  const rafRef = useRef(null);
  const lastRef = useRef(null);
  const orbitsRef = useRef([]);

  useEffect(() => {
    if (isMobile) return;
    const container = orbitContainerRef.current;
    if (!container) return;
    const nodes = Array.from(container.querySelectorAll(".orbit-domain"));
    const glow = container.querySelector(".glow-backdrop");
    // orbit params
    const radiusX = 250, radiusY = 100, baseLinearSpeed = 0.03;
    const getCenter = () => ({ cx: container.offsetWidth / 2, cy: container.offsetHeight / 2 });

    const clearance = glow ? Math.max(glow.offsetWidth, glow.offsetHeight) / 2 + 20 : 80;
    const n = nodes.length;
    const step = (2 * Math.PI) / n;
    const avgR = (radiusX + radiusY) / 2;
    const angular = baseLinearSpeed / avgR;

    orbitsRef.current = nodes.map((_, i) => ({
      radiusX: radiusX + clearance,
      radiusY: radiusY + clearance,
      angle: i * step,
      angularSpeed: angular,
    }));

    // initial place
    const placeInitial = () => {
      const { cx, cy } = getCenter();
      orbitsRef.current.forEach((o, i) => {
        const x = cx + Math.cos(o.angle) * o.radiusX;
        const y = cy + Math.sin(o.angle) * o.radiusY;
        const el = nodes[i];
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      });
    };
    placeInitial();

    const animate = (time) => {
      if (!lastRef.current) lastRef.current = time;
      const dt = Math.min(40, time - lastRef.current);
      lastRef.current = time;
      const { cx, cy } = getCenter();
      orbitsRef.current.forEach((o, i) => {
        o.angle += o.angularSpeed * dt;
        const el = nodes[i];
        el.style.left = `${cx + Math.cos(o.angle) * o.radiusX}px`;
        el.style.top = `${cy + Math.sin(o.angle) * o.radiusY}px`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    const onResize = () => {
      // recompute center placement
      placeInitial();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      lastRef.current = null;
    };
  }, [isMobile]);

  // Render
  if (!isMobile) {
    return (
      <section id="services-preview" className="services-preview-section desktop-mode">
        <div className="orbit-system" ref={orbitContainerRef}>
          <div className="center-project-name">
            <div className="glow-backdrop" />
            <img
              src="/images/contentsofweb/logo-5q8siOY4.jpeg"
              alt={safeTranslate("projectName", "Nallore Vattam")}
              className="servicepre-logo"
            />
          </div>

          {domainsData.domains.map((domain, i) => (
            <div
              key={domain.key || i}
              className={`orbit-domain domain-${i}`}
              onClick={() => handleDomainClick(domain)}
              aria-label={domain.title || domain.key}
            >
              <span className={`domain-pill ${getFontClass()}`}>
                {safeTranslate(domain.key, domain.title)}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // MOBILE carousel view
  return (
    <section id="services-preview" className="services-preview-section mobile-mode">
      <div className="mobile-header">
        <h2 className={`${getFontClass()} fw-bold`}>{safeTranslate("chooseDomain", "Choose Your Domain")}</h2>
        <p className={getFontClass()}>{safeTranslate("selectCategory", "Select a category to explore opportunities.")}</p>
      </div>

      <div
        className="carousel-wrapper"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* soft background band */}
        <div className="carousel-bg-band" aria-hidden="true" />

        {domainsData.domains.map((domain, idx) => {
          const d = relDiff(idx); // -n..0..+n
          // compute which visual state
          let state = "hidden";
          if (d === 0) state = "active";
          else if (Math.abs(d) === 1) state = "side";
          else state = "hidden";

          // use your color variables: mapping index order to --card-N-bg
          const colorIndex = (idx % 10) + 1;
          const bgVar = `var(--card-${colorIndex}-bg)`;

          // compute transform: center 0, left -1, right +1 etc.
          const translateX = d * 140; // adjust spacing
          const rotateY = d * 12; // slight angle
          const scale = d === 0 ? 1.06 : Math.abs(d) === 1 ? 0.92 : 0.8;
          const blur = state === "side" ? 2 : state === "hidden" ? 6 : 0;
          const opacity = state === "active" ? 1 : state === "side" ? 0.8 : 0;

          return (
            <article
              key={domain.key || idx}
              className={`carousel-card ${state}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                background: bgVar,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: state === "active" ? 3 : state === "side" ? 2 : 0,
                color: "#fff"
              }}
              onClick={() => handleDomainClick(domain)}
              role="button"
              tabIndex={0}
              aria-label={safeTranslate(domain.key, domain.title)}
              onKeyDown={(e) => { if (e.key === "Enter") handleDomainClick(domain); }}
            >
              <div className="card-inner">
                <div className="icon-circle" aria-hidden="true" style={{ background: "rgba(255,255,255,0.08)" }}>
                  {/* show icon (emoji) */}
                  <span style={{ fontSize: 26 }}>{domain.icon || "🏷️"}</span>
                </div>
                <h4 className={`${getFontClass()} card-title`} style={{ color: "#fff" }}>
                  {safeTranslate(domain.key, domain.title)}
                </h4>
                <p className="card-sub" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {safeTranslate(domain.description, "")}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* indicators */}
      <div className="carousel-indicators" role="tablist" aria-label="Domain list">
        {domainsData.domains.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to ${i + 1}`}
            aria-current={i === currentIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesPreview;
