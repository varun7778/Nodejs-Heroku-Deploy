var mongoose=require('mongoose');

var staticDataSchema = new  mongoose.Schema({
    name: String,
    aboutme_title: String,
    aboutme_text: String,
    contact_text: String,
    office_address: String,
    mobile_number: String,
    email: String,
    gmap_link: String,
    whatsapp: String,
    facebook: String,
    instagram: String,
    apt_list: [{apt_name: String, apt_area: String}]
});

var staticDataModel = mongoose.model('staticDataModel', staticDataSchema, 'staticdata');
module.exports = staticDataModel