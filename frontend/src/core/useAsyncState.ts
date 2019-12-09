import { useObjectState } from "./useObjectState"
import { useEffect } from "react"

interface AsyncStateHookParams {
    initialData?: any,
    fetchData(): Promise<any>
}

export function useAsyncState({
    initialData = null,
    fetchData = () => Promise.resolve()
}: AsyncStateHookParams, deps = []) {

    const [ getState, setState ] = useObjectState({
        data: initialData,
        error: "",
        loading: true
    })

    const { data, loading, error } = getState()

    useEffect(() => {
        setState({ loading: true })
        fetchData()
    }, deps)

    return {
        data,
        error,
        loading,
        setData(data: any) { setState({ data, loading: false }) },
        setError(error: string) { setState({ error }) }
    }
}