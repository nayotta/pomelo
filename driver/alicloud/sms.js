module.exports = {
    NewSMSDriver: (opt) => {
        const SMSClient = require('@alicloud/sms-sdk');

        return {
            SendSMS: async function (phoneNumberSet, args) {
                const smsClient = new SMSClient({
                    accessKeyId: opt.accessKeyId,
                    secretAccessKey: opt.secretAccessKey,
                });

                return smsClient.sendSMS({
                    PhoneNumbers: phoneNumberSet.join(","),
                    SignName: opt.SignName,
                    TemplateCode: opt.TemplateCode,
                    TemplateParam: JSON.stringify(args)
                });
            }
        }
    },
};