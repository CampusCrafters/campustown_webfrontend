import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

const backendURL = import.meta.env.VITE_BACKEND_URL;
// Initialize PDF worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resumedemo: React.FC = () => {
  const [pdfData, setPdfData] = useState("");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/v1/user/viewResume`,
          { withCredentials: true }
        );
        console.log(response);
        setPdfData(response.data.resume);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  const handleDownloadPdf = () => {
    const linkSource = `data:application/pdf;base64,${pdfData}`;
    const downloadLink = document.createElement("a");
    const fileName = "downloadedPdf.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div>
      <h1>PDF Viewer</h1>
      {pdfData && (
        <div>
          <Document file={{ data: pdfData }}>
            <Page pageNumber={1} />
          </Document>
          <button onClick={handleDownloadPdf}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default Resumedemo;
