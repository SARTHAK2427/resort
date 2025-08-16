import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ScanWaste() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to AI Model page
    navigate('/ai-model');
  }, [navigate]);

  return null;
}

export default ScanWaste;
