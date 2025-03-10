import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function FormularioApuesta({ show, onSubmitApuesta, onClose, jornadas }) {
  const [formData, setFormData] = useState({
    jornadaId: jornadas.length > 0 ? jornadas[0].jornada : '',
    local: '',
    visitante: '',
    apuesta1: '',
    apuestaX: '',
    apuesta2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitApuesta(formData);
    setFormData({
      jornadaId: jornadas.length > 0 ? jornadas[0].jornada : '',
      local: '',
      visitante: '',
      apuesta1: '',
      apuestaX: '',
      apuesta2: ''
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Apuesta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Jornada a apostar</Form.Label>
            
            <Form.Select onChange={handleChange} required>
              {jornadas.map((jornada) => (
                <option value={jornada.jornada}>
                  {`Jornada ${jornada.jornada} - ${jornada.fecha}`}
                </option>
              ))}

            </Form.Select>

          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Equipo Local</Form.Label>
            <Form.Control type="text" name="local" value={formData.local} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Equipo Visitante</Form.Label>
            <Form.Control type="text" name="visitante" value={formData.visitante} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Ganan los locales</Form.Label>
            <Form.Control type="number" name="apuesta1" value={formData.apuesta1} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Empate</Form.Label>
            <Form.Control type="number" name="apuestaX" value={formData.apuestaX} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Ganan los visitantes</Form.Label>
            <Form.Control type="number" name="apuesta2" value={formData.apuesta2} onChange={handleChange} required/>
          </Form.Group>
          <Button variant="success" type="submit">Apostar en la jornada</Button>
          <Button onClick={onClose}>Cerrar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
