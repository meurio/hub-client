import OrderedListButton from "./OrderedListButton";
import UnorderedListButton from "./UnorderedListButton";

// FIXME: Needs to handle assets files to work with SSR
import('./ListButtonBar.css')


const ListButtonBar: React.FC<any> = (properties) =>
  <div className='slate-list-plugin--button-bar'>
    <UnorderedListButton {...properties} />
    <OrderedListButton {...properties} />
  </div>
;

export default ListButtonBar
