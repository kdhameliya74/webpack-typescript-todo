import { HTML } from '../node_modules/jsx-dom/index'
import './assets/css/style.css'
interface todo {
    task: string,
    isComplete: boolean
}
export default class Form {
    private toDo: todo[] = [] //initialize as blank array
    private isEmpty: boolean
    createForm ():any {
        return `<form>
        <div class="container">
           <h2>TODO LIST</h2>
           <h3>Add Item</h3>
           <p>
              <input id="new-task" name="new-task" value="" type="text"><button type="button" id="add-btn">Add</button>
           </p>
           <p class="empty">Field should not empty</p>
           <h3>Todo</h3>
           <ul id="incomplete-tasks">
           <li style="text-align: center;color: #898888;font-size: 22px;">Schedule your TODO!!</li>
           </ul>
        </div>
     </form>`
    }
    addTodoEvent ():void {
        document.getElementById('add-btn').addEventListener('click', (e) => {
            let taskValue = (<HTMLInputElement>document.getElementById('new-task')).value
            if(taskValue) {
                (<HTMLInputElement>document.querySelector('.empty')).style.display = 'none'
                this.toDo.push({
                    task: taskValue,
                    isComplete: false 
                })
                this.displayingTaskList()
                this.addEventToTask()
            }else{
                // (<HTMLInputElement>document.querySelector('.empty')).style.display = 'block'
                const emptyInput = document.querySelector('.empty') as HTMLInputElement
                emptyInput.style.display = 'block'
            }
        })
    }
    displayingTaskList ():void {
        let liDom: string = ''
        if(this.toDo.length) {
            this.toDo.forEach((li,index) => {
                liDom += `<li><input type="checkbox"><label>${li.task}</label><button type="button" class="delete-task delete-task"">Delete</button></li>`
            })
        } else {
            liDom = `<li style="text-align: center;color: #898888;font-size: 22px;">Schedule your TODO!!</li>`
        }
        document.getElementById('incomplete-tasks').innerHTML = liDom
    }
    addEventToTask() {
        let deleteBtn = document.querySelectorAll('.delete-task') as NodeList // querySelectorAll return nodelist
        let completeBtn: NodeListOf<Element> = document.querySelectorAll('li input')
        deleteBtn.forEach((btn: Node, index:number) => {
            btn.addEventListener('click', () => this.deleteTask(index))
        })
        completeBtn.forEach((input: HTMLElement) => {
            input.addEventListener('change', () => this.completeTask(input))
        })
    }
    deleteTask(id: number):any {
        this.toDo.splice(id, 1)
        this.displayingTaskList()
        this.addEventToTask()
    }
    completeTask (input: HTMLElement):any {
        let nextEle = input.nextElementSibling
        if(!nextEle.classList.contains('completed')) {
            nextEle.classList.add('completed')
        } else {
            nextEle.classList.remove('completed')
        }
    }
}

