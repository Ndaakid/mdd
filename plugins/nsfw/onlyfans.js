import { pickRandom } from '../../lib/func.js'

let handler = async (m, { conn, usedPrefix, command }) => {
		let res = await fetch(`https://raw.githubusercontent.com/Ndaakid/Databasee/main/nsfw/onlyfans.json`)
		let anu = pickRandom(await res.json())
        await conn.sendFile(m.chat, anu, null, null, m)
	}

handler.menunsfw = ['onlyfans']
handler.tagsnsfw = ['randompic']
handler.command = /^(onlyfans)$/i

handler.premium = true
handler.limit = true
handler.nsfw = true

export default handler