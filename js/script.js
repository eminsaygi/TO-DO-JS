

//DOM Selectors
let basicToast = document.querySelector('.toast')
let closeToast = document.querySelector('.close-toast')
let toastMessage = document.querySelector('.toast-body')
let footerText = document.querySelector('#footer-text')
let toDoListDOM = document.querySelector("#list")
let whatToDo = document.querySelector("#task")
let newElement = document.querySelector(".newElement")
let todos = []

//Live Footer Text
footerText.innerHTML = `${"&copy; "}${new Date().getFullYear()}${' All Rights Reserved '}${'<a class="text-white text-decoration-none" href="https://github.com/eminsaygi">@eminsaygi</a>'}`

//ADD with Enter Key
whatToDo.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault()
        addToDo(whatToDo.value)
    }
})

//ADD with Click Event
newElement.addEventListener('click', function (e) {
    e.preventDefault()
    addToDo(whatToDo.value)
})

// Toast Close Button Event
closeToast.addEventListener('click', function (e) {
    basicToast.classList.remove("show")
})

// Add Function
function addToDo(item) {
    if (item?.trim().length > 0) {
        const todo = {
            num: todos.length,
            todo: whatToDo.value,
            completed: false
        }
        toastNotice("You have successfully added the new task.")
        todos.push(todo)
        addToLocalStorage(todos)
        whatToDo.value = ""
    } else {
        whatToDo.value = ""
        toastNotice("You cannot add empty tasks.Try writing something.")
    }
}

// Notice Function
function toastNotice(message) {
    basicToast.classList.add("show")
    toastMessage.innerHTML = `${message}`
    setTimeout(function () { basicToast.classList.remove("show") }, 2000)
}

function render(todos) {
    toDoListDOM.innerHTML = ''
    todos.forEach(e => {
        let liDOM = document.createElement("li")
        liDOM.setAttribute('arrnum', e.num)
        liDOM.innerHTML = `${e.todo}${"<span style='color:#e84118' class='close'>×</span>"}`
        if (e.completed === true) {
            liDOM.classList.add("checked")
        }
        else if (e.completed === false) {
            liDOM.classList.remove("checked")
        }
        toDoListDOM.appendChild(liDOM)
    })
}

function addToLocalStorage(todos) {
    localStorage.setItem('TODOS', JSON.stringify(todos))
    render(todos)
}

function getFromLocalStorage() {
    let saved = localStorage.getItem("TODOS")
    if (saved) {
        todos = JSON.parse(localStorage.getItem("TODOS"))
        render(todos)
    }
}

getFromLocalStorage()

// Delete Function
function deleteToDO(target, close) {
    let item = todos.find(item => item.num === Number(target))
    todos.splice(todos.indexOf(item), 1)
    addToLocalStorage(todos)
    close.parentNode.remove()
    toastNotice("You have successfully deleted the task called <br>'" + item.todo + "'")
}

toDoListDOM.addEventListener('click', function (e) {
    const closeBtn = e.target
    if (closeBtn.classList.contains('close')) {
        const targetArr = closeBtn.parentNode.getAttribute('arrnum')
        deleteToDO(targetArr, closeBtn)
    }
})

// Checked Function
function checkedToDo(checked, target) {
    let checkItem = todos.find(item => item.num === Number(target))
    if (checkItem.completed == false) {
        checkItem.completed = true
        addToLocalStorage(todos)
    } else {
        checkItem.completed = false
        addToLocalStorage(todos)
    }
}

toDoListDOM.addEventListener('click', function (e) {
    const checked = e.target
    if (checked.tagName === 'LI') {
        const targetX = checked.getAttribute('arrnum')
        checkedToDo(checked, targetX)
    }
})

