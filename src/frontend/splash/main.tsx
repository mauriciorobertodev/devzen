import '@/assets/index.css';
import { Logo } from '@frontend/components/logo';
import { APP_VERSION } from '@shared/constants';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <div className="h-screen w-screen flex items-center justify-center bg-background relative p-8 font-inter">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <Logo className="w-12 h-12" />
                <div className="-space-y-1">
                    <h1 className="text-foreground text-lg font-semibold">DevZen v{APP_VERSION}</h1>
                    <p className="text-sm text-muted-foreground">By Mauricio Roberto</p>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 flex gap-2 p-4">
                <Loader2Icon className="animate-spin" />
                Loading...
            </div>
        </div>
    </React.StrictMode>
);
