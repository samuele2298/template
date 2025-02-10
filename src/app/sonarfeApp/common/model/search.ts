
export interface Search {
    name: string,
    path: string
}

export const defaultSearch: Search = {
    name: '',
    path: ''        
};
  
export function getSafeSearch(data: Partial<Search>): Search {
    return {
      name: data.name ?? defaultSearch.name,
      path: data.path ?? defaultSearch.path,
    };
}


