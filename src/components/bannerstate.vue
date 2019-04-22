<script>

  import Bannercomponent from './bannercomponent.vue'
  import Bannerprop from './bannerprop.vue'

  export default {
    props: [
      'statekey',
      'state',
    ],
    data: function(){
      return {
        showComponents: false,
        showTransIn: false,
        showTransOut: false,
      }
    },
    components: {
      Bannercomponent,
    },
    methods: {
      toggleComponents: function() {
        this.showComponents = !this.showComponents
      },
      setBannerProperty: function(e) {

        this.$store.dispatch('SET_BANNER_PROPERTY', {
          path: e.target.getAttribute('path'),
          val: e.target.value
        })
      },
    }
  }

</script>

<template>

  <div>
    <div>
      <h3 class="translabel" @click="showTransIn = !showTransIn">Transition In <i class="fas fa-angle-double-down"></i></h3>
      <div v-show="showTransIn" class="transition">
        <label>Duration (ms)</label>
        <input @change="setBannerProperty" :path="`states[${statekey}].in.duration`" :value="state.in.duration" />
        <h3>Initial</h3>
        <div class="transprops" v-for="(transprop, transkey) in state.in.init" :key="`${transkey}_in`">
          <label>{{ transkey }}</label>
          <input @change="setBannerProperty" :path="`states[${statekey}].in.init.${transkey}`" :value="transprop" />
        </div>
        <h3>Final</h3>
        <div class="transprops" v-for="(transprop, transkey) in state.in.anim" :key="`${transkey}_final`">
          <label>{{ transkey }}</label>
          <input @change="setBannerProperty" :path="`states[${statekey}].in.anim.${transkey}`" :value="transprop" />
        </div>
      </div>
    </div>
    <span @click="toggleComponents" class="state-title">{{ state.name }}</span>

    <div v-show="showComponents" class="components">
      <Bannercomponent class="component" v-for="(comp, compkey) in state.components" :component="comp" :statekey="statekey" :compkey="compkey" :key="compkey" />
    </div>
    <div>
      <h3 class="translabel" @click="showTransOut = !showTransOut">Transition Out <i class="fas fa-angle-double-down"></i></h3>
      <div v-show="showTransOut" class="transition">
        <label>Duration (ms)</label>
        <input @change="setBannerProperty" :path="`states[${statekey}].out.duration`" :value="state.out.duration" />
        <h3>Final</h3>
        <div class="transprops" v-for="(transprop, transkey) in state.out.anim" :key="transkey">
          <label>{{ transkey }}</label>
          <input @change="setBannerProperty" :path="`states[${statekey}].out.anim.${transkey}`" :value="transprop" />
        </div>
      </div>
    </div>
    <label>Auto switch in (ms)</label> <input class="shortinput" @change="setBannerProperty" :path="`states[${statekey}].autoSwitch`" :value="state.autoSwitch" />

  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .togglebutton {
    cursor: pointer;
    font-size: 14px;
  }
  .state-title {
    display: block;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #0FF;
    font-size: 18px;
    user-select:none;
  }
  .state-title:hover {
    color: #6F0;
  }
  .components {
    margin: 10px 0 0 0;
  }
  .component {
    font-size: 12px;
    color: #FF0;
  }
  .component:last-child {
    border-bottom: none;
  }
  .component:nth-child(odd) .component-title {
    background-color: #051530;
  }
  .translabel {
    color: #FF0;
    margin: 5px 0;
    cursor: pointer;
  }
  .shortinput {
    width: 70px;
    display: inline-block;
  }

</style>
