import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form, Container } from "react-bootstrap";

export default function FormularioApuesta({show}) {
    const handleClose = useState(false);

    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                    <Modal.Title>Nueva Apuesta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="text" name="fecha" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jornada</Form.Label>
                            <Form.Control type="number" name="jornada" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Equipo Local</Form.Label>
                            <Form.Control type="text" name="local" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Equipo Visitante</Form.Label>
                            <Form.Control type="text" name="visitante" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apuesta 1</Form.Label>
                            <Form.Control type="number" name="apuesta1" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apuesta X</Form.Label>
                            <Form.Control type="number" name="apuestaX" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apuesta 2</Form.Label>
                            <Form.Control type="number" name="apuesta2" required />
                        </Form.Group>
                        <Button variant="success" type="submit">Apostar</Button>
                        <Button onClick={() => handleClose()}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
    )
}