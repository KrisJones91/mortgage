import { dbContext } from '../db/DbContext'

class TrackersService {
  async getTracked(query = {}) {
    const track = await dbContext.Tracker.find(query).populate('creator')
    return track
  }
}

export const trackersService = new TrackersService()
