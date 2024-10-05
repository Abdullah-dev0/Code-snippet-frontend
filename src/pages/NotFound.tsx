import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex h-screen items-center justify-center ">
			<div className="text-center flex flex-col gap-5" >
				<h1 className="text-4xl font-bold">404</h1>
				<p className="text-xl text-gray-400">Oops! Page not found</p>
				<p className="text-md text-gray-400">The page you’re looking for doesn’t exist.</p>
				<Link to="/" className="inline-block rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700">
					Go Back to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
