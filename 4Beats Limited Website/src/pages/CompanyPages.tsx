import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { companyPages } from "../data/navigation";

type PageKey = "about" | "vision" | "mission" | "team" | "values" | "philosophy";

const pageMeta: Record<PageKey, { title: string; eyebrow: string; intro: string }> = {
  about: {
    title: "About Company",
    eyebrow: "Who we are",
    intro: "4Beats Limited is a professional software development firm that is a valuable partner to you by rapidly producing innovative software solutions.",
  },
  vision: {
    title: "Vision",
    eyebrow: "Where we are going",
    intro: "Our vision is to meet the business needs of our clients and our services are built upon innovative thinking and creativity that utilize the most advanced and proven technologies.",
  },
  mission: {
    title: "Mission",
    eyebrow: "Why we build",
    intro: "To combine our unique infrastructure and technological capabilities with the expertise and knowledge of our employees.",
  },
  team: {
    title: "Our Expert Team",
    eyebrow: "The people behind the work",
    intro: "We have three fundamental beliefs – Quality, Schedule and Cost – that are the fundamental between stakeholder's interactions.",
  },
  values: {
    title: "Our Values",
    eyebrow: "What guides us",
    intro: "Quality, Schedule and Cost are the three fundamental beliefs at the center of our stakeholder interactions.",
  },
  philosophy: {
    title: "Our Philosophy",
    eyebrow: "How we earn trust",
    intro: "Our Honesty in Intent-Transparency in Operation business model is fundamental to our continual progress.",
  },
};

const advantages = [
  ["From Idea to Successful Product", "We will use our extensive knowledge of technology to propose a custom solution fitted to your specific requirements and turn your idea into a successful product."],
  ["Well Thought-Out Design", "We start by writing a software design specification which clearly defines the goals and requirements of the product."],
  ["Accountability", "We keep our customers in the loop, not in the dark, with a weekly project update outlining time spent, progress made and the following week's plan."],
  ["Adaptability", "We follow the Agile software development methodology, enabling us to respond to changes in requirements rapidly and cost-effectively."],
  ["Visibility", "We deliver stable, incremental releases containing new product improvements at regular intervals for customer review."],
  ["Low Technical Debt", "Our test-driven approach and frequent refactoring help keep technical debt low and deliver products of the highest quality."],
];

const teamMembers = [
  {
    name: "Dr. Md. Shaiful Islam",
    initials: "SI",
    title: "CSM, Google Agile Certified",
    education: "B.Sc. in Computer Science, M.Sc. in Software Engineering, PhD in Sustainable Supply Chain Management",
    bio: "More than twenty years of running complex IT projects that sit between business strategy and technical delivery. Leads engineering teams through the full software lifecycle — turning early concepts into concrete plans and carrying them through to release — with a strong focus on quality assurance and testing practices at every stage. Hands-on technical leadership across large, mission-critical projects: designing test strategies, improving coverage and cutting defects while keeping delivery on schedule.",
  },
  {
    name: "Alamgir Hossain",
    initials: "AH",
    title: "Diploma in Strategic Management (BTH)",
    education: "Associate in Computer Science (Cyprus College)",
    bio: "Specialist in sales, distribution and export-import operations, with a track record of building stakeholder relationships and driving business growth. Works primarily across the RMG and medical markets, connecting commercial strategy with day-to-day execution.",
  },
  {
    name: "Mamun Hashmee",
    initials: "MH",
    title: "CSM, Google Agile Certified",
    education: "Honors in Economics (DU), MBA (AUB)",
    bio: "A leader whose work spans telecommunications, healthcare and IT, with a focus on strategic planning. Experienced in multicultural business environments across global markets, bringing an economics and management background to technology-led growth.",
  },
  {
    name: "Asif Rouf",
    initials: "AR",
    title: "CSM, CSPO, CSD",
    education: "B.Sc. in ECE, MBA in MIS",
    bio: "Certified across the Scrum roles — ScrumMaster, Product Owner and Developer — with an engineering and information systems background. Bridges product thinking and delivery, helping teams keep scope, quality and timelines aligned.",
  },
];

