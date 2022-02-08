// import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

type RenderProps = {
  push: (path: string) => void
  is: (regex: any) => boolean
}

type Props = {
  children: (props: RenderProps) => any
}

const TabRoute: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { path: root, params }: any = useRouteMatch();

  // Utils
  // Test is active pathname
  const is = (regexPath: any): boolean =>
    new RegExp(regexPath).test(location.pathname);
  // Redirect to pathname
  let rootpath = root;
  Object.keys(params).forEach((keyName: string) => {
    rootpath = rootpath.replace(`:${keyName}`, params[keyName]);
  });

  const push = (path: string) => history.push(`${rootpath}${path}`);

  return children({ push, is });
}

export default TabRoute;