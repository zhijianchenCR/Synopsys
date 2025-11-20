export interface Competitor {
    domain: string;
    name: string;
    focus: string;
    strengths: string;
    weaknesses: string;
    commonKeywords?: number;
    trafficValue?: string;
}

export interface KeywordOpportunity {
    keyword: string;
    intent: 'Commercial' | 'Informational' | 'Transactional' | 'Navigational' | 'Predictive';
    relevance: number;
    competition: 'Low' | 'Medium' | 'High';
    ctrImpact: 'Low' | 'Medium' | 'High';
    suggestedBid: string;
    keywordType: 'Shared' | 'Gap' | 'Defensive' | 'Predictive';
    rationale: string;
    searchVolume?: number;
    cpc?: number;
}

export interface KeywordCluster {
    id: number;
    label: string;
    intent: string;
    keywords: string[];
}

export const competitors: Competitor[] = [
    {
        domain: 'cadence.com',
        name: 'Cadence',
        focus: 'EDA Tools and Semiconductor IP',
        strengths: 'Strong presence in digital design tools and verification; innovation in AI-driven EDA and IP solutions',
        weaknesses: 'Less integrated system-level verification; slower expansion into AI chip ecosystem',
        commonKeywords: 858,
        trafficValue: '$50.5K'
    },
    {
        domain: 'mentor.com',
        name: 'Mentor (Siemens EDA)',
        focus: 'EDA tools with emphasis on physical verification and PCB design',
        strengths: 'Strong in physical verification and PCB design integration; good customer support and training resources',
        weaknesses: 'Less comprehensive multi-die system integration compared to Synopsys',
        commonKeywords: 690,
        trafficValue: '$17.5K'
    },
    {
        domain: 'ansys.com',
        name: 'Ansys',
        focus: 'Simulation and Multiphysics Engineering Software',
        strengths: 'World-class simulation tools integrated with EDA since acquisition by Synopsys; excellent in EM, thermal and multiphysics analysis',
        weaknesses: 'Limited standalone EDA tool offering, mostly dependent on Synopsys integration'
    },
    {
        domain: 'arm.com',
        name: 'ARM',
        focus: 'Semiconductor IP (CPU, DSP, NPU) and SoC Design',
        strengths: 'Market leader in processor IP, broad ecosystem support; strong in RISC-V and AI edge solutions',
        weaknesses: 'Primarily IP focused, lacking comprehensive EDA toolchain for full design and verification'
    },
    {
        domain: 'tsmc.com',
        name: 'TSMC',
        focus: 'Semiconductor Foundry and Design Enablement',
        strengths: 'Leading foundry with advanced process nodes and design enablement services; strong collaboration with IP and EDA vendors',
        weaknesses: 'Not an EDA vendor per se; dependent on EDA and IP partners for design tools'
    }
];

export const topKeywordOpportunities: KeywordOpportunity[] = [
    {
        keyword: 'AI-powered EDA tools',
        intent: 'Commercial',
        relevance: 95,
        competition: 'High',
        ctrImpact: 'High',
        suggestedBid: '$6.00',
        keywordType: 'Shared',
        rationale: 'High demand for AI design automation, competitors investing heavily here'
    },
    {
        keyword: 'multi-die system integration',
        intent: 'Commercial',
        relevance: 90,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$5.00',
        keywordType: 'Shared',
        rationale: 'Synopsys strength, critical for heterogeneous chip design'
    },
    {
        keyword: 'semiconductor IP for automotive',
        intent: 'Commercial',
        relevance: 85,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.50',
        keywordType: 'Gap',
        rationale: 'Automotive market growth; competitors less focused on software-defined vehicles'
    },
    {
        keyword: 'generative AI design automation',
        intent: 'Predictive',
        relevance: 80,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.00',
        keywordType: 'Predictive',
        rationale: 'Emerging AI copilot tech in EDA, aligns with Synopsys.ai initiatives'
    },
    {
        keyword: 'first-pass silicon success',
        intent: 'Commercial',
        relevance: 85,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.50',
        keywordType: 'Shared',
        rationale: 'Critical to chip developers, less targeted by competitors directly'
    },
    {
        keyword: 'hardware assisted verification',
        intent: 'Commercial',
        relevance: 80,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.25',
        keywordType: 'Gap',
        rationale: 'Leveraging emulation and prototyping tools for faster validation'
    },
    {
        keyword: 'automotive software-defined vehicles',
        intent: 'Commercial',
        relevance: 75,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.00',
        keywordType: 'Gap',
        rationale: 'Growing niche in automotive innovation, content gap exists'
    },
    {
        keyword: 'AI chip design challenges',
        intent: 'Informational',
        relevance: 70,
        competition: 'Low',
        ctrImpact: 'Medium',
        suggestedBid: '$3.50',
        keywordType: 'Shared',
        rationale: 'Educational content to attract AI chip designers'
    },
    {
        keyword: 'cloud-based EDA platform',
        intent: 'Commercial',
        relevance: 70,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.00',
        keywordType: 'Gap',
        rationale: 'Future of EDA tool delivery and collaboration'
    },
    {
        keyword: 'silicon lifecycle management tools',
        intent: 'Commercial',
        relevance: 75,
        competition: 'Low',
        ctrImpact: 'Medium',
        suggestedBid: '$3.75',
        keywordType: 'Shared',
        rationale: 'Important for comprehensive chip management yet less emphasized publicly'
    },
    {
        keyword: 'SoC architecture exploration',
        intent: 'Commercial',
        relevance: 80,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.50',
        keywordType: 'Shared',
        rationale: 'Platform Architect focus area for Synopsys'
    },
    {
        keyword: 'AI chip verification strategies',
        intent: 'Commercial',
        relevance: 75,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.25',
        keywordType: 'Shared',
        rationale: 'Tied to first-pass silicon and AI chip complexity'
    },
    {
        keyword: 'semiconductor design IP suppliers',
        intent: 'Commercial',
        relevance: 80,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$4.00',
        keywordType: 'Gap',
        rationale: 'Opportunity vs competitors focused mainly on EDA tools'
    },
    {
        keyword: 'chiplet design best practices',
        intent: 'Informational',
        relevance: 75,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$3.75',
        keywordType: 'Gap',
        rationale: 'Educational content gap for multi-die and 3DIC design concepts'
    },
    {
        keyword: 'advanced node semiconductor design',
        intent: 'Commercial',
        relevance: 85,
        competition: 'High',
        ctrImpact: 'High',
        suggestedBid: '$5.00',
        keywordType: 'Defensive',
        rationale: 'Critical keyword to protect leadership in foundry collaborations'
    },
    {
        keyword: 'electronic design automation',
        intent: 'Informational',
        relevance: 82,
        competition: 'Low',
        ctrImpact: 'Medium',
        suggestedBid: '$5.22',
        keywordType: 'Shared',
        rationale: 'Core EDA term with 27,100 monthly searches',
        searchVolume: 27100,
        cpc: 5.22
    },
    {
        keyword: 'EDA tools',
        intent: 'Informational',
        relevance: 95,
        competition: 'Low',
        ctrImpact: 'High',
        suggestedBid: '$11.61',
        keywordType: 'Shared',
        rationale: 'Core offerings of Synopsys, targeting engineers',
        searchVolume: 1600,
        cpc: 11.61
    },
    {
        keyword: 'chip design software',
        intent: 'Commercial',
        relevance: 88,
        competition: 'Low',
        ctrImpact: 'Medium',
        suggestedBid: '$7.29',
        keywordType: 'Shared',
        rationale: 'Direct commercial intent from designers',
        searchVolume: 390,
        cpc: 7.29
    },
    {
        keyword: 'EDA software',
        intent: 'Commercial',
        relevance: 90,
        competition: 'Low',
        ctrImpact: 'High',
        suggestedBid: '$12.14',
        keywordType: 'Shared',
        rationale: 'High-value commercial searches',
        searchVolume: 2900,
        cpc: 12.14
    },
    {
        keyword: 'energy efficient SoC design',
        intent: 'Commercial',
        relevance: 70,
        competition: 'Medium',
        ctrImpact: 'Medium',
        suggestedBid: '$3.75',
        keywordType: 'Shared',
        rationale: 'Increasing demand for power-efficient solutions across markets'
    }
];

export const keywordClusters: KeywordCluster[] = [
    {
        id: 1,
        label: 'Heterogeneous Integration Technology',
        intent: 'Informational',
        keywords: [
            'heterogeneous integration',
            'what is heterogeneous integration',
            'heterogeneous integration benefits',
            'heterogeneous integration vs monolithic',
            'heterogeneous integration technologies',
            'heterogeneous integration examples',
            'how does heterogeneous integration work',
            'heterogeneous integration semiconductor'
        ]
    },
    {
        id: 2,
        label: 'Multi-Die Integration Solutions',
        intent: 'Commercial',
        keywords: [
            'multi-die integration',
            'multi-die integration solutions',
            'scalable multi-die integration',
            'multi-die packaging',
            'fast multi-die integration',
            'multi-die semiconductor solutions',
            'best multi-die integration platforms',
            'multi-die system integration'
        ]
    },
    {
        id: 3,
        label: 'Fast Integration Techniques',
        intent: 'Informational',
        keywords: [
            'fast integration techniques',
            'high speed die integration',
            'speed optimization in die integration',
            'fast semiconductor integration',
            'methods for fast chip integration',
            'how to achieve fast integration'
        ]
    },
    {
        id: 4,
        label: 'Heterogeneous Integration Applications',
        intent: 'Informational',
        keywords: [
            'heterogeneous integration applications',
            'heterogeneous integration use cases',
            'multi-die solutions for ai',
            'heterogeneous integration for 5g',
            'applications of multi-die integration',
            'heterogeneous integration in advanced packaging'
        ]
    },
    {
        id: 5,
        label: 'Integration Solutions Providers',
        intent: 'Commercial',
        keywords: [
            'heterogeneous integration providers',
            'multi-die solution providers',
            'best heterogeneous integration companies',
            'leading multi-die integration vendors',
            'top heterogeneous integration solution providers'
        ]
    }
];

export const negativeKeywords: string[] = [
    'EDA tools free',
    'cheap EDA software',
    'DIY chip design',
    'generic semiconductor solutions',
    'DIY kits',
    'cheap parts',
    'free software',
    'toy electronics',
    'legacy EDA',
    'outdated IP',
    'open-source EDA tools',
    'free trial',
    'crack',
    'torrent',
    'pirate',
    'student version',
    'home use',
    'personal use',
    'hobby',
    'educational only',
    'download free',
    'no cost',
    'budget',
    'discount',
    'coupon'
];

export const emergingTrends: string[] = [
    'AI integration throughout EDA workflows',
    'Digital twins for manufacturing optimization',
    'Software-defined vehicles and virtualization',
    'Cloud-native and collaborative EDA platforms',
    'Generative AI copilot technology in chip design',
    'AI-enhanced EDA tools',
    'Automated chip design processes'
];

export const competitiveKeywordGaps: string[] = [
    'AI-powered EDA workflows and generative AI for design automation',
    'Multi-die and heterogeneous integration solutions for chiplets',
    'Automotive silicon design and virtualization for software-defined vehicles',
    'Cloud-based design and verification platforms',
    'First-pass silicon success tactics and methodologies'
];
