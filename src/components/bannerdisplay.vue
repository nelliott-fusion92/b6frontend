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

      var jq = document.createElement('script')
      jq.setAttribute('src', 'http://code.jquery.com/jquery-3.3.1.min.js')
      document.getElementById('wombat-container').appendChild(jq)
      var liqEl = document.createElement('script')
      liqEl.setAttribute('type', 'text/javascript')
      liqEl.innerHTML = `
        var liqBanner = {
          bannerID: '${this.banner._id}',
          tag: {
            id: ${this.banner.id_counter},
            tagName: 'tagname',
          },
          campaignID: '8c2c595dc4ead229'
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
      `
      document.getElementById('wombat-container').appendChild(liqEl);

      let scriptEl = document.createElement('script');
      scriptEl.setAttribute('src', 'https://bl6l.liquidus.net/marsupial');
      scriptEl.setAttribute('type', 'text/javascript');
      document.getElementById('wombat-container').appendChild(scriptEl);

    },
  }

</script>

<template>

  <div>
    {{ this.banner._id }}
    <div id="wombat-container">
    </div>

  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
