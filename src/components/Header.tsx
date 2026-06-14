import React from 'react';

interface HeaderProps {
  compact?: boolean;
}

const Header: React.FC<HeaderProps> = ({ compact = false }) => {
  return (
    <header className="bg-gov-blue text-white w-full">
      {/* Top bar */}
      <div className="bg-gov-blue-dark py-1 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Peru.svg/20px-Flag_of_Peru.svg.png"
            alt="Bandera del Perú"
            className="h-3.5"
          />
          <span className="text-xs text-blue-200">
            Sitio oficial del Gobierno Peruano —{' '}
            <a href="https://www.gob.pe" target="_blank" rel="noreferrer" className="underline hover:text-white">
              gob.pe
            </a>
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className={`max-w-6xl mx-auto px-4 ${compact ? 'py-3' : 'py-4'} flex items-center gap-4`}>
        {/* Shield/Logo placeholder */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 shrink-0">
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L4 7v10c0 7 5.4 13.5 12 15.5C22.6 30.5 28 24 28 17V7L16 2zm0 13a3 3 0 110-6 3 3 0 010 6zm-5 6h10v1.5C19.5 23.8 17.9 24 16 24s-3.5-.2-5-1.5V21z" />
          </svg>
        </div>

        <div>
          <div className="text-xs text-blue-200 uppercase tracking-widest font-medium">
            Despacho Presidencial del Perú
          </div>
          <div className={`text-white font-bold ${compact ? 'text-base' : 'text-lg'} leading-tight`}>
            Despacho Presidencial Te Responde
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
