<script>

  import _ from 'lodash-es'

  export default {
    props: [
      'banner',
      'bannerURL',
      'isPreset',
    ],
    methods: {
      deleteBanner: function(e) {
        e.preventDefault()
        this.$store.dispatch('DELETE_BANNER', this.banner._id)
      },
      getPreview: function(e) {
        e.preventDefault()
        window.open(`${this.$store.state.b6_base}banner/${this.banner._id}`)
      },
      regenerate: function(e) {
        e.preventDefault()
        if(!this.isPreset) {
          this.$store.dispatch('REGENERATE_BANNER', this.banner)
        }
      }
    },
    computed: {
      expandable: function(){
        return this.banner.initWidth != this.banner.width || this.banner.initHeight != this.banner.height
      },
      protected: function() {
        return this.banner.protected == true || this.banner.protected == 'true'
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
            str += `<img width="20" height="20" src="${i}" />`
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

      <div v-if="banner">
        <h4 class="name">{{ this.banner.name }}</h4>
        <div class="created">Created {{ this.createdDate(this.banner._id) }}</div>
        <div class="banner-id">#{{ this.banner._id }}</div>
        <div class="dimensions">{{ this.banner.width }} x {{ this.banner.height }}<span v-if="expandable"> EXP</span></div>
        <div class="description">{{ this.banner.description }}</div>
        <div v-if="!isPreset" @click="getPreview" class="ext">Preview</div>
        <div class="imagesamples" v-html="this.imagePreviews"></div>
        <div class="bottom" v-if="!isPreset">
          <div class="protected" v-if="this.protected"><i class="fas fa-lock"></i></div>
          <div v-if="!this.protected" @click="deleteBanner"><i class="fas fa-trash-alt"></i></div>
          <div @click="regenerate"><i class="fas fa-sync-alt"></i></div>
        </div>



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
  .bannerblock:hover .name {
    color: $lightGreen;
  }
  .bannerblock:hover .created {
    color: #0FF;
  }
  .imagesamples img {
    display: inline-block;
    float: left !important;
  }
  .name {
    font-size: 16px;
    font-family: 'Exo';
    color: #0AA;
    font-weight: bold;
    text-overflow: ellipsis;

  }
  .description {
    font-size: 11px;
    line-height: 12px;
    margin: 4px 0 0 0;
    max-height: 24px;
    overflow-y: hidden;
  }
  .banner-id {
    font-size: 11px;
    font-family: 'IBM Plex Mono', serif;
    color: #0FF;
    margin: 0 0 5px 0;
    display: none;
  }
  .dimensions {
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
    color: #FF0;
    display: inline-block;
    font-size: 10px;
    font-weight: bold;
    font-family: 'Gotham';

  }
  .ext {
    display: inline-block;
    color: #0FF;
    font-size: 11px;
    margin: 2px 0 0 0;
  }
  .ext:hover {
    color: #FF0;
    text-decoration: underline;
    font-size: 11px;
  }
  .imagesamples {
    margin: 5px 0 0 0;
    height: 20px;
    overflow:hidden;
  }
  .bottom{
    position: absolute;
    bottom:0;
    text-align:right;
    z-index: 11;
    width: 100%;
    padding: 0 10px 2px 0;
  }
  .bottom div {
    display: inline;
    z-index: 12;
  }
  .bottom div:hover {
    color: #0FF;
  }
  .protected {
    color: #FF0;
  }
  .protected:hover {
    color: #FF0 !important;
  }
  .created {
    font-size: 10px;
    font-family: 'Gotham';
    background-color: #023;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2px 4px;
    color: #0AA;
    z-index: 10;
  }
  .locked {
    position: absolute;
    right: 5px;
    bottom: 2px;
    font-size: 11px;
    z-index: 11;
    color: #FF0;
  }

</style>
