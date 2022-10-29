export interface Season {
  errors?: {
    title: string;
    detail?: string;
  }[];
  data?: {
    type: string;
    id: string;
    attributes: {
      isCurrentSeason: boolean;
      isOffseason: boolean;
    };
  }[];
  links?: {
    self: string;
  };
  meta?: {};
}
