export type Industry = {
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export const industries: Industry[] = [
  { slug: "travel-hospitality", title: "Travel & Hospitality", description: "Build booking systems for travel.", icon: "hotel" },
  { slug: "finance", title: "Finance", description: "Build secure tools for finance.", icon: "bank" },
  { slug: "automotive", title: "Automotive", description: "Build digital tools for auto teams.", icon: "car" },
  { slug: "media-entertainment", title: "Media & Entertainment", description: "Create platforms people enjoy.", icon: "media" },
  { slug: "banking-payment", title: "Banking & Payment", description: "Simplify payments with secure a...", icon: "card" },
  { slug: "sports", title: "Sports", description: "Create platforms for sports teams.", icon: "trophy" },
  { slug: "logistics", title: "Logistics", description: "Streamline shipping and delivery.", icon: "truck" },
  { slug: "aviation", title: "Aviation", description: "Build software for smoother fligh...", icon: "plane" },
  { slug: "healthcare", title: "Healthcare", description: "Build secure tools for healthcare.", icon: "heart" },
  { slug: "energy-utilities", title: "Energy & Utilities", description: "Improve energy operations with software.", icon: "energy" },
  { slug: "construction", title: "Construction", description: "Manage projects with better tools.", icon: "construction" },
  { slug: "fintech", title: "Fintech", description: "Create smarter tools for finance.", icon: "fintech" },
  { slug: "mortgage-lending", title: "Mortgage & Lending", description: "Simplify lending with smart tools.", icon: "home" },
  { slug: "e-learning-education", title: "E-Learning & Education", description: "Create better learning platforms.", icon: "education" },
  { slug: "real-estate", title: "Real Estate", description: "Simplify property management w...", icon: "building" },
  { slug: "food-beverage", title: "Food & Beverage", description: "Build tools for smoother service.", icon: "food" },
  { slug: "oil-gas", title: "Oil & Gas", description: "Improve operations with digital t...", icon: "oil" },
  { slug: "retail-fmcg", title: "Retail/FMCG", description: "Build tools that improve retail.", icon: "retail" },
];
