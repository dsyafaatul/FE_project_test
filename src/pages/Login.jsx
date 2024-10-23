import { Form, useActionData, useNavigation } from "react-router-dom";

export default function Login(){
    const navigation = useNavigation()
    const data = useActionData()

    return (
        <Form method="POST">
            <div className="flex flex-col w-full h-screen justify-center items-center bg-slate-200">
                <div className="p-4 bg-white rounded-md shadow-lg">
                    {data?.message && <p className="text-red-500 text-center py-4">{data.message}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-[min-content_1fr] gap-4">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" className="border rounded-md p-2" required />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="border rounded-md p-2" required />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="px-4 py-2 rounded-md bg-lime-500 disabled:bg-lime-800" disabled={navigation.state !== 'idle'}>Login</button>
                    </div>
                </div>
            </div>
        </Form>
    )
}