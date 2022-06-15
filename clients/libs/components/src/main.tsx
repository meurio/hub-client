// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // useLocation,
} from "react-router-dom";
import {
  Main,
  Navbar,
  Body,
  Footer,
  //   Text,
  Dropdown,
  DropdownImageInput,
  DropdownImageItem,
  ConnectedForm,
  InputField,
  //   Button,
  TextareaField,
  Validators,
  BTable as Table,
  theme
} from './index';

const {
  Text,
  Button
} = theme

const useSession = (defaultCommunity: any) => {
  const [community, setCommunity] = React.useState(defaultCommunity);

  return {
    community,
    communities: [
      {
        img: {
          src:
            'https://s3.amazonaws.com/hub-central/uploads/1540751246_Ninguemficapratras-Logo.png',
          alt: 'Ninguém fica pra trás',
        },
        label: 'Ninguém fica pra trás',
        id: 1,
      },
      {
        img: {
          src:
            'https://s3.amazonaws.com/hub-central/uploads/1484260522_reboo.png',
          alt: 'Meu Rio',
        },
        label: 'Meu Rio',
        id: 4,
      },
      {
        img: {
          src:
            'https://s3.amazonaws.com/hub-central/uploads/1502212636_betaavatar.png',
          alt: 'BETA',
        },
        label: 'BETA',
        id: 3,
      },
    ],
    onChangeCommunity: (value: any) => {
      setCommunity(value);
    },
  };
};

const CommunitiesDropdown = ({ community: defaultCommunity }: any) => {
  const { community, communities, onChangeCommunity } = useSession(
    defaultCommunity
  );

  return (
    <Dropdown
      placeholder="Selecione uma comunidade"
      item={community}
      items={communities}
      onSelect={(value: any) => {
        onChangeCommunity(communities.find(c => c.id === value.id));
      }}
      dropdownInput={DropdownImageInput}
      dropdownItem={DropdownImageItem}
    />
  );
};

const Routing = () => {
  // const { pathname } = useLocation();
  const { community } = useSession({
    img: {
      src:
        'https://s3.amazonaws.com/hub-central/uploads/1540751246_Ninguemficapratras-Logo.png',
      alt: 'Ninguém fica pra trás',
    },
    label: 'Ninguém fica pra trás',
    id: 1,
  });
  const { required } = Validators;

  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
        className: 'sticky',
        bold: true
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    []
  )

  return (
    <Main>
      <Navbar
        indexRoute="/"
        // brand={pathname === '/with-menu' ? 'small' : 'default'}
      >
        {/* {pathname === '/with-menu' ? ( */}
          <CommunitiesDropdown community={community} />
        {/* ) : null} */}
      </Navbar>
      <Body>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Text>
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.`}
              </Text>
            </Route>
            <Route path="/with-menu">
              <Text>
                {!community
                  ? 'Select your community'
                  : `Welcome to ${community.label}`}
              </Text>
            </Route>
            <Route path="/form">
              <ConnectedForm
                onSubmit={e => console.log(e)}
                initialValues={{ city: 'Belo Horizonte' }}
              >
                {({ submitting, form }) => {
                  return (
                    <>
                      <InputField label="Full Name" name="fullname" />
                      <InputField
                        label="City"
                        name="city"
                        placeholder="qual a sua cidade?"
                      />
                      <TextareaField
                        label="Mensagem"
                        name="message"
                        placeholder="Escreva uma mensagem"
                        validate={required('Required')}
                      />
                      <div>
                        <Button dark onClick={form.reset}>
                          Clean
                        </Button>
                        <Button type="submit" disabled={submitting}>
                          Submit
                        </Button>
                      </div>
                    </>
                  );
                }}
              </ConnectedForm>
            </Route>
            <Route path="/table">
              <div style={{ padding: 30 }}>
                <Table columns={columns} data={data} sticky="end" />
              </div>
            </Route>
          </Routes>
        </BrowserRouter>
        <Link to="/with-menu">Navigate to page with menu</Link>
      </Body>
      <Footer />
    </Main >
  );
};

const App = () => {
  return (
    <Routing />
  );
};

ReactDOM.render(
  <App />,
  document.getElementById("app")
);