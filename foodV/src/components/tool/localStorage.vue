<template>
    
</template>

<script>


export default{
    
    data: {
    prefers:[]
  },

  mounted() {
    if (localStorage.getItem('prefers')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cats'));
      } catch(e) {
        localStorage.removeItem('cats');
      }
    }
  },

props:{
    infor:{
        type:Object

    }
},
}


</script>