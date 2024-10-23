export default function Terminal(){
    return (
        <>
        <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <button className="bg-lime-500 text-white px-4 py-2 rounded-md">Export Excel</button>
                <div></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between my-4 space-y-4 sm:space-y-0 sm:items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Tambah Data</button>
                <input type="text" className="border rounded-md py-2 px-4" placeholder="Search" />
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
                    <tr className="*:border *:border-slate-300 *:p-1.5">
                        <td colSpan="4" className="text-center">Data Kosong</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}