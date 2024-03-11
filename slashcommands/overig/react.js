const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch((e) => {console.log(e)}); return
        }

        const role = inter.options.getRole('role')
        const msg = inter.options.getString('message') || `Klik op de knoppen onder dit bericht om de ${role} te ontvangen of verwijderen!`

        const succesEmbed = new Discord.MessageEmbed()
            .setDescription(msg)
            .setColor(db.get(`color_${inter.guildId}`))
        
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

        const message = await inter.channel.send({ embeds: [succesEmbed], components: [row] }).catch(e => {});
            db.set(`react_${message.id}`, role.id)

        const replyEmbed = new Discord.MessageEmbed()
            .setDescription(`De reactie rol voor de rol: ${role} is succesvol aangemaakt!`)
            .setColor(client.config.colors.positive)
            .setAuthor({ name: `Reactie Aangemaakt!`, iconURL: inter.guild.iconURL({ dynamic: true })})
        await inter.reply({ embeds: [replyEmbed], ephemeral: true })

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch((e) => {console.log(e)}); return
        }

        const role = inter.options.getRole('role')
        const msg = inter.options.getString('message') || `Click the buttons below this message to receive or remove the ${role}!`

        const succesEmbed = new Discord.MessageEmbed()
            .setDescription(msg)
            .setColor(db.get(`color_${inter.guildId}`))
        
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

        const message = await inter.channel.reply({ embeds: [succesEmbed], components: [row] }).catch(e => {});
            db.set(`react_${message.id}`, role.id)

        const replyEmbed = new Discord.MessageEmbed()
            .setDescription(`The react role for the role: ${role} was created successfully!`)
            .setColor(client.config.colors.positive)
            .setAuthor({ name: `React Created!`, iconURL: inter.guild.iconURL({ dynamic: true })})
        await inter.reply({ embeds: [replyEmbed], ephemeral: true })

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
    name: 'react'
}