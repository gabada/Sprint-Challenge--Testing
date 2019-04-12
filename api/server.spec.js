const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
  describe('POST /', () => {
    beforeEach(async () => {
      await db('vgames').truncate();
    });
    it('endpoint should exist', async () => {
      const response = await request(server).post('/games');
      expect(response.status).not.toBe(404);
    });
    it('should return created game title', async () => {
      const game = { title: 'Tetris', genre: 'Puzzle', releaseYear: 1984 };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.body.title).toBe('Tetris');
    });
    it('should return 201 status in successful create', async () => {
      const game = { title: 'Tetris', genre: 'Puzzle', releaseYear: 1984 };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.status).toBe(201);
      expect(response.status).not.toBe(422);
    });
    it('should return 422 status if game title is missing', async () => {
      const noTitleGame = { genre: 'First-Person Shooter', releaseYear: 1993 };
      const response = await request(server)
        .post('/games')
        .send(noTitleGame);
      expect(response.status).not.toBe(201);
      expect(response.status).toBe(422);
      expect(response.body.error).toBe('Missing title or genre');
    });
    it('should return 422 status if game genre is missing', async () => {
      const noGenreGame = { title: 'Doom', releaseYear: 1993 };
      const response = await request(server)
        .post('/games')
        .send(noGenreGame);
      expect(response.status).not.toBe(201);
      expect(response.status).toBe(422);
      expect(response.body.error).toBe('Missing title or genre');
    });
    it('should return 201 status if game release year is missing', async () => {
      const noYearGame = { title: 'Doom', genre: 'First-Person Shooter' };
      const response = await request(server)
        .post('/games')
        .send(noYearGame);
      expect(response.status).toBe(201);
      expect(response.status).not.toBe(422);
    });
    describe('Check Uniqueness', () => {
      beforeEach(async () => {
        await db('vgames').insert({
          title: 'Tetris',
          genre: 'Puzzle',
          releaseYear: 1984
        });
      });
      it('if not unique game title return 405', async () => {
        const game = { title: 'Tetris', genre: 'Puzzle', releaseYear: 1984 };
        const response = await request(server)
          .post('/games')
          .send(game);
        expect(response.status).toBe(405);
        expect(response.status).not.toBe(201);
        expect(response.status).not.toBe(500);
      });
    });
  });
  describe('GET /', () => {
    it('should respond with 200OK', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
      expect(response.status).not.toBe(500);
      expect(response.status).not.toBeNull();
    });
    describe('Check Array', () => {
      beforeEach(async () => {
        await db('vgames').truncate();
      });
      it('should return an array', async () => {
        const response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBe(true);
      });
      it('should return an empty array', async () => {
        const response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(0);
        expect(response.body).not.toBeNull();
      });
    });
    describe('GET BY ID', async () => {
      beforeEach(async () => {
        await db('vgames').truncate();
        await db('vgames').insert({
          title: 'Tetris',
          genre: 'Puzzle',
          releaseYear: 1984
        });
      });
      it('should return game with ID 1', async () => {
        const response = await request(server).get('/games/1');
        expect(response.body).toHaveProperty('genre');
        expect(response.status).toBe(200);
      });
      it('should return 404 if game with ID not found', async () => {
        const response = await request(server).get('/games/100');
        expect(response.body).not.toHaveProperty('title');
        expect(response.body).not.toHaveProperty('genre');
        expect(response.status).toBe(404);
      });
    });
  });
  describe('DELETE /', async () => {
    beforeEach(async () => {
      await db('vgames').truncate();
      await db('vgames').insert({
        title: 'Tetris',
        genre: 'Puzzle',
        releaseYear: 1984
      });
    });
    it('endpoint should exist', async () => {
      const response = await request(server).delete('/games/1');
      expect(response.status).not.toBe(404);
    });
    it('should return 204', async () => {
      const response = await request(server).delete('/games/1');
      expect(response.status).toBe(204);
    });
    it('should return 404 if game with ID not found', async () => {
      const response = await request(server).delete('/games/100');
      expect(response.status).toBe(404);
    });
  });
});
