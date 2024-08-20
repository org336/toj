export interface Mail {
  email: string;
  purpose: string;
}
export interface PrivateMessage {
  sender_uid: string;
  receiver_uid: string;
  type: number;
  event: string;
  title: string;
  content: string;
}
