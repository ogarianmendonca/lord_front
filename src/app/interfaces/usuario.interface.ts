import { PerfilInterface } from './perfil.interface';

export interface UsuarioInterface {
    id: number;
    name: string;
    email: string;
    imagem: string;
    id_perfil: number;
    st_ativo: boolean;
    created_at: string;
    updated_at: string;
    perfil: PerfilInterface;
}
