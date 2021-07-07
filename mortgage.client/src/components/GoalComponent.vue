<template>
  <div class="goal-component">
    <div class="card card-two m-2 p-1">
      <div class="card-header text-center">
        <p class="float-right" @click="deleteGoal()">
          <i class="far fa-times-circle fa-2x"></i>
        </p>
        <h3 class="title">
          {{ goalProp.title }}
        </h3>
      </div>
      <div class="card-body text-left">
        <ul>{{ goalProp.body }}</ul>
      </div>
    </div>
  <!-- <div class="row ">
      <div class="col-6">
        <div class="card card-one m-3">
          <div class="card-header text-center">
            <h2 class="title mb-1 mt-1">
              {{ goalProp.title }}
            </h2>
            <p class="text-white">
              {{ goalProp.updatedAt.slice(0,10) }}
            </p>
          </div>
          <div class="card card-two m-3">
            <h5 class="body mt-3 mb-3 ml-3">
              <small>{{ goalProp.body }}</small>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { goalsService } from '../services/GoalsService'
import { logger } from '../utils/Logger'
// import { useRoute } from 'vue-router'

export default {
  name: 'GoalComponent',
  props: {
    goalProp: { type: Object, required: true }
  },
  setup(props) {
    // const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async deleteGoal() {
        try {
          await goalsService.deleteGoal(props.goalProp._id)
          await goalsService.getGoals()
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.card-one{
  border-radius: 10px;
  box-shadow: 4px 8px 8px rgb(153, 152, 152);
}
.card-header{
  /* background-color: #6c0f98;
  border-radius: 10px 10px 0px 0px;
  font-family: 'Poppins', sans-serif; */
  border-bottom: 2px solid #6c0f98;
  background-image: linear-gradient(to bottom, #548ab1, white);

}
.card-two{
  border: outset #6c0f98 2px;
  box-shadow: 4px 8px 8px rgb(153, 152, 152);

}

.title{
  color: #a60647;
  text-shadow: 1px 3px 5px rgb(137, 137, 137) ;
}
.body{
font-family: 'Poppins', sans-serif;
}
.far{
  color: #a60647;
}
.far:hover{
  transform: scale(1.3);
}
</style>
