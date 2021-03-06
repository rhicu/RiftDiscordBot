const util = require('../util/util')
const MessageEmbed = require('discord.js').MessageEmbed
const config = require('./raidConfig')
const Time = require('../util/time')
const N = '\n'

/** */
class Raid {

    /**
     * @param {String} type
     * @param {Date} start
     * @param {Date} end
     * @param {String} raidLead
     * @param {String} messageID
     * @param {Object} member
     * @param {Object} recurring
     * @param {Object} recurringMember
     * @param {Boolean} isMainRaid
     * @param {Boolean} shouldBeDisplayed
     */
    constructor(type, start, end, raidLead, messageID, member, recurring, recurringMember, isMainRaid, shouldBeDisplayed) {
        this.type = type
        this.start = start
        this.end = end
        this.raidLead = raidLead
        this.messageID = messageID

        // member = {
        //     registered: [],
        //     confirmed: [],
        //     deregistered: []
        // }
        this.member = member

        this.recurring = recurring

        // recurringMember = {
        //     player: []
        // }
        this.recurringMember = recurringMember

        this.isMainRaid = isMainRaid
        this.shouldBeDisplayed = shouldBeDisplayed

        this.invite = Time.substractMinutesFromGivenTime(start, 15)
    }

    /**
     * @return {Number}
     */
    priority() {
        return this.start.valueOf()
    }

    /**
     * @return {String}
     */
    _generateRaidOutput() {
        return `${config.raids[this.type].name} - ${Time.dateToDateString(this.start)}${
            N}AnmeldeID: ${this.id}${N}${
            N}Raid Lead: ${util.formatPlayerName(this.raidLead)}${N}${
            N}Invite: ${Time.dateToTimeString(this.invite)}${
            N}Beginn: ${Time.dateToTimeString(this.start)}${
            N}Ende:   ${Time.dateToTimeString(this.end)}${
            N}${
            N}Insgesamt verfügbare Plätze: ${config.raids[this.type].numberPlayer}${
            N}Benötigt: ${config.raids[this.type].numberTank}x Tank, ${config.raids[this.type].numberHeal}x Heal, ${config.raids[this.type].numberSupport}x Supp, ${config.raids[this.type].numberDD}x DD`
    }

    /**
     * @param {Database} database
     * @return {MessageEmbed}
     */
    generateEmbed() {
        try {
            const registered = util.getPlayerAsStringForRaidOutput(this.member.registered)
            const deregistered = util.getPlayerAsStringForRaidOutput(this.member.deregistered)
            const confirmed = util.getPlayerAsStringForRaidOutput(this.member.confirmed)

            let embed = new MessageEmbed()
                .setThumbnail(config.raids[this.type].imgPath)
                .setTitle(config.raids[this.type].name)
                .addField('Daten:', this._generateRaidOutput())
                .addField('Vorraussetzungen:', this._checkForEmptyStrings(util.multiLineStringFromArray(config.raids[this.type].requirements)))
                .addField('Angemeldet:', registered)
                .addField('Bestätigt:', confirmed)
                .addField('Abgemeldet:', deregistered)
                .setFooter('Registrierung via RiftDiscordBot')
                .setColor(config.raids[this.type].embedColor)
            return embed
        } catch(error) {
            console.log(`generateEmbed:\n${error.stack}`)
        }
    }

    /**
     *
     * @param {String} input
     *
     * @return {String}
     */
    _checkForEmptyStrings(input) {
        if(input === '') {
            return '...'
        } else {
            return input
        }
    }
}

module.exports = Raid
