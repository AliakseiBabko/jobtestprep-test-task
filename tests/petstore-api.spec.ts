import { test, expect } from '@playwright/test';
import Ajv from "ajv";
import crocodile from '../data/test-data/new_pet.json';
import schema from '../data/test-data/json_schema.json';
import { userData } from '../data/test-data/user_data';

test('Add a pet (POST)', { tag: ['@api'] }, async ({ request }) => {
  const newCrocodile = Object.assign({id: userData.petId}, crocodile);
  const ajv = new Ajv();

  const newPet = await request.post(`${userData.apiTestUrl}`, {
    headers: {
      'Api_key': `${process.env.API_KEY}`,
      'Content-type': 'application/json'
    },
    data: newCrocodile
  });
  expect(newPet).toBeOK();

  // validate response data
  const validate = ajv.compile(schema);
  const valid = validate(await newPet.json());
  expect(valid, `Schema errors: ${JSON.stringify(validate.errors)}`).toBeTruthy();
});

test('Get the pet (GET)', { tag: ['@api'] }, async ({ request }) => {
  const getPet = await request.get(`${userData.apiTestUrl}/${userData.petId}`);
  expect(getPet).toBeOK();
});

test('Delete the pet (DELETE)', { tag: ['@api'] }, async ({ request }) => {
  const deletePet = await request.delete(`${userData.apiTestUrl}/${userData.petId}`);
  expect(deletePet).toBeOK();

  // Check that that the pet doesn't exist anymore
  const getPet = await request.get(`${userData.apiTestUrl}/${userData.petId}`);
  expect(getPet.status()).toEqual(404);
});

test.skip('Negative test: Error handling (POST)', { tag: ['@api'] }, async ({ request }) => {
  const newCrocodile = Object.assign({id: 'someString'}, crocodile);
  const ajv = new Ajv();

  // validate input data
  const validate = ajv.compile(schema);
  let valid = validate(newCrocodile);
  expect(valid, `Schema errors: ${JSON.stringify(validate.errors)}`).toBeTruthy();

  // the test should stop here because test data is not valid
  // id should be a number, not a string

  const newPet = await request.post(`${userData.apiTestUrl}`, {
    headers: {
      'Api_key': `${process.env.API_KEY}`,
      'Content-type': 'application/json'
    },
    data: newCrocodile
  });

  // if the test data is valid but the status code is 4xx or 5xx
  // the test will fail and the status code will be displayed in the console
  expect(newPet, `status code is ${newPet.status()}`).toBeOK();

  // validate response data
  valid = validate(await newPet.json());
  expect(valid, `Schema errors: ${JSON.stringify(validate.errors)}`).toBeTruthy();
});