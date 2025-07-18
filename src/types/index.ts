export interface Conversation {
  id: string;
  clientName: string;
  clientPhone: string;
  lastMessage: string;
  timestamp: Date;
  status: 'active' | 'pending' | 'closed';
  salesperson: string;
  messagesCount: number;
  hasAIAnalysis: boolean;
}

export interface AIAnalysis {
  conversationId: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  intentProbability: number;
  keyTopics: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  nextActions: string;
  generatedAt: Date;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'client' | 'salesperson';
  senderName: string;
}