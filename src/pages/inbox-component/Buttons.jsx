import React from 'react'

function Buttons({buttontext, color}) {
  function Click(){
    alert()
  }
  return (
    <div>
        <button onClick={Click} style={{backgroundColor: color}}>{buttontext}</button>
    </div>
  )
}

export default Buttons