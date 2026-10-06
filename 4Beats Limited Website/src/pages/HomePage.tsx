import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { trustedBusinessCount, trustedLogoSlots } from "../data/trustedLogos";

type IconName =
  | "arrow"
  | "brain"
  | "check"
  | "code"
  | "compass"
  | "eye"
  | "layers"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "shield"
  | "spark"
  | "team"
  | "tools"
  | "x";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    brain: <><path d="M9.5 4A3.5 3.5 0 0 0 6 7.5v.3A3.7 3.7 0 0 0 4 14a3.5 3.5 0 0 0 5.5 4.1V4Z" /><path d="M14.5 4A3.5 3.5 0 0 1 18 7.5v.3a3.7 3.7 0 0 1 2 6.2 3.5 3.5 0 0 1-5.5 4.1V4Z" /><path d="M9.5 9H8m8 0h-1.5m-5 5H8m8 0h-1.5" /></>,
    check: <><path d="m5 12 4 4L19 6" /><path d="M21 12a9 9 0 1 1-5.2-8.2" /></>,
    code: <><path d="m8 9-4 3 4 3m8-6 4 3-4 3" /><path d="m14 5-4 14" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    eye: <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5 16.5 16.5 0 0 0 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-4-1-1.2 2.2a13 13 0 0 1-6-6L12 11 11 7 7 3Z" />,
    shield: <><path d="M12 3 4 6v5c0 5.2 3.4 8.6 8 10 4.6-1.4 8-4.8 8-10V6l-8-3Z" /><path d="m8.5 12 2.3 2.3 4.7-5" /></>,
    spark: <><path d="m12 2 1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    team: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2.4-6 6-6s6 2 6 6" /><circle cx="17" cy="9" r="2" /><path d="M16 15c3.2-.3 5 1.4 5 4" /></>,
    tools: <><path d="m14 7 3-3 3 3-3 3" /><path d="m16 8-8 8" /><path d="m7 14 3 3-3 3-3-3 3-3Z" /></>,
    x: <path d="m5 5 14 14M19 5 5 19" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const services = [
  {
    title: "Software Development",
    icon: "code" as IconName,
    text: "Significant cost savings and time-to-market reduction are the advantages of dedicated teams and offshore software development services.",
    className: "service-large",
  },
  {
    title: "AI and Machine Learning",
    icon: "brain" as IconName,
    text: "AI & ML-powered solutions tailored to elevate your business—optimize workflows, cut costs, and unlock smarter decisions.",
    className: "service-ai",
  },
  {
    title: "Dedicated Teams",
    icon: "team" as IconName,
    text: "Our clients receive full cycle custom software development services to build effective tools for business in one place.",
    className: "",
  },
  {
    title: "Software Testing & QA",
    icon: "check" as IconName,
    text: "Quality is one of the cornerstones in software development. We provide quality assurance and software testing services to verify error-free software product operation. We do our best to deliver products that accelerate return on investment (ROI) process.",
    className: "service-wide",
  },
  {
    title: "Software Maintenance",
    icon: "tools" as IconName,
    text: "IT software consulting and technology-driven advice to enhance and develop your business. Outsourcing your information technology requirements to us lets you concentrate on your core business activities while we handle major administrative and technological issues and lower your operational cost.",
    className: "",
  },
];

