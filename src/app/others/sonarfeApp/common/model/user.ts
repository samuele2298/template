export class User {
    id?: number;
    email?: string;
    plan?: string;
    lastlogin?: string;
    referral?: string;
}

export const defaultUser: User = {
    id: -1,
    email: 'unknown@example.com',  // Default email
    plan: 'free',                 // Default plan
    lastlogin: '1970-01-01',      // Default last login (e.g., Unix epoch)
    referral: '123456',      // Default last login (e.g., Unix epoch)
};

export function getSafeUser(data: Partial<User>): User {
    return {
        id: data.id ?? defaultUser.id,
        email: data.email ?? defaultUser.email,
        plan: data.plan ?? defaultUser.plan,
        lastlogin: data.lastlogin ?? defaultUser.lastlogin,
        referral: data.referral ?? defaultUser.referral,
    };
}

export function getSafeUserList(dataList: Partial<User>[]): User[] {
    return dataList.map(data => getSafeUser(data));
}