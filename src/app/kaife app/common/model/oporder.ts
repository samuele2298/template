import { ClrLoadingState } from "@clr/angular";

export interface Oporder {
    orexch: string;
    orownid: string;
    opkey: string;
    orse: string;
    orexchid: string;
    orstatus: string;
    orside: string;
    orq: string;
    orprice: string;
    orqfilled: string;
    orinitdate: number;
    orupddate: number;
    orerror: string;
    orkey: string;
    loadingState: ClrLoadingState;
}

export const orderStatus = new Map<string, string>();
orderStatus.set('0', 'TODO');
orderStatus.set('1', 'OPEN');
orderStatus.set('2', 'PARTIAL');
orderStatus.set('3', 'FILLED');
orderStatus.set('4', 'TIMEOUT');
orderStatus.set('5', 'CANCELLING');
orderStatus.set('6', 'TOOSMALL');
orderStatus.set('9', 'ERROR');

export const orderStatusClass = new Map<string, string>();
orderStatusClass.set('0', '#6699FF');
orderStatusClass.set('1', '#FF6600');
orderStatusClass.set('2', '#FFFF00');
orderStatusClass.set('3', '#009933');
orderStatusClass.set('4', '#a5a5a5');
orderStatusClass.set('5', '#FF00FF');
orderStatusClass.set('6', '#5a5a5a');
orderStatusClass.set('9', '#8C0000');
