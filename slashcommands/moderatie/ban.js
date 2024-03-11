const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('BAN_MEMBERS')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const user = inter.options.getMember('user');
        const reason = inter.options.getString('reason') || 'Er is geen reden opgegeven.'

        const succesEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: 'Gebruiker Verbannen', iconURL: inter.guild.iconURL({ dynamic: true }) })
        .setDescription(`Speler **${user.user.tag}** succesvol verbannen!\nZie informatie over de ban onder dit bericht.\n\n**Ingevoerde informatie:**\n> Verbannen gebruiker: \`${user.user.tag}\`\n> Verbannen door: ${inter.user}\n> Reden: ${reason}`)
        .setColor(db.get(`color_${inter.guildId}`))

        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

        inter.guild.members.ban(user.id, { reason: `${reason} - Verbannen door: ${inter.user.username}` }).catch(e => {});

        const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`modLog_${inter.guildId}`))
        if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(!inter.member.permissions.has('BAN_MEMBERS')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameles!`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const user = inter.options.getMember('user');
        const reason = inter.options.getString('reason') || 'No reason was given.'

        const succesEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: 'User Banned', iconURL: inter.guild.iconURL({ dynamic: true }) })
        .setDescription(`Player **${user.user.tag}** successfully banned!\nSee information about the ban below this post.\n\n**Information entered:**\n> Banned user: \`${user.user.tag}\`\n> Banned by: ${inter.user}\n> Reason: ${reason}`)
        .setColor(db.get(`color_${inter.guildId}`))

        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

        inter.guild.members.ban(user.id, { reason: `${reason} - Banned by: ${inter.user.username}` }).catch(e => {});

        const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`modLog_${inter.guildId}`))
        if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});

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
    name: 'ban'
}