<template>

<div class="menu mt-5">

  <div class="start">
<h1 class="logo"><a href="#">Food Explorer</a></h1>
<h2><a href="#">Food Explorer</a></h2>

</div>


<ul class="nav">
<li class="nav-item">
          <a class="nav-link" aria-current="page" href="#/">Home</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#/about">About</a>
        </li> -->
        <li class="nav-item">
          <a class="nav-link" href="#/foodInfor" >
            食材資訊
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/restaurant" >
            餐廳
          </a>
        </li>

         <li class="nav-item">
          <a class="nav-link" href="#/restaurant" >
            收藏
          </a>
        </li>


</ul>



</div>
 <component :is="currentView" />
   
 
</template>


<script>
import foodInfor from './foodInfor.vue'
import Home from './Home.vue'
import About from './About.vue'
import resTau from './restaurant.vue'

const routes = {
  '/': Home,
  '/about': About,
  '/foodInfor':foodInfor,
  '/restaurant':resTau
}
export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  components:{
    Home,
    About,
    foodInfor,
    resTau,
  
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<style scoped>
h2{
  margin:0px;
}
@media(max-width:414px){
    h2{
      display: none;
    }
  }
.logo{
    display:block;
    background: url('../assets/dinner.png') no-repeat;
    text-indent: 999%;
    overflow: hidden;
    white-space: nowrap;
    background-size: 100% 100%;
    width:50px;
    height:50px;
    margin-right:10px;
}
.logo a{
    display: block;
    padding:25px 15px;
}

.menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

/* @media(max-width: 414px) {
  .menu {
    display: block;
  }
} */
.start{
  display: flex;
  align-items: center;

}
.nav{
    display: flex;
}
.nav-item{
    margin-left:10px;
}
.nav-link{
  color: black;
padding:20px 10px;
display: block;
}
.nav-link:hover{
  color: #1B4E8E;

}

/* @media (min-width:767px){

.nav-link{
    
}

} */

.search{
  display:flex;
  align-items: center;
  position:relative;
}

.fa-search{
  font-size: 20px;
    top:6px;
  right:4px;
   position: absolute;
   padding:10px;
   color:black;
}
.searchbox{
  width:240px;
  height:40px;
  border-radius: 10px;
 padding:12px;

}
</style>