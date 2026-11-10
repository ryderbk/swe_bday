export default function AmbientBackground(){
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FFF6FA]">
      <div className="absolute -top-[10%] left-[-15%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,_rgba(252,188,215,0.9),_transparent_70%)] blur-2xl animate-drift-slow" />
      <div className="absolute top-[5%] right-[-20%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,_rgba(239,135,190,0.6),_transparent_70%)] blur-2xl animate-drift-slower" />
      <div className="absolute bottom-[-20%] left-[10%] h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(circle,_rgba(229,153,178,0.55),_transparent_70%)] blur-2xl animate-drift-slow" />
      <div className="absolute bottom-[10%] right-[5%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,_rgba(255,214,167,0.45),_transparent_70%)] blur-2xl animate-drift-slower" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.35)_0%,_rgba(255,246,250,0.1)_35%,_rgba(255,246,250,0.5)_100%)]" />
    </div>
  )
}
