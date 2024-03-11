const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const user = inter.options.getString('user-id');

        const noNumber = new Discord.MessageEmbed()
            .setDescription(`Je hebt geen geldig ID ingevoerd! Probeer dit opnieuw.`)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })
        if(!Number(user)) return await inter.reply({ embeds: [noNumber], ephemeral: true }).catch(e => {});

        const succesEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: 'Gebruiker Geunbanned', iconURL: inter.guild.iconURL({ dynamic: true }) })
        .setDescription(`Speler \`${user}\` succesvol geunbanned!\nDeze gebruiker is geunbanned door: ${inter.user}`)
        .setColor(db.get(`color_${inter.guildId}`))

        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

        inter.guild.members.unban(user.id).catch(e => {});

        const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`modLog_${inter.guildId}`))
        if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const user = inter.options.getString('user-id');

        const noNumber = new Discord.MessageEmbed()
            .setDescription(`You have not entered a valid ID! Try this again.`)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })
        if(!Number(user)) return await inter.reply({ embeds: [noNumber], ephemeral: true }).catch(e => {});

        const succesEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: 'User Unbanned', iconURL: inter.guild.iconURL({ dynamic: true }) })
        .setDescription(`Player \`${user}\` successfully unbanned!\nThis user has been unbanned by: ${inter.user}`)
        .setColor(db.get(`color_${inter.guildId}`))

        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

        inter.guild.members.unban(user.id).catch(e => {});

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
    name: 'unban'
}