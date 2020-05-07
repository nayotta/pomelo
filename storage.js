function loadConfigStorage() {
    const fissionConfig = require("./fission/config");
    const storCfg = fissionConfig.LoadConfig("pomelo-config", "storage.json");
    return storCfg;
}

module.exports = {
    NewStorage: () => {
        const stor = loadConfigStorage();
        return {
            GetSMSConfig: (id) => {
                return new Promise((resolve, reject) => {
                    if (!(id in stor)) {
                        reject(new Error("SMS Config not found"));
                        return;
                    }

                    resolve(stor[id]);
                });
            },
        };
    }
};