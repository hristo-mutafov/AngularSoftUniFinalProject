export const sameValueValidator = (firstValue: string, secondValue: string) => {
    return firstValue === secondValue ? null : { passwordError: true };
};
