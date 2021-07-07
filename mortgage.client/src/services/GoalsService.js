/* eslint-disable no-console */
import { AppState } from '../AppState'
import { api } from './AxiosService'

class GoalsService {
  async getGoals() {
    try {
      const res = await api.get('api/goals')
      AppState.goals = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getOne(id) {
    try {
      const res = await api.get('api/goals/' + id)
      AppState.activeGoal = res.data
      console.log(AppState.activeGoal)
    } catch (error) {
      console.error(error)
    }
  }

  async createGoal(body) {
    const res = await api.post('api/goals', body)
    AppState.goals.push(res.data)
    return res.data.id
  }

  async editGoal(id, newTitle, newBody) {
    const title = { title: newTitle }
    const body = { body: newBody }
    const res = await api.put('api/goals/' + id, title, body)
    console.log(res)
  }

  async deleteGoal(id) {
    await api.delete('api/goals/' + id)
    const goalIndex = AppState.goals.findIndex(g => g.id === id)
    AppState.goals.splice(goalIndex, 1)
  }
}

export const goalsService = new GoalsService()
