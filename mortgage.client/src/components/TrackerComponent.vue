<template>
  <div class="tracker-component">
    <p>{{ trackProp }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'TrackerComponent',
  props: {
    trackProp: { type: Object, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>

</style>
