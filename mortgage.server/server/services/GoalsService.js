import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from '../utils/Errors'

class GoalsService {
  async getGoals(query = {}) {
    const goal = await dbContext.Goal.find(query).populate('creator')
    return goal
  }

  async getOne(id) {
    const goal = await dbContext.Goal.findById(id).populate('creator', 'name')
    if (!goal) {
      throw new BadRequest('Sorry, no goal was found with that ID')
    }
    return goal
  }

  async createGoal(body) {
    return await dbContext.Goal.create(body)
  }

  async editGoal(body, title) {
    const updated = await dbContext.Goal.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, title)
    if (!updated) {
      throw new BadRequest('Invalid Id')
    }
    return updated
  }

  async deleteGoal(id) {
    const goal = await this.getOne(id)
    // @ts-ignore
    if (goal.creatorId !== goal.creator.id) {
      throw new UnAuthorized('Cannot delete another persons goal')
    }
    return 'Deleted Goal Successfully'
  }
}

export const goalsService = new GoalsService()
