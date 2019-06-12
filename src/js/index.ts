import axios, {AxiosResponse,AxiosError} from "../../node_modules/axios/index";


interface IGeneric {
    id:number
    firstName:string;
    lastName:string;
}

const  uri:string = "https://restdatabasetemplate.azurewebsites.net/api/DBTemps/";

let divElement : HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let buttonelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");  
buttonelement.addEventListener('click',showAll);

let buttonOneelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneButton");  
buttonOneelement.addEventListener('click',showOne);


let buttonAdd : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
buttonAdd.addEventListener('click',add);

let buttonDelete:HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
buttonDelete.addEventListener('click', myDelete);

  //funktion som returnerer et HTMLLIELEMENT og som tager tre parametre
  //Skaber Li elementerne
function CreateLiElement(tekst:string, classAttribut:string, id: number) : HTMLLIElement{
    
    let newLiElement = document.createElement('li');
    let newText = document.createTextNode(tekst)
    
    newLiElement.setAttribute('class',classAttribut);
    newLiElement.setAttribute('id',id.toString());
    
    newLiElement.appendChild(newText);

    return newLiElement;
}

function showAll():void {
    // Get  typen IGeneric array
    axios.get<IGeneric[]>(uri)
    // Wrap icoin array indtil et reponse 
    .then(function (response:AxiosResponse<IGeneric[]>):void{

        // Skaber ol elemet
        let olElement : HTMLOListElement = document.createElement('ol');

        let x:number = 0;
        // Den tager AxiosResponse data ind i foreach
        response.data.forEach((customer : IGeneric) => {
            x++;
            if(customer == null)
              {
                  olElement.appendChild(CreateLiElement("NULL element","error",x));
              }
            else
              {
                //appendChild til Li tag
                let tekst : string =  "Id: "+customer.id+" Navn: " + customer.firstName + " " +customer.lastName;
                //Giver den class ri og en id="x"
                olElement.appendChild(CreateLiElement(tekst,"r1",customer.id));
              }
            });
        //nyt child indsættes
        if (divElement.firstChild)
          divElement.removeChild(divElement.firstElementChild);
        
        divElement.appendChild(olElement);
    }
    )
    .catch(function (error:AxiosError):void{
            divElement.innerHTML= error.message;        
    })
}

function showOne():void {

    let showOneCustomer1 : HTMLInputElement = <HTMLInputElement> document.getElementById("getOneCustomer");
    let oneCustomerValue : string = showOneCustomer1.value;
    let newUri = uri + showOneCustomer1.value;

    

    axios.get<IGeneric>(newUri)
    .then(function (response:AxiosResponse<IGeneric>):void{

        let customer : IGeneric = <IGeneric>response.data;
        let result : string = "<ol>";

        if (response.data == null)
        {
            result += "<li> NULL element</li>"
        }
        else;
        { 
            result += "<li> <b>Id</b>: "+ customer.id + " <b>Navn</b>: " + customer.firstName + " " +customer.lastName + "</li>"        
        }
        result += "</ol>";
        divElement.innerHTML = result;
    }
    )
    .catch(function (error:AxiosError):void{
            divElement.innerHTML= error.message;        
    })
}

function add():void{
 
    let addfirstnameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addFirstName");
    let addlastnameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addLastName");
    
    let myFirstName: string = addfirstnameElement.value;
    let myLastName:string = addlastnameElement.value;

    axios.post<IGeneric>(uri,{FirstName:myFirstName,LastName:myLastName})
    .then((response:AxiosResponse) => {console.log("response " +response.status + " " +response.statusText )})
    .catch((error:AxiosError) => {console.log(error);} )
    //.then( ()=> {co.innerHTML='<h2> er i finally </h2>'})
}

function myDelete<IGeneric>():void{
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let deleteCustomerElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteCustomer");
    let myId: string = deleteCustomerElement.value;

    let delUri :string = uri+myId;
    axios.delete(delUri)
    .then(
        (response: AxiosResponse)=>{
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        }
    )
    .catch(
        (error : AxiosError)=>{
            output.innerHTML = error.response.statusText;
        }

    )



}

