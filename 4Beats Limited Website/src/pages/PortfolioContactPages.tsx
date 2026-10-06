import { FormEvent, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { ArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { PortfolioProject, portfolioCategoryIds, portfolioProjects } from "../data/portfolio";

function usePageReveal() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: .12 },
    );
    document.querySelectorAll(".pc-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function PageBreadcrumb({ page }: { page: string }) {
  return <nav className="pc-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><strong>{page}</strong></nav>;
}

function PortfolioVisual() {
  return <div className="portfolio-hero-visual" aria-hidden="true">
    <div className="portfolio-browser browser-main"><div><i /><i /><i /><span>project.preview</span></div><section><b /><span /><span /><span /></section></div>
    <div className="portfolio-browser browser-small"><div><i /><i /><i /></div><section><b /><span /><span /></section></div>
    <div className="portfolio-metric"><small>PROJECT VIEW</small><strong>UI / UX</strong><i /></div>
    <svg viewBox="0 0 600 470"><path d="M45 215C160 125 205 280 310 190S460 90 550 175M90 360c100-70 180 35 275-15s130-25 170 15" /></svg>
  </div>;
}

function ProjectImage({ project, compact = false }: { project: PortfolioProject; compact?: boolean }) {
  if (project.image) return <img src={project.image} alt={project.title} />;
  return <div className={`project-asset-placeholder ${compact ? "compact" : ""}`}><span>4B</span><small>Project image unavailable</small></div>;
}

function ProjectCard({ project, related = false }: { project: PortfolioProject; related?: boolean }) {
  return <Link className={`portfolio-project-card ${related ? "related" : ""}`} to={`/portfolio/${project.slug}`}>
    <div className="portfolio-project-image"><ProjectImage project={project} compact={related} /><span>{project.category}</span></div>
    <div className="portfolio-project-content"><small>{project.category}</small><h2>{project.title}</h2><p>{project.description || "Project description unavailable."}</p><strong>View Details <ArrowIcon /></strong></div>
  </Link>;
}

function PortfolioCTA() {
  return <section className="portfolio-cta"><div className="portfolio-cta-shape" /><div className="shell pc-reveal"><span>Have a project in mind?</span><h2>Let’s create something<br />valuable together.</h2><p>Talk with the 4Beats team about your software requirements.</p><Link to="/contact">Contact Us <ArrowIcon /></Link></div></section>;
}

