import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './header'
import { HEADER_MESSAGE } from './constants'

test('header message', () => {
  const {getByText} = render(<Header/>)
  expect(getByText(HEADER_MESSAGE)).toBeInTheDocument()
})