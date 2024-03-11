const Discord = require('discord.js');
const db = require('quick.db');
const { Permissions } = require('discord.js');

module.exports.run = async (client, inter) => {

    db.set(`color_${inter.guildId}`, '3d58ff')
    db.set(`footer_${inter.guildId}`, `${new Date().getFullYear()} © ${client.user.username}`)
    db.set(`prefix_${inter.guildId}`, '!')
    db.set(`status`, inter.guild.name)
    db.set(`setup_${inter.guildId}.value`, true)

    const option = inter.options.getString('language-selector')
    db.set(`lang_${inter.guildId}`, `${option}`)

    if(option === 'NL'){
        const succesEmbed = new Discord.MessageEmbed()
            .setDescription(`Je bot is succesvol ingesteld, de bot zal reageren in het Nederlands!\nIndien je dit wilt aanpassen kan je opnieuw \`/setup\` typen!`)
            .setColor(client.config.colors.positive)
            .setAuthor({ name: 'Bot Ingesteld!', iconURL: inter.guild.iconURL({ dynamic: true }) })
        await inter.reply({ embeds: [succesEmbed], ephemeral: true })
    } else if(option === 'ENG'){
        const succesEmbed = new Discord.MessageEmbed()
            .setDescription(`Your bot has been set up successfully, the bot will respond in English!\nIf you want to change this you can type \`/setup\` again!`)
            .setColor(client.config.colors.positive)
            .setAuthor({ name: 'Bot Setup!', iconURL: inter.guild.iconURL({ dynamic: true }) })
        await inter.reply({ embeds: [succesEmbed], ephemeral: true })
    }
    
}


module.exports.help = {
    name: 'setup'
}