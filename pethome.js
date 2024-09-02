
        function direct(){
            let info=document.getElementById('name').value;
            let em=document.getElementById('mail').value;
            if(!info||!em){
                alert("Enter the Valid information ");
            }
            else{
            window.location.href= 'pet.html';
            }
        }
