import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { useMedicinesContext } from "../hooks/useMedicinesContext"

const MedicineDetails = ({ medicine }) => {
  const {user} = useAuthContext()
  const [GoodMessage,ViewGood]=useState(null);
  const [BadMessage,ViewBad]=useState(null);
  const[Amount,SetAmount]=useState(medicine.Amount);
  const[Visible,SetVisible]=useState(true);
  const[Archive,SetArchive]=useState("");
  const {medicines, dispatch} = useMedicinesContext();


  let ArchiveMed = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/medicine/archiveMed/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })
    const data = await response.json();

    if(data){
      console.log(data.Archive)
    if(!data.Archive){
      SetArchive('Unarchive')
    }
    else{
      SetArchive('Archive')
    }
  }

    if (response.status==200) {
      ViewBad("")
      if(Archive=='Archive')
       ViewGood("Archived")
    else
       ViewGood("Unarchived")
    }
    if (response.status==400) {
      ViewGood("")
      ViewBad("Could not Archive")
    }      
  }


  useEffect(() => {
    if(medicine.Archive){
      SetArchive('Unarchive')
    }
    else{
      SetArchive('Archive')
    }

},ArchiveMed);

  let handleSubmit = async (e) => {
      e.preventDefault()
      const response = await fetch(`/api/patient/deleteFromCart/${medicine.Name}`,{
            method:'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
      })
      if (response.status==200) { 
        SetVisible(false);
        ViewGood("Medicine Deleted")
      }
      if (response.status==400) {
        ViewBad("Something Went Wrong")
      }
  }




  let addPhoto = async (e) => {
    e.preventDefault()
    window.open(`/addMedicinePicture/${medicine.Name}`,"_self");
  }




  let EditResults = async (e) => {
        e.preventDefault()
        window.open(`/editMedicine/${medicine.Name}`,"_self");
  }



  let addToCart = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/patient/addToCart/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })

    if (response.status==200) {
      ViewBad("")
      ViewGood("Added")
    }
    if (response.status==400) {
      ViewGood("")
      ViewBad("Could not Add")
    }      
  }



  let IncAmount = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/patient/incAmount/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })

    if (response.status==200) {
      var temp=Amount+1;
      SetAmount(temp)
      ViewBad("");

    }
    if (response.status==400) {
      ViewBad("Max Medicine Quantity Reached")
      ViewGood("");
    } 

  }



  let DecAmount = async (e) => {
  e.preventDefault()

    const response = await fetch(`/api/patient/decAmount/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })

    if (response.status==200) {
      var temp=Amount-1;
      SetAmount(temp)
      if(temp==0){
     SetVisible(false)}
      ViewBad("");
    }
    if (response.status==400) {
      ViewBad("Something Went Wrong")
      ViewGood("");
    } 
  }



  return (
    <div>
      {Visible && ((user.type=="Patient" && !medicine.Archive && medicine.Name)||
            (user.type!="Patient" && medicine.Name)) &&

        <form style={{marginBottom:"-20px"}} className="create" onSubmit={handleSubmit}>

          <div className="workout-details">
           
            { medicine.Picture && 
            <img src={medicine.Picture} alt="Medicine" width='120' height='120' />}

            <h4>{(user.type=="Patient"  && medicine.Name)||
            (user.type!="Patient" && medicine.Name)}</h4>

            {(user.type=="Patient"  && medicine.Name)||
            (user.type!="Patient" && medicine.Name) && <p><strong>Price : </strong>{medicine.Price}</p>}

            {user&& user.type=="Patient" &&
            <p><strong>Discounted Price : </strong>{medicine.discountedPrice}</p>}

            {<p><strong>Description : </strong>{medicine.Description}</p>}

            {user&& user.type=="Patient" && !medicine.Archive  && medicine.amount &&
            <p><strong>Amount : </strong>{medicine.amount}</p>}

            {user&& user.type=="Pharmacist" &&  <p><strong>Quantity : </strong>{medicine.Quantity}</p> &&
            <p><strong>Sales : </strong>{medicine.Sales}</p> }

            {user && user.type=="Patient"  && medicine.Amount &&
            <button style={{marginTop:"10px"}} onClick={handleSubmit}>Delete From cart</button>} <br></br> 

            { Visible && user&& user.type=="Patient" && medicine.Amount && <><strong>Amount in Cart : </strong>{Amount}</>}   

            { Visible && user && user.type=="Patient" && medicine.Amount &&
            <button onClick={IncAmount} style={{marginRight:"20px",marginLeft:"20px"}} >+</button>} 

             {Visible && user && user.type=="Patient" && medicine.Amount &&
             <button onClick={DecAmount}>-</button>} <br></br>    
             
          </div>
        </form>
      }
      {user && user.type=="Pharmacist" &&
      <button onClick={EditResults}> Edit</button>} 
      <samp>   </samp>
      {user && user.type=="Pharmacist" &&
      <button onClick={ArchiveMed} >{Archive} </button>} 
      <samp>   </samp>
      {user && user.type=="Pharmacist" &&
      <button onClick={addPhoto}> Add Picture</button>}

      {user && user.type=="Patient" && !medicine.Archive && !medicine.Amount && !medicine.amount &&
      <button onClick={addToCart}> Add To Cart</button>} <br></br>

      {user  && <div style={{color:"green"}}>{GoodMessage}</div>}
      {user  && <div style={{color:"red"}}>{BadMessage}</div>}       
    </div>
  )
}

export default MedicineDetails