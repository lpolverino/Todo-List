import { format, compareAsc , isThisWeek} from "date-fns"

export default function createTodo(title, description, date, priority, cheked, id){
    
    const isFromToday = () =>{
        let today = format( Date.now(), 'dd/MM/yyyy')
        today = today.split("/")
        today = new Date(today[2], today[1] - 1, today[0])
        return  compareAsc(today, date) === 0
    }
    const isFromThisWeek= () =>{
        console.log(date);
        return isThisWeek(date)
    }
    const isImportant= () => {
        return priority === 1 
    }
    const isCompleted= () => {
        return cheked 
    }

    return{
        title,
        description,
        date,
        priority,
        cheked,
        id,
        isFromToday,
        isFromThisWeek,
        isImportant,
        isCompleted,

    }
} 