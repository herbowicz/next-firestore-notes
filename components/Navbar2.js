import ListGroup from 'react-bootstrap/ListGroup'

const Navbar2 = ({ title }) => {

    return (
        <div style={{ display: 'flex' }}>
            <div className='me-3'>
                <h3>{title}</h3>
            </div>
            <ListGroup horizontal>
                <ListGroup.Item>Add</ListGroup.Item>
                <ListGroup.Item>Edit</ListGroup.Item>
                <ListGroup.Item>Delete</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Navbar2