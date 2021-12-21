import Boards from "./views/boards.js";
import API from "./api/api.js";

const boards = new Boards(
    document.querySelector(".boards")
)

const select = document.querySelector('.board_select')

function updateSelect(){
    select.addEventListener('click', ()=>{
        select.innerHTML = ''
        for(const board of API.getBoards()) {
            const opt = document.createElement('option');
            opt.value = board.id;
            opt.innerHTML = board.title;
            select.appendChild(opt)
        }
    })

    select.addEventListener('change', ()=>{
        const value = select.options[select.selectedIndex].value
        boards.switchBoard(value)
    })
}

updateSelect()

const addBoardButton = document.querySelector(".Add_board")
addBoardButton.addEventListener("click",() => API.addBoard())

