let emailModel = require('../models/email');

let EmailController = {
   read: async(req,res) => {
    let found = await emailModel.find()
    res.json(found);
   },

   write: async(req,res) => {
    try {
        const { email } = req.body;
        if (!email) {
          return res.status(400).json({ error: "Email field is missing in the request body." });
        }
        const newEmail = new emailModel({ email });
        const savedEmail = await newEmail.save();
        return res.json(savedEmail);
      } catch (error) {
        console.error("Error in write controller:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
   },

   readEmail: async(req,res) => {
    let valUpdate = await emailModel.find({email : req.params.email});
    console.log(valUpdate);
    res.json(valUpdate);
   },

   update: async (req, res) => {
    try {
      const emailIdToUpdate = req.params.email;
      const newEmailValue = req.body.email;

      // Check if the 'email' field is provided in the request body
      if (!newEmailValue) {
        return res.status(400).json({ error: "Email field is missing in the request body." });
      }

      // Find the existing email document to update
      const existingEmail = await emailModel.findOne({ email: emailIdToUpdate });

      // If the email document does not exist, return an error
      if (!existingEmail) {
        return res.status(404).json({ error: "Email not found." });
      }

      // Update the email value and save the document
      existingEmail.email = newEmailValue;
      const updatedEmail = await existingEmail.save();
      return res.json(updatedEmail);
    } catch (error) {
      console.error("Error in update controller:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  },

  deleteEmail: async(req,res) => {
    const emailToDelete = req.params.email;
    const deleteMail = await emailModel.deleteOne({email: emailToDelete});
    res.json(deleteMail);
  }
}

module.exports = EmailController;