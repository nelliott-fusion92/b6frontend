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
       {{_key}} <input @input="setBannerProperty" v-bind:_path="_path" :value="_item"  />
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

  .bannerprop div {
    min-height: $minHeight;
  }


</style>
