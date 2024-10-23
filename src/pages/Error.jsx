import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export default function Error(){
    const error = useRouteError()
    const isRouteError = isRouteErrorResponse(error)
    if(import.meta.env.DEV) console.log(error)

    return (
        <div className="container mx-auto">
            <div className="flex flex-col w-full h-screen justify-center items-center space-y-4">
                <h1 className="text-6xl">OOPS!</h1>
                <p>{isRouteError ? `${error.status} - ${error.data.message || error.statusText}` : 'Something went wrong'}</p>
            </div>
        </div>
    )
}