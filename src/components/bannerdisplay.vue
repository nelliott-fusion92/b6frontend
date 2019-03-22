<script>
  import Vue from 'vue'
  import axios from 'axios'

  function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

  export default {
    props: [
      'banner',
    ],
    data: function(){
      return {
        isLoaded: false,
        bannerHTML: null,
        processedHTML: null,
      }
    },
    mounted: function() {
      axios.get('http://localhost:2048/build/banner_' + this.banner._id + '.html')
      .then((d) => {  // need to update port # to be dynamic based on env
        var bannerlink = {
          bannerID: this.banner._id,
          tag: {
            id: this.banner.id_counter,
            tagName: 'tagname',
          },
          cacheBuster: '',
          expandDirection: 7,
          clickTags: [
            {
              type: 'lotame',
              url: 'https://bcp.crwdcntrl.net/5/c=10676/b=51792423?',
            },
            {
              type: 'lotame',
              url: 'https://bcp.crwdcntrl.net?',
            }
          ],
          mediaMacro: 'PREVIEW'
        };
        bannerlink.sessionID = createUUID();
        var old_id = 'liq_' +this.banner._id;
        var sesh = 'liq_' + bannerlink.sessionID.replace(/-/g, '');
        var re = new RegExp(old_id, 'g');
        document.getElementById('wombat-container').innerHTML = d.data.replace(re, sesh)
        //this.bannerHTML = d.data.replace(re, sesh)
        console.log('banner loaded from wombat: ' + this.banner._id)
        window.xxx = 1234;
        console.log(window.xxx)
        eval(sesh + '_main' + 'Banner.init(bannerlink)');
      })



    },
  }

</script>

<template>

  <div>
    <div id="wombat-container" v-html="bannerHTML"></div>

  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
