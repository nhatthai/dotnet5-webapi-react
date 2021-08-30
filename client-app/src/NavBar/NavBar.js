import React from 'react';
import { Container, Nav, Navbar, NavLink} from 'react-bootstrap';
import { HomePage } from '../HomePage';
import { Products } from '../Products';
import { NotFound } from '../NotFound';
import { About } from '../About';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class NavBar extends React.Component {
    login() {
        console.log("login");
    }

    render() {
        return (
            <Router>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="/">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/products">Products</NavLink>
                            <NavLink href="/about">About</NavLink>
                        </Nav>
                        <Nav>
                            <NavLink onClick={this.login}>Login</NavLink>
                        </Nav>
                    </Container>
                </Navbar>

                <Switch>
                    <Route exact path="/" component={HomePage}>
                    </Route>

                    <Route exact path="/products" component={Products}>
                    </Route>

                    <Route exact path="/about" component= {About}>
                    </Route>

                    <Route component={NotFound} />
                </Switch>

            </Router>
        );
    }
}
export default NavBar;