import express from "express"
import ejs from "ejs"
import http from "http"
import { wssWeb, wssOc } from "./websocket"
import { loggerServer as logger } from "./logger"
import { Config } from "./interface"

var Server = {
    init(config: Config) {
        const app = express()
        const server = http.createServer(app)

        server.on('upgrade', (request, socket, head) => {
            if (request.url === '/ws/web') {
                wssWeb.handleUpgrade(request, socket, head, (ws) => {
                    wssWeb.emit('connection', ws, request)
                })
            } else if (request.url === '/ws/oc') {
                wssOc.handleUpgrade(request, socket, head, (ws) => {
                    wssOc.emit('connection', ws, request)
                })
            } else {
                socket.destroy()
            }
        })

        app.get('/', (req, res) => {
            ejs.renderFile('views/index/index.ejs', {}, (err, str) => {
                if (err) {
                    logger.error(err)
                    res.sendStatus(500)
                }
                else {
                    res.send(str)
                }
            })
        })

        app.use(express.static('public'))

        server.listen(config.port, () => {
            logger.info(`Server started on port ${config.port}.`)
        })
    }
}

export default Server