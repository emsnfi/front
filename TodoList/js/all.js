const inputText = document.querySelector(".inputText");
const addBtn = document.querySelector(".btn_add");
const list = document.querySelector(".list"); // ul 標籤
let data = [];

//新增事項

addBtn.addEventListener("click", addTodo);
function addTodo() {
  
  if (inputText.value.trim() === "") {
    alert("請輸入待辦事項");
    return;
  }
  let date = new Date();

  let obj = {
    content: inputText.value,
    id: new Date().getTime(),
    status: "",
    time: date.toISOString().split('T')[0]

  };
  data.unshift(obj); // 加入進 data 中
  inputText.value = "";
  updateList();
}
// 按Enter新增
inputText.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    addTodo();
  }
});


// 渲染
function render(data) {
    let str = "";
    data.forEach((item, index) => {
      str += `<li data-id=${item.id}>
             <label class="checkbox" for="">
               <input type="checkbox" ${item.status} data-num="${index}" />
               <span>${item.content}</span>
               
             </label>
             <span class="time">${item.time}</span>
            <a href="#" class="delete" data-num="${index}"></a>
          </li>`;
    });
    list.innerHTML = str;
  }

//刪除
list.addEventListener("click", (e)=> {
    let num = e.target.getAttribute("data-num");
    let id = parseInt(e.target.closest("li").dataset.id);
    if (e.target.classList.contains("delete")) {
      e.preventDefault();
      data.splice(num, 1); // 刪除選取
    }
    
    else {
      data.forEach((item) => {
        if (item.id === id) {
          if (item.status === "") {
            item.status = "checked";
          } else {
            item.status = "";
          }
        }
      });
    }
    updateList();
  });



//轉換(全部、待完成、已完成)
const tab = document.querySelector(".tab");
let listype = "all";
tab.addEventListener("click", toggleTab);
function toggleTab(e) {
    
    listype = e.target.dataset.tab;
    
  let tabs = document.querySelectorAll(".tab li");
  tabs.forEach(function (e) { // 清空所有 tab 樣式
    e.setAttribute("class", "");
  });
  e.target.setAttribute("class", "active"); // 只有點擊的加入 active 樣式
  updateList();
}
function updateList() {
  let showData = [];
  if (listype === "all") {
    showData = data;
  } else if (listype === "working") {
    showData = data.filter((item) => item.status === "");
  } else {
    showData = data.filter((item) => item.status === "checked");
  }
  //待完成項目
  const workNum = document.querySelector(".workNum");
  let todoLength = data.filter((item) => item.status === "");
  workNum.textContent = todoLength.length;
  render(showData);
}
updateList();
//清除已完成項目
const deleteDone = document.querySelector(".deleteDone");
deleteDone.addEventListener("click", function (e) {
  e.preventDefault();
  data = data.filter((item) => item.status === "");
  updateList();
});
