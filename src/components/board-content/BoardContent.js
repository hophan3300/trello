import React,{useState, useEffect, useRef} from 'react'
import {isEmpty, cloneDeep} from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import{ Container as BootstrapContainer, 
   Row,  Col, Form, Button 
} from 'react-bootstrap'

import './board-content.scss'


import Column from'components/column/Column'
import {mapOrder} from 'utilities/sorts'
import {applyDrag} from 'utilities/drag-drop'
import { fetchBoard, createNewColumn, updateBoard, updateColumn, updateCard} from 'actions/api'

const BoardContent = () => {

   const [board, setBoard] = useState({})

   const [columns, setColumns] = useState([])

   const [addColumn, setAddColumn] = useState(false)

   const addColumnRef = useRef(null)

   const [newColumnTitle, setNewColumnTitle] = useState('')

   const onChangeNewColumnTitle = (e) => {
      setNewColumnTitle(e.target.value)
   }

   useEffect(() => {
     const boardId = '618d771ff178fb7ef3087470'
     fetchBoard(boardId).then(board => {
         setBoard(board)
         setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
     })

   }, [])

   useEffect(() => {
      if(addColumnRef && addColumnRef.current){
         addColumnRef.current.focus()
         addColumnRef.current.select()
      }
   }, [addColumn])

   if(isEmpty(board)){
      return(
         <div className="not-found" style={{pading: 10, color:'white'}}>Board not found</div>
      )
   }

   const onColumnDrop = (dropResult) => {

      let newColumns = cloneDeep(columns)
      newColumns = applyDrag(newColumns, dropResult)
      
      let newBoard = cloneDeep(board)
      newBoard.columnOrder = newColumns.map(item => item._id)
      newBoard.column = newColumns

      setColumns(newColumns)
      setBoard(newBoard)
      // call api update columnOrder in board
      updateBoard(newBoard._id, newBoard).catch(() => {
         // neu co loi xay ra, tra ve nhu gia tri cu
         setColumns(columns)
         setBoard(board)
      })
      
   }

   const onCardDrop = (columnId,dropResult) => {
      if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){
         let newColumns = cloneDeep(columns)

         let currentColumn = newColumns.find(item => item._id === columnId)
         currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
         currentColumn.cardOrder = currentColumn.cards.map(item => item._id)
         setColumns(newColumns)
         if(dropResult.removedIndex !== null && dropResult.addedIndex !== null){
            // move trong cung 1 column
            // chi can update lai cardOrder
            updateColumn(currentColumn._id, currentColumn).catch(() => {
               setColumns(columns)
            })
         }else{
            // move khac column
            // update lai column cu
            updateColumn(currentColumn._id, currentColumn).catch(() => {
               setColumns(columns)
            })
            if(dropResult.addedIndex !== null){
               let currentCard = cloneDeep(dropResult.payload)
               console.log(currentColumn)
               currentCard.columnId = currentColumn._id

               updateCard(currentCard._id, currentCard)
            }
         }
         
      }
      
   }

   const addNewColumn = () => {
      if(!newColumnTitle){
         addColumnRef.current.focus()
         return
      }

      const newColumnToAdd = {
         boardId: board._id,
         title: newColumnTitle.trim(),
      }

      createNewColumn(newColumnToAdd).then(column => {
         let newColumns = [...columns]
         newColumns.push(column)
         
         let newBoard = { ...board }
         newBoard.columnOrder = newColumns.map(item => item._id)
         newBoard.column = newColumns

         setColumns(newColumns)
         setBoard(newBoard)
         setNewColumnTitle('')
         setAddColumn(false)
      })
   }

   const onUpdateColumnState = (columnUpdate) => {
      const idColumnUpdate = columnUpdate._id

      let newColumns = [...columns]
      const columnIndexUpdate = newColumns.findIndex(item => item._id === idColumnUpdate)

      if(columnUpdate._destroy){
         // remove column
         newColumns.splice(columnIndexUpdate, 1)
      
      }else{
         // update column info ( if dont update, when drag and drop will not change title)
         newColumns.splice(columnIndexUpdate, 1, columnUpdate)
      }

      const newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(item => item._id)
      newBoard.column = newColumns

      setColumns(newColumns)
      setBoard(newBoard)
   }
   
   return (
      <div className="board-content">
       <Container
         orientation="horizontal"
         onDrop={onColumnDrop}
         getChildPayload={index => columns[index]}
         dragHandleSelector=".column-drag-handle"
         dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
         }}
       >
       {
          columns.map((item, index) => (
            <Draggable key={index}>
               <Column 
                  onCardDrop={onCardDrop} 
                  onUpdateColumnState={onUpdateColumnState} 
                  column={item}/>
            </Draggable>
          ))
       }
       </Container>
       <BootstrapContainer className="trello-container">
         { !addColumn &&
            <Row>
               <Col className="add-new-column" onClick={() => setAddColumn(true)}>
                  <i className="fa fa-plus icon"></i>Add another column
               </Col>
            </Row>
         }
         { addColumn && 
             <Row>
               <Col className="enter-new-column">
                <Form.Control 
                   size="sm" 
                   type="text" 
                   placeholder="Enter column title..." 
                   className="input-enter-new-column"
                   ref={addColumnRef}
                   value={newColumnTitle}
                   onChange={onChangeNewColumnTitle}
                   onKeyDown={event => (event.code === 'Enter') && addNewColumn()}
                  
                />
                <Button variant="success" size="sm" onClick={addNewColumn}>Add column</Button>
                <span className="cancel-icon" onClick={() => setAddColumn(false)}><i className="fa fa-trash icon"/></span>
               </Col>
            </Row>
         }
       </BootstrapContainer>
      </div>
   )
}

export default BoardContent
