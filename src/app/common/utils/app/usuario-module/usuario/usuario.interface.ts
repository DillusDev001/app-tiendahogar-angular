import { Persona } from "../../persona-module/persona/persona.interface";

export interface Usuario {
    
    ci: string;
    usuario: string;
    rol: string;
    autorizacion: number;
    fec_mod: string;
    user_mod: string;
    estado: number;
    persona: Persona
    
}