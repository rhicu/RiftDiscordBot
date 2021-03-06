const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const Database = require('./db/database')
const path = require('path')

Database.init()

const bot = new Discord.Client()
require('./util/eventLoader')(bot)

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
    bot.commands.get('raidsausgeben').run(bot, null)
})

bot.database = Database
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

const commandsFolderPath = path.resolve(__dirname, 'commands')
fs.readdir(commandsFolderPath, (error, files) => {
    if (error) console.error(error)
    console.log(`${files.length} commands loaded.`)
    files.forEach((f) => {
        let props = require(`./commands/${f}`)
        console.log(`Loading Command: ${props.help.name} OK!`)
        bot.commands.set(props.help.name.toLowerCase(), props)
        props.conf.aliases.forEach((alias) => {
            bot.aliases.set(alias.toLowerCase(), props.help.name.toLowerCase())
        })
    })
})

bot.elevation = async(msg) => {

    if(msg.author.bot) return

    /**
     * This function should resolve to an ELEVATION level which
     * is then sent to the command handler for verification
     */
    const guild = await bot.guilds.fetch(config.serverID)
    const guildMember = await guild.members.fetch(msg.author.id)
    let permlvl = 0
    if (guildMember.roles.cache.has(config.roles.friend)) permlvl = 1
    if (guildMember.roles.cache.has(config.roles.member)) permlvl = 2
    if (guildMember.roles.cache.has(config.roles.lead)) permlvl = 3
    if (guildMember.roles.cache.has(config.roles.admin)) permlvl = 4
    // if (msg.author.id === config.ownerid) permlvl = 5
    return permlvl
}

bot.login(`${config.token}`)
