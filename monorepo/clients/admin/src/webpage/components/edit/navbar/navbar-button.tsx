import classnames from 'classnames'
import type React from 'react'

interface NavbarButtonProperties {
  targetId: string;
  scrollableId: string;
  className?: string;
  children: string;
  hidden?: boolean;
}

const NavbarButton = (properties: NavbarButtonProperties): React.ReactElement => {
  const handleClick = (e): void => {
    e.preventDefault()
    const { targetId } = properties
    const target: any = document.querySelector(targetId)

    target.scrollIntoView({ behavior: "smooth" })
  }

  const { className, children, hidden } = properties
  return (
    <a
      href='/'
      className={classnames(className, 'navbar-button relative')}
      onClick={handleClick}>
      <span style={{ opacity: hidden ? '.25' : '1' }}>
        {children}
      </span>
      {hidden && (
        <div className='h2 absolute top-0 bottom-0 left-0 right-0 center flex flex-center'>
          <i className='fa fa-eye-slash flex-auto' />
        </div>
      )}
    </a>
  )
}

export default NavbarButton
