import { AppProvider } from 'src/containers/AppProvider';
import { Routes } from 'src/routes';
import { useDispatch } from 'react-redux';
import { getUseDispatchRedux } from 'wiloke-react-core/utils';

getUseDispatchRedux(useDispatch);

const Index = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default Index;
