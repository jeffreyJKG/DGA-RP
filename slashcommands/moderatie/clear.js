const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)!`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const wrongNumber = new Discord.MessageEmbed()
            .setDescription(`Je hebt een verkeerd getal ingevoerd.\nHet aantal berichten moet minimaal 1 zijn en maximaal 99!`)
            .setColor(db.get(`color_${inter.guildId}`))
            .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        const amount = inter.options.getNumber('amount');
        if(amount > 99 || amount < 1) return await inter.reply({ embeds: [wrongNumber], ephemeral: true }).catch(e => {});

        inter.channel.bulkDelete(amount, true).catch(e => {});

        const succesEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: `Berichten Verwijderd`, iconURL: inter.guild.iconURL({ dynamic: true }) })
            .setDescription(`\`${amount}\` berichten zijn verwijderd! (${inter.channel})`)
            .setColor(db.get(`color_${inter.guildId}`))
        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

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

        const wrongNumber = new Discord.MessageEmbed()
            .setDescription(`You entered the wrong number.\nThe number of messages must be at least 1 and at most 99!`)
            .setColor(db.get(`color_${inter.guildId}`))
            .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        const amount = inter.options.getNumber('amount');
        if(amount > 99 || amount < 1) return await inter.reply({ embeds: [wrongNumber], ephemeral: true }).catch(e => {});

        inter.channel.bulkDelete(amount, true).catch(e => {});

        const succesEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: `Messages Deleted`, iconURL: inter.guild.iconURL({ dynamic: true }) })
            .setDescription(`\`${amount}\` messages have been deleted! (${inter.channel})`)
            .setColor(db.get(`color_${inter.guildId}`))
        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

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
    name: 'clear'
}