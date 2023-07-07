import React, { useState } from 'react';
import "./profil.css"


function Profil() {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="profile-menu">
      <div className="action" onClick={toggleInfo}>
        <img src="img/topics/profil.jpeg" alt="Profile" />
      </div>
      <div className={`menu ${showInfo ? 'active' : ''}`}>
        <div className="profile center">
          <div className="profile-info">
            <img src="img/topics/profil.jpeg" alt="Profile" />
            <h2 className="name">Nom & Prénom</h2>
            <p className="username">Informatique</p>
          </div>
          <div className={`info ${showInfo ? 'active' : ''}`}>
            <p>
              <strong>Nom enseignant:</strong> <span id="teacher-name">enseignant</span>
            </p>
            <p>
              <strong>Email:</strong> <span id="teacher-email">identifiant@gmail.com</span>
            </p>
            <p>
              <strong>Téléphone:</strong> <span id="teacher-tel">0634679988</span>
            </p>
            <p>
              <strong>Mot de passe:</strong> <span id="teacher-password">********</span>
            </p>
            <a href="/modifier_profil" className="btn" id="edit-profile">
             Modifier profil
            </a>
          </div>
        </div>
        <div className="profile-form" style={{ display: 'none' }}>
          <input type="text" id="teacher-name-input" placeholder="Nom enseignant" /><br />
          <input type="text" id="teacher-email-input" placeholder="Email" /><br />
          <input type="text" id="teacher-tel-input" placeholder="Téléphone" /><br />
          <input type="password" id="teacher-password-input" placeholder="Mot de passe" /><br />
          <button id="save-profile">Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default Profil;



