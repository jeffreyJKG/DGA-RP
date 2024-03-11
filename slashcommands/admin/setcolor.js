const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const color = inter.options.getString('newcolor');
        db.set(`color_${inter.guildId}`, color)

        const succesEmbed = new Discord.MessageEmbed()
            .setDescription('De kleuren van alle embeds zullen nu de kleur zijn van dit embed!\nEnkel succes of error tickets zullen nog andere kleuren hebben!')
            .setColor(color)
            .setAuthor({ name: 'Kleur Aangepast!', iconURL: inter.guild.iconURL({ dynamic: true }) })
        return await inter.reply({ embeds: [succesEmbed], ephemeral: true })

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
        }

        const color = inter.options.getString('newcolor');
        db.set(`color_${inter.guildId}`, color)

        const succesEmbed = new Discord.MessageEmbed()
            .setDescription('The colors of all embeds will now be the color of this embed!\nOnly success or error tickets will have other colors!')
            .setColor(color)
            .setAuthor({ name: 'Color Adjusted!', iconURL: inter.guild.iconURL({ dynamic: true }) })
        return await inter.reply({ embeds: [succesEmbed], ephemeral: true })

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
    name: 'setcolor'
}