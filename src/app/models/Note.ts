// Interface base para campos comuns entre todas as notas
export interface INoteBase {
  title: string;
  content: string;
  public: boolean;
}

export interface INoteCreate extends INoteBase {}

export interface INoteSelected extends INoteBase {
  noteId: number;
}

export interface INote extends INoteBase {
  noteId: number;
  created: string;
  author: string;
}
