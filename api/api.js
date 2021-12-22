

export default class API{
    static getCards(boardID, columnID){
        const brd = API.getColumns(boardID)
        let column = null
        for(const col of brd.columns){
            if(col.id === columnID)
                column = col
        }
        if(!column)
            return [];
        return column.items;
    }

    static getCard(cardID){
        const boards = this.getBoards()
        for(const board of boards){
            const columns = this.getColumns(board.id)
            for(let i = 0; i < 3; i++){
                const column = columns.columns[i]
                const itemFound = column.items.find(item => item.id == cardID)
                if(itemFound)
                    return itemFound
                }
            }
        }

    static addCard(boardID, columnID, desc){
        const data = read_data();
        const brd = data.find(board => board.id === boardID)
        let column = null
        for(const col of brd.columns){
            if(col.id === columnID)
                column = col
        }
        const item = {
            userID: null,
            id: Math.floor(Math.random()*100000),
            desc,
        };

        if(!column){
            throw new Error("Такой колонки нет");
        }
        console.log(column);
        column.items.push(item);
        save_data(data);

        return item;
    }

    static deleteCard(boardID, cardID){
        const data = read_data();
        const brd = data.find(board => board.id === boardID)
        console.log(brd)

        for(const column of brd.columns) {
            const item = column.items.find(item => item.id === cardID)

            if (item) {
                column.items.splice(item,1)
            }
        }
        save_data(data)

    }

    static updateCard(boardID, cardID, newProps){
        const data = read_data();
        const brd = data.find(board => board.id === boardID)
       // console.log(brd)
       // const {item, currentColumn} = (() => {
       //     for (const column of brd.columns) {
       //         console.log(column)
       //         const item = column.items.find(item => item.id === cardID);
//
       //         if (item) {
       //             return {item, column};
       //         }
       //     }
       // });
       //
        let item = null
        let currentColumn = null

        for(let i = 0; i < 3; i++){
            const column = brd.columns[i]
            const itemFound = column.items.find(item => item.id == cardID)
            if(itemFound) {
                item = itemFound
                currentColumn = column
            }
        }

        if (!item) {
            throw new Error("Item not found.");
        }


        item.content = newProps.content === undefined ? item.content : newProps.content;
        item.userID = newProps.userID  === undefined ? null : newProps.userID
        if (newProps.columnID !== undefined && newProps.position !== undefined) {
            const targetColumn = brd.columns.find(column => column.id === newProps.columnID);

            if (!targetColumn) {
                throw new Error("Target column not found.");
            }
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save_data(data);
    }

    static getColumns(boardID){
        const brd = read_data().find(board => board.id === boardID)
        return brd
    }

    static getBoards(){
        return read_data();
    }

    static addBoard(title){
        const boards = read_data()
        const newBoard = {
                id: Math.floor(Math.random()*100000),
                title: title,
                columns: [{
                    id: 1,
                    title: "Новое",
                    items: []
                },
                    {
                        id: 2,
                        title: "В работе",
                        items: []
                    },
                    {
                        id: 3,
                        title: "Сделано",
                        items: []
                    }],
            }
            boards.push(newBoard)
            save_data(boards)
        }
}

function read_data(){
    const json_string = localStorage.getItem("boards_data")

    if(!json_string){
        return [{
            id: 1,
            title: 'Первый проект',
            columns: [{
                id: 1,
                title: "Новое",
                items: []
            },
                {
                    id: 2,
                    title: "В работе",
                    items: []
                },
                {
                    id: 3,
                    title: "Сделано",
                    items: [],
                }],
        }];

    }

    return JSON.parse(json_string)
}



function save_data(data){
    localStorage.setItem("boards_data", JSON.stringify(data))
}


function check_data(data){
    for(const item of data){
        if(!item.id || !item.title || !item.columns)
            data.splice(item, data.indexOf(item))
    }
}
