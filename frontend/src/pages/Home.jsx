import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* UPDATED: Changed py-32 to pt-32 pb-64 to push text up above the wave */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-64 flex flex-col items-center text-center">
          
          <span className="bg-blue-600 bg-opacity-30 text-blue-100 text-sm font-semibold px-4 py-1 rounded-full mb-6 border border-blue-400">
            🚀 The Future of Learning is Here
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-md">
            Master Your Skills with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
              SkillBridge
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed font-medium">
            A structured, data-driven platform designed for CSE students to track progress, 
            master algorithms, and achieve academic excellence.
          </p>
          
        </div>
        
        {/* Decorative Curve */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-24 md:h-48" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SkillBridge?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">We provide the tools you need to go from beginner to expert with a structured, data-backed approach.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Structured Paths", icon: "🗺️", desc: "Follow a proven roadmap: Watch, Read, Practice, Test." },
            { title: "Progress Analytics", icon: "📊", desc: "Visual charts and graphs to track your daily improvements." },
            { title: "Expert Content", icon: "🎓", desc: "Curated resources specifically for CSE subjects like DSA & DBMS." },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} SkillBridge. Built for Excellence.</p>
      </footer>
    </div>
  );
}

export default Home;