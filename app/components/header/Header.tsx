export default async function Header(){
    return (
        <header className="hero bg-teal-400 text-white top-0 z-10">
            <section className=" max-w-5xl mx-auto p-4 flex justify-between items-center">
                <h1 className="text-3xl font-medium">
                    <a href="#hero">👻 MeCha</a>
                </h1>
                <div className="">
                    <button id="hamburger-button" className="text-4xl md:hidden cursor-pointer">
                        &#9776;
                    </button>
                    <nav className="hidden md:flex md:items-center space-x-8 text-md font-medium" aria-label="main menu">
                            <a href="#stories" className=" hover:opacity-90">Stories</a>
                            <a href="#spotlight" className=" hover:opacity-90">Spotlight</a>
                            <a href="#chat" className=" hover:opacity-90">Chat</a>
                            <a href="#lense" className=" hover:opacity-90">Lenses</a>
                    </nav>
                </div>
            </section>
        </header>
    )
}