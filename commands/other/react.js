const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'react',
    usage: 'react <@role> [text]',
    description: 'Create a react role!',
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
                .setDescription(`Je bent vergeten enkele informatie in te voeren!\nGebruik: \`${prefix}react <@role> [bericht]\``)
                .setColor(db.get(`color_${message.guild.id}`))
                .setAuthor({ name: 'Ontbrekende Argumenten', iconURL: message.guild.iconURL({ dynamic: true })})

            const role = message.mentions.roles.first();
            if(role === undefined || !role) {
                const fail = await message.channel.send({ embeds: [missingArgs] }).catch(e => {}); setTimeout(() => {fail.delete().catch(e => {})}, 5000); return
            }
            const msg = args.slice(1).join(" ") || `Klik op de knoppen onder dit bericht om de ${role} te ontvangen of verwijderen!`

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(msg)
                .setColor(db.get(`color_${message.guild.id}`))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('add-role')
                        .setLabel('Voeg de rol toe!')
                        .setStyle('SUCCESS'),
                    new Discord.MessageButton()
                        .setCustomId('remove-role')
                        .setLabel('Verwijderd de rol!')
                        .setStyle('DANGER')
                )

            const react = await message.channel.send({ embeds: [succesEmbed], components: [row] }).catch(e => {});
                db.set(`react_${react.id}`, role.id)

        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){

            if(!message.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: message.guild.iconURL({ dynamic: true })})
                const fail = await message.channel.send({ embeds: [noPerms] }).catch((e) => {console.log(e)}); setTimeout(() => {fail.delete().catch(e => {})}, 5000); return
            }

            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`You forgot to enter some information!\nUse: \`${prefix}react <@role> [message]\``)
                .setColor(db.get(`color_${message.guild.id}`))
                .setAuthor({ name: 'Missing Arguments', iconURL: message.guild.iconURL({ dynamic: true })})

            const role = message.mentions.roles.first();
            if(role === undefined || !role) {
                const fail = await message.channel.send({ embeds: [missingArgs] }).catch(e => {}); setTimeout(() => {fail.delete().catch(e => {})}, 5000); return
            }
            const msg = args.slice(1).join(" ") || `Click the buttons below this message to receive or remove the ${role}!`

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(msg)
                .setColor(db.get(`color_${message.guild.id}`))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('add-role')
                        .setLabel('Add the role!')
                        .setStyle('SUCCESS'),
                    new Discord.MessageButton()
                        .setCustomId('remove-role')
                        .setLabel('Remove the role!')
                        .setStyle('DANGER')
                )

            const react = await message.channel.send({ embeds: [succesEmbed], components: [row] }).catch(e => {});
                db.set(`react_${react.id}`, role.id)

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
    name: 'react',
    aliases: ['rr', 'reactrole']
}