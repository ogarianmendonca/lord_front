import { Perfil } from './perfil.interface';

export interface Usuario {
    id: number;
    name: string;
    email: string;
    imagem: string;
    perfil_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    perfil: Perfil[];
}
