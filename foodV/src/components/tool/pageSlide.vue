<template>

 
    <!--分頁部分-->
    <div class="row">
      <nav aria-label="Page navigation example justify-content-center">
        <ul class="pagination  justify-content-center" >
          <li
            class="page-item"
            :class="['page-item',{disabled:currentPage===1}]"
            @click.prevent="setPage(currentPage-1)"
          >
            <a class="page-link" href="#">&lt;</a>
          </li>
          <li
            v-for="page in totalPage"
            :key="page"
            class="page-item"
            :class="['page-item',{active:currentPage === page}]"
            @click.prevent="setPage(page)"
          >
            <a class="page-link" href="#">{{page}}</a>
          </li>
          <li
            class="page-item"
            :class="['page-item',{disabled:currentPage===totalPage}]"
            @click.prevent="setPage(currentPage+1)"
          >
            <a class="page-link" href="#">></a>
          </li>
        </ul>
      </nav>
    </div>



</template>

<script>

export default {
//   name: "DataWithPagination",
  props: {
    infor: {
      type: Array, 
      required: true
    },
    offset: '',

  },
  data() {
    return {
      query: "",
      currentPage: 1,
      
      foodlist:[]
    };
  },
  computed: {
    filterRows() {
      let query = this.query.toLowerCase();
      let originData = this.infor;
      
      if (!this.query.match(/^[ ]*$/)) {
        return originData.filter(d => {
          return d.name.toLowerCase().indexOf(query) > -1;
        });
      } else {
        return originData;
      }
      
    },
    pageStart() {
      return (this.currentPage - 1) * this.offset;
    },
    totalPage() {
       
      return Math.ceil(this.filterRows.length / this.offset);
    },


  },
  methods: {
    setPage(idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return;
      }
      this.currentPage = idx;
    //    console.log(this.filterRows)
      this.foodlist = this.filterRows.slice(this.pageStart, this.pageStart + this.offset)
      this.$emit('set-page',this.foodlist);
     
    },
    sliceData(){
      this.foodlist = this.filterRows.slice(this.pageStart, this.pageStart + this.offset)
      this.$emit('set-page',this.foodlist);
    }
  },
  mounted(){
    this.sliceData()
  },
  watch: {
    filterRows: {
      deep: true,
      handler: function() {
        this.currentPage = 1;
        this.sliceData()

      }
    }
  }
};
</script>

<style>
.pagination{
  margin-top:12px;
}

</style>

