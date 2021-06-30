<template>
  <div class="goal-component">
    <div class="col">
      <div class="card">
        <h2>{{ goalProp.title }}</h2>
        <!-- <h5>{{ goalProp.body }}</h5> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
// import { goalsService } from '../services/GoalsService'

export default {
  name: 'GoalComponent',
  props: {
    goalProp: { type: Object, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)

    }
  }
}
</script>
