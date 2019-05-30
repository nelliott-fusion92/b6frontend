<script>

  import pageheader from '../components/pageheader.vue'
  import SLDSinput from '../components/lightning/input.vue'
  import SLDSselect from '../components/lightning/select.vue'

  export default {
    components: {
      pageheader,
      SLDSinput,
      SLDSselect,
    },
    data () {
      return {
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
        ]
      }
    },
    methods: {
      gotInput: function(e) {
        console.log(e)
      }
    }
  }

</script>

<template>
  <div>
    <pageheader v-bind:title="$route.name" />
    <div>
      Welcome to Bannerlink 6
      <div class="form">
        <SLDSinput @input="gotInput" name="Input Name" placeholder="Placeholder Text" value="123" />
        <SLDSselect @input="gotInput" name="Input Name" placeholder="Select an option" value="Option 2" :options="options" />
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  .form {
    width: 300px;
  }

</style>
