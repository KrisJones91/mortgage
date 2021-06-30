/* eslint-disable no-console */
import { AppState } from '../AppState'
import { api } from './AxiosService'

class GoalsService {
  async getGoals() {
    const res = await api.get('api/goals/')
    AppState.goals = res.data
  }

  async getOne(id) {
    const res = await api.get('api/goals/' + id)
    AppState.activeGoal = res.data
    console.log(AppState.activeGoal)
  }

  async createGoal(goal) {
    const res = await api.post('api/goals/', goal)
    AppState.goals.push(res.data)
    return res.data
  }

  async editGoal(id, newTitle, newBody) {
    const title = { title: newTitle }
    const body = { body: newBody }
    const res = await api.put('api/goals/' + id, title, body)
    console.log(res)
  }

  async deleteGoal(_id) {
    await api.delete('api/goals/' + _id)
    const goalIndex = AppState.goals.findIndex(g => g._id === _id)
    AppState.goals.splice(goalIndex, 1)
  }
}

export const goalsService = new GoalsService()
