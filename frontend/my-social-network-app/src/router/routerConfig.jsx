import { createBrowserRouter } from 'react-router-dom';
import { PostsPage, ErrorPage } from '../pages';

const routerConfig = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <PostsPage /> },
      // { path: '/createpost', element: <CreatePostPage /> },
      // { path: '/login', element: <LoginPage /> },
      // { path: '/register', element: <RegisterPage /> },
      // { path: '/myprofile', element: <MyProfilePage /> },
      // {
      //   path: '/profile',
      //   children: [
      //     { index: true, element: <PostsPage /> },
      //     { path: ':id', element: <ProfilePage /> },
      //   ],
      // },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);