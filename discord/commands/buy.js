const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    message.delete();
    const parentID = '932771612720263249'
    const channel = client.channels.cache.find(ch => ch.name.includes(message.author.id))
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(`❌ Erro ${message.author.username}!`)
    .setThumbnail(message.author.avatarURL())
    .setDescription(`Canal ja existente, ${channel} você já pode ter acesso ao canel.`)
    .setFooter(`by ${message.guild.name} 🔥 | ID: ${message.author.id}`)


    if(client.channels.cache.find(ch => ch.name.includes(message.author.id))) return message.author.send(embed);
    
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
              .setColor("YELLOW")
              .setTitle(`💸 Faça sua compra ${message.author.username}!`)
              .setThumbnail(message.author.avatarURL())
              .setImage('https://cdn.discordapp.com/attachments/796831755800936489/932789179249750026/frame.png')
              .setDescription('Caso tenha algum porblema aos tentar scaniar o QR Code, entre pelo [link](https://cdn.discordapp.com/attachments/796831755800936489/932789179249750026/frame.png)\n\nAssim que concluir o pagamento, mande o comprovante no chat e aguarde a confirmação, mas caso queira cancelar digite ```cancelar``` e o canal será fechado.')
              .setFooter(`by ${message.guild.name} 🔥 | ID: ${message.author.id}`)

            channelc.send(`<@${message.author.id}>`, embed).then(msg => {
                let c2 = message.channel.createMessageCollector(x => x.author.id == message.author.id)
                c2.on('collect', cancelamento => {
                console.log(cancelamento)
            })
        });
        })
}

module.exports.help = {
    name:"buy",
    action: "Efetuar as combras das capas."
  }