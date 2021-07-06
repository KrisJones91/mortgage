<template>
  <div class="goal-component">
    <div class="card card-two m-2 p-1">
      <div class="card-header text-center">
        <h3 class="title">
          {{ goalProp.title }}
        </h3>
      </div>
      <div class="card-body">
        <p>{{ goalProp.body }}</p>
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
  background-color: rgb(243, 184, 242);
}
.card-two{
  border: outset #6c0f98 3px;
  box-shadow: 4px 8px 8px rgb(153, 152, 152);

}
.title{
  color: #6c0f98;
  text-shadow: 1px 3px 5px rgb(137, 137, 137);
}
.body{
font-family: 'Poppins', sans-serif;
}
</style>
