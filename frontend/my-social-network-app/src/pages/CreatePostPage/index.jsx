import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { NavBarRight, NavBarLeft, PageLayout, Loader } from '../../components';
import { CreatePost } from '../../layout';
import { selectUserLogin } from '../../store';

export function CreatePostPage() {
  const isUser = useSelector(selectUserLogin);
  const isLoading = isUser === undefined;

  const token = sessionStorage.getItem('token');
  const isUserAuthenticated = token && isUser && Object.keys(isUser).length > 0;

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
          return <CreatePost isUser={isUser} />;
        }

        return <Loader />;
      }}
    />
  );
}
