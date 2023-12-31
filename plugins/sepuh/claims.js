import db from '../../lib/database.js'

let handler = async (m, {conn, text, command, usedPrefix}) => {
 m.reply(`tes aja`)
}
handler.help = ['']
handler.tags = ['']
handler.command = /^()$/i

handler.sepuh = true

export default handler