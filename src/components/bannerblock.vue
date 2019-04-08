<script>

  import _ from 'lodash-es'

  export default {
    props: [
      'banner',
      'bannerURL',
    ],
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
        <div class="banner-id">{{ this.banner._id }}</div>
        <div class="dimensions">{{ this.banner.width }} x {{ this.banner.height }}<span v-if="expandable"> EXP</span></div>
        <div class="description">{{ this.banner.description }}</div>
        <div class="imagesamples" v-html="this.imagePreviews"></div>
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
    font-size: 16px;
    overflow:hidden;
    font-family: 'Exo';
    color: $lightGreen;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
  .banner-id {
    font-size: 10px;
    font-family: 'IBM Plex Mono', serif;
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
    color: #0FF;
    margin: 0 0 5px 0;
  }
  .dimensions {
    
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
    padding: 2px 4px;
    color: $lightGreen;
    display: inline-block;
    font-size: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .imagesamples {
    position: absolute;
    bottom: -4px;
    left: -4px;
  }

</style>
