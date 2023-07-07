import React, { useState, useEffect, useContext } from 'react';
import './modifier_profil.css';






const ModifierProfil= () => {
const [photo, setPhoto] = useState('');
const changePhoto = () => {
    // Logique pour changer la photo
    // Utilisez setPhoto pour mettre à jour la variable d'état photo avec la nouvelle photo
  };

    return (
        <>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-9 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Modifier profil</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Prénom</label>
                                    <input type="text" className="form-control" placeholder="Prénom" value="" />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Nom</label>
                                    <input type="text" className="form-control" value="" placeholder="Nom" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Email</label>
                                    <input type="email" className="form-control" placeholder="Entrer votre email" value="" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Téléphone</label>
                                    <input type="tel" className="form-control" placeholder="Entrer votre numéro de téléphone" value="" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Mot de passe</label>
                                    <input type="password" className="form-control" placeholder="********" value="" />
                                </div>
                            </div>
                            <div className="mt-5 text-center button-container">
                                <button className="btn btn-secondary profile-button cancel-button" type="button">Annuler</button>
                                <button className="btn btn-primary profile-button" type="button">Modifier profil</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="img/topics/profil.jpeg" alt="Profil" />
                            <span className="font-weight-bold">Enseignant</span>
                            <span className="text-black-50">email@gmail.com</span>
                            <span> </span>
                            <button className="btn btn-secondary mt-3" onClick={changePhoto}>
                                Modifier la photo
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default ModifierProfil;
