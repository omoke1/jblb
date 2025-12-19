import { Link } from "react-router-dom";
import { Button } from "./Button";

/**
 * NotFoundPage component for 404 errors
 * Provides a user-friendly page not found experience
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000004] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl text-bodyText mb-6">Page Not Found</h2>
        <p className="text-bodyTextDim mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/">
            <Button title="Go Home" />
          </Link>
          <Link to="/hub">
            <Button title="DeFi Hub" secondary />
          </Link>
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer text-white bg-transparent border-2 border-borderColor rounded-md flex justify-center items-center gap-2 text-sm px-6 py-3"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

