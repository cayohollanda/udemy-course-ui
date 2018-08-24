export interface ClienteDTO {
  id: string;
  nome: string;
  email: string;
  // a interrogação torna o atributo como opcional
  imageUrl?: string;
}
