console.log('js is linked')








////////// Test functions to make sure jest works /////////

function sum(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
      return a - b;
  }
  
  function compileAndroidCode() {
      throw new Error('you are using the wrong JDK!');
   }
///////////////// TEST EXPORT LINE ////////////////////
module.exports = {sum, subtract, compileAndroidCode};
// export default {sum, subtract, compileAndroidCode};
// export default sum;
// export default subtract;
// export default {sum, subtract};