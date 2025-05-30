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

  /**
   * We will take everything from `a` and merge it with `b`.
   */
  export function mergeWith({ a, b }: { a: Grid, b: Grid }): Grid {
    const merged: Grid = {
      version: a.version,
      configs: [...a.configs]
    }

    for (const { config_name, categories } of b.configs) {
      const existingConfig = merged.configs.find(mergedConfig => mergedConfig.config_name === config_name);

      if (existingConfig) {
        // Merge individual properties of the existing config
        existingConfig.categories = [...existingConfig.categories, ...categories];
      } else {
        // If the config does not exist, add it to the merged grid
        merged.configs.push({
          config_name,
          categories
        });
      }
    }

    return merged

  }
}