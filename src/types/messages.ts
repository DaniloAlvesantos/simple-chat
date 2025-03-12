import { Timestamp } from "firebase/firestore";

export type MessageType = {
  createdAt: Timestamp;
  avatarUrl: string;
  text: string;
  uid: string;
  name:string;
};
