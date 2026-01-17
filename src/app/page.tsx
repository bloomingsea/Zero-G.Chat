import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background-dark font-sans text-gray-100 antialiased overflow-x-hidden grid-pattern">
      <header className="fixed top-0 w-full z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <span className="material-symbols-outlined text-white text-xl">blur_on</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">Zero-G</span>
          </div>
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <li><Link className="hover:text-primary transition-colors" href="#">Home</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#features">Features</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#use-cases">Use Cases</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#pricing">Pricing</Link></li>
          </ul>
          <div className="flex items-center gap-4">
            <Link className="hidden sm:block text-sm font-medium text-gray-300 hover:text-primary transition-colors" href="/login">Login</Link>
            <Link className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20" href="/login">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 pb-20 hero-gradient flex flex-col items-center">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              v2.0 is now live
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-neon-blue">Intelligence</span> Starts Here
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
              Experience the next generation of AI communication. Zero-G provides human-like reasoning, blazingly fast responses, and a workspace built for the future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2" href="/register">
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
                Get Started Free
              </Link>
              <Link className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2" href="https://github.com/bloomingsea/Zero-G.Chat">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                View on GitHub
              </Link>
            </div>
            <div className="relative w-full max-w-6xl mx-auto -mb-64 lg:-mb-96 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-neon-blue/30 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121214] flex aspect-video">
                <div className="w-64 bg-[#0A0A0C] border-r border-white/5 p-4 flex flex-col gap-6 hidden md:flex">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Workspace</span>
                    <span className="material-symbols-outlined text-gray-500 text-sm">more_horiz</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg text-white">
                      <span className="material-symbols-outlined text-lg">home</span>
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-lg">chat_bubble</span>
                      <span className="text-sm font-medium">Recent Chats</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-lg">extension</span>
                      <span className="text-sm font-medium">Integrations</span>
                    </div>
                  </div>
                  <div className="mt-auto p-4 glass rounded-xl">
                    <p className="text-[10px] text-gray-400 mb-2">PRO PLAN</p>
                    <p className="text-xs font-semibold text-white mb-3">Unlimited AI Power</p>
                    <button className="w-full py-2 bg-primary text-white text-[11px] font-bold rounded-lg">Upgrade</button>
                  </div>
                </div>
                <div className="flex-1 bg-[#161618] relative overflow-hidden flex flex-col">
                  <div className="h-16 border-b border-white/5 flex items-center justify-between px-8">
                    <h2 className="font-display font-semibold text-white">Zero-G Assistant</h2>
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-gray-400 text-xl cursor-pointer">search</span>
                      <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10"></div>
                    </div>
                  </div>
                  <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                      <span className="material-symbols-outlined text-3xl">blur_on</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4">Hello, explorer.</h3>
                    <p className="text-gray-400 max-w-lg mb-12">How can I accelerate your workflow today? I can help with code, strategy, or creative writing.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-primary/50 transition-colors cursor-pointer group/card">
                        <div className="flex justify-between items-start mb-4">
                          <span className="material-symbols-outlined text-primary">auto_awesome</span>
                          <span className="material-symbols-outlined text-gray-600 group-hover/card:text-primary transition-colors">arrow_outward</span>
                        </div>
                        <h4 className="font-semibold text-white mb-2">Creative Direction</h4>
                        <p className="text-xs text-gray-500">Generate concepts for your next project.</p>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-primary/50 transition-colors cursor-pointer group/card">
                        <div className="flex justify-between items-start mb-4">
                          <span className="material-symbols-outlined text-neon-blue">code</span>
                          <span className="material-symbols-outlined text-gray-600 group-hover/card:text-neon-blue transition-colors">arrow_outward</span>
                        </div>
                        <h4 className="font-semibold text-white mb-2">Code Refactoring</h4>
                        <p className="text-xs text-gray-500">Optimize and debug your architecture.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-64 lg:h-96"></div>

        {/* Features Section */}
        <section className="py-24 relative overflow-hidden" id="features">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Designed for the Next Decade</h2>
              <p className="text-gray-400 text-lg">Powerful features wrapped in a minimal, high-performance interface that puts your productivity first.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 rounded-3xl bg-deep-obsidian border border-white/10 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20">
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Real-time Inference</h3>
                <p className="text-gray-400 leading-relaxed">Latency-free communication. Our infrastructure is distributed globally to ensure sub-100ms response times.</p>
              </div>
              <div className="group p-8 rounded-3xl bg-deep-obsidian border border-white/10 hover:border-neon-blue/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 bg-neon-blue/10 rounded-2xl flex items-center justify-center text-neon-blue mb-8 border border-neon-blue/20">
                  <span className="material-symbols-outlined text-3xl">shield_with_heart</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Obsidian Privacy</h3>
                <p className="text-gray-400 leading-relaxed">Enterprise-grade encryption by default. Your data is never used for training without your explicit permission.</p>
              </div>
              <div className="group p-8 rounded-3xl bg-deep-obsidian border border-white/10 hover:border-accent-purple/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 bg-accent-purple/10 rounded-2xl flex items-center justify-center text-accent-purple mb-8 border border-accent-purple/20">
                  <span className="material-symbols-outlined text-3xl">hub</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Global Sync</h3>
                <p className="text-gray-400 leading-relaxed">Sync your entire knowledge base across all devices seamlessly. Native apps available for every platform.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 bg-deep-obsidian/50" id="use-cases">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="font-display text-4xl font-bold text-white mb-4">Limitless Possibilities</h2>
                <p className="text-gray-400">Discover how world-class teams are leveraging Zero-G to reinvent their industries.</p>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x">
              <div className="min-w-[320px] md:min-w-[400px] snap-start glass p-8 rounded-3xl">
                <div className="text-primary mb-6"><span className="material-symbols-outlined text-4xl">architecture</span></div>
                <h4 className="text-xl font-bold text-white mb-4">Engineering Teams</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Automate documentation, generate test suites, and refactor legacy codebases 10x faster with deep contextual understanding.</p>
                <a className="text-primary font-semibold flex items-center gap-2 text-sm" href="#">Case Study <span className="material-symbols-outlined text-sm">east</span></a>
              </div>
              <div className="min-w-[320px] md:min-w-[400px] snap-start glass p-8 rounded-3xl">
                <div className="text-neon-blue mb-6"><span className="material-symbols-outlined text-4xl">palette</span></div>
                <h4 className="text-xl font-bold text-white mb-4">Creative Agencies</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Brainstorm campaign concepts, write persuasive copy, and storyboard visual assets in minutes instead of days.</p>
                <a className="text-neon-blue font-semibold flex items-center gap-2 text-sm" href="#">Case Study <span className="material-symbols-outlined text-sm">east</span></a>
              </div>
              <div className="min-w-[320px] md:min-w-[400px] snap-start glass p-8 rounded-3xl">
                <div className="text-accent-purple mb-6"><span className="material-symbols-outlined text-4xl">finance_chip</span></div>
                <h4 className="text-xl font-bold text-white mb-4">Financial Analysts</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Summarize massive earning reports, detect market anomalies, and generate complex financial models using plain English.</p>
                <a className="text-accent-purple font-semibold flex items-center gap-2 text-sm" href="#">Case Study <span className="material-symbols-outlined text-sm">east</span></a>
              </div>
              <div className="min-w-[320px] md:min-w-[400px] snap-start glass p-8 rounded-3xl">
                <div className="text-primary mb-6"><span className="material-symbols-outlined text-4xl">school</span></div>
                <h4 className="text-xl font-bold text-white mb-4">Research Labs</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Synthesize research papers, manage complex datasets, and accelerate the discovery of new scientific breakthroughs.</p>
                <a className="text-primary font-semibold flex items-center gap-2 text-sm" href="#">Case Study <span className="material-symbols-outlined text-sm">east</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 relative" id="pricing">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="font-display text-4xl font-bold text-white mb-6">Predictable Pricing</h2>
              <p className="text-gray-400">Choose the plan that's right for you. No hidden fees, cancel anytime.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-3xl glass border border-white/5 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                  <p className="text-gray-500 text-sm">Explore the basics of Zero-G.</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white">$0</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Basic LLM Access
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    1,000 requests/mo
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Standard Support
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">Get Started</button>
              </div>
              <div className="p-8 rounded-3xl glass glow-border relative flex flex-col h-full transform scale-105 z-20">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Most Popular</div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                  <p className="text-gray-400 text-sm">For power users and creators.</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white">$24</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Advanced Reasoning Models
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Unlimited Requests
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Priority 24/7 Support
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Early Access to Features
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:opacity-90 transition-opacity">Go Professional</button>
              </div>
              <div className="p-8 rounded-3xl glass border border-white/5 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                  <p className="text-gray-500 text-sm">Scale with security and control.</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white">Custom</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-neon-blue text-sm">check_circle</span>
                    Custom Model Training
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-neon-blue text-sm">check_circle</span>
                    Dedicated Infrastructure
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-neon-blue text-sm">check_circle</span>
                    SLA & Account Manager
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-neon-blue text-sm">check_circle</span>
                    SSO & Advanced Security
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-400">Everything you need to know about the Zero-G platform.</p>
            </div>
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6 border border-white/5">
                <button className="w-full flex items-center justify-between text-left group">
                  <span className="font-semibold text-white group-hover:text-primary transition-colors">How secure is my data on Zero-G?</span>
                  <span className="material-symbols-outlined text-gray-500 transition-transform group-focus:rotate-180">expand_more</span>
                </button>
                <div className="mt-4 text-sm text-gray-400 leading-relaxed">
                  We take security seriously. All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We offer SOC2 Type II compliance for enterprise customers and never train on your private conversation data without explicit opt-in.
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/5">
                <button className="w-full flex items-center justify-between text-left group">
                  <span className="font-semibold text-white group-hover:text-primary transition-colors">Can I integrate Zero-G with my existing tools?</span>
                  <span className="material-symbols-outlined text-gray-500">expand_more</span>
                </button>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/5">
                <button className="w-full flex items-center justify-between text-left group">
                  <span className="font-semibold text-white group-hover:text-primary transition-colors">What happens if I exceed my plan's usage?</span>
                  <span className="material-symbols-outlined text-gray-500">expand_more</span>
                </button>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/5">
                <button className="w-full flex items-center justify-between text-left group">
                  <span className="font-semibold text-white group-hover:text-primary transition-colors">Do you offer a student discount?</span>
                  <span className="material-symbols-outlined text-gray-500">expand_more</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="glass rounded-[3rem] p-12 md:p-20 border border-white/10 text-center overflow-hidden relative">
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
              <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none"></div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Ready to accelerate <br />your intelligence?</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                <Link href="/chat" className="px-10 py-5 bg-white text-background-dark font-extrabold rounded-2xl hover:scale-105 transition-transform shadow-xl">Get Started Now</Link>
                <button className="px-10 py-5 glass text-white font-extrabold rounded-2xl hover:bg-white/10 transition-colors border border-white/20">Book a Demo</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-24 pb-12 bg-deep-obsidian border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">blur_on</span>
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-white">Zero-G</span>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                Pioneering the next era of human-AI collaboration with obsidian-level privacy and lightning performance.
              </p>
              <div className="flex items-center gap-4">
                <a className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all" href="#">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </a>
                <a className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all" href="https://github.com/bloomingsea/Zero-G.Chat">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a className="hover:text-primary transition-colors" href="#features">Features</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
                <li><a className="hover:text-primary transition-colors" href="#pricing">Pricing</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a className="hover:text-primary transition-colors" href="#">About</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-white mb-6">Join our Newsletter</h4>
              <p className="text-gray-500 text-sm">Get latest updates and AI insights weekly.</p>
              <div className="relative">
                <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors text-white" placeholder="email@example.com" type="email" />
                <button className="absolute right-2 top-1.5 bg-primary p-1.5 rounded-lg text-white hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-600 font-medium uppercase tracking-widest">
            <p>© 2024 Zero-G Intelligence. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-white transition-colors" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
