import { useDashboardStats } from '@/src/hooks/useDashboardStats';
import { MessageSquare, Users, TrendingUp, Clock } from 'lucide-react';


export function DashboardStats() {
  const { stats, loading } = useDashboardStats();

  const statsConfig = [
    {
      name: 'Conversas Hoje',
      value: stats.conversationsToday.toString(),
      icon: MessageSquare,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      name: 'Clientes Ativos',
      value: stats.activeClients.toString(),
      icon: Users,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      name: 'Taxa de Conversão',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      name: 'Tempo Médio',
      value: stats.averageResponseTime,
      icon: Clock,
      change: '-15%',
      changeType: 'positive' as const,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm border animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {statsConfig.map((stat) => (
        <div key={stat.name} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <span className={`text-xs font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}