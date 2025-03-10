import { useState, useEffect } from "react";
import { QuinielaContext } from "../Providers/QuinielaProvider";
import { Button, Card, Container, Row } from "react-bootstrap";
import FormularioApuesta from "./FormularioApuesta";

export default function QuinielaLista() {
    const [jornada, setJornada] = useState([])
    const [formulario, setFormulario] = useState(false) 

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
            {jornada.length < 0 ?(
                <p>El json no tiene datos</p>
            ): (
                <>
                    <h1>Carreras deportivas Pelayogm</h1>
                </>
            )}

            {jornada.map((current) => (
                <>
                    <h1>Partidos de La Liga</h1>
                    <h2>Fecha: {current.fecha} Jornada: {current.jornada}</h2>
                    <Button onClick={() => setFormulario(!formulario)}>Apostar en esta jornada</Button>
                    
                    <Container>
                        <Row>
                        {current.partidos.map((currentPartido) => (
                            <Card md={4} lg={4}>
                                <Card.Img variant="top" src="/fotoCard.jpg" />
                                    <Card.Body>
                                    <Card.Title>El {currentPartido.local} contra el {currentPartido.visitante}</Card.Title>
                                    <p>
                                        1 ({currentPartido.apuestas["1"]}) / X ({currentPartido.apuestas["X"]}) / 2 ({currentPartido.apuestas["2"]})
                                    </p>
                                </Card.Body>
                            </Card>
                        ))}
                        </Row>
                    </Container>
                </>
            ))}

            {formulario && (
                <FormularioApuesta show={formulario}/>
            )}
        </>
    )
}