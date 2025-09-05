export interface HeroCard {
  title: string;
  subtitle: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  cards?: {
    profileOptimization: HeroCard;
    responseRate: HeroCard;
    testimonial: {
      text: string;
      author: string;
    };
    newConnection: HeroCard;
  };
}

export interface ProblemItem {
  title: string;
  description: string;
  solution: string;
}

export interface Problems {
  title: string;
  items: ProblemItem[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  features: string[];
  exampleTitle?: string;
  exampleContent?: string;
  stats?: Stat[];
}

export interface Services {
  title: string;
  subtitle: string;
  items: ServiceFeature[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  thumbnail: string;
  authorImage: string;
  companyLogo: string;
  linkedinUrl: string;
  profileUrl: string;
  testimonial?: string;
  showVideo?: boolean;
  videoSrc?: string;
  videoPoster?: string;
}

export interface Testimonials {
  title: string;
  subtitle: string;
  viewText: string;
  items: Testimonial[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQ {
  title: string;
  items: FAQItem[];
}

export interface MethodologyItem {
  title: string;
  description: string;
  items: string[];
  icon: JSX.Element;
}

export interface Methodology {
  title: string;
  subtitle: string;
  items: MethodologyItem[];
}

export interface CTA {
  title: string;
  subtitle: string;
  button: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Benefits {
  title: string;
  items: Benefit[];
}

export interface About {
  title: string;
  company: {
    title: string;
    description: string[];
    commitment: string;
    tags: string[];
  };
  founder: {
    name: string;
    role: string;
    description: string;
    tags: string[];
  };
}

export interface RequirementItem {
  title: string;
  description: string;
}

export interface Requirements {
  title: string;
  subtitle: string;
  cta: string;
  items: RequirementItem[];
}

export interface CalendlySettings {
  url: string;
}

export interface FooterSettings {
  companyName: string;
  email: string;
  socialLinks: {
    linkedin: string;
  };
  navLinks?: Array<{
    name: string;
    href: string;
  }>;
}

// Nuevos tipos para el contenido de Juan
export interface AudiencePoint {
  text: string;
}

export interface AudienceColumn {
  subtitle: string;
  points: string[];
}

export interface Audience {
  title: string;
  columns: AudienceColumn[];
}

export interface ModuleSection {
  title: string;
  description: string;
}

export interface Modules {
  title: string;
  sections: ModuleSection[];
}

export interface ExtraItem {
  title: string;
  description: string;
}

export interface Extras {
  title: string;
  items: ExtraItem[];
}

export interface ExpertModule {
  name: string;
  title: string;
  location: string;
  image: string;
  bio: string;
  learningPoints: string[];
  finalNote: string;
  highlights?: string[];
}

export interface ExpertModules {
  title: string;
  subtitle?: string;
  experts: ExpertModule[];
}

export interface PricingCTA {
  text: string;
  url: string;
}

export interface Pricing {
  title: string;
  price?: string;
  note: string;
  cta: PricingCTA;
  limitedOffer?: {
    remainingSpots: number;
    currentPrice: string;
    futurePrice: string;
    originalPrice: string;
    urgencyText: string;
    isActive?: boolean;
  };
}

export interface Instructor {
  name: string;
  title: string;
  description: string;
}

export interface RecapitulacionItem {
  title: string;
  price: number;
  description: string;
}

export interface Recapitulacion {
  title: string;
  subtitle: string;
  modules: RecapitulacionItem[];
  extras: RecapitulacionItem[];
  totalPrice: number;
  finalPrice: number;
  futurePrice?: number;
  priceNote?: string;
  cta: {
    text: string;
    url: string;
  };
}

export interface Content {
  hero: Hero;
  audience?: Audience;
  benefits: Benefits;
  modules?: Modules;
  extras?: Extras;
  expertModules?: ExpertModules;
  recapitulacion?: Recapitulacion;
  testimonials: Testimonials;
  pricing?: Pricing;
  instructor?: Instructor;
  faq: FAQ;
  problems?: Problems;
  methodology?: Methodology;
  services?: Services;
  cta?: CTA;
  about?: About;
  requirements?: Requirements;
  calendly?: CalendlySettings;
  footer: FooterSettings;
}
