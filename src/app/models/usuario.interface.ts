import { Perfil } from './perfil.interface';

export interface Usuario {
    name: string;
    email: string;
    imagem: string;
    perfil_id: number;
    status: boolean;
    created_at: string;
    updated_at: string;
    perfil: Perfil[];
}
