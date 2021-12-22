import Boards from "./views/boards.js";
import API from "./api/api.js";

const boards = new Boards(
    document.querySelector(".boards")
)

const select = document.querySelector('.board_select')

function updateSelect(){
    let lastSelect = null
    select.addEventListener('click', ()=>{
        select.innerHTML = ''
        for(const board of API.getBoards()) {
            const opt = document.createElement('option');
            opt.innerHTML = board.title;
            opt.value = board.id;
            if(lastSelect != null)
                if(opt.value == lastSelect.value)
                    opt.selected = true
            select.appendChild(opt)
        }
        if(API.getBoards().length === 1){
            select.options[0].selected = true
            lastSelect = select.options[0]
        }
    })

    select.addEventListener('change', e =>{
        lastSelect = select.options[select.selectedIndex]
        lastSelect.selected = true;
        const value = select.options[select.selectedIndex].value
        boards.switchBoard(value)
    })
}

updateSelect()

const addBoardButton = document.querySelector(".Add_board")
addBoardButton.addEventListener("click",() => {
    API.addBoard(newName)
    newBoardName.textContent = ''}
)

const newBoardName = document.querySelector('.Boards_name')
let newName = null;
newBoardName.addEventListener('blur', ()=>{
    newName = newBoardName.textContent;
})



