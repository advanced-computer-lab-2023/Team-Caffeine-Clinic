import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import html2pdf from 'html2pdf.js';
import logo from '../img/hospital.jpg';
import Navbar from '../components/PatientNavbar';


const SinglePerscriptionDetails = () => {
    const [perscription, setPerscription] = useState(null);
    const [doctorName, setName] = useState('');
    const { id } = useParams();

    const { user } = useAuthContext()

    const handleDownloadPDF = () => {
        const element = document.getElementById('pdf-content'); // Replace 'pdf-content' with the ID of the element you want to convert to PDF
    
        html2pdf(element);
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

            const json = await response.json();
            setPerscription(json);
        };

        fetchPerscription();
    }, [id]);

    useEffect(() => {
        const fetchName = async () => {
            if (perscription && perscription.doctorID) { // Check if perscription is defined and has doctorID property
                const url = `/api/perscription/doctor/${perscription.doctorID}`;

                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    console.error('Error fetching doctor data');
                    return; // Handle the error appropriately
                }

                const json = await response.json();
                setName(json);
            }
        };

        fetchName();
    }, [perscription]);

    return (
        <div className="wrapper">
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
                    <h4>Doctor Name</h4>
                    <p>Chamber Name</p>
                    <small>Address</small>
                    <br />
                    <small>Mb. 0XXXXXXXXX</small>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <div className="disease_details">
                  <div className="symptoms">
                    <h4 className="d-header">Symptoms</h4>
                    <ul className="symp" data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable="true">
                      <li>Placeholder Symptom 1</li>
                      <li>Placeholder Symptom 2</li>
                    </ul>
                    <div className="symp_action">
                      <button className="btn btn-sm btn-success save">Save</button>
                      <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                    </div>
                  </div>
                  <div className="tests">
                    <h4 className="d-header">Tests</h4>
                    <ul className="tst" data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable="true">
                      <li>Placeholder Test 1</li>
                      <li>Placeholder Test 2</li>
                    </ul>
                    <div className="test_action">
                      <button className="btn btn-sm btn-success save">Save</button>
                      <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                    </div>
                  </div>
                  <div className="advice">
                    <h4 className="d-header">Advice</h4>
                    <p className="adv_text" style={{ outline: '0' }} data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable="true">
                      Placeholder advice content.
                    </p>
                    <div className="adv_action">
                      <button className="btn btn-sm btn-success save">Save</button>
                      <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                    </div>
                  </div>
                </div>
              </td>
              <td width="60%" valign="top">
                <span style={{ fontSize: '3em' }}>R<sub>x</sub></span>
                <hr />
                <div className="medicine">
                  <section className="med_list">
                    <div className="med">&#9899; <input className="med_name" placeholder="Enter medicine name" /></div>
                    {/* ... (similar content for more medicines) ... */}
                  </section>
                  <div id="add_med" data-toggle="tooltip" data-placement="right" title="Click anywhere on the blank space to add more.">
                    Click to add...
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button_group">
          
          {/* <button className="pdf_prescription btn btn-danger">PDF</button> */}
        </div>
        <div id="snacking">Saving...</div>
        <div id="snacked">Saved!</div>
      </div>
    </div>
    );
}

export default SinglePerscriptionDetails;
