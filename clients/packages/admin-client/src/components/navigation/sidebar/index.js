import Cookies from 'js-cookie';
import Sidebar from './sidebar'
import SidebarContainer from './container'

export default {
  Sidebar,
  SidebarContainer,
  getSidebarProps: () => {
    return {
      loading: false,
      user: { id: 2,  },
      mobilization: undefined,
      community: JSON.parse(Cookies.get('community'))
    }
  }
}
