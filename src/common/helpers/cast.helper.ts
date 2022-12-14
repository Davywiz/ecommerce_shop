
export function toLowerCase(value: string): string {
    return value.toLowerCase();
}

export function trim(value: string): string {
    return value.trim();
}

export function toDate(value: string): Date {
    return new Date(value);
}

export function toBoolean(value: string): boolean {
    value = value.toLowerCase();

    return value === 'true' || value === '1' ? true : false;
}

export function toNumber(value: string): number | string {
    let newValue: number = Number.parseInt(value);

    if (Number.isNaN(newValue)) {
        return value;
    }
    return newValue;
}