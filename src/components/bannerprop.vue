<script>

  import _ from 'lodash-es'
  import { mapState } from 'vuex'

  export default {
    name: 'Bannerprop',
    props: [
      '_item',
      '_key',
      '_path',
    ],
    data: function() {
      return {
        isIterable: null,
        type: null,
      }
    },
    mounted: function() {
      let x = false
      let type = ''

      if(_.isObject(this._item)) {
        x = true
        type = 'object'
      }

      if(_.isArrayLikeObject(this._item)){
        x = true
        type = 'array'
      }
      else if(_.isArray(this._item)){
        x = true
        type = 'array'
      }

      this.isIterable = x
      this.type = type
    },

    methods: {
      setBannerProperty: function(e) {
        this.$store.commit('setBannerProperty', { path: this.path, val: e.target.value })
      },
    },
    computed: {
      banner: function() {
        return this.$store.state.currentBanner
      },
      path: function() {
        return this._path
      },
      ...mapState({
        prop: state => {
          _.set(state, `currentBanner.${this._path}`, this._item)
        }
      }),
    },
  }

</script>

<template>

  <div class="bannerprop">

    <span v-if="!type">
       <span class="label">{{_key}}</span> <input @input="setBannerProperty" v-bind:_path="_path" :value="_item"  />
    </span>
    <span v-if="type === 'array'">
       <span class="arrayTitle">{{_key}}</span>
    </span>
    <Bannerprop v-if="type && type === 'object'" v-for="(item, key, index) in _item" v-bind:_path="_path + '.' + key" v-bind:_item="item" v-bind:_key="key" :key="key" />
    <Bannerprop v-if="type && type === 'array'" v-for="(item, key, index) of _item" v-bind:_path="_path + '[' + key + ']'" v-bind:_item="item" v-bind:_key="key" :key="key" />

  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  $minHeight: 20px;
  $maxWidth: 400px;
  .arrayTitle {
    display: block;
    min-height: $minHeight;
  }
  .bannerprop {


    padding: 0 0 0 15px;
    min-height: $minHeight;
    display: block;
    max-width: $maxWidth;
    min-width: $maxWidth;

    position: relative;
  }
  .bannerprop input {
    display: block;
    margin: 2px 0 11px 0;
    background-color: #013043;
    border: none;
    border-radius: 2px;
    outline: none;
    padding: 5px;
    color: #0EF;
    font-size: 12px;
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
    box-shadow: 2px 2px 2px #000920;
    width: 300px;
  }

  .bannerprop div {
    min-height: $minHeight;
  }

  .label {
    color: #AF6;
    font-weight: 400;
    font-family: 'Exo';
    font-size: 12px;
  }


</style>
