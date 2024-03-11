const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, inter) => {
    
    if(db.get(`lang_${inter.guildId}`) === 'NL'){

        if(!inter.member.permissions.has('ADMINISTRATOR')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`Je hebt geen permissies voor dit commando!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Ontbrekende Permissies', iconURL: inter.guild.iconURL({ dynamic: true })})
            return await inter.reply({ embeds: [noPerms] }).catch(e => {});
        }
        
        const option = inter.options.getSubcommand()
        
            if(option.toLowerCase() === 'ticketrole'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`ticketRole_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor de ticket rol zijn gereset!\nJe kan dit opnieuw instellen via: \`/config tickets ticketrole\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const role = inter.options.getRole('role'); 

                    db.set(`ticketRole_${inter.guildId}`, role.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`De rol: ${role} zal nu worden toegevoegd aan alle tickets die worden geopend!`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Rol Geupdate', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'ticketcategory'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`ticketCategory_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor de ticket categorie zijn gereset!\nJe kan dit opnieuw instellen via: \`/config tickets ticketcategory\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const category = inter.options.getChannel('category'); 

                    db.set(`ticketCategory_${inter.guildId}`, category.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle tickets zouden nu worden geplaatst in de categorie: **${category}**`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Categorie Geupdate', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'ticketlog'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`ticketLog_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor het ticket log kanaal zijn gereset!\nJe kan dit opnieuw instellen via: \`/config tickets ticketlog\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel'); 

                    db.set(`ticketLog_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle ticket-logs zullen nu verschijnen in: ${channel}`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Ticket-log Geupdate', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'claim-option'){
                const option = inter.options.getString('option');

                    if(option === 'yes'){
                        db.set(`ticketClaim_${inter.guildId}`, true)

                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`Het is nu mogelijk om tickets te claimen!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Claim Geupdate', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

                    } else if(option === 'no'){
                        db.set(`ticketClaim_${inter.guildId}`, false)

                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`Het is nu niet meer mogelijk om tickets te claimen!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Claim Geupdate', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

                    }

            } else if(option.toLowerCase() === 'moderationlog'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`modLog_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor het moderatie log kanaal zijn gereset!\nJe kan dit opnieuw instellen via: \`/config moderation moderationlog\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`modLog_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle moderatie-logs zullen nu verschijnen in: ${channel}`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Moderatie-log Geupdate', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'suggest-channel'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`suggestChannel_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor het suggestie kanaal zijn gereset!\nJe kan dit opnieuw instellen via: \`/config other suggest-channel\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`suggestChannel_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle suggesties zullen nu verschijnen in: ${channel}\nAls je een bericht typt in ${channel} wordt die ook automatisch omgezet naar een suggestie.`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Suggesties Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'report-channel'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`reportChannel_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor het report kanaal zijn gereset!\nJe kan dit opnieuw instellen via: \`/config other report-channel\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`reportChannel_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle reports zullen nu verschijnen in: ${channel}\nAls je een bericht typt in ${channel} wordt die ook automatisch omgezet naar een report.`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Reports Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-channel'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`joinChannel_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor het join kanaal zijn gereset!\nJe kan dit opnieuw instellen via: \`/config join join-channel\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`joinChannel_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle join berichten zullen nu verschijnen in: ${channel}`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Join Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-role'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`joinRole_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor het join rol zijn gereset!\nJe kan dit opnieuw instellen via: \`/config join join-role\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const role = inter.options.getRole('role');

                    db.set(`joinRole_${inter.guildId}`, role.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle nieuwe gebruikers zullen nu de rol: ${role} krijgen!`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Join Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-rename'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`joinRename_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`De instellingen voor het join rename zijn gereset!\nJe kan dit opnieuw instellen via: \`/config join join-rename\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Instellingen Hersteld', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const name = inter.options.getString('name');

                    db.set(`joinRename_${inter.guildId}`, name)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle nieuwe gebruikers hun naam zal beginnen met: \`${name}\`\nVoorbeeld: **${name} ${inter.user.username}**`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Join Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'max-tickets'){

                const amount = inter.options.getString('amount');

                    db.set(`maxTickets_${inter.guildId}`, amount)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`Alle gebruikers kunnen nu maximaal: \`${amount}\` tickets openen!`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Tickets Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-counter'){

                const joinCounter = inter.options.getString('option');

                    if(joinCounter.toLowerCase() === 'true'){
                        db.set(`joinCounter_${inter.guildId}`, true)
                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`Je welkoms bericht zal vanaf nu weergeven hoeveel leden je hebt!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Join Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});
                    } else if(joinCounter.toLowerCase() === 'false'){
                        db.set(`joinCounter_${inter.guildId}`, false)
                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`Je welkoms bericht zal vanaf nu niet meer weergeven hoeveel leden je hebt!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Join Aangepast', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});
                    }

            }

    } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

        if(!inter.member.permissions.has('BAN_MEMBERS')){
            const noPerms = new Discord.MessageEmbed()
                .setDescription(`You do not have permissions for this command!\nIf this is an error please contact Nameles!`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Missing Permissions', iconURL: inter.guild.iconURL({ dynamic: true })})
            return await inter.reply({ embeds: [noPerms] }).catch(e => {});
        }

        const option = inter.options.getSubcommand()
        
            if(option.toLowerCase() === 'ticketrole'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`ticketRole_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the ticket role have been reset!\nYou can reset this via: \`/config tickets ticketrole\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const role = inter.options.getRole('role'); 

                    db.set(`ticketRole_${inter.guildId}`, role.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`The role: ${role} will now be added to all new tickets that are opened!`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Role Updated', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'ticketcategory'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`ticketCategory_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the ticket category have been reset!\nYou can reset this via: \`/config tickets ticketcategory\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const category = inter.options.getChannel('category'); 

                    db.set(`ticketCategory_${inter.guildId}`, category.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All new tickets will now be placed in the category: **${category}**`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Category Updated', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'ticketlog'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`ticketLog_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the ticket log have been reset!\nYou can reset this via: \`/config tickets ticketlog\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel'); 

                    db.set(`ticketLog_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All ticket-logs will now appear in: ${channel}`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Ticket-log Updated', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'claim-option'){
                const option = inter.options.getString('option');

                    if(option === 'yes'){
                        db.set(`ticketClaim_${inter.guildId}`, true)

                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`It is now possible to claim tickets!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Claim Updated', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

                    } else if(option === 'no'){
                        db.set(`ticketClaim_${inter.guildId}`, false)

                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`It is now no longer possible to claim tickets!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Claim Updated', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

                    }
            } else if(option.toLowerCase() === 'moderationlog'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`modLog_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the moderation log have been reset!\nYou can reset this via: \`/config moderation moderationlog\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`modLog_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All moderation logs will now appear in: ${channel}`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Moderation-log Updated', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'suggest-channel'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`suggestChannel_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the suggest channel have been reset!\nYou can reset this via: \`/config other suggest-channel\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`suggestChannel_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All suggestion will now appear in: ${channel}\nIf you type a message in ${channel}, it will also be automatically converted to a suggestion.`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Suggestions Adjusted', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'report-channel'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`reportChannel_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the report channel have been reset!\nYou can reset this via: \`/config other report-channel\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`reportChannel_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All reports will now appear in: ${channel}\nIf you type a message in ${channel}, it will also be automatically converted to a report.`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Reports Adjusted', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-channel'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`joinChannel_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the join channel have been reset!\nYou can reset this via: \`/config join join-channel\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const channel = inter.options.getChannel('channel');

                    db.set(`joinChannel_${inter.guildId}`, channel.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All join messages will now appear in: ${channel}`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Join Modified', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-role'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`joinRole_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the join role have been reset!\nYou can reset this via: \`/config join join-role\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const role = inter.options.getRole('role');

                    db.set(`joinRole_${inter.guildId}`, role.id)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All new users will now be given the role: ${role}!`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Join Modified', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-rename'){

                if(inter.options.getString('reset') === 'reset'){
                    db.delete(`joinRename_${inter.guildId}`)

                    const resetEmbed = new Discord.MessageEmbed()
                        .setDescription(`The settings for the join rename have been reset!\nYou can reset this via: \`/config join join-rename\``)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Settings Restored', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [resetEmbed], ephemeral: true })
                }

                const name = inter.options.getString('name');

                    db.set(`joinRename_${inter.guildId}`, name)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All new users their name will start with: \`${name}\`\nExample: **${name} ${inter.user.username}**`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Join Modified', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'max-tickets'){

                const amount = inter.options.getString('amount');

                    db.set(`maxTickets_${inter.guildId}`, amount)

                    const succesEmbed = new Discord.MessageEmbed()
                        .setDescription(`All users can now open up to: \`${amount}\` tickets!`)
                        .setColor(client.config.colors.positive)
                        .setAuthor({ name: 'Tickets Adjusted', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});

            } else if(option.toLowerCase() === 'join-counter'){

                const joinCounter = inter.options.getString('option');

                    if(joinCounter.toLowerCase() === 'true'){
                        db.set(`joinCounter_${inter.guildId}`, true)
                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`Your welcome message will now show how many members you have!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Join Modified', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});
                    } else if(joinCounter.toLowerCase() === 'false'){
                        db.set(`joinCounter_${inter.guildId}`, false)
                        const succesEmbed = new Discord.MessageEmbed()
                            .setDescription(`Your welcome message will no longer show how many members you have!`)
                            .setColor(client.config.colors.positive)
                            .setAuthor({ name: 'Join Modified', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.reply({ embeds: [succesEmbed], ephemeral: true }).catch(e => {});
                    }

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
    name: 'config'
}