import { useAuthContext } from '../hooks/useAuthContext';

const HealthPackdetails = ({ hp }) => {
  const { user } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch('/api/Admin/deleteHealthPackage/' + hp._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    window.location.reload();
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    window.open(`/editHP/${hp._id}`, "_self");
  };

  return (
    <div id="doctors" className="doctors">
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <div className="member d-flex align-items-start">
              <div className="member-info">
                <h4>{hp.id}</h4>
                <div className="box-title">
                  <h2>{hp.name}</h2>
                </div>
                <p><strong>Description: </strong>{hp.description}</p>
                <p><strong>Services Included: </strong>{hp.servicesIncluded}</p>
                <p><strong>Base Price: </strong>{hp.basePrice}</p>
                <p><strong>Doctor Discount: </strong>{hp.discounts?.doctorSession || 'N/A'}</p>
                <p><strong>Family member Discount: </strong>{hp.discounts?.pharmacyMedicine || 'N/A'}</p>
                <p><strong>Pharmacy Medicine Discount: </strong>{hp.discounts?.familySubscription || 'N/A'}</p>
                <p>{hp.createdAt}</p>
                <button className="button-40" onClick={handleSubmit}>Edit</button>
                <button className="button-41" onClick={handleClick}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default HealthPackdetails;
