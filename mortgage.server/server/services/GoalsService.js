import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from '../utils/Errors'

class GoalsService {
  async getGoals(query = {}) {
    return await dbContext.Goals.find(query).populate('creator')
  }

  async getOne(id) {
    const Goal = await dbContext.Goals.findById(id).populate('creator', 'name _id')
    if (!Goal) {
      throw new BadRequest('Sorry, no goal was found with that ID')
    }
    return Goal
  }

  async createGoal(body) {
    return await dbContext.Goals.create(body)
  }

  async editGoal(body, title) {
    const updated = await dbContext.Goals.findOneAndUpdate({ id: body.id, creatorId: body.creatorId }, body, title)
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
