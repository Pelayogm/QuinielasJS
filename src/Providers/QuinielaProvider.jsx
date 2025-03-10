import { Children, createContext, useState , useEffect} from "react";

export const QuinielaContext = createContext(null)
export const QuinielaProvider = ({children}) => {
    const [jornada, setJornada] = useState([])

    useEffect(() => {
        const cargarJornadas = async() => {
            const response = await fetch('/quinielas.json')
            const json = await response.json()
            setJornada(json.apuestas)
        }
        cargarJornadas()
    }, []);

    return (
        <>
            <QuinielaContext.Provider value={{jornada}}>
                {children}
            </QuinielaContext.Provider>
        </>
    )
}