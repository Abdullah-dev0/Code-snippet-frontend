import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const notAuthLayout = () => {
	const { user, isLoading, isFetching } = useCurrentUser();

	// Show loading state when fetching the user data
	if (isLoading || isFetching) {
		return (
			<div className="text-center grid place-content-center h-screen">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	if (user && user.emailVerified) {
		return <Navigate to="/dashboard" />;
	}

	return <Outlet />;
};

export default notAuthLayout;
