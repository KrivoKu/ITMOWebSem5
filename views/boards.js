
import Board from "./board.js";

export default class Boards{
    constructor(root) {
        this.root = root
        //TODO:добавить вьюху для карточки и колонки, создать все колонки
        Boards.boards().forEach(board =>{
            const newBoard = new Board(board.id, board.title, board.columns);
            this.root.appendChild(newBoard.elements.root);
        });
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