import Board from "./board.js";
import API from "../api/api.js";

export default class Boards{
    constructor(root) {
        this.root = root
        this.elements = []
        this.elements.boards = API.getBoards();
        this.elements.firstBoard = new Board(this.elements.boards[0].id,this.elements.boards[0].title, this.elements.boards[0].columns)
        this.root.appendChild(this.elements.firstBoard.elements.root)
    }

    switchBoard(id){
        let board = null
        for(const brd of API.getBoards()){
            if(brd.id == id) {
                board = brd
            }
        }
        console.log(board)
        const boardView = new Board(board.id, board.title, board.columns)
        this.root.removeChild(this.root.children[0])
        this.root.appendChild(boardView.elements.root)
    }

    static boards(){
        return [
            {
                id: 1,
                title: 'First',
                columns: [{
                    id: 1,
                    title: "Новое",
                    items: []
                    },
                    {
                        id: 2,
                        title: "Делается",
                        items: []
                    },
                    {
                        id: 3,
                        title: "Сделано",
                        items: []
                    }],
            }
        ]
    }
}

