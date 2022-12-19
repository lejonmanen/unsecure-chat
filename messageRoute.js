import { Router } from 'express'
const router = Router()
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'messages.json')

const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()
if( !db.data ) {
	db.data = []
	await db.write()
}

router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data)
})
router.get('/:channel', async (req, res) => {
	const channel = req.params.channel
	await db.read()
	const result = db.data.filter(message => message.channel === channel)
	res.send(result)
})

router.post('/', async (req, res) => {
	res.sendStatus(400)
})
router.post('/:channel', async (req, res) => {
	const channel = req.params.channel
	const message = req.body
	message.timeSent = (new Date()).toISOString()
	message.channel = channel
	db.data.push(message)
	await db.write()
	res.sendStatus(200)
})

function validateMessage(maybeMessage) {
	if( !maybeMessage.userId ) return false
	if( !maybeMessage.userAlias ) return false
	if( !maybeMessage.message ) return false
	// if( !maybeMessage.userAlias ) return false
	// if( !maybeMessage.userAlias ) return false
	return true
}

export default router
