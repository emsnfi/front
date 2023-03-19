const vegbtn = document.querySelector(".veg-button");
const showList = document.querySelector(".showList");
const showListText=document.querySelector(".showList tr td");
const fruitsBtn=document.querySelector(".fruitsBtn");
const flowersBtn=document.querySelector(".flowersBtn");
const sortSelect=document.querySelector(".sort-select")
let newData=[];
const searchBtn = document.querySelector(".search");
const crop = document.querySelector("#crop"); // 搜尋匡作物
// 菜 n04
vegbtn.addEventListener("click",e=>{
    
    let data=[];
    axios.get('https://hexschool.github.io/js-filter-data/data.json')
    .then(response=>{
        data=response.data;
        newData=[];
        newData=data.filter(item=>(item.作物名稱!==null)&&item.種類代碼==="N04");
        renderData();
        sortSelect.value="排序篩選";
    });
    vegbtn.classList.add("active");
    fruitsBtn.classList.remove("active");
    flowersBtn.classList.remove("active");
    showListText.textContent="資料載入中..."    
})

// 花06

flowersBtn.addEventListener("click",e=>{
    let data=[];
    axios.get('https://hexschool.github.io/js-filter-data/data.json')
    .then(response=>{
        data=response.data;
        newData=[];
        newData=data.filter(item=>(item.作物名稱!==null)&&item.種類代碼==="N06");
        renderData();
        sortSelect.value="排序篩選";
    });
    vegbtn.classList.remove("active");
    fruitsBtn.classList.remove("active");
    flowersBtn.classList.add("active");
    showListText.textContent="資料載入中..."    
})
// 水果
fruitsBtn.addEventListener("click",e=>{
    let data=[];
    axios.get('https://hexschool.github.io/js-filter-data/data.json').then(response=>{
        data=response.data;
        newData=[];
        newData=data.filter(item=>(item.作物名稱!==null)&&item.種類代碼==="N05");
        renderData();
        
        sortSelect.value="排序篩選";
    });
    vegbtn.classList.remove("active");
    fruitsBtn.classList.add("active");
    flowersBtn.classList.remove("active");
    showListText.textContent="資料載入中..."    
})


function searchCrop(){
    let data=[];
    
    axios.get('https://hexschool.github.io/js-filter-data/data.json').then(response=>{
        data=response.data;
        newData=[];
        newData=data.filter(item=>(item.作物名稱!==null)&&item.作物名稱.includes(crop.value));
        if(newData.length>0){
            renderData();        
        }else{
            showList.innerHTML=`<tr>
                <td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td>
            </tr>`
        }
        sortSelect.value="排序篩選";
        
    });
    
    showListText.textContent="資料載入中..."
}

searchBtn.addEventListener("click",searchCrop);
crop.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        searchCrop();
    }
  });


// 渲染 呈現作物
function renderData(){
    let str="";
    newData.forEach(item => {
        str+=`<tr class="text-center">
            <td class="p-3">${item.作物名稱}</td>
            <td class="p-3">${item.市場名稱}</td>
            <td class="p-3">${item.上價}</td>
            <td class="p-3">${item.中價}</td>
            <td class="p-3">${item.下價}</td>
            <td class="p-3">${item.平均價}</td>
            <td class="p-3">${item.交易量}</td>
        </tr>`;    
    });        
    showList.innerHTML=str;    
}


//排序
sortSelect.addEventListener("change",e=>{
    if(sortSelect.value=="依上價排序"){
        newData.sort((a,b)=>a.上價-b.上價);
        renderData();
    }else if(sortSelect.value=="依中價排序"){
        newData.sort((a,b)=>a.中價-b.中價);
        renderData();
    }else if(sortSelect.value=="依下價排序"){
        newData.sort((a,b)=>a.下價-b.下價);
        renderData();
    }else if(sortSelect.value=="依平均價排序"){
        newData.sort((a,b)=>a.平均價-b.平均價);
        renderData();
    }else if(sortSelect.value=="依交易量排序"){
        newData.sort((a,b)=>a.交易量-b.交易量);
        renderData();
    }
})