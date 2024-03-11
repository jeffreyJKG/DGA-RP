const Discord = require('discord.js');
const db = require('quick.db');

const { Captcha, CaptchaGenerator } = require('captcha-canvas');
const { writeFileSync } = require('fs');

module.exports = {
    name: 'verify',
    usage: 'verify',
    description: 'Verify your account in the Discord.',
    run: async (client, message, args, prefix) => {
        const wait = require('util').promisify(setTimeout);
        setTimeout(() => { message.delete().catch(e => {}) }, 500)

        const channel = message.guild.channels.cache.find(x => x.id === db.get(`verify_${message.guild.id}.channel`))
        const role = message.guild.roles.cache.find(x => x.id === db.get(`verify_${message.guild.id}.role`))

        if(channel === undefined) return
        if(db.get(`verify_${message.guild.id}.type`) != 'CAPTCHA') return
        if(message.channel.id != channel.id) return
        if(message.member.roles.cache.find(x => x.id === role.id)) return

        if(role === undefined) return console.log('Captcha is niet werkend omdat de rol niet geldig is.');

        const captcha = new CaptchaGenerator()
            .setDimension(150, 550) 
            .setDecoy({ total: 20 })
            .setCaptcha({ characters: 7, skew: false })
            .setTrace();
        const buffer = captcha.generateSync(); 

        writeFileSync('./assets/captcha.png', buffer); 

        const file = new Discord.MessageAttachment('./assets/captcha.png');

        if(db.get(`lang_${message.guild.id}`) === 'NL'){
            await wait(500);

            const welcomeEmbed = new Discord.MessageEmbed()
                .setDescription(`Hey ${message.author}, voordat je toegang krijgt tot de server zal je jezelf moeten verifiëren! Je kan jezelf verifiëren door in dit kanaal de **Capcha** te voltooien!\n\nStuur de groene letters van links naar rechts in dit kanaal. (Let op dit is hoofdletter gevoelig!)`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setAuthor({ name: 'Server Verificatie', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: db.get(`footer_${message.guild.id}`)})
                .setImage('attachment://captcha.png')
            const msg = await channel.send({ content: `${message.author}`, embeds: [welcomeEmbed], files: [file] }).catch(e => {});

            const failedCaptcha = new Discord.MessageEmbed()
                .setDescription(`Het is niet gelukt om je te verifieren! Dit kan meerdere redenen hebben! :boom:\n\nOf je hebt niet optijd gereageerd of de ingevoerde code kwam niet overeen met de door mij gestuurde code.\n\nJe kan dit opnieuw proberen door in ${channel} het commando: \`${prefix}verify\` te typen.`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Verificatie Mislukt', iconURL: message.guild.iconURL({ dynamic: true }) })

            const tempuser = message.author.id

            const filter = (message) => {
                if(message.author.id != tempuser) return
                if(message.content === captcha.text) return true;
                else {
                    msg.delete().catch(e => {}); 
                    channel.send({ content: `${message.author}`, embeds: [failedCaptcha] }).catch(e => {}).then(async m => {
                        setTimeout(() => { m.delete().catch(async e => {}) }, 20000) 
                        setTimeout(() => { message.delete().catch(e => {}) }, 500)
                    })
                }
            };

            try {
                const response = await msg.channel.awaitMessages({filter, max: 1, time: 999999999, errors: [""]})
                    if(response){
                        message.member.roles.add(role).catch(e => {});
                        setTimeout(() => { msg.delete().catch(e => {}) }, 500)
                    }
            } catch (err) { const fail = await channel.send({ embeds: [failedCaptcha] }); setTimeout(() => {fail.delete()}, 20000) }

        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
            await wait(500);

            const welcomeEmbed = new Discord.MessageEmbed()
                .setDescription(`Hey ${message.author}, before you can access the server you will have to authenticate yourself! You can verify yourself by completing the **Capcha** in this channel!\n\nSend the green letters from left to right in this channel. (Note this is case sensitive!)`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setAuthor({ name: 'Server Verification', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: db.get(`footer_${message.guild.id}`)})
                .setImage('attachment://captcha.png')
            const msg = await channel.send({ content: `${message.author}`, embeds: [welcomeEmbed], files: [file] }).catch(e => {});

            const failedCaptcha = new Discord.MessageEmbed()
                .setDescription(`Failed to verify! This can be for several reasons! :boom:\n\nEither you did not respond in time or the code entered did not match the code I sent.\n\nYou can try this again by using \`${prefix}verify\`.`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Authentication Failed', iconURL: message.guild.iconURL({ dynamic: true }) })

            const tempuser = message.author.id

            const filter = (message) => {
                if(message.author.id != tempuser) return
                if(message.content === captcha.text) return true;
                else {
                    msg.delete().catch(e => {}); 
                    channel.send({ content: `${message.author}`, embeds: [failedCaptcha] }).catch(e => {}).then(async m => {
                        setTimeout(() => { m.delete().catch(async e => {}) }, 20000) 
                        setTimeout(() => { message.delete().catch(e => {}) }, 500)
                    })
                }
            };

            try {
                const response = await msg.channel.awaitMessages({filter, max: 1, time: 999999999, errors: [""]})
                    if(response){
                        message.member.roles.add(role).catch(e => {});
                        setTimeout(() => { msg.delete().catch(e => {}) }, 500)
                    }
            } catch (err) { const fail = await channel.send({ embeds: [failedCaptcha] }); setTimeout(() => {fail.delete()}, 20000) }

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
    name: 'verify',
    aliases: []
}