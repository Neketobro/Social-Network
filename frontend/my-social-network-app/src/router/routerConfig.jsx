import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  PostsPage,
  ErrorPage,
  LoginPage,
  CreatePostPage,
  ProfilePage,
  UsersProfilePage,
  MyProfilePage,
  RegisterPage,
} from '../pages';

const isUserToken = () => {
  return !!localStorage.getItem('authToken');
};
const ProtectedRoute = ({ element }) => {
  return isUserToken() ? element : <Navigate to="/login" />;
};

const routerConfig = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <PostsPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/createpost', element: <ProtectedRoute element={<CreatePostPage />} /> },
      { path: '/register', element: <RegisterPage /> },
      {
        path: '/profile',
        children: [
          { index: true, element: <UsersProfilePage /> },
          { path: 'myprofile', element: <ProtectedRoute element={<MyProfilePage />} /> },
          { path: ':id', element: <ProfilePage /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);
