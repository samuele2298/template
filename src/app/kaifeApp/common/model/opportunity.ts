import { Opdetail } from "./opdetail";
import { Oporder } from "./oporder";

export interface Opportunity { 
    opstatus: string;
    oppair: string;
    opdate: string;
    opid: string;
    oppri: string;
    opsrc: string;
    opthreshold: string;
    A: Opdetail;
    B: Opdetail;
    oporders: Oporder[];
}

export const opStatusClass = new Map<string, string>();
opStatusClass.set('0', 'opopen');
opStatusClass.set('1', 'opclose');
