import Menu from './menu-items'
import type { Mobilization } from "../../../reducers";

interface NavbarProperties {
  editable: boolean;
  mobilization: Mobilization;
  blocks: any[],
  blockUpdate: (block: any) => void
}

const Navbar = (properties: NavbarProperties): React.ReactElement => {
  const {
    blocks = [],
    editable = false
  } = properties

  const onlyVisibleBlocks = blocks.filter(
    block => editable ? !block.hidden : !block.hidden && !block.menu_hidden
  )
  const menuProperties = { ...properties, blocks: onlyVisibleBlocks }

  return (
    <div className='absolute col-12 z3'>
      <Menu {...menuProperties} />
      <Menu {...menuProperties} mobile />
    </div>
  )
}

export default Navbar
