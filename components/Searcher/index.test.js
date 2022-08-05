import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Searcher from './index'

describe('searcher test', () => {
  it('should create the component', () => {
    const submitHandler = jest.fn()

    render(<Searcher updateSearch={submitHandler} />)
    expect(screen.getByPlaceholderText('Search...')).toBeVisible()
  });

  it('should send the right search', async () => {
    const submitHandler = jest.fn()

    render(<Searcher updateSearch={submitHandler} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'luke{enter}')

    expect(submitHandler).toHaveBeenCalledWith('luke')
  });
}) 