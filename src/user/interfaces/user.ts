export interface User {
    id: string;
    quota?: number;
    networks?: string[];
    fireAuthId?: string[];
}
