export interface Global {
    name: string,
    description: string,
    value: string,
}

export function getSafeGlobal(data: Partial<Global>): Global {
    return {
        name: data.name ?? defaultGlobal.name,
        description: data.description ?? defaultGlobal.description,
        value: data.value ?? defaultGlobal.value,
    };
}

export const defaultGlobal: Global = {
    name: 'Uknown',
    description: 'Uknown',
    value: '',
};

export function getSafeGlobalList(dataList: Partial<Global>[]): Global[] {
    return dataList.map(data => getSafeGlobal(data)); 
};