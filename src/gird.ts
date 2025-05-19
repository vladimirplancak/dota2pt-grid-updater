export interface Grid {
  version: number;
  configs: Grid.Config[];
}

export namespace Grid {
  export interface Config {
    config_name: string;
    categories: Category[];
  }

  export interface Category {
    category_name: string;
    x_position: number;
    y_position: number;
    width: number;
    height: number;
    hero_ids: number[];
  }
}