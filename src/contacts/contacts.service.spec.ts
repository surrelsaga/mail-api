import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service.js';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsService],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('adds a new contact with a generated id', () => {
      const created = service.create({ name: 'Emma', email: 'emma@example.com' });

      expect(created.id).toBe(4);
      expect(created.email).toBe('emma@example.com');
      expect(service.findAll()).toHaveLength(4);
    });

    it('throws when the email already exists', () => {
      expect(() =>
        service.create({ name: 'X', email: 'alex@example.com' }),
      ).toThrow(ConflictException);
    });

    it('does not add anything when the email already exists', () => {
      try {
        service.create({ name: 'X', email: 'alex@example.com' });
      } catch {}

      expect(service.findAll()).toHaveLength(3);
    });
  });

  describe('update', () => {
    it('updates the name and email of a contact', () => {
      const updated = service.update(3, { name: 'dan', email: 'daniel@speedback.com' });

      // update() can return undefined (unknown id), so use toMatchObject instead of updated.id
      expect(updated).toMatchObject({ id: 3, name: 'dan', email: 'daniel@speedback.com'});
      expect(service.findAll()).toHaveLength(3);
    });

    it('allows update the name only', () => {
      const updated = service.update(3, { name: 'dan' });

      expect(updated).toMatchObject({ name: 'dan', email: 'daniel@example.com' });
    })

    it('does not update a contact with an existing email', () => {
      expect(() => {
        service.update(3, { email: 'bao@example.com' });
      }).toThrow(ConflictException);
    });

    it('does update a contact with the exact same contact email', () => {
      const updated = service.update(3, { email: 'daniel@example.com' });

      expect(updated).toMatchObject({ email: 'daniel@example.com' });
    });
  })
});
