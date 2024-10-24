import { Form, useActionData, useNavigation } from "react-router-dom";

export default function Login(){
    const navigation = useNavigation()
    const actionData = useActionData()

    return (
        <Form method="POST">
            <div className="flex flex-col w-full h-screen justify-center items-center bg-slate-200 dark:bg-slate-800">
                <div className="p-4 bg-white rounded-md shadow-lg dark:bg-slate-700">
                    {actionData?.message && <p className="text-red-500 text-center py-4">{actionData.message}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-[min-content_1fr] gap-4 items-center">
                        <label htmlFor="username" className="dark:text-slate-400">Username</label>
                        <input type="text" name="username" id="username" className="border rounded-md p-2 dark:bg-slate-500 dark:placeholder:text-slate-300" placeholder="Masukan Username" required />
                        <label htmlFor="password" className="dark:text-slate-400">Password</label>
                        <input type="password" name="password" id="password" className="border rounded-md p-2 dark:bg-slate-500 dark:placeholder:text-slate-300" placeholder="Masukan Username" required />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="px-4 py-2 rounded-md bg-lime-500 disabled:bg-lime-800" disabled={navigation.state !== 'idle'}>Login</button>
                    </div>
                </div>
            </div>
        </Form>
    )
}