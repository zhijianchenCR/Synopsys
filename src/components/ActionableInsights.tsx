import { Target, CheckCircle2, ArrowUpRight, Clock } from 'lucide-react';

interface ActionItem {
  priority: 'high' | 'medium' | 'low';
  action: string;
  impact: string;
  effort: string;
  category: string;
}

interface ActionableInsightsProps {
  actions: ActionItem[];
}

const ActionableInsights = ({ actions }: ActionableInsightsProps) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          badge: 'bg-red-100 text-red-700 border-red-300',
          border: 'border-l-red-500',
          dot: 'bg-red-500'
        };
      case 'medium':
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-300',
          border: 'border-l-amber-500',
          dot: 'bg-amber-500'
        };
      default:
        return {
          badge: 'bg-blue-100 text-blue-700 border-blue-300',
          border: 'border-l-blue-500',
          dot: 'bg-blue-500'
        };
    }
  };

  return (
    <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-2.5 rounded-xl shadow-lg">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Actionable Insights</h2>
          <p className="text-sm text-gray-600 font-medium">Recommended actions to improve performance</p>
        </div>
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => {
          const styles = getPriorityStyles(action.priority);
          return (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-xl p-5 border-l-4 ${styles.border} shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${styles.dot} animate-pulse`}></div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${styles.badge}`}>
                    {action.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                    {action.category}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900 mb-2">{action.action}</p>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center space-x-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Impact</p>
                        <p className="text-sm font-bold text-gray-900">{action.impact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Effort</p>
                        <p className="text-sm font-bold text-gray-900">{action.effort}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionableInsights;
