const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(db.get(`ticketConfig_${inter.channelId}.approved`) != true){
            const notATicket = new Discord.MessageEmbed()
                .setDescription(`Je kan dit commando enkel gebruiker in een ticket!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })
            return await inter.reply({ embeds: [notATicket], ephemeral: true })
        }

        const user = inter.guild.members.cache.find(x => x.id === db.get(`ticketConfig_${inter.channelId}.creator`))
        if(user != undefined){

            const closeEmbed = new Discord.MessageEmbed()
                .setDescription(`Je staat op het punt om het ticket te sluiten!\nGeef bevestiging door op de knop te drukken onder dit bericht.`)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: 'Ticket Sluiten', iconURL: inter.guild.iconURL({ dynamic: true }) })

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-def')
                        .setStyle('DANGER')
                        .setEmoji('🔒')
                        .setLabel('Sluit Ticket'),
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-cancel')
                        .setStyle('SECONDARY')
                        .setEmoji('❌')
                        .setLabel('Annuleer Sluiten'),
                )

            return await inter.reply({ embeds: [closeEmbed], components: [row] })

        } else if(user === undefined){

            const closeEmbed = new Discord.MessageEmbed()
                .setDescription(`Je staat op het punt om het ticket te sluiten!\nGeef bevestiging door op de knop te drukken onder dit bericht.\n\nDe maker van deze ticket zit niet meer in deze Discord, het ticket zal bij sluiten gelijk worden verwijderd.`)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: 'Ticket Sluiten', iconURL: inter.guild.iconURL({ dynamic: true }) })

                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-def')
                        .setStyle('DANGER')
                        .setEmoji('🔒')
                        .setLabel('Sluit Ticket'),
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-cancel')
                        .setStyle('SECONDARY')
                        .setEmoji('❌')
                        .setLabel('Annuleer Sluiten'),
                )

            return await inter.reply({ embeds: [closeEmbed], components: [row] })

        }


    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(db.get(`ticketConfig_${inter.channelId}.approved`) != true){
            const notATicket = new Discord.MessageEmbed()
                .setDescription(`You can only use this command in a ticket!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })
            return await inter.reply({ embeds: [notATicket], ephemeral: true })
        }

        const user = inter.guild.members.cache.find(x => x.id === db.get(`ticketConfig_${inter.channelId}.creator`))
        if(user != undefined){

            const closeEmbed = new Discord.MessageEmbed()
                .setDescription(`You are about to close the ticket!\nConfirm by pressing the button below this message.`)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: 'Ticket Close', iconURL: inter.guild.iconURL({ dynamic: true }) })

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-def')
                        .setStyle('DANGER')
                        .setEmoji('🔒')
                        .setLabel('Close Ticket'),
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-cancel')
                        .setStyle('SECONDARY')
                        .setEmoji('❌')
                        .setLabel('Cancel Close'),
                )

            return await inter.reply({ embeds: [closeEmbed], components: [row] })

        } else if(user === undefined){

            const closeEmbed = new Discord.MessageEmbed()
                .setDescription(`You are about to close the ticket!\nConfirm by pressing the button below this message.\n\nThe creator of this ticket is no longer in this Discord, the ticket will be deleted immediately upon closing.`)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: 'Ticket Close', iconURL: inter.guild.iconURL({ dynamic: true }) })

                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-def')
                        .setStyle('DANGER')
                        .setEmoji('🔒')
                        .setLabel('Close Ticket'),
                    new Discord.MessageButton()
                        .setCustomId('close-ticket-cancel')
                        .setStyle('SECONDARY')
                        .setEmoji('❌')
                        .setLabel('Cancel Close'),
                )

            return await inter.reply({ embeds: [closeEmbed], components: [row] })

        }

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
    name: 'close'
}