export interface BalmonitorSym {
    name: string;
    num: number;
    min: number;
    max: number;
    usdt: number;
    val: number;
    monitor_min_color: number;
    monitor_max_color: number;
    classpbar: string | null;
    classtd: string | null;
}

export interface BalmonitorExchange {
    name: string;
    id: number;
    configured: boolean;
    st: number;
    watch: number;
    sym1: BalmonitorSym;
    sym2: BalmonitorSym;
}

export interface Balmonitor {
    name: string;
    symnum: string;
    sumcurr: number | null;
    sumusdt: number | null;
    thrstotbal: number;
    thrstotbalover2: boolean;
    thrstotbalunder2: boolean;
    exchange: BalmonitorExchange[]
}

export interface ExchDataPrice {
    [pair: string]: { 
        [kexch: string]: number 
    }
}

export interface ExchStatus {
    id: number;
    status: number;
}

export interface MissingWdRecord {
    [symbol: string]: {
        [exchangeId: string]: number[];
    };
}