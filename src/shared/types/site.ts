/**
 * Domain types for static site content (`shared/content/data`).
 * Colocated under `shared/types` because multiple apps consume `SiteData`.
 */

export interface Person {
  name: string;
  profilePhoto: string;
  designationTitle: string;
  designationSubtitle: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  followOnLinkedin: string;
}

export interface MoreAboutMe {
  resumeViewLink: string;
  resumeDownloadLink: string;
  professionalSummary: string;
}

export interface TimelineEntry {
  icon: string;
  period: string;
  link: string;
  headTitle: string;
  title: string;
  subtitle?: string;
  points: string[];
  skills?: string[];
}

export interface ProjectItem {
  photo: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  link: string;
}

export interface CertificateItem {
  photo: string;
  title: string;
  issuer: string;
  credentialId: string;
  link: string;
}

export interface SkillBuckets {
  languages: string[];
  frameworks: string[];
  tools: string[];
  softSkills: string[];
  practices: string[];
}

export interface SiteData {
  person: Person;
  moreAboutMe: MoreAboutMe;
  timeline: TimelineEntry[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  conceptTags: string[];
  social: SocialLinks;
  skills: SkillBuckets;
  extensiveSkills: string[];
}
