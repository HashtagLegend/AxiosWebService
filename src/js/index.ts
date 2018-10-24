import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index";

interface ICustomer{
  firstName: string;
  lastName: string;
  year: number;
}

const uri: string = "https://restcustomers3rvice.azurewebsites.net/api/customer/";

let outputElement: HTMLParagraphElement = document.getElementById("outputField") as HTMLParagraphElement
let custByIdField: HTMLParagraphElement = document.getElementById("custByIdField") as HTMLParagraphElement

let getButton: HTMLButtonElement = document.getElementById("get") as HTMLButtonElement
getButton.addEventListener("click", getCustomers)

let getCustByIdButton: HTMLButtonElement = document.getElementById("getCustomerById") as HTMLButtonElement
getCustByIdButton.addEventListener("click", getCustomerById)

let createCustomerButton: HTMLButtonElement = document.getElementById("createCustomer") as HTMLButtonElement
createCustomerButton.addEventListener("click", createCustomer)

let deleteCustomerButton: HTMLButtonElement = document.getElementById("deleteCustomer") as HTMLButtonElement
deleteCustomerButton.addEventListener("click", deleteCustomer)

/*
function get()
{
  let uri: string = "https://restcustomers3rvice.azurewebsites.net/api/customer"
  axios.get(uri)
    .then(function (AxiosResponse)
    {
      console.log(AxiosResponse)
    });  
}
*/

function getCustomers(): void {
 
  axios.get<ICustomer[]>(uri)

      .then(function (response: AxiosResponse<ICustomer[]>): void {

        let result: string = "<ul>";

          response.data.forEach((c: ICustomer) => {            
             result += "<li>" + c.firstName + " " + c.lastName + "</li>";             
          });

          result += "</ul>";
          outputElement.innerHTML = result;
      })
    }


function getCustomerById(): void {
    let customerId: HTMLInputElement = document.getElementById("kundeId") as HTMLInputElement
    let newUri = uri + customerId.value

    axios.get<ICustomer>(newUri)
       .then(function(response){
        custByIdField.innerHTML = response.data.firstName + " " + response.data.lastName
      })

}

function createCustomer(): void {

let myFirstNameElm: HTMLInputElement = document.getElementById("firstName") as HTMLInputElement
let myLastNameElm: HTMLInputElement = document.getElementById("lastName") as HTMLInputElement
let myYearElm: HTMLInputElement = document.getElementById("year") as HTMLInputElement
let statusBar: HTMLParagraphElement = document.getElementById("statusBar") as HTMLParagraphElement

let myFirstName: string = myFirstNameElm.value
let myLastName: string = myLastNameElm.value
let myYear: number = +myYearElm.value



axios.post<ICustomer>(uri, {firstName: myFirstName, lastName: myLastName, year: myYear})
    .then((response: AxiosResponse) => {console.log(response.status + " " + response.statusText)})
  

  .catch(function(error: AxiosError):void {
      statusBar.innerHTML = error.message
  })
  
  


}
function deleteCustomer(): void {
    let custId: HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement
    let newUri = uri + custId.value
    axios.delete(newUri)
    .then((response: AxiosResponse) => {console.log(response.status + "customer deleted")})
}