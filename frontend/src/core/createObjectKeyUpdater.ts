export function createObjectKeyUpdater(objectUpdaterFunction: any) {
    return (key: string) =>
        (value: any) =>
            objectUpdaterFunction({ [key]: value })
}