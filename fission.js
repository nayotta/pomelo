import fs from "fs";
import path from "path";

export function loadConfig() {
    const files = fs.readdirSync("/configs");
    for (let i in files) {
        const cfg = path.join("/configs", files[i], "pomelo-config", "pomelo.json");
        if (fs.existsSync(cfg)) {
            const buf = fs.readFileSync(cfg);
            return JSON.parse(buf.toString());
        }
    }
}