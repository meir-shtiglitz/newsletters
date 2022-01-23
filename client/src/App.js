import React, {lazy, Suspense} from 'react';
import {useSelector, useDispatch} from "react-redux";
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/loader";
import { signByToken } from './actions/user';
import Nav from './components/nav';
import IsLogedRoute from './components/isLogedRoute';
import IsUnLogedRoute from './components/isUnLogedRoute';
import Page404 from './components/404';
import SignInOrUp from './components/signInOrUp';
import Home from './components/home';
// const Home = lazy(() => import('./components/Home'))
// const Login = lazy(() => import('./components/login'));
// const Register = lazy(() => import('./components/register'));
// const ForgotPassword = lazy(() => import('./components/forgotPassword'));
const Newsletter = lazy(() => import('./components/newsletter'));
const AllNletters = lazy(() => import('./components/allNletters'));
// const Home = lazy(() => import('./components/home'));
// const SendMail = lazy(() => import('./components/sendMail'));

const App = () => {
  
  const {isAuthenticated, loading} = useSelector(state => ({...state.user}));
  const dispatch = useDispatch();
  const IsUser = () => {
    const token = localStorage.getItem('token');
    if(token && !isAuthenticated) dispatch(signByToken({token:token}));
  }

  return(
    loading ? <Loader /> :
    <Suspense fallback={<Loader />}>
      {IsUser()}
      <ToastContainer />
      <Nav />
      <Switch>
        {/* <Route exact path="/" component={Home} />*/}
        <IsUnLogedRoute exact path="/account" component={SignInOrUp} /> 
        {/* <IsUnLogedRoute exact path="/register" component={Register} /> */}
        {/* <IsUnLogedRoute exact path="/forgot-password" component={ForgotPassword} /> */}
        <Route exact path="/" component={Home} />
        <IsLogedRoute exact path="/nletter/my" component={()=><AllNletters fromUser={true}/>} />
        <IsLogedRoute exact path="/add/newsletter" component={()=><Newsletter addNew={true}/>} />
        <Route exact path="/newsletter/:nlId" component={Newsletter} />
        {/* <Route exact path="/sendmail/:nlId" component={SendMail} /> */}
        {/* <Route exact path="/loader" component={Loader} /> */}
        <Route path="**" component={Page404} />

      </Switch>
      
    </Suspense>
  )
}

export default App;