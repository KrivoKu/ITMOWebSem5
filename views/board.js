import Column from "./column.js";
import API from "../api/api.js";

export default class Board{
    constructor(id, title, columns) {
        this.elements = {}
        this.elements.root = Board.createRoot()
        this.elements.id = id
        this.elements.title = title;
        this.elements.columns = this.elements.root.querySelector(".column")
        this.columns = columns

        this.elements.root.dataset.id = id;
        //TODO:добавить вьюху для карточки и колонки, создать все колонки


        const brd = API.getColumns(id)
        let i = 0
        for(const col of brd.columns){
            console.log(col)
            this.renderData(col, i)
            i++;
        }

    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body)
        return range.createContextualFragment(`
            <div class="board">

            </div>
        `).children[0];
    }

    renderData(data, i){
        const column = new Column(data.id, this.columns[i].title);
        console.log(data.title)
        this.elements.root.appendChild(column.elements.root)
    }

}