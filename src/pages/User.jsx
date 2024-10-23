import { Suspense, useEffect } from "react";
import { Await, useLoaderData, useSearchParams, useSubmit } from "react-router-dom";

export default function User(){
    const {data} = useLoaderData()
    const [searchParams,] = useSearchParams()
    const q = searchParams.get('q')
    const submit = useSubmit()

    useEffect(() => {
        if(!q){
            document.querySelector('[name=q]').value = ''
        }
    }, [q])

    return (
        <>
        <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <button className="bg-lime-500 text-white px-4 py-2 rounded-md">Export Excel</button>
                <div></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Tambah Data</button>
                <form>
                    <input type="text" name="q" className="border rounded-md py-2 px-4" placeholder="Search" defaultValue={q} onChange={(e) => {
                        const first = q === null
                        submit(e.target.form, {
                            replace: !first
                        })
                    }} />
                </form>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="*:border *:border-slate-300 *:p-1.5">
                        <th>No</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Terminal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <Suspense fallback={(
                        <tr className="*:border *:border-slate-300 *:p-1.5">
                            <td colSpan="5" className="text-center">Loading...</td>
                        </tr>
                    )}>
                        <Await resolve={data} errorElement={(
                            <tr className="*:border *:border-slate-300 *:p-1.5">
                                <td colSpan="5" className="text-center">Data Gagal dimuat</td>
                            </tr>
                        )}>
                            {(data) => {
                                if(data.length === 0){
                                    return (
                                        <tr className="*:border *:border-slate-300 *:p-1.5">
                                            <td colSpan="5" className="text-center">Data Kosong</td>
                                        </tr>
                                    )
                                }

                                return data.map((row, no) => {
                                    return (
                                        <tr className="*:border *:border-slate-300 *:p-1.5" key={row.userId}>
                                            <td className="text-right">{no+1}</td>
                                            <td>{row.username}</td>
                                            <td>Encrypted</td>
                                            <td>{row.terminalName}</td>
                                            <td className="text-center">
                                                <div className="space-x-2">
                                                    <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Edit</button>
                                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }}
                        </Await>
                    </Suspense>
                </tbody>
            </table>
        </>
    )
}