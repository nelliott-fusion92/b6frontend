<script>

  import _ from 'lodash-es'

  export default {
    props: [
      'banner',
      'bannerURL',
      'isPreset'
    ],
    methods: {
      deleteBanner: function(e) {
        e.preventDefault()
        this.$store.dispatch('DELETE_BANNER', this.banner._id)
      },
      getPreview: function(e) {
        e.preventDefault()
        window.open(`${this.$store.state.b6_base}banner/${this.banner._id}`)
      }
    },
    computed: {
      expandable: function(){
        return this.banner.initWidth != this.banner.width || this.banner.initHeight != this.banner.height
      },
      imagePreviews: function() {
        let d = this.banner

        let images = []

        function deep(dd){
          _.each(_.keys(dd), (k) => {
            if(_.isObject(dd[k]) || _.isArray(dd[k])) {
              deep(dd[k])
            }
            else {
              if(k === 'imgUrl'){
                images.push(dd[k]);
              }
            }
          })
        }

        deep(d)

        let str = ''
        let count = 0;
        _.each(images, (i) => {
          if(count < 10){
            str += `<img width="40" height="40" src="${i}" />`
            count++;
          }
        })

        return str;

      },
    }
  }

</script>

<template>

  <router-link :to="bannerURL" v-if="this.banner.name" class="bannerblock">

      <div>
        <h4 class="name">{{ this.banner.name }}</h4>
        <div class="banner-id">#{{ this.banner._id }}</div>
        <div class="dimensions">{{ this.banner.width }} x {{ this.banner.height }}<span v-if="expandable"> EXP</span></div>
        <div class="description">{{ this.banner.description }}</div>
        <div v-if="!isPreset" @click="getPreview" class="ext">Preview</div>
        <div class="imagesamples" v-html="this.imagePreviews"></div>
        <div v-if="!isPreset" title="Delete banner" class="delete" @click="deleteBanner"><i class="fas fa-trash-alt"></i></div>
      </div>

  </router-link>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .bannerblock {
    position: relative;
    width: 250px;
    height: 150px;
    padding: 8px;
    display: inline-block;
    margin: 0 10px 10px 0;
    overflow:hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    border: solid 1px #055;
    color: #FFF;
    font-size: 12px;
    font-family: 'Open Sans';
  }
  .bannerblock:hover {
    border: solid 1px #0FF;
    text-decoration:none;
    background-color: #002333;
  }
  .bannerblock img {
    width: 40px;
    height: 40px;
    display: inline-block;
  }
  .name {
    font-size: 18px;
    font-family: 'Roboto';
    color: $lightGreen;
    font-weight: bold;
    text-overflow: ellipsis;

  }
  .banner-id {
    font-size: 11px;
    font-family: 'IBM Plex Mono', serif;
    color: #0FF;
    margin: 0 0 5px 0;
  }
  .dimensions {
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
    padding: 2px;
    background-color: #0FF;
    color: #000;
    display: inline-block;
    font-size: 11px;
    font-weight: bold;
    font-family: 'Gotham';
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .ext {
    display: inline-block;
    color: #FF0;
    font-size: 11px;
  }
  .ext:hover {
    color: #FF0;
    text-decoration: underline;
    font-size: 11px;
  }
  .imagesamples {
    position: absolute;
    bottom: -4px;
    left: -4px;
  }
  .delete {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .delete:hover {
    color: #0FF;
  }

</style>