export function PortfolioPage() {
  usePageReveal();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const activeCategory: "All" | "Android Apps" | "Web Applications" = categoryId === "1" ? "Android Apps" : categoryId === "2" ? "Web Applications" : "All";
  const visibleProjects = activeCategory === "All" ? portfolioProjects : portfolioProjects.filter((project) => project.category === activeCategory);
  const selectCategory = (category: "All" | "Android Apps" | "Web Applications") => {
    if (category === "All") setSearchParams({});
    else setSearchParams({ category: portfolioCategoryIds[category] });
  };
  return <main className="portfolio-page">
    <SiteHeader />
    <section className="portfolio-hero">
      <div className="portfolio-grid-bg" />
      <div className="shell portfolio-hero-layout">
        <div><PageBreadcrumb page="Portfolio" /><span className="portfolio-kicker">Selected work</span><h1>Our<br />Portfolio<em>.</em></h1><p>Explore 4Beats Limited projects across Android apps and web applications.</p><Link to="/contact">Discuss Your Project <ArrowIcon /></Link></div>
        <PortfolioVisual />
      </div>
    </section>
    <section className="portfolio-showcase">
      <div className="shell">
        <div className="portfolio-heading pc-reveal"><div><span>Project showcase</span><h2>Selected digital<br />products.</h2></div><p>Browse available projects by application category.</p></div>
        <div className="portfolio-filter pc-reveal" role="tablist" aria-label="Portfolio categories">
          {(["All", "Android Apps", "Web Applications"] as const).map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => selectCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
        </div>
        {visibleProjects.length > 0
          ? <div className="portfolio-project-grid" key={activeCategory}>{visibleProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
          : <div className="portfolio-empty-state" role="status"><span>Web Applications</span><h2>No verified web application projects are available yet.</h2><p>This category is ready for future projects.</p></div>}
      </div>
    </section>
    <PortfolioCTA />
    <SiteFooter />
  </main>;
}

export function ProjectDetailPage() {
  usePageReveal();
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) return <main><SiteHeader /><section className="portfolio-not-found"><div><h1>Project not found.</h1><Link to="/portfolio">Return to Portfolio</Link></div></section><SiteFooter /></main>;
  const related = portfolioProjects.filter((item) => item.category === project.category && item.slug !== project.slug);
  return <main className="project-detail-page">
    <SiteHeader />
    <section className="project-detail-banner"><div className="shell"><h1>{project.title}</h1><nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to={`/portfolio?category=${portfolioCategoryIds[project.category]}`}>Portfolio</Link><span>/</span><strong>{project.title}</strong></nav></div></section>
    <section className="project-information"><div className="shell project-information-grid">
      <div className="project-information-copy pc-reveal"><span>Project information</span><h2>Description:</h2>{project.description ? <p className="project-full-description">{project.description}</p> : <p className="unavailable-copy">Project description unavailable.</p>}
        {project.ownerName && <dl><dt>Owner Name:</dt><dd>{project.ownerName}</dd></dl>}
        {project.appUrl && <dl><dt>App Url:</dt><dd><a href={project.appUrl} target="_blank" rel="noreferrer">{project.appUrl}</a></dd></dl>}
      </div>
      <div className="project-detail-image pc-reveal"><ProjectImage project={project} /></div>
    </div></section>
    {related.length > 0 && <section className="related-projects"><div className="shell"><div className="portfolio-heading pc-reveal"><div><span>Related Projects</span><h2>More {project.category}.</h2></div></div><div className="related-project-grid">{related.map((item) => <ProjectCard project={item} related key={item.slug} />)}</div></div></section>}
    <PortfolioCTA /><SiteFooter />
  </main>;
}

type FormErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type FormStatus = "idle" | "loading" | "success" | "error";

function ContactIcon({ type }: { type: "location" | "email" | "phone" }) {
  const path = type === "location"
    ? <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>
    : type === "email"
      ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>
      : <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5 16.5 16.5 0 0 0 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-4-1-1.2 2.2a13 13 0 0 1-6-6L12 11 11 7 7 3Z" />;
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>;
}

function CommunicationVisual() {
  return <div className="communication-visual" aria-hidden="true">
    <div className="message-card message-one"><i>4B</i><div><strong>Project inquiry</strong><span>Let’s start a conversation</span></div></div>
    <div className="message-card message-two"><span>···</span><div><strong>Team connected</strong><small>Dhaka, Bangladesh</small></div></div>
    <div className="communication-core"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" /></svg><i /></div>
    <svg className="communication-lines" viewBox="0 0 520 390"><path d="M50 100C150 75 170 185 255 195S390 100 475 125M65 300c110 25 125-95 220-90s120 100 190 75" /></svg>
  </div>;
}

export function ContactPage() {
  usePageReveal();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: FormErrors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name) nextErrors.name = "Please enter your full name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!subject) nextErrors.subject = "Please enter a subject.";
    if (!message) nextErrors.message = "Please enter your message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  };

  return <main className="contact-page">
    <SiteHeader />
    <section className="contact-page-hero">
      <div className="shell contact-page-hero-layout">
        <div><PageBreadcrumb page="Contact Us" /><span className="contact-page-kicker">Start a conversation</span><h1>Need<br />Help<em>?</em></h1><p>Reach out to the world's most reliable IT services.</p><div className="hero-contact-list"><a href="mailto:info@4beasts.net"><ContactIcon type="email" /><span><small>Send us mail</small>info@4beasts.net</span></a><a href="tel:+8801716314667"><ContactIcon type="phone" /><span><small>Call us</small>+8801716314667</span></a></div></div>
        <CommunicationVisual />
      </div>
    </section>
    <section className="contact-content">
      <div className="shell contact-content-layout">
        <div className="contact-information">
          <div className="contact-section-heading pc-reveal"><span>Contact information</span><h2>Talk directly with<br />the 4Beats team.</h2></div>
          <div className="contact-info-cards">
            <a className="pc-reveal" href="https://maps.google.com/?q=House+17+Road+5+Sector+12+Uttara+Dhaka+1230+Bangladesh" target="_blank" rel="noreferrer"><ContactIcon type="location" /><span><small>Our location</small>House -17 (4th Floor), Road - 5,<br />Sector 12, Uttara, Dhaka 1230,<br />Bangladesh.</span><ArrowIcon /></a>
            <a className="pc-reveal" href="mailto:info@4beasts.net"><ContactIcon type="email" /><span><small>Email</small>info@4beasts.net<br />4beatsltd@gmail.com</span><ArrowIcon /></a>
            <a className="pc-reveal" href="tel:+8801716314667"><ContactIcon type="phone" /><span><small>Phone</small>+8801716314667</span><ArrowIcon /></a>
          </div>
        </div>
        <form className="full-contact-form pc-reveal" onSubmit={submit} noValidate>
          <div className="full-form-heading"><span>Send an inquiry</span><small>* Required fields</small></div>
          <div className="form-field-grid">
            <label>Full Name <b>*</b><input name="name" type="text" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby="name-error" />{errors.name && <i id="name-error">{errors.name}</i>}</label>
            <label>Email Address <b>*</b><input name="email" type="email" placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby="email-error" />{errors.email && <i id="email-error">{errors.email}</i>}</label>
            <label>Phone Number <small>Optional</small><input name="phone" type="tel" placeholder="+880" /></label>
            <label>Company Name <small>Optional</small><input name="company" type="text" placeholder="Your company" /></label>
          </div>
          <label>Subject <b>*</b><input name="subject" type="text" placeholder="How can we help?" aria-invalid={!!errors.subject} aria-describedby="subject-error" />{errors.subject && <i id="subject-error">{errors.subject}</i>}</label>
          <label>Message <b>*</b><textarea name="message" rows={5} placeholder="Tell us about your project or inquiry" aria-invalid={!!errors.message} aria-describedby="message-error" />{errors.message && <i id="message-error">{errors.message}</i>}</label>
          {status === "success" && <div className="form-status success" role="status"><strong>Form preview complete.</strong> No message was sent because a form backend is not connected.</div>}
          {status === "error" && <div className="form-status error" role="alert"><strong>Please review the highlighted fields.</strong> Correct the errors and try again.</div>}
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Preparing message…" : status === "error" ? "Retry" : "Send Message"} <ArrowIcon /></button>
        </form>
      </div>
    </section>
    <section className="contact-location">
      <div className="shell contact-location-layout">
        <div className="location-copy pc-reveal"><span>Visit us</span><h2>Uttara,<br />Dhaka.</h2><p>House -17 (4th Floor), Road - 5, Sector 12, Uttara, Dhaka 1230, Bangladesh.</p><a href="https://maps.google.com/?q=House+17+Road+5+Sector+12+Uttara+Dhaka+1230+Bangladesh" target="_blank" rel="noreferrer">Get Directions <ArrowIcon /></a></div>
        <div className="map-placeholder pc-reveal"><div className="map-grid" /><i /><span><strong>4Beats Limited</strong>Verified office address</span><small>Interactive map preview</small></div>
      </div>
    </section>
    <section className="contact-additional"><div className="shell pc-reveal"><span>Technology support</span><h2>Contact us for any<br />support you need.</h2><a href="tel:+8801716314667">Call +8801716314667 <ArrowIcon /></a></div></section>
    <SiteFooter />
  </main>;
}
