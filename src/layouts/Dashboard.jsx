import { useState } from "react"
import { NavLink, Outlet, useFetcher, useLoaderData } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { Helmet } from "react-helmet"

export default function Dashboard(){
    const [showSideBarMobile, setShowSidebarMobile] = useState(false)
    const fetcher = useFetcher()
    const loaderData = useLoaderData()

    return (
        <UserContext.Provider value={loaderData}>
            <Helmet titleTemplate="%s | Dashboard" />
            <div className="flex h-screen">
                <aside className={`w-full sm:w-auto absolute sm:static top-0 bottom-0 transition-all ${showSideBarMobile ? 'left-0' : '-left-full'} backdrop-blur-sm`} onClick={(e) => {
                    if(e.target == e.currentTarget){
                        setShowSidebarMobile(!showSideBarMobile)
                    }
                }}>
                    <nav className="h-full w-60 p-4 bg-slate-100 border-r-2 dark:border-r-black dark:bg-slate-800">
                        <ul className="space-y-2">
                            <li className="has-[ul]:border-t-2 dark:border-t-slate-500"><NavLink end to="/dashboard" className={({isActive}) => `block rounded-lg p-2 dark:text-white ${isActive && 'bg-slate-300 dark:bg-slate-500'} hover:bg-slate-200 dark:hover:bg-slate-400`}>Home</NavLink></li>
                            <li className="has-[ul]:border-t-2 dark:border-t-slate-500">
                                <span className="block p-2 text-slate-600 dark:text-slate-500">Master</span>
                                <ul className="ml-4 space-y-1">
                                    <li className="has-[ul]:border-t-2 dark:border-t-slate-500"><NavLink end to="/dashboard/user" className={({isActive}) => `block rounded-lg p-2 dark:text-white ${isActive && 'bg-slate-300 dark:bg-slate-500'} hover:bg-slate-200 dark:hover:bg-slate-400`}>User</NavLink></li>
                                    <li className="has-[ul]:border-t-2 dark:border-t-slate-500"><NavLink end to="/dashboard/terminal" className={({isActive}) => `block rounded-lg p-2 dark:text-white ${isActive && 'bg-slate-300 dark:bg-slate-500'} hover:bg-slate-200 dark:hover:bg-slate-400`}>Terminal</NavLink></li>
                                </ul>
                            </li>
                            <li className="has-[ul]:border-t-2 dark:border-t-slate-500">
                                <span className="block p-2 text-slate-600 dark:text-slate-500">Announce</span>
                                <ul className="ml-4 space-y-1">
                                    <li className="has-[ul]:border-t-2 dark:border-t-slate-500"><NavLink end to="/dashboard/announce/vessel" className={({isActive}) => `block rounded-lg p-2 dark:text-white ${isActive && 'bg-slate-300 dark:bg-slate-500'} hover:bg-slate-200 dark:hover:bg-slate-400`}>Vessel</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="grow max-w-full bg-white dark:bg-slate-500">
                    <div className="flex justify-between items-center bg-slate-100 border-b-2 dark:border-b-black p-4 group/user dark:bg-slate-800">
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
                            <span className="capitalize dark:text-slate-300">{loaderData.data.username} ({loaderData.data.terminalName})</span>
                            <input type="checkbox" id="menu_atas" className="hidden"/>
                            <div className="relative">
                                <label htmlFor="menu_atas"><img src="/user.png" alt="user" className={`w-10 h-10 rounded-full cursor-pointer hover:ring-2 ${showSideBarMobile && 'blur-sm'} sm:blur-0`} /></label>
                                <div className="absolute bottom-0 right-0 hidden group-has-[:checked]/user:block">
                                    <ul className="absolute top-0 right-0 bg-white shadow-lg rounded-md text-nowrap min-w-52 dark:bg-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-500">
                                        <li>
                                            <fetcher.Form action="/logout" method="DELETE">
                                                <button className="block w-full text-left p-2">Logout</button>
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
        </UserContext.Provider>
    )
}