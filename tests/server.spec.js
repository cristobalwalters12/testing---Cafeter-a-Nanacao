const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it('GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto', async () => {
    const res = await request(server).get('/cafes');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('obtiene un código 404 al intentar eliminar un café con un id que no existe', async () => {
    const res = await request(server)
      .delete('/cafes/9999')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    expect(res.statusCode).toEqual(404);
  });

  it('POST /cafes agrega un nuevo café y devuelve un código 201', async () => {
    const newCafe = { id: 5, nombre: 'Test Cafe' };
    const res = await request(server).post('/cafes').send(newCafe);
    expect(res.statusCode).toEqual(201);
    expect(res.body.some(c => c.id === newCafe.id && c.nombre === newCafe.nombre)).toBe(true);
  });

  it('PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload', async () => {
    const updatedCafe = { id: 1, nombre: 'Updated Test Cafe' };
    const res = await request(server).put('/cafes/2').send(updatedCafe);
    expect(res.statusCode).toEqual(400);
  });
});