<template>
    
    <div class="content">

        <div class="header">
        <h2>食材資訊</h2>
        <searchBar :infor="foodList" :keyData="keyData" @filter="searchfilter"></searchBar>
        <button class="clearBtn" @click="cleaSearch">clear</button>
    </div>

        <table class="table table-striped-columns foodtable">
            <thead>
                <tr class="head">
                    <th scope="col">食品名稱</th>
                    <th scope="col">蛋白質含量</th>
                    <th scope="col">碳水化合物含量</th>
                    <th scope="col">油脂含量</th>
                    <th scope="col">膳食纖維含量</th>
                    <th scope="col">熱量</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="food in chooseList" :key="food.id">

                    <td scope="row">{{ food.name }}</td>
                    <td>{{ food.protein }}</td>
                    <td>{{food.carbohydrate}}</td>
                    <td>{{food.fat}}</td>
                    <td>{{food.calories}}</td>
                    <td>{{food.dietaryFiber}}</td>
                </tr>
            </tbody>
        </table>
    
    </div>
    <span class="information">含量單位為公克(g)</span>
    <pageslide :infor="foodList" @set-page="selfupdate" :offset=13></pageslide>
</template>
<script>
    import axios, {Axios} from "axios";
    import {VueElement} from "vue";
    import banner from './banner.vue'
    import pageslide from './tool/pageSlide.vue'
    import searchBar from './tool/searchBar.vue'
    VueElement.prototype.$ajax = Axios;
    export default {
        data() {
            return {
                originData:[],
                foodList: [],
                chooseList:[],
                searchList:[],
                keyData:'name'
            };
        },
        components:{
            searchBar ,
            pageslide,
            banner
        },
        async mounted() {
            // https://gis.taiwan.net.tw/XMLReleaseALL_public/restaurant_C_f.json
            // https://jsonplaceholder.typicode.com/users
            await this.foodRequest()
        },
        methods: {

            selfupdate(val){
                this.chooseList = val;
                // console.log(val)
            },

            searchfilter(val){
                // this.searchList = val;
                this.chooseList = val;
                this.foodList = val;
                // console.log(val)
            },
            cleaSearch(){
                this.foodList = this.originData
                console.log(this.foodList)
            },
            foodRequest() {
                //https://gw.openapi.org.tw/18463fd0-8aa7-11ea-8b2f-dfcba39a3448/6ace07502582?client_id=07420fe0-18c4-11ed-96b7-a9e2730cba3d&client_secret=ruyFnp9Umehj2BXf9x7jbmB9lKXXk7N39hL3EFKILEY%3D&skip=10&limit=100
                axios.get("https://gw.openapi.org.tw/18463fd0-8aa7-11ea-8b2f-dfcba39a3448/6ace07502582?client_id=07420fe0-18c4-11ed-96b7-a9e2730cba3d&client_secret=ruyFnp9Umehj2BXf9x7jbmB9lKXXk7N39hL3EFKILEY%3D&skip=10&limit=100")
                    .then(res => {
                        res = JSON.stringify(res.data)
                        res = JSON.parse(res)
                        this.originData = res.data;
                        this.foodList = res.data;
                    })
                    // Manage errors if found any
                    .catch(error => {
                        if (error.request.status == 503) {
                            setTimeout(() => {
                                this.foodRequest()
                            }, 0.1);
                        }
                    })
            }
        }
    }
</script>
<style scoped>

.header{
    display: flex;
    align-items: center;
    justify-content:center;
    margin-bottom: 20px;
}
h2{
    margin:0px;
    margin-right:30px;
}
@media(max-width:414px){
    h2{
        font-size: 18px;
    }
}
.clearBtn{
    margin-left:15px;
    border-radius: 20px;;
    padding:5px;
}
@media(max-width:414px){
    .clearBtn{
        font-size: 12px;
    }
}
    .foodtable th,
    td {
        padding: 15px 20px;
        text-align: center;
        white-space: nowrap;
    }

    .foodtable {
        table-layout: fixed;
    }
    @media(max-width:767px) {
        .foodtable {
            font-size: 13px;
        }
        .foodtable th,
        td {
            padding: 9px;
            text-align: center;
            white-space: nowrap;
        }
    }
    @media(max-width:414px){
        .foodtable{
            display: block;
    overflow-x: auto;
    white-space: nowrap;
        }
    }
    .information{
        display: block;
        text-align: center;
    
        font-size: 12px;;
    }
  
</style>