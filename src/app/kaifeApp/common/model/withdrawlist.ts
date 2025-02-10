export interface Withdrawlist {
    id: string;
    fromexch: string;
    toexch: string;
    exchid: string;
    symn: string;
    status: number;
    address: string;
    memotag: string;
    fee: number;
    feeusdt: number;
    desc: string;
    amount: number;
    amountusdt: number;
    info: string;
    txid: string;
    createtime: number;
    completetime: number;
}

export interface Withdrawinprogress {
    id: string;
    fromexch: number;
    toexch: number;
    symn: string;
    status: number;
    createtime: number;
}

export const wdStatus = new Map<number, string>();
wdStatus.set(0, 'To Send');
wdStatus.set(1, 'Processing');
wdStatus.set(2, 'Sent But Waiting');
wdStatus.set(5, 'Success');
wdStatus.set(9, 'Error');
