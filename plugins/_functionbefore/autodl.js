import db from '../../lib/database.js'
import fs from 'fs'
import moment from 'moment-timezone'
import { tiktok } from 'betabotz-tools'

let handler = m => m

handler.all = async function (m) {

    let isBanned = db.data.chats[m.chat]
    let banned  = db.data.users[m.sender]
    let group = db.data.settings[this.user.jid]
    let setting = db.data.settings[this.user.jid]
    let user = db.data.users[m.sender]
  
    if (/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com/i.test(m.text)) {
    let json = await tiktok(m.text.match(/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com\/.*/i)[0].split(/\n| /i)[0])
    this.sendFile(m.chat, json.result.data.play, m)
    }
    }

    return !0
}

export default handler
