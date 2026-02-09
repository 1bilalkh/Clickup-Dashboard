import React from 'react'
import { Typography } from "@mui/material";
import HeaderProps from "./inbox-component/HeaderProps"
import Buttons from "./inbox-component/Buttons"
import UsersPage from "./inbox-component/TaskFormList"
import AddUserTwo from "./inbox-component/AddUserTwo"
import { useRef } from "react";


function Inbox() {
  const name = "bilal"
  const x = true
  const number = 12;
  
const Divstyle = {
  color: '#000',
  background: 'orange',
  padding: '20px'
}

  const [count, setCount] = React.useState(0);
  const inputRef = useRef(null);

  return (
    <>
      <div style={Divstyle}>
          <Typography variant="h6">Inbox</Typography>
          {name}{x ? 'true' : 'false'}{number + 2}
          <HeaderProps titleown="show" para="this is a content"/>
          <Buttons buttontext="Click" color="green"/>
          <Buttons buttontext="Readmore" color="white" />
          <UsersPage />
          <AddUserTwo />
          <ChildA count={count} setCount={setCount} />
          <ChildB count={count} />
          <button onClick={() => setCount(count + 1)}>
      Increment
    </button>
      <p>Count: {count}</p>
      </div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </>
  )
}

function ChildA() {
  const [count1, setCount1] = React.useState(0);
}

function ChildB({ count }) {
  const [count2, setCount2] = React.useState(0);
}

export default Inbox