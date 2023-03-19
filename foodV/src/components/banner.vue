<template>


<div class="banner">

    <!-- <img src="../assets/foodbanner.jpg" alt="healthy food"> -->
    <h3>

        Food Explorer

    </h3>

</div>

</template>

<style scoped>

.banner{
background: url("../assets/foodbanner.jpg") no-repeat;
background-size: contain;
background-size: cover;
 background-position: center;
height:367px;
position:relative;
}
@media(max-width:414px){
    .banner{
        height: 240px;
    }
}
.banner h3{
        width: -webkit-fill-available;
    color:white;
    font-size: 55px;
    padding: 40px 197px;
    background:gray;
    opacity: 0.75;
    position: absolute;
    top:115px;
}



@media (max-width:768px) {
        .banner h3{
             padding: 40px 166px;
        }
}

@media (max-width:414px) {
        .banner h3{
            padding: 20px 35px;
            top:70px;
            font-size: 45px;
        }
}
</style>