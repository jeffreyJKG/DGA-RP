const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'suggest',
    usage: 'suggest [text]',
    description: 'Send a suggestion for the server.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)
    
        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            const noChannel = new Discord.MessageEmbed()
                .setDescription(`Er is geen suggestie kanaal bekend voor deze server!\nJe kan deze instellen via: \`/config other suggest-channel\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const channel = message.guild.channels.cache.find(x => x.id === db.get(`suggestChannel_${message.guild.id}`))
            if(channel === undefined) return await message.channel.send({ embeds: [noChannel], ephemeral: true })
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Je bent vergeten tekst in te voeren\nProbeer het opnieuw: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const suggestion = args.join(" "); if(!suggestion) return await message.channel.send({ embeds: [missingArgs] })
    
            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Suggesties`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Suggestie verzonden door:`, `${message.author} (${message.author.tag})`)
                .addField(`Ingediende suggestie:`, `${suggestion}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await channel.send({ embeds: [embed], fetchReply: true }).then(async m => {
                m.react("👍")
                m.react("👎")
    
                const succesEmbed = new Discord.MessageEmbed()
                    .setDescription(`Je suggestie is succesvol geplaatst!\nKlik [hier](https://discord.com/channels/${message.guild.id}/${channel.id}/${m.id}) om je suggestie te bekijken en om te stemmen!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Suggestie Geplaatst!', iconURL: message.guild.iconURL({ dynamic: true }) })
                const msg = await message.channel.send({ embeds: [succesEmbed] }); setTimeout(() => { msg.delete().catch(e => {}); }, 5000); return
                
            })
    
        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
    
            const noChannel = new Discord.MessageEmbed()
                .setDescription(`There is no known suggestion channel for this server!\nYou can set it via: \`/config other suggest-channel\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const channel = message.guild.channels.cache.find(x => x.id === db.get(`suggestChannel_${message.guild.id}`))
            if(channel === undefined) return await message.channel.send({ embeds: [noChannel], ephemeral: true })
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`You forgot to enter text\nPlease try again: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const suggestion = args.join(" "); if(!suggestion) return await message.channel.send({ embeds: [missingArgs] })
    
            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Suggestions`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Suggestion sent by:`, `${message.author} (${message.author.tag})`)
                .addField(`Suggestion by:`, `${suggestion}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await channel.send({ embeds: [embed], fetchReply: true }).then(async m => {
                m.react("👍")
                m.react("👎")
    
                const succesEmbed = new Discord.MessageEmbed()
                    .setDescription(`Your suggestion has been posted successfully!\nClick [here](https://discord.com/channels/${message.guild.id}/${channel.id}/${m.id}) to view your suggestion and to to vote!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Suggestion Posted!', iconURL: message.guild.iconURL({ dynamic: true }) })
                const msg = await message.channel.send({ embeds: [succesEmbed] }); setTimeout(() => { msg.delete().catch(e => {}); }, 5000); return
                
            })
    
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
    name: 'suggest',
    aliases: ['suggestie', 'idee']
}
// Copyright [**Raytrix**](https://discord.gg/raytrix)