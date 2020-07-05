import express from 'express'
import cors from 'cors'
import routes from './routes'

class App {
  public server: express.Application;

  constructor () {
    this.server = express()

    this.midlewares()
    this.routes()
  }

  private midlewares (): void {
    this.server.use(cors())
    this.server.use(express.json())
  }

  private routes (): void {
    this.server.use(routes)
  }
}

export default new App().server
