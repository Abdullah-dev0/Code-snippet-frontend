import { Snippet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useMoveToBinOrRestoreSnippet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ snippetId, action }: { snippetId: string; action: "delete" | "restore" }) => {
			const response = await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/api/snippet/action`,
				{ snippetId, action },
				{
					withCredentials: true,
				},
			);
			return { data: response.data, action };
		},
		onSuccess: ({ action }) => {
			const message = action === "delete" ? "Snippet moved to Bin successfully." : "Snippet restored successfully.";

			toast.success(message);

			queryClient.refetchQueries({ queryKey: ["binSnippets"] });
			queryClient.refetchQueries({ queryKey: ["GetAllSnippets"] });

			const favoriteSnippets = queryClient.getQueryData(["getFavoritesSnippets"]) as Snippet[];

			if (favoriteSnippets.length !== 0) {
				queryClient.refetchQueries({ queryKey: ["getFavoritesSnippets"] });
			}
		},
		onError: () => {
			toast.error("Failed to perform action. Please try again.");
		},
	});

	return { mutation };
};
