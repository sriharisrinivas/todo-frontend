import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import Home from './Components/Home/home';
import { Bars } from 'react-loader-spinner';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import { store } from './Redux/store';
import { Provider, useSelector } from 'react-redux';
import AlertDismissible from './Components/Alert/AlertMessage';

function App() {
  const alertMessaage = useSelector(state => state.AlertMessageReducer);
  const loaderState = useSelector(state => state.loaderReducer);
  console.log("🚀 ~ App ~ loaderState:", loaderState)

  return (
    <BrowserRouter>
      {loaderState.loading == true &&
        <Bars
          height="100vh"
          width="80"
          color="#f7931e"
          ariaLabel="bars-loading"
          wrapperStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          wrapperClass=""
          visible={true}
        />}

      {/* <Home /> */}
      {/* <Login /> */}
      <div className="alert-container">
        <AlertDismissible {...alertMessaage} />
      </div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
