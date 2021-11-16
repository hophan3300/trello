

// onKeyDown
export const saveContentWithEnterKey = (e) => {
   if(e.code === 'Enter'){
      e.preventDefault()
      e.target.blur()
   }
}


// select all when onClick
export const selectAllInLineText = (e) => {
   e.target.focus()
   e.target.select()
   // document.execCommand('selectAll', false, null)           // <=>  e.target.select()
}