import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-4xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-lg text-base-content/70 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
