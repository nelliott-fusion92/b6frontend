<script>
  import _ from 'lodash-es'
  import Sortable from 'sortablejs'
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
          'Option 0',
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4',
          'Option 5',
        ],
        sortable: null
      }
    },
    methods: {
      gotInput: function(e) {
        console.log(e)
      },
    }
  }

</script>

<template>
  <div>
    <pageheader v-bind:title="$route.name" />
    <div>
      Welcome to Bannerlink 6
      <div class="form">
        <SLDSinput style="display:none;" @input="gotInput" name="Input Name" placeholder="Placeholder Text" value="123" />
        <SLDSselect style="display:none;" @input="gotInput" name="Input Name" placeholder="Select an option" value="Option 2" :options="options" />
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  .form {
    width: 300px;
  }
  .list-group-item {
    cursor: pointer;
    font-size: 18px;
    padding: 10px;
    border: solid 1px #fff;
  }

</style>
