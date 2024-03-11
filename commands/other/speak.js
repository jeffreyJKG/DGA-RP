const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'speak',
    usage: 'speak [text]',
    description: 'Send an normal message through the bot.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)

        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: message.guild.iconURL({ dynamic: true })})
                const fail = await message.channel.send({ embeds: [noPerms] }).catch((e) => {console.log(e)}); setTimeout(() => {fail.delete().catch(e => {})}, 5000); return
            }

            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Je bent vergeten tekst voor het bericht in te voeren!\nProbeer het opnieuw: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const messageContent = args.join(" ")
            if(!messageContent) return await message.channel.send({ embeds: [missingArgs] })

            await message.channel.send({ content: `${messageContent}` });

        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){

            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: message.guild.iconURL({ dynamic: true })})
                const fail = await message.channel.send({ embeds: [noPerms] }).catch((e) => {console.log(e)}); setTimeout(() => {fail.delete().catch(e => {})}, 5000); return
            }

            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`You forgot to enter text for the message!\nTry again: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const messageContent = args.join(" ")
            if(!messageContent) return await message.channel.send({ embeds: [missingArgs] })

            await message.channel.send({ content: `${messageContent}` });

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
    name: 'speak',
    aliases: []
}