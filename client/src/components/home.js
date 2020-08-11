import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button, ToastHeader, ToastBody, Toast } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { firstPhotos, morePhotos, deletePhoto, uploadHandlerer } from '../actions/photoActions'
import { deletePhotoComments } from '../actions/commentActions'
import Navbar from './navbar'
import RegisterModal from '../auth/registerModal'
import LoginModal from '../auth/LoginModal'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";

import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      arrays: [],
      count: 5,
      valid: true
    };
    this.onFileChange = this.onFileChange.bind(this)
    this.submit = this.submit.bind(this)
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }
  
  componentDidMount() {
    this.props.firstPhotos()
  }
  onClickDelete = filename => {
    this.props.deletePhoto(filename);
    this.props.deletePhotoComments(filename);
  }

  onFileChange(e) {
    if (e.target.files[0]) {
      this.setState( {valid: true} )
    } else {
      this.setState( {valid: false} )
    }
  }
  submit(e) {
    e.preventDefault()
    const myFile = (this.refs.myFile).files[0]
      this.props.uploadHandlerer(myFile)
  }
  
  getNext = () => {
    this.setState({ count: this.state.count + 3});
    this.props.morePhotos(this.state.count)
  }
  render() {
    //console.log(this.props)
    const promise = loadStripe("pk_test_Egzk9dR5UgqqBUZbuYh8PPGl00qSk4jnXl");

    if (!this.props.arrays) {
      return(
        <div>...Loading</div>
      )
    } else {
    const { arrays } = this.props;
    return (
      <div>
      <Navbar/>
      <div className="container">

      <div className="row">

        <div className="col-md-6 m-auto">
          <h1 className="text-center display-4 my-4">MERN, Redux <br/>Photo Stream</h1>

          { this.props.isAuthenticated ?
          <form action="/api/items/upload" method="POST" encType="multipart/form-data">
            <div className="custom-file mb-3">
              <input type="file" ref='myFile' onChange={this.onFileChange, this.submit} name="file" id="file" className="custom-file-input"/>
              <label htmlFor="file" className="custom-file-label">Choose File</label>
            </div>
          </form>
          :
          <div className="p-3 bg-primary my-2 rounded">
          <Toast className="center">

            <ToastBody className="logInline">
              Please <RegisterModal className="nudgeUp"/> or <LoginModal className="nudgeUp"/> to Upload
            </ToastBody>
          </Toast>
        </div>
          }

        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>




          <hr/>
            <InfiniteScroll
            dataLength={this.props.arrays.length}
            next={this.getNext}
            hasMore={true}
            >
              {arrays.map(({ _id, filename }) => (
                  <TransitionGroup key={_id}>
                    <CSSTransition timeout={233} classNames="fade">
                      <div className="card card-body mb-3">
                      <Link to={'/image/' + filename} >
                        <img src={'/api/items/image/'+ filename}  alt="" className="imaage"/>
                        </Link>
                        <form>
                        { this.props.isAuthenticated ?
                          <Button
                          className="btn btn-danger
                          btn-block mt-4"
                          onClick={this.onClickDelete.bind(this, filename)}
                          >Delete</Button>
                          : null }
                        </form>

                      </div>
                    </CSSTransition>
                  </TransitionGroup>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>

      </div>
    );
  }}
}

const mapStateToProps = () => (state) => {
  return {
    arrays: state.photos.arrays,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps,
  { firstPhotos,
    morePhotos,
    deletePhoto,
    uploadHandlerer,
    deletePhotoComments
   })(Home);