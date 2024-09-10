export function pushRange<T>(listWithNewElements : T[], listToAdd : T[]) {
    for (let item of listWithNewElements) {
        listToAdd.push(item);
    }
}