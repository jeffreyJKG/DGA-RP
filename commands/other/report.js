const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'report',
    usage: 'report [text]',
    description: 'Submit a bug report about the server.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)
    
        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            const noChannel = new Discord.MessageEmbed()
                .setDescription(`Er is geen report kanaal bekend voor deze server!\nJe kan deze instellen via: \`/config other report-channel\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const channel = message.guild.channels.cache.find(x => x.id === db.get(`reportChannel_${message.guild.id}`))
            if(channel === undefined) return await message.channel.send({ embeds: [noChannel] })
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Je bent vergeten tekst in te voeren\nProbeer het opnieuw: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const report = args.join(" "); if(!report) return await message.channel.send({ embeds: [missingArgs] })
    
            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Reports`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Report verzonden door:`, `${message.author} (${message.author.tag})`)
                .addField(`Ingediende report:`, `${report}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await channel.send({ embeds: [embed], fetchReply: true }).then(async m => {
    
                const succesEmbed = new Discord.MessageEmbed()
                    .setDescription(`Je report is succesvol geplaatst! Klik [hier](https://discord.com/channels/${message.guild.id}/${channel.id}/${m.id}) om je report te bekijken!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Report Geplaatst!', iconURL: message.guild.iconURL({ dynamic: true }) })
                const msg = await message.channel.send({ embeds: [succesEmbed] }); setTimeout(() => { msg.delete().catch(e => {}); }, 5000); return

            })
    
        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
    
            const noChannel = new Discord.MessageEmbed()
                .setDescription(`There is no known report channel for this server!\nYou can set it via: \`/config other report-channel\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const channel = message.guild.channels.cache.find(x => x.id === db.get(`reportChannel_${message.guild.id}`))
            if(channel === undefined) return await message.channel.send({ embeds: [noChannel] })
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`You forgot to enter text\nPlease try again: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const report = args.join(" "); if(!report) return await message.channel.send({ embeds: [missingArgs] })
    
            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Reports`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Report sent by:`, `${message.author} (${message.author.tag})`)
                .addField(`Report by:`, `${report}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await channel.send({ embeds: [embed], fetchReply: true }).then(async m => {
    
                const succesEmbed = new Discord.MessageEmbed()
                    .setDescription(`Your report has been posted successfully! Click [here](https://discord.com/channels/${message.guild.id}/${channel.id}/${m.id}) to view your report!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Report Posted!', iconURL: message.guild.iconURL({ dynamic: true }) })
                const msg = await message.channel.send({ embeds: [succesEmbed] }); setTimeout(() => { msg.delete().catch(e => {}); }, 5000); return

            })
    
        } else {
            const noLang = new Discord.MessageEmbed()
                .setDescription(`There is no known language in our database for this server! :boom:
    Use the command: \`/setup\` to start setting up your bot!
    
    If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true })})
                .setColor(client.config.colors.negative)
            return await message.channel.send({ embeds: [noLang] }).catch(e => {});
        }

    }
    
}

module.exports.help = {
    name: 'report',
    aliases: ['bugreport']
}