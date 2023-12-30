import db from '../../lib/database.js'
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i
const cooldown = 86400000

let handler = async (m, { conn, text, isOwner }) => {
	let [_, code, expired] = text.match(linkRegex) || []
	if (!code) throw 'Link invalid'
	try {
		let res = await conn.groupAcceptInvite(code)
		m.reply(`Berhasil join grup ${res}`)
		}
	} catch (e) {
		console.log(e)
		m.reply(`Link expired / bot sudah di kick sebelumnya.`)
	}
}

handler.menuowner = ['join <chat.whatsapp.com>']
handler.tags = ['information']
handler.command = /^(join)$/i

handler.limit = true

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))
