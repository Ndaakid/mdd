import { openai } from 'betabotz-tools'
import { connect } from 'mongoose'

let handler = async (m, { conn, text, command, usedPrefix}) => {
    if (!text) return m.reply(`Contoh : ${usedPrefix + command} apa itu google?`)
    let json = await openai(text)
conn.reply(m.chat, json.result, m)
}
handler.help = ['ai'].map(v => v + ' <pertanyaan>')
handler.tags = ['entertainment']
handler.command = /^(ai|openai)$/i

handler.premium = true

export default handler