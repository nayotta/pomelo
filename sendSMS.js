module.exports = (function() {
    const storageLib = require("./storage");
    const smsDrvLib = require("./driver/sms");

    const storage = storageLib.NewStorage();
    return async function(context) {
        const stringBody = JSON.stringify(context.request.body);
        const body = JSON.parse(stringBody);
        const smsCfgID = context.request.get("X-Fission-Params-Id");
        try {
            const smsCfg = await storage.GetSMSConfig(smsCfgID);
            const smsDrv = smsDrvLib.NewSMSDriver(smsCfg.driver, smsCfg);
            const ret = await smsDrv.SendSMS(body.phoneNumberSet, body.arguments);
 
            // TODO(Peer): logging
            console.log(ret);

            return {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: "{}"
            };

        } catch(err) {
            console.log(err);

            return {
                status: 500,
                body: err
            };
        }
    };
})();