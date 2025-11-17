
const KEY = "task_T1";

export function loadTasks() {
    try{
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    }catch(e){
        console.log("loadTasks error", e);
        return null
    }
}

export function saveTasks(tasks){
    try{
        localStorage.setItem(KEY,JSON.stringify(tasks));
    }catch (e) {
        console.error("SaveTasks error", e);
        
    }
}