const {RichEmbed} =  require ('discord.js')
const {prefix} = require('../botconfig')

module.exports.run = async (bot, message, args) =>{
    await message.delete().catch(O_o=>{});

    const a = message.guild.roles.get('687994607828467733'); // Moderator
    const b = message.guild.roles.get('687994568620113968'); // Administrator
    const c = message.guild.roles.get('687976061505765411'); // Developer

    const filter = (reaction, user) => ['🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;

    const embed = new RichEmbed()
        .setTitle('Beschikbare rollen')
        .setDescription(`
        
        🇦 ${a.toString()}
        🇧 ${b.toString()}
        🇨 ${c.toString()}
        `)
        .setColor(0xdd9323)
        .setFooter(`ID: ${message.author.id}`);
        
    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');

        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '🇦':
                    if (message.member.roles.has(a.id)) {
                        msg.delete(2000);
                        return message.channel.send('Makker, je hebt deze rol al.').then(m => m.delete(6000));
                    }
                    message.member.addRole(a).catch(err => {
                        console.log(err);
                        return message.channel.send(`Er ging iets fout toen ik je je aan deze rol wou toevoegen: **${err.message}**.`);
                    });
                    message.channel.send(`Je bent nu lid van **${a.name}**!`).then(m => m.delete(6000));
                    msg.delete();
                    break;
                case '🇧':
                    if (message.member.roles.has(b.id)) {
                        msg.delete(2000);
                        return message.channel.send('Makker, je hebt deze rol al').then(m => m.delete(6000));
                    }
                    message.member.addRole(b).catch(err => {
                        console.log(err);
                        return message.channel.send(`Er ging iets fout toen ik je je aan deze rol wou toevoegen: **${err.message}**.`);
                    });
                    message.channel.send(`Je bent nu lid van **${b.name}**!`).then(m => m.delete(6000));
                    msg.delete();
                    break;
                case '🇨':
                    if (message.member.roles.has(c.id)) {
                        msg.delete(2000);
                        return message.channel.send('Makker, je hebt deze rol al').then(m => m.delete(3000));
                    }
                    message.member.addRole(c).catch(err => {
                        console.log(err);
                        return message.channel.send(`Er ging iets fout toen ik je je aan deze rol wou toevoegen: **${err.message}**.`);
                    });
                    message.channel.send(`Je bent nu lid van **${c.name}**!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
            }
        }).catch(collected => {
            return message.channel.send(`I couldn't add you to this role!`);
        });

    });

};

exports.help = {
    name: 'rollen'
};