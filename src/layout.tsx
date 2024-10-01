import Sidebar from "@/components/shared/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
const Layout = () => {
	return (
		<>
			<div className="flex max-w-screen-2xl mx-auto">
				<Sidebar />
				<main className="p-5 w-full flex flex-col gap-12 lg:ms-60">
					<Navbar />
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default Layout;
