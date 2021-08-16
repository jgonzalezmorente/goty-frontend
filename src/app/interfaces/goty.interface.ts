export interface Goty {
    ok: boolean;
    goty: GotyElement[];
}

export interface GotyElement {
    votos: number;
    _id: string;
    id: string;
    name: string;
    url: string;
}

