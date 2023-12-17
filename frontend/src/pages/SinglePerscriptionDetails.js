import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import html2pdf from 'html2pdf.js';
import logo from '../img/hospital.jpg';
import Navbar from '../components/PatientNavbar';
import { Button } from 'react-bootstrap';


const SinglePerscriptionDetails = () => {
  const [perscription, setPerscription] = useState(null);
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [patient, setPatient] = useState('');
  const { id } = useParams();

  const [tests, setTests] = useState(['']);
  const [symptom, setSymptoms] = useState(['']);
  const [advice, setAdvice] = useState("");

  const [medicine, setMedicine] = useState(['']); // Initial state with an empty medicine
  const [dosage, setDosage] = useState(['']); // Initial state with an empty medicine

  const { user } = useAuthContext()
  const margin = {
    marginLeft: '400px',
}
  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');

    const options = {
      filename: 'your_custom_filename.pdf',
      image: { type: 'jpeg', quality: 1.0 }, // Set image quality to 1.0 (highest)
      html2canvas: { scale: 3 }, // Increase the scale for better resolution
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element)
      .set(options)
      .toPdf()
      .get('pdf')
      .then((pdf) => downloadPdf(pdf, options));

    const downloadPdf = (pdf, opt) => {
      let link = document.createElement('a');
      link.target = '_blank';
      link.href = pdf.output('bloburl');
      link.download = `${patient.name} Date ${date}.pdf`;
      link.click();
      link.remove();
    }
  };

  useEffect(() => {
    const fetchPerscription = async () => {
      let url = `/api/perscription/singlePersc/${id}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (!response.ok) {
        console.error('Error fetching prescription data');
        return; // Handle the error appropriately
      }

      const persc = await response.json();
      setPerscription(persc);
      console.log(persc);
      setDoctor(persc.doctorID)
      setPatient(persc.patientID)
      setMedicine(persc.medicine)
      setDosage(persc.dosage)
      setSymptoms(persc.symptoms)
      setTests(persc.tests)
      setAdvice(persc.advice)

      const d = new Date(persc.date_of_perscription);
      const formattedDate = d.toLocaleDateString();

      // Now you can use formattedDate where you need it
      setDate(formattedDate);

    };
    if (user) {
      fetchPerscription();
    }
  }, [user, id]);



  return (
    <div style={margin}>
      <br /><br /><br />
      <br />
      <br />
      <div>
        <div className="wrapper" id='pdf-content'>
          <div className="prescription_form">
            <table className="prescription" border="1">
              <tbody>
                <tr height="15%">
                  <td colSpan="2">
                    <div className="header1">
                      <div className="logo">
                        <img src={logo} alt="Hospital Logo" />
                      </div>
                      <div className="credentials">
                        <h4>{doctor.name}</h4>
                        <h6>{doctor.speciality}</h6>
                        <h6>{doctor.email}</h6>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <div className="disease_details">
                      <div className="symptoms">
                        <h4 className="d-header">Symptoms</h4>
                        <ul className="symp" data-toggle="tooltip" >
                          {symptom.map((symptom, index) => (
                            <div>
                              <li key={index}>
                                <p>{symptom}</p>
                              </li>
                            </div>
                          ))}
                        </ul>

                      </div>
                      <div className="tests">
                        <h4 className="d-header">Tests</h4>
                        <ul className="tst" data-toggle="tooltip" data-placement="bottom" title="Click to edit.">
                          {tests.map((test, index) => (
                            <div key={index}>
                              <li>
                                <p>{test}</p>
                              </li>
                            </div>
                          ))}
                        </ul>

                      </div>
                      <div className="advice">
                        <h4 className="d-header">Advice</h4>
                        <p>{advice}</p>
                      </div>
                    </div>
                  </td>
                  <td width="60%" valign="top">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '3em' }}>R<sub>x</sub></span>
                      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                        <b>Patient Name:</b> {patient.name}
                        <br />
                        <b>Date:</b> {date}
                      </div>
                    </div>

                    <hr />
                    <div className="medicine">
                      <section className="med_list">
                        {medicine.map((medicine, index) => (
                          <div className="med" key={index}>
                            <ul>
                              <li><h4>Medicine:</h4>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  &nbsp;<b>Name:</b>
                                  <p style={{ margin: '0px 10px' }}>{medicine}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  &nbsp;<b>Dosage:</b>
                                  <p style={{ margin: '0px 10px' }}>{dosage[index]}</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </section>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div id="snacking">Saving...</div>
            <div id="snacked">Saved!</div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className='text-center'>
          <Button className='text-center button-40' onClick={handleDownloadPDF}>Download</Button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default SinglePerscriptionDetails;
