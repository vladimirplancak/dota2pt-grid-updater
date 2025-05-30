import * as fs from "fs";
import * as https from "https";
import * as path from "path";
import * as env from "./env.secret";
import { Grid } from './gird'




const dotaCfgPath = path.join(
  env.STEAM_BASE_PATH,
  "Steam",
  "userdata",
  env.STEAM_ID,
  "570",
  "remote",
  "cfg"
)

const targetFile = path.join(dotaCfgPath, "hero_grid_config.json")
const backupFile = path.join(dotaCfgPath, "hero_grid_config_backup.json")


function downloadJson(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed. Status code: ${res.statusCode}`))
          return;
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}


async function updateHeroGrid() {
  try {
    console.log("Downloading hero grid...");
    const downloadedJson = await downloadJson(env.GRID_URL);
    // NOTE: we might as well cast it, this will probably break if dota2protracker changes the format
    const proTrackerGrid = JSON.parse(downloadedJson) as Grid

    if (!fs.existsSync(dotaCfgPath)) {
      throw new Error(`Dota config path not found: ${dotaCfgPath}`);
    }

    if (fs.existsSync(targetFile)) {
      const existingJson = fs.readFileSync(targetFile, "utf-8");
      const existingGrid = JSON.parse(existingJson) as Grid

      fs.renameSync(targetFile, backupFile);
      console.log("Backed up existing grid to hero_grid_config_backup.json");

      const mergedGrid = Grid.mergeWith({
        baseGrid: existingGrid,
        updateGrid: proTrackerGrid,
      })
     

      fs.writeFileSync(targetFile, JSON.stringify(mergedGrid, null, 2))
      console.log("Updated hero grid successfully!");
    }
  } catch (err) {
    console.error("Failed to update hero grid:", err)
  }
}

updateHeroGrid()
