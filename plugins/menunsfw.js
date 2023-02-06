import db from '../lib/database.js'
import { plugins } from '../lib/plugins.js'
import { readMore, ranNumb, padLead } from '../lib/others.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagsnsfw = {
	'search': '🚀 *SEARCH*',
	'randompic': '✨ *RANDOM PIC*',
	'randommp4': '✨ *NSFWNIME MP4*',
}
const defaultMenu = {
	before: `
━ ━ *[ 🚫 NSFW SFX ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let chat = db.data.chats[m.chat]
		let meh = padLead(ranNumb(23), 3)
		let nais
		if (m.isGroup && !chat.nsfw) {
			nais = fs.readFileSync(`./media/picbot/nsfw/nsfwoff.jpg`)
		} else {
			nais = fs.readFileSync(`./media/picbot/nsfw/nsfw_${meh}.jpg`)
		}
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menunsfw = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menunsfw: Array.isArray(plugin.tagsnsfw) ? plugin.menunsfw : [plugin.menunsfw],
				tagsnsfw: Array.isArray(plugin.tagsnsfw) ? plugin.tagsnsfw : [plugin.tagsnsfw],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menunsfw)
			if (plugin && 'tagsnsfw' in plugin)
				for (let tag of plugin.tagsnsfw)
					if (!(tag in tagsnsfw) && tag) tagsnsfw[tag] = tag
		conn.nsfwmenu = conn.nsfwmenu ? conn.nsfwmenu : {}
		let before = conn.nsfwmenu.before || defaultMenu.before
		let header = conn.nsfwmenu.header || defaultMenu.header
		let body = conn.nsfwmenu.body || defaultMenu.body
		let footer = conn.nsfwmenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsnsfw).map(tag => {
				return header.replace(/%category/g, tagsnsfw[tag]) + '\n' + [
					...menunsfw.filter(nsfwmenu => nsfwmenu.tagsnsfw && nsfwmenu.tagsnsfw.includes(tag) && nsfwmenu.menunsfw).map(nsfwmenu => {
						return nsfwmenu.menunsfw.map(menunsfw => {
							return body.replace(/%cmd/g, nsfwmenu.prefix ? menunsfw : '%p' + menunsfw)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.nsfwmenu == 'string' ? conn.nsfwmenu : typeof conn.nsfwmenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		/*conn.sendHydrated(m.chat, text.replace(`<nuke_code>`, `<nuke_code>${readMore}`).trim(), pauthor, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
			['Premium', '/premium'],
			['Speed', '/ping'],
			['Owner', '/owner']
		], m, { asLocation:true })*/
		conn.sendButton(m.chat, text.replace(`<nuke_code>`, `<nuke_code>${readMore}`).trim(), pauthor, nais, [
			[`👥 Owner`, `.owner`],
			[`🪡 Ping`, `.ping`]
		], m, { asLocation: true })
	} catch (e) {
		throw e
	}
}

handler.help = ['menunsfw']
handler.tags = ['submenu']
handler.command = /^(nsfwm(enu)?|m(enu)?nsfw)$/i

export default handler