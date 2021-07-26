<template>
  <div class="home container-fluid">
    <Tracker-Component v-for="track in state.tracks" :key="track._id" :tracker-prop="track" />
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
      goals: computed(() => AppState.goals)
    })
    onMounted(async() => {
      try {
        await goalsService.getGoals()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state
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
