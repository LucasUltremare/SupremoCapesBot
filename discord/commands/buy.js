const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    message.delete();
    const parentID = '932771612720263249'
    let guild = message.guild;
        
        message.guild.channels.create(`Buy-Whitelist${message.author.username}•${message.author.id}`,{
            type: 'text',
            parent: parentID,
            permissionOverwrites:[
                {
                    allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','EMBED_LINKS','ATTACH_FILES','SEND_MESSAGES'],
                    id: message.author.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: guild.id
                }
            ]

        }).then((channelc) => {
            const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`${message.author.username}`)
              .setImage('https://cdn.discordapp.com/attachments/796831755800936489/932789179249750026/frame.png')
              .setDescription('Caso tenha algum porblema aos tentar scaniar o QR Code, entre pelo [link](https://cdn.discordapp.com/attachments/796831755800936489/932789179249750026/frame.png)')
              .setFooter('Assim que concluir o pagamento, mande o comprovante no chat e aguarde a confirmação.')

            channelc.send(`<@${message.author.id}>`, embed)
        });
}

module.exports.help = {
    name:"buy",
    action: "Efetuar as combras das capas."
  }