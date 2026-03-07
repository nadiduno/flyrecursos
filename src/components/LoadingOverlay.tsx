import { useLoading } from '../context/LoadingContext';
import './LoadingOverlay.css';

export const LoadingOverlay = () => {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">{loadingMessage}</p>
      </div>
    </div>
  );
};
