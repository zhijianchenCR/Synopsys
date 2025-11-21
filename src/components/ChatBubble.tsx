import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { useSEMrushData } from '../hooks/useSEMrushData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    colors?: string[];
}

const suggestedQuestions = [
    "What are my top performing keywords?",
    "Show me a chart of traffic trends over time",
    "Compare organic vs paid traffic performance",
    "Show me geographic distribution of visitors",
    "What pages perform best? Show a chart",
    "What are my best opportunities for growth?"
];

const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hello! I'm Synopsys AI, your intelligent marketing analytics assistant. I can help you understand your SEMrush data, identify opportunities, and provide strategic insights. Ask me anything!"
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

        setShowSuggestions(false);
        const userMessage: Message = { role: 'user', content: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

            if (!apiKey || apiKey === 'your_openai_api_key_here') {
                throw new Error('OpenAI API key not configured');
            }

            const dataContext = data ? JSON.stringify({
                totalOrganicKeywords: data.organicKeywords.length,
                totalPaidKeywords: data.paidKeywords.length,
                topOrganicKeywords: data.organicKeywords.slice(0, 10).map(k => ({
                    keyword: k.keyword,
                    position: k.position,
                    searchVolume: k.searchVolume,
                    traffic: k.traffic
                })),
                topPaidKeywords: data.paidKeywords.slice(0, 10).map(k => ({
                    keyword: k.keyword,
                    position: k.position,
                    searchVolume: k.searchVolume
                })),
                trafficTrends: {
                    visits: data.trafficTrends.visits.slice(-6),
                    uniqueVisitors: data.trafficTrends.uniqueVisitors.slice(-6),
                    bounceRate: data.trafficTrends.bounceRate.slice(-6)
                },
                topGeoCountries: data.geoDistribution.visits.slice(0, 5),
                topPages: data.topPages.slice(0, 10),
                topCompetitors: data.competitors.slice(0, 5)
            }) : '{}';

            const systemPrompt = `You are Synopsys AI, an expert marketing analytics assistant for the Synopsys.com website.

🔴 CRITICAL INSTRUCTION 🔴
When users ask for a "chart", "graph", "visualization", or "show me", you MUST include the exact format below.

DO NOT describe the chart. DO NOT explain what kind of chart it is.
JUST PROVIDE YOUR ANALYSIS FOLLOWED BY THE CHART_DATA JSON.

✅ CORRECT Response Format:
"Traffic has been growing steadily over the past months.

CHART_DATA: {"type": "line", "data": [{"date": "Jan", "value": 15000}, {"date": "Feb", "value": 18000}], "title": "Monthly Visits", "xKey": "date", "yKey": "value"}"

❌ WRONG Response Format:
"I'll create a line chart showing traffic trends" (NO CHART_DATA JSON = WRONG)
"Chart visualization: line chart with 4 data points" (NO CHART_DATA JSON = WRONG)

📊 Chart Format Templates:

LINE CHART (trends over time):
CHART_DATA: {"type": "line", "data": [{"date": "Jan", "value": 15000}, {"date": "Feb", "value": 18000}, {"date": "Mar", "value": 21000}], "title": "Traffic Trend", "xKey": "date", "yKey": "value"}

BAR CHART (comparisons):
CHART_DATA: {"type": "bar", "data": [{"name": "Organic", "value": 5000}, {"name": "Paid", "value": 3000}, {"name": "Direct", "value": 2000}], "title": "Traffic by Source", "xKey": "name", "yKey": "value"}

PIE CHART (distributions):
CHART_DATA: {"type": "pie", "data": [{"name": "US", "value": 45}, {"name": "UK", "value": 25}, {"name": "Germany", "value": 30}], "title": "Geographic Distribution"}

Available Synopsys.com data:
${dataContext}

Remember: ALWAYS include CHART_DATA JSON when users request charts!`;

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
            // Try to find CHART_DATA in the response
            const chartMatch = assistantMessage.match(/CHART_DATA:\s*({[\s\S]*?})(?=\n|$)/);
            if (chartMatch) {
                try {
                    const jsonStr = chartMatch[1].trim();
                    chartData = JSON.parse(jsonStr);
                    // Remove the CHART_DATA line from the message
                    assistantMessage = assistantMessage.replace(/CHART_DATA:\s*{[\s\S]*?}(?=\n|$)/, '').trim();
                    console.log('Chart data parsed successfully:', chartData);
                } catch (e) {
                    console.error('Failed to parse chart data:', e);
                    console.error('Attempted to parse:', chartMatch[1]);
                }
            } else {
                console.log('No CHART_DATA found in response');
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

    const CHART_COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#6366f1'];

    const renderChart = (chart: ChartData) => {
        if (!chart.data || chart.data.length === 0) return null;

        return (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-3">{chart.title}</h4>
                <ResponsiveContainer width="100%" height={200}>
                    {chart.type === 'line' && (
                        <LineChart data={chart.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey={chart.xKey || 'name'} tick={{ fontSize: 11 }} stroke="#6b7280" />
                            <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                            <Tooltip contentStyle={{ fontSize: '12px' }} />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Line type="monotone" dataKey={chart.yKey || 'value'} stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                        </LineChart>
                    )}
                    {chart.type === 'bar' && (
                        <BarChart data={chart.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey={chart.xKey || 'name'} tick={{ fontSize: 11 }} stroke="#6b7280" />
                            <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                            <Tooltip contentStyle={{ fontSize: '12px' }} />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Bar dataKey={chart.yKey || 'value'} fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    )}
                    {chart.type === 'pie' && (
                        <PieChart>
                            <Pie
                                data={chart.data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                label={(entry) => entry.name}
                            >
                                {chart.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                >
                    <Bot className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Synopsys AI</h3>
                                <p className="text-blue-100 text-xs">Online · Ready to help</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setShowSuggestions(!showSuggestions)}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                title="Quick questions"
                            >
                                <Sparkles className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {showSuggestions && (
                        <div className="bg-gradient-to-b from-blue-50 to-white border-b border-blue-100 p-3">
                            <p className="text-xs text-gray-700 mb-2 font-semibold">Quick questions:</p>
                            <div className="space-y-1.5">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(question)}
                                        className="w-full text-left p-2 rounded-lg bg-white hover:bg-blue-50 border border-blue-100 hover:border-blue-300 transition-all text-xs text-gray-700 hover:text-blue-900"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-gradient-to-b from-gray-50 to-white min-h-0">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 shadow-sm ${message.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                                            : 'bg-white text-gray-800 border border-gray-200'
                                        }`}
                                >
                                    <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    {message.chart && renderChart(message.chart)}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-2 justify-start">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white rounded-2xl px-3.5 py-2.5 border border-gray-200 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                                placeholder="Ask me anything..."
                                className="flex-1 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={isLoading || !input.trim()}
                                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBubble;
