const Discord = require('discord.js');
const db = require('quick.db')
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    usage: 'help [command]',
    description: 'Show all available commands!',
    run: async (client, message, args, prefix) => {

      setTimeout(() => { message.delete().catch(e => {}) }, 500)

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${prefix}${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new Discord.MessageEmbed()
        .setAuthor({ name: "📬 Need help? Here are all my commands."})
        .addFields(categories)
        .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information about a command. For example: \`${prefix}help ban\`.`)
        .setTimestamp()
        .addField(`ADMIN (Slash Command Only)`, `\`/setprefix\` \`/setcolor\` \`/setfooter\` \`/config\``)
        .setColor(db.get(`color_${message.guild.id}`));
      return message.channel.send({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new Discord.MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor(db.get(`color_${message.guild.id}`));
        return message.channel.send(embed);
      }

      const embed = new Discord.MessageEmbed()
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command.", true
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.usage}\``
            : `\`${prefix}${command.name}\``, true
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setColor(db.get(`color_${message.guild.id}`));
      return message.channel.send({ embeds: [embed] });
    }
  }
}

module.exports.help = {
    name: 'help',
    aliases: []
}