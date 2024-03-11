const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');


module.exports = {
    name: 'unban',
    usage: 'unban <user-id>',
    description: 'Remove a ban from a player in your Discord.',
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
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Je bent vergeten een gebruikers ID te vermelden!\nProbeer het opnieuw: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const user = message.mentions.members.first(); if(!user) return await message.channel.send({ embeds: [missingArgs] })
    
            const noNumber = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen geldig ID ingevoerd! Probeer dit opnieuw.`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
            if(!Number(user)) return await message.channel.send({ embeds: [noNumber], ephemeral: true }).catch(e => {});
    
            const succesEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: 'Gebruiker Geunbanned', iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`Speler \`${user}\` succesvol geunbanned!\nDeze gebruiker is geunbanned door: ${message.author}`)
            .setColor(db.get(`color_${message.guild.id}`))
    
            await message.channel.send({ embeds: [succesEmbed] }).catch(e => {});
    
            message.guild.members.unban(user.id).catch(e => {});
    
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
                .setDescription(`You forgot to mention a user!\nTry again: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const user = message.mentions.members.first(); if(!user) return await message.channel.send({ embeds: [missingArgs] })
    
            const noNumber = new Discord.MessageEmbed()
                .setDescription(`You have not entered a valid ID! Try this again.`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
            if(!Number(user)) return await message.channel.send({ embeds: [noNumber], ephemeral: true }).catch(e => {});
    
            const succesEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: 'User Unbanned', iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`Player \`${user}\` successfully unbanned!\nThis user has been unbanned by: ${message.author}`)
            .setColor(db.get(`color_${message.guild.id}`))
    
            await message.channel.send({ embeds: [succesEmbed] }).catch(e => {});
    
            message.guild.members.unban(user.id).catch(e => {});
    
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
    name: 'unban',
    aliases: []
}