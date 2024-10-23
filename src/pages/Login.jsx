export default function Login(){
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center bg-slate-200">
            <div className="p-4 bg-white rounded-md shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-[min-content_1fr] gap-4">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="border rounded-md" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="border rounded-md" />
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 rounded-md bg-lime-500">Login</button>
                </div>
            </div>
        </div>
    )
}