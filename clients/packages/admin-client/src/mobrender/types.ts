export interface Community {
  id: number;
  name: string;
}

export interface Theme {
  id: number;
  label: string;
}

export interface MobilizationSubtheme {
  subtheme: Theme
}

export interface Mobilization {
  id: number;
  body_font?: string;
  color_scheme?: string;
  created_at: string;
  custom_domain?: string;
  deleted_at?: string;
  facebook_share_description?: string;
  facebook_share_image?: string;
  facebook_share_title?: string;
  favicon?: string;
  goal: string;
  google_analytics_code?: string;
  header_font?: string;
  language?: string;
  name: string;
  slug: string;
  status: string;
  twitter_share_text?: string;
  updated_at: string;
  user_id: number;
  community: Community
  mobilizations_subthemes: MobilizationSubtheme[]
  theme: Theme
}