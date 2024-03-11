const Discord = require('discord.js');
const db = require('quick.db');
const { Permissions } = require('discord.js');

module.exports.run = async (client, inter) => {

    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        const noChannel = new Discord.MessageEmbed()
            .setDescription(`Er is geen suggestie kanaal bekend voor deze server!\nJe kan deze instellen via: \`/config other suggest-channel\``)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        const channel = inter.guild.channels.cache.find(x => x.id === db.get(`suggestChannel_${inter.guildId}`))
        if(channel === undefined) return await inter.reply({ embeds: [noChannel], ephemeral: true })

        const suggestion = inter.options.getString('your-idea');

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${client.user.username} Suggesties`, iconURL: inter.user.displayAvatarURL({ dynamic: true }) })
            .addField(`Suggestie verzonden door:`, `${inter.user} (${inter.user.tag})`)
            .addField(`Ingediende suggestie:`, `${suggestion}`)
            .setColor(db.get(`color_${inter.guildId}`))
            .setThumbnail(inter.guild.iconURL({ dynamic: true }))
        await channel.send({ embeds: [embed], fetchReply: true }).then((m) => {
            m.react("👍")
            m.react("👎")

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`Je suggestie is succesvol geplaatst!\nKlik [hier](https://discord.com/channels/${inter.guildId}/${channel.id}/${m.id}) om je suggestie te bekijken en om te stemmen!`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Suggestie Geplaatst!', iconURL: inter.guild.iconURL({ dynamic: true }) })
            inter.reply({ embeds: [succesEmbed], ephemeral: true })
            
        })

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        const noChannel = new Discord.MessageEmbed()
            .setDescription(`There is no known suggestion channel for this server!\nYou can set it via: \`/config other suggest-channel\``)
            .setColor(client.config.colors.negative)
            .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })

        const channel = inter.guild.channels.cache.find(x => x.id === db.get(`suggestChannel_${inter.guildId}`))
        if(channel === undefined) return await inter.reply({ embeds: [noChannel], ephemeral: true })

        const suggestion = inter.options.getString('your-idea');

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${client.user.username} Suggestions`, iconURL: inter.user.displayAvatarURL({ dynamic: true }) })
            .addField(`Suggestion sent by:`, `${inter.user} (${inter.user.tag})`)
            .addField(`Suggestion by:`, `${suggestion}`)
            .setColor(db.get(`color_${inter.guildId}`))
            .setThumbnail(inter.guild.iconURL({ dynamic: true }))
        await channel.send({ embeds: [embed], fetchReply: true }).then((m) => {
            m.react("👍")
            m.react("👎")

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`Your suggestion has been posted successfully!\nClick [here](https://discord.com/channels/${inter.guildId}/${channel.id}/${m.id}) to view your suggestion and to to vote!`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Suggestion Posted!', iconURL: inter.guild.iconURL({ dynamic: true }) })
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
    name: 'suggest'
}