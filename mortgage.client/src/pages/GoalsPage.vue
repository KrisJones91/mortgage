<template>
  <div class="goals container-fluid">
    <div class="row justify-content-center">
      <h1 class="title mt-4">
        Goals
      </h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 col-md-6 text-center">
        <form type="submit" @submit.prevent="createGoal">
          <div class="form-group">
            <input type="text"
                   class="form-control inp m-1 in-one"
                   id="title"
                   v-model="state.newGoal.title"
                   placeholder="Title..."
                   required
            >
            <textarea type="text"
                      class="form-control inp m-1 "
                      id="body"
                      v-model="state.newGoal.body"
                      placeholder="Description..."
                      required
            />
            <button type="submit" class="btn main-button mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col card m-5 p-2">
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
          state.newGoal = {}
          logger.log(state.newGoal)
          await goalsService.getGoals()
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
.goals{
  background-color: rgb(219, 219, 219);
}
.title{
  font-family: 'Poppins', sans-serif;
  color: #42dec0;
  text-shadow: 2px 4px 5px gray;
  -webkit-text-stroke: #6c0f98 1.7px;
}

.card{
  box-shadow: 1px 10px 10px rgb(164, 164, 164);
  overflow-y: auto;
  max-height: 480px;
  min-height: 480px;
  background-image: url("http://st.depositphotos.com/2569633/2979/v/450/depositphotos_29795757-Seamless-pattern-with-small-flowers.jpg");
  background-size:cover ;
  border: 3px solid #6c0f98;
  background-position-y: 1060%;
  background-position-x: -30%;
}
.inp {
  border: 2px solid #6c0f98;
  box-shadow: 1px 2px 5px rgb(164, 164, 164);
}
.main-button{
  border: 2px ridge rgb(131, 131, 131);
  background-color: #6c0f98;
  box-shadow: 1px 2.5px 6px rgba(0, 0, 0, 0.245);
  color: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgb(255, 255, 255), rgb(207, 207, 207));
}
</style>
