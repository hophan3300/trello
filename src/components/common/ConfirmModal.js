import React from "react";
import {Modal, Button} from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'

import { MODAL_ACTION_CLOSE, MODAL_ACTION_COFIRM } from 'utilities/constans'

function ConfirmModal(props) {

   const { title , content, show, onAction } = props
  
   return (
       <Modal  
         show={show} 
         onHide={() => onAction(MODAL_ACTION_CLOSE)}
         backdrop="static"
         // keyboard={false}        co the dung phim Esc tat form
         // animation={false}       co the fix loi xung dot
       >
         <Modal.Header closeButton>
           <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
             Close
           </Button>
           <Button variant="primary" onClick={() => onAction(MODAL_ACTION_COFIRM)}>
             Save Changes
           </Button>
         </Modal.Footer>
       </Modal>
   );
 }

 export default ConfirmModal