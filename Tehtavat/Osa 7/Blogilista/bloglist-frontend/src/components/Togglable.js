import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const style = {
    marginBottom: 7,
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          type="button"
          style={style}
          variant="contained"
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>{props.children}</div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
