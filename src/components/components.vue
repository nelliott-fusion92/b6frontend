<script>

  import axios from 'axios'

  export default {
    props: [
      'id',
      'api_base'
    ],
    data: function(){
      return {
        components: null
      }
    },
    components: {

    },
    mounted () {
      axios
        .get(`${this.api_base}v1/components`)
        .then((response) => {
          this.components = response.data
        })
    }
  }

</script>

<template>

  <div>
    <div v-if="components" v-for="component in components">
      {{component.name}}
    </div>
  </div>
  
</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
