<template>
  <h2>餐廳</h2>
  <div class="choose">
    <drop-select :infor="city" @selectItem="filterItem"></drop-select>
    <div class="search-group">
      <searchBar :infor="spots" :keyData="keyData" @filter="searchfilter"></searchBar>
      <button class="clearBtn" @click="cleaSearch">clear</button>
    </div>
  </div>
  <ul class="travelspot">
    <li v-for="(spot,index) in selected" :key="spot.id">
      <img class="spotImg" :src="spot.Picture1" :alt="spot.Name" @error="
          $event.target.src =
            'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1615961266621.jpg'
        " />
      <div class="spotName">

        <a href="" :class="{active:isActive[index]}" @click.prevent="addFav(index)">
          <i class="fa fa-heart"> </i>

        </a>


        <span>{{ spot.Name }}</span>
      </div>
      <div class="address">
        <i class="fa-solid fa-map-location-dot"></i>
        <span>{{ spot.Add }}</span>
      </div>
      <div class="openTime">
        <i class="fa-solid fa-clock"></i>
        <span>{{ spot.Opentime }}</span>
      </div>
      <div class="contact">
        <i class="fa-solid fa-phone"></i>
        <a href="tel:+{{spot.Tel}}">+{{ spot.Tel }}</a>
      </div>
    </li>
  </ul>
  <pageSlide :infor="spots" :offset="12" @set-page="selfupdate"></pageSlide>
</template>

<script>
  import travelData from "../json/travel.json";
  import pageSlide from "./tool/pageSlide.vue";
  import dropSelect from "./tool/dropSelect.vue"
  import searchBar from "./tool/searchBar.vue"
  export default {
    data() {
      return {
        originData: travelData.slice(0, 100),
        spots: travelData.slice(0, 100),
        city: ["花蓮縣", "臺東縣"],
        selected: travelData.slice(0, 100),
        keyData: 'Name',
        isActive: [],

        prefers:[],
        newSpot:null

      };
    },
    components: {
      pageSlide,
      dropSelect,
      searchBar
    },
    methods: {
      selfupdate(val) {
        this.selected = this.originData;
        this.selected = val;

      },
      filterItem(val) {
        // val 是選擇的 item 名稱
        this.spots = this.originData;
        this.selected = this.spots.filter((searchResult) =>
          searchResult.Region.match(val)
        );
        console.log(this.selected);
        this.spots = this.selected;
      },

      searchfilter(val) {

        this.selected = val;
        this.spots = val;

      },

      cleaSearch() {
        this.spots = this.originData

      },
      addFav(index) { // 加入 localstorage
        if (this.isActive[index] == true) {
          this.isActive[index] = false
          console.log("delete")
          


        } else {
          
          
          this.isActive[index] = true
          // console.log(this.originData[index])
          this.newPrefers = this.originData[index]
          console.log(this.newPrefers)
          if(!this.newPrefers)return;
          this.prefers.push(this.newPrefers);
         
          this.newPrefers = '';
          this.savePrefers();
          
          // console.log(this.prefers[0].Name)
        }

      },

      savePrefers() {
      let parsed = JSON.stringify(this.prefers);
      localStorage.setItem('prefers', parsed);
    }
    },

    mounted() {
      // localStorage.removeItem('prefers'); // for test
    // console.log(this.originData[0])
    if(localStorage.getItem('prefers')) {
      try {
        this.prefers = JSON.parse(localStorage.getItem('prefers'));
      } catch(e) {
        localStorage.removeItem('prefers');
      }
    }
  },

    watch: {
      selected: {
        deep: true,
        handler: function () {},
      },
    },
  };
</script>

<style scoped>
  .choose {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    ;
  }

  .search-group {
    display: flex;
  }

  .travelspot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .travelspot li {
    border: 1px solid grey;
    border-radius: 10px;
    padding: 15px;
    margin: 5px 0px 5px 5px;
    /* max-width:300px; */
    width: 32%;
    position: relative;
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    .travelspot li {
      width: 48%;
    }
  }

  .spotName {
    position: relative;
  }

  .spotName a {
    position: absolute;
    right: 0px;
    bottom: 0px;
    /* color: grey; */
  }

  .spotName a:hover {
    color: red;
  }

  .active {
    color: red;
  }

  .spotImg {
    display: block;
    width: 100%;
    object-fit: cover;
    height: 200px;
    margin-bottom: 10px;
  }

  svg {
    margin-right: 7px;
  }

  .contact a {
    color: black;
    text-decoration: none;
  }

  .contact a:hover {
    /* color:burlywood; */
    color: chocolate;
  }

  .clearBtn {
    margin-left: 15px;
    border-radius: 10px;
    ;
    padding: 5px;
  }
</style>