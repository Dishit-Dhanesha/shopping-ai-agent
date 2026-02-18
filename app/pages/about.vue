<script lang="ts" setup>
const frontendStack = [
  {
    title: 'Nuxt 3',
    description: 'Vue.js framework with SSR, file-based routing, and auto-imports',
    link: 'https://nuxt.com/',
  },
  {
    title: 'Nuxt UI',
    description: 'Beautiful UI component library built on Tailwind CSS',
    link: 'https://ui.nuxt.com/',
  },
  {
    title: 'TypeScript',
    description: 'Type-safe development with full IntelliSense support',
    link: 'https://www.typescriptlang.org/',
  },
  {
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    link: 'https://tailwindcss.com/',
  },
]

const backendStack = [
  {
    title: 'Node.js + Express',
    description: 'Fast, minimalist web framework for building REST APIs',
    link: 'https://expressjs.com/',
  },
  {
    title: 'LangChain',
    description: 'Framework for developing LLM-powered applications',
    link: 'https://www.langchain.com/',
  },
  {
    title: 'LangGraph',
    description: 'Build stateful, multi-actor AI agents with graph-based workflows',
    link: 'https://langchain-ai.github.io/langgraph/',
  },
  {
    title: 'Mistral AI',
    description: 'Powerful open-source LLM for natural language understanding',
    link: 'https://mistral.ai/',
  },
  {
    title: 'Redis',
    description: 'In-memory data store for caching and session management',
    link: 'https://redis.io/',
  },
  {
    title: 'LangCache',
    description: 'Intelligent caching layer for LLM responses and embeddings',
    link: 'https://python.langchain.com/docs/integrations/llm_caching/',
  },
]

const features = [
  {
    icon: '🤖',
    title: 'AI Shopping Assistant',
    description: 'Conversational AI powered by LangChain and LangGraph for personalized product recommendations',
  },
  {
    icon: '🛒',
    title: 'Smart Cart Management',
    description: 'LocalStorage-based cart with real-time updates and persistent state',
  },
  {
    icon: '⚡',
    title: 'Real-time Streaming',
    description: 'ChatGPT-style streaming responses for natural conversation flow',
  },
  {
    icon: '💾',
    title: 'Intelligent Caching',
    description: 'Redis and LangCache for optimized performance and reduced API costs',
  },
]

useSeoMeta({
  title: 'About - AI Assisted Commerce',
  description: 'Learn about the architecture and technology stack powering our AI-driven e-commerce platform',
  ogTitle: 'About - AI Assisted Commerce',
  ogDescription: 'Full-stack e-commerce platform with AI shopping assistant',
  twitterCard: 'summary_large_image',
})

defineOgImageComponent('Nuxt', {
  title: 'AI Assisted Commerce',
  description: 'Full-stack e-commerce platform with AI shopping assistant',
  theme: '#ea580c',
  headline: '',
  colorMode: 'dark',
})
</script>

<template>
  <section class="text-white max-w-7xl px-6 mx-auto">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <SharedHeaderSection
        title="AI Assisted Commerce"
        description="A modern e-commerce platform powered by AI, built with cutting-edge technologies"
      />
    </div>

    <!-- Project Overview -->
    <div class="mb-16 bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
      <h2 class="text-3xl font-bold mb-4 text-orange-500">🎯 Project Overview</h2>
      <p class="text-gray-300 text-lg leading-relaxed">
        This is a full-stack e-commerce application featuring an intelligent AI shopping assistant. 
        The platform combines modern frontend technologies with a powerful backend AI system to provide 
        personalized product recommendations, natural language search, and conversational shopping experiences.
      </p>
    </div>

    <!-- Key Features -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-center text-orange-500">✨ Key Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-orange-500 transition-all"
        >
          <div class="text-4xl mb-3">{{ feature.icon }}</div>
          <h3 class="text-xl font-bold mb-2 text-white">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <!-- Architecture -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-center text-orange-500">🏗️ Architecture</h2>
      
      <!-- Architecture Diagrams -->
      <div class="mb-12 space-y-8">
        <div class="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h3 class="text-2xl font-bold mb-4 text-white text-center">System Flow Diagram</h3>
          <p class="text-gray-400 text-center mb-6">Complete system architecture and data flow</p>
          <div class="flex justify-center bg-white rounded-lg p-4">
            <NuxtImg 
              src="/mermaid-flowchart.svg" 
              alt="System Flow Diagram" 
              class="max-w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        <div class="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h3 class="text-2xl font-bold mb-4 text-white text-center">LangGraph Agent Workflow</h3>
          <p class="text-gray-400 text-center mb-6">Multi-agent system with intelligent routing and caching</p>
          <div class="flex justify-center">
            <NuxtImg 
              src="/architecture-diagram-1.png" 
              alt="LangGraph Agent Workflow" 
              class="rounded-lg max-w-full h-auto border border-gray-700"
              loading="lazy"
            />
          </div>
        </div>

        <div class="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h3 class="text-2xl font-bold mb-4 text-white text-center">Agentic AI Workflow</h3>
          <p class="text-gray-400 text-center mb-6">Complete flow from user query to cached response with Redis integration</p>
          <div class="flex justify-center">
            <NuxtImg 
              src="/architecture-diagram-2.png" 
              alt="Agentic AI Workflow" 
              class="rounded-lg max-w-full h-auto border border-gray-700"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <!-- Frontend Stack -->
      <div class="mb-12">
        <h3 class="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <span class="text-3xl">🎨</span> Frontend Stack
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            v-for="tech in frontendStack"
            :key="tech.title"
            :href="tech.link"
            target="_blank"
            class="bg-gray-900 rounded-lg p-5 border border-gray-800 hover:border-orange-500 hover:translate-y-[-4px] transition-all group"
          >
            <h4 class="font-bold text-white mb-2 group-hover:text-orange-500">{{ tech.title }}</h4>
            <p class="text-sm text-gray-400">{{ tech.description }}</p>
          </a>
        </div>
      </div>

      <!-- Backend Stack -->
      <div>
        <h3 class="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <span class="text-3xl">⚙️</span> Backend Stack
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="tech in backendStack"
            :key="tech.title"
            :href="tech.link"
            target="_blank"
            class="bg-gray-900 rounded-lg p-5 border border-gray-800 hover:border-orange-500 hover:translate-y-[-4px] transition-all group"
          >
            <h4 class="font-bold text-white mb-2 group-hover:text-orange-500">{{ tech.title }}</h4>
            <p class="text-sm text-gray-400">{{ tech.description }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Tech Highlights -->
    <div class="bg-gradient-to-r from-orange-900/20 to-orange-800/20 rounded-2xl p-8 border border-orange-800/50">
      <h2 class="text-3xl font-bold mb-6 text-center text-orange-500">🚀 Technical Highlights</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
        <div>
          <h4 class="font-bold text-white mb-2">Frontend</h4>
          <ul class="space-y-2 text-sm">
            <li>• Server-side rendering with Nuxt 3</li>
            <li>• Type-safe development with TypeScript</li>
            <li>• Responsive UI with Tailwind CSS</li>
            <li>• Real-time streaming chat interface</li>
            <li>• LocalStorage-based cart management</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-white mb-2">Backend</h4>
          <ul class="space-y-2 text-sm">
            <li>• RESTful API with Express.js</li>
            <li>• AI agent workflows with LangGraph</li>
            <li>• LLM integration via LangChain</li>
            <li>• Redis for session & cache management</li>
            <li>• LangCache for optimized LLM responses</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
