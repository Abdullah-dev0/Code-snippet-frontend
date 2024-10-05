// AuthProvider.tsx
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const AuthProvider = () => {
	const { user, isLoading, isError, isFetching } = useCurrentUser();

	if (isLoading || isFetching) {
		return (
			<div className="text-center grid place-content-center h-screen">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	if (isError || !user) {
		toast.error("please login to continue");
		return <Navigate to="/auth" replace />;
	}

	if (user && user.emailVerified !== true) {
		toast.error("please verify your email to continue");
		return <Navigate to="/otp-verification" replace />;
	}

	return <Outlet />;
};

export default AuthProvider;
