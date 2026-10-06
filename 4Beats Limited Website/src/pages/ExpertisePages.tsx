import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { expertisePages } from "../data/navigation";

const categories = [
  { title: "Technical Expertise", text: "4Beats Ltd. believes that effective collaboration enhances value. As such we leverage on our multi-disciplinary expertise to provide end-to-end solutions for our clients.", items: ["Application Design and Development", "Custom Software Design & Development", "Product Design and Development", "Database Design and Development", "System and Application Integration", "Data Modeling / Data Warehousing", "Enterprise Systems", "Infrastructure Support and Services", "QA / Testing", "Technical Support"] },
  { title: "Microsoft .NET", text: "Our .Net experts develop web application using ASP.NET, MVC, C# where ASP.NET is a next generation of proven ASP.NET technology platform from Microsoft.", items: ["ASP.NET", "MVC", "C#", ".NET Framework", "HTML5"] },
  { title: "Web Development", text: "Experienced in diverse website development, to include complex E-commerce websites, Social Networking websites, Content Management Systems (CMS), Flash websites, 2D/3D Animation, Gaming, and Mobile application.", items: ["E-commerce", "Social Networking", "CMS", "2D/3D Animation", "Gaming", "Mobile application"] },
  { title: "Microsoft SharePoint", text: "4Beats Limited has experts with experiences of more than 10 years on major Microsoft platforms including Windows Server, SQL Server, Exchange Server, Reporting Services and Active Directory.", items: ["Deployment", "Integration", "Customization", "Site Branding", "Portal Development", "Site Migration", "Custom Webparts", "Custom Workflows", "Enterprise Content Management", "Business Intelligence"] },
  { title: "SEO", text: "Our marketing specialists handle website optimization, competitor analysis, PPC, affiliate and email marketing, and online ad campaigns.", items: ["Website optimization", "Competitor analysis", "PPC", "Affiliate marketing", "Email marketing", "Online ad campaigns"] },
];

const technologyGroups = [
  { title: "Programming Languages", description: "Languages supported by the original 4Beats technical expertise.", items: ["HTML", "DHTML", "PHP", "ASP", "ASP.NET", "JSP", "JAVA", "JavaScript", "XML", "VB", "VB.NET", "VBScript", "C/C++", "J2ME"] },
  { title: "Platforms", description: "Platforms listed in the 4Beats technical expertise.", items: ["Windows", "UNIX", "Linux", "IBM Mainframe", "AS400"] },
  { title: "Databases", description: "Database technologies used across software solutions.", items: ["Oracle", "Sybase", "MS SQL", "MySQL", "IMS", "DB2", "MS Access", "RPG"] },
  { title: "Servers", description: "Server environments supported by the technical team.", items: ["IIS 4.0/5.0/6.0", "Commerce Server", "BizTalk Server", "Application Server", "SQL Server", "Apache", "Linux", "Cold Fusion"] },
  { title: "Development Processes", description: "A well-defined process methodology that remains flexible to meet diverse client requirements.", items: ["Initial conception", "Project process", "Product completion", "Customer support", "Project management", "Business ethics", "Policies and procedures"] },
  { title: "Domain Expertise", description: "An in-depth understanding of diverse domains enables 4Beats to create a valuable difference for clients.", items: ["Banking & Finance", "Insurance", "Healthcare", "Pharmaceutical", "IT", "Telecommunications", "E-Commerce", "Education", "Advertising & Media", "Tours & Travel", "Hospitality", "Wholesale & Retail", "Government"] },
];

const platforms = ["WordPress", "Microsoft SQL Server", "Zend Framework", "Joomla", "SharePoint", "Mobile App", "PHP / MySQL", "Magento", "Flutter", "ASP.NET", "React JS", "Spring", "Java", "TensorFlow", "MongoDB", "Go", "PostgreSQL"];

function useExpertiseMotion() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .12 });
    document.querySelectorAll(".expertise-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function ExpertiseBreadcrumb({ current }: { current?: string }) {
  return <nav className="expertise-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/expertise">Expertise</Link>{current && <><span>/</span><strong>{current}</strong></>}</nav>;
}

function ExpertiseNetworkVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--ex", `${((event.clientX - box.left) / box.width - .5) * 22}px`);
    ref.current.style.setProperty("--ey", `${((event.clientY - box.top) / box.height - .5) * 18}px`);
  };
  return <div className="expertise-network-visual" ref={ref} onMouseMove={move} onMouseLeave={() => { ref.current?.style.setProperty("--ex","0px"); ref.current?.style.setProperty("--ey","0px"); }}>
    <svg viewBox="0 0 560 440"><path d="M72 215 178 78l110 105 126-103 76 139-100 125-132-70-128 80-58-139Zm106-137 80 196m30-91 102 161m24-264L258 274M72 215l216-32" /></svg>
    <div className="expertise-core">4B<i /></div>
    <div className="expertise-float code-float"><span>&lt;?php</span><b /><b /><b /></div>
    <div className="expertise-float data-float"><small>DATABASE</small><i /><i /><i /><i /></div>
    <div className="expertise-float stack-float"><span>WEB</span><span>QA</span><span>.NET</span></div>
  </div>;
}

function PhpVisual() {
  return <div className="php-hero-visual">
    <div className="php-editor"><div className="editor-top"><i /><i /><i /><span>application.php</span></div><pre><b>&lt;?php</b>{"\n"}<em>$application</em> = new Solution();{"\n"}<span>$application</span>-&gt;build();{"\n"}<span>$quality</span>-&gt;verify();{"\n"}<b>?&gt;</b></pre></div>
    <div className="php-app-panel"><span /><div><i /><i /><i /></div></div>
    <div className="php-database"><i /><i /><i /><strong>DB</strong></div>
    <svg viewBox="0 0 560 430"><path d="M210 220h110m65 40-65-40m65-40-65 40" /></svg>
  </div>;
}

function TestingVisual() {
  return <div className="testing-expertise-visual">
    <div className="qa-dashboard"><div className="qa-top"><span>Quality dashboard</span><i>RUNNING</i></div><div className="qa-chart"><svg viewBox="0 0 300 120"><path d="M0 100C35 90 48 65 78 72s44-40 78-27 54-28 74-12 39-24 70-24" /></svg><i /></div><div className="qa-runs"><span /><span /><span /><span /></div></div>
    <div className="bug-panel"><small>Issue tracking</small><strong>Reproducible reports</strong><i /></div>
    <div className="test-status"><span>✓</span><div><small>Test execution</small><strong>Complete</strong></div></div>
  </div>;
}

function ExpertiseRelated({ current }: { current: string }) {
  const links = current === "/expertise"
    ? expertisePages
    : [["Our Expertise", "/expertise"], ["Software Testing", "/expertise/software-testing"], ["Software Development", "/services/software-development"]];
  return <section className="expertise-related"><div className="shell"><div className="expertise-heading expertise-reveal"><span>Related expertise</span><h2>Keep exploring.</h2></div><div className="expertise-related-grid">{links.map(([label,path],index) => <Link className={`expertise-reveal ${path === current ? "current" : ""}`} to={path} key={path}><span>0{index + 1}</span><strong>{label}</strong><ArrowIcon /></Link>)}</div></div></section>;
}

function ExpertiseCTA() {
  return <section className="expertise-cta"><div className="shell expertise-reveal"><span>Have a project in mind?</span><h2>Let's Build Something<br />Great Together</h2><Link to="/contact">Contact Us <ArrowIcon /></Link></div></section>;
}

export function ExpertiseOverviewPage() {
  useExpertiseMotion();
  const [active, setActive] = useState(0);
  return <main className="expertise-page expertise-overview-page">
    <SiteHeader />
    <section className="expertise-hero">
      <div className="expertise-hero-grid" />
      <div className="shell expertise-hero-layout"><div><ExpertiseBreadcrumb /><span className="expertise-kicker">Technical capabilities</span><h1>Our Expertise<em>.</em></h1><p>With over a decade in Software Development, and resource creation, development & management, 4Beats Ltd. brings in the favorable combination of specialist expertise, vast experience, cutting-edge knowledge and geographical reach, to deliver creative, realistic and reliable solutions for client challenges.</p><div className="expertise-actions"><a href="#technical">Explore Our Expertise <ArrowIcon /></a><Link to="/contact">Contact Us</Link></div></div><ExpertiseNetworkVisual /></div>
    </section>
    <section className="expertise-interactive" id="technical"><div className="shell"><div className="expertise-heading expertise-reveal"><span>Technical expertise</span><h2>Depth across the<br />technology landscape.</h2></div><div className="expertise-workbench expertise-reveal"><div className="expertise-workbench-tabs">{categories.map((category,index)=><button className={active===index?"active":""} onClick={()=>setActive(index)} key={category.title}><span>0{index+1}</span>{category.title}<ArrowIcon /></button>)}</div><div className="expertise-workbench-panel" key={active}><span>0{active+1}</span><h2>{categories[active].title}</h2><p>{categories[active].text}</p><div>{categories[active].items.map(item=><i key={item}>{item}</i>)}</div></div></div></div></section>
    <section className="technology-showcase"><div className="shell"><div className="expertise-heading light expertise-reveal"><span>Technology showcase</span><h2>Platforms that power<br />software solutions.</h2></div><div className="expertise-tech-grid">{platforms.map((platform,index)=><div className="expertise-reveal" key={platform}><span>{platform.slice(0,2).toUpperCase()}</span><strong>{platform}</strong><i>{String(index+1).padStart(2,"0")}</i></div>)}</div></div></section>
    <section className="expertise-categories"><div className="shell">{technologyGroups.map((group,index)=><article className="expertise-category-row expertise-reveal" key={group.title}><span>0{index+1}</span><div><h2>{group.title}</h2><p>{group.description}</p></div><div>{group.items.map(item=><i key={item}>{item}</i>)}</div></article>)}</div></section>
    <ExpertiseRelated current="/expertise" /><ExpertiseCTA /><SiteFooter />
  </main>;
}

const phpCapabilities = ["Web applications development", "PHP software development", "Websites design and deployment", "Business solutions creation", "PHP products support and maintenance", "PHP system solutions integration", "Migration to PHP", "Dedicated PHP teams to hire"];

export function PhpExpertisePage() {
  useExpertiseMotion();
  return <main className="expertise-page php-expertise-page">
    <SiteHeader />
    <section className="php-expertise-hero"><div className="shell php-hero-layout"><div><ExpertiseBreadcrumb current="PHP" /><span className="expertise-kicker">PHP development</span><h1>PHP built for<br /><em>the real world.</em></h1><p>Custom web applications built on PHP and modern PHP frameworks. PHP remains one of our core stacks for building fast, maintainable web applications, from small business sites to large custom platforms.</p><div className="expertise-actions"><Link to="/contact">Discuss Your Project <ArrowIcon /></Link><Link to="/expertise">Explore Our Expertise</Link></div></div><PhpVisual /></div></section>
    <section className="php-overview"><div className="shell php-editorial"><div className="expertise-reveal"><span>Overview</span><h2>Reliable solutions that are scalable and easy to maintain.</h2></div><div className="expertise-reveal"><p>PHP web development services are the perfect way to raid a balance between low-cost and high-performance web applications and websites. Our dedicated team of PHP development experts builds amazing applications that help our clients achieve utmost success through their online presence.</p><p>Proven software engineering principles motivate all our design and development practices. This allows us to develop reliable solutions that are scalable and easy to maintain. In particular, the use of object-oriented PHP development practices and a multi-threaded environment allows us to develop professional applications.</p><p>Hire dedicated PHP developers with up to 8+ years of experience to implement your project.</p></div></div></section>
    <section className="php-capabilities"><div className="shell"><div className="expertise-heading expertise-reveal"><span>Development capabilities</span><h2>PHP expertise from<br />build to maintenance.</h2></div><div className="php-capability-grid">{phpCapabilities.map((item,index)=><article className="expertise-reveal" key={item}><span>{String(index+1).padStart(2,"0")}</span><div className="php-card-icon">&lt;/&gt;</div><h2>{item}</h2></article>)}</div></div></section>
    <section className="php-architecture"><div className="shell php-architecture-layout"><PhpVisual /><div className="expertise-reveal"><span>Technical visualization</span><h2>Code, applications and data—connected.</h2><p>Our PHP services cover web applications, software development, websites, business solutions, system integration, migration, support and maintenance.</p></div></div></section>
    <ExpertiseRelated current="/expertise/php" /><ExpertiseCTA /><SiteFooter />
  </main>;
}

const testingCapabilities = ["Manual and automated functional testing", "Regression and integration testing", "Performance and load testing", "API testing", "UAT support and bug tracking"];
const testingReasons = ["Dedicated QA engineers, not developers testing their own code", "Clear, reproducible bug reports tied to your tracking tool", "Testing built into the process from day one, not bolted on at the end"];

export function TestingExpertisePage() {
  useExpertiseMotion();
  return <main className="expertise-page testing-expertise-page">
    <SiteHeader />
    <section className="testing-expertise-hero"><div className="shell testing-hero-layout"><div><ExpertiseBreadcrumb current="Software Testing" /><span className="expertise-kicker">Software quality</span><h1>Software Testing<br /><em>& Quality Assurance.</em></h1><p>Quality assurance and testing services that keep releases dependable. Every project we deliver goes through structured QA before it reaches your users, so issues get caught early rather than in production.</p><div className="expertise-actions"><Link to="/contact">Discuss Your Testing Needs <ArrowIcon /></Link><Link to="/expertise">Explore Our Expertise</Link></div></div><TestingVisual /></div></section>
    <section className="testing-overview"><div className="shell testing-overview-layout"><div className="expertise-reveal"><span>Software testing overview</span><h2>Quality is one of the cornerstones in software development.</h2></div><div className="testing-quote expertise-reveal"><p>We provide quality assurance and software testing services to verify error-free software product operation.</p><i>QA</i></div></div></section>
    <section className="testing-capabilities"><div className="shell"><div className="expertise-heading expertise-reveal"><span>Main focus</span><h2>Structured testing.<br />Dependable releases.</h2></div><div className="testing-capability-grid">{testingCapabilities.map((item,index)=><article className="expertise-reveal" key={item}><span>✓</span><i>{String(index+1).padStart(2,"0")}</i><h2>{item}</h2></article>)}</div></div></section>
    <section className="testing-why"><div className="shell testing-why-layout"><TestingVisual /><div><div className="expertise-heading light expertise-reveal"><span>Why 4Beats</span><h2>Testing built into<br />the process.</h2></div><h3 className="testing-reasons-title expertise-reveal">Why to choose us for software testing:</h3>{testingReasons.map((reason)=><div className="testing-reason expertise-reveal" key={reason}><span>✓</span><p>{reason}</p></div>)}</div></div></section>
    <ExpertiseRelated current="/expertise/software-testing" /><ExpertiseCTA /><SiteFooter />
  </main>;
}
