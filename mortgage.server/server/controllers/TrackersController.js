import { trackersService } from '../services/TrackersService'
import BaseController from '../utils/BaseController'

export class TrackersController extends BaseController {
  constructor() {
    super('api/tracks')
    this.router
      .get('/', this.getTracks)
  }

  async getTracks(req, res, next) {
    try {
      res.send(await trackersService.getTracked({ tracks: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