const features = [
  ["From Idea to Successful Product", "Our Christchurch-based software consultancy is passionate about software design and development, both in the area of embedded firmware & custom .Net web applications. We will use our extensive knowledge of technology to propose a custom solution fitted to your specific requirements and turn your idea into a successful product. We will then implement this solution, manage the project through to its delivery and provide ongoing support as required.", "spark"],
  ["Well Thought-Out Design", "You will not find any programming cowboy in our team. When a new development kicks off, we start by writing a software design specification which clearly defines the goals and requirements of the product. This document is discussed with you and approved prior to any coding being undertaken.", "layers"],
  ["Accountability", "We keep our customers in the loop, not in the dark. We email a weekly project update outlining time spent, progress made, issues encountered and the following week's plan so you can keep track of costs & status at any point in time.", "shield"],
  ["Adaptability", "We follow the Agile software development methodology. This approach enables us to respond to changes in requirements and end-user needs rapidly and cost-effectively.", "compass"],
  ["Visibility", "We deliver 'slices of the cake' – or stable, incremental releases containing new product improvements – at regular intervals for customer review. This gives you high visibility during development, and gives us the opportunity to improve User Experience based on ongoing feedback as development progresses.", "eye"],
  ["Low Technical Debt", "Our test-driven approach ensures our code is always testable. This, along with frequent refactoring, helps keep 'technical debt' low and deliver products of the highest quality. It also ensures that maintaining and enhancing existing software is a smooth process.", "code"],
  ["Responsiveness", "We are very committed to each and every of our customer and pride ourselves on being extremely responsive. We will not make you wait when you have an important deadline to meet or a client requiring urgent support. We are known to go above and beyond the call of duty when the situation calls for it and will not charge you more for doing so.", "spark"],
  ["The Right Tools", "We set up every software project with source control and its own Wiki-based online documentation on our server. Once released, each project is added to our web-based bug & enhancement tracking tool. This tool allows you not only to report any issue conveniently but also to request & approve time estimates on any future enhancement required.", "tools"],
  ["Software Review & QA", "We provide a peer review service for software designed and written by your own team. We also have extensive QA experience and offer software testing services for those companies who need to have their software quality-tested. QA is an important part of our software consultancy service based in Christchurch, New Zealand.", "check"],
] as [string, string, IconName][];

const expertise = [
  {
    short: "Technical",
    title: "Technical Expertise",
    body: "4Beats Ltd. believes that effective collaboration enhances value. As such we leverage on our multi-disciplinary expertise to provide end-to-end solutions for our clients.",
    tags: ["Application Design and Development", "Custom Software Design & Development", "Product Design and Development", "Database Design and Development", "System and Application Integration", "Data Modeling / Data Warehousing", "Enterprise Systems", "Infrastructure Support and Services", "QA / Testing", "Technical Support"],
  },
  {
    short: ".NET",
    title: "Microsoft .NET Platform",
    body: "Our .Net experts develop web application using ASP.NET, MVC, C# where ASP.NET is a next generation of proven ASP.NET technology platform from Microsoft. It is a web application framework that implements the model-view-controller (MVC) pattern that gives ASP.NET developers powerful methods to build dynamic websites. This technology allows a clean separation of business logic and also gives full control over markup for enjoyable agile development.",
    tags: ["ASP.NET", "MVC", "C#", ".NET Framework", "HTML5"],
  },
  {
    short: "Web",
    title: "Web Developers & Web Designers",
    body: "Experienced in diverse website development, to include complex E-commerce websites, Social Networking websites, Content Management Systems (CMS), Flash websites, 2D/3D Animation, Gaming, and Mobile application. Skilled in developing multimedia solutions using state-of-the-art technology.",
    tags: ["Graphic Design", "Animation", "Web Analysis", "Content Management", "Mobile"],
  },
  {
    short: "Platforms",
    title: "Platforms, Databases & Technologies",
    body: "Platforms: Windows, UNIX, Linux, IBM Mainframe, AS400. Databases: Oracle, Sybase, MS SQL, MySQL, IMS, DB2, MS Access, RPG.",
    tags: ["COM/DCOM/COM+", "SOAP", "ADSI", "ADO", "ODBC", "OLE DB", "DTS", "OLAP", "UML", "Design Patterns", "JDBC", "Java Beans", "Swing/JFC", "Servlets", "XSL"],
  },
  {
    short: "Domain",
    title: "Domain Expertise",
    body: "Challenges vary according to business and as such so do solutions. 4Beats Ltd. with its experience as a global solution provider for various sectors, has acquired an in-depth understanding of diverse domains, which enables us to create a valuable difference for our clients.",
    tags: ["Banking & Finance", "Insurance", "Healthcare", "Pharmaceutical", "Telecommunications", "E-Commerce", "Education", "Advertising & Media", "Tours & Travel", "Hospitality", "Government"],
  },
  {
    short: "SharePoint",
    title: "Microsoft SharePoint 2010/2013",
    body: "4Beats Limited has experts with experiences of more than 10 years on major Microsoft platforms including Windows Server, SQL Server, Exchange Server, Reporting Services and Active Directory. Our Microsoft SharePoint developers are adequately equipped with knowledge and expertise to offer high-end SharePoint solutions to our clients.",
    tags: ["SharePoint Deployment", "Integration", "Site Branding", "Portal Development", "Site Migration", "Custom Webparts", "Custom Workflows", "Enterprise Content Management", "Business Intelligence", "SQL Reporting", "Maintenance Services"],
  },
  {
    short: "Growth",
    title: "SEO & Languages",
    body: "Our marketing specialists handle website optimization, competitor analysis, PPC, affiliate and email marketing, and online ad campaigns.",
    tags: ["HTML", "DHTML", "PHP", "ASP", "ASP.NET", "JSP", "JAVA", "JavaScript", "XML", "VB.NET", "C/C++", "J2ME"],
  },
  {
    short: "Process",
    title: "Process Expertise & Servers",
    body: "4Beats Ltd. process methodology is a culmination of our years of experience in the IT industry and the expertise enriched thereby. It is well-defined, yet flexible to meet diverse client requirements. Servers: IIS 4.0/5.0/6.0, Commerce Server, BizTalk Server, Application Server, SQL Server, Apache, Linux, Cold Fusion.",
    tags: ["Project Process", "Project Management", "IIS", "Commerce Server", "BizTalk", "SQL Server", "Apache", "Linux", "Cold Fusion"],
  },
];

const team = [
  {
    name: "Dr. Md. Shaiful Islam",
    title: "CSM, Google Agile Certified",
    education: "B.Sc. in Computer Science, M.Sc. in Software Engineering, PhD in Sustainable Supply Chain Management",
    bio: "More than twenty years of running complex IT projects that sit between business strategy and technical delivery. Leads engineering teams through the full software lifecycle — turning early concepts into concrete plans and carrying them through to release — with a strong focus on quality assurance and testing practices at every stage.",
  },
  {
    name: "Alamgir Hossain",
    title: "Diploma in Strategic Management (BTH)",
    education: "Associate in Computer Science (Cyprus College)",
    bio: "Specialist in sales, distribution and export-import operations, with a track record of building stakeholder relationships and driving business growth. Works primarily across the RMG and medical markets, connecting commercial strategy with day-to-day execution.",
  },
  {
    name: "Mamun Hashmee",
    title: "CSM, Google Agile Certified",
    education: "Honors in Economics (DU), MBA (AUB)",
    bio: "A leader whose work spans telecommunications, healthcare and IT, with a focus on strategic planning. Experienced in multicultural business environments across global markets, bringing an economics and management background to technology-led growth.",
  },
  {
    name: "Asif Rouf",
    title: "CSM, CSPO, CSD",
    education: "B.Sc. in ECE, MBA in MIS",
    bio: "Certified across the Scrum roles — ScrumMaster, Product Owner and Developer — with an engineering and information systems background. Bridges product thinking and delivery, helping teams keep scope, quality and timelines aligned.",
  },
];

const platforms = ["WordPress", "Microsoft SQL Server", "Zend Framework", "Joomla", "SharePoint", "Mobile App", "PHP / MySQL", "Magento", "Flutter", "ASP.NET", "React JS", "Spring", "Java", "TensorFlow", "MongoDB", "Go", "PostgreSQL"];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || frame) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1300, 1);
        setValue(Math.round(end * (1 - Math.pow(1 - progress, 4))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);

  return <strong ref={ref}>{value}{suffix}</strong>;
}

function ServiceAnimation({ index }: { index: number }) {
  if (index === 0) return (
    <div className="service-animation development-animation" aria-hidden="true">
      <div className="mini-editor"><span /><span /><span /></div>
      <div className="mini-interface"><b /><i /><i /><i /></div>
      <div className="code-transfer"><i /><i /><i /></div>
    </div>
  );
  if (index === 1) return (
    <div className="service-animation ai-animation" aria-hidden="true">
      <svg viewBox="0 0 170 100"><path d="M12 50 55 18l35 31 36-32 32 35M12 50l43 31 35-32 36 32 32-29M55 18v63m35-32 36-32v64" /></svg>
      {[0, 1, 2, 3, 4, 5, 6].map((node) => <i key={node} />)}
      <b /><b /><b />
    </div>
  );
  if (index === 2) return (
    <div className="service-animation team-animation" aria-hidden="true">
      <svg viewBox="0 0 170 100"><path d="M35 50h48m8 0h45M58 34l25 16m-25 16 25-16m28-16L91 50m20 16L91 50" /></svg>
      <i>AL</i><i>MS</i><i>AR</i><i>MH</i>
    </div>
  );
  if (index === 3) return (
    <div className="service-animation testing-animation" aria-hidden="true">
      <div className="scan-window"><span /><span /><span /><i /></div>
      <b><Icon name="check" size={13} /></b><b><Icon name="check" size={13} /></b>
    </div>
  );
  return (
    <div className="service-animation maintenance-animation" aria-hidden="true">
      <div className="status-row"><i /><span /><b>Operational</b></div>
      <div className="status-row"><i /><span /><b>Updated</b></div>
      <div className="maintenance-progress"><i /></div>
    </div>
  );
}

function ExpertiseVisual({ index, label }: { index: number; label: string }) {
  return (
    <div className={`expertise-live-visual expertise-visual-${index + 1}`} aria-hidden="true">
      <div className="expertise-visual-glow" />
      <svg viewBox="0 0 300 260">
        <path className="expertise-link link-one" d="M30 128 92 55l64 68 72-72 45 82-62 76-78-42-74 47-29-86Z" />
        <path className="expertise-link link-two" d="m92 55 41 112m23-44 55 86m17-158-95 116M30 128l126-5" />
        <circle cx="30" cy="128" r="4" /><circle cx="92" cy="55" r="4" /><circle cx="156" cy="123" r="5" /><circle cx="228" cy="51" r="4" /><circle cx="273" cy="133" r="4" /><circle cx="211" cy="209" r="4" /><circle cx="59" cy="214" r="4" />
      </svg>
      <div className="expertise-visual-core"><span>{label.slice(0, 3).toUpperCase()}</span><i /></div>
      <div className="expertise-visual-block block-a"><i /><i /><i /></div>
      <div className="expertise-visual-block block-b"><span /><span /><span /></div>
      <div className="expertise-data-pulse pulse-a" /><div className="expertise-data-pulse pulse-b" />
    </div>
  );
}

function HomePage() {
  const location = useLocation();
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [expertisePaused, setExpertisePaused] = useState(false);
  const [expertiseInView, setExpertiseInView] = useState(false);
  const [expertiseChanging, setExpertiseChanging] = useState(false);
  const [expertiseCycle, setExpertiseCycle] = useState(0);
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const expertiseTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const expertiseSwitchTimer = useRef<number | null>(null);
  const expertiseResumeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }));
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    const motionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("in-view", entry.isIntersecting)),
      { rootMargin: "80px 0px", threshold: 0.01 },
    );
    document.querySelectorAll(".motion-zone").forEach((element) => motionObserver.observe(element));
    return () => {
      observer.disconnect();
      motionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = expertiseRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setExpertiseInView(entry.isIntersecting), { threshold: .2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 800) {
      expertiseTabRefs.current[activeExpertise]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeExpertise]);

  useEffect(() => {
    if (!expertiseInView || expertisePaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      const next = (activeExpertise + 1) % expertise.length;
      setExpertiseChanging(true);
      expertiseSwitchTimer.current = window.setTimeout(() => {
        setActiveExpertise(next);
        setExpertiseCycle((cycle) => cycle + 1);
        setExpertiseChanging(false);
      }, 180);
    }, 3800);
    return () => window.clearTimeout(timer);
  }, [activeExpertise, expertiseCycle, expertiseInView, expertisePaused]);

  useEffect(() => () => {
    if (expertiseSwitchTimer.current) window.clearTimeout(expertiseSwitchTimer.current);
    if (expertiseResumeTimer.current) window.clearTimeout(expertiseResumeTimer.current);
  }, []);

  const selectExpertise = (index: number) => {
    if (index === activeExpertise && !expertiseChanging) {
      setExpertiseCycle((cycle) => cycle + 1);
      return;
    }
    if (expertiseSwitchTimer.current) window.clearTimeout(expertiseSwitchTimer.current);
    setExpertiseChanging(true);
    expertiseSwitchTimer.current = window.setTimeout(() => {
      setActiveExpertise(index);
      setExpertiseCycle((cycle) => cycle + 1);
      setExpertiseChanging(false);
    }, 160);
  };

  const pauseExpertise = () => {
    if (expertiseResumeTimer.current) window.clearTimeout(expertiseResumeTimer.current);
    setExpertisePaused(true);
  };

  const resumeExpertise = () => {
    if (expertiseResumeTimer.current) window.clearTimeout(expertiseResumeTimer.current);
    expertiseResumeTimer.current = window.setTimeout(() => {
      setExpertisePaused(false);
      setExpertiseCycle((cycle) => cycle + 1);
    }, 450);
  };

  const moveHero = (event: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--mouse-x", ((((event.clientX - rect.left) / rect.width) - 0.5) * 2).toFixed(3));
    heroRef.current.style.setProperty("--mouse-y", ((((event.clientY - rect.top) / rect.height) - 0.5) * 2).toFixed(3));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const button = form.querySelector("button");
    if (button) {
      button.textContent = "Message ready — thank you";
      setTimeout(() => (button.textContent = "Send message"), 2500);
    }
  };

  return (
    <main id="home">
      <SiteHeader transparent />

      <section className="hero motion-zone in-view" ref={heroRef} onMouseMove={moveHero} onMouseLeave={() => {
        heroRef.current?.style.setProperty("--mouse-x", "0");
        heroRef.current?.style.setProperty("--mouse-y", "0");
      }}>
        <div className="hero-grid-bg" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <div className="eyebrow hero-reveal"><span /> International software development company</div>
            <h1 className="headline-reveal"><span><i>Custom software.</i></span><span><i><em>Built to perform.</em></i></span></h1>
            <p className="hero-reveal delay-2">4Beats Limited is a professional software development firm that is a valuable partner to you by rapidly producing innovative software solutions. Experience in producing best-fit solutions.</p>
            <div className="hero-actions hero-reveal delay-3">
              <a className="button button-primary" href="#contact">Get in Touch <Icon name="arrow" size={18} /></a>
              <a className="button button-ghost" href="#services">Explore Our Services</a>
            </div>
            <div className="hero-proof hero-reveal delay-3">
              <div><strong>10</strong><span>Years of experience</span></div>
              <div><strong>100+</strong><span>Happy customers</span></div>
              <div><strong>100%</strong><span>Client satisfaction</span></div>
            </div>
          </div>
          <div className="tech-stage" aria-label="Abstract software interface visualization">
            <div className="stage-glow" />
            <div className="dashboard-card main-dashboard depth-layer">
              <div className="window-bar"><i /><i /><i /><span>performance.dashboard</span></div>
              <div className="dashboard-content">
                <div className="dash-sidebar"><b /><b /><b /><b /></div>
                <div className="dash-main">
                  <div className="dash-title"><span /><i /></div>
                  <div className="chart">
                    <svg viewBox="0 0 300 100" preserveAspectRatio="none"><path d="M0 80 C35 75,40 25,75 47 S120 70,145 38 S180 7,205 35 S250 67,300 14" /><path className="chart-fill" d="M0 80 C35 75,40 25,75 47 S120 70,145 38 S180 7,205 35 S250 67,300 14 V100 H0Z" /></svg>
                  </div>
                  <div className="dash-metrics"><span /><span /><span /></div>
                </div>
              </div>
            </div>
            <div className="floating-card code-card depth-layer depth-far"><div className="code-line blue" /><div className="code-line" /><div className="code-line short" /><span>&lt;/&gt;</span></div>
            <div className="floating-card ai-card depth-layer depth-near"><Icon name="brain" size={26} /><div><small>AI model</small><strong>Optimized</strong></div><i /></div>
            <div className="floating-card deploy-card depth-layer depth-mid"><Icon name="check" size={22} /><div><small>Deployment</small><strong>Successful</strong></div></div>
            <div className="floating-card analytics-card depth-layer depth-far">
              <small>Active users</small><strong>8,492</strong>
              <div><i /><i /><i /><i /><i /><i /></div>
            </div>
            <svg className="stage-connections" viewBox="0 0 600 610" aria-hidden="true">
              <path d="M26 110C130 60 162 122 232 170S385 245 562 280" />
              <path d="M75 540C160 455 235 525 310 455S432 345 565 375" />
              <circle cx="26" cy="110" r="3" /><circle cx="562" cy="280" r="3" /><circle cx="75" cy="540" r="3" /><circle cx="565" cy="375" r="3" />
            </svg>
            <div className="node n1" /><div className="node n2" /><div className="node n3" />
          </div>
        </div>
        <a className="scroll-cue" href="#services"><span>Scroll to explore</span><i /></a>
      </section>

      <section className="section services-section motion-zone" id="services">
        <div className="shell services-layout">
          <div className="services-intro reveal">
            <div className="section-kicker">Capabilities</div>
            <h2>What<br />we do<span>.</span></h2>
            <p>From ambitious ideas to dependable software, we bring strategy, engineering and quality together.</p>
            <div className="service-progress"><i /></div>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className={`service-card reveal ${service.className}`} key={service.title} style={{ transitionDelay: `${index * 70}ms` }}>
                {service.className === "service-ai" && <div className="neural"><i /><i /><i /><i /><i /></div>}
                <ServiceAnimation index={index} />
                <div className="service-top"><span>0{index + 1}</span><div className="icon-box"><Icon name={service.icon} /></div></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#contact">Read More <Icon name="arrow" size={17} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vision-section motion-zone" id="vision">
        <div className="vision-orbit" />
        <div className="shell">
          <div className="section-kicker light reveal">Our purpose</div>
          <div className="purpose-grid">
            <article className="purpose mission reveal">
              <span>Mission</span>
              <h2>Making complex ideas<br />possible.</h2>
              <p>To combine our unique infrastructure and technological capabilities with the expertise and knowledge of our employees to not only successfully design, develop and implement projects of any size but also to augment product development efficiency and responsiveness.</p>
              <div className="purpose-mark"><Icon name="compass" size={42} /></div>
            </article>
            <article className="purpose vision reveal">
              <span>Vision</span>
              <h2>Progress through<br />collaboration.</h2>
              <p>Our vision is to meet the business needs of our clients and our services are built upon innovative thinking and creativity that utilize the most advanced and proven technologies, providing a wide range of business support. We will strive to provide valuable solutions through effective collaboration of employees and management, and thus ensure complete customer satisfaction.</p>
              <div className="purpose-mark"><Icon name="eye" size={42} /></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section philosophy-section motion-zone">
        <div className="shell">
          <div className="philosophy-heading reveal">
            <div><div className="section-kicker">How we work</div><h2>Why choose<br />4Beats?</h2></div>
            <p>We provide everything from consulting to implementation and augment your team on request. Develop your project with us.</p>
          </div>
          <div className="feature-grid">
            {features.map(([title, text, icon], index) => (
              <article className={`feature-card reveal feature-${index + 1}`} key={title}>
                <div className="feature-icon"><Icon name={icon} /></div>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section motion-zone" id="about">
        <div className="about-shape" />
        <div className="shell about-layout">
          <div className="about-copy reveal">
            <div className="section-kicker">About 4Beats</div>
            <h2>Quality.<br />Schedule.<br /><em>Cost.</em></h2>
            <p>4Beats Limited is a professional software development firm that is a valuable partner to you by rapidly producing innovative software solutions. We have three fundamental beliefs – Quality, Schedule and Cost – that are the fundamental between stakeholder's interactions.</p>
            <p>Our goal is to deliver the products with high quality, on time and competitive cost. We offer different development and software testing services.</p>
            <a className="text-link" href="#contact">Start a conversation <Icon name="arrow" size={18} /></a>
          </div>
          <div className="about-visual reveal">
            <div className="architecture">
              <div className="architecture-top"><span>PRODUCT ARCHITECTURE</span><i>LIVE</i></div>
              <div className="architecture-flow">
                <div className="flow-node primary"><Icon name="spark" /><strong>Your idea</strong><small>Vision & strategy</small></div>
                <div className="flow-line"><i /><i /><i /></div>
                <div className="flow-stack">
                  <div className="flow-node"><Icon name="layers" /><strong>Design</strong><small>System thinking</small></div>
                  <div className="flow-node"><Icon name="code" /><strong>Build</strong><small>Quality engineering</small></div>
                  <div className="flow-node"><Icon name="check" /><strong>Deliver</strong><small>Reliable outcomes</small></div>
                </div>
              </div>
            </div>
            <div className="stats-strip">
              <div><CountUp end={10} /><span>Years of<br />experience</span></div>
              <div><CountUp end={100} suffix="+" /><span>Happy<br />customers</span></div>
              <div><CountUp end={100} suffix="%" /><span>Client<br />satisfaction</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section expertise-section motion-zone" id="expertise" ref={expertiseRef}>
        <div className="shell">
          <div className="expertise-heading reveal">
            <div><div className="section-kicker light">Deep capabilities</div><h2>Our expertise<span>.</span></h2></div>
            <p>With over a decade in Software Development, and resource creation, development & management, 4Beats Ltd. brings in the favorable combination of specialist expertise, vast experience, cutting-edge knowledge and geographical reach, to deliver creative, realistic and reliable solutions for client challenges.</p>
          </div>
          <div className={`expertise-console ${expertisePaused ? "is-paused" : ""}`}>
            <div className="expertise-tabs" role="tablist" aria-label="Expertise categories" onMouseEnter={pauseExpertise} onMouseLeave={resumeExpertise} onFocusCapture={pauseExpertise} onBlurCapture={resumeExpertise}>
              {expertise.map((item, index) => (
                <button ref={(element) => { expertiseTabRefs.current[index] = element; }} key={item.short} className={activeExpertise === index ? "active" : ""} onMouseEnter={() => selectExpertise(index)} onClick={() => selectExpertise(index)} role="tab" aria-selected={activeExpertise === index}>
                  {item.short}<Icon name="arrow" size={16} />
                  {activeExpertise === index && <i className="expertise-tab-progress" key={expertiseCycle} />}
                </button>
              ))}
            </div>
            <div className={`expertise-panel ${expertiseChanging ? "is-changing" : ""}`} role="tabpanel" key={activeExpertise}>
              <div className="expertise-panel-copy">
                <span className="panel-label">{expertise[activeExpertise].short}</span>
                <h3>{expertise[activeExpertise].title}</h3>
                <p>{expertise[activeExpertise].body}</p>
                <div className="tag-grid">
                  {expertise[activeExpertise].tags.map((tag, index) => <span key={`${activeExpertise}-${tag}`} style={{ animationDelay: `${index * 65}ms` }}>{tag}</span>)}
                </div>
              </div>
              <ExpertiseVisual index={activeExpertise} label={expertise[activeExpertise].short} />
            </div>
          </div>
        </div>
      </section>

      <section className="section team-section motion-zone" id="team">
        <div className="shell">
          <div className="team-heading reveal">
            <div className="section-kicker">Our people</div>
            <h2>Experts with the<br />experience to lead.</h2>
            <p>Our leadership combines technical depth, agile delivery, commercial expertise and global perspective.</p>
          </div>
          <div className="team-list">
            {team.map((member, index) => (
              <article className={`team-card reveal ${expandedMember === index ? "expanded" : ""}`} key={member.name}>
                <div className="team-portrait"><span>{member.name.split(" ").filter((part) => !part.includes(".")).slice(0, 2).map((part) => part[0]).join("")}</span><i>0{index + 1}</i></div>
                <div className="team-info">
                  <span>{member.title}</span>
                  <h3>{member.name}</h3>
                  <p className="education">{member.education}</p>
                  <p className="team-bio">{member.bio}</p>
                  <button onClick={() => setExpandedMember(expandedMember === index ? null : index)}>
                    {expandedMember === index ? "Show Less" : "Read More"} <Icon name="arrow" size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trusted-businesses-section motion-zone">
        <div className="shell">
          <div className="trusted-businesses-heading reveal">
            <div>
              <span>TRUSTED BY BUSINESSES</span>
              <h2>Building Digital Solutions<br />for Businesses Worldwide</h2>
              <p>We’ve worked with businesses and organizations across different industries to design, develop, and deliver reliable digital solutions.</p>
            </div>
            <div className="trusted-businesses-stat">
              <strong>{trustedBusinessCount}</strong>
              <span>Global Businesses</span>
            </div>
          </div>
          <div className="trusted-logo-grid">
            {trustedLogoSlots.map((logo, index) => (
              <div id={`trusted-logo-slot-${String(logo.slot).padStart(2, "0")}`} data-logo-slot={logo.slot} className="trusted-logo-slot reveal" key={logo.slot} style={{ transitionDelay: `${(index % 4) * 55}ms` }}>
                {logo.image
                  ? <img src={logo.image} alt={logo.alt} />
                  : <div className="trusted-logo-placeholder"><span>Logo Slot</span><strong>{String(logo.slot).padStart(2, "0")}</strong></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="platforms-section motion-zone">
        <div className="shell platforms-heading reveal">
          <div><div className="section-kicker light">Technology platforms</div><h2>Tools for every<br />challenge.</h2></div>
          <p>We use the following platforms to power software solutions.</p>
        </div>
        <div className="platform-marquee" aria-label="Technology platforms">
          <div className="marquee-track">
            {[...platforms, ...platforms].map((platform, index) => (
              <div className="platform-pill" key={`${platform}-${index}`}><span>{platform.slice(0, 2).toUpperCase()}</span>{platform}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section motion-zone" id="contact">
        <div className="shell contact-grid">
          <div className="contact-copy reveal">
            <div className="section-kicker light">Contact us</div>
            <h2>Need<br />Help?</h2>
            <p className="contact-lead">Reach out to the world's most reliable IT services.</p>
            <div className="contact-details">
              <a href="https://maps.google.com/?q=House+17+Road+5+Sector+12+Uttara+Dhaka" target="_blank" rel="noreferrer"><Icon name="map" /><span><small>Our location</small>House -17 (4th Floor), Road - 5, Sector 12,<br />Uttara, Dhaka 1230, Bangladesh.</span></a>
              <a href="mailto:info@4beasts.net"><Icon name="mail" /><span><small>Send us mail</small>info@4beasts.net<br />4beatsltd@gmail.com</span></a>
              <a href="tel:+8801716314667"><Icon name="phone" /><span><small>Call us</small>+880 1716 314 667</span></a>
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="form-heading"><span>Tell us about your project</span><i>All fields required</i></div>
            <label>Name<input type="text" name="name" placeholder="Your full name" required /></label>
            <label>Email<input type="email" name="email" placeholder="you@company.com" required /></label>
            <label>Phone<input type="tel" name="phone" placeholder="+880" required /></label>
            <label>Message<textarea name="message" placeholder="How can we help?" rows={4} required /></label>
            <button type="submit">Send message <Icon name="arrow" size={18} /></button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export default HomePage;
