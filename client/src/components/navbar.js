import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import LoginModal from './auth/LoginModal';
// import Logout from './auth/Logout';
import RegisterModal from '../auth/registerModal'
import LoginModal from '../auth/LoginModal'
import { Link } from 'react-router-dom'
import Headroom from 'react-headroom'
import Logout from '../auth/Logout'
import { nullPhoto } from '../actions/photoActions';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };


  // const mapDispatchToProps = {
  //   sendMessage,
  //  };

  clearPhoto = () => {
    this.props.nullPhoto()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `${user.name.split(' ')[0]}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Headroom>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            {/* <NavbarBrand href='/'>ShoppingList</NavbarBrand> */}
            <Link to={'/'} >
              <h4 className="home-textx" onClick={this.clearPhoto} >New Star</h4>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        </Headroom>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.auth,
  array: state.photos.array,
});

const mapDispatchToProps = dispatch => ({
  nullPhoto: () => dispatch(nullPhoto()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(AppNavbar);