export interface Comment {
  id: string;
  text: string;
  author: string;
  authorInitials: string;
  timestamp: Date;
  stageId: string;
  stageName: string;
  isPrivate: boolean;
}

export interface Stage {
  id: string;
  title: string;
  category: string;
}
