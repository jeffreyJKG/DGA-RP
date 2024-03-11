const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'rename',
    usage: 'rename <name>',
    description: 'Change the name of a ticket.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)
    
        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            if(db.get(`ticketConfig_${message.channel.id}.approved`) != true){
                const notATicket = new Discord.MessageEmbed()
                    .setDescription(`Je kan dit commando enkel gebruiker in een ticket!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
                return await message.channel.send({ embeds: [notATicket], ephemeral: true })
            }
    
            const name = args.join(" ") || 'naam-onbekend'
            message.channel.setName(name).catch(e => {});
    
            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`De naam van deze ticket is succes aangepast!`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Naam Aangepast', iconURL: message.guild.iconURL({ dynamic: true }) })
            await message.channel.send({ embeds: [succesEmbed], ephemeral: true })
    
        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
    
            if(db.get(`ticketConfig_${message.channel.id}.approved`) != true){
                const notATicket = new Discord.MessageEmbed()
                    .setDescription(`You can only use this command in a ticket!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
                return await message.channel.send({ embeds: [notATicket], ephemeral: true })
            }
    
            const name = args.join(" ") || 'name-unknown'
            message.channel.setName(name).catch(e => {});
    
            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`The name of this ticket has been changed successfully!`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Name Modified', iconURL: message.guild.iconURL({ dynamic: true }) })
            await message.channel.send({ embeds: [succesEmbed], ephemeral: true })
    
        } else {
            const noLang = new Discord.MessageEmbed()
                .setDescription(`There is no known language in our database for this server! :boom:
    Use the command: \`/setup\` to start setting up your bot!
    
    If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true })})
                .setColor(client.config.colors.negative)
            return await message.channel.send({ embeds: [noLang], ephemeral: true }).catch(e => {});
        }

    }
    
}

module.exports.help = {
    name: 'rename',
    aliases: []
}