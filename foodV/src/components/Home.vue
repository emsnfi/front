<template>


  <banner></banner>
  <h2>About</h2>
  <div class="explain">
    <p>透過食材資訊的查詢，了解食物的樣貌、營養成分，進一步知道攝取的營養量，<br/>資料來自
      <a class="link" href="https://www.openapi.org.tw/#/api/e3fa5230-8c8a-11ea-8b2f-dfcba39a3448/info" target="_blank">
        智慧城鄉的 Open API
      </a>
    </p>
    <p>

      餐廳資訊主要呈現花蓮以及台東著名的餐館，資料來源

      <a class="link" target="_blank" href="https://data.gov.tw/dataset/7779">政府資料開放平臺的觀光資訊</a>
    </p>

  </div>


</template>

<script>
  import banner from './banner.vue'
  export default {


    components: {
      banner,

    },

  }
</script>

<style scoped>
  h2 {
    margin: 20px 0px 5px 0px;

  }
  
  .link {
    color: blue;
  }
p{
  line-height: 2;
  padding:10px 0px 15px 0px;
}
  .explain{
    display:block;
    margin:0 auto;
    width:700px;
    text-align: center;
  }
  @media(max-width:414px){
    .explain{
          width: 300px;
    }
  }

</style>