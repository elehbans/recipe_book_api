import Card from 'react-bootstrap/Card'
import { HEADER_MESSAGE } from './constants'

function Header () {
  return (
        <Card className="recipe-book-header">
            <Card.Header className="recipe-book-header-text">{HEADER_MESSAGE}</Card.Header>
        </Card>
  )
}

export default Header
