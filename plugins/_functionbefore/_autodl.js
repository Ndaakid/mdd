import { tiktok } from 'betabotz-tools'
import db from '../../lib/database.js'

let handler = m => m

handler.before = async function (m, { isPrems }) {
    let chat = db.data.chats[m.chat]
    let user = db.data.users[m.sender]
    let set = db.data.settings[this.user.jid]
    if (m.chat.endsWith('broadcast')) return
    if (chat.isBanned || user.banned || !chat.game || m.isBaileys) return

    if (/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com/i.test(m.text)) {
        //let res = await fetch(API('amel', '/tiktok', { url: m.text.match(/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com\/.*/i)[0].split(/\n| /i)[0] }, 'apikey'))
        let json = await tiktokdl(m.text)
        await m.reply(`Prosess Download Kak~~`)
        await this.sendFile(m.chat, json.result.data.play, null, '© done gak bang?', m)
    }
    return !0
}
module.exports = handler