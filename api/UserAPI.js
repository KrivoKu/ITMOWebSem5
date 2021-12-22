export default class UserAPI{
    static getUsers(){
        return read_users_data()
    }

    static addTaskToUser(UserID, TaskID){
        const users = read_users_data()
        let _user = null
        for(const user of users){
            if(user.id == UserID)
                _user = user;
        }

        const taskId = _user.TaskIDs.find(taskID => taskID == taskID)
        if(taskId)
            _user.TaskIDs.push(taskId)

        save_user_data(users)
    }

    static removeTaskFromUser(UserID, TaskID){
        const users = read_users_data()
        let _user = null
        for(const user of users){
            if(user.id == UserID)
                _user = user;
        }

        const taskId = _user.TaskIDs.find(taskID => taskID == taskID)
        if(taskId)
            _user.TaskIDs.remove(TaskID)

        save_user_data(users)
    }
}

function read_users_data(){
    const json_string = localStorage.getItem("users_data")

    if(!json_string){
        return [
            {
                id: 1,
                name: 'Alexandr',
                surname: 'Alexandrov',
                TaskIDs: []
            },
            {
                id: 2,
                name: 'Ivan',
                surname: 'Ivanov',
                TaskIDs: []
            },
            {
                id: 3,
                name: 'Moisha',
                surname: 'Rabinovich',
                TaskIDs: []
            }
        ];

    }

    return JSON.parse(json_string)
}

function save_user_data(data){
    localStorage.setItem("users_data", JSON.stringify(data))
}


