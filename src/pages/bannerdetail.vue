<script>

  import Bannerdetailitem from '../components/bannerdetailitem.vue'
  import Bannerdisplay from '../components/bannerdisplay.vue'
  import Bannerprop from '../components/bannerprop.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    components: {
      Bannerdetailitem,
      Bannerdisplay,
      Bannerprop,
      pageheader,
    },
    beforeMount () {
      this.$store.dispatch('GET_COMPONENTS')
    },
    mounted () {
      this.$store.dispatch('GET_BANNER', this.id)
    },
    computed: {
      banner: function() {
        return this.$store.state.currentBanner
      },
    },
    methods: {
      test: function(e) {
        console.log(e)
        this.$store.dispatch('SET_BANNER_PROPERTY', e)
      },
      undo: function() {
        this.$store.commit('undo')
      },
    },
  }

</script>

<template>

  <div v-if="loadStatus">
    <Bannerdetailitem v-if="banner._id" v-bind:banner="banner" />
    <div class="banner-state" v-for="(state, key) in banner.states">
      <span class="state-title">S{{key}} {{ state.name }}</span>
      <div class="component" v-for="(comp, compkey) in state.components">
        <span class="component-title">S{{key}}C{{compkey}} {{ comp.name }}</span>
        <div class="component-props">
          <Bannerprop
            v-for="(prop, propkey) in $store.state.components.Component.editableParameters"
            :key="propkey"
            :value="comp.options[propkey] || $store.state.components.Component.defaults[propkey]"
            :componentName="comp.name"
            :propkey="propkey"
            @input="test"
            :path="`states[${key}].components[${compkey}].options.${propkey}`"
            :type="prop.type"
            :options="prop.options"
          />
        </div>
        <div>
          <Bannerprop
            v-for="(prop, propkey) in $store.state.components[comp.name].editableParameters"
            :key="propkey"
            :value="comp.options[propkey] || $store.state.components[comp.name].defaults[propkey]"
            :componentName="comp.name"
            :propkey="propkey"
            @input="test"
            :path="`states[${key}].components[${compkey}].options.${propkey}`"
            :type="prop.type"
            :options="prop.options"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .component-title {
    display: block;
    margin: 0 0 10px 0;
    font-size: 16px;
  }
  .component-props {

  }
  .banner-state {
    color: #0FF;
    font-size: 18px;
    padding: 10px;
    background-color: #050505;
  }
  .banner-state div {
    margin: 0 0 0 10px;
    padding: 10px;
  }
  .state-title {
    display: block;
    margin: 0 0 10px 0;
  }
  .component {
    font-size: 12px;
    color: #FF0;
    background-color: #000111;
  }
  .component:nth-child(odd) {
    background-color: #000104;
  }
  .banner-state:nth-child(even) {
    background-color: #101010;
  }
  .bannerprops::-webkit-scrollbar { width: 10px !important; opacity: 0.5 !important; }
  .bannerprops {
    background-color: #001828 !important;
    color: #14AEFE;
    padding: 20px 10px;
    margin: 10px 0;
    border: solid 1px #005270;
    overflow-x: hidden;
    overflow-y: auto;
    width: 500px;
    max-height: 900px;
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    box-sizing: content-box;
    overflow-y: scroll;
  }


</style>
