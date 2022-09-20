import React, {useState} from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault()
        navigate((query ? `/search/?query/${query}` : '/search'));
    }

    return (
        <Form className="d-flex me-auto" onSubmit={submitHandler}>
            <InputGroup>
                <Form.Control
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Products"
                    // className="mr-sm-2 ml-sm-5"
                    aria-label="Search Products"
                    aria-describedby="button-search"
                ></Form.Control>
                <Button
                    type="submit"
                    variant="outline-primary"
                    id="button-search"
                >
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchBox;