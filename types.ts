export interface SpecRow {
  label: string;
  value: string;
  isStatus?: boolean;
}

export interface ProofStat {
  /** Numeric part to count up to (e.g. 10 for "10K+") */
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  text: string;
  tags: string;
}

export interface OpenSourceProject {
  name: string;
  stars: number;
  tagline: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
}

export interface CaseStudy {
  number: string;
  title: string;
  subtitle: string;
  url: string;
  image: string;
}

export interface ClientWork {
  name: string;
  role: string;
  roleType: 'BE' | 'FE' | 'CTO';
  description: string;
  results?: string;
  tags: string[];
  duration: string;
  url: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  type: string;
  date: string;
  location?: string;
}

export interface Principle {
  number: string;
  title: string;
  text: string;
}
