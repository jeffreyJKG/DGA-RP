const Discord = require('discord.js');
const db = require('quick.db');
const { Permissions } = require('discord.js');

module.exports.run = async (client, inter) => {

    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        const noChannel = new Discord.MessageEmbed()
            .setDescription(`Er is geen report kanaal bekend voor deze server!\nJe kan deze instellen via: \`/config other report-channel\``)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        const channel = inter.guild.channels.cache.find(x => x.id === db.get(`reportChannel_${inter.guildId}`))
        if(channel === undefined) return await inter.reply({ embeds: [noChannel], ephemeral: true })

        const report = inter.options.getString('your-report');

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${client.user.username} Reports`, iconURL: inter.user.displayAvatarURL({ dynamic: true }) })
            .addField(`Report verzonden door:`, `${inter.user} (${inter.user.tag})`)
            .addField(`Ingediende report:`, `${report}`)
            .setColor(db.get(`color_${inter.guildId}`))
            .setThumbnail(inter.guild.iconURL({ dynamic: true }))
        await channel.send({ embeds: [embed], fetchReply: true }).then((m) => {

        const succesEmbed = new Discord.MessageEmbed()
            .setDescription(`Je report is succesvol geplaatst! Klik [hier](https://discord.com/channels/${inter.guildId}/${channel.id}/${m.id}) om je report te bekijken!`)
            .setColor(client.config.colors.positive)
            .setAuthor({ name: 'Report Geplaatst!', iconURL: inter.guild.iconURL({ dynamic: true }) })
        const fail = inter.reply({ embeds: [succesEmbed], ephemeral: true });

    })
            

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        const noChannel = new Discord.MessageEmbed()
            .setDescription(`There is no known report channel for this server!\nYou can set it via: \`/config other report-channel\``)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        const channel = inter.guild.channels.cache.find(x => x.id === db.get(`reportChannel_${inter.guildId}`))
        if(channel === undefined) return await inter.reply({ embeds: [noChannel], ephemeral: true })

        const report = inter.options.getString('your-report');

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${client.user.username} Reports`, iconURL: inter.user.displayAvatarURL({ dynamic: true }) })
            .addField(`Report sent by:`, `${inter.user} (${inter.user.tag})`)
            .addField(`Report by:`, `${report}`)
            .setColor(db.get(`color_${inter.guildId}`))
            .setThumbnail(inter.guild.iconURL({ dynamic: true }))
        await channel.send({ embeds: [embed], fetchReply: true }).then((m) => {

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`Your report has been posted successfully! Click [here](https://discord.com/channels/${inter.guildId}/${channel.id}/${m.id}) to view your report!`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Report Posted!', iconURL: inter.guild.iconURL({ dynamic: true }) })
            inter.reply({ embeds: [succesEmbed], ephemeral: true })
            
        })

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
    name: 'report'
}