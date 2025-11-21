import { useState, useRef, useEffect } from 'react';
import { Bot, Send, TrendingUp, BarChart3, PieChart, Sparkles, User } from 'lucide-react';
import { useSEMrushData } from '../hooks/useSEMrushData';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    chart?: ChartData;
}

interface ChartData {
    type: 'bar' | 'line' | 'pie';
    data: any[];
    title: string;
    xKey?: string;
    yKey?: string;
}

const suggestedQuestions = [
    {
        icon: TrendingUp,
        text: "What are my top performing keywords?",
        color: "text-blue-600 bg-blue-50"
    },
    {
        icon: BarChart3,
        text: "Show me traffic trends for the last 3 months",
        color: "text-emerald-600 bg-emerald-50"
    },
    {
        icon: PieChart,
        text: "Compare organic vs paid traffic performance",
        color: "text-amber-600 bg-amber-50"
    },
    {
        icon: Sparkles,
        text: "What are my best opportunities for growth?",
        color: "text-cyan-600 bg-cyan-50"
    }
];

const SynopsysAIPage = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hello! I'm Synopsys AI, your intelligent marketing analytics assistant. I can help you understand your SEMrush data, identify opportunities, and provide strategic insights. Ask me anything about your traffic, keywords, competitors, or performance metrics!"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { data } = useSEMrushData();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (messageText?: string) => {
        const textToSend = messageText || input;
        if (!textToSend.trim()) return;

        const userMessage: Message = { role: 'user', content: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

            if (!apiKey || apiKey === 'your_openai_api_key_here') {
                throw new Error('OpenAI API key not configured');
            }

            const systemPrompt = `You are Synopsys AI, an expert marketing analytics assistant specializing in SEMrush data analysis.

🔴 CRITICAL: When users request charts, you MUST include properly formatted chart data.

Chart Format Templates (COPY EXACTLY):

LINE CHART:
CHART_DATA: {"type": "line", "data": [{"date": "Jan", "value": 15000}, {"date": "Feb", "value": 18000}, {"date": "Mar", "value": 21000}], "title": "Traffic Trend", "xKey": "date", "yKey": "value"}

BAR CHART:
CHART_DATA: {"type": "bar", "data": [{"name": "Organic", "value": 5000}, {"name": "Paid", "value": 3000}], "title": "Traffic Sources", "xKey": "name", "yKey": "value"}

PIE CHART:
CHART_DATA: {"type": "pie", "data": [{"name": "US", "value": 45}, {"name": "UK", "value": 25}, {"name": "Germany", "value": 30}], "title": "Geographic Distribution"}

RULES:
- Always add analysis text BEFORE the CHART_DATA line
- Put CHART_DATA at the very end
- Use real data from context below
- Include xKey and yKey for line/bar charts

Available Synopsys.com data:
- Total Keywords: ${data?.organicKeywords.length || 0} organic, ${data?.paidKeywords.length || 0} paid
- Traffic trends: ${data?.trafficTrends.visits.slice(-3).map(d => `${d.date}: ${d.value}`).join(', ')}
- Top countries: ${data?.geoDistribution.visits.slice(0, 3).map(d => `${d.country}: ${d.trafficShare}%`).join(', ')}

Keep responses concise and always include CHART_DATA when users ask for visualizations.`;

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: 'user', content: textToSend }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('OpenAI API Error:', errorData);
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            const responseData = await response.json();
            let assistantMessage = responseData.choices[0].message.content;

            let chartData: ChartData | undefined;
            const chartMatch = assistantMessage.match(/CHART_DATA:\s*({[\s\S]*?})(?=\n|$)/);
            if (chartMatch) {
                try {
                    const jsonStr = chartMatch[1].trim();
                    chartData = JSON.parse(jsonStr);
                    assistantMessage = assistantMessage.replace(/CHART_DATA:\s*{[\s\S]*?}(?=\n|$)/, '').trim();
                    console.log('✅ Chart data parsed successfully:', chartData);
                } catch (e) {
                    console.error('❌ Failed to parse chart data:', e);
                    console.error('Attempted to parse:', chartMatch[1]);
                }
            } else {
                console.log('ℹ️ No CHART_DATA found in response');
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: assistantMessage,
                chart: chartData
            }]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `I apologize, but I encountered an error: ${errorMessage}\n\nPlease check the browser console for more details.`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (question: string) => {
        handleSendMessage(question);
    };

    const CHART_COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

    const renderChart = (chart: ChartData) => {
        if (!chart || !chart.data || chart.data.length === 0) {
            return null;
        }

        return (
            <div className="mt-4 p-5 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-xl border-2 border-blue-200/50 shadow-lg">
                <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    {chart.title}
                </h4>
                <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {chart.type === 'line' ? (
                            <LineChart data={chart.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey={chart.xKey || 'name'}
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                                <Line
                                    type="monotone"
                                    dataKey={chart.yKey || 'value'}
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        ) : chart.type === 'bar' ? (
                            <BarChart data={chart.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey={chart.xKey || 'name'}
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                                <Bar
                                    dataKey={chart.yKey || 'value'}
                                    fill="#3b82f6"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        ) : chart.type === 'pie' ? (
                            <RechartsPie>
                                <Pie
                                    data={chart.data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name}: ${entry.value}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chart.data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                            </RechartsPie>
                        ) : null}
                    </ResponsiveContainer>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <Bot className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Synopsys AI Assistant</h2>
                            <p className="text-xs text-gray-700">Your intelligent marketing analytics companion powered by advanced AI</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 flex flex-col">
                    <div className="glass-card rounded-2xl shadow-2xl border-2 border-white/20 flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                                ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                                                : 'bg-white/60 backdrop-blur-sm text-gray-900 border border-white/30'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                        {message.chart && renderChart(message.chart)}
                                    </div>
                                    {message.role === 'user' && (
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/30">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-white/20 bg-white/30 backdrop-blur-sm">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                                    placeholder="Ask me anything about your marketing data..."
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={isLoading || !input.trim()}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20 overflow-y-auto" style={{ height: 'calc(100vh - 280px)' }}>
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Suggested Questions</h3>
                        <div className="space-y-3">
                            {suggestedQuestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion.text)}
                                    className="w-full text-left p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 hover:scale-[1.02] transition-all group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${suggestion.color} flex items-center justify-center flex-shrink-0`}>
                                            <suggestion.icon className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs text-gray-700 leading-relaxed group-hover:text-gray-900">{suggestion.text}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/20">
                            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Quick Tips</h3>
                            <div className="space-y-2 text-xs text-gray-600">
                                <p>• Ask about specific metrics or trends</p>
                                <p>• Request chart visualizations</p>
                                <p>• Get strategic recommendations</p>
                                <p>• Compare performance over time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SynopsysAIPage;
