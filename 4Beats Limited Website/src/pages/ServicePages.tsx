import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { ArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { servicePages } from "../data/navigation";
import { ServiceKey, services } from "../data/serviceContent";

function useServiceMotion(dependency = "overview") {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: .12 },
    );
    document.querySelectorAll(".service-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [dependency]);
}

function ServiceBreadcrumb({ title }: { title?: string }) {
  return <nav className="service-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link>{title && <><span>/</span><strong>{title}</strong></>}</nav>;
}

function ServiceIcon({ type }: { type: string }) {
  const symbols: Record<string, string> = { neural: "AI", blockchain: "BL", software: "</>", devops: "CI", teams: "04", testing: "QA", sharepoint: "SP", security: "SSL", hosting: ".COM", marketing: "SEO", support: "IT" };
  return <span>{symbols[type] || "4B"}</span>;
}

function ServiceVisual({ type }: { type: string }) {
  if (type === "devops") return <div className="service-hero-visual pipeline-visual">{["Code", "Build", "Test", "Deploy", "Monitor"].map((item, index) => <div key={item}><i>{index + 1}</i><span>{item}</span></div>)}<svg viewBox="0 0 500 180"><path d="M45 90H455" /></svg></div>;
  if (type === "software") return <div className="service-hero-visual software-visual"><div className="code-window"><i /><i /><i /><span /><span /><span /><span /></div><div className="product-window"><b /><span /><span /><span /></div><div className="visual-flow"><i /><i /><i /></div></div>;
  if (type === "blockchain" || type === "neural") return <div className={`service-hero-visual network-visual ${type}`}><svg viewBox="0 0 500 400"><path d="M60 200 165 80l100 110L385 85l65 125-110 105-130-40L80 325 60 200Zm105-120 45 195m55-85 75 125m45-230-175 190M60 200l205-10M80 325l185-135" /></svg>{[0,1,2,3,4,5,6].map((node) => <i key={node}><span>{node % 2 ? "01" : "4B"}</span></i>)}</div>;
  if (type === "teams") return <div className="service-hero-visual collaboration-visual"><svg viewBox="0 0 500 400"><path d="M95 200h115m80 0h115M250 200 145 80m105 120L145 320m105-120L355 80m-105 120 105 120" /></svg>{["SI","AH","4B","MH","AR"].map((item,index) => <i key={item} className={`person-${index}`}>{item}</i>)}</div>;
  if (type === "sharepoint") return <div className="service-hero-visual enterprise-visual"><div className="enterprise-nav"><i /><i /><i /></div><div className="doc-card"><b>DOC</b><span /><span /></div><div className="doc-card second"><b>BI</b><span /><span /></div><div className="workflow-card"><i /><i /><i /></div></div>;
  if (type === "security") return <div className="service-hero-visual security-visual"><div className="shield-shape"><span /><i /></div><div className="certificate"><small>SECURE CONNECTION</small><strong>Certificate verified</strong><i /></div><svg viewBox="0 0 500 400"><path d="M70 200h110m140 0h110" /></svg></div>;
  if (type === "hosting") return <div className="service-hero-visual hosting-visual"><div className="domain-search"><span>yourdomain.com</span><i /></div><div className="server-stack">{[0,1,2].map((item)=><div key={item}><i /><i /><span /></div>)}</div><svg viewBox="0 0 500 400"><path d="M250 150v105m0-52-120 80m120-80 120 80" /></svg></div>;
  if (type === "marketing") return <div className="service-hero-visual marketing-visual"><div className="metric"><small>Visibility</small><strong>SEO</strong><i /></div><div className="marketing-chart"><svg viewBox="0 0 300 130"><path d="M0 105C45 100 55 70 90 80s52-52 95-35 68-30 115-32" /></svg></div><div className="campaign-bars"><i /><i /><i /><i /><i /></div></div>;
  if (type === "testing") return <div className="service-hero-visual testing-visual"><div className="testing-screen"><span /><span /><span /><i /></div><b>✓</b><b>✓</b></div>;
  return <div className="service-hero-visual support-visual"><div className="support-dashboard"><div><i /><strong>System</strong><span>Operational</span></div><div><i /><strong>Support</strong><span>Connected</span></div><div><i /><strong>Updates</strong><span>Current</span></div></div><div className="support-ring"><ServiceIcon type={type} /></div></div>;
}

function ServiceCTA({ title }: { title: string }) {
  return <section className="service-cta"><div className="shell service-cta-inner service-reveal"><span>Ready to start?</span><h2>Let’s discuss your<br />{title.toLowerCase()} needs.</h2><Link to="/contact">Let's Talk <ArrowIcon /></Link></div></section>;
}

