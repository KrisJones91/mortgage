import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { trackerService } from '../services/TrackerService'

export class TrackerController extends BaseController {
  constructor() {
    super('api/tracker')
    this.router
      .get('/', this.getTracked)
      .get('/:id', this.getOneTrack)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createTrack)
      .put('/:id', this.editTrack)
      .delete('/:id', this.deleteTrack)
  }

  async getTracked(req, res, next) {
    try {
      res.send(await trackerService.getTracks({ track: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getOneTrack(req, res, next) {
    try {
      res.send(await trackerService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createTrack(req, res, next, track) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await trackerService.createGoal(track))
    } catch (error) {
      next(error)
    }
  }

  async editTrack(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await trackerService.editGoal(req.payment, req.name))
    } catch (error) {
      next(error)
    }
  }

  async deleteTrack(req, res, next) {
    try {
      await trackerService.deleteGoal(req.params.id, req.userInfo.email)
    } catch (error) {
      next(error)
    }
  }
}
