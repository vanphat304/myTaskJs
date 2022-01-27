var taskList = [];
var taskCompleteList = [];
var flag = 0;
function addtask() {
  const status = document.getElementById("textIP").value;
  if (!checkRequired(status, "error")) return;
  var myTask = new task(status);
  taskList.push(myTask);
  document.getElementById("textIP").value = "";
  saveData();
  rendertask();
}
function rendertask(data) {
  var hmtlContent = "";

  data = data || taskList;
  if (data === taskList) {
    for (var i = 0; i < data.length; i++) {
      hmtlContent += `
        <div class="content__detail__button" >
            ${data[i].status}
        <div>
            <button style="cursor: pointer;" class="btn-warning" onclick="deleteTask('${data[i].id}');" >
            <i class="fa fa-trash"></i>
    </button>
    <button style="cursor: pointer;" class="btn-warning" onclick="getTask('${data[i].id}');" >
        <i class="fa fa-pencil"></i>
    </button>
    <button class="buttoncheck" style="cursor: pointer;"  onclick="completeTask('${data[i].id}');" >
        <i class="fa fa-check"></i>
    </button></div>
        </div>
        `;
    }

    document.getElementById("taskContent").innerHTML = hmtlContent;
  } else {
    for (var i = 0; i < data.length; i++) {
      hmtlContent += `
            <div class="content__detail__button" >
                ${data[i].status}
            <div>
                <button style="cursor: pointer;" class="btn-warning" onclick="deleteTask('${data[i].id}');" >
                <i class="fa fa-trash"></i>
        </button>
        <button style="cursor: pointer;" class="btn-warning" >
            <i class="fa fa-check"></i>
        </button></div>
            </div>
            `;
    }
    document.getElementById("taskComplete").innerHTML = hmtlContent;
  }
}

//---------------------------------VALIDATION-------------

function deleteTask(id) {
  flag = 0;
  var index = findByID(id);
  if (index !== -1) {
    console.log(flag);
    if (flag == 1) {
      taskList.splice(index, 1);
      flag = 0;
    } else {
      taskCompleteList.splice(index, 1);
    }
  }
  saveData();
  rendertask();
  rendertask(taskCompleteList);
}

//-------------------------fix task-------------
function getTask(id) {
  if (findByID(id) !== -1) {
    document.getElementById("textIP").value = taskList[findByID(id)].status;
    document.getElementById("taskID").value = taskList[findByID(id)].id;
  }
  document.getElementById("btnSave").style.display = "block";
  document.getElementById("btnCancel").style.display = "block";
  document.getElementById("fixButton").style.display = "flex";
}
//---------------------cap nhat lai thong tin--------------
function updateTask() {
  const index = findByID(document.getElementById("taskID").value);
  taskList[index].status = document.getElementById("textIP").value;
  document.getElementById("btnSave").style.display = "none";
  document.getElementById("btnCancel").style.display = "none";
  document.getElementById("textIP").value = "";
  saveData();
  rendertask();
}
//------------------huy cap nhat -------------
function cancelfix() {
  document.getElementById("textIP").value = "";
  document.getElementById("btnSave").style.display = "none";
  document.getElementById("btnCancel").style.display = "none";
}
function completeTask(id) {
  if (findByID(id) !== -1) {
    taskCompleteList.push(taskList[findByID(id)]);
    console.log(taskCompleteList);
    taskList.splice(findByID(id), 1);
  }

  saveData();
  rendertask();
  rendertask(taskCompleteList);
}
//------------------------kiem tra nhap lieu--------------
function checkRequired(value, errorId) {
  if (value) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  }
  document.getElementById(errorId).innerHTML = "*trường này bắt buộc nhập";
  return false;
}

//---------------------ham tim qua id ----------- */
function findByID(id) {
  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      flag++;
      return i;
    }
  }
  for (var i = 0; i < taskCompleteList.length; i++) {
    if (taskCompleteList[i].id == id) {
      flag = 0;
      return i;
    }
  }

  return -1;
}
//---------------------luu du lieu xuong localStorage------------
function saveData() {
  localStorage.setItem("listTask", JSON.stringify(taskList));
  localStorage.setItem("taskCompleteList", JSON.stringify(taskCompleteList));
  taskCompleteList;
}
function fetchData() {
  const localTaskList = localStorage.getItem("listTask");
  const localTaskListcp = localStorage.getItem("taskCompleteList");

  if (localTaskList && localTaskListcp) {
    taskList = JSON.parse(localTaskList);
    taskCompleteList = JSON.parse(localTaskListcp);
    rendertask();
    rendertask(taskCompleteList);
  }
}
function getDay() {
  var nowDay = new Date();
  var today =
    nowDay.getDate() +
    "/" +
    (nowDay.getMonth() + 1) +
    "/" +
    nowDay.getFullYear();
  document.getElementById("date").innerHTML = today;
}
getDay();
fetchData();
