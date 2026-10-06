export type ServiceKey =
  | "ai-machine-learning"
  | "blockchain"
  | "software-development"
  | "devops"
  | "dedicated-teams"
  | "software-testing-qa"
  | "sharepoint"
  | "ssl-security-certificate"
  | "domain-hosting-registration"
  | "digital-marketing"
  | "technology-support";

export type ServiceContentGroup = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  after?: string[];
};

export type ServiceData = {
  title: string;
  shortTitle: string;
  intro?: string;
  description: string;
  additional?: string[];
  listTitle?: string;
  items?: string[];
  groups?: ServiceContentGroup[];
  cta: string;
  theme: string;
};

export const services: Record<ServiceKey, ServiceData> = {
  "ai-machine-learning": {
    title: "AI and Machine Learning",
    shortTitle: "AI & ML",
    intro: "AI & ML-powered solutions tailored to elevate your business—optimize workflows, cut costs, and unlock smarter decisions.",
    description: "We design and build AI & Machine Learning powered solutions tailored to elevate your business — from predictive analytics to intelligent automation. Our team helps you optimize workflows, cut operational costs, and unlock smarter, data-driven decisions.",
    listTitle: "With Us You Can Get:",
    items: ["Predictive analytics & data modelling", "Natural language processing solutions", "Intelligent process automation", "Custom AI/ML model integration"],
    cta: "Discuss Your Project",
    theme: "neural",
  },
  blockchain: {
    title: "Blockchain",
    shortTitle: "Blockchain",
    intro: "We provide secure, decentralized blockchain solutions to power trust, transparency, and innovation in your business.",
    description: "We provide secure, decentralized blockchain solutions to power trust, transparency, and innovation in your business — from smart contracts to full decentralized application development.",
    listTitle: "With Us You Can Get:",
    items: ["Smart contract development", "Decentralized application (DApp) development", "Blockchain integration & consulting", "Token/asset management solutions"],
    cta: "Discuss Your Project",
    theme: "blockchain",
  },
  "software-development": {
    title: "Software Development",
    shortTitle: "Software",
    intro: "Significant cost savings and time-to-market reduction are the advantages of dedicated teams and offshore software development services.",
    description: "Successful project begins from development idea and implementation planning. Before we offer a solution, 4Beats analyzes the core of your project, its goals and perspectives, individual specific needs. Whatever you may need – custom on premise software development, mobile or web application development – we are here to provide you with necessary solution. Here you can get any software development life cycle services – from project idea elaboration and planning to implementation and ongoing support.",
    listTitle: "With Us You Can Get:",
    items: ["Web application development", "Mobile application development", "Custom software development services", "Business processes management solution design, implementation and integration", "Corporate web portal development with specific software integration"],
    cta: "Start Your Project",
    theme: "software",
  },
  devops: {
    title: "DevOps",
    shortTitle: "DevOps",
    description: "We rely heavily on automation, continuous integration/continuous delivery (CI/CD), and tools like Git, Docker, Jenkins, and Kubernetes to streamline workflows for your business.",
    additional: ["We rely heavily on automation, continuous integration/continuous delivery (CI/CD), and tools like Git, Docker, Jenkins, and Kubernetes to streamline workflows for your business and shorten release cycles."],
    listTitle: "With Us You Can Get:",
    items: ["CI/CD pipeline setup", "Containerization & orchestration", "Infrastructure as code", "Cloud deployment & monitoring"],
    cta: "Talk to Our Team",
    theme: "devops",
  },
  "dedicated-teams": {
    title: "Dedicated Teams",
    shortTitle: "Teams",
    description: "Our clients receive full cycle custom software development services to build effective tools for business in one place.",
    additional: ["Our clients receive full cycle custom software development services to build effective tools for business in one place. Dedicated teams give you direct control over resourcing while we handle recruitment, infrastructure and management overhead."],
    listTitle: "With Us You Can Get:",
    items: ["Dedicated developers, QA and project managers", "Flexible team scaling", "Direct communication with your team", "Transparent weekly reporting"],
    cta: "Build Your Team",
    theme: "teams",
  },
  "software-testing-qa": {
    title: "Software Testing & QA",
    shortTitle: "Testing & QA",
    description: "Quality is one of the cornerstones in software development. We provide quality assurance and software testing services to verify error-free software product operation. We do our best to deliver products that accelerate return on investment (ROI) process.",
    additional: [
      "4Beats is a software development provider who aims at delivering effective and quality solutions to our clients. To achieve this aim we begin quality assurance process at the stage of the product architecture creation and we end it at the moment of the ready product delivery. We do software testing to ensure that it meets the requirements, industry standards, security, is in compliance with the business goals it was designed to achieve.",
      "We offer quality assurance for both third-party products and custom software developed by our team.",
      "Effective testing can be done in several ways – manually, with or without specific applications, totally in automated mode. Choice depends on the aspect to test and objective factors as software type, size and aim of testing.",
    ],
    listTitle: "Testing Services:",
    items: ["Functionality testing", "Acceptance testing", "Regression testing (after enhancements or changes of configuration)", "Usability testing", "Cross-browser and cross-platform testing", "Load and performance testing", "Stress testing (solutions for mass usage)", "Specific testing depending on the purpose of the released product", "Security testing", "Code audit"],
    cta: "Discuss Quality",
    theme: "testing",
  },
  sharepoint: {
    title: "SharePoint",
    shortTitle: "SharePoint",
    description: "4Beats Limited has experts with experiences of more than 10 years on major Microsoft platforms including Windows Server, SQL Server, Exchange Server, Reporting Services and Active Directory. Our developers provide custom development on the following.",
    additional: ["Our Microsoft SharePoint developers are adequately equipped with knowledge and expertise to offer high-end SharePoint solutions to our clients. Our developers are qualified to handle almost every kind of enterprise requirement. Depending upon the varying needs of our global clients, we have stretched our expertise and have managed to offer the following solutions."],
    listTitle: "SharePoint Services:",
    items: ["SharePoint Deployment", "SharePoint integration", "SharePoint customization and automation using Content Types and Event Receivers", "SharePoint Site Branding", "SharePoint Web Development and Portal Development", "SharePoint Site Migration", "SharePoint Installer applications", "SharePoint Deployment Planning Services (SDPS)", "SharePoint Custom Webpart development", "SharePoint Custom Workflow development using Visual Studio (C#, ASP.NET), SharePoint Designer abd Nintex Workflows", "SharePoint Enterprise Content Management (SharePoint CMS)", "SharePoint Enterprise Portals and Business Intelligence", "SharePoint SQL Reporting", "SharePoint Maintenance Services including backup and restore"],
    cta: "Discuss Your Requirements",
    theme: "sharepoint",
  },
  "ssl-security-certificate": {
    title: "SSL Security Certificate",
    shortTitle: "SSL Security",
    description: "Retail and reseller services for SSL encryption, website authentication, digital signatures and enterprise SSL products.",
    additional: ["4Beats Ltd, a leading certificate authority, provides retail and reseller services for SSL encryption, and website authentication, digital signatures, code signing, secure email, and enterprise SSL products. Products include True BusinessID with Extended Validation SSL Certificates, True BusinessID SSL Certificates, Multi-Domain Certificates, Wildcard SSL Certificates, UC/SAN SSL certificates, Quick SSL Premium Certificates, and Symantec Certified Document Solutions, My Credential Certificates, and Enterprise SSL."],
    listTitle: "Products:",
    items: ["True BusinessID with Extended Validation SSL Certificates", "True BusinessID SSL Certificates", "Multi-Domain Certificates", "Wildcard SSL Certificates", "UC/SAN SSL Certificates", "Quick SSL Premium Certificates", "Enterprise SSL & Certified Document Solutions"],
    cta: "Contact Us",
    theme: "security",
  },
  "domain-hosting-registration": {
    title: "Domain Hosting & Registration",
    shortTitle: "Domain & Hosting",
    description: "Get the domain name you always wanted @BDT-1000/- Compare Web Hosting Packages",
    additional: ["All Web hosting packages are packed with features including plenty of disk space and bandwidth to meet your business needs. Check out the details of each package in this comparison chart."],
    listTitle: "Services:",
    items: ["Domain name registration", "Essential, Professional and Premium hosting packages", "Reliable UNIX-based hosting infrastructure", "Ongoing hosting support"],
    groups: [{
      title: "Hosting Packages:",
      items: ["ESSENTIAL HOSTING\n$5.95/mo*", "PROFESSIONAL HOSTING\n$7.95/mo*", "PREMIUM HOSTING\n$9.95/mo*"],
    }],
    cta: "Get Started",
    theme: "hosting",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    shortTitle: "Marketing",
    description: "Social media marketing, PPC, display advertising, email marketing, SEO and content production services.",
    additional: [
      "We help our clients build rich social media strategies and campaigns that resonate with their audiences, and run performance marketing across the channels that matter most to your business.",
      "We help our clients build rich Social Media Strategies and campaigns that resonate with their relevant audiences and make use of the most appropriate channels for their specific business objectives",
      "We plan and run Pay-Per-Click advertising campaignson all major PPC networks. Our campaigns focus on your specific customer base with the aim of driving highly relevant traffic to your website.",
      "We run focused Display Advertisingcampaigns that drive highly relevant and qualified traffic to our client’s websites. We deliver display campaigns that engage and attract your target audiences",
      "We run focused Email Marketingcampaigns that aim to engage and attract your customers. We design beautiful, unique email templates that are specific to your business and target audiences.",
      "We provide Email Acquisition, Email Template Designs, Copy Creation, Email Scheduling and Tracking.",
      "We provides assistance on Mobile Web, Mobile Apps, SMS Marketing and Proximity Marketing.",
      "4Beats Ltd.’s have had repeated success with the removal of unnatural linking and restoring penalized website.",
      "Our services includes Digital Content Strategy, Content Production, Video Production, Graphic Design and Multi-language Content.",
      "We design and run SEO campaigns that ensure your website is findable on all major search engines. We aim to get your website listed in the top rankings in organic search results, producing real, measurable results.",
      "Our services includes Keyword Research, Technical SEO, Full SEO Audits and SEO Consulting.",
      "We run and manage affiliate advertising campaigns on a number of different networks, including Google’s affiliate network.",
      "Having a team of experienced designers and developers, our web design projects lay a great foundation for continued SEO work.",
      "Our services includes Website Design and Coding, Conversion Optimization and Mobile Website Development.",
      "Monitoring the influencing online reviews we provide assistance to your reputation.",
      "Our main focus is to continuously refine the site’s user experience and conversion flow through AB testing to increase the percentage of visitors.",
      "The practice of increasing the conversion rate by testing adjustments to on-page elements.",
      "Our main concern includes Google AdWords, Search Engine Results Page, Conversion Rate Optimization and Conversion Funnel for the E-Commerce Solutions.)",
    ],
    cta: "Grow Your Business",
    theme: "marketing",
  },
  "technology-support": {
    title: "Technology Support",
    shortTitle: "Support",
    description: "IT software consulting and technology-driven advice to enhance and develop your business. Outsourcing your information technology requirements to us lets you concentrate on your core business activities while we handle major administrative and technological issues and lower your operational cost.",
    additional: [
      "In today´s world of e-business, outsourcing information technology requirements to IT software consulting companies enables you to concentrate on your core business activities. You can also relax on major administrative and technological issues and lower your operational cost. We at 4Beats Ltd. offer a wide range of IT software consulting services and provide technology driven advice and solution for enhancement and development of your business. We provide custom-made business solutions for defining key strategies and achieve your business objectives.",
      "Our expertise in developing enterprise plans will help you manage your IT requirements and other critical initiatives effectively. We have a talented and experienced team of business architects, system analysts, project managers, Developers and QA team to assist you through all stages of the project lifecycle and help you till the completion of the project. Our professionals undertake extensive discussion with clients/customers to provide quality IT software services and solutions that are custom-made to suit the needs of the client/customer.",
      "Our IT solutions are far-sighted, innovative and technology driven providing reliable and successful IT software consulting services and solutions. Our solutions not only help you make critical decisions on your IT requirements but also define a roadmap to achieve it, thereby ensuring that the key initiatives are delivered effectively.",
    ],
    listTitle: "With Us You Can Get:",
    items: ["Enterprise Resource Management Consulting", "System or Application Integration", "Supply Chain Management", "Infrastructure Management", "Customer Relation Management", "Supplier Relation Management", "Project Management", "Business-Case Analysis", "Feasibility Study", "Technology Research & Technical Specifications", "Prototype Solutions", "BPO services", "Software design and development", "Website design and development", "Virtual Assistance or Back Office Support", "Medical Services", "Search Engine Optimization", "Internet Marketing Services", "Data Processing"],
    groups: [{
      title: "Additional Technology Solutions:",
      paragraphs: ["We offer multi-module application software that helps your business manage the important activities of your business, including product planning, purchasing, maintaining inventories, interacting with suppliers, providing customer service, and tracking orders. We also provide application modules for finance and human resource aspects of your business."],
      items: ["Solution Architecture", "Solution Integration and Implementation", "Project/Program Management", "Software upgrades, migrations and enhancements", "Business process design and optimization", "Custom application development", "Solution training"],
      after: ["We have an experienced group of functional and technical consultants having expertise in multiple installations & upgrades and well versed with the latest applications. Our consultants deploy ERP systems after considerable business process analysis and employee training, as it creates new work procedures. Our goal is to integrate your enterprise systems and enhance access to accurate data and integrated reporting."],
    }],
    cta: "Contact Our Team",
    theme: "support",
  },
};
