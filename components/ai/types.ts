export type MessageRole = "user" | "ai";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export type QuickActionId =
  | "website"
  | "mobile"
  | "ai"
  | "game"
  | "seo"
  | "pricing"
  | "consultation";

export type QuickActionIcon =
  | "Globe"
  | "Smartphone"
  | "Bot"
  | "Gamepad2"
  | "TrendingUp"
  | "Briefcase"
  | "Phone";

export interface QuickActionItem {
  id: QuickActionId;
  label: string;
  description: string;
  icon: QuickActionIcon;
  /** Text sent into the chat as if the user typed it */
  prompt: string;
}
