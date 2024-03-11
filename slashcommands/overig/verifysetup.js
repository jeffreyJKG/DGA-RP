const Discord = require('discord.js');
const db = require('quick.db');
const { Permissions } = require('discord.js');

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch((e) => {console.log(e)}); return
        }

        const type = inter.options.getString('type');
        const channel = inter.options.getChannel('channel');
        const role = inter.options.getRole('role');

        db.set(`verify_${inter.guildId}`, { type: type, channel: channel.id, role: role.id, status: true })

        if(type.toLowerCase() === 'captcha'){

        channel.permissionOverwrites.set([
            {
                id: inter.guild.roles.everyone,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
                deny: [Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.CREATE_PUBLIC_THREADS, Permissions.FLAGS.CREATE_PRIVATE_THREADS]
            },
            {
                id: role.id,
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
            }
        ])

        channel.setRateLimitPerUser(30)

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`Het **Captcha Systeem** is succesvol opgezet!\nAlle gebruikers die deze server joinen hebben nu toestemming om dit kanaal te zien.\n\nZodra deze gebruiker zijn geverifieerd kunnen ze dit kanaal niet meer zien. Meer informatie is hieronder zichtbaar.`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Verificatie Ingesteld', iconURL: inter.guild.iconURL({ dynamic: true }) })
                .addField(`Extra Informatie:`, `> Verificatie kanaal: ${channel}\n> Type: \`${type}\`\n> Rol: ${role}`)
            return await inter.reply({ embeds: [succesEmbed], ephemeral: true })

        } else if(type.toLowerCase() === 'panel'){

            const embed = new Discord.MessageEmbed()
                .setDescription(`Welkom in de **${inter.guild.name}** Discord! Voordat je gebruik kunt maken van alle kanalen moet je de regels hebben gelezen en jezelf verifiëren!\n\nIndien je alle regels hebt gelezen ontvang je de ${role} rol!`)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: 'Server Verificatie', iconURL: inter.guild.iconURL({ dynamic: true }) })
            
            channel.permissionOverwrites.set([
                {
                    id: inter.guild.roles.everyone,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL],
                    deny: [Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.CREATE_PUBLIC_THREADS, Permissions.FLAGS.CREATE_PRIVATE_THREADS, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: role.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ])

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId(`verification_panel`)
                        .setStyle('SECONDARY')
                        .setLabel('Regels accepteren')               
                )

            channel.send({ embeds: [embed], components: [row] })

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`Het **Verificatie Paneel** is succesvol opgezet!\nAlle gebruikers die deze server joinen hebben nu toestemming om dit kanaal te zien.\n\nZodra deze gebruiker zijn geverifieerd kunnen ze dit kanaal niet meer zien. Meer informatie is hieronder zichtbaar.`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Verificatie Ingesteld', iconURL: inter.guild.iconURL({ dynamic: true }) })
                .addField(`Extra Informatie:`, `> Verificatie kanaal: ${channel}\n> Type: \`${type}\`\n> Rol: ${role}`)
            return await inter.reply({ embeds: [succesEmbed], ephemeral: true })

        }

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
            await inter.reply({ embeds: [noPerms] }).catch((e) => {console.log(e)}); return
        }

        const type = inter.options.getString('type');
        const channel = inter.options.getChannel('channel');
        const role = inter.options.getRole('role');

        db.set(`verify_${inter.guildId}`, { type: type, channel: channel.id, role: role.id, status: true })

        if(type.toLowerCase() === 'captcha'){

        channel.permissionOverwrites.set([
            {
                id: inter.guild.roles.everyone,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
                deny: [Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.CREATE_PUBLIC_THREADS, Permissions.FLAGS.CREATE_PRIVATE_THREADS]
            },
            {
                id: role.id,
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
            }
        ])

        channel.setRateLimitPerUser(30)

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`The **Captcha System** has been successfully set up!\nAll users who join this server are now allowed to view this channel.\n\nOnce this user is verified, they will no longer be able to view this channel. More information is visible below.`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Verification Set', iconURL: inter.guild.iconURL({ dynamic: true }) })
                .addField(`Extra information:`, `> Verification channel: ${channel}\n> Type: \`${type}\`\n> Role: ${role}`)
            return await inter.reply({ embeds: [succesEmbed], ephemeral: true })

        } else if(type.toLowerCase() === 'panel'){

            const embed = new Discord.MessageEmbed()
                .setDescription(`Welkom op de **${inter.guild.name}** Discord! Voordat je gebruik kunt maken van alle kanalen moet je de regels hebben gelezen en jezelf verifiëren!\n\nIndien je alle regels hebt gelezen ontvang je de ${role} rol! \n\n\n------------------------------------------------------------------------------------------\n\n\n Welcome to the **${inter.guild.name}** Discord! Before you can use our channels you have to read our rules and verify yourself.\n\nIf you have read all the rules you will receive the ${role} role!`)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: 'Server Authentication', iconURL: inter.guild.iconURL({ dynamic: true }) })
            
            channel.permissionOverwrites.set([
                {
                    id: inter.guild.roles.everyone,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL],
                    deny: [Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.CREATE_PUBLIC_THREADS, Permissions.FLAGS.CREATE_PRIVATE_THREADS, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: role.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ])

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId(`verification_panel`)
                        .setStyle('SECONDARY')
                        .setLabel('Accept rules')
                )

            channel.send({ embeds: [embed], components: [row] })

            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`The **Verification Panel** has been successfully set up!\nAll users who join this server are now allowed to view this channel.\n\nOnce this user is verified, they will no longer be able to view this channel. More information is visible below.`)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Authentication Set', iconURL: inter.guild.iconURL({ dynamic: true }) })
                .addField(`Extra Information:`, `> Verification channel: ${channel}\n> Type: \`${type}\`\n> Role: ${role}`)
            return await inter.reply({ embeds: [succesEmbed], ephemeral: true })

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
    name: 'verifysetup'
}