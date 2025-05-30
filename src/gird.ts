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
  export function mergeWith({ baseGrid, updateGrid }: { baseGrid: Grid, updateGrid: Grid }): Grid {
    // Start with the base grid's version and configurations
    const merged: Grid = {
      version: baseGrid.version,
      configs: [...baseGrid.configs]
    }

    // Iterate through the update grid's configurations
    for (const { config_name, categories } of updateGrid.configs) {
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