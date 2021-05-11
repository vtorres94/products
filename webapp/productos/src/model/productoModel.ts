export interface IProducto {
  id?: number;
  producto?: string | null;
  imageBase64?: string | null;
  category?: string | null;
  description?: string | null;
}

export const defaultValue: Readonly<IProducto> = {};
