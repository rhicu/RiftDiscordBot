
exports.run = (bot, msg, args) => {
    try {
        if(args.length !== 1) {
            msg.reply('Invalid Number of Arguments. Please check input and try again!')
            return
        }

        const discordID = msg.author.id
        bot.database.getPlayerByShortNameAndDiscordID(args[0], discordID)
            .then((player) => {
                if(!player) {
                    msg.reply('Could not delete player. Player does not exist, has another shortName or was not created by you')
                    return
                } else {
                    bot.database.deletePlayer(args[0], discordID)
                        .then((wasDeleted) => {
                            if(wasDeleted) {
                                msg.reply(`Player successfully deleted!`)
                            } else {
                                msg.reply(`Player could not be deleted!`)
                            }
                        })
                }
            })
    } catch(error) {
        msg.reply(error.message)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 1
}

exports.help = {
    name: 'deletePlayer',
    description: 'Deleting a self created player',
    usage: 'deletePlayer <shortName>'
}
