<template>
  <div class="home container-fluid">
  </div>
</template>

<script>
import { computed, reactive, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { goalsService } from '../services/GoalsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      goals: computed(() => AppState.goals),
      newGoal: {}
    })
    onMounted(async() => {
      try {
        await goalsService.getGoals()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async createGoal() {
        try {
          await goalsService.createGoal(state.newGoal)
          state.newGoal = {}
          await goalsService.getGoals()
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
