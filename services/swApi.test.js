import { getAll } from './swApi'

import page1 from '../cypress/fixtures/people/page1.json'
import page9 from '../cypress/fixtures/people/page9.json'

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('Star Wars API test', () => {
  test('should return 10 records on page 1', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(page1),
      })
    );

    const result = await getAll()
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/people?page=1`)
    expect(result.results).toHaveLength(10)
  })

  test('should return less than10 records on last page', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(page9),
      })
    );

    const result = await getAll(9)
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/people?page=9`)
    expect(result.results).not.toHaveLength(10)
  })
})