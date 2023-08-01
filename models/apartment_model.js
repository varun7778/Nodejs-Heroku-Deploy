var mongoose=require('mongoose');

var apartmentSchema = new  mongoose.Schema({
    apt_name: String,
    apt_area: String,
    about_apt: String,
    apt_address: String,
    gmap_link: String,
    owner_name: String,
    completed_on: Date,
    brochure: String,
    images: {
        img1: String,
        img2: String,
        img3: String,
        img4: String,
        img5: String,
        img6: String,
    }
});

var apartmentModel = mongoose.model('apartmentModel', apartmentSchema, 'apartment_data');

module.exports = apartmentModel;