import db from '../../lib/database.js'
import fs from 'fs'
import moment from 'moment-timezone'

let handler = m => m

handler.all = async function (m) {
    if (m.chat.endsWith('status@broadcast')) {
        console.log('sw cok')
    }
    let isBanned = db.data.chats[m.chat]
    let banned  = db.data.users[m.sender]
    let group = db.data.settings[this.user.jid]
    let setting = db.data.settings[this.user.jid]
    let user = db.data.users[m.sender]
    
    // salam
    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`)
    }
    
    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.reply(m.chat, `┌「 *Undang Bot ke Grup* 」
├ 7 Hari / Rp 5,000
├ 30 Hari / Rp 15,000
└────
`.trim(), m)
    }
    
    if (/^bot$/i.test(m.text)) {
        await this.reply(m.chat, "aktif", m)
    }


    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            this.reply(global.mods[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            await this.sendMessage(mods[0] + '@s.whatsapp.net', { document: fs.readFileSync('./database.json'), fileName: 'database.json', mimetype: 'application/json' }, { quoted: m })
            setting.backupDB = new Date() * 1
        }
    }

    return !0
}

export default handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Selamat dinihari"
    if (time >= 4) {
        res = "Selamat pagi"
    }
    if (time > 10) {
        res = "Selamat siang"
    }
    if (time >= 15) {
        res = "Selamat sore"
    }
    if (time >= 18) {
        res = "Selamat malam"
    }
    return res
}

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
