import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioApuesta from './FormularioApuesta';

test('Todos los campos son obligatorios', () => {
    const jornadasMock = [
      { jornada: 1, fecha: '2023-03-01' },
      { jornada: 2, fecha: '2023-03-02' }
    ];
    const onSubmitApuesta = jest.fn();
    const onClose = jest.fn();
  
    render(
      <FormularioApuesta 
        show={true}
        onSubmitApuesta={onSubmitApuesta}
        onClose={onClose}
        jornadas={jornadasMock}
      />
    );
  
    const selectJornada = screen.getByLabelText(/Jornada a apostar/i);
    const inputLocal = screen.getByLabelText(/Equipo Local/i);
    const inputVisitante = screen.getByLabelText(/Equipo Visitante/i);
    const inputApuesta1 = screen.getByLabelText(/Ganan los locales/i);
    const inputApuestaX = screen.getByLabelText(/Empate/i);
    const inputApuesta2 = screen.getByLabelText(/Ganan los visitantes/i);

    test('Todos los campos son obligatorios', () => {
      expect(selectJornada).toBeRequired();
      expect(inputLocal).toBeRequired();
      expect(inputVisitante).toBeRequired();
      expect(inputApuesta1).toBeRequired();
      expect(inputApuestaX).toBeRequired();
      expect(inputApuesta2).toBeRequired();
    });
  });

  test('El botón "Apostar en la jornada" limpia el formulario después del submit', () => {
    const jornadas = [{ jornada: 1, fecha: '2023-03-01' }];
    const onSubmitApuesta = jest.fn();
    const onClose = jest.fn();
  
    render(
      <FormularioApuesta 
        show={true}
        onSubmitApuesta={onSubmitApuesta}
        onClose={onClose}
        jornadas={jornadas}
      />
    );
  
    fireEvent.change(screen.getByLabelText(/Equipo Local/i), { target: { value: 'Ford Motor Company' } });
    fireEvent.change(screen.getByLabelText(/Equipo Visitante/i), { target: { value: 'Renault Group' } });
    fireEvent.change(screen.getByLabelText(/Ganan los locales/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Empate/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Ganan los visitantes/i), { target: { value: '3' } });
  
    expect(screen.getByLabelText(/Equipo Local/i).value).toBe('Ford Motor Company');
    expect(screen.getByLabelText(/Equipo Visitante/i).value).toBe('Renault Group');
  
    fireEvent.click(screen.getByText(/Apostar en la jornada/i));
  
    expect(onSubmitApuesta).toHaveBeenCalledTimes(1);
  
    expect(screen.getByLabelText(/Equipo Local/i).value).toBe('');
    expect(screen.getByLabelText(/Equipo Visitante/i).value).toBe('');
    expect(screen.getByLabelText(/Ganan los locales/i).value).toBe('');
    expect(screen.getByLabelText(/Empate/i).value).toBe('');
    expect(screen.getByLabelText(/Ganan los visitantes/i).value).toBe('');
    expect(screen.getByLabelText(/Jornada a apostar/i).value).toBe(jornadas[0].jornada.toString());
  });