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
