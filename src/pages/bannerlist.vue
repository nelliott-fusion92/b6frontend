<script>

  import axios from 'axios'
  import bannerblock from '../components/bannerblock.vue'
  import pageheader from '../components/pageheader.vue'
  import confirmation from '../components/confirmation.vue'
  import pagination from '../components/pagination.vue'

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
      pagination,
    },
    async created () {
      await this.$store.dispatch('GET_BANNERS')
      await this.$store.dispatch('RESET_BANNERLIST_FILTERS')
      //await this.$store.dispatch('SET_BANNERLIST_FILTER', { field: 'name', operator: '^', value: 'walgreen' })
      //await this.$store.dispatch('SET_BANNERLIST_FILTER', { field: 'width', operator: '>', value: '300' })
    },
    computed: {
      bannerSavingStatus: function() {
        return this.$store.state.bannerSavingStatus
      },
      isSavingComplete: function() {
        return this.$store.state.bannerSavingStatus == 'COMPLETE' || this.$store.state.bannerSavingStatus.indexOf('ERROR') > -1
      },
      isError: function() {
        return this.$store.state.bannerSavingStatus.indexOf('ERROR') > -1
      },
      banners: function() {
        return this.$store.state.filteredBanners
      },
      protectedBanners: function() {
        return this.$store.state.protectedBanners
      },
    },
    methods: {
      setSearchText: async function(e){
        if(e.srcElement.value.length === 3){

        }
        await this.$store.dispatch('SET_BANNERLIST_FILTER', { field: 'name', operator: '^', value: e.srcElement.value })
      },
      turnPage: function(e) {
        console.log(e)
        this.$store.dispatch('TURN_BANNERS_PAGE', { limit: e.limit, skip: e.skip })
      }
    }


  }

</script>

<template>

  <div v-if="loadStatus">
    <div>
      <pageheader v-bind:title="$route.name" />
      <div id="filters">
        <h3>Filters</h3>
        <label>Search</label>
        <input @input="setSearchText" />
      </div>
      <pagination :class="{ disabled: !loadStatus }" :limit="this.$store.state.bannersQuery.limit" :skip="this.$store.state.bannersQuery.skip" @change="turnPage" />
      <div :class="{ animateflicker : !isSavingComplete, error : isError }" class="loading-display">{{bannerSavingStatus}}</div>
      <bannerblock
        class="bannerblock"
        v-for="banner in banners"
        :banner="banner"
        :isPreset="false"
        :bannerURL="'/banners/' + banner._id"
        :key="banner._id" />

      <div v-if="banners.length == 0">No banners found with current filters.</div>
    </div>

  </div>

</template>

<style lang="css" scoped>

  @import '../../assets/forms.scss';

  .disabled {
    opacity: .5;
    pointer-events: none;
  }
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

  .error {
    color: #F00 !important;
  }
  .loading-display {
    margin: 0 0 5px 0;
  }
  @keyframes flickerAnimation {
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-o-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-moz-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-webkit-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  .animateflicker {
     -webkit-animation: flickerAnimation .5s infinite;
     -moz-animation: flickerAnimation .5s infinite;
     -o-animation: flickerAnimation .5s infinite;
      animation: flickerAnimation .5s infinite;
      color: #FF0 !important;
  }

</style>