function RelatedServices({ current }: { current: ServiceKey }) {
  const currentIndex = servicePages.findIndex(([, path]) => path.endsWith(current));
  const related = [1, 2, 3].map((offset) => servicePages[(currentIndex + offset) % servicePages.length]);
  return <section className="related-services"><div className="shell"><div className="service-section-heading service-reveal"><span>Related services</span><h2>Continue exploring.</h2></div><div className="related-service-grid">{related.map(([label,path], index) => <Link className="service-reveal" to={path} key={path}><span>0{index + 1}</span><strong>{label}</strong><ArrowIcon /></Link>)}</div></div></section>;
}

export function ServicesOverviewPage() {
  useServiceMotion();
  return (
    <main className="services-page">
      <SiteHeader />
      <section className="services-overview-hero">
        <div className="services-overview-glow" />
        <div className="shell services-overview-layout">
          <div><ServiceBreadcrumb /><span className="service-kicker">What we do</span><h1>Technology services<br />built around business.</h1><p>4Beats Limited is a professional software development firm that is a valuable partner to you by rapidly producing innovative software solutions. We offer different development and software testing services.</p><div className="service-hero-actions"><a href="#all-services">Explore Our Services <ArrowIcon /></a><Link to="/contact">Contact Us</Link></div></div>
          <ServiceVisual type="support" />
        </div>
      </section>
      <section className="services-directory" id="all-services">
        <div className="shell">
          <div className="service-section-heading service-reveal"><span>Our services</span><h2>Expertise for every<br />stage of growth.</h2></div>
          <div className="services-directory-grid">
            {servicePages.map(([label,path], index) => {
              const key = path.split("/").pop() as ServiceKey;
              const service = services[key];
              return <article className={`directory-card directory-${index + 1} service-reveal`} key={path}><div className="directory-icon"><ServiceIcon type={service.theme} /></div><span>{String(index + 1).padStart(2,"0")}</span><h2>{label}</h2><p>{service.intro || service.description}</p><Link to={path}>Explore Service <ArrowIcon /></Link></article>;
            })}
          </div>
        </div>
      </section>
      <RelatedServices current="software-development" />
      <ServiceCTA title="technology" />
      <SiteFooter />
    </main>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const key = slug as ServiceKey;
  const service = services[key];
  useServiceMotion(slug);
  if (!service) return <main><SiteHeader /><section className="missing-service"><h1>Service not found.</h1><Link to="/services">View all services</Link></section><SiteFooter /></main>;
  return (
    <main className={`service-detail page-service-${service.theme}`}>
      <SiteHeader />
      <section className="service-detail-hero">
        <div className="service-hero-grid" />
        <div className="shell service-detail-layout">
          <div className="service-detail-copy"><ServiceBreadcrumb title={service.title} /><span className="service-kicker">{service.shortTitle}</span><h1>{service.title}<em>.</em></h1><p>{service.intro || service.description}</p><Link to="/contact">{service.cta} <ArrowIcon /></Link></div>
          <ServiceVisual type={service.theme} />
        </div>
      </section>
      <section className="service-overview-block">
        <div className="shell service-overview-layout">
          <div className="service-side-label service-reveal">Service overview</div>
          <div className="service-overview-copy service-reveal"><h2>{service.title}</h2><p>{service.description}</p>{service.additional?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </section>
      {service.items && service.listTitle && <section className="service-capabilities">
        <div className="shell">
          <div className="service-section-heading service-reveal"><span>Service details</span><h2>{service.listTitle}</h2></div>
          <div className="capability-grid">{service.items.map((item,index) => <article className="service-reveal" key={item}><span>{String(index + 1).padStart(2,"0")}</span><strong>{item}</strong></article>)}</div>
        </div>
      </section>}
      {service.groups?.map((group) => <section className="service-source-group" key={group.title}><div className="shell"><div className="service-section-heading service-reveal"><span>More information</span><h2>{group.title}</h2></div>{group.paragraphs?.map((paragraph) => <p className="service-source-paragraph service-reveal" key={paragraph}>{paragraph}</p>)}{group.items && <div className="service-source-list">{group.items.map((item) => <div className="service-reveal" key={item}>{item}</div>)}</div>}{group.after?.map((paragraph) => <p className="service-source-paragraph service-reveal after" key={paragraph}>{paragraph}</p>)}</div></section>)}
      <RelatedServices current={key} />
      <ServiceCTA title={service.shortTitle} />
      <SiteFooter />
    </main>
  );
}
