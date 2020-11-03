
var toDoEntryBox = document.getElementById("todo-entry-box"); // Input Box
var toDoList = document.getElementById("todo-list");          //TodoList


//----->Add Button
var addButton = document.getElementById("add-button");
addButton.addEventListener("click",addToDoItem);

function addToDoItem(){
	var itemText = toDoEntryBox.value;
	newToDoItem(itemText,false);
}


//---->clear completed button
var clearButton = document.getElementById("clear-completed-button");
clearButton.addEventListener("click",clearCompletedToDoItems);

function clearCompletedToDoItems() {
	var completedItems = toDoList.getElementsByClassName("completed");

	while(completedItems.length>0)
		completedItems.item(0).remove();
}


//----->Empty List Button

var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click",emptyList);

function emptyList() {
	var toDoItem = toDoList.children;
	while(toDoItem.length>0){
		toDoItem.item(0).remove();
	}
	
}


//---->Save Button
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click",saveList);

function saveList() {
	var toDos = [];

	for(var i=0;i<toDoList.children.length;i++)
	{
		var toDo = toDoList.children.item(i);

		var toDoInfo = {
			"task":toDo.innerText,
			"completed":toDo.classList.contains("completed")
		};
		toDos.push(toDoInfo);
	}
	localStorage.setItem("toDos", JSON.stringify(toDos));
 	
}

//--loadList function

function loadList() {
	if(localStorage.getItem("toDos")!=null){
		var toDos = JSON.parse(localStorage.getItem("toDos"));
		for(var i=0;i<toDos.length;i++)
		{
			var toDo = toDos[i];
			newToDoItem(toDo.task,toDo.completed);
		}
	}
}
loadList();


//---- to Add new toDoItem

function newToDoItem(itemText,completed){
	var toDoItem = document.createElement("li");
	var toDoText = document.createTextNode(itemText);
	toDoItem.appendChild(toDoText);

	if(completed){
		toDoItem.classList.add("completed");
	}
	toDoList.appendChild(toDoItem);
	toDoItem.addEventListener("dblclick",toggleToDoItemState);
}

//----function to make list item complete and incomplete
function toggleToDoItemState() {
	if(this.classList.contains("completed")){
		this.classList.remove("completed");
	}else{
		this.classList.add("completed");
	}
}
