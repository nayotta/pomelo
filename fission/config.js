const fs = require("fs");
const path = require("path");

const FISSION_CONFIG_PATH = "/configs"

const GetNamespace = () => {
    files = fs.readdirSync(FISSION_CONFIG_PATH);
    if (files.length === 0 || files.length > 1) {
        throw new Error("unexpected configs path");
    }

    return files[0];
};

const LoadConfig = (configmapName, fileName) => {
    const ns = GetNamespace();
    const cfgPath = path.join(FISSION_CONFIG_PATH, ns, configmapName, fileName);
    if (!fs.existsSync(cfgPath)) {
        throw new Error("file not found");
    }

    const cfgBuf = fs.readFileSync(cfgPath);
    const cfg = JSON.parse(cfgBuf.toString());

    return cfg;
};

module.exports = {
    GetNamespace: GetNamespace,
    LoadConfig: LoadConfig
};
