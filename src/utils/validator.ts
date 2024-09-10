export function ifEmpty(value: any) : boolean {
    try {
        if(value === undefined || value === null) {
            return true;
        }

        if(typeof value === 'object' && Object.keys(value).length === 0) {
            return true;
        }
        if(typeof value === 'string' && value.trim().length === 0) {
            return true;
        }

    }catch (error){
        return true;
    }
    return false;
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}