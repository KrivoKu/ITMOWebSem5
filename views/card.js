import API from "../api/api.js";
import Drop from "./drop.js";
import UserAPI from "../api/UserAPI.js";
import UserSelect from "./userSelect.js";

export default class Card {
    constructor(id, text, userID, boardID) {
        const dropzone = Drop.createDropZone();
        this.elements = {}
        this.user = UserAPI.getUsers().find(user => user.id == userID)
        const userSelect = UserSelect.createUserSelect(this.user, id, boardID)
        this.elements.root = Card.createRoot();
        this.elements.root.appendChild(userSelect)
        this.elements.root.appendChild(dropzone);
        this.elements.input = this.elements.root.querySelector(".card")
        this.boardID = boardID

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = text;
        this.text = text
        this.elements.root.addEventListener('dblclick', () => {
            API.deleteCard(boardID, id)
            this.elements.root.parentElement.removeChild(this.elements.root)
            this.elements.input.removeEventListener('blur', onBlur);
        })


        const onBlur = () => {
            const newText = this.elements.input.textContent.trim();

            if (newText === this.text) {
                return;
            }

            this.text = newText;

            API.updateCard(this.boardID, id, {
                content: this.text
            })
        }

        this.elements.input.addEventListener('blur', onBlur)
        this.elements.root.addEventListener('dragstart', e => {
            e.dataTransfer.setData("text/plain", id);
        })

        this.elements.input.addEventListener('drag', e => {
            e.preventDefault()
        })
    }


    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body)
        return range.createContextualFragment(`
        <div class="cards" draggable="true">
            <div contenteditable="true" class="card"></div>
            <div class="dropzone"></div>
         </div>
        `).children[0];
    }
}



