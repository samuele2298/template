export interface SCoin {
    id: number,
    name: string,
    f: number,
    s: number,
    t: number,
    d: number,
    w: number,
    m: number,
    category: string,
    price: number,
    volu: number,
    vol: number,
    score: number,     
}

export const defaultSCoin: SCoin = {
    id: 0,        
    name: 'Unknown', 
    f: 0,           
    s: 0,           
    t: 0,          
    d: 0,           
    w: 0,          
    m: 0,    
    category: 'Unknown',             
    price: 0,
    volu: 0,
    vol: 0, 
    score: 0,     
  };
  
export function getSafeSCoin(data: Partial<SCoin>): SCoin {
    return {
        id: data.id ?? defaultSCoin.id,
        name: data.name ?? defaultSCoin.name,
        f: data.f ?? defaultSCoin.f,
        s: data.s ?? defaultSCoin.s,
        t: data.t ?? defaultSCoin.t,
        d: data.d ?? defaultSCoin.d,
        w: data.w ?? defaultSCoin.w,
        m: data.m ?? defaultSCoin.m,
        category: data.category ?? defaultSCoin.category,             
        price: data.price ?? defaultSCoin.price,
        volu: data.volu ?? defaultSCoin.volu,
        vol: data.vol ?? defaultSCoin.vol,
        score: data.score ?? defaultSCoin.score,
    };
}

export function getSafeSCoinList(dataList: Partial<SCoin>[]): SCoin[] {
    return dataList.map(data => getSafeSCoin(data)); 
}


export interface OHCL {
    ts: number;
    open: number;
    close: number;
    low: number;
    high: number;
    volu: number;
    vol: number;
}

export const defaultOHCL: OHCL = {
    ts: 0,
    open: 0,
    close: 0,
    low: 0,
    high: 0,
    volu: 0,
    vol: 0,
};


export interface LCoin {
    id: number,
    name: string,
    mcap: number,
    f: number,
    s: number,
    t: number,
    d: number,
    w: number,
    m: number,
    f_volu: number,
    s_volu: number,
    t_volu: number,
    d_volu: number,
    w_volu: number,
    m_volu: number,
    f_vol: number,
    s_vol: number,
    t_vol: number,
    d_vol: number,
    w_vol: number,
    m_vol: number,
    inv_price_score: number,
    inv_volu_score: number,
    inv_vol_score: number,
    inv_score: number,
    trd_price_score: number,
    trd_volu_score: number,
    trd_vol_score: number,
    trd_score: number,
}

export const defaultLCoin: LCoin = {
    id: 0,
    name: 'Unknown',
    mcap: 0,
    f: 0,
    s: 0,
    t: 0,
    d: 0,
    w: 0,
    m: 0,
    f_volu: 0,
    s_volu: 0,
    t_volu: 0,
    d_volu: 0,
    w_volu: 0,
    m_volu: 0,
    f_vol: 0,
    s_vol: 0,
    t_vol: 0,
    d_vol: 0,
    w_vol: 0,
    m_vol: 0,
    inv_price_score: 0,
    inv_volu_score: 0,
    inv_vol_score: 0,
    inv_score: 0,
    trd_price_score: 0,
    trd_volu_score: 0,
    trd_vol_score: 0,
    trd_score: 0,
};
  
export function getSafeLCoin(data: Partial<LCoin>): LCoin {
    return {
        id: data.id ?? defaultLCoin.id,
        name: data.name ?? defaultLCoin.name,
        mcap: data.mcap ?? defaultLCoin.mcap,
        f: data.f ?? defaultLCoin.f,
        s: data.s ?? defaultLCoin.s,
        t: data.t ?? defaultLCoin.t,
        d: data.d ?? defaultLCoin.d,
        w: data.w ?? defaultLCoin.w,
        m: data.m ?? defaultLCoin.m,
        f_volu: data.f_volu ?? defaultLCoin.f_volu,
        s_volu: data.s_volu ?? defaultLCoin.s_volu,
        t_volu: data.t_volu ?? defaultLCoin.t_volu,
        d_volu: data.d_volu ?? defaultLCoin.d_volu,
        w_volu: data.w_volu ?? defaultLCoin.w_volu,
        m_volu: data.m_volu ?? defaultLCoin.m_volu,
        f_vol: data.f_vol ?? defaultLCoin.f_vol,
        s_vol: data.s_vol ?? defaultLCoin.s_vol,
        t_vol: data.t_vol ?? defaultLCoin.t_vol,
        d_vol: data.d_vol ?? defaultLCoin.d_vol,
        w_vol: data.w_vol ?? defaultLCoin.w_vol,
        m_vol: data.m_vol ?? defaultLCoin.m_vol,
        inv_price_score: data.inv_price_score ?? defaultLCoin.inv_price_score,
        inv_volu_score: data.inv_volu_score ?? defaultLCoin.inv_volu_score,
        inv_vol_score: data.inv_vol_score ?? defaultLCoin.inv_vol_score,
        inv_score: data.inv_score ?? defaultLCoin.inv_score,
        trd_price_score: data.trd_price_score ?? defaultLCoin.trd_price_score,
        trd_volu_score: data.trd_volu_score ?? defaultLCoin.trd_volu_score,
        trd_vol_score: data.trd_vol_score ?? defaultLCoin.trd_vol_score,
        trd_score: data.trd_score ?? defaultLCoin.trd_score,
    };
}

export function getSafeLCoinList(dataList: Partial<LCoin>[]): LCoin[] {
    return dataList.map(data => getSafeLCoin(data)); // Map each element to get a safe LCoin
}

export interface GCoin {
    id: number,
    name: string,
    mcap: number,
    category_id: number,
    category: string,
    inv_price_score: number,
    inv_volu_score: number,
    inv_vol_score: number,
    inv_score: number,
    trd_price_score: number,
    trd_volu_score: number,
    trd_vol_score: number,
    trd_score: number,
}

export const defaultGCoin: GCoin = {
    id: 0,
    name: 'Unknown',
    mcap: 0,
    category_id: 0,
    category: 'Unknown',
    inv_price_score: 0,
    inv_volu_score: 0,
    inv_vol_score: 0,
    inv_score: 0,
    trd_price_score: 0,
    trd_volu_score: 0,
    trd_vol_score: 0,
    trd_score: 0,
};
  
export function getSafeGCoin(data: Partial<GCoin>): GCoin {
    return {
        id: data.id ?? defaultGCoin.id,
        name: data.name ?? defaultGCoin.name,
        mcap: data.mcap ?? defaultGCoin.mcap,
        category_id: data.category_id ?? defaultGCoin.category_id,
        category: data.category ?? defaultGCoin.category,
        inv_price_score: data.inv_price_score ?? defaultGCoin.inv_price_score,
        inv_volu_score: data.inv_volu_score ?? defaultGCoin.inv_volu_score,
        inv_vol_score: data.inv_vol_score ?? defaultGCoin.inv_vol_score,
        inv_score: data.inv_score ?? defaultGCoin.inv_score,
        trd_price_score: data.trd_price_score ?? defaultGCoin.trd_price_score,
        trd_volu_score: data.trd_volu_score ?? defaultGCoin.trd_volu_score,
        trd_vol_score: data.trd_vol_score ?? defaultGCoin.trd_vol_score,
        trd_score: data.trd_score ?? defaultGCoin.trd_score,
    };
}

export function getSafeGCoinList(dataList: Partial<GCoin>[]): GCoin[] {
    return dataList.map(data => getSafeGCoin(data)); // Map each element to get a safe GCoin
}



export interface Coin {
    id: number,
    name: string, 
    mcap: number, 
    source:  string,
    f: number, 
    s: number, 
    t: number,
    d: number, 
    w: number,
    m: number,
    f_volu: number,
    s_volu: number,
    t_volu: number,
    d_volu: number,
    w_volu: number,
    m_volu: number,
    f_vol: number,
    s_vol: number,
    t_vol: number,
    d_vol: number,
    w_vol: number,
    m_vol: number,
    f_chart:  OHCL[],
    s_chart:  OHCL[],
    t_chart:  OHCL[],
    d_chart:  OHCL[],
    w_chart:  OHCL[],
    m_chart:  OHCL[],
    seasonality:  string
}

export const defaultCoin: Coin = {
    id: 0,
    name: 'Unknown',
    mcap: 0,
    source: 'Unknown',
    f: 0,
    s: 0,
    t: 0,
    d: 0,
    w: 0,
    m: 0,
    f_volu: 0,
    s_volu: 0,
    t_volu: 0,
    d_volu: 0,
    w_volu: 0,
    m_volu: 0,
    f_vol: 0,
    s_vol: 0,
    t_vol: 0,
    d_vol: 0,
    w_vol: 0,
    m_vol: 0,
    f_chart: [defaultOHCL],
    s_chart: [defaultOHCL],
    t_chart: [defaultOHCL],
    d_chart: [defaultOHCL],
    w_chart: [defaultOHCL],
    m_chart: [defaultOHCL],
    seasonality: '',
};
  
export function getSafeCoin(data: Partial<Coin>): Coin {
    return {
      id: data.id ?? defaultCoin.id,
      name: data.name ?? defaultCoin.name,
      mcap: data.mcap ?? defaultCoin.mcap,
      source: data.source ?? defaultCoin.source,
      f: data.f ?? defaultCoin.f,
      s: data.s ?? defaultCoin.s,
      t: data.t ?? defaultCoin.t,
      d: data.d ?? defaultCoin.d,
      w: data.w ?? defaultCoin.w,
      m: data.m ?? defaultCoin.m,
      f_volu: data.f_volu ?? defaultLCoin.f_volu,
      s_volu: data.s_volu ?? defaultLCoin.s_volu,
      t_volu: data.t_volu ?? defaultLCoin.t_volu,
      d_volu: data.d_volu ?? defaultLCoin.d_volu,
      w_volu: data.w_volu ?? defaultLCoin.w_volu,
      m_volu: data.m_volu ?? defaultLCoin.m_volu,
      f_vol: data.f_vol ?? defaultLCoin.f_vol,
      s_vol: data.s_vol ?? defaultLCoin.s_vol,
      t_vol: data.t_vol ?? defaultLCoin.t_vol,
      d_vol: data.d_vol ?? defaultLCoin.d_vol,
      w_vol: data.w_vol ?? defaultLCoin.w_vol,
      m_vol: data.m_vol ?? defaultLCoin.m_vol,
      f_chart: data.f_chart ?? defaultCoin.f_chart,
      s_chart: data.s_chart ?? defaultCoin.s_chart,
      t_chart: data.t_chart ?? defaultCoin.t_chart,
      d_chart: data.d_chart ?? defaultCoin.d_chart,
      w_chart: data.w_chart ?? defaultCoin.w_chart,
      m_chart: data.m_chart ?? defaultCoin.m_chart,
      seasonality: data.seasonality ?? defaultCoin.seasonality,
    };
}
  


export interface CoinRef {
    id: number,
    name: string
}

export const defaultCoinRef: CoinRef = {
    id: 0,
    name: 'Unknown',
};
  
export function getSafeCoinRef(data: Partial<CoinRef>): CoinRef {
    return {
      id: data.id ?? defaultCoinRef.id,
      name: data.name ?? defaultCoinRef.name,
    };
}

export function getSafeCoinRefList(dataList: Partial<CoinRef>[]): CoinRef[] {
    return dataList.map(data => getSafeCoinRef(data)); // Map each element to get a safe LCoin
}


export interface FormCoin {
    ticker: string,
    name: string,
    source: string,
    category: string,
}

