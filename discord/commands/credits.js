const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"))
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Credits")
  .setURL("")
  .setColor('RAMDOM')
  .setDescription("Sistema desenvolvido pela equipe da [Supremo](https://discord.gg/QxzHetgjh3)")
  .setThumbnail("https://media.discordapp.net/attachments/796831755800936489/938242541780865044/PicsArt_02-01-10.20.26.png?width=427&height=427")
  message.channel.send(embed)
}

module.exports.help = {
  name:"credits",
  action: "view the credits"
}