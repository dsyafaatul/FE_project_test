import { Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Await, Form, useActionData, useLoaderData, useSearchParams, useSubmit } from "react-router-dom";

export default function User(){
    const {data, terminal} = useLoaderData()
    const [searchParams,] = useSearchParams()
    const q = searchParams.get('q')
    const submit = useSubmit()
    const [showModal, setShowModal] = useState(false)
    const [userData, setUserData] = useState({
        userId: '',
        username: '',
        password: '',
        terminalId: ''
    })
    const actionData = useActionData()
    const username = useRef(null)

    useEffect(() => {
        if(!q){
            document.querySelector('[name=q]').value = ''
        }
    }, [q])

    useEffect(() => {
        if(showModal){
            username.current.focus()
        }
    }, [showModal])

    useEffect(() => {
        if(actionData && ['POST', 'PUT'].includes(actionData.method) && actionData.ok){
            setShowModal(false)
        }
    }, [actionData])

    return (
        <>
        <Helmet>
            <title>User</title>
        </Helmet>
        <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <a href={`${import.meta.env.VITE_API_URL}/user/excel`} target="_blank" className="bg-lime-500 text-white px-4 py-2 rounded-md">Export Excel</a>
                <div></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <button onClick={() => {
                    setShowModal(true)
                    setUserData({
                        userId: '',
                        username: '',
                        password: '',
                        terminalId: ''
                    })
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md">Tambah Data</button>
                <form>
                    <input type="text" name="q" className="border rounded-md py-2 px-4 w-full dark:bg-slate-800 dark:text-slate-300" placeholder="Search" defaultValue={q} onChange={(e) => {
                        const first = q === null
                        submit(e.target.form, {
                            replace: !first
                        })
                    }} />
                </form>
            </div>
            <div className="overflow-auto">
                <table className="w-full dark:bg-slate-800 dark:text-slate-300">
                    <thead>
                        <tr className="*:border *:border-slate-300 dark:*:border-slate-500 *:p-1.5">
                            <th>No</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Terminal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Suspense fallback={(
                            <tr className="*:border *:border-slate-300 dark:*:border-slate-500 *:p-1.5">
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        )}>
                            <Await resolve={data} errorElement={(
                                <tr className="*:border *:border-slate-300 dark:*:border-slate-500 *:p-1.5">
                                    <td colSpan="5" className="text-center">Data Gagal dimuat</td>
                                </tr>
                            )}>
                                {(data) => {
                                    if(data.length === 0){
                                        return (
                                            <tr className="*:border *:border-slate-300 dark:*:border-slate-500 *:p-1.5">
                                                <td colSpan="5" className="text-center">Data Kosong</td>
                                            </tr>
                                        )
                                    }

                                    return data.map((row, no) => {
                                        return (
                                            <tr className="*:border *:border-slate-300 dark:*:border-slate-500 *:p-1.5" key={row.userId}>
                                                <td className="text-right">{no+1}</td>
                                                <td>{row.username}</td>
                                                <td>Encrypted</td>
                                                <td>{row.terminalName}</td>
                                                <td className="text-center">
                                                    <button onClick={() => {
                                                        setShowModal(true)
                                                        setUserData({
                                                            userId: row.userId,
                                                            username: row.username,
                                                            password: '',
                                                            terminalId: row.terminalId
                                                        })
                                                    }} className="bg-orange-500 text-white px-4 py-2 rounded-md m-1">Edit</button>
                                                    <button onClick={() => {
                                                        if(confirm('Yakin ingin menghapus data?')){
                                                            submit({userId: row.userId}, {
                                                                method: 'DELETE'
                                                            })
                                                        }
                                                    }} className="bg-red-500 text-white px-4 py-2 rounded-md m-1">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }}
                            </Await>
                        </Suspense>
                    </tbody>
                </table>
            </div>
            <div className={`${showModal ? 'fixed' : 'hidden'} w-screen h-screen bg-slate-500/40 left-0 top-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-sm`}>
                <div className="bg-white p-4 rounded-md w-full max-w-[90%] sm:max-w-md dark:bg-slate-800">
                    <Form method={userData.userId === '' ? 'POST' : 'PUT'}>
                        <input type="hidden" name="userId" value={userData.userId} />
                        <div className="grid grid-cols-1 gap-2">
                            <label className="dark:text-slate-300" htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" className="border p-2 dark:bg-slate-500" placeholder="Username" value={userData.username} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    username: e.target.value
                                })
                            }} required ref={username} />
                            <label className="dark:text-slate-300" htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="border p-2 dark:bg-slate-500" placeholder="Password" value={userData.password} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    password: e.target.value
                                })
                            }} required={userData.userId === ''} />
                            <label className="dark:text-slate-300" htmlFor="terminalId">Terminal</label>
                            <select name="terminalId" id="terminalId" className="border p-2 dark:bg-slate-500 bg-white" value={userData.terminalId} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    terminalId: e.target.value
                                })
                            }} required>
                                <Suspense fallback={<option disabled={true}>Loading...</option>}>
                                    <Await resolve={terminal} errorElement={<option disabled={true}>Gagal mengambil data</option>}>
                                        {(data) => {
                                            return data.map(row => {
                                                return <option key={row.terminalId} value={row.terminalId}>{row.terminalName}</option>
                                            })
                                        }}
                                    </Await>
                                </Suspense>
                            </select>
                            {actionData && ['POST', 'PUT'].includes(actionData.method) && !actionData.ok && <p className="text-red-500">{actionData.response.message}</p>}
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-400 text-white">Cancel</button>
                                <button className="bg-lime-500 px-4 py-2 rounded-md hover:bg-lime-400">Save</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}