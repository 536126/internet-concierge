const errors = require('../utils/errors')

module.exports.run = async(bot, message, args, con)=>{
    group_name = args.join(" ")

    con.query(`SELECT * FROM grouped WHERE member_id = '${message.author.id}'`, (e, r)=>{
        if(e) throw(e)
        if(r.length === 0){
            message.channel.send('Je ziet nog niet in een groep')
        }
    })
}

module.exports.help ={
    name:"lg"
}

