import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

//http://rest-pele-easj-dk.azurewebsites.net/api/Cars

interface ICustomer {
    id:number
    firstName:string;
    lastName:string;
    year:number;
}

const  uri:string = "https://restcustomerservicecore20181028075543.azurewebsites.net/api/customer/";

let divElement : HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let buttonelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");  
buttonelement.addEventListener('click',showAllCustomers);

let buttonOneelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneButton");  
buttonOneelement.addEventListener('click',showOneCustomer);


let buttonAdd : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
buttonAdd.addEventListener('click',addCustomer);

let buttonDelete:HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
buttonDelete.addEventListener('click',deleteCustomer);

  //funktion som returnerer et HTMLLIELEMENT og som tager tre parametre
    //
function CreateLiElement(tekst:string, classAttribut:string, id: number) : HTMLLIElement{
    
    let newLiElement = document.createElement('li');
    let newText = document.createTextNode(tekst)
    
    newLiElement.setAttribute('class',classAttribut);
    newLiElement.setAttribute('id',id.toString());
    
    newLiElement.appendChild(newText);

    return newLiElement;
}

function showAllCustomers():void {

    axios.get<ICustomer[]>(uri)
    .then(function (response:AxiosResponse<ICustomer[]>):void{

        let olElement : HTMLOListElement = document.createElement('ol');

        // let result : string = "<ol>";
        let x:number = 0;
        response.data.forEach((customer : ICustomer) => {
            x++;
            if(customer == null)
              {
                  olElement.appendChild(CreateLiElement("NULL element","error",x));
                // result += "<li> NULL element</li>"        
              }
            else
              {
                let tekst : string =  "id(i database):"+customer.id+" Navn :" + customer.firstName + " " +customer.lastName + " " +customer.year;
                // result += "<li> <b>id</b>: "+ customer.id + " <i>navn</i> :" + customer.firstName + " " +customer.lastName + " " +customer.year +"</li>"        
                olElement.appendChild(CreateLiElement(tekst,"r1",customer.id));

              }
            });

        // result += "</ol>";

        // divElement.innerHTML = result;

        //hvis divElement allerede har et child skal det først slettes førend 
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

function showOneCustomer():void {

    let showOneCustomer1 : HTMLInputElement = <HTMLInputElement> document.getElementById("getOneCustomer");
    let oneCustomerValue : string = showOneCustomer1.value;
    let newUri = uri + showOneCustomer1.value;

    

    axios.get<ICustomer>(newUri)
    .then(function (response:AxiosResponse<ICustomer>):void{


        let customer : ICustomer = <ICustomer>response.data;
        let result : string = "<ol>";

        if (response.data == null)
        {
            result += "<li> NULL element</li>"
        }

        else;
        { 
            result += "<li> <b>id</b>: "+ customer.id + " <i>navn</i> :" + customer.firstName + " " +customer.lastName + " " +customer.year +"</li>"        
        }

       

        result += "</ol>";

        divElement.innerHTML = result;

    }
    )
    .catch(function (error:AxiosError):void{
            divElement.innerHTML= error.message;        
    })
}

function addCustomer():void{
 
    let addfirstnameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addFirstName");
    let addlastnameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addLastName");
    let addyearElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addYear");
    
    let myFirstName: string = addfirstnameElement.value;
    let myLastName:string = addlastnameElement.value;
    let myYear : number = +addyearElement.value;

    axios.post<ICustomer>(uri,{FirstName:myFirstName,LastName:myLastName, Year:myYear})
    .then((response:AxiosResponse) => {console.log("response " +response.status + " " +response.statusText )})
    .catch((error:AxiosError) => {console.log(error);} )
    //.then( ()=> {co.innerHTML='<h2> er i finally </h2>'})
}


function deleteCustomer<ICustomer>():void{
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

