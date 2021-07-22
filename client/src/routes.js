import React,{useState,useEffect} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Loader from './utils/loader';
import Header from './Components/Navigation/header';
import Footer from './Components/Navigation/footer';
import Dashboard from './Components/dashboard';
import authGuard from './hoc/authGuard';
import RegisterLogin from './Components/auth';
import MainLayout from './hoc/mainLayout';
import {useDispatch, useSelector} from 'react-redux';
import { userIsAuth,userSignOut } from './store/actions/user_actions';
import Customers from './Components/customers';
import UserInfo from './Components/dashboard/user/info';
import CustomerById from './Components/customers/CustomerByID';

function App() {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();


  
  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])

  
  useEffect(()=>{
    if(users.auth !== null){
      setLoading(false)
    }
  },[users])

  return (
    <BrowserRouter>
    {
      loading ? <Loader full={true} /> : <> 
        <Header users={users}
            signOutUser={signOutUser}/>
        <MainLayout>
        <Switch>
        <Route exact path="/dashboard/user/user_info" component={authGuard(UserInfo)} />
        <Route exact path="/dashboard/admin/customers" component={authGuard(
            Customers)}/>
        <Route exact path="/dashboard/admin/customers/:id" component={authGuard(CustomerById)}/>
        
        <Route exact path="/dashboard" component={authGuard(Dashboard)}/>
        
          <Route exact path="/" component={RegisterLogin}/>
          

        </Switch>
        </MainLayout>
        <Footer/>
        </>
    }
    </BrowserRouter>
  );
}

export default App;