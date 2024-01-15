import '@/assets/index.css';
import App from '@frontend/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <>
            <App />
            {process.env.NODE_ENV === 'development' && (
                <>
                    <script src="http://localhost:8097"></script>
                    <script src="http://172.22.208.215:8097"></script>
                </>
            )}
        </>
    </React.StrictMode>
);
