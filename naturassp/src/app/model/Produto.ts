import { Categoria } from "./Categoria";

export class Produto {
    public id: number;
    public nome: string;
    public linkFoto: string;
    public detalhe: string;
    public preco: number;
    public disponivel: number;
    public categoria: Categoria;
}