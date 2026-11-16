export interface CompanySettings {
  companyName: string;
  tagline: string;
  logoUrl?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workshopAddress: string;
  aboutImage?: string;
  workshopImage?: string;
  workingHours: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutStory: string;
  vision: string;
  mission: string[];
  yearsExperience: number;
  completedProjects: number;
  citiesServed: number;
  warrantyYears: number;
  reviewVideos?: {
    id: string;
    title: string;
    videoUrl: string;
    clientName: string;
    location: string;
    thumbnail?: string;
  }[];
  galleryPhotos?: {
    id: string;
    url: string;
    caption: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category?: string;
  badge?: string;
  daunThickness: string;
  stripThickness: string;
  unpSize: string;
  frameSpec?: string;
  galaran?: string;
  silangan?: string;
  relBesar?: string;
  cakakTiang?: string;
  pipaKotak?: string;
  platTopi?: string;
  usageRecommendation?: string;
  bearingType: string;
  lockType: string;
  finishing: string;
  warrantyInfo?: string;
  pricePerMeter: number;
  priceDisplay: string;
  description: string;
  features: string[];
  image: string;
  isPopular?: boolean;
  order: number;
}

export interface MaterialItem {
  id: string;
  name: string;
  subtitle: string;
  specs: string;
  description: string;
  advantages: string[];
  image: string;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Ruko & Komersial" | "Gudang & Industri" | "Garasi Rumah" | "Toko & Pasar";
  location: string;
  client: string;
  year: string;
  productType: string;
  unitsCount: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  companyOrLocation: string;
  rating: number;
  content: string;
  projectType: string;
  date: string;
  avatarUrl?: string;
  photoUrl?: string;
  videoUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  type: "inquiry" | "partnership" | "survey_request";
  width?: string;
  height?: string;
  productInterest?: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "done";
}

export interface DatabaseData {
  settings: CompanySettings;
  products: Product[];
  materials: MaterialItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  messages: ContactMessage[];
}
