 
 
 const ObjIndexToZero = (ArrayList , Obj ) => {
     console.log("started");
    if (ArrayList.length == 0) {
        return ArrayList
    }
    
 const indexOfDefault =   ArrayList.findIndex(a => a._id ==Obj._id)
 let cutOut = ArrayList.splice(indexOfDefault, 1) [0]; // cut the element at index 'from'
 ArrayList.splice(0, 0, cutOut); 
 return ArrayList
}


module.exports = {
    ObjIndexToZero
};
