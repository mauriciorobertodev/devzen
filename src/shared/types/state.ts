export type PropagateBrowserChangeFn = <T>(name: string, value: T | null) => void;
export type RegisterStateVariableBridgeFn = <T>(
    name: string,
    onChange: (value: T | null) => void
) => () => void;
export type GetCurrentValueFn = <T>(name: string) => Promise<T | null>;

export type StateVariableBridge = {
    registerStateVariableBridge: RegisterStateVariableBridgeFn;
    propagateBrowserChange: PropagateBrowserChangeFn;
    getCurrentValue: GetCurrentValueFn;
};
