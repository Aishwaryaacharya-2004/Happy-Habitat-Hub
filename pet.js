
    
if(!localStorage.getItem('counter')){
    localStorage.setItem('counter',0);
}
let index=0;
let imgarray=['cat1.jpeg','cat2.jpeg','cat3.jpeg','cat4.jpg','cat5.webp','cat6.webp','cat7.jpeg'];
if(!localStorage.getItem('counter1')){
    localStorage.setItem('counter1',0);
}
let index1=0;
let imgarray1=['dog2.jpeg','dog3.jpeg','dog4.jpeg','dog5.jpeg','dog6.jpeg'];
function count(){
   let counter=localStorage.getItem('counter');
    counter++;
    console.log(counter);
    alert("You have liked a Cat image");
    document.getElementById('count').innerHTML=counter;
    localStorage.setItem('counter',counter);
}
 // let index=0;
  //let imgarray=['cat1.jpeg','cat2.jpeg','cat3.jpeg','cat4.jpg','cat5.webp','cat6.webp'];
function img1(){
    if(index<imgarray.length){
    document.getElementById('image').src=imgarray[index];
    index++;
}
else
{
    index=0;
}
   }
   
function create(){
    
   document.getElementById('create1').innerText="Cats are Very Human friendly cuties . They just lit up humans behaviour just by staying in their life.There are in total 71 breeds of cats.TICA's Himalayan is considered a colorpoint variety of the Persian by the CFA, while the Javanese (or Colorpoint Longhair) is a color variation of the Balinese in both the TICA and the CFA; both breeds are merged (along with the Colorpoint Shorthair) into a single mega-breed, the Colourpoint, by the World Cat Federation (WCF). ";
   
}
//let counter1=0;
function count1(){
    let counter1=localStorage.getItem('counter1');
    counter1++;
    console.log(counter1);
    alert("You have liked a Dog image");
    document.getElementById('count1').innerHTML=counter1;
    localStorage.setItem('counter',counter1);
}
//let index1=0;
//let imgarray1=['dog2.jpeg','dog3.jpeg','dog4.jpeg','dog5.jpeg','dog6.jpeg'];

function image2(){
    if(index1<imgarray1.length){
    document.querySelector('#image1').src=imgarray1[index1];
    index1++;
    console.log("changed");
}
    else{
        index1=0;
        console.log("not changed");
    }
}
function create1(){
    
    document.getElementById('createnew').innerText="Dogs are Very Human friendly cuties .Among the recognised dog breeds, the top 20 most friendly ones are: Golden Retrievers, Boston Terriers, Labrador Retrievers, Poodles, Border Collie, Beagle, Irish Setter, Staffordshire Bull Terrier, Cavalier King Charles Spaniel, Cockapoo, Boxer, Shih Tzu, French Bulldog, Basset Hound, Cocker Spaniel, Greyhound, Great Dane, Samoyed, West Highland Terriers, and Pembroke Welsh Corgi. ";
    
 }

