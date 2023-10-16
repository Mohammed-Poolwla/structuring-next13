export function quaryParams(obj: Record<string, any>): string {
    console.log(obj);
    // Filter out key-value pairs where the value is null or undefined
    const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(
            ([_, value]) => value !== null && value !== undefined && value !== ''
        )
    );

    // Convert the filtered object to a query string
    const queryString = new URLSearchParams(filteredObj).toString();

    return queryString;
}
export function removeEmptyKeys(obj: Record<string, any>): object {
    console.log(obj);
    // Filter out key-value pairs where the value is null or undefined
    const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(
            ([_, value]) => value !== null && value !== undefined && value !== ''
        )
    );
    return filteredObj;
}
