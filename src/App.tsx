// router.ts
import { Toaster } from "@/components/ui/sonner.tsx";
import Auth from "@/pages/Auth";
import { Bin } from "@/pages/Bin";
import Dashboard from "@/pages/Dashboard.tsx";
import Favorites from "@/pages/Favorites";
import HomePage from "@/pages/Home.tsx";
import { InputOTPForm } from "@/pages/InputOTPForm";
import AuthProvider from "@/providers/AuthProvider";
import NotAuthLayout from "@/providers/NotAuthLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import NotFound from "./pages/NotFound";

// Public routes

const notAuthRoutes = [
	{
		path: "auth",
		element: <Auth />,
	},
	{
		path: "otp-verification",
		element: <InputOTPForm />,
	},
];

const publicRoutes = [
	{
		path: "/",
		element: <HomePage />,
	},

	{
		element: <NotAuthLayout />,
		children: notAuthRoutes,
	},
];

// Auth routes (protected by AuthProvider)
const authRoutes = [
	{
		element: <Layout />,
		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "favorites",
				element: <Favorites />,
			},
			{
				path: "bin",
				element: <Bin />,
			},
		],
	},
];

const routes = [
	{
		path: "/",
		children: [
			{
				children: publicRoutes,
			},
			{
				element: <AuthProvider />,
				children: authRoutes,
			},
		],
	},

	{
		path: "*",
		element: <NotFound />,
	},
];

const router = createBrowserRouter(routes);

const App = () => (
	<>
		<RouterProvider router={router} />
		<Toaster richColors position="top-center" closeButton duration={3000} />
	</>
);

export default App;
