import { Logo } from '../logo';
import { Separator } from '../ui/separator';

export default function AppHeader(): JSX.Element {
    return (
        <header className="w-screen border-b py-4">
            <div className="flex items-center justify-between space-x-4 text-sm container mx-auto">
                <div className="flex items-center space-x-4 h-6">
                    <Logo className="h-8 w-8" />
                    <Separator orientation="vertical" />
                    <nav>Batata</nav>
                </div>
                <div>Buh</div>
            </div>
        </header>
    );
}
