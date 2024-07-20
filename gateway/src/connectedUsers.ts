const connectedUsersSet = new Set<number>();

export const addConnectedUser = (userId: number) => {
    connectedUsersSet.add(userId);
}

export const removeConnectedUser = (userId: number) => {
    connectedUsersSet.delete(userId);
}

export const isUserConnected = (userId: number) => {
    return connectedUsersSet.has(userId);
}
