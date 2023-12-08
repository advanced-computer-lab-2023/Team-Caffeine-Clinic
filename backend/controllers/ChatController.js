const { default: mongoose } = require('mongoose')
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Doctor = require("../models/doctor");

const accessChat = async (req, res) => {


    var PatientSender=false;
    var PharmacistSender=false;
    var DoctorSender=false;
    var PatientReceiver=false;
    var PharmacistReceiver=false;
    var DoctorReceiver=false;

    const { username } = req.body;

    console.log(username);

    if (!username) {
        console.log("UserId param not sent with request");
         res.status(400).json({"error":"No username found"});
      }

    const ReceiverPatient = await Patient.findOne({username:username}).catch(err => console.log(err));;
    const ReceiverDoctor = await Doctor.findOne({username:username}).catch(err => console.log(err));;
    const ReceiverPharmacist = await Pharmacist.findOne({username:username}).catch(err => console.log(err));

    var RecieverId = null;

    if(ReceiverPatient){
         RecieverId=ReceiverPatient._id;
        PatientReceiver=true;
    }
    if(ReceiverDoctor){
         RecieverId=ReceiverDoctor._id;
        DoctorReceiver=true;
    }
    if(ReceiverPharmacist){
         RecieverId=ReceiverPharmacist._id;
        PharmacistReceiver=true;
    }

        // Assuming you have a Patient and Pharmacist model
        const isPatient = await Patient.findById(req.user._id).catch(err => console.log(err));;
        const isPharmacist = await Pharmacist.findById(req.user._id).catch(err => console.log(err));;
        const isDoctor = await Doctor.findById(req.user._id).catch(err => console.log(err));;

        if (isPatient) {
            PatientSender = true;
        }
        if(isPharmacist){
            PharmacistSender=true;
        }
        if(isDoctor){
            DoctorSender=true;
        }
  
        if(PatientSender && PharmacistReceiver){
    var isChat = await Chat.find({ patient: req.user._id  , pharmacist:  RecieverId  })
      .populate("patient")
      .populate("pharmacist")
      .populate("latestMessage");}

      if(PatientReceiver&&PharmacistSender){
        var isChat = await Chat.find({ patient: RecieverId  , pharmacist: req.user._id })
        .populate("patient")
        .populate("pharmacist")
        .populate("latestMessage");
      }

      if(PatientSender && DoctorReceiver){
        var isChat = await Chat.find({ patient: req.user._id  , doctor:  RecieverId  })
          .populate("patient")
          .populate("doctor")
          .populate("latestMessage");
        }

        if(PatientReceiver&&DoctorSender){
          var isChat = await Chat.find({ patient: RecieverId  , doctor: req.user._id })
          .populate("patient")
          .populate("doctor")
          .populate("latestMessage");
        }

        if(DoctorSender && PharmacistReceiver){
          var isChat = await Chat.find({ doctor: req.user._id  , pharmacist:  RecieverId  })
            .populate("doctor")
            .populate("pharmacist")
            .populate("latestMessage");}
      
            if(DoctorReceiver&&PharmacistSender){
              var isChat = await Chat.find({ doctor: RecieverId  , pharmacist: req.user._id })
              .populate("doctor")
              .populate("pharmacist")
              .populate("latestMessage");
            }


        if (PatientSender && isChat.latestMessage) {
            console.log("hii");
          // Populate using the Patient model
          isChat = await Patient.populate(isChat,{
            path: "latestMessage.patientSender",// Replace with your actual Patient model name
            select: "username",
          });
        } else if (PharmacistSender && isChat.latestMessage) {
            console.log("hii");
          // Populate using the Pharmacist model
          isChat = await Pharmacist.populate(isChat,{
            path: "latestMessage.pharmacistSender", // Replace with your actual Pharmacist model name
            select: "username",
          });
        }
        else if (DoctorSender && isChat.latestMessage) {
          console.log("hii");
        // Populate using the Pharmacist model
        isChat = await Doctor.populate(isChat,{
          path: "latestMessage.doctorSender", // Replace with your actual Pharmacist model name
          select: "username",
        });
      }

  
    if (isChat.length > 0) {
      res.status(200).json(isChat[0]);
    } else {
            if(PatientReceiver && PharmacistSender){
      var chatData = {
        chatName: "sender",
            patient:RecieverId,
            pharmacist:req.user._id
      };
    }
    if(PatientSender && PharmacistReceiver){
        var chatData = {
          chatName: "sender",
              patient:req.user._id,
              pharmacist:RecieverId
        };
      }
      if(PatientReceiver && DoctorSender){
        var chatData = {
          chatName: "sender",
              patient:RecieverId,
              doctor:req.user._id
        };
      }
      if(PatientSender && DoctorReceiver){
        var chatData = {
          chatName: "sender",
              patient:req.user._id,
              doctor:RecieverId
        };
      }
      if(DoctorReceiver && PharmacistSender){
        var chatData = {
          chatName: "sender",
              doctor:RecieverId,
              pharmacist:req.user._id
        };
      }
      if(DoctorSender && PharmacistReceiver){
          var chatData = {
            chatName: "sender",
                doctor:req.user._id,
                pharmacist:RecieverId
          };
        }
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("patient")
        .populate("pharmacist").populate("doctor");
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400).json({"error":"Error occurred"});
        throw new Error(error.message);
      }
    }
  };

  const fetchChats = async (req, res) => {

        const isPatient = await Patient.findById(req.user._id).catch(err => console.log(err));;
        const isPharmacist = await Pharmacist.findById(req.user._id).catch(err => console.log(err));;
        const isDoctor = await Doctor.findById(req.user._id).catch(err => console.log(err));;

        if (isPatient) {
            try {
                Chat.find({patient:req.user._id})
                  .populate("patient")
                  .populate("pharmacist")
                  .populate("doctor")
                  .populate("latestMessage")
                  .sort({ updatedAt: -1 })
                  .then(async (results) => {
                    results = await Patient.populate(results, {
                      path: "latestMessage.sender",
                      select: "username",
                    });
                    results = await Doctor.populate(results, {
                        path: "latestMessage.sender",
                        select: "username",
                      });
                      results = await Pharmacist.populate(results, {
                        path: "latestMessage.sender",
                        select: "username",
                      });
                    res.status(200).send(results);
                  });
              } catch (error) {
                res.status(400);
                throw new Error(error.message);
              }
        }
        if(isPharmacist){
            try {
                Chat.find({pharmacist:req.user._id})
                  .populate("patient")
                  .populate("pharmacist")
                  .populate("doctor")
                  .populate("latestMessage")
                  .sort({ updatedAt: -1 })
                  .then(async (results) => {
                    results = await Patient.populate(results, {
                      path: "latestMessage.sender",
                      select: "username",
                    });
                    results = await Doctor.populate(results, {
                        path: "latestMessage.sender",
                        select: "username",
                      });
                      results = await Pharmacist.populate(results, {
                        path: "latestMessage.sender",
                        select: "username",
                      });
                    res.status(200).send(results);
                  });
              } catch (error) {
                res.status(400);
                throw new Error(error.message);
              }
        }
        if(isDoctor){
          try {
              Chat.find({doctor:req.user._id})
                .populate("patient")
                .populate("pharmacist")
                .populate("doctor")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                  results = await Patient.populate(results, {
                    path: "latestMessage.sender",
                    select: "username",
                  });
                  results = await Doctor.populate(results, {
                      path: "latestMessage.sender",
                      select: "username",
                    });
                    results = await Pharmacist.populate(results, {
                      path: "latestMessage.sender",
                      select: "username",
                    });
                  res.status(200).send(results);
                });
            } catch (error) {
              res.status(400);
              throw new Error(error.message);
            }
      }
  };

  const allMessages = async (req, res) => {
    try {
      var messages = await Message.find({ chat: req.params.chatId })
        .populate("chat");
        messages = await Patient.populate(messages,{path:"patientSender", select:"username"});
        messages = await Pharmacist.populate(messages,{path:"pharmacistSender", select:"username"});
        messages = await Doctor.populate(messages,{path:"doctorSender", select:"username"});      
        console.log(messages); 
      res.json(messages);
    } catch (error) {
      res.status(400).json({error:error.message});
    }
  };

  const sendMessage =async (req, res) => {
    const { content, chatId } = req.body;

    console.log(req.user);
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.status(400).json({error:"Invalid data passed into request"});
    }


    const isPatient = await Patient.findById(req.user._id).catch(err => console.log(err));;
    const isPharmacist = await Pharmacist.findById(req.user._id).catch(err => console.log(err));;
    const isDoctor = await Doctor.findById(req.user._id).catch(err => console.log(err));;

    var newMessage = null;

    if (isPatient) {
        var newMessage = {
            patientSender: req.user._id,
            content: content,
            chat: chatId,
          };
    }

    if(isPharmacist){
        var newMessage = {
            pharmacistSender:req.user._id,
            content: content,
            chat: chatId,
          };
        };  

    if(isDoctor){
        var newMessage = {
            doctorSender:req.user._id,
            content: content,
            chat: chatId,
          };
    };
  
  
    // try {
      var message = await Message.create(newMessage);

      message = await Patient.populate(message,{path:"patientSender", select:"username"});
      message = await Pharmacist.populate(message,{path:"pharmacistSender", select:"username"});
      message = await Doctor.populate(message,{path:"doctorSender", select:"username"});
      message = await message.populate("chat");
      message = await Patient.populate(message, {
        path: "chat.patient",
        select: "username",
      });
      message = await Pharmacist.populate(message, {
        path: "chat.pharmacist",
        select: "username",
      });
      message = await Doctor.populate(message, {
        path: "chat.doctor",
        select: "username",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    // } catch (error) {
    //   res.status(400).json({error:error.message});
    // }
  };


  const viewPharmacists = async (req, res) => {

    try {

        const pharmacists = await Pharmacist.find();


       var pharmacistUsernames = [];

      for (let i = 0; i < pharmacists.length; i++) {
        const item = {
            username: pharmacists[i].username,
            type: "Pharmacist",
        }
        pharmacistUsernames.push(item);
    }
      console.log(pharmacistUsernames);
      res.status(200).json(pharmacistUsernames);
    } catch (error) {
      console.error("Error fetching pharmacists:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  const viewDoctors = async (req, res) => {
    try {

        const doctors = await Doctor.find();

      var doctorUsernames = [];

      for (let i = 0; i < doctors.length; i++) {
        const item = {
            username: doctors[i].username,
            type: "Doctor",
        }
        doctorUsernames.push(item);
    }

      console.log(doctorUsernames);
      res.status(200).json(doctorUsernames);
    } catch (error) {
      console.error("Error fetching pharmacists:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const viewPatientDoctors = async (req, res) => {
    try {
      const patient = await Patient.findById(req.user._id).catch((err) => console.log(err));
  
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
  
      const doctors = await Doctor.find({
        patients: {
          $in: [patient.username]
        }
      }).catch((err) => console.log(err));
  
      const doctorUsernames = doctors.map((doctor) => ({
        username: doctor.username,
        type: "Doctor"
      }));
  
      console.log(doctorUsernames);
      res.status(200).json(doctorUsernames);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  module.exports={
    accessChat,
    fetchChats,
    allMessages,
    viewPharmacists,
    sendMessage,
    viewDoctors,
    viewPatientDoctors
  }