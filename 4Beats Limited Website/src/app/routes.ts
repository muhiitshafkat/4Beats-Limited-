import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import {
  AboutCompanyPage,
  MissionPage,
  PhilosophyPage,
  TeamPage,
  ValuesPage,
  VisionPage,
} from "../pages/CompanyPages";
import {
  ExpertiseOverviewPage,
  PhpExpertisePage,
  TestingExpertisePage,
} from "../pages/ExpertisePages";
import { ContactPage, PortfolioPage, ProjectDetailPage } from "../pages/PortfolioContactPages";
import { ServiceDetailPage, ServicesOverviewPage } from "../pages/ServicePages";
import { IndustriesPage, IndustryDetailPage } from "../pages/IndustriesPages";
import { RedirectHome } from "./RouteSupport";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/company/about", Component: AboutCompanyPage },
  { path: "/company/vision", Component: VisionPage },
  { path: "/company/mission", Component: MissionPage },
  { path: "/company/team", Component: TeamPage },
  { path: "/company/values", Component: ValuesPage },
  { path: "/company/philosophy", Component: PhilosophyPage },
  { path: "/services", Component: ServicesOverviewPage },
  { path: "/services/:slug", Component: ServiceDetailPage },
  { path: "/expertise", Component: ExpertiseOverviewPage },
  { path: "/expertise/php", Component: PhpExpertisePage },
  { path: "/expertise/software-testing", Component: TestingExpertisePage },
  { path: "/portfolio", Component: PortfolioPage },
  { path: "/portfolio/:slug", Component: ProjectDetailPage },
  { path: "/contact", Component: ContactPage },
  { path: "/industries", Component: IndustriesPage },
  { path: "/industries/:slug", Component: IndustryDetailPage },
  { path: "*", Component: RedirectHome },
]);
