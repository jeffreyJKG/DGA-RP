const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const user = inter.options.getMember('user');
        const time = inter.options.getString('length');
        const reason = inter.options.getString('reason') || 'Er is geen reden opgegeven.'

        const notANumber = new Discord.MessageEmbed()
            .setDescription(`De ingevoerde lengte voor de van is niet geldig!\nGebruik: \`1y, 1d, 1h, 1m of 1s\`, je kan de nummers aanpassen!`)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        if(!Number(ms(time))) return await inter.reply({ embeds: [notANumber], ephemeral: true })

        const succesEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: 'Gebruiker Verbannen', iconURL: inter.guild.iconURL({ dynamic: true }) })
            .setDescription(`Speler **${user.user.tag}** succesvol verbannen!\nZie informatie over de ban onder dit bericht.\n\n**Ingevoerde informatie:**\n> Verbannen gebruiker: \`${user.user.tag}\`\n> Verbannen door: ${inter.user}\n> Reden: ${reason}\n> Lengte: ${ms(ms(time))}`)
            .setColor(db.get(`color_${inter.guildId}`))

        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

        inter.guild.members.ban(user.id, { reason: `${reason} - Verbannen door: ${inter.user.username}` }).catch(e => {});

        const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`modLog_${inter.guildId}`))
        if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});

        setTimeout(() => {

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`Speler **${user.user.tag}** is succesvol geunbanned!\nHij heeft zijn van \`${ms(ms(time))}\` heeft die uitgezeten.`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Gebruiker Geunbanned', iconURL: inter.guild.iconURL({ dynamic: true }) })

            const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`modLog_${inter.guildId}`))
            if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});

            inter.guild.members.unban(user.id).catch(e => {});

        }, ms(time))

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const user = inter.options.getMember('user');
        const time = inter.options.getString('length');
        const reason = inter.options.getString('reason') || 'No reason was given.'

        const notANumber = new Discord.MessageEmbed()
            .setDescription(`The length entered for the van is not valid!\nUse: \`1y, 1d, 1h, 1m or 1s\`, you can change the numbers!`)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        if(!Number(ms(time))) return await inter.reply({ embeds: [notANumber], ephemeral: true })

        const succesEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: 'User Banned', iconURL: inter.guild.iconURL({ dynamic: true }) })
            .setDescription(`Player **${user.user.tag}** successfully banned!\nSee information about the ban below this post.\n\n**Information entered:**\n> Banned user: \`${user.user.tag}\`\n> Banned by: ${inter.user}\n> Reason: ${reason}\n> Length: ${ms(ms(time))}`)
            .setColor(db.get(`color_${inter.guildId}`))

        await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

        inter.guild.members.ban(user.id, { reason: `${reason} - Banned by: ${inter.user.username}` }).catch(e => {});

        const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`modLog_${inter.guildId}`))
        if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});

        setTimeout(() => {

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`Player **${user.user.tag}** was successfully unbanned!\nHe has served his from \`${ms(ms(time))}\`.`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'User Unbanned', iconURL: inter.guild.iconURL({ dynamic: true }) })

            const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`modLog_${inter.guildId}`))
            if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});

            inter.guild.members.unban(user.id).catch(e => {});

        }, ms(time))

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
    name: 'tempban'
}