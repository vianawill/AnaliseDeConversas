"use client";

import { useState, useEffect } from 'react';
import { Sidebar } from '@/src/components/Sidebar';
import { ConversationsList } from '@/src/components/ConversationsList';
import { AIAnalysisModal } from '@/src/components/AIAnalysisModal';
import { DashboardStats } from '@/src/components/DashboardStats';
import { ConversationModal } from '@/src/components/ConversationModal';
import { Conversation } from '@/src/types';
import { useConversations } from '@/src/hooks/useConversations';
import { useAIAnalysis } from '@/src/hooks/useAIAnalysis';

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'closed'>('all');

  // Hooks customizados para integração com Laravel
  const { conversations, loading: conversationsLoading } = useConversations({
    search: searchTerm,
    status: statusFilter,
  });

  const { analysis, loading: analysisLoading } = useAIAnalysis(
    showAIAnalysis ? selectedConversation?.id || null : null
  );

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowConversationModal(true);
  };

  const handleAIAnalysisClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowAIAnalysis(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard de Vendas</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">MS</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <DashboardStats />
            <ConversationsList 
              conversations={conversations}
              loading={conversationsLoading}
              onConversationClick={handleConversationClick}
              onAIAnalysisClick={handleAIAnalysisClick}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      {showAIAnalysis && selectedConversation && (
        <AIAnalysisModal
          conversation={selectedConversation}
          analysis={analysis}
          loading={analysisLoading}
          onClose={() => setShowAIAnalysis(false)}
        />
      )}

      {showConversationModal && selectedConversation && (
        <ConversationModal
          conversation={selectedConversation}
          onClose={() => setShowConversationModal(false)}
        />
      )}
    </div>
  );
}