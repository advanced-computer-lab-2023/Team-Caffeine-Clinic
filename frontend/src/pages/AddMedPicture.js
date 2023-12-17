import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'

const EditResults = () => {
  const [Edit, setEdit] = useState('')
  const {Name} = useParams() 
  const [error, setError] = useState(null)
  const [Picture, setPicture] = useState('')
  const {user} = useAuthContext()

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }
  const onUploadFileChangePicture = ({ target }) => {
      if (target.files < 1 || !target.validity.valid) {
        return
      }
      fileToBase64(target.files[0], (err, result) => {
        if (result) {
          setPicture(result)
        }
      })
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const medicine = {Name,  Picture}
    
    const response = await fetch('/api/medicine/addPicture', {
      method: 'PUT',
      body: JSON.stringify(medicine),
      headers: {
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setEdit("Error");
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setEdit("Added");
  //     setTimeout(function(){
  //       window.open(`/Pharmacist`,'_self');
  //  }, 1500);
   
    }

  }

  return (
    <><header>
      <Navbar />
    </header>
    <div className="title-section text-center col-12">
    <h2 >Add Medicine Picture</h2>
    </div>
    <form className="Add_Med" onSubmit={handleSubmit}>


        <label>
                Upload Picture:
                <input
                 type="file"
                 class="form-control"
                 accept="image/png"
                 required
                onChange={onUploadFileChangePicture}/>
        </label>

        <button>Save changes</button>
        <label> {Edit} </label>
        {error && <div className="error">{error}</div>}
      </form></>
  )
}

export default EditResults