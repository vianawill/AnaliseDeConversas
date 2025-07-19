"use client";

import { X, Phone, MessageSquare, Clock, User } from 'lucide-react';
import { Conversation, Message } from '@/types';
import { cn } from '@/lib/utils';

interface ConversationModalProps {
  conversation: Conversation;
  onClose: () => void;
}

// Dados simulados de mensagens
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Vi seus produtos no site e gostaria de mais informações.',
    timestamp: new Date('2024-01-15T08:00:00'),
    sender: 'client',
    senderName: 'João Silva',
  },
  {
    id: '2',
    text: 'Olá João! Que bom que teve interesse. Sobre qual produto gostaria de saber mais?',
    timestamp: new Date('2024-01-15T08:05:00'),
    sender: 'salesperson',
    senderName: 'Maria Santos',
  },
  {
    id: '3',
    text: 'Estou interessado no produto XYZ. Qual o preço e condições de pagamento?',
    timestamp: new Date('2024-01-15T08:10:00'),
    sender: 'client',
    senderName: 'João Silva',
  },
  {
    id: '4',
    text: 'Perfeito! O produto XYZ custa R$ 2.500,00. Temos várias opções de pagamento: à vista com 10% de desconto ou parcelado em até 12x. Posso preparar uma proposta personalizada para você.',
    timestamp: new Date('2024-01-15T08:15:00'),
    sender: 'salesperson',
    senderName: 'Maria Santos',
  },
  {
    id: '5',
    text: 'Interessante! Pode enviar a proposta sim. Preciso analisar com calma.',
    timestamp: new Date('2024-01-15T08:20:00'),
    sender: 'client',
    senderName: 'João Silva',
  },
  {
    id: '6',
    text: 'Claro! Vou preparar uma proposta detalhada e envio ainda hoje. Qual seria o melhor horário para entrar em contato?',
    timestamp: new Date('2024-01-15T08:25:00'),
    sender: 'salesperson',
    senderName: 'Maria Santos',
  },
  {
    id: '7',
    text: 'Pode ser no período da tarde, após 14h. Obrigado pela proposta, vou analisar.',
    timestamp: new Date('2024-01-15T10:30:00'),
    sender: 'client',
    senderName: 'João Silva',
  },
];

export function ConversationModal({ conversation, onClose }: ConversationModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'pending': return 'Pendente';
      case 'closed': return 'Fechado';
      default: return 'Desconhecido';
    }
  };

  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{conversation.clientName}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>{conversation.clientPhone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{conversation.messagesCount} mensagens</span>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  getStatusColor(conversation.status)
                )}>
                  {getStatusText(conversation.status)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'client' ? 'justify-start' : 'justify-end'
                )}
              >
                <div className={cn(
                  "max-w-xs md:max-w-md rounded-lg p-3 shadow-sm",
                  message.sender === 'client' 
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-blue-500 text-white'
                )}>
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={cn(
                      "text-xs",
                      message.sender === 'client' ? 'text-gray-500' : 'text-blue-100'
                    )}>
                      {message.senderName}
                    </span>
                    <span className={cn(
                      "text-xs",
                      message.sender === 'client' ? 'text-gray-500' : 'text-blue-100'
                    )}>
                      {formatMessageTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4 bg-gray-50">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Última mensagem: {formatMessageTime(conversation.timestamp)}</span>
            <span>•</span>
            <span>Vendedor: {conversation.salesperson}</span>
          </div>
        </div>
      </div>
    </div>
  );
}