import API from "../api/api.js";

export default class Drop{
    static createDropZone(){
        const range = document.createRange();
        range.selectNode(document.body)
        const dropzone = range.createContextualFragment('<div class="dropzone"></div>').children[0]
        dropzone.addEventListener('dragover', e =>{
            e.preventDefault();
            dropzone.classList.add('dropzone--active');
        })
        dropzone.addEventListener('dragleave', e=>{
            e.preventDefault();
            dropzone.classList.remove('dropzone--active')
        })
        dropzone.addEventListener('drop', e=>{
            e.preventDefault();
            dropzone.classList.remove('dropzone--active')
            const column = dropzone.closest('.column')
            const columnID = Number(column.dataset.id)
            const dropzones = Array.from(column.querySelectorAll('.dropzone'))
            const dropzoneID = dropzones.indexOf(dropzone)
            const cardID = Number(e.dataTransfer.getData('text/plain'))
            //console.log(cardID)
            const card = document.querySelector(`[data-id="${cardID}"]`)
            console.log("parent =" , dropzone.parentElement)
            const insertTo = dropzone.parentElement

            console.log(insertTo)
            insertTo.after(card);
            console.log(card)
            API.updateCard(1, cardID, {
                columnID: columnID,
                position: dropzoneID
            })
        })

        return dropzone
    }
}