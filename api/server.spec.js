const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should respond with 200OK', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
      expect(response.status).not.toBe(500);
      expect(response.status).not.toBeNull();
    });
    describe('Check Array', () => {
      it('should return an array', async () => {
        const response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBe(true);
      });
      it('should return an empty array', async () => {
        beforeEach(async () => {
          await db('vgames').truncate();
        });
        const response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(0);
        expect(response.body).not.toBeNull();
      });
    });
  });
});
