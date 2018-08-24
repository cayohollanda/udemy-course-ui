export interface ClienteDTO {
  id: number;
  nome: string;
  email: string;
  // a interrogação torna o atributo como opcional
  imageUrl?: string;
}
