import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import Home from './Components/Home/home';
import { Bars } from 'react-loader-spinner';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import { store } from './Redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AlertDismissible from './Components/Alert/AlertMessage';
import { useEffect } from 'react';
import { updateContentContainerHeight } from './Redux/Action/SideBarAction';

function App() {
  const alertMessaage = useSelector(state => state.AlertMessageReducer);
  const loaderState = useSelector(state => state.loaderReducer);

  return (
    <BrowserRouter>
      {/* {loaderState.loading == true &&
        <div style={{ position: "relative" }}>
          <Bars
            height="100vh"
            width="80"
            color="#f7931e"
            ariaLabel="bars-loading"
            wrapperStyle={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 9999 }}
            wrapperClass=""
            visible={true}
          />
        </div>
      } */}

      {/* <Home /> */}
      {/* <Login /> */}
      {/* <div className="alert-container">
        <AlertDismissible {...alertMessaage} />
      </div> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
