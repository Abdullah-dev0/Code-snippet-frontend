// router.ts
import { Toaster } from "@/components/ui/sonner.tsx";
import Auth from "@/pages/Auth";
import { Bin } from "@/pages/Bin";
import Dashboard from "@/pages/Dashboard.tsx";
import Favorites from "@/pages/Favorites";
import HomePage from "@/pages/Home.tsx";
import { InputOTPForm } from "@/pages/InputOTPForm";
import AuthProvider from "@/providers/AuthProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";

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
		element: <div>404 - Not Found</div>,
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
