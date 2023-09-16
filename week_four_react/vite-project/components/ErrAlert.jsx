import React from 'react'

const ErrAlert = ({errors,label}) => {
  return (
    errors.map(value=>{
        if(value.path == label){
            return <div><p className='err'> *{value.msg} </p></div>
        }
    })
    
  )
}

export default ErrAlert
