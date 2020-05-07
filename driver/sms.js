const SMS_DRV_FTY = {
    "tencent": require("./tencent/sms").NewSMSDriver
}

module.exports = {
    NewSMSDriver: (drv, opt) => {
        if (!(drv in SMS_DRV_FTY)) {
            throw new Error("Unexpected SMS Driver");
        }

        return SMS_DRV_FTY[drv](opt);
    }
};