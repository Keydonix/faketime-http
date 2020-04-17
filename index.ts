import * as Http from 'http'
import * as Url from 'url'
import * as fs from 'fs'
const Filesystem = fs.promises
import * as Process from 'process'

const faketimeFilePath = Process.env.FAKETIME_TIMESTAMP_FILE
if (faketimeFilePath === undefined || faketimeFilePath.length === 0) throw new Error(`FAKETIME_TIMESTAMP_FILE environment variable is required.`)

Http.createServer(async (request, response) => {
	try {
		const path = Url.parse(request.url!).pathname!.slice(1)
		const timestamp = new Date(Number.parseInt(path) * 1000)
		const year = timestamp.getUTCFullYear().toString()
		const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, '0')
		const day = timestamp.getUTCDate().toString().padStart(2, '0')
		const hour = timestamp.getUTCHours().toString().padStart(2, '0')
		const minute = timestamp.getUTCMinutes().toString().padStart(2, '0')
		const second = timestamp.getUTCSeconds().toString().padStart(2, '0')
		const timestampString = `${year}-${month}-${day} ${hour}:${minute}:${second}`
		await Filesystem.writeFile(faketimeFilePath, timestampString, { encoding: 'utf8' })
		response.writeHead(200)
		response.end()
	} catch (error) {
		response.writeHead(500)
		response.end(error.message)
	}
}).listen(80)

// process 1 doesn't exit by default on SIGINT in NodeJS, so we need an explicit SIGINT handler
Process.on('SIGINT', () => Process.exit(1))

console.log('Listening on port 80')
