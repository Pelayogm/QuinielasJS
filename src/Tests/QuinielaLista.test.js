import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuinielaLista from './QuinielaLista';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          apuestas: [
            {
              jornada: 1,
              fecha: '2023-03-01',
              partidos: [
                {
                  local: 'Seat Leon',
                  visitante: 'Opel Astra',
                  apuestas: { "1": 3, "X": 1, "2": 3 }
                }
              ]
            }
          ]
        })
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});


test('Inserta una apuesta nueva', async () => {
  render(<QuinielaLista />);


  await waitFor(() => {
    expect(screen.getByText(/Fecha: 2023-03-01/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Apostar en esta jornada/i));

  fireEvent.change(screen.getByLabelText(/Equipo Local/i), { target: { value: 'Audi A4' } });
  fireEvent.change(screen.getByLabelText(/Equipo Visitante/i), { target: { value: 'Mercedes-Benz Clase C' } });
  fireEvent.change(screen.getByLabelText(/Ganan los locales/i), { target: { value: '4' } });
  fireEvent.change(screen.getByLabelText(/Empate/i), { target: { value: '2' } });
  fireEvent.change(screen.getByLabelText(/Ganan los visitantes/i), { target: { value: '5' } });

  fireEvent.click(screen.getByText(/Apostar en la jornada/i));
  await waitFor(() => {
    expect(screen.getByText(/El Audi A4 contra el Mercedes-Benz Clase C/i)).toBeInTheDocument();
    expect(screen.getByText(/1 \(4\) \/ X \(2\) \/ 2 \(5\)/i)).toBeInTheDocument();
  });
});
