import React from 'react'

const ListElement = ({name, onClick}) => {

  const ContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 200
}

  return(
      <div style={ContainerStyle}>
        <li>{name}</li>
        <button name={name} onClick={onClick}>Show</button>
     </div>
  )
}

export default ListElement;