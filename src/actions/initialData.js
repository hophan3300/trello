export const initialData = {
   boards: [
     {
        id: 'board-1',
        columnOrder: ['column-1','column-2','column-3'],
        column: [
           {
              id: 'column-1',
              boardId: 'board-1', 
              title: 'todo column',
              cardOrder: ['card-1','card-2','card-3','card-4','card-5','card-6','card-7'],
              cards: [
                 { id: 'card-1', boardId: 'board-1', columnId: 'column-1', title: 'title cad 1',        cover: 'https://static-zmp3.zadn.vn/skins/common/logo600.png'
                 },
                 { id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'title cad 2',        cover: null
                 },
                 { id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'title cad 3',        cover: null
                 },
                 { id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'title cad 4',        cover: null
                 },
                 { id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'title cad 5',        cover: null
                 },
                 { id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'title cad 6',        cover: null
                 },
                 { id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'title cad 7',        cover: null
                 },
              ]
           },
           {
            id: 'column-2',
            boardId: 'board-1', 
            title: 'improgress column',
            cardOrder: ['card-8','card-9','card-10'],
            cards: [
               { id: 'card-8', boardId: 'board-1', columnId: 'column-2', title: 'title cad 8',        cover: null
               },
               { id: 'card-9', boardId: 'board-1', columnId: 'column-2', title: 'title cad 9',        cover: null
               },
               { id: 'card-10', boardId: 'board-1', columnId: 'column-2', title: 'title cad 10',        cover: null
               },
            ]
         },
         {
            id: 'column-3',
            boardId: 'board-1', 
            title: 'done column',
            cardOrder: ['card-11','card-12','card-13'],
            cards: [
               { id: 'card-11', boardId: 'board-1', columnId: 'column-3', title: 'title cad 11',        cover: null
               },
               { id: 'card-12', boardId: 'board-1', columnId: 'column-3', title: 'title cad 12',        cover: null
               },
               { id: 'card-13', boardId: 'board-1', columnId: 'column-3', title: 'title cad 13',        cover: null
               },
            ]
         }
        ]
     }
   ]
}