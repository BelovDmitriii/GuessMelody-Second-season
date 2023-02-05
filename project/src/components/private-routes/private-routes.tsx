import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/consts';

type PrivateRoutesProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoutes(props: PrivateRoutesProps):JSX.Element {
  const {authorizationStatus, children} = props;
  return(
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoutes;
