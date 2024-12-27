var inputbox = document.getElementById("ip");
var displayContainer = document.getElementById("display");

var store = JSON.parse(localStorage.getItem('task')) || []; 
window.onload = ()=>{
    displayContainer.innerHTML = ""; 
    store.forEach(task => {
        createTaskElement(task);
    });
}

function createTaskElement(task)
{
   var para = document.createElement("p");
    var del = document.createElement("input");
   
    var completebtn = document.createElement("input");
    completebtn.type = "button";
    completebtn.id ="cmptbtn";
    completebtn.value="complete";

    del.type ="button";
    del.value ="Delete";
    del.id = "delbtn";
    
    para.innerHTML = task;
    para.appendChild(completebtn);
    para.appendChild(del);
    displayContainer.appendChild(para);
    
    inputbox.value="";
    completebtn.addEventListener("click", () => {
        para.style.textDecoration = "line-through";
        para.style.opacity = "0.6";
        completebtn.disabled = true; 
    });
    del.addEventListener('click',()=>
    {
        para.remove();
        var index = store.indexOf(task);
        store.splice(index,1);
        localStorage.setItem('task',JSON.stringify(store));
    });
    para.addEventListener('dblclick',() => editTask(para,task));
}

function editTask(para,task)
    {
      var edit_inputbox = document.createElement("input");
      edit_inputbox.type ="text";
      edit_inputbox.value=task;
      inputbox.value =" ";
      para.innerHTML = "";
      para.appendChild(edit_inputbox);   
     
        edit_inputbox.addEventListener('blur', () => 
            {
            var updatedTask = edit_inputbox.value.trim();
            if (updatedTask === "") 
                {
                edit_inputbox.focus(); 
            }
             else
             {
                var index = store.indexOf(task);
                store[index] = updatedTask;
                localStorage.setItem('task', JSON.stringify(store)); 
                para.innerHTML = updatedTask; 
                
                var completebtn = document.createElement("input");
                completebtn.type = "button";
                completebtn.id ="cmptbtn";
                completebtn.value="complete";
                completebtn.addEventListener("click", () => {
                    para.style.textDecoration = "line-through";
                    para.style.opacity = "0.6";
                    completebtn.disabled = true; 
                });
                para.appendChild(completebtn);
                
                para.appendChild(createDeleteButton(para, updatedTask)); 
            }
        });
        edit_inputbox.focus();
    

    }
function addtodo()
{
    var task = inputbox.value;
    if(task ==="")
    {  
        alert("Please enter your task!");
        return;
    }
    else if(task === " ")
        return;
        store.push(task);
        localStorage.setItem('task',JSON.stringify(store));
        createTaskElement(task);
        inputbox.value="";
}
function createDeleteButton(para, task) {
    var del = document.createElement("input");
    del.type = "button";
    del.value = "Delete";
    del.id = "delbtn";
    del.addEventListener('click', () => {
        para.remove();
        var index = store.indexOf(task);
        store.splice(index, 1);
        localStorage.setItem('task', JSON.stringify(store));
    });
    return del;
}