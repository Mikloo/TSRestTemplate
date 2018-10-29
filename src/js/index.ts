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

function showAllCustomers():void {

    axios.get<ICustomer[]>(uri)
    .then(function (response:AxiosResponse<ICustomer[]>):void{

        let result : string = "<ol>";
        response.data.forEach((customer : ICustomer) => {
            if(customer == null)
              {
                result += "<li> NULL element</li>"        
              }
            else
              {
                result += "<li> <b>id</b>: "+ customer.id + " <i>navn</i> :" + customer.firstName + " " +customer.lastName + " " +customer.year +"</li>"        

              }
            });

        result += "</ol>";

        divElement.innerHTML = result;

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
 
    let addModelelement: HTMLInputElement = <HTMLInputElement>document.getElementById("AddFirstName");
    let addVendorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("AddLastName");
    let addPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("AddYear");
    
    let myFirstName: string = addModelelement.value;
    let myLastName:string = addVendorElement.value;
    let myYear : number = +addPriceElement.value;

    axios.post<ICustomer>(uri,{FirstName:myFirstName,LastName:myLastName, Year:myYear})
    .then((response:AxiosResponse) => {console.log("response " +response.status + " " +response.statusText )})
    .catch((error:AxiosError) => {console.log(error);} )
    //.then( ()=> {co.innerHTML='<h2> er i finally </h2>'})
}


function deleteCustomer<ICar>():void{
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let addModelelement: HTMLInputElement = <HTMLInputElement>document.getElementById("AddId");
    let myId: string = addModelelement.value;

    axios.delete(uri)
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