function usePageMotion() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".company-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function CompanyVisual({ variant }: { variant: PageKey }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = visualRef.current.getBoundingClientRect();
    visualRef.current.style.setProperty("--vx", `${((event.clientX - rect.left) / rect.width - .5) * 16}px`);
    visualRef.current.style.setProperty("--vy", `${((event.clientY - rect.top) / rect.height - .5) * 16}px`);
  };
  return (
    <div className={`company-visual visual-${variant}`} ref={visualRef} onMouseMove={move} onMouseLeave={() => {
      visualRef.current?.style.setProperty("--vx", "0px");
      visualRef.current?.style.setProperty("--vy", "0px");
    }} aria-hidden="true">
      <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
      <div className="visual-core"><span>{variant === "team" ? "4" : "4B"}</span><i /></div>
      <div className="visual-panel panel-a"><small>Build status</small><strong>Production ready</strong><i /></div>
      <div className="visual-panel panel-b"><b /><b /><b /><b /></div>
      <div className="visual-panel panel-c"><span>01</span><span>02</span><span>03</span></div>
      <i className="visual-node node-a" /><i className="visual-node node-b" /><i className="visual-node node-c" />
    </div>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="company-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link><span>/</span><Link to="/company/about">Company</Link><span>/</span><strong>{current}</strong>
    </nav>
  );
}

function CompanyHero({ page }: { page: PageKey }) {
  const meta = pageMeta[page];
  return (
    <section className={`company-hero company-hero-${page}`}>
      <div className="company-hero-grid" />
      <div className="shell company-hero-layout">
        <div className="company-hero-copy">
          <Breadcrumb current={meta.title} />
          <span className="company-eyebrow">{meta.eyebrow}</span>
          <h1><span>{meta.title}</span><em>.</em></h1>
          <p>{meta.intro}</p>
        </div>
        <CompanyVisual variant={page} />
      </div>
    </section>
  );
}

function CompanyStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const draw = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 4))));
        if (progress < 1) frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
      observer.disconnect();
    }, { threshold: .7 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <div className="company-stat company-reveal"><strong ref={ref}>{count}{suffix}</strong><span>{label}</span></div>;
}

function CompanyCTA() {
  return (
    <section className="company-cta">
      <div className="company-cta-orbit" />
      <div className="shell company-cta-inner company-reveal">
        <span>Have a project in mind?</span>
        <h2>Let's build something<br />valuable together.</h2>
        <Link to="/contact">Let's Talk <ArrowIcon /></Link>
      </div>
    </section>
  );
}

function RelatedPages({ current }: { current: PageKey }) {
  const index = companyPages.findIndex(([, path]) => path.endsWith(current === "team" ? "team" : current));
  const next = companyPages[(index + 1) % companyPages.length];
  return (
    <section className="related-pages">
      <div className="shell related-inner company-reveal">
        <span>Continue exploring</span>
        <Link to={next[1]}><small>Next company page</small><strong>{next[0]}</strong><ArrowIcon /></Link>
      </div>
    </section>
  );
}

function CompanyPageShell({ page, children }: { page: PageKey; children: React.ReactNode }) {
  usePageMotion();
  return (
    <main className={`company-page page-${page}`}>
      <SiteHeader />
      <CompanyHero page={page} />
      {children}
      <RelatedPages current={page} />
      <CompanyCTA />
      <SiteFooter />
    </main>
  );
}

