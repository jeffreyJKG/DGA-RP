const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('ms');

module.exports = {
    name: 'clear',
    usage: 'clear <amount>',
    description: 'Delete some messages from the Discord.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)

        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: message.guild.iconURL({ dynamic: true })})
                await message.channel.send({ embeds: [noPerms] }).catch(e => {}); return
            }
    
            const wrongNumber = new Discord.MessageEmbed()
                .setDescription(`Je hebt een verkeerd getal ingevoerd.\nHet aantal berichten moet minimaal 1 zijn en maximaal 99!`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Je bent vergeten een getal in te voeren!\nProbeer het opnieuw: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const amount = args[0]; if(!amount) return await message.channel.send({ embeds: [missingArgs] })
            if(!Number(amount)) return await message.channel.send({ embeds: [missingArgs], ephemeral: true }).catch(e => {});
            if(amount > 99 || amount < 1) return await message.channel.send({ embeds: [wrongNumber], ephemeral: true }).catch(e => {});
    
            message.channel.bulkDelete(amount, true).catch(e => {});
    
            const succesEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: `Berichten Verwijderd`, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setDescription(`\`${amount}\` berichten zijn verwijderd! (${message.channel})`)
                .setColor(db.get(`color_${message.guild.id}`))
            await message.channel.send({ embeds: [succesEmbed] }).catch(e => {});
    
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
    
            const wrongNumber = new Discord.MessageEmbed()
                .setDescription(`You entered the wrong number.\nThe number of messages must be at least 1 and at most 99!`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`You forgot to enter a number!\nTry again: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
    
            const amount = args[0]; if(!amount) return await message.channel.send({ embeds: [missingArgs] })
            if(!Number(amount)) return await message.channel.send({ embeds: [missingArgs], ephemeral: true }).catch(e => {});
            if(amount > 99 || amount < 1) return await message.channel.send({ embeds: [wrongNumber], ephemeral: true }).catch(e => {});
    
            message.channel.bulkDelete(amount, true).catch(e => {});
    
            const succesEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: `Messages Deleted`, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setDescription(`\`${amount}\` messages have been deleted! (${message.channel})`)
                .setColor(db.get(`color_${message.guild.id}`))
            await message.channel.send({ embeds: [succesEmbed] }).catch(e => {});
    
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
    name: 'clear',
    aliases: []
}