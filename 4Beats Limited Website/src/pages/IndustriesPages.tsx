import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { industries } from "../data/industries";

function useIndustriesReveal() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: .1 },
    );
    document.querySelectorAll(".industry-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function IndustryIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    hotel: <><path d="M4 21V5h10v16M14 10h6v11M7 9h2m-2 4h2m-2 4h2m8-3h2m-2 4h2M2 21h20" /></>,
    bank: <><path d="m3 9 9-6 9 6H3Zm2 11h14M6 9v8m4-8v8m4-8v8m4-8v8M3 20h18" /></>,
    car: <><path d="m5 16-2-1v-4l2-1 2-4h10l2 4 2 1v4l-2 1" /><path d="M5 16h14M7 16v2m10-2v2M6 11h12" /><circle cx="7" cy="13" r="1" /><circle cx="17" cy="13" r="1" /></>,
    media: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="m3 11 18-5M7 5l3 5m4-6 3 5M8 15h8" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
    trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4Zm4 8v5m-4 4h8m-6-4h4" /><path d="M8 6H4v2a3 3 0 0 0 4 3m8-5h4v2a3 3 0 0 1-4 3" /></>,
    truck: <><path d="M3 6h11v11H3V6Zm11 4h4l3 3v4h-7v-7Z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    plane: <><path d="m22 2-8.5 8.5L4 7l-2 2 8 5-4 4 1 3 5-4 5 3 2-2-3.5-9.5L22 2Z" /></>,
    heart: <><path d="M20.8 5.7a5 5 0 0 0-7.1 0L12 7.4l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.2a5 5 0 0 0 0-7.1Z" /><path d="M7 12h3l1-2 2 5 1-3h3" /></>,
    energy: <><rect x="4" y="5" width="15" height="14" rx="2" /><path d="M19 10h2v4h-2m-7-7-3 5h4l-3 5" /></>,
    construction: <><path d="M4 14a8 8 0 0 1 16 0M2 14h20M9 6v5m6-5v5M6 14v6m12-6v6M4 20h16" /></>,
    fintech: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M9 6h6m-6 12h6M12 9v6m2-5.2c-.5-.5-1.2-.8-2-.8-1.1 0-2 .7-2 1.5s.9 1.5 2 1.5 2 .7 2 1.5-.9 1.5-2 1.5c-.8 0-1.5-.3-2-.8" /></>,
    home: <><path d="m3 11 9-8 9 8v10H3V11Z" /><path d="M9 21v-7h6v7m4-13-7 6-7-6" /></>,
    education: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.5V16c3 2 9 2 12 0v-4.5M22 9v6" /></>,
    building: <><path d="M4 21V4h11v17M15 9h5v12M7 8h2m2 0h1M7 12h2m2 0h1M7 16h2m2 0h1m6-3h1m-1 4h1M2 21h20" /></>,
    food: <><path d="M6 3v8m-3-8v5a3 3 0 0 0 6 0V3M6 11v10M15 3v18M15 3c4 2 4 8 0 10" /></>,
    oil: <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /><path d="M12 8c-1.5 2-2 2.7-2 3.5a2 2 0 0 0 4 0c0-.8-.5-1.5-2-3.5Z" /></>,
    retail: <><path d="M5 8h14l1 13H4L5 8Zm3 0a4 4 0 0 1 8 0" /><path d="M8 13h8" /></>,
  };
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

function IndustryBreadcrumb({ title }: { title?: string }) {
  return <nav className="industry-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/industries">Industries</Link>{title && <><span>/</span><strong>{title}</strong></>}</nav>;
}

export function IndustriesPage() {
  useIndustriesReveal();
  return <main className="industries-page">
    <SiteHeader />
    <section className="industries-heading-section">
      <div className="industries-heading-glow" />
      <div className="shell industries-heading-layout">
        <div><IndustryBreadcrumb /><span>INDUSTRIES</span><h1>Industries We Serve</h1><p>We build tailored digital solutions for businesses across diverse industries, helping organizations streamline operations, improve experiences, and grow with technology.</p></div>
      </div>
    </section>
    <section className="industries-directory" id="industries-grid">
      <div className="shell">
        <div className="industries-grid">
          {industries.map((industry, index) => <Link className="industry-card industry-reveal" style={{ transitionDelay: `${(index % 3) * 45}ms` }} to={`/industries/${industry.slug}`} key={industry.slug}><div className="industry-icon"><IndustryIcon name={industry.icon} /></div><div><h2>{industry.title}</h2><p>{industry.description}</p></div><ArrowIcon /></Link>)}
        </div>
        <a className="all-industries-link industry-reveal" href="#industries-grid">All Industries <ArrowIcon /></a>
      </div>
    </section>
    <SiteFooter />
  </main>;
}

export function IndustryDetailPage() {
  useIndustriesReveal();
  const { slug } = useParams();
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return <main><SiteHeader /><section className="industry-not-found"><h1>Industry not found.</h1><Link to="/industries">View All Industries</Link></section><SiteFooter /></main>;
  return <main className="industry-detail-page">
    <SiteHeader />
    <section className="industry-detail-hero"><div className="shell"><div><IndustryBreadcrumb title={industry.title} /><span>INDUSTRY</span><h1>{industry.title}<em>.</em></h1><p>{industry.description}</p></div><div className="industry-detail-icon"><IndustryIcon name={industry.icon} /></div></div></section>
    <section className="industry-detail-placeholder"><div className="shell industry-reveal"><span>Industry detail</span><h2>{industry.title}</h2><p>{industry.description}</p><div>Additional industry information is not available yet.</div><Link to="/contact">Discuss Your Project <ArrowIcon /></Link></div></section>
    <section className="industry-back"><div className="shell"><Link to="/industries">View All Industries <ArrowIcon /></Link></div></section>
    <SiteFooter />
  </main>;
}
