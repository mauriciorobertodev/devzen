import { APP_VERSION } from '@shared/constants';

function App(): JSX.Element {
    return (
        <div className="container">
            <h1>{APP_VERSION}</h1>
        </div>
    );
}

export default App;
