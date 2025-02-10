export interface PairSymbol {
    id: number,
    sym1: string,
    sym1_desc: string,
    sym2: string,
    sym2_desc: string,
    exch_name: string,
    status: number,
    fee: number,
    istrading: number,
    watch: number,
    kollectorn: number,
    notes: string
}

export const statusTradingMap = new Map<number, string>();
statusTradingMap.set(0, 'disabled');
statusTradingMap.set(1, 'enabled');
statusTradingMap.set(2, 'not allowed');
