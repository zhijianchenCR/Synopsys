import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { useSEMrushData } from '../hooks/useSEMrushData';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    chart?: ChartData;
}

interface ChartData {
    type: 'bar' | 'line' | 'pie';
    data: any[];
    title: string;
}

const suggestedQuestions = [
    "What are my top performing keywords?",
    "Show me traffic trends for the last 3 months",
    "Compare organic vs paid traffic performance",
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

            const systemPrompt = `You are Synopsys AI, an expert marketing analytics assistant specializing in SEMrush data analysis.
Your role is to help users understand their marketing performance, identify opportunities, and provide actionable insights.

Key capabilities:
- Analyze traffic trends, keyword performance, and competitor data
- Provide strategic recommendations for SEO and SEM optimization
- Generate insights from organic and paid search data
- Help identify growth opportunities and areas for improvement

When users ask for charts or visualizations, respond with a JSON object in this exact format at the end of your message:
CHART_DATA: {"type": "bar|line|pie", "data": [...], "title": "Chart Title"}

Available data context:
- Total Keywords: ${data?.organicKeywords.length || 0} organic, ${data?.paidKeywords.length || 0} paid
- Top performing keywords with rankings and traffic data
- Traffic trends over time (visits, unique visitors, bounce rate)
- Geographic distribution of traffic
- Competitor analysis and market positioning

Always provide specific, actionable insights based on the Synopsys platform's SEMrush data. Keep responses concise but informative.`;

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
            const chartMatch = assistantMessage.match(/CHART_DATA:\s*({.*})/);
            if (chartMatch) {
                try {
                    chartData = JSON.parse(chartMatch[1]);
                    assistantMessage = assistantMessage.replace(/CHART_DATA:\s*{.*}/, '').trim();
                } catch (e) {
                    console.error('Failed to parse chart data:', e);
                }
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

    const renderChart = (chart: ChartData) => {
        return (
            <div className="mt-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                <h4 className="text-sm font-bold text-gray-900 mb-3">{chart.title}</h4>
                <div className="text-xs text-gray-600">
                    Chart visualization: {chart.type} chart with {chart.data.length} data points
                </div>
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
                <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
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

                    <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-gradient-to-b from-gray-50 to-white">
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
