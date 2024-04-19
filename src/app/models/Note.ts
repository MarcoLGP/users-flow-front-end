export interface INote {
    noteId: number;
    title: string;
    content: string;
    locked: boolean;
    public: boolean;
    created: string;
};

export interface IAddNote {
    title: string;
    content: string;
    locked: boolean;
    public: boolean;
};