const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

module.exports = {
    name: 'timeout',
    usage: 'timeout <@user> <length> [reason]',
    description: 'Timeout a user in your Discord.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)

        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameles!`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: message.guild.iconURL({ dynamic: true })})
                await message.channel.send({ embeds: [noPerms] }).catch(e => {}); return
            }
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Er ging iets fout met het uitvoeren van het commando!\nProbeer het opnieuw: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const notANumber = new Discord.MessageEmbed()
                .setDescription(`De ingevoerde lengte voor de van is niet geldig!\nGebruik: \`1y, 1d, 1h, 1m of 1s\`, je kan de nummers aanpassen!`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const user = message.mentions.members.first(); if(!user) return await message.channel.send({ embeds: [missingArgs] })
            const time = args[1]; if(!Number(ms(time))) return await message.channel.send({ embeds: [notANumber], ephemeral: true })
            const reason = args.slice(2).join(" ") || 'Er is geen reden opgegeven.'
    
            const succesEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: 'Gebruiker Getimedout', iconURL: message.guild.iconURL({ dynamic: true }) })
                .setDescription(`Speler **${user.user.tag}** succesvol getimedout!\nZie informatie over de timeout onder dit bericht.\n\n**Ingevoerde informatie:**\n> Gebruiker: \`${user.user.tag}\`\n> Getimedout door: ${inter.user}\n> Reden: ${reason}\n> Lengte: ${ms(ms(time))}`)
                .setColor(db.get(`color_${message.guild.id}`))
    
            await message.channel.send({ embeds: [succesEmbed] }).catch(e => {});
    
            user.timeout(ms(time), reason).catch(e => {});
    
            const logChannel = message.guild.channels.cache.find(x => x.id === db.get(`modLog_${message.guild.id}`))
            if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});
    
        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
    
            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: message.guild.iconURL({ dynamic: true })})
                await message.channel.send({ embeds: [noPerms] }).catch(e => {}); return
            }
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Something went wrong executing the command!\nTry again:\`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const notANumber = new Discord.MessageEmbed()
                .setDescription(`The length entered for the van is not valid!\nUse: \`1y, 1d, 1h, 1m or 1s\`, you can change the numbers!`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const user = message.mentions.members.first(); if(!user) return await message.channel.send({ embeds: [missingArgs] })
            const time = args[1]; if(!Number(ms(time))) return await message.channel.send({ embeds: [notANumber], ephemeral: true })
            const reason = args.slice(2).join(" ") || 'No reason was given.'
    
            const succesEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: 'User Timedout', iconURL: message.guild.iconURL({ dynamic: true }) })
                .setDescription(`Player **${user.user.tag}** successfully timedout!\nSee timeout information below this post.\n\n**Information entered:**\n> User: \`${user.user.tag}\`\n> Timed out by: ${inter.user}\n> Reason: ${reason}\n> Length: ${ms(ms(time))}`)
                .setColor(db.get(`color_${message.guild.id}`))
    
            await message.channel.send({ embeds: [succesEmbed] }).catch(e => {});
    
            user.timeout(ms(time), reason).catch(e => {});
    
            const logChannel = message.guild.channels.cache.find(x => x.id === db.get(`modLog_${message.guild.id}`))
            if(logChannel != undefined) logChannel.send({ embeds: [succesEmbed] }).catch(e => {});
    
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
    name: 'timeout',
    aliases: []
}