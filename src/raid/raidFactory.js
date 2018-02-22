const config = require('./raidConfig')
const Raid = require('./raid')

/** */
class RaidFactory {

    /**
     * @param {String} input
     * @return {Raid}
     */
    static createRaidFromUserInput(input) {
        try {
            const splittedInput = input.split(' ').splice(1)
            if(splittedInput.length < 2) {
                return null
            }

            const messageID = ''
            const recurring = false
            const recurringMember = {
                player: {}
            }
            const mainRaid = false
            const display = true
            const member = {
                registered: {},
                confirmed: {},
                deregistered: {}
            }

            const type = RaidFactory._getType(splittedInput[0])

            let start
            let end
            switch(splittedInput.length) {
                case 2:
                    start = RaidFactory._verifyTime(config.defaultStartingTime)
                    end = RaidFactory._verifyTime(config.defaultEndingTime)
                    break
                case 4:
                    start = RaidFactory._verifyTime(splittedInput[1])
                    end = RaidFactory._verifyTime(splittedInput[2])
                    break
                default:
                    throw new Error('You have to declare either start and end time or none of them!')
            }

            const raidLeadName = RaidFactory._getRaidLeadName(splittedInput[3])

            return new Raid(type, start, end, raidLeadName, messageID, member, recurring, recurringMember, mainRaid, display)
        } catch(error) {
            throw error
        }
    }

    /**
     * @param {Object} dataBaseObject
     * @return {Raid}
     */
    static recreateRaidFromDatabaseObject(dataBaseObject) {
        if(dataBaseObject) {
            let date = new Date(dataBaseObject.date)
            return new Raid(dataBaseObject.id, dataBaseObject.type, date, dataBaseObject.start, dataBaseObject.end, dataBaseObject.raidLead, dataBaseObject.messageID)
        } else {
            return null
        }
    }

    /**
     * @param {string} input
     * @return {String}
     * @return {null}
     */
    static _getType(input) {
        input = input.toLowerCase()
        let possibleRaids = config.raids
        for(let raid in possibleRaids) {
            if(raid === input) {
                return raid
            } else {
                let alias = possibleRaids[raid].alias
                for(let i = 0; i < alias.length; i++) {
                    if(alias[i] === input)
                        return raid
                }
            }
        }
        return null
    }

    /**
     * @param {String} dateString
     * @return {Date}
     */
    static _generateDate(dateString) {
        const dateArray = dateString.split('.')
        return new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`)
    }

    /**
     * @param {String} timeString
     * @return {String}
     */
    static _verifyTime(timeString) {
        return timeString
    }

    /**
     * @param {String} shortName
     * @return {String}
     */
    static _getRaidLeadName(shortName) {
        return ''
    }
}

module.exports = RaidFactory
