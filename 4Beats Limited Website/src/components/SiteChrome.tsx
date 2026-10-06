import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/4beats-logo-upload.png";
import { companyPages, expertisePages, servicePages } from "../data/navigation";

function ArrowIcon({ up = false }: { up?: boolean }) {
  return (
    <svg className={up ? "arrow-up" : ""} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<"company" | "services" | "expertise" | null>(null);
  const location = useLocation();
  const companyActive = location.pathname.startsWith("/company/") || location.pathname.startsWith("/industries");
  const servicesActive = location.pathname.startsWith("/services");
  const expertiseActive = location.pathname.startsWith("/expertise");

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const solid = !transparent || scrolled;
  return (
    <header className={`nav-shell shared-header ${solid ? "nav-scrolled" : ""}`}>
      <div className="nav-wrap">
        <Link className="brand" to="/" aria-label="4Beats Limited home"><img src={logo} alt="4Beats Limited" /></Link>
        <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Primary navigation">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <div className={`company-menu ${submenuOpen === "company" ? "submenu-open" : ""}`}>
            <Link to="/company/about" className={companyActive ? "active has-drop" : "has-drop"}>Company</Link>
            <button className="submenu-toggle" onClick={() => setSubmenuOpen(submenuOpen === "company" ? null : "company")} aria-label="Toggle Company menu" aria-expanded={submenuOpen === "company"}>+</button>
            <div className="mega-menu">
              <div className="mega-intro"><small>Company</small><strong>Inside 4Beats</strong><p>Learn about our purpose, principles and the people behind our work.</p></div>
              <div className="mega-links">
                {companyPages.map(([label, path]) => (
                  <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>{label}<ArrowIcon /></NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className={`company-menu services-menu ${submenuOpen === "services" ? "submenu-open" : ""}`}>
            <Link to="/services" className={servicesActive ? "active has-drop" : "has-drop"}>Services</Link>
            <button className="submenu-toggle" onClick={() => setSubmenuOpen(submenuOpen === "services" ? null : "services")} aria-label="Toggle Services menu" aria-expanded={submenuOpen === "services"}>+</button>
            <div className="mega-menu">
              <div className="mega-intro"><small>Services</small><strong>What we build</strong><p>Explore our software, infrastructure, quality and growth capabilities.</p></div>
              <div className="mega-links">
                {servicePages.map(([label, path]) => (
                  <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>{label}<ArrowIcon /></NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className={`company-menu expertise-menu ${submenuOpen === "expertise" ? "submenu-open" : ""}`}>
            <Link to="/expertise" className={expertiseActive ? "active has-drop" : "has-drop"}>Our Expertise</Link>
            <button className="submenu-toggle" onClick={() => setSubmenuOpen(submenuOpen === "expertise" ? null : "expertise")} aria-label="Toggle Expertise menu" aria-expanded={submenuOpen === "expertise"}>+</button>
            <div className="mega-menu">
              <div className="mega-intro"><small>Expertise</small><strong>Technical depth</strong><p>Explore our development and software quality expertise.</p></div>
              <div className="mega-links">
                {expertisePages.map(([label, path]) => (
                  <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>{label}<ArrowIcon /></NavLink>
                ))}
              </div>
            </div>
          </div>
          <Link to="/company/team" onClick={() => setMenuOpen(false)}>Our Team</Link>
          <NavLink to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <Link className="mobile-talk" to="/contact" onClick={() => setMenuOpen(false)}>Let's Talk</Link>
        </nav>
        <Link className="talk-button" to="/contact">Let's Talk <ArrowIcon /></Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            {menuOpen ? <path d="m5 5 14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="4Beats Limited" />
          <p>4Beats Limited is a professional software development firm that is a valuable partner to you by rapidly producing innovative software solutions.</p>
        </div>
        <div><h3>Company</h3><Link to="/company/about">About Us</Link><Link to="/company/vision">Vision</Link><Link to="/company/mission">Mission</Link><Link to="/company/team">Our Team</Link><Link to="/company/values">Our Values</Link><Link to="/company/philosophy">Our Philosophy</Link><Link to="/industries">Industries</Link></div>
        <div>
          <h3>Services</h3>
          {servicePages.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </div>
        <div><h3>Contact</h3><Link to="/contact">Contact Us</Link><a href="mailto:info@4beasts.net">info@4beasts.net</a><a href="tel:+8801716314667">+8801716314667</a><p>Uttara, Dhaka 1230<br />Bangladesh</p></div>
      </div>
      <div className="shell footer-bottom"><span>© Copyright 2026. 4Beats Limited</span><Link to="/#home">Back to top <ArrowIcon up /></Link></div>
    </footer>
  );
}

export { ArrowIcon };
