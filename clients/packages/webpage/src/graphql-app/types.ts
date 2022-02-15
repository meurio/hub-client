export type EqFilter = {
  _eq: string
}

export type Filter = {
  slug?: EqFilter
  custom_domain?: EqFilter
}

export type Aggregate = {
  aggregate: { count: number }
}

export type WidgetGraphQL = {
  id: number
  kind: string
  goal?: string
  settings: any
  block_id: number
  created_at: string
  updated_at: string
  sm_size: string
  md_size: string
  lg_size: string
  activist_pressures_aggregate: Aggregate
  form_entries_aggregate: Aggregate
  donations_aggregate: Aggregate
}

export type CommunityGraphQL = {
  image: string
  signature?: {
    name: string
    url: string
  }
}

export type MobilizationGraphQL = {
  id: number
  name: string
  created_at: string
  color_scheme?: string
  google_analytics_code?: string
  goal: string
  header_font?: string
  body_font?: string
  facebook_share_title?: string
  facebook_share_description?: string
  facebook_share_image?: string
  slug: string
  custom_domain?: string
  twitter_share_text?: string
  community_id: number
  community: CommunityGraphQL
  favicon?: string
  status?: string
  language: 'ptbr' | 'es'
}

export type BlockGraphQL = {
  id: number
  menu_hidden?: boolean
  hidden?: boolean
  bg_class?: string
  bg_image?: string
  name?: string
  position: number
}