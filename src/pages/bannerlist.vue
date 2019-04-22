<script>

  import axios from 'axios'
  import bannerblock from '../components/bannerblock.vue'
  import pageheader from '../components/pageheader.vue'
  import confirmation from '../components/confirmation.vue'

  export default {
    props: [
      'api_base',
    ],
    data: function(){
      return {
        listOpen: false,
        selectedName: 'Select an option',
      }
    },
    components: {
      bannerblock,
      pageheader,
      confirmation,
    },
    async created () {
      await this.$store.dispatch('GET_BANNERS')
      await this.$store.dispatch('RESET_BANNERLIST_FILTERS')
      //await this.$store.dispatch('SET_BANNERLIST_FILTER', { field: 'name', operator: '^', value: 'walgreen' })
      //await this.$store.dispatch('SET_BANNERLIST_FILTER', { field: 'width', operator: '>', value: '300' })
    },
    computed: {
      banners: function() {
        return this.$store.state.filteredBanners
      },
      protectedBanners: function() {
        return this.$store.state.protectedBanners
      },
    },
    methods: {
      setSearchText: async function(e){
        await this.$store.dispatch('SET_BANNERLIST_FILTER', { field: 'name', operator: '^', value: e.srcElement.value })
      }
    }


  }

</script>

<template>

  <div v-if="loadStatus">

    <pageheader v-bind:title="$route.name" />
    <div id="filters">
      <h3>Filters</h3>
      <label>Search</label>
      <input @input="setSearchText" />
    </div>
    <bannerblock
      class="bannerblock"
      v-for="banner in banners"
      :banner="banner"
      :isPreset="false"
      :bannerURL="'/banners/' + banner._id"
      :key="banner._id" />

    <div v-if="banners.length == 0">No banners found with current filters.</div>

  </div>

</template>

<style lang="css" scoped>


  #listbox-id-1 {
    width: 300px;
    left: 155px;
    float: none;
  }
  svg {
    left: 10px;
    height: 100%;

  }
  svg path {
    fill: #000;
    background-size: 20px 20px;
  }

  i {

  }

  #filters {
    padding: 5px;
    border-bottom: dotted 1px #999;
    margin: 0 0 10px 0;
  }

  .listlink {
    font-family: 'Exo', sans-serif;
    font-weight: normal;
    color: #000;
  }

</style>
