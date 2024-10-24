import { Suspense, useEffect, useRef, useState } from "react"
import { Await, Form, useActionData, useLoaderData, useSearchParams, useSubmit } from "react-router-dom"

export default function Terminal(){
    const {data} = useLoaderData()
    const [searchParams,] = useSearchParams()
    const q = searchParams.get('q')
    const submit = useSubmit()
    const [showModal, setShowModal] = useState(false)
    const [terminalData, setTerminalData] = useState({
        terminalId: '',
        terminalCode: '',
        terminalName: ''
    })
    const actionData = useActionData()
    const terminalCode = useRef(null)

    useEffect(() => {
        if(!q){
            document.querySelector('[name=q]').value = ''
        }
    }, [q])

    useEffect(() => {
        if(showModal){
            terminalCode.current.focus()
        }
    }, [showModal])

    useEffect(() => {
        if(actionData && ['POST', 'PUT'].includes(actionData.method) && actionData.ok){
            setShowModal(false)
        }
    }, [actionData])

    return (
        <>
        <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <button className="bg-lime-500 text-white px-4 py-2 rounded-md">Export Excel</button>
                <div></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <button onClick={() => {
                    setShowModal(true)
                    setTerminalData({
                        terminalId: '',
                        terminalCode: '',
                        terminalName: ''
                    })
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md">Tambah Data</button>
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
                        <th>Code</th>
                        <th>Terminal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <Suspense fallback={(
                        <tr className="*:border *:border-slate-300 *:p-1.5">
                            <td colSpan="4" className="text-center">Loading...</td>
                        </tr>
                    )}>
                        <Await resolve={data} errorElement={(
                            <tr className="*:border *:border-slate-300 *:p-1.5">
                                <td colSpan="4" className="text-center">Data Gagal dimuat</td>
                            </tr>
                        )}>
                            {(data) => {
                                if(data.length === 0){
                                    return (
                                        <tr className="*:border *:border-slate-300 *:p-1.5">
                                            <td colSpan="4" className="text-center">Data Kosong</td>
                                        </tr>
                                    )
                                }

                                return data.map((row, no) => {
                                    return (
                                        <tr className="*:border *:border-slate-300 *:p-1.5" key={row.terminalId}>
                                            <td className="text-right">{no+1}</td>
                                            <td>{row.terminalCode}</td>
                                            <td>{row.terminalName}</td>
                                            <td className="text-center">
                                                <div className="space-x-2">
                                                    <button onClick={() => {
                                                        setShowModal(true)
                                                        setTerminalData({
                                                            terminalId: row.terminalId,
                                                            terminalCode: row.terminalCode,
                                                            terminalName: row.terminalName
                                                        })
                                                    }} className="bg-orange-500 text-white px-4 py-2 rounded-md">Edit</button>
                                                    <button onClick={() => {
                                                        if(confirm('Yakin ingin menghapus data?')){
                                                            submit({terminalId: row.terminalId}, {
                                                                method: 'DELETE'
                                                            })
                                                        }
                                                    }} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
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
            <div className={`${showModal ? 'fixed' : 'hidden'} w-screen h-screen bg-slate-500/40 left-0 top-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-sm`}>
                <div className="bg-white p-4 rounded-md w-full max-w-md">
                    <Form method={terminalData.terminalId === '' ? 'POST' : 'PUT'}>
                        <input type="hidden" name="terminalId" value={terminalData.terminalId} />
                        <div className="grid grid-cols-1 gap-2">
                            <label htmlFor="terminalCode">Terminal Code</label>
                            <input type="text" name="terminalCode" id="terminalCode" className="border p-2" placeholder="Terminal Code" value={terminalData.terminalCode} onChange={(e) => {
                                setTerminalData({
                                    ...terminalData,
                                    terminalCode: e.target.value
                                })
                            }} required ref={terminalCode} />
                            <label htmlFor="terminalName">Terminal Name</label>
                            <input type="text" name="terminalName" id="terminalName" className="border p-2" placeholder="Terminal Name" value={terminalData.terminalName} onChange={(e) => {
                                setTerminalData({
                                    ...terminalData,
                                    terminalName: e.target.value
                                })
                            }} required />
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