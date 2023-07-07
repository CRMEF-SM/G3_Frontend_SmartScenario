import React, { useState, useEffect, useContext } from 'react'
import "./Dashboard.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Profil from './profil'



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Accueil");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique de traitement du formulaire ici
  };
  

    return (

  
  <>
  
  <div className="sidebar" style={{ float: 'left', width: '22%' }}>
  <div class="col-lg-4">
    <div className="logo-details">
      <i className="bx bxl-c-plus-plus" />
      <span>SmartScenario</span>
    </div>
    <ul className="nav-links">
      <li>
        <a href="#" className={activeTab === "Accueil" ? "active" : ""} onClick={() => setActiveTab("Accueil")}>
          <i className="bx bx-grid-alt" />
          <span className="links_name">Accueil</span>
        </a>
      </li>
      <li>
        <a href="#" className={activeTab === "Mes scénarios" ? "active" : ""} onClick={() => setActiveTab("Mes scénarios")}>
          <i className="bx bx-box" />
          <span className="links_name">Mes scénarios</span>
        </a>
      </li>
      <li>
        <a href="#" className={activeTab === "Mes activités" ? "active" : ""} onClick={() => setActiveTab("Mes activités")}>
          <i className="bx bx-list-ul" />
          <span className="links_name">Mes activités</span>
        </a>
      </li>
      <li>
        <a href="#" className={activeTab === "Mes évaluations" ? "active" : ""} onClick={() => setActiveTab("Mes évaluations")}>
          <i className="bx bx-pie-chart-alt-2" />
          <span className="links_name">Mes évaluations</span>
        </a>
      </li>
      <li>
        <a href="/modifier_profil" className={activeTab === "Mes évaluations" ? "active" : ""} onClick={() => setActiveTab("Mes évaluations")}>
          <i className="bx bx-pie-chart-alt-2" />
          <span className="links_name">Modifier profil</span>
        </a>
      </li>
      
      <li>
        <a href="#" className={activeTab === "A l’aide de Gpt" ? "active" : ""} onClick={() => setActiveTab("A l’aide de Gpt")}>
          <i className="bx bx-book-alt" />
          <span className="links_name">A l’aide de Gpt</span>
        </a>
      </li>
   
      
      <li className="log_out">
        <a href="#" className="log_out">
          <i className="bx bx-log-out" />
          <span className="links_name">Log out</span>
        </a>
      </li>
    </ul>
  </div>
  </div>
  <div className="home-content" style={{ float: 'right', width: '78%' }}>
      {activeTab === "Accueil" && (
        <section className="home-section custom-margin">
        <nav>
          <div className="search-box">
            <input type="text" placeholder="Rechercher..." />
            <i className="bx bx-search" />
          </div>
          {/* Inclure le profil */}
          <Profil />
          
        </nav>
        <div className="home-content">
          {/* Votre contenu ici */}
        </div>
        <div>
          <h4>Vous aimerez créer peut-etre...</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img src="img/topics/Scenario accueil.jpeg" alt="Image 1" style={{ width: '30%' }} />
              <img src="img/topics/Scenario accueil.jpeg" alt="Image 2" style={{ width: '30%' }} />
              <img src="img/topics/Scenario accueil.jpeg" alt="Image 3" style={{ width: '30%' }} />
        </div>
       
      </section>
      )}
      {activeTab === "Mes scénarios" && (
         <section>
         <div class="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
            <div class="row ">
             
             <div class="col-sm-2 mt-5 mb-4 text-gred">
                <div className="search">
                  <form class="form-inline">
                   <input class="form-control mr-sm-2" type="search" placeholder="Rechercher" aria-label="Search"/>
                  
                  </form>
                </div>    
              </div>  
                <div class="col-sm-5 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Liste des scénarios crées</b></h2></div>
                <div class="col-sm-2 offset-sm-1  mt-5 mb-4 text-gred">
                <Button
                  variant="primary"
                  onClick={handleShow}
                  style={{ backgroundColor: "#0BA7AA", borderColor: "#0BA7AA" }}>
                  créer scénario
                </Button>
               </div>
             </div>  
              <div class="row">
                  <div class="table-responsive " >
                   <table class="table table-striped table-hover table-bordered">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Scénario pédagogique </th>
                              <th>Niveau</th>
                              <th>Leçon </th>
                              <th>Datre de création </th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          
                          <tr>
                              <td>1</td>
                              <td>Scénario01</td>
                              <td>1APIC</td>
                              <td>Structure d'un ordinateur</td>
                              <td>01/10/2023</td>
                              <td>
                                 <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#0BA7AA"}}><i class="material-icons">&#xE417;</i></a>
                                  <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                  <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                                   
                              </td>
                          </tr>
                          <tr>
                              <td>2</td>
                              <td>Scénario01</td>
                              <td>2APIC</td>
                              <td>Tableur</td>
                              <td>12/02/2023</td>
                              <td>
                              <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#0BA7AA"}}><i class="material-icons">&#xE417;</i></a>
                                  <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                  <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                              </td>
                          </tr>
   
                      </tbody>
                  </table>
              </div>   
          </div>  
  
        </div>    
        </div>  
  </section>
  
      )}
      {activeTab === "Mes activités" && (
          <section>
          <div class="container ">
             <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
             <div class="row ">
              
              <div class="col-sm-2 mt-5 mb-4 text-gred">
                 <div className="search">
                   <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Rechercher" aria-label="Search"/>
                   
                   </form>
                 </div>    
               </div>  
                 <div class="col-sm-5 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Liste des activités crées</b></h2></div>
                 <div class="col-sm-2 offset-sm-1  mt-5 mb-4 text-gred">
                 <Button variant="primary" onClick="" style={{ backgroundColor: "#0BA7AA",borderColor:"#0BA7AA"}}>
                    créer activité
                 </Button>
                </div>
              </div>  
               <div class="row">
                   <div class="table-responsive " >
                    <table class="table table-striped table-hover table-bordered">
                       <thead>
                           <tr>
                               <th>#</th>
                               <th>Activité pédagogique </th>
                               <th>Niveau</th>
                               <th>Leçon </th>
                               <th>Datre de création </th>
                               <th>Actions</th>
                           </tr>
                       </thead>
                       <tbody>
                           
                           <tr>
                               <td>1</td>
                               <td>Activié pédagogique01</td>
                               <td>1APIC</td>
                               <td>Structure d'un ordinateur</td>
                               <td>01/10/2023</td>
                               <td>
                                  <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#0BA7AA"}}><i class="material-icons">&#xE417;</i></a>
                                   <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                   <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                                    
                               </td>
                           </tr>
                           <tr>
                               <td>2</td>
                               <td>Activié pédagogique02</td>
                               <td>2APIC</td>
                               <td>Tableur</td>
                               <td>12/02/2023</td>
                               <td>
                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#0BA7AA"}}><i class="material-icons">&#xE417;</i></a>
                                   <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                   <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                               </td>
                           </tr>
    
                       </tbody>
                   </table>
               </div>   
           </div>  
   
         </div>    
         </div>  
    
   </section>
      )}
      {activeTab === "Mes évaluations" && (
        <section>
        <div class="container ">
           <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
           <div class="row ">
            
            <div class="col-sm-2 mt-5 mb-4 text-gred">
               <div className="search">
                 <form class="form-inline">
                  <input class="form-control mr-sm-2" type="search" placeholder="Rechercher" aria-label="Search"/>
                 
                 </form>
               </div>    
             </div>  
               <div class="col-sm-5 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Liste des évaluations crées</b></h2></div>
               <div class="col-sm-2 offset-sm-1  mt-5 mb-4 text-gred">
               <Button variant="primary" onClick="" style={{ backgroundColor: "#0BA7AA",borderColor:"#0BA7AA"}}>
                  créer évaluation
               </Button>
              </div>
            </div>  
             <div class="row">
                 <div class="table-responsive " >
                  <table class="table table-striped table-hover table-bordered">
                     <thead>
                         <tr>
                             <th>#</th>
                             <th>Evaluation</th>
                             <th>Niveau</th>
                             <th>Leçon </th>
                             <th>Datre de création </th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         
                         <tr>
                             <td>1</td>
                             <td>Evaluation01</td>
                             <td>1APIC</td>
                             <td>Structure d'un ordinateur</td>
                             <td>01/10/2023</td>
                             <td>
                                <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#0BA7AA"}}><i class="material-icons">&#xE417;</i></a>
                                 <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                 <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                                  
                             </td>
                         </tr>
                         <tr>
                             <td>2</td>
                             <td>Evaluation02</td>
                             <td>2APIC</td>
                             <td>Tableur</td>
                             <td>12/02/2023</td>
                             <td>
                             <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#0BA7AA"}}><i class="material-icons">&#xE417;</i></a>
                                 <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                 <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                             </td>
                         </tr>
  
                     </tbody>
                 </table>
             </div>   
         </div>  
 
       </div>    
       </div>  
  
 </section>
      )}
      {activeTab === "Modifier profil" && (
        {/* Contenu de l'onglet Modifier profil */}
        
      )}
      {activeTab === "A l’aide de Gpt" && (
        {/* Contenu de l'onglet A l’aide de Gpt */}
  )}
</div>

  </>
    )
}
export default Dashboard



