const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'o1Ncm5dtsZbweA0w',
        DATABASE: 'mongodb+srv://Varun_Anusheel:o1Ncm5dtsZbweA0w@cluster0.nr3ecds.mongodb.net/nilayainfinity?retryWrites=true&w=majority'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}