import { APP_VERSION } from '@shared/constants';
import { Button } from './components/ui/button';

function App(): JSX.Element {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Button>{APP_VERSION}</Button>
        </div>
    );
}

export default App;
