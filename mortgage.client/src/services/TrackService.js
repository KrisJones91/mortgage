import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TrackService {
  async getTracked() {
    try {
      const res = await api.get('api/tracker')
      AppState.tracks = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}
export const trackService = new TrackService()
