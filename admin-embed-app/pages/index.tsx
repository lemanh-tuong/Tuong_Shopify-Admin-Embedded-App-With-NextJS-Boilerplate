import { AppRoutes } from 'src/routes';
import { useDispatch } from 'react-redux';
import { getUseDispatchRedux } from 'wiloke-react-core/utils';

getUseDispatchRedux(useDispatch);

const Index = () => <AppRoutes />;

export default Index;
