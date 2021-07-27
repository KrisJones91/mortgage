import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from '../utils/Errors'
class TrackerService {
  async getTracked(query = {}) {
    const track = await dbContext.Tracker.find(query).populate('creator')
    return track
  }

  async getOneTrack(id) {
    const Track = await dbContext.Tracker.findById(id).populate('creator', 'name _id')
    if (!Track) {
      throw new BadRequest('Sorry, no submission was found with that ID')
    }
    return Track
  }

  async createTrack(track) {
    return await dbContext.Tracker.create(track)
  }

  async editTrack(name, payment) {
    const updated = await dbContext.Goals.findOneAndUpdate({ id: name.id, creatorId: name.creatorId }, name, payment)
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

export const trackerService = new TrackerService()
