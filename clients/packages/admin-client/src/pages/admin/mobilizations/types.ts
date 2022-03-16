export interface Widget {
  id: number;
  block_id: number;
  settings?: any;
  kind: string;
  created_at: string;
  updated_at: string;
  sm_size?: string;
  md_size?: string;
}

export interface Block {
  id: number;
  mobilization_id: number;
  created_at: string;
  updated_at: string;
  bg_class?: string;
  position: number;
  hidden?: boolean;
  bg_image?: string;
  name: string;
  menu_hidden?: boolean;
}

export interface MobilizationDetailContextValues {
  widgets: Widget[];
  blocks: Block[];
  fetching: boolean;
}