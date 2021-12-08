import API from "../api/api.js";
import Card from "./card.js";

export default class Column{
    constructor(id, title) {
        this.elements = {};
        this.elements.root = Column.createRoot()
        this.elements.title = this.elements.root.querySelector(".column_title")
        this.elements.cards = this.elements.root.querySelector(".cards")
        this.elements.addCardBtn = this.elements.root.querySelector(".add_item")
        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        this.elements.addCardBtn.addEventListener('click', ()=>{
            const card = API.addCard(1, id, '')
            this.renderData(card)
        })

        const cards = API.getCards(1,id)
        for(const card of cards){
            this.renderData(card)
        }
    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body)
        return range.createContextualFragment(`
        <div class="column">
           <div class="column_title"></div>
           <div class="cards"></div>
           <button class="add_item" type="button">+ Добавить</button>
       </div>`).children[0];
    }

    renderData(data){
        //TODO: рендер карточки
        const card = new Card(data.id, data.content);

        this.elements.cards.appendChild(card.elements.root)
    }
}