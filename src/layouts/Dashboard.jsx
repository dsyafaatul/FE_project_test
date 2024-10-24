import { useState } from "react"
import { NavLink, Outlet, useFetcher } from "react-router-dom"

export default function Dashboard(){
    const [showSideBarMobile, setShowSidebarMobile] = useState(false)
    const fetcher = useFetcher()

    return (
        <div className="flex h-screen">
            <aside className={`w-full sm:w-auto absolute sm:static top-0 bottom-0 transition-all ${showSideBarMobile ? 'left-0' : '-left-full'} backdrop-blur-sm`} onClick={(e) => {
                if(e.target == e.currentTarget){
                    setShowSidebarMobile(!showSideBarMobile)
                }
            }}>
                <nav className="h-full w-60 p-4 bg-slate-100 border-r-2">
                    <ul className="space-y-2">
                        <li className="has-[ul]:border-t-2"><NavLink end to="/dashboard" className={({isActive}) => `block rounded-lg p-2 ${isActive && 'bg-slate-300'} hover:bg-slate-200`}>Home</NavLink></li>
                        <li className="has-[ul]:border-t-2">
                            <span className="block p-2 text-slate-600">Master</span>
                            <ul className="ml-4 space-y-1">
                                <li className="has-[ul]:border-t-2"><NavLink end to="/dashboard/user" className={({isActive}) => `block rounded-lg p-2 ${isActive && 'bg-slate-300'} hover:bg-slate-200`}>User</NavLink></li>
                                <li className="has-[ul]:border-t-2"><NavLink end to="/dashboard/terminal" className={({isActive}) => `block rounded-lg p-2 ${isActive && 'bg-slate-300'} hover:bg-slate-200`}>Terminal</NavLink></li>
                            </ul>
                        </li>
                        <li className="has-[ul]:border-t-2">
                            <span className="block p-2 text-slate-600">Announce</span>
                            <ul className="ml-4 space-y-1">
                                <li className="has-[ul]:border-t-2"><NavLink end to="/dashboard/announce/vessel" className={({isActive}) => `block rounded-lg p-2 ${isActive && 'bg-slate-300'} hover:bg-slate-200`}>Vessel</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="grow">
                <div className="flex justify-between items-center bg-slate-100 border-b-2 p-4 group/user">
                    <div className="flex items-center">
                        <button onClick={() => setShowSidebarMobile(!showSideBarMobile)} className="sm:hidden">
                            <svg
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                            >
                                <path
                                d="M4 18L20 18"
                                stroke="#000000"
                                strokeWidth={2}
                                strokeLinecap="round"
                                />
                                <path
                                d="M4 12L20 12"
                                stroke="#000000"
                                strokeWidth={2}
                                strokeLinecap="round"
                                />
                                <path
                                d="M4 6L20 6"
                                stroke="#000000"
                                strokeWidth={2}
                                strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                        <span>Admin (Terminal Domestik)</span>
                        <input type="checkbox" id="menu_atas" className="hidden"/>
                        <div className="relative">
                            <label htmlFor="menu_atas"><img src="/user.png" alt="user" className={`w-10 h-10 rounded-full cursor-pointer hover:ring-2 ${showSideBarMobile && 'blur-sm'} sm:blur-0`} /></label>
                            <div className="absolute bottom-0 right-0 hidden group-has-[:checked]/user:block">
                                <ul className="absolute top-0 right-0 bg-white shadow-lg rounded-md p-2 text-nowrap min-w-52">
                                    <li>
                                        <fetcher.Form action="/logout" method="DELETE">
                                            <button className="block w-full text-left p-2 hover:bg-slate-100">Logout</button>
                                        </fetcher.Form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4"
                >
                    <Outlet />
                </div>
            </main>
        </div>
    )
}