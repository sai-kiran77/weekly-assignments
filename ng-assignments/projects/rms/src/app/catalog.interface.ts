export interface subcategory {
    name: string;
    image: string;
}

export interface Category {
    name: string;
    image: string;
    subcategories: subcategory[];
}

export interface Branch {
    branch_id: string;
    name: string;
    categories: Category[]
}

export interface Location {
    branches: Branch[];
    dealers_id: string;
    name: string;
    opco: string;
}

export interface Catalog {
    status: string;
    data: { locations: Location[] };
    error: object;
}
