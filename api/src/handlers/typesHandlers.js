const { 
    findAllTypes, 
    typeCreate, 
    getTypesAPI
} = require("../constrollers/typeControllers");



const getTypesHandler = async ( req , res ) => {
    try {
        let allTypes = await findAllTypes();
        
        if(allTypes.length === 0){
            const response = getTypesAPI();
            const typesAPI = response.data.results;

            for(let i = 0; i < typesAPI.length; i++) {
                await typeCreate({tipo: typesAPI[i].name});
            }
            allTypes = await findAllTypes();
        }
        
        res.status(200).json(allTypes);

    } catch (error) {

        res.status(400).send( error.message );
  
    }
};

module.exports = {
    getTypesHandler
}