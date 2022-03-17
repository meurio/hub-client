import React from 'react';
import Sidebar from '../../components/navigation/sidebar/Sidebar';
import SidebarProvider from './Provider';

const SidebarView: React.FC = ({ children }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        {children}
      </Sidebar>
    </SidebarProvider>
  )
}

export default SidebarView;
