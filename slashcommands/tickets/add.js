const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(db.get(`ticketConfig_${inter.channelId}.approved`) != true){
            const notATicket = new Discord.MessageEmbed()
                .setDescription(`Je kan dit commando enkel gebruiker in een ticket!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })
            return await inter.reply({ embeds: [notATicket], ephemeral: true })
        }

        const user = inter.options.getMentionable('user-or-role');

        const succesEmbed = new Discord.MessageEmbed()
            .setDescription(`${user} is succesvol toegevoegd aan dit kanaal!\nJe kan hem weer verwijderen door middel van: \`/remove <@user>\``)
            .setColor(client.config.colors.positive)
            .setAuthor({ name: 'Gebruiker(s) Toegevoegd', iconURL: inter.guild.iconURL({ dynamic: true }) })
        
        inter.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })

        await inter.reply({ embeds: [succesEmbed] })

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(db.get(`ticketConfig_${inter.channelId}.approved`) != true){
            const notATicket = new Discord.MessageEmbed()
                .setDescription(`You can only use this command in a ticket!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })
            return await inter.reply({ embeds: [notATicket], ephemeral: true })
        }

        const user = inter.options.getMentionable('user-or-role');

        const succesEmbed = new Discord.MessageEmbed()
            .setDescription(`${user} has been successfully added to this channel!\nYou can remove it again using: \`/remove <@user>\``)
            .setColor(client.config.colors.positive)
            .setAuthor({ name: 'User(s) Added', iconURL: inter.guild.iconURL({ dynamic: true }) })
        
        inter.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })

        await inter.reply({ embeds: [succesEmbed] })

    } else {
        const noLang = new Discord.MessageEmbed()
            .setDescription(`There is no known language in our database for this server! :boom:
Use the command: \`/setup\` to start setting up your bot!

If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
            .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})
            .setColor(client.config.colors.negative)
        return await inter.reply({ embeds: [noLang], ephemeral: true }).catch(e => {});
    }
    
}


module.exports.help = {
    name: 'add'
}