import React, { useState, useEffect, useContext } from 'react'
import "./Dashboard.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import axios from '../axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ActivityContext, ActivityProvider } from '../utils/ActivityContext';
import { useNavigate } from 'react-router-dom';
import Getactivities from './getactivities';
import Alert from 'react-bootstrap/Alert';


const Dashboard = () => {
  const handleClose = () => setShow(false);
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

  let totalSteps = 3;

  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
	setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
	setCurrentStep(currentStep - 1);
  };
  const [situationProbleme, setSituationProbleme] = useState('');


  const [autresTextareas, setAutresTextareas] = useState([]);

  const handleSituationProblemeChange = (event) => {
    setSituationProbleme(event.target.value);
  };

  const addTextarea = () => {
    setAutresTextareas([...autresTextareas, '']);
  };

  const handleAutreTextareaChange = (index, event) => {
    const updatedTextareas = [...autresTextareas];
    updatedTextareas[index] = event.target.value;
    setAutresTextareas(updatedTextareas);
  };

  const [duree, setDuree] = useState('');
  const [roleEnseignant, setRoleEnseignant] = useState('');
  const [roleApprenant, setRoleApprenant] = useState('');
  const [autresChamps, setAutresChamps] = useState([]);

  const handleDureeChange = (event) => {
    setDuree(event.target.value);
  };

  const handleRoleEnseignantChange = (event) => {
    setRoleEnseignant(event.target.value);
  };

  const handleRoleApprenantChange = (event) => {
    setRoleApprenant(event.target.value);
  };

  const addChamp = () => {
    setAutresChamps([...autresChamps, { duree: '', roleEnseignant: '', roleApprenant: '' }]);
  };

  const handleAutreChampChange = (index, field, event) => {
    const updatedChamps = [...autresChamps];
    updatedChamps[index][field] = event.target.value;
    setAutresChamps(updatedChamps);
  };
  const initialInputs = [
    { name: 'Etablissement', placeholder: 'Votre établissement', value: '', duplicated: false },
    { name: 'Matière', placeholder: 'Matière', value: '', duplicated: false },
    { name: 'Leçon', placeholder: 'Leçon', value: '', duplicated: false },
    { name: 'Nombre d\'heures', placeholder: 'Nombre d\'heures', value: '', duplicated: false },
    { name: 'Compétence visée', placeholder: 'Compétence visée', value: '', duplicated: false },
    { name: 'Méthode d\'enseignement', placeholder: 'Méthode d\'enseignement', value: '', duplicated: false },
    { name: 'Objectifs pédagogiques', placeholder: 'Objectifs pédagogiques', value: '', duplicated: false }
  ];
  const addObjective = () => {
    setInputs(prevInputs => [
      ...prevInputs,
      { name: 'Objectifs pédagogiques', placeholder: 'Objectifs pédagogiques', value: '', duplicated: false }
    ]);
  };
  const [inputs, setInputs] = useState(initialInputs);
  const removeObjective = index => {
    setInputs(prevInputs => prevInputs.filter((input, i) => i !== index));
  };
  const removeTextarea = (index) => {
    const updatedTextareas = [...autresTextareas];
    updatedTextareas.splice(index, 1);
    setAutresTextareas(updatedTextareas);
  };

  const removeChamp = (index) => {
    const updatedChamps = [...autresChamps];
    updatedChamps.splice(index, 1);
    setAutresChamps(updatedChamps);
  };
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleInputChange = (event) => {
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


  const handleDelete = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirmDelete = () => {
  
    axios.delete('/api/data') 
      .then(response => {
        console.log('Données supprimées avec succès');
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression des données :', error);
      });
  
    setShowConfirmation(false);
  };

  const [showConfirmation, setShowConfirmation] = useState(false); 
  
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
                                 <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={handleShow}><i className="material-icons">&#xE254;</i></a>  
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
                              <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={handleShow}><i className="material-icons">&#xE254;</i></a>     
                              <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                              </td>
                          </tr>
   
                      </tbody>
                  </table>
              </div>   
          </div>  
  
        </div>    
        </div>  
      
      <div className="sidebar" style={{ float: 'left', width: '22%' }}/>
      <Modal show={show} onHide={handleClose} size="lg" className="modal-fullscreen">
        <Modal.Header closeButton>
        <Modal.Title>Scénario pédagogique</Modal.Title>
        </Modal.Header>
		<div className="boutons-etapes text-center">
  <div className="row">
    <div className="col">
      <div
        className={`bouton-etape ${currentStep === 1 ? 'active' : ''}`}
        onClick={() => setCurrentStep(1)}
      >
        1
      </div>
    </div>
    <div className="col">
      <div
        className={`bouton-etape ${currentStep === 2 ? 'active' : ''}`}
        onClick={() => setCurrentStep(2)}
      >
        2
      </div>
    </div>
    <div className="col">
      <div
        className={`bouton-etape ${currentStep === 3 ? 'active' : ''}`}
        onClick={() => setCurrentStep(3)}
      >
         3
      </div>
    </div>
  </div>
</div>
        <Modal.Body>
          {currentStep === 1 && (
  <form onSubmit={handleSubmit}>
    <div className="row mb-3">
      <div className="col-4 mb-3">
        <label htmlFor={inputs[0].name}><strong>{inputs[0].name}</strong></label>
        <input
          type="text"
          className="form-control"
          name={inputs[0].name}
          placeholder={inputs[0].placeholder}
          value={inputs[0].value}
          onChange={(event) => handleInputChange(0, event)}
        />
      </div>
      <div className="col-4 mb-3">
        <label htmlFor={inputs[1].name}><strong>{inputs[1].name}</strong></label>
        <input
          type="text"
          className="form-control"
          name={inputs[1].name}
          placeholder={inputs[1].placeholder}
          value={inputs[1].value}
          onChange={(event) => handleInputChange(1, event)}
        />
      </div>
      <div className="col-4 mb-3">
        <label htmlFor={inputs[2].name}><strong>{inputs[2].name}</strong></label>
        <input
          type="text"
          className="form-control"
          name={inputs[2].name}
          placeholder={inputs[2].placeholder}
          value={inputs[2].value}
          onChange={(event) => handleInputChange(2, event)}
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-6 mb-3">
        <label htmlFor={inputs[3].name}><strong>{inputs[3].name}</strong></label>
        <input
          type="text"
          className="form-control"
          name={inputs[3].name}
          placeholder={inputs[3].placeholder}
          value={inputs[3].value}
          onChange={(event) => handleInputChange(3, event)}
        />
      </div>
      <div className="col-6 mb-3">
        <label htmlFor={inputs[4].name}><strong>{inputs[4].name}</strong></label>
        <input
          type="text"
          className="form-control"
          name={inputs[4].name}
          placeholder={inputs[4].placeholder}
          value={inputs[4].value}
          onChange={(event) => handleInputChange(4, event)}
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-6 mb-3">
        <label htmlFor={inputs[5].name}><strong>{inputs[5].name}</strong></label>
        <input
          type="text"
          className="form-control"
          name={inputs[5].name}
          placeholder={inputs[5].placeholder}
          value={inputs[5].value}
          onChange={(event) => handleInputChange(5, event)}
        />
      </div>
      <div className="col-6 mb-3">
        <div className="d-flex align-items-end">
          <label htmlFor={inputs[6].name}><strong>{inputs[6].name}</strong></label>
          <button type="button" className="btn btn-primary btn-sm" onClick={addObjective}>
            <i className="bi bi-plus"></i>
          </button>
        </div>
        
        <input
          type="text"
          className="form-control"
          name={inputs[6].name}
          placeholder={inputs[6].placeholder}
          value={inputs[6].value}
          onChange={(event) => handleInputChange(6, event)}
        />
      </div>
    </div>
    {inputs.slice(7).map((input, index) => (
      <div className="row mb-3" key={index}>
        <div className="col-6 mb-3">
          <label htmlFor={input.name}><strong>{input.name}</strong></label>
          <input
            type="text"
            className="form-control"
            name={input.name}
            placeholder={input.placeholder}
            value={input.value}
            onChange={(event) => handleInputChange(index + 7, event)}
          />
        </div>
        <div className="col-6 mb-3">
          <button type="button" className="btn btn-danger btn-sm" onClick={() => removeObjective(index + 7)}>
            <i className="bi bi-x"></i>
          </button>
          
        </div>
      </div>
    ))}
  </form>
)}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit}>
              {/* Contenu de la deuxième étape du formulaire */}
			  <div className="row mb-3">
            <div className="col-12">
            <label htmlFor="situationProbleme"><strong>Situation problème</strong></label>
              <textarea
                className="form-control"
                name="situationProbleme"
                placeholder="Situation Problème"
                value={situationProbleme}
                onChange={handleSituationProblemeChange}
                rows={4}
              />
            </div>
          </div>
          {/* Ajouter d'autres champs si nécessaire */}
          {autresTextareas.map((textareaValue, index) => (
            <div className="row mb-3" key={index}>
              <div className="col-12">
                <textarea
                  className="form-control"
                  name={`autreTextarea${index}`}
                  placeholder="Autre situation problème"
                  value={textareaValue}
                  onChange={(event) => handleAutreTextareaChange(index, event)}
                  rows={4}
                />
              </div>
              <div className="col-2 d-flex align-items-center">
          <button type="button" className="btn btn-danger btn-sm" onClick={() => removeTextarea(index)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    ))}
    <div className="row mb-3">
      <div className="col-12">
        <button type="button" className="btn btn-secondary" onClick={addTextarea}>
          +
        </button>
      </div>
    </div>
  </form>
)}
  {currentStep === 3 && (
  <form onSubmit={handleSubmit}>
    <div className="row mb-3">
      <div className="col-4">
        <label htmlFor="duree"><strong>Durée</strong></label>
        <input
          type="text"
          className="form-control"
          name="duree"
          placeholder="Durée"
          value={duree}
          onChange={handleDureeChange}
        />
      </div>
      <div className="col-4">
        <label htmlFor="roleEnseignant"><strong>Rôle d'enseignant</strong></label>
        <textarea
          className="form-control"
          name="roleEnseignant"
          placeholder="Rôle d'enseignant"
          value={roleEnseignant}
          onChange={handleRoleEnseignantChange}
          rows={4}
        />
      </div>
      <div className="col-4">
        <label htmlFor="roleApprenant"><strong>Rôle d'apprenant</strong></label>
        <textarea
          className="form-control"
          name="roleApprenant"
          placeholder="Rôle d'apprenant"
          value={roleApprenant}
          onChange={handleRoleApprenantChange}
          rows={4}
        />
      </div>
    </div>
    {/* Ajouter d'autres champs si nécessaire */}
    {autresChamps.map((champ, index) => (
      <div className="row mb-3" key={index}>
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            name={`autreChampDuree${index}`}
            placeholder="Durée"
            value={champ.duree}
            onChange={(event) => handleAutreChampChange(index, 'duree', event)}
          />
        </div>
        <div className="col-4">
          <textarea
            className="form-control"
            name={`autreChampRoleEnseignant${index}`}
            placeholder="Rôle d'enseignant"
            value={champ.roleEnseignant}
            onChange={(event) => handleAutreChampChange(index, 'roleEnseignant', event)}
            rows={4}
          />
        </div>
        <div className="col-4">
          <textarea
            className="form-control"
            name={`autreChampRoleApprenant${index}`}
            placeholder="Rôle d'apprenant"
            value={champ.roleApprenant}
            onChange={(event) => handleAutreChampChange(index, 'roleApprenant', event)}
            rows={4}
          />
        </div>
        <div className="col-1">
          <button type="button" className="btn btn-danger btn-sm" onClick={() => removeChamp(index)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    ))}
    <div className="row mb-3">
      <div className="col-12">
        <button type="button" className="btn btn-secondary" onClick={addChamp}>
          +
        </button>
      </div>
    </div>
  </form>
)}		

		     </Modal.Body>
        
        <Modal.Footer>
         
          <Button variant="contained" color="secondary" onClick={handleClose} sx={{ marginRight: '10px', backgroundColor: 'gray', color: 'white' }}>
           Fermer
          </Button>

         {currentStep !== 1 && (
        <Button variant="contained" color="secondary" onClick={() => setCurrentStep(currentStep - 1)} sx={{ marginRight: '10px', backgroundColor: 'gray', color: 'white' }}>
        Précédent
        </Button>
        )}

       {currentStep !== totalSteps && (
       <Button variant="contained" color="primary" onClick={() => setCurrentStep(currentStep + 1)} sx={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>
      Suivant
     </Button>
     )}

    {currentStep === totalSteps && (
    <Button variant="contained" color="success" onClick={handleSubmit} sx={{ backgroundColor: 'green', color: 'white' }}>
    Créer
    </Button>
    )}

        </Modal.Footer>
      </Modal>
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
                              <tr>
                              <td>1</td>
                              <td>Activité01</td>
                              <td>1APIC</td>
                              <td>Structure d'un ordinateur</td>
                              <td>01/10/2023</td>
                              <td>
                                 <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#0BA7AA"}}><i class="material-icons">&#xE417;</i></a>
                                  <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons" onClick={handleEdit}>&#xE254;</i></a>
                                  <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}} onClick={handleDelete}><i class="material-icons">&#xE872;</i></a>
                                   
                              </td>
                          </tr>
                          <tr>
                              <td>2</td>
                              <td>Activité02</td>
                              <td>2APIC</td>
                              <td>Tableur</td>
                              <td>12/02/2023</td>
                              <td>
                                      <a href="#" className="view" title="View" data-toggle="tooltip" style={{ color: "#0BA7AA" }}>
                                        <i className="material-icons">&#xE417;</i>
                                      </a>
                                      <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={handleEdit}>
                                        <i className="material-icons">&#xE254;</i>
                                      </a>
                                      <a href="#" className="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }} onClick={handleDelete}>
                                        <i className="material-icons">&#xE872;</i>
                                      </a>
                                    </td>
                          </tr>
                                {/*{activities.map((activity, index) => (
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
                                ))}*/}
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
                            color:"white",
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
                      <Button type="submit" variant="primary" style={{ backgroundColor: '#0BA7AA',color:"white" }} onClick={handleSubmit}>
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
                        <Button variant="primary" onClick={() => handleRemoveResource(index)} style={{ backgroundColor: "#FF0000", color:"white",marginTop: "8px", padding: "4px 8px", fontSize: "12px" }}>-</Button>
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
                      <Button type="button" variant="primary" onClick={handleAddResource} style={{ backgroundColor: "#0BA7AA", color:"white",marginTop: "8px", padding: "4px 8px", fontSize: "12px" }}>+</Button>
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
                      <Button type="submit" variant="primary" style={{ backgroundColor: '#0BA7AA',color:"white" }} >Envoyer</Button>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Modal supprimer */}
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation de suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Êtes-vous sûr de vouloir le supprimer ?
                </Modal.Body>
                <Modal.Footer>
                  <div>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)} style={{ color: 'black',border: '1px solid black' }}>
                      Annuler
                    </Button>
                  </div>
                    <Button variant="danger" onClick={handleConfirmDelete} style={{ backgroundColor: '#0BA7AA',color:"white" }}>
                      Supprimer
                    </Button>
                </Modal.Footer>
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



