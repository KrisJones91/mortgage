import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { goalsService } from '../services/GoalsService'
export class GoalsController extends BaseController {
  constructor() {
    super('api/goals/')
    this.router
      .get('/', this.getGoals)
      .get('/:id', this.getOne)
      .post('/', this.createGoal)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:id', this.editGoal)
      .delete('/:id', this.deleteGoal)
  }

  async getGoals(req, res, next) {
    try {
      req.userInfo._id = req.body.creatorId
      const data = await goalsService.getGoals()
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await goalsService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createGoal(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await goalsService.createGoal(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editGoal(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await goalsService.editGoal(req.body, req.title))
    } catch (error) {
      next(error)
    }
  }

  async deleteGoal(req, res, next) {
    try {
      await goalsService.deleteGoal(req.params.id, req.userInfo.email)
    } catch (error) {
      next(error)
    }
  }
}
