/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef, useEffect } from 'react'

export interface NavbarFormProperties {
  handleCloseForm: () => void;
  block: any;
  blockUpdate: (block: any) => void;
  defaultValue?: string;
}

export interface NavbarFormState {
  name?: string
}

const NavbarForm = (properties: NavbarFormProperties): React.ReactElement => {
  const [name, setName] = useState(properties.defaultValue || "");
  const inputReference: any = useRef();

  const submit = (e): void => {
    e.preventDefault()
    const {
      block,
      blockUpdate,
      handleCloseForm
    } = properties

    blockUpdate({ ...block, name })
    handleCloseForm()
  }

  const handleKeyUp = (e): void => {
    if (e.keyCode === 27) {
      submit(e)
    }
  }

  useEffect(() => {
    if (inputReference) {
      inputReference.current.focus()
      inputReference.current.select();
    }
    window.addEventListener('keyup', handleKeyUp)

    return (): void => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputReference])

  return (
    <form className='inline-block' onSubmit={submit}>
      <input
        type='text'
        ref={inputReference}
        className='input z2 relative'
        value={name}
        onChange={(e): void => setName(e.target.value)}
      />
      <div
        className='fixed top-0 right-0 bottom-0 left-0 z1'
        onClick={submit} />
    </form>
  )
}

export default NavbarForm
