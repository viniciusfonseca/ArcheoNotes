import { useObjectState } from "./useObjectState"
import { useEffect } from "react"

export function useAsyncState({
    fetchData = () => Promise.resolve()
}, deps = []) {

    const [ getState, setState ] = useObjectState({
        data: null,
        loading: true
    })

    const { data, loading } = getState()

    useEffect(() => {
        setState({ loading: true })
        fetchData()
    }, deps)

    return {
        data,
        loading,
        setData(data: any) { setState({ data, loading: false }) },
    }
}