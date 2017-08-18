const util = require("./util");
const player = require("./player");
const enums = require("./enums");
const N = "\n";

class raid {
    constructor(config, type) {
        this.type = type;
        this.config = config;
        this.day = "";
        this.date = "";
        this.invite = "";
        this.start = "";
        this.end = "";
        this.img = config.imgPath;
        this.name = config.name;
        this.shortName = config.shortName;
        this.embedColor = config.embedColor;
        this.registeredPlayer = [];
        this.messageID = "";
    }

    isValid() {
        return (this.day !== "" && this.date !== "" && this.invite !== "" && this.start !== "" && this.end !== "");
    }

    generateRaidOutput() {
        var plannedRaids =  `${this.name} - ${this.day}, ${this.date}${

                            N}Raidinvite: ${this.invite}${
                            N}Raidstart: ${this.start} - Raidende : ${this.end}${

                            N}Vorraussetzung:${
                            N}${util.multiLineStringFromArray(this.config.requirements)}${
                            N}Insgesamt verfügbare Plätze: ${this.config.numberPlayer}${

                            N}Benötigt: ${this.config.numberTank}x Tank, ${this.config.numberHeal}x Heal, ${this.config.numberSupport}x Supp, ${this.config.numberDD}x DD${

                            N}Angemeldet:${
                            N}${util.multiLineStringFromArray(this.registeredPlayer)}`;
        return plannedRaids;
    }
}

module.exports = td;