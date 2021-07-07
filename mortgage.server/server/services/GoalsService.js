import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
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

  async deleteGoal(body, goal) {
    const Goal = await dbContext.Goal.findByIdAndDelete({ _id: body.id, creatorId: body.creatorId }, { goal })
    if (!Goal) {
      throw new BadRequest("Cannot delete what isn't there.")
    }
    logger.log(Goal)
    return 'Deleted Goal Successfully'
  }
}

export const goalsService = new GoalsService()
