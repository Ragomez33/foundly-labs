export type SocialPlatform = 'x' | 'github' | 'linkedin' | 'youtube' | 'discord';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  social: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface BaseLayoutProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
}
