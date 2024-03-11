const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, inter) => {

    const subcommand = inter.options.getSubcommand()
    if(subcommand.toLowerCase() === 'one'){

        if(db.get(`lang_${inter.guildId}`) === 'NL'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const channel = inter.channel
            const ticketMessage = 'Klik op een van de onderstaande knoppen om een ticket te openen. Lees de regels voordat je een ticket aanmaakt. \n\nOns team staat altijd klaar om je te helpen.'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                })

            await inter.reply({ content: 'Ticketpaneel is succesvol geplaatst.', ephemeral: true })

        } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const channel = inter.channel
            const ticketMessage = '**Welcome to our ticket support!**\nHere we can help you with your questions, or other things.\nWe have different categories so we can serve you as soon as possible. \n\n:money_with_wings:・Purchase\n・Question'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                })

            await inter.reply({ content: 'Ticketpanel has been successfully placed.', ephemeral: true })

        } else {
            const noLang = new Discord.MessageEmbed()
                .setDescription(`There is no known language in our database for this server! :boom:
    Use the command: \`/setup\` to start setting up your bot!

    If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
                .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})
                .setColor(client.config.colors.negative)
            return await inter.reply({ embeds: [noLang], ephemeral: true }).catch(e => {});
        }

    } else if(subcommand.toLowerCase() === 'two'){

        if(db.get(`lang_${inter.guildId}`) === 'NL'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const channel = inter.channel
            const ticketMessage = 'Klik op een van de onderstaande knoppen om een ticket te openen. Lees de regels voordat je een ticket aanmaakt. \n\nOns team staat altijd klaar om je te helpen.'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                    name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                })

            await inter.reply({ content: 'Ticketpaneel is succesvol geplaatst.', ephemeral: true })

        } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const channel = inter.channel
            const ticketMessage = '**Welcome to our ticket support!**\nHere we can help you with your questions, or other things.\nWe have different categories so we can serve you as soon as possible. \n\n:money_with_wings:・Purchase\n・Question'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                    name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                })

            await inter.reply({ content: 'Ticketpanel has been successfully placed.', ephemeral: true })

        } else {
            const noLang = new Discord.MessageEmbed()
                .setDescription(`There is no known language in our database for this server! :boom:
    Use the command: \`/setup\` to start setting up your bot!

    If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
                .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})
                .setColor(client.config.colors.negative)
            return await inter.reply({ embeds: [noLang], ephemeral: true }).catch(e => {});
        }

    } else if(subcommand.toLowerCase() === 'three'){

        if(db.get(`lang_${inter.guildId}`) === 'NL'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const name_option_three = inter.options.getString('name-option-three');
            const category_option_three = inter.options.getChannel('category-option-three');
            const role_option_three = inter.options.getRole('role-option-three');

            const channel = inter.channel
            const ticketMessage = 'Klik op een van de onderstaande knoppen om een ticket te openen. Lees de regels voordat je een ticket aanmaakt. \n\nOns team staat altijd klaar om je te helpen.'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_three')
                        .setLabel(name_option_three)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                    name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                    name_option_three: name_option_three, category_option_three: category_option_three.id, role_option_three: role_option_three.id,
                })

            await inter.reply({ content: 'Ticketpaneel is succesvol geplaatst.', ephemeral: true })

        } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const name_option_three = inter.options.getString('name-option-three');
            const category_option_three = inter.options.getChannel('category-option-three');
            const role_option_three = inter.options.getRole('role-option-three');

            const channel = inter.channel
            const ticketMessage = '**Welcome to our ticket support!**\nHere we can help you with your questions, or other things.\nWe have different categories so we can serve you as soon as possible.\n\n:money_with_wings:・Purchase\n:red_square:・Problem?\n・Question'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_three')
                        .setLabel(name_option_three)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
            db.set(`ticketAdvanced_${msg.id}`, { 
                name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                name_option_three: name_option_three, category_option_three: category_option_three.id, role_option_three: role_option_three.id,
            })
                
            await inter.reply({ content: 'Ticketpanel has been successfully placed.', ephemeral: true })

        } else {
            const noLang = new Discord.MessageEmbed()
                .setDescription(`There is no known language in our database for this server! :boom:
    Use the command: \`/setup\` to start setting up your bot!

    If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
                .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})
                .setColor(client.config.colors.negative)
            return await inter.reply({ embeds: [noLang], ephemeral: true }).catch(e => {});
        }

    } else if(subcommand.toLowerCase() === 'four'){

        if(db.get(`lang_${inter.guildId}`) === 'NL'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const name_option_three = inter.options.getString('name-option-three');
            const category_option_three = inter.options.getChannel('category-option-three');
            const role_option_three = inter.options.getRole('role-option-three');

            const name_option_four = inter.options.getString('name-option-four');
            const category_option_four = inter.options.getChannel('category-option-four');
            const role_option_four = inter.options.getRole('role-option-four');

            const channel = inter.channel
            const ticketMessage = 'Klik op een van de onderstaande knoppen om een ticket te openen. Lees de regels voordat je een ticket aanmaakt. \n\nOns team staat altijd klaar om je te helpen.'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_three')
                        .setLabel(name_option_three)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_four')
                        .setLabel(name_option_four)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                    name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                    name_option_three: name_option_three, category_option_three: category_option_three.id, role_option_three: role_option_three.id,
                    name_option_four: name_option_four, category_option_four: category_option_four.id, role_option_four: role_option_four.id,
                })

            await inter.reply({ content: 'Ticketpaneel is succesvol geplaatst.', ephemeral: true })

        } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const name_option_three = inter.options.getString('name-option-three');
            const category_option_three = inter.options.getChannel('category-option-three');
            const role_option_three = inter.options.getRole('role-option-three');

            const name_option_four = inter.options.getString('name-option-four');
            const category_option_four = inter.options.getChannel('category-option-four');
            const role_option_four = inter.options.getRole('role-option-four');

            const channel = inter.channel
            const ticketMessage = '**Welcome to our ticket support!**\nHere we can help you with your questions, or other things.\nWe have different categories so we can serve you as soon as possible. \n\n:money_with_wings:・Purchase\n:red_square:・Problem?\n・Question'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_three')
                        .setLabel(name_option_three)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_four')
                        .setLabel(name_option_four)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                    name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                    name_option_three: name_option_three, category_option_three: category_option_three.id, role_option_three: role_option_three.id,
                    name_option_four: name_option_four, category_option_four: category_option_four.id, role_option_four: role_option_four.id,
                })
                
            await inter.reply({ content: 'Ticketpanel has been successfully placed.', ephemeral: true })

        } else {
            const noLang = new Discord.MessageEmbed()
                .setDescription(`There is no known language in our database for this server! :boom:
    Use the command: \`/setup\` to start setting up your bot!

    If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
                .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})
                .setColor(client.config.colors.negative)
            return await inter.reply({ embeds: [noLang], ephemeral: true }).catch(e => {});
        }

    } else if(subcommand.toLowerCase() === 'five'){

        if(db.get(`lang_${inter.guildId}`) === 'NL'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const name_option_three = inter.options.getString('name-option-three');
            const category_option_three = inter.options.getChannel('category-option-three');
            const role_option_three = inter.options.getRole('role-option-three');

            const name_option_four = inter.options.getString('name-option-four');
            const category_option_four = inter.options.getChannel('category-option-four');
            const role_option_four = inter.options.getRole('role-option-four');

            const name_option_five = inter.options.getString('name-option-five');
            const category_option_five = inter.options.getChannel('category-option-five');
            const role_option_five = inter.options.getRole('role-option-five');

            const channel = inter.channel
            const ticketMessage = 'Klik op een van de onderstaande knoppen om een ticket te openen. Lees de regels voordat je een ticket aanmaakt. \n\nOns team staat altijd klaar om je te helpen.'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_three')
                        .setLabel(name_option_three)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_four')
                        .setLabel(name_option_four)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_five')
                        .setLabel(name_option_five)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] });
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                    name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                    name_option_three: name_option_three, category_option_three: category_option_three.id, role_option_three: role_option_three.id,
                    name_option_four: name_option_four, category_option_four: category_option_four.id, role_option_four: role_option_four.id,
                    name_option_five: name_option_five, category_option_five: category_option_five.id, role_option_five: role_option_five.id,
                })

            await inter.reply({ content: 'Ticketpaneel is succesvol geplaatst.', ephemeral: true })

        } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

            if(!inter.member.permissions.has('ADMINISTRATOR')){
                const noPerms = new Discord.MessageEmbed()
                    .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
                await inter.reply({ embeds: [noPerms] }).catch(e => {}); return
            }

            const name_option_one = inter.options.getString('name-option-one');
            const category_option_one = inter.options.getChannel('category-option-one');
            const role_option_one = inter.options.getRole('role-option-one');

            const name_option_two = inter.options.getString('name-option-two');
            const category_option_two = inter.options.getChannel('category-option-two');
            const role_option_two = inter.options.getRole('role-option-two');

            const name_option_three = inter.options.getString('name-option-three');
            const category_option_three = inter.options.getChannel('category-option-three');
            const role_option_three = inter.options.getRole('role-option-three');

            const name_option_four = inter.options.getString('name-option-four');
            const category_option_four = inter.options.getChannel('category-option-four');
            const role_option_four = inter.options.getRole('role-option-four');

            const name_option_five = inter.options.getString('name-option-five');
            const category_option_five = inter.options.getChannel('category-option-five');
            const role_option_five = inter.options.getRole('role-option-five');

            const channel = inter.channel
            const ticketMessage = '**Welcome to our ticket support!**\nHere we can help you with your questions, or other things.\nWe have different categories so we can serve you as soon as possible. \n\n:money_with_wings:・Purchase\n:red_square:・Problem?\n・Question'

            const ticketPanel = new Discord.MessageEmbed()
                .setDescription(ticketMessage)
                .setColor(db.get(`color_${inter.guildId}`))
                .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL()})
                .setFooter({ text: db.get(`footer_${inter.guildId}`), iconURL: inter.guild.iconURL() })
                .setThumbnail(inter.guild.iconURL({ dynamic: true }))
            
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('advanced_one')
                        .setLabel(name_option_one)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_two')
                        .setLabel(name_option_two)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_three')
                        .setLabel(name_option_three)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_four')
                        .setLabel(name_option_four)
                        .setStyle('SECONDARY'),
                    new Discord.MessageButton()
                        .setCustomId('advanced_five')
                        .setLabel(name_option_five)
                        .setStyle('SECONDARY'),
                )

            const msg = await channel.send({ embeds: [ticketPanel], components: [row] }).catch(e => {console.log(e)})
                db.set(`ticketAdvanced_${msg.id}`, { 
                    name_option_one: name_option_one, category_option_one: category_option_one.id, role_option_one: role_option_one.id,
                    name_option_two: name_option_two, category_option_two: category_option_two.id, role_option_two: role_option_two.id,
                    name_option_three: name_option_three, category_option_three: category_option_three.id, role_option_three: role_option_three.id,
                    name_option_four: name_option_four, category_option_four: category_option_four.id, role_option_four: role_option_four.id,
                    name_option_five: name_option_five, category_option_five: category_option_five.id, role_option_five: role_option_five.id,
                })
                
            await inter.reply({ content: 'Ticketpanel has been successfully placed.', ephemeral: true })

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

}


module.exports.help = {
    name: 'ticketpanel'
}