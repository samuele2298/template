export interface Tick {
    ts: number,
    open: number,
    close: number,
    low: number,
    high: number,
    volu: number,
    vol: number,
}

export const defaultTick: Tick = {
  ts: Date.now(),           
  open: 0,                 
  close: 0,                 
  low: 0,                   
  high: 0,                  
  volu: 0,                  
  vol: 0,                  
};

export function getSafeTick(data: Partial<Tick>): Tick {
  return {
    ts: data.ts ?? defaultTick.ts,
    open: data.open ?? defaultTick.open,
    close: data.close ?? defaultTick.close,
    low: data.low ?? defaultTick.low,
    high: data.high ?? defaultTick.high,
    volu: data.volu ?? defaultTick.volu,
    vol: data.vol ?? defaultTick.vol,
  };
}