import { APP_VERSION } from '@shared/constants';
import { Logo } from './components/logo';
import { Button } from './components/ui/button';

function App(): JSX.Element {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-background relative p-8 font-inter">
            <Logo />
            <Button>{APP_VERSION}</Button>
        </div>
    );
}

export default App;
