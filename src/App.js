<<<<<<< HEAD
import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./App.css";

const App = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div className="page">
      <nav className="titre">
        <h1>Smart Scénario</h1>
      </nav>
      <nav className="parag">
      <p id="y">Visualiser vos scénarios pégagogique avec plus de créativité</p>
      </nav>
      <nav>
        <button onClick={goToPrevPage} className="previous">
          La page précédente
        </button>
        <button onClick={goToNextPage} className="next">
          La page suivante
        </button>
        <p id="t">
          Page {pageNumber} sur {numPages}
        </p>
      </nav>

      <Document file="Rapport_de_Stage_d_Immersion.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default App;
=======

import React, { Component } from 'react'
// import Header from './components/Header';
// import Home from './components/Home';
// import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";
// import Register from './components/register'
// import Login from './components/Login'
import Home from './pages/Home'
import Login from './pages/Login'
import Header2 from './components/Header2'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import Footer2 from './components/Footer2';
import Contact from './pages/Contact';
import Register from './components/register'
import Premium from './pages/Premieum';
import Dashboard from './pages/Dashboard';
import Getactivities from './pages/getactivities';
import { ActivityProvider } from './utils/ActivityContext';
//const apilink ='http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44'
class App extends Component {

  render() {
    return (
      <div className="App">
        <AuthProvider>
        <ActivityProvider>
          <Header2 />
          <Routes>
            <Route element={<Login></Login>} path="/login" />
            <Route element={<Contact></Contact>} path="/contact" />
            <Route element={<Register></Register>} path="/register" />
            <Route element={<Premium></Premium>} path="/premiem" />
            <Route element={<Dashboard></Dashboard>} path="/dashboard" />
            <Route element={<Getactivities></Getactivities>} path="/getActivitie" />
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<Home />} />
             
              <Route path="/dashboard" component={Dashboard} />
                
            </Route>

          </Routes>
          <Footer2></Footer2>
          </ActivityProvider>
        </AuthProvider>
          

      </div>
    );

  }

}

export default App;

>>>>>>> 5d5ef5a9a0ced4d1ec7c196f57080f700f1bccc2
