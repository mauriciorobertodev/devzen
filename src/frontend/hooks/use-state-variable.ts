import { useEffect, useState } from 'react';

export function useStateVariable<T>(name: string): readonly [T | null, (value: T | null) => void] {
    const [value, setValue] = useState<T | null>(null);

    useEffect(() => {
        window.stateVariableBridge.getCurrentValue<T>(name).then((v) => {
            console.log('useStateVariable got initial value', name, v);
            setValue(v);
        });
    }, [name]);

    const updateValue = (value: T | null): void => {
        window.stateVariableBridge.propagateBrowserChange(name, value);
        setValue(value);
    };

    useEffect(() => {
        const unlisten = window.stateVariableBridge.registerStateVariableBridge<T>(
            name,
            (newValue) => {
                console.log('useStateVariable received new value', name, newValue, 'vs', value);
                if (newValue === value) {
                    return;
                }
                setValue(newValue);
            }
        );
        return (): void => {
            unlisten();
        };
    }, [name]);

    return [value, updateValue] as const;
}
