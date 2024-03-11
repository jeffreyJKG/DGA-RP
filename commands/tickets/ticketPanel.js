const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'ticketpanel',
    usage: 'ticketpanel [#channel]',
    description: 'Place a ticket panel in a channel.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)
    
        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)!`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: message.guild.iconURL({ dynamic: true })})
                await message.channel.send({ embeds: [noPerms] }).catch(e => {}); return
            }

            const onlySlash = new Discord.MessageEmbed()
                .setDescription(`Dit commando is enkel beschikbaar via **Slash Commando's**!\nGebruik: \`/ticketpanel\` en maak je keuzes!`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
            const msg = await message.channel.send({ embeds: [onlySlash] }); setTimeout(() => { msg.delete().catch(e => {}); }, 5000); return
    
        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
    
            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: message.guild.iconURL({ dynamic: true })})
                await message.channel.send({ embeds: [noPerms] }).catch(e => {}); return
            }

            const onlySlash = new Discord.MessageEmbed()
                .setDescription(`This command is only available via **Slash Commands**!\nUse: \`/ticketpanel\` and make your choices!`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
            const msg = await message.channel.send({ embeds: [onlySlash] }); setTimeout(() => { msg.delete().catch(e => {}); }, 5000); return
    
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
    name: 'ticketpanel',
    aliases: ['createreact']
}