import UserAPI from "../api/UserAPI.js";
import API from "../api/api.js";

export default class UserSelect{

    static createUserSelect(user, cardID, boardID){
        const range = document.createRange();
        range.selectNode(document.body)
        const select = range.createContextualFragment('<select class="person"></select>').children[0]
        for(const user of UserAPI.getUsers()) {
            const opt = document.createElement('option');
            opt.value = user.id;
            opt.innerHTML = user.name + ' ' + user.surname;
            select.appendChild(opt)
        }

        if(user)
            for(const option of select.options){
            if(option.value == user.id)
                option.selected = true
            }



        select.addEventListener('change', e =>{
                for(const option of select.options){
                    option.removeAttribute('selected')
                }

                select[e.target.value - 1].setAttribute('selected','selected')
                const card = API.getCard(cardID)
                UserAPI.addTaskToUser(e.target.value, cardID)
                if(user != null)
                    UserAPI.removeTaskFromUser(card.userID, cardID)

                card.userID = UserAPI.getUsers().find(user => user.id == e.target.value).id
                API.updateCard(boardID, card.id, {userID: e.target.value})
            }
        )


        return select
    }
}