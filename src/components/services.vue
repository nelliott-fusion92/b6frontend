<script>

  export default {
    data: function(){
      return {
        showComponents: false
      }
    },
    components: {

    },
    methods: {
      toggleComponents: function() {
        this.showComponents = !this.showComponents
      }
    },
    computed: {
      services: function() {
        return this.$store.state.currentBanner.services
      }
    }
  }

</script>

<template>

  <div>
    <div v-if="services" v-for="service in services">
      <div>{{service.name}}</div>
      <div v-for="(option, key) in service.options">
        <label>{{ key }}</label>
        <input :value="option" />
      </div>
      <div v-if="Object.keys(service.options).length === 0">(no options)</div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';



</style>