export function AboutCompanyPage() {
  return (
    <CompanyPageShell page="about">
      <section className="company-section about-overview">
        <div className="shell editorial-split">
          <div className="section-label company-reveal">Company overview</div>
          <div className="editorial-copy company-reveal">
            <h2>A valuable partner for innovative software solutions.</h2>
            <p>4Beats Limited is a professional software development firm that is a valuable partner to you by rapidly producing innovative software solutions. We have three fundamental beliefs – Quality, Schedule and Cost – that are the fundamental between stakeholder's interactions.</p>
            <p>Our goal is to deliver the products with high quality, on time and competitive cost. We offer different development and software testing services.</p>
          </div>
        </div>
      </section>
      <section className="company-stats-section">
        <div className="shell company-stats-grid">
          <CompanyStat value={10} label="Years of experience" />
          <CompanyStat value={100} suffix="+" label="Happy customers" />
          <CompanyStat value={100} suffix="%" label="Client satisfaction" />
        </div>
      </section>
      <section className="company-section why-company">
        <div className="shell">
          <div className="company-heading company-reveal"><span>Why 4Beats</span><h2>From an idea to a<br />successful product.</h2></div>
          <div className="advantage-grid">
            {advantages.map(([title, text], index) => <article className="advantage-card company-reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="approach-band">
        <div className="shell approach-grid">
          <div className="company-reveal"><span>Our approach</span><h2>Clear thinking before code.</h2></div>
          <blockquote className="company-reveal">“When a new development kicks off, we start by writing a software design specification which clearly defines the goals and requirements of the product.”</blockquote>
        </div>
      </section>
    </CompanyPageShell>
  );
}

export function VisionPage() {
  return (
    <CompanyPageShell page="vision">
      <section className="vision-statement company-section">
        <div className="shell vision-editorial company-reveal">
          <span>The vision</span>
          <blockquote>Our vision is to meet the business needs of our clients and our services are built upon innovative thinking and creativity that utilize the most advanced and proven technologies, providing a wide range of business support.</blockquote>
        </div>
      </section>
      <section className="vision-future">
        <div className="shell vision-future-grid">
          <div className="future-orb company-reveal"><span>∞</span><i /><i /><i /></div>
          <div className="company-reveal"><span>Built on collaboration</span><h2>Valuable solutions.<br />Complete satisfaction.</h2><p>We will strive to provide valuable solutions through effective collaboration of employees and management, and thus ensure complete customer satisfaction.</p></div>
        </div>
      </section>
    </CompanyPageShell>
  );
}

export function MissionPage() {
  return (
    <CompanyPageShell page="mission">
      <section className="company-section mission-focus">
        <div className="shell mission-focus-grid">
          <div className="mission-index company-reveal"><span>M</span><i>Purpose</i></div>
          <div className="mission-copy company-reveal">
            <h2>Design. Develop.<br />Implement.</h2>
            <p>To combine our unique infrastructure and technological capabilities with the expertise and knowledge of our employees to not only successfully design, develop and implement projects of any size but also to augment product development efficiency and responsiveness.</p>
          </div>
        </div>
      </section>
      <section className="mission-process">
        <div className="shell">
          <div className="mission-process-line" />
          {["Unique infrastructure", "Technological capabilities", "Employee expertise", "Efficient, responsive delivery"].map((item, index) => (
            <div className="mission-step company-reveal" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>
    </CompanyPageShell>
  );
}

export function TeamPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <CompanyPageShell page="team">
      <section className="company-section team-introduction">
        <div className="shell editorial-split">
          <div className="section-label company-reveal">Leadership</div>
          <div className="editorial-copy company-reveal"><h2>Experience across technology, strategy and delivery.</h2><p>4Beats Limited is a professional software development firm that is a valuable partner to you by rapidly producing innovative software solutions. Our goal is to deliver the products with high quality, on time and competitive cost.</p></div>
        </div>
      </section>
      <section className="team-directory">
        <div className="shell company-team-grid">
          {teamMembers.map((member, index) => (
            <article className={`company-team-card company-reveal ${open === index ? "is-open" : ""}`} key={member.name}>
              <div className="member-visual"><span>{member.initials}</span><i>0{index + 1}</i></div>
              <div className="member-content"><small>{member.title}</small><h2>{member.name}</h2><p className="member-education">{member.education}</p><p className="member-bio">{member.bio}</p><button onClick={() => setOpen(open === index ? null : index)}>{open === index ? "Close profile" : "Read full profile"} <ArrowIcon /></button></div>
            </article>
          ))}
        </div>
      </section>
    </CompanyPageShell>
  );
}

const companyValues = [
  ["From Idea to Successful Product", "Our Christchurch-based software consultancy is passionate about software design and development, both in the area of embedded firmware & custom .Net web applications. We will use our extensive knowledge of technology to propose a custom solution fitted to your specific requirements and turn your idea into a successful product. We will then implement this solution, manage the project through to its delivery and provide ongoing support as required."],
  ["Well Thought-Out Design", "You will not find any programming cowboy in our team. When a new development kicks off, we start by writing a software design specification which clearly defines the goals and requirements of the product. This document is discussed with you and approved prior to any coding being undertaken."],
  ["Accountability", "We keep our customers in the loop, not in the dark. We email a weekly project update outlining time spent, progress made, issues encountered and the following week's plan so you can keep track of costs & status at any point in time."],
  ["Adaptability", "We follow the Agile software development methodology. This approach enables us to respond to changes in requirements and end-user needs rapidly and cost-effectively."],
  ["Visibility", "We deliver 'slices of the cake' – or stable, incremental releases containing new product improvements – at regular intervals for customer review. This gives you high visibility during development, and gives us the opportunity to improve User Experience based on ongoing feedback as development progresses."],
  ["Low Technical Debt", "Our test-driven approach ensures our code is always testable. This, along with frequent refactoring, helps keep 'technical debt' low and deliver products of the highest quality. It also ensures that maintaining and enhancing existing software is a smooth process."],
  ["Responsiveness", "We are very committed to each and every one of our customer and pride ourselves on being extremely responsive. We will not make you wait when you have an important deadline to meet or a client requiring urgent support. We are known to go above and beyond the call of duty when the situation calls for it and will not charge you more for doing so."],
  ["The Right Tools", "We set up every software project with source control and its own Wiki-based online documentation on our server. Once released, each project is added to our web-based bug & enhancement tracking tool. This tool allows you not only to report any issue encountered but also to request & approve time estimates on any future enhancement required."],
  ["Software Review & QA", "We provide a peer review service for software designed and written by our own team. We also have extensive QA experience and offer software testing services for those companies who need to have their software quality-tested. QA is an important part of our software consultancy service based in Christchurch, New Zealand."],
] as const;

function ValueIcon({ index }: { index: number }) {
  const icons = [
    <><path d="M9.2 17.2h5.6M10 20h4" /><path d="M8.4 13.8A6 6 0 1 1 15.6 13.8c-1.1.8-1.6 1.7-1.6 3.4h-4c0-1.7-.5-2.6-1.6-3.4Z" /><path d="M12 1V0M4.2 4.2 2.8 2.8M19.8 4.2l1.4-1.4M3 10H1m22 0h-2" /></>,
    <><rect x="3" y="4" width="15" height="16" rx="2" /><path d="M7 8h7M7 12h4M7 16h3" /><path d="m13.2 16.8 1.1-3.4 5.8-5.8 2.3 2.3-5.8 5.8-3.4 1.1ZM18.9 8.8l2.3 2.3" /></>,
    <><rect x="4" y="4" width="16" height="17" rx="2.5" /><path d="M9 4V2h6v2M8 9h8" /><circle cx="12" cy="14.5" r="3.5" /><path d="m10.5 14.5 1 1 2-2.3" /></>,
    <><path d="M19.6 8A8 8 0 0 0 5.1 5.2L3 7.5M4.4 16a8 8 0 0 0 14.5 2.8l2.1-2.3" /><path d="M3 3v4.5h4.5M21 21v-4.5h-4.5" /><circle cx="9" cy="12" r="1.3" /><circle cx="15" cy="12" r="1.3" /><path d="M10.3 12h3.4" /></>,
    <><path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r=".6" /><path d="M19 4.5v-2M18 3.5h2" /></>,
    <><path d="M12 2.5 4.5 5.4v5.3c0 5 3 8.2 7.5 10 4.5-1.8 7.5-5 7.5-10V5.4L12 2.5Z" /><path d="m8.4 11.8 2.4 2.4 4.9-5" /></>,
    <><path d="m13.2 1.8-8 11.8h6.7l-1.1 8.6 8-12h-6.7l1.1-8.4Z" /><path d="M4 18H1.5M5.5 21H3" /></>,
    <><path d="m14.2 6.8 2.9-2.9 3 3-3 3" /><path d="m16 8-8.3 8.3" /><path d="m8.6 14.7 2.7 2.7-3.1 3.1-2.7-2.7 3.1-3.1Z" /><path d="m5 5 3.1 3.1M6.5 3.5 9.6 6.6M15.4 14.4l5.1 5.1" /></>,
    <><path d="m12 2 2.1 2.1 3-.1.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.1L12 22l-2.1-2.1-3 .1-.9-2.9-2.5-1.7 1-2.8-1-2.8L6 6.9 6.9 4l3 .1L12 2Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></>,
  ];
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[index]}</svg>;
}

export function ValuesPage() {
  return (
    <CompanyPageShell page="values">
      <section className="company-values-section">
        <div className="shell company-values-grid">
          {companyValues.map(([title, text], index) => <article className="company-value-card company-reveal" key={title}><div className="company-value-icon"><ValueIcon index={index} /></div><h2>{title}</h2><p>{text}</p></article>)}
        </div>
      </section>
    </CompanyPageShell>
  );
}

export function PhilosophyPage() {
  return (
    <CompanyPageShell page="philosophy">
      <section className="philosophy-manifesto">
        <div className="shell manifesto-grid">
          <div className="manifesto-mark company-reveal"><span>H</span><i>Honesty</i></div>
          <div className="manifesto-copy company-reveal"><span>Our business model</span><h2>Honesty in Intent.<br /><em>Transparency in Operation.</em></h2><p>Our Honesty in Intent-Transparency in Operation business model is fundamental to our continual progress.</p></div>
        </div>
      </section>
      <section className="philosophy-trust company-section">
        <div className="shell trust-layout">
          <div className="trust-rings company-reveal"><i /><i /><i /><span>Trust</span></div>
          <blockquote className="company-reveal">“Our integrity is the core of our relationships with our clients, which encourages clients to entrust us with their vision.”</blockquote>
        </div>
      </section>
    </CompanyPageShell>
  );
}
