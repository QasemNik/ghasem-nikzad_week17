 export function handleImageChange  ( setField)  {

     return (event) => {
         const file = event.target.files[0];
        
         if (file && file.size <= 5000000) {
           const reader = new FileReader();
           reader.onloadend = () => {
             setField('image', reader.result);
           };
           reader.readAsDataURL(file);
         } else if (file) {
           alert('Image size should be less than 5MB');
         }
    }
  };