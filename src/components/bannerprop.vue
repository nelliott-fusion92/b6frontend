<script>

  import _ from 'lodash-es'
  import { mapState } from 'vuex'

  export default {
    name: 'Bannerprop',
    props: [
      'value',
      'type',
    ],
  }

</script>

<template>
  <div class="bannerprop">
    <div v-if="type === 'color'">
      color
    </div>
    <div v-else>
      {{type}}
      <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
