import { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import FormularioApuesta from "./FormularioApuesta";

export default function QuinielaLista() {
  const [jornadas, setJornadas] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);

  useEffect(() => {
    const cargarJornadas = async () => {
        const response = await fetch('/quinielas.json');
        const json = await response.json();
        setJornadas(json.apuestas);
    };
    cargarJornadas();
  }, []);

  const nuevaApuesta = (newApuesta) => {
    setJornadas(prevJornadas =>
      prevJornadas.map(jornada => {
        if (jornada.jornada === parseInt(newApuesta.jornadaId)) {
          const newPartido = {
            local: newApuesta.local,
            visitante: newApuesta.visitante,
            apuestas: {
              "1": newApuesta.apuesta1, "X": newApuesta.apuestaX, "2": newApuesta.apuesta2
             }
          };
          return {...jornada, partidos: [...jornada.partidos, newPartido]};
        }
        return jornada;
      })
    );
    setShowFormulario(false);
  };

  return (
    <>
      {jornadas.length <= 0 ? (
        <p>El json no tiene datos</p>
      ) : (
        <>
          <h1>Carreras deportivas Pelayogm</h1>
          
          {jornadas.map((current) => (
            <div key={current.jornada} className="mb-4">
              <h2>Partidos disponibles</h2>
              <h3>
                Fecha: {current.fecha} | Jornada: {current.jornada}
              </h3>
              <Button onClick={() => setShowFormulario(true)}> Apostar en esta jornada</Button>
              <Container className="mt-4">
                <Row>
                  {current.partidos.map((currentPartido) => (
                    <Col md={3}>
                      <Card className="mb-4">
                        <Card.Img variant="top" src="/fotoCard.jpg"/>
                        <Card.Body>
                          <Card.Title>
                            El {currentPartido.local} contra el {currentPartido.visitante}
                          </Card.Title>
                          <p>
                            1 ({currentPartido.apuestas["1"]}) / X ({currentPartido.apuestas["X"]}) / 2 ({currentPartido.apuestas["2"]})
                        </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          ))}
        </>
      )}

      {showFormulario && (
        <FormularioApuesta show={showFormulario} onSubmitApuesta={nuevaApuesta} onClose={() => setShowFormulario(false)} jornadas={jornadas}/>
      )}
    </>
  );
}
