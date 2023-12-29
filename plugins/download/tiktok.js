import { tiktok } from 'betabotz-tools'

let handler = async (m, { conn, text, usedPrefix, command, __dirname }) => {
	if (!text) throw `Example: ${usedPrefix + command} link tiktok`
    let json = await tiktok(text)
    conn.sendFile(m.chat, json.result.data.play, m)
}

handler.menudownload = ['tiktok <teks>','tt <url>']
handler.tagsdownload = ['search']
handler.command = /^(tiktok|tt)$/i

handler.premium = false
handler.limit = true

export default handler