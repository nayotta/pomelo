module.exports = (function() {
    const fission = require("./fission");

    const tencentcloud = require("tencentcloud-sdk-nodejs");

    const smsClient = tencentcloud.sms.v20190711.Client;
    const models = tencentcloud.sms.v20190711.Models;

    const Credential = tencentcloud.common.Credential;
    const ClientProfile = tencentcloud.common.ClientProfile;
    const HttpProfile = tencentcloud.common.HttpProfile;

    const config = fission.loadConfig();
    console.log(config);
    let cred = new Credential(config.secretID, config.secretKey);

    return async function(context) {
        const stringBody = JSON.stringify(context.request.body);
        const body = JSON.parse(stringBody);
        const SdkAppid = body.SdkAppid;
        const Sign = body.Sign;
        const PhoneNumberSet = body.PhoneNumberSet;
        const TemplateID = body.TemplateID;
        const TemplateParamSet = body.TemplateParamSet;

        let httpProfile = new HttpProfile();
        httpProfile.reqMethod = "POST";
        httpProfile.reqTimeout = 30;
        httpProfile.endpoint = "sms.tencentcloudapi.com";

        let clientProfile = new ClientProfile();
        clientProfile.signMethod = "HmacSHA256";
        clientProfile.httpProfile = httpProfile;

        let client = new smsClient(cred, "ap-guangzhou", clientProfile);

        let req = new models.SendSmsRequest();
        req.SmsSdkAppid = SdkAppid;
        req.Sign = Sign;
        // req.ExtendCode = "";
        // req.SenderId = "";
        // req.SessionContext = "";
        req.PhoneNumberSet = PhoneNumberSet;
        req.TemplateID = TemplateID;
        req.TemplateParamSet = TemplateParamSet;

        return new Promise((resolve, reject) => {
            client.SendSms(req, (err, response) => {
                console.log("eeeeee>", err);
                console.log("rrrrrr>", response.to_json_string());
                if (err) {
                    reject({status: 500, body: err});
                } else {
                    resolve({
                        status: 200,
                        body: response.to_json_string()
                    });
                }
            });
        });
    };
})();