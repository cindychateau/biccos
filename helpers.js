const helpers = {
    i: 1,
    getFrame: function (type, data = {}) {
        var frame = {
            "m": 0,
            "i": this.i,
            "n": "",
            "o": ""
        };
        switch (type) {
            case 'products':
                frame.n = "GetProducts";
                frame.o = JSON.stringify({
                    OMSId: 1
                });
                break;
            case 'instruments':
                frame.n = "GetInstruments";
                frame.o = JSON.stringify({
                    OMSId: 1
                });
                break;
            case 'instrument':
                frame.n = "GetInstrument";
                frame.o = JSON.stringify({
                    OMSId: 1,
                    InstrumentId: data.InstrumentId
                });
                break;
            case 'subscribe1':
                frame.n = "SubscribeLevel1";
                frame.o = JSON.stringify({
                    OMSId: 1,
                    InstrumentId: data.InstrumentId
                });
                break;
            default:
                break;
        }
        this.i++;
        return JSON.stringify(frame);
    }
}
module.exports = helpers;