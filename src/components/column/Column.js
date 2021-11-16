import React,{ useState, useEffect, useRef} from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import {Dropdown, Form, Button} from 'react-bootstrap'


import './column.scss'

import Card from 'components/card/Card'
import {mapOrder} from 'utilities/sorts'
import ConfirmModal from 'components/common/ConfirmModal'
import { MODAL_ACTION_COFIRM } from 'utilities/constans'
import { saveContentWithEnterKey, selectAllInLineText } from 'utilities/contentEditable'
import { createNewCard, updateColumn } from 'actions/api'

const Column = (props) => {

   const { column, onCardDrop, onUpdateColumnState } = props

   const cards = mapOrder(column.cards, column.cardOrder, '_id')

   const [showConfirmModal, setShowConfirmModal] = useState(false)

   const [columnTitle, setColumnTitle] = useState('')

   const [addCard, setAddCard] = useState(false)

   const addCardRef = useRef(null)

   const [newCardTitle, setNewCardTitle] = useState('')

   useEffect(() => {
     if(addCardRef && addCardRef.current){
         addCardRef.current.focus()
         addCardRef.current.select()
     }
   }, [addCard])

   useEffect(() => {
      setColumnTitle(column.title)
   },[column.title])

   const handleColumnTitleChange = (e) => {
      setColumnTitle(e.target.value)
   }

   const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

   // xoa column
   const onConfirmModalAction = (type) => {
      if (type === MODAL_ACTION_COFIRM){           
         const newColumn = {
            ...column, 
            _destroy: true
         }

         updateColumn(newColumn._id, newColumn).then(column => {
            onUpdateColumnState(column)
         }) 
         
      }
      toggleShowConfirmModal()
   }

   // update column
   const handleColumnTitleBlur = () => {

     if(column.title !== columnTitle){
         const newColumn = {
            ...column, 
            title: columnTitle
         }

         updateColumn(newColumn._id ,newColumn).then(column => {
            column.cards = newColumn.cards     // update title column k bi mat card
            onUpdateColumnState(column)
         })
     }
   }

   const onChangeNewCardTitle = (e) => {
      setNewCardTitle(e.target.value)
   }
   
   const addNewCard = () => {
      if(!newCardTitle){
         addCardRef.current.focus()
         return
      }

      const newCardToAdd = {
         boardId: column.boardId,
         columnId: column._id,
         title: newCardTitle.trim(),
      }

      createNewCard(newCardToAdd).then(card => {
         let newColumn = { ...column }
         newColumn.cards.push(card)
         newColumn.cardOrder.push(card._id)
         
         setNewCardTitle('')
         setAddCard(false)
      })
   }

   return (
      <div className="column">
         <header className="column-drag-handle">
            <div className="column-title">
               <Form.Control 
                  size="sm" 
                  type="text" 
                  className="trello-content-editable"
                  value={columnTitle}
                  spellCheck="false"      // bo check text, bo phan mau do duoi text
                  onClick={selectAllInLineText}
                  onChange={handleColumnTitleChange}
                  onBlur={handleColumnTitleBlur}
                  onKeyDown={saveContentWithEnterKey}
                  onMouseDown={e => e.preventDefault()}
               />
            </div>
           <div className="column-dropdown-actions">
            <Dropdown>
                  <Dropdown.Toggle  id="dropdown-basic" size="sm" className="dropdown-btn"/>
                  <Dropdown.Menu>
                     <Dropdown.Item onClick={() => setAddCard(true)}>Add card</Dropdown.Item>
                     <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column</Dropdown.Item>
                     <Dropdown.Item >Move all cards in this column</Dropdown.Item>
                     <Dropdown.Item >Archive all cards in this column</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
           </div>
         </header>
         <div className="card-list">
            <Container
               groupName="col" 
               onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
               getChildPayload={index => cards[index]}
               dragClass="card-ghost"
               dropClass="card-ghost-drop"
               dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'card-drop-preview'
               }}
               dropPlaceholderAnimationDuration={200}
            >
              { 
               cards.map((item, index) => (
                  <Draggable key={index}>
                     <Card card={item}/> 
                  </Draggable>    
               ))
              } 
            </Container>
            { addCard && 
               <div className="add-new-card">
               <Form.Control 
                  size="sm" 
                  as="textarea" 
                  rows="3"
                  placeholder="Enter a title for this card..." 
                  className="textarea-enter-new-card"
                  ref={addCardRef}
                  value={newCardTitle}
                  onChange={onChangeNewCardTitle}
                  onKeyDown={event => (event.code === 'Enter') && addNewCard()}  
                  spellCheck='false'
               />
               </div>
            }
         </div>
            <footer>
               { addCard && 
               <div className="add-new-card">
                  <Button variant="success" size="sm" onClick={addNewCard}>Add card</Button>
                  <span className="cancel-icon" ><i onClick={() => setAddCard(false)} className="fa fa-trash icon"/></span>
               </div>
               }
               { !addCard &&  
                  <div className="footer-actions" onClick={() => setAddCard(true)}>
                   <i className="fa fa-plus icon"></i>Add another card
                  </div>
               }
            </footer>
         <ConfirmModal
            show={showConfirmModal}
            onAction={onConfirmModalAction}
            title="Remove column"
            content={`Are you sure want to remove <strong>${column.title}</strong>. <br/>All related cards will also be removed!`}
         />
      </div>
   )
}

export default Column
