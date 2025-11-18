function Header() {
  return (
    <header className="border-b border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/selendra-logo.png" alt="Selendra" className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-lg sm:text-2xl font-bold text-black tracking-tight">
              Selendra <span className="text-primary">Faucet</span>
            </h1>
          </div>
          <nav className="flex gap-4 sm:gap-8">
            <a href="https://selendra.org/docs" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-black hover:opacity-60 transition-opacity">
              Docs
            </a>
            <a href="https://explorer.selendra.org" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-black hover:opacity-60 transition-opacity">
              Explorer
            </a>
            <a href="https://github.com/selendra" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-black hover:opacity-60 transition-opacity hidden sm:block">
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
