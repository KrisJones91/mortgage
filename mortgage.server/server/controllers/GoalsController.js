import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { goalsService } from '../services/GoalsService'
export class GoalsController extends BaseController {
  constructor() {
    super('api/goals')
    this.router
      .get('/', this.getGoals)
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createGoal)
      .put('/:id', this.editGoal)
      .delete('/:id', this.deleteGoal)
  }

  async getGoals(req, res, next) {
    try {
      res.send(await goalsService.getGoals({ goal: req.params.id }))
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
      const goal = await goalsService.createGoal(req.body)
      res.send(await goalsService.getOne(goal._id))
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
      const query = { id: req.params.id, creatorId: req.userInfo.id }
      res.send(await goalsService.deleteGoal(query))
      // res.send(await goalsService.deleteGoal(req.params.id, req.userInfo.email))
    } catch (error) {
      next(error)
    }
  }
}
