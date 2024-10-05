import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useCurrentUser = () => {
	const { isLoading, isError, data, isFetching } = useQuery<User>({
		queryKey: ["currentUser"],
		queryFn: async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCurrentUser`, {
					withCredentials: true,
				});
				return response.data;
			} catch (error: any) {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 401) {
						return null;
					} else {
						toast.error("An unexpected error occurred. Please try again.");
					}
				}
			}
		},
		staleTime: 1000 * 60 * 15,
		refetchOnWindowFocus: false,
		retry: false,
	});

	const user = data?.user;

	return { isLoading, isError, isFetching, user };
};
