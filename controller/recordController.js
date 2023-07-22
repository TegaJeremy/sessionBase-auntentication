const recordmodel = require('../model/recordModel')
const UserModel = require('../model/userModel')


exports.createRecord= async(req,res)=>{
    try {
        const {mathScore, englishScore}= req.body;

        //create a new record
        const record = new  recordmodel({
            mathScore,
             englishScore,
             createdBy: req.session.user_id,
        })


        //save the record
            // Save the record to the database
      const newRecord = await record.save();
      const user = await UserModel.findById( req.session.user._id );
      user.records.push( newRecord );
      await user.save();
        res.status(201).json({
            message:"record created succesfully"
        });
        
    } catch (error) {
      return res.status(500).json({message: error.message})

        
    }
}

//read all records in the database
exports.readAllRecords = async(req,res)=>{
    try {
        
        const records = await recordmodel.find()
       
            res.status(200).json({message:"all records", data:records})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// Find all records of a specific user

exports.readAllRecordsOfSpecificUser = async (req, res) => {
    try {
      const records = await recordmodel.find( { createdBy: req.session.user._id } ).populate();
      
        if ( !records ) {
            return res.status( 404 ).json( {
              message: "This user has no record."
          })
        } else {
            res.status( 200 ).json( {
                message: "All my records.",
                data: records
          });     
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// find one record
exports.readrecord = async(req,res)=>{
    try {
        const {id}= req.params;
        const record = await recordmodel.findById(id)
        if(!record){
            return res.status(404).json({message:"record not found"})

        }
          //check if loged in user owns the record

          if(record.createdBy.toString() !== req.session.user._id.toString()){
          return res.status(401).json({messsage:"unathorise"})
      }
            res.status(200).json({records})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

