export interface Bias {
    name: string,
    value: number
}

export const defaultBias: Bias = {
    name: 'Unknown', 
    value: 0,         
};

export function getSafeBias(data: Partial<Bias>): Bias {
    return {
        name: data.name ?? defaultBias.name,
        value: data.value ?? defaultBias.value,
    };
};

export function getSafeBiasList(dataList: Partial<Bias>[]): Bias[] {
    return dataList.map(data => getSafeBias(data)); 
};