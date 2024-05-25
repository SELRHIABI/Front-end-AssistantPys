//Interface 
export interface IChatMessage {
    id: number;
    idUser: number;
    threadId: string | null;
    title: string | null;
}