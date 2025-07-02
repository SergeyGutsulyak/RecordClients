// src/database/fixtures/ClientFixtures.ts
import { Client } from '../../types/Client';

export const mockClients: Client[] = [
  {
    id: 'client_123',
    name: 'Иван Иванов',
    phone: '+79001234567',
    email: 'ivan@example.com',
  },
  {
    id: 'client_456',
    name: 'Мария Петрова',
    phone: '+79007654321',
    email: 'maria@example.com',
  },
  {
    id: 'client_789',
    name: 'Александр Смирнов',
    phone: '+79009876543',
    email: null,
  },
];