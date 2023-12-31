import db from '../../lib/database.js'

let handler = async (m, {conn, text, command, usedPrefix}) => {
 m.reply(`tes aja`)
}
handler.command = /^(tesaja)$/i

handler.sepuh = true

export default handler