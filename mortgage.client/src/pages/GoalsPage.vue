<template>
  <div class="goals container-fluid">
    <div class="row justify-content-center">
      <h1 class="title mt-4">
        Goals
      </h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-4 text-center">
        <form type="submit" @submit.prevent="createGoal">
          <div class="form-group">
            <input type="text"
                   class="form-control m-1 in-one"
                   id="title"
                   v-model="state.newGoal.title"
                   placeholder="Title..."
                   required
            >
            <textarea type="text"
                      class="form-control m-1 "
                      id="body"
                      v-model="state.newGoal.body"
                      placeholder="Description..."
                      required
            />
            <button type="submit" class="btn btn-outline-dark mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col card m-5">
        <GoalComponent v-for="goal in state.goals" :key="goal._id" :goal-prop="goal" />
      </div>
    </div>
    <!-- <div class="card mb-5 pb-3 pt-3"> -->
    <!-- <GoalComponent v-for="goal in state.goals" :key="goal._id" :goal-prop="goal" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { reactive, computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import { goalsService } from '../services/GoalsService'
// import { useRouter } from 'vue-router'
import GoalComponent from '../components/GoalComponent'

export default {
  name: 'GoalsPage',
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
          // await goalsService.createGoal(state.newGoal)
          // state.newGoal = {}
          // await goalsService.getGoals()
          // logger.log(state.newGoal)
          await goalsService.createGoal(state.newGoal)
          logger.log(state.newGoal)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {
    GoalComponent
  }
}
</script>
<style scoped>
.title{
  font-family: 'Poppins', sans-serif;
  color: #42dec0;
  text-shadow: 2px 5px 8px gray;
  -webkit-text-stroke: #6c0f98 1.7px;
}
.goals{
  background-color: white;
}
.card{
  box-shadow: 1px 10px 10px rgb(164, 164, 164);
  overflow-y: auto;
}
</style>
