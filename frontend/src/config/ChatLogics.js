export const getSender = (user, patient , pharmacist,doctor) => {
  if(patient && pharmacist){
  if(user.type=="Patient")
    return pharmacist.username;
  else
  {
    return patient.username;
  }}
  else
    if(patient && doctor){
      if(user.type=="Patient")
        return doctor.username;
      else
      {
        return patient.username;
      }}
  else{
    if(pharmacist && doctor){
      if(user.type=="Pharmacist")
        return doctor.username;
      else
      {
        return pharmacist.username;
      }}
  }
};

export const isSameSenderMargin = (messages, m, i, userType) => {

  if (
    (i < messages.length - 1 &&
    ( messages[i + 1].patientSender && m.patientSender ) &&
    messages[i].patientSender && userType !== "Patient")
     ||
    (i < messages.length - 1 &&
      ( messages[i + 1].pharmacistSender && m.pharmacistSender ) &&
      messages[i].pharmacistSender && userType !== "Pharmacist")
      ||
    (i < messages.length - 1 &&
      ( messages[i + 1].doctorSender && m.doctorSender ) &&
      messages[i].doctorSender && userType !== "Doctor")
  )
  
    return 33;

  else if (
    (( i==messages.length-1 && userType=="Patient" && messages[i].pharmacistSender )
    || (i<=messages.length-2 && userType=="Patient" && messages[i].pharmacistSender && messages[i+1].patientSender)) 

    ||

    (( i==messages.length-1 && userType=="Pharmacist" && messages[i].patientSender )
    || (i<=messages.length-2 && userType=="Pharmacist" && messages[i].patientSender && messages[i+1].pharmacistSender))
    
    ||

    (( i==messages.length-1 && userType=="Patient" && messages[i].doctorSender )
    || (i<=messages.length-2 && userType=="Patient" && messages[i].doctorSender && messages[i+1].patientSender)) 
    
    ||

    (( i==messages.length-1 && userType=="Doctor" && messages[i].pharmacistSender )
    || (i<=messages.length-2 && userType=="Doctor" && messages[i].pharmacistSender && messages[i+1].doctorSender)) 

    ||

    (( i==messages.length-1 && userType=="Pharmacist" && messages[i].doctorSender )
    || (i<=messages.length-2 && userType=="Pharmacist" && messages[i].doctorSender && messages[i+1].pharmacistSender))

  )

  return 0;
  else return "auto";

};

export const isSameSender = (messages, m, i, userType) => {
  return (
   ( i < messages.length - 1 &&
    (( messages[i + 1].patientSender && !m.patientSender ) ||
      (!messages[i + 1].patientSender && !messages[i + 1].pharmacistSender ) )
      && messages[i].patientSender && userType !== "Patient") 
      
      ||

      ( i < messages.length - 1 &&
        (( messages[i + 1].pharmacistSender && !m.pharmacistSender ) ||
          (!messages[i + 1].pharmacistSender && !messages[i + 1].patientSender ) )
          && messages[i].pharmacistSender && userType !== "Pharmacist")

          ||

     ( i < messages.length - 1 &&
       (( messages[i + 1].patientSender && !m.patientSender ) ||
      (!messages[i + 1].patientSender && !messages[i + 1].doctorSender ) )
      && messages[i].patientSender && userType !== "Patient") 

      ||

      ( i < messages.length - 1 &&
        (( messages[i + 1].doctorSender && !m.doctorSender ) ||
          (!messages[i + 1].doctorSender && !messages[i + 1].patientSender ) )
          && messages[i].doctorSender && userType !== "Doctor")

          ||

          ( i < messages.length - 1 &&
            (( messages[i + 1].doctorSender && !m.doctorSender ) ||
              (!messages[i + 1].doctorSender && !messages[i + 1].pharmacistSender ) )
              && messages[i].doctorSender && userType !== "Doctor") 
              
              ||
        
              ( i < messages.length - 1 &&
                (( messages[i + 1].pharmacistSender && !m.pharmacistSender ) ||
                  (!messages[i + 1].pharmacistSender && !messages[i + 1].doctorSender ) )
                  && messages[i].pharmacistSender && userType !== "Pharmacist")
  );
};

export const isLastMessage = (messages, i, userType) => {
  return (

  (( i==messages.length-1 && userType=="Patient" && messages[i].pharmacistSender )
    || (i<=messages.length-2 && userType=="Patient" && messages[i].pharmacistSender && messages[i+1].patientSender)) 

    ||

    (( i==messages.length-1 && userType=="Pharmacist" && messages[i].patientSender )
    || (i<=messages.length-2 && userType=="Pharmacist" && messages[i].patientSender && messages[i+1].pharmacistSender))

    ||

    (( i==messages.length-1 && userType=="Patient" && messages[i].doctorSender )
    || (i<=messages.length-2 && userType=="Patient" && messages[i].doctorSender && messages[i+1].patientSender)) 
    
    ||

    (( i==messages.length-1 && userType=="Doctor" && messages[i].pharmacistSender )
    || (i<=messages.length-2 && userType=="Doctor" && messages[i].pharmacistSender && messages[i+1].doctorSender)) 

    ||

    (( i==messages.length-1 && userType=="Pharmacist" && messages[i].doctorSender )
    || (i<=messages.length-2 && userType=="Pharmacist" && messages[i].doctorSender && messages[i+1].pharmacistSender))
  
  );
};

export const isSameUser = (messages, m, i) => {
  return i>0 &&((messages[i - 1].patientSender && m.patientSender )
   ||
   (messages[i - 1].pharmacistSender && m.pharmacistSender )
   ||
   (messages[i - 1].doctorSender && m.doctorSender )) ;
};