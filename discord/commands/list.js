const { DiscordAPIError} = require('discord.js');
const Discord = require('discord.js');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))

module.exports.run = async (client, message, args) => {
    let type = args[0];
    if (type === "cape") {
      let list = [];
      fs.readdirSync('./api/assets/capes').forEach(cape => {
        list.push(`+ ` + cape.slice(0, -4))
      })
      createEmbed('info', 'Cape List', `To preview a cape, use this command:\n`+"``!viewcape <cape>``" + '\n```diff\n' + list.join('\n') + '```', null, message)
    } else if (type === "item") {
      let list = [];
      fs.readdirSync('./api/assets/items').forEach(item => {
        list.push(`+ ${item}`)
      })
      createEmbed('info', 'Item List', `To preview an item, use this command:\n`+"``!viewitem <item>``" + '\n```diff\n' + list.join('\n') + '```', null, message)
    } else if (type === "mysetap") {
      let username = message.author.username
      let userid = message.author.id
      let userData = require('../../api/users.json');

    if (!userData.users[username] || !userData.users[username].cape) {
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Discord: **${username}\n**Username: **${userData.discordLink[userid]}\n**Cape: **None\n**Item: **None`)
      message.channel.send(embed)
    } else {
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Discord: **${username}\n**Username: **${userData.discordLink[userid]}\n**Cape: **${userData.users[username].cape} \n**Item: **${userData.users[username].item}`)
      message.channel.send(embed)
    }
    } else {
      createEmbed('info', 'List Command', `Command to list available cosmetics` + "\n\n**Usage**\n\n" +  "``!list <cape/item/mystaop>``", null, message)
    }
}

module.exports.help = {
  name:"list",
  action: "view a list of capes/items"
}