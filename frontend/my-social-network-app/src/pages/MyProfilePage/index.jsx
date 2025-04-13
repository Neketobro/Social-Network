import { NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../../store';

export function MyProfilePage() {
  const isUser = useSelector(selectUserLogin);

  if (!isUser || !isUser.id) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageLayout
      renderHeader={() => <NavBarLeft />}
      renderFooter={() => <NavBarRight />}
      renderMain={() =>  <Navigate to={`/profile/${isUser.id}`} replace />}
    />
  );
}
