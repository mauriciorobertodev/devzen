type VariableListener<T> = (value: T) => void;

export class StateVariable<T> {
    private _value: T;
    private _listeners: VariableListener<T>[] = [];

    constructor(initialValue: T, onChange?: VariableListener<T>) {
        this._value = initialValue;
        if (onChange) {
            this._listeners.push(onChange);
        }
    }

    get value(): T {
        return this._value;
    }

    set value(newValue: T) {
        this._value = newValue;
        this._listeners.forEach((listener) => listener(newValue));
    }

    onChange(listener: VariableListener<T>): void {
        this._listeners.push(listener);
    }

    offChange(listener: VariableListener<T>): void {
        this._listeners = this._listeners.filter((l) => l !== listener);
    }
}
