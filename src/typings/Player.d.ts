export interface PlayerResponse {
  errors?: {
    title: string;
    detail?: string;
  }[];
  data?: {
    type: string;
    id: string;
    attributes: {
      name: string;
      stats: null;
      titleId: string;
      shardId: string;
      patchVersion: string;
    };
    relationships: {
      assets: Assets;
      matches: Assets;
    };
    links: {
      self: string;
      schema: string;
    };
  }[];
  links?: {
    self: string;
  };
  meta?: {};
}

interface Assets {
  data: {
    type: string;
    id: string;
  }[];
}
