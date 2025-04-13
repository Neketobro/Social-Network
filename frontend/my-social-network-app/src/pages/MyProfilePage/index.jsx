import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { NavBarLeft, NavBarRight, PageLayout, Loader } from '../../components';
import { selectUserLogin } from '../../store';

export function MyProfilePage() {
  const isUser = useSelector(selectUserLogin);
  const isLoading = isUser === undefined;

  const token = sessionStorage.getItem('token');
  const isUserAuthenticated = token && isUser && isUser.id;

  return (
    <PageLayout
      renderHeader={() => <NavBarLeft />}
      renderFooter={() => <NavBarRight />}
      renderMain={() => {
        if (!token) {
          return <Navigate to="/login" replace />;
        }

        if (isLoading) {
          return <Loader />;
        }

        if (isUserAuthenticated) {
          return <Navigate to={`/profile/${isUser.id}`} replace />;
        }

        return <Loader />;
      }}
    />
  );
}
