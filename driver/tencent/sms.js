function parseSendSMSParamSet(lut, args) {
    let lutSiz = 0;
    for (const k in lut) {
        const v = lut[k];
        if (Number.isInteger(v)) lutSiz++;
        else if (Array.isArray(v)) lutSiz += lut[k].length;
    }

    const params = new Array(lutSiz);
    for (const k in args) {
        const argsV = args[k];
        const lutV = lut[k];
        if (Number.isInteger(lutV)) params[lutV] = argsV;
        else if (Array.isArray(lutV)) {
            for (const i in lutV) {
                params[i] = argsV;
            }
        }
    }

    return params;
}

module.exports = {
    NewSMSDriver: (opt) => {
        const tencentcloud = require("tencentcloud-sdk-nodejs");
        const smsClient = tencentcloud.sms.v20190711.Client;
        const models = tencentcloud.sms.v20190711.Models;
        const Credential = tencentcloud.common.Credential;
        const ClientProfile = tencentcloud.common.ClientProfile;
        const HttpProfile = tencentcloud.common.HttpProfile;

        const cred = new Credential(opt.SecretID, opt.SecretKey);

        const SmsSdkAppid = opt.SmsSdkAppid;
        const Sign = opt.Sign;
        const TemplateID = opt.TemplateID;
        const ParamSetLut = opt.ParamSetLut;

        const httpProfile = new HttpProfile();
        httpProfile.reqMethod = "POST";
        httpProfile.reqTimeout = 30;
        httpProfile.endpoint = "sms.tencentcloudapi.com";

        const clientProfile = new ClientProfile();
        clientProfile.signMethod = "HmacSHA256";
        clientProfile.httpProfile = httpProfile;

        return {
            SendSMS: async function (phoneNumberSet, args) {
                const client = new smsClient(cred, "ap-guangzhou", clientProfile);
                const req = new models.SendSmsRequest();
                req.SmsSdkAppid = SmsSdkAppid;
                req.Sign = Sign;
                req.PhoneNumberSet = phoneNumberSet;
                req.TemplateID = TemplateID;
                req.TemplateParamSet = parseSendSMSParamSet(ParamSetLut, args);
                // req.ExtendCode = "";
                // req.SenderId = "";
                // req.SessionContext = "";

                return new Promise((resolve, reject) => {
                    client.SendSms(req, (err, response) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(response.to_json_string());
                    });
                });
            }
        };
    }
};