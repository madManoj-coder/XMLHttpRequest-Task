const cl = console.log;

let tableTodo = document.getElementById("table-todo")
let statusFilter = document.getElementById("statusFilter")
let todoBody = document.getElementById("todoBody")
let all = document.getElementById("all")
let completed = document.getElementById("completed")
let inComplete = document.getElementById("inComplete")

let todoUrl = `https://jsonplaceholder.typicode.com/todos`;

let todoArr = []


const genericFun = (methodName, apiUrl) =>{
    let xhr = new XMLHttpRequest();

    xhr.open(methodName, apiUrl)

    xhr.send()

    xhr.onload = function () {
        if(xhr.status >= 200 || xhr.status <= 299 && xhr.readyState === 4){
            cl(xhr.response)

            if(methodName === "GET"){
                 todoArr = JSON.parse(xhr.response)
                templating(todoArr)
            }
        }
    }
}


genericFun("GET", todoUrl)


const templating = (arr) => {
    let result = ``;
    arr.forEach(ele => {
        result += `<tr>
                    <td>${ele.userId}</td>
                    <td>${ele.title}</td>
                    <td>${ele.completed ? 'Completed' : 'Incomplete'}</td>
                  </tr> `
    });

    todoBody.innerHTML = result;
}


function filterTodos(status) {
    if (status === 'all') {
    templating(todoArr)
    } else {
      const filteredTodos = todoArr.filter(todo => {
        return todo.completed === (status === 'true');
      });
      templating(filteredTodos)
    }
  }

const onChangeBtn = (eve) => {
    filterTodos(eve.target.value)
}


  statusFilter.addEventListener("change", onChangeBtn)