import { createBrowserRouter } from 'react-router-dom';
import { PostsPage, ErrorPage, LoginPage, CreatePostPage, ProfilePage, UsersProfilePage, MyProfilePage, RegisterPage } from '../pages';

const routerConfig = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <PostsPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/createpost', element: <CreatePostPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        path: '/profile',
        children: [
          { index: true, element: <UsersProfilePage /> },
          { path: 'myprofile', element: <MyProfilePage /> },
          { path: ':id', element: <ProfilePage /> },

        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);