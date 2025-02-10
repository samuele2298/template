import { LCoin } from "./coin";

export interface Category {
    id: number,
    name: string,
    mcap: number | null,
    dominance: number | null,
    f: number | null,
    s: number | null,
    t: number | null,
    d: number | null,
    w: number | null,
    m: number | null,
    f_volu: number | null,
    s_volu: number | null,
    t_volu: number | null,
    d_volu: number | null,
    w_volu: number | null,
    m_volu: number | null,
    f_vol: number | null,
    s_vol: number | null,
    t_vol: number | null,
    d_vol: number | null,
    w_vol: number | null,
    m_vol: number | null,
    count: number | null, 
    inv_price_score: number ,
    inv_volu_score: number ,
    inv_vol_score: number ,
    inv_score: number ,
    trd_price_score: number,
    trd_volu_score: number ,
    trd_vol_score: number ,
    trd_score: number ,
    public: boolean | null
}

export const defaultCategory: Category = {
    id: 0,               
    name: 'No Category',     
    mcap: 0,             
    dominance: 0,        
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
    count: 0,               
    inv_price_score: 0,
    inv_volu_score: 0,
    inv_vol_score: 0,
    inv_score: 0,
    trd_price_score: 0,
    trd_volu_score: 0,
    trd_vol_score: 0,
    trd_score: 0,
    public: true
      
};
  
export function getSafeCategory(data: Partial<Category>): Category {
    return {
      id: data.id ?? defaultCategory.id,
      name: data.name ?? defaultCategory.name,
      mcap: data.mcap ?? defaultCategory.mcap,
      dominance: data.dominance ?? defaultCategory.dominance,
      f: data.f ?? defaultCategory.f,
      s: data.s ?? defaultCategory.s,
      t: data.t ?? defaultCategory.t,
      d: data.d ?? defaultCategory.d,
      w: data.w ?? defaultCategory.w,
      m: data.m ?? defaultCategory.m,
      f_volu: data.f_volu ?? defaultCategory.f_volu,
      s_volu: data.s_volu ?? defaultCategory.s_volu,
      t_volu: data.t_volu ?? defaultCategory.t_volu,
      d_volu: data.d_volu ?? defaultCategory.d_volu,
      w_volu: data.w_volu ?? defaultCategory.w_volu,
      m_volu: data.m_volu ?? defaultCategory.m_volu,
      f_vol: data.f_vol ?? defaultCategory.f_vol,
      s_vol: data.s_vol ?? defaultCategory.s_vol,
      t_vol: data.t_vol ?? defaultCategory.t_vol,
      d_vol: data.d_vol ?? defaultCategory.d_vol,
      w_vol: data.w_vol ?? defaultCategory.w_vol,
      m_vol: data.m_vol ?? defaultCategory.m_vol,
      count: data.count ?? defaultCategory.count,
      inv_price_score: data.inv_price_score ?? defaultCategory.inv_price_score,
      inv_volu_score: data.inv_volu_score ?? defaultCategory.inv_volu_score,
      inv_vol_score: data.inv_vol_score ?? defaultCategory.inv_vol_score,
      inv_score: data.inv_score ?? defaultCategory.inv_score,
      trd_price_score: data.trd_price_score ?? defaultCategory.trd_price_score,
      trd_volu_score: data.trd_volu_score ?? defaultCategory.trd_volu_score,
      trd_vol_score: data.trd_vol_score ?? defaultCategory.trd_vol_score,
      trd_score: data.trd_score ?? defaultCategory.trd_score,
      public: data.public ?? defaultCategory.public,
    };
}

export function getSafeCategoryList(dataList: Partial<Category>[]): Category[] {
    return dataList.map(data => getSafeCategory(data)); 
}

export interface SCategory {
    id: number,
    name: string,
    d: number,
    score: number,
    count: number,
}

export const defaultSCategory: SCategory = {
    id: 0,
    name: 'Unknown',
    d: 0,
    score: 0,
    count: 0,      
};
  
export function getSafeSCategory(data: Partial<SCategory>): SCategory {
    return {
      id: data.id ?? defaultSCategory.id,
      name: data.name ?? defaultSCategory.name,
      d: data.d ?? defaultSCategory.d,
      count: data.count ?? defaultSCategory.count,
      score: data.score ?? defaultSCategory.score,
    };
}

export function getSafeSCategoryList(dataList: Partial<SCategory>[]): SCategory[] {
    return dataList.map(data => getSafeSCategory(data)); 
}

export interface UpdCategory {
    id: number,
    name: string,
    coins: number[]
}

