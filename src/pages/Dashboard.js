import React, { useState, useEffect, useContext } from 'react'
import "./Dashboard.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import axiosInstance from '../axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ActivityContext, ActivityProvider } from '../utils/ActivityContext';
import { useNavigate } from 'react-router-dom';
import Getactivities from './getactivities';
import Activitie from './Activities';
import Alert from 'react-bootstrap/Alert';


const Dashboard = () => {

  const handleShow = () => setShow(true);
  const [activeTab, setActiveTab] = useState("Accueil");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [resources, setResources] = useState([]);
  
  const handleCreateActivity = () => {
    setShowModal(true);
  };
  
  const handleAddResource = () => {
    setResources([...resources, input5]);
    setInput5('');
  };
  
  const handleRemoveResource = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };
  
  /*const handleSubmit = (event) => {
    event.preventDefault();
    // Mettre les valeurs des inputs
    console.log('Valeur de l\'input 1:', input1);
    console.log('Valeur de l\'input 2:', input2);
    console.log('Valeur de l\'input 3:', input3);
    console.log('Valeur de l\'input 3:', input4);
    console.log('Valeur de l\'input 3:', input5);
    // Réinitialisez les inputs
    setInput1('');
    setInput2('');
    setInput3('');
    setInput4('');
    setInput5('');
    setTextareaValue('');
    // Fermeture du modal
    setShowModal(false);
  };*/
  
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
    setShowEditModal(true);
  };
  const [showEditModal, setShowEditModal] = useState(false);
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    //la logique de éditer
    setShowEditModal(false);
  };

/////////////////////

const [activities, setActivities] = useState([]);
const [tableData, setTableData] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Code pour créer une nouvelle activité
    const response = await fetch('activite/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        niveau: input1,
        matiere: input2,
        lecon: input3,
        titre: input4,
        ressources: resources,
        contenu: textareaValue,
      }),
    });

    if (response.ok) {
      const newActivity = await response.json();

      // Ajouter la nouvelle activité à l'état "activities"
      setActivities([...activities, newActivity]);

      setShowModal(false);

      // Ajouter les informations de l'activité dans la table
      const newActivityData = {
        id: newActivity.id,
        nom: newActivity.titre,
        niveau: newActivity.niveau,
        lecon: newActivity.lecon,
        dateCreation: newActivity.dateCreation,
      };

      setTableData([...tableData, newActivityData]);
      // Réinitialiser les champs du formulaire
      setInput1('');
      setInput2('');
      setInput3('');
      setInput4('');
      setResources([]);
      setTextareaValue('');
    } else {
      console.log("Erreur lors de la création de l'activité");
    }
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
  const fetchActivities = async () => {
    try {
      // Envoyer une requête GET pour récupérer la liste des activités
      const response = await fetch('`activite/create/`');
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        console.log('Erreur lors du chargement des activités');
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchActivities();
}, []);


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
        <a href="#" className={activeTab === "Modifier profil" ? "active" : ""} onClick={() => setActiveTab("Modifier profil")}>
          <i className="bx bx-coin-stack" />
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
          <div className="profile-details">
            <img src="images/profile.jpg" alt="" />
            <span className="admin_name">Saida Ouachhal</span>
            <i className="bx bx-chevron-down" />
          </div>
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
                  style={{ backgroundColor: "#0BA7AA", borderColor: "#0BA7AA" ,color:"white"}}>
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
        //view activité
          <section>
              <div class="container">
                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                  <div class="row">
                    <div class="col-sm-2 mt-5 mb-4 text-gred">
                      <div className="search">
                        <form class="form-inline">
                          <input class="form-control mr-sm-2" type="search" placeholder="Rechercher" aria-label="Search" />

                        </form>
                      </div>
                    </div>
                    <div class="col-sm-5 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}>
                      <h2><b>Liste des activités créées</b></h2>
                    </div>
                    <div class="col-sm-2 offset-sm-1  mt-5 mb-4 text-gred">
                      <Button variant="primary" onClick={handleCreateActivity} style={{ backgroundColor: "#0BA7AA",color:"white", borderColor: "#0BA7AA" }}>
                        Créer activité
                      </Button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                              <thead>
                                  <tr>
                                  <th>#</th>
                                  <th>Activité pédagogique</th>
                                  <th>Niveau</th>
                                  <th>Leçon</th>
                                  <th>Date de création</th>
                                  <th>Actions</th>
                                  </tr>
                              </thead>
                              <tbody>
                                {activities.map((activity, index) => (
                                  <tr key={index}>
                                    <td>{activity.id}</td>
                                    <td>{activity.nom}</td>
                                    <td>{activity.niveau}</td>
                                    <td>{activity.lecon}</td>
                                    <td>{activity.dateCreation}</td>
                                    <td>
                                      <a href="#" className="view" title="View" data-toggle="tooltip" style={{ color: "#0BA7AA" }}>
                                        <i className="material-icons">&#xE417;</i>
                                      </a>
                                      <a href="#" className="edit" title="Edit" data-toggle="tooltip">
                                        <i className="material-icons">&#xE254;</i>
                                      </a>
                                      <a href="#" className="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }}>
                                        <i className="material-icons">&#xE872;</i>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>

         {/* Modal créer */}
         <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Créer une activité</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <div className="row mb-4">
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Niveau scolaire</Form.Label>
                        <Form.Control
                          type="text"
                          value={input1}
                          onChange={(e) => setInput1(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Matière</Form.Label>
                        <Form.Control
                          type="text"
                          value={input2}
                          onChange={(e) => setInput2(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Leçon</Form.Label>
                        <Form.Control
                          type="text"
                          value={input3}
                          onChange={(e) => setInput3(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-4">
                      <Form.Group>
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                          type="text"
                          value={input4}
                          onChange={(e) => setInput4(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    {resources.map((resource, index) => (
                      <div key={index} className="col-4">
                        <Form.Group>
                          <Form.Label>Ajouter ressources</Form.Label>
                          <Form.Control
                            type="text"
                            value={resource}
                            onChange={(e) => {
                              const updatedResources = [...resources];
                              updatedResources[index] = e.target.value;
                              setResources(updatedResources);
                            }}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          onClick={() => handleRemoveResource(index)}
                          style={{
                            backgroundColor: '#FF0000',
                            marginTop: '8px',
                            padding: '4px 8px',
                            fontSize: '12px',
                          }}
                        >
                          -
                        </Button>
                      </div>
                    ))}
                    <div className="col-4">
                      <Form.Group>
                        <Form.Label>Ressource</Form.Label>
                        <Form.Control
                          type="text"
                          value={input5}
                          onChange={(e) => setInput5(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleAddResource}
                        style={{
                          backgroundColor: '#0BA7AA',
                          marginTop: '8px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          color:"white",
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Activité</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          value={textareaValue}
                          placeholder="Tapez ici le contenu d'activité..."
                          onChange={(e) => setTextareaValue(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col d-flex justify-content-center">
                      <Button type="submit" variant="primary" style={{ backgroundColor: '#0BA7AA',color:"white" }}>
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              {/*{successAlert && (
                <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
                  Activity created successfully!
                </Alert>
              )}*/}
            </Modal>

             {/* Modal edit */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Modifier une activité</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleEditSubmit}>
                  {/* Contenu Form edit */}
                  <div className="row mb-4">
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Niveau scolaire</Form.Label>
                        <Form.Control
                          type="text"
                          value={input1}
                          onChange={(e) => setInput1(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Matière</Form.Label>
                        <Form.Control
                          type="text"
                          value={input2}
                          onChange={(e) => setInput2(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Leçon</Form.Label>
                        <Form.Control
                          type="text"
                          value={input3}
                          onChange={(e) => setInput3(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div>
                  <div className="row mb-4">
                    <div className="col-4">
                      <Form.Group>
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                          type="text"
                          value={input4}
                          onChange={(e) => setInput4(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    {resources.map((resource, index) => (
                      <div key={index} className="col-4">
                        <Form.Group>
                          <Form.Label>Ajouter ressources</Form.Label>
                          <Form.Control
                            type="text"
                            value={resource}
                            onChange={(e) => {
                              const updatedResources = [...resources];
                              updatedResources[index] = e.target.value;
                              setResources(updatedResources);
                            }}
                          />
                        </Form.Group>
                        <Button variant="primary" onClick={() => handleRemoveResource(index)} style={{ backgroundColor: "#FF0000", marginTop: "8px", padding: "4px 8px", fontSize: "12px" }}>-</Button>
                      </div>
                    ))}
                    <div className="col-4">
                      <Form.Group>
                        <Form.Label>Ressource</Form.Label>
                        <Form.Control
                          type="text"
                          value={input5}
                          onChange={(e) => setInput5(e.target.value)}
                        />
                      </Form.Group>
                      <Button type="button" variant="primary" onClick={handleAddResource} style={{ backgroundColor: "#0BA7AA", marginTop: "8px", padding: "4px 8px", fontSize: "12px" }}>+</Button>
                    </div>
                  </div>
                </div>
                  <div className="row">
                    <div className="col">
                      <Form.Group>
                        <Form.Label>Activité</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          value={textareaValue}
                          placeholder="Tapez ici le contenu d'activité..."
                          onChange={(e) => setTextareaValue(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col d-flex justify-content-center">
                      <Button type="submit" variant="primary" style={{backgroundColor:"#0BA7AA"}}>Envoyer</Button>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>


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
               <Button variant="primary" onClick="" style={{ backgroundColor: "#0BA7AA" ,color:"white",borderColor:"#0BA7AA"}}>
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



