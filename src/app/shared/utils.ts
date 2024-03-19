export const getFutureDate = (days: number) => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + days);

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
};
