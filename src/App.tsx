import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';

import { checkAuthLoader, tokenLoader } from './util/auth';
import { loader } from './pages/GlobalPreview';
import { action } from './components/ProfileSection';
import { action as logoutAction } from './pages/Logout';
import { action as linksAction } from './components/links/LinksSection';

import MainRootLayout from './pages/MainRoot';
import LinksPage from './pages/Links';
import PreviewPage from './pages/Preview';
import ProfilePage from './pages/Profile';
import AuthPage from './pages/Auth';
import GlobalPreview from './pages/GlobalPreview';

const router = createBrowserRouter([
	{ path: 'auth', element: <AuthPage /> },
	{ path: 'preview/:userId', element: <GlobalPreview />, loader: loader },
	{
		path: '/',
		element: <MainRootLayout />,
		loader: tokenLoader,
		children: [
			{ index: true, element: <Navigate to='links' /> },
			{
				path: 'links',
				element: <LinksPage />,
				action: linksAction,
				loader: checkAuthLoader,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
				action: action,
				loader: checkAuthLoader,
			},
			{ path: 'preview', element: <PreviewPage /> },
			{
				path: 'logout',
				action: logoutAction,
			},
		],
	},
]);

const App: React.FC = () => {
	return <RouterProvider router={router} />;
};
export default App;
