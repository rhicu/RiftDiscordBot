class util {
    constructor() {}

    static multiLineStringFromArray(array) {
        var string = "";
        for(var i = 0; i < array.length; i++) {
            string = `${string}${array[i]}\n`
        }
        return string;
    }

    static multiLineStringFromPlayerArray(array) {
        var string = "";
        for(var i = 0; i < array.length; i++) {
            string = `${string}${array[i].toString()}\n`
        }
        return string;
    }

    static getDay(string) {
        return string;
    }

    static getDate(string) {
        return string;
    }
}

module.exports = util;