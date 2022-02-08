import { Entity } from 'draft-js'

interface LinkProperties {
  entityKey: string;
}

const Link: React.FC<LinkProperties> = ({ children, entityKey }) => {
  const { href, target } = Entity.get(entityKey).getData()

  return (
    <a href={href} target={target}>{children}</a>
  )
}

export default Link
