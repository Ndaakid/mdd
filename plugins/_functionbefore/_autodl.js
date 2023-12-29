const { igdl, twitter, pin } = require('../lib/scrape')
const { ytIdRegex, servers, yta, ytv } = require('../lib/y2mate')
const fetch = require('node-fetch')

let handler = m => m

handler.before = async function (m, { isPrems }) {
    let chat = db.data.chats[m.chat]
    let user = db.data.users[m.sender]
    let set = db.data.settings[this.user.jid]
    if (m.chat.endsWith('broadcast')) return
    if (chat.isBanned || user.banned || !chat.download || m.isBaileys) return

    if (/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com/i.test(m.text)) {
        //let res = await fetch(API('amel', '/tiktok', { url: m.text.match(/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com\/.*/i)[0].split(/\n| /i)[0] }, 'apikey'))
        let res = await fetch(`https://api.akuari.my.id/downloader/tiktok?link=${m.text}`)
        if (!res.ok) return m.reply(eror)
        let json = await res.json()
        if (!json.status) return m.reply(this.format(json))
        await m.reply(`Prosess Download Kak~~`)
        await this.sendFile(m.chat, json, null, '© done gak bang?', m)
    }
    return !0
}
module.exports = handler