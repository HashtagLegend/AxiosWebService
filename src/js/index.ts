import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

interface ICustomer{
  id: number;
  firstName: string;
  lastName: string;
  year: number;
}

let outputElement: HTMLParagraphElement = document.getElementById("outputField") as HTMLParagraphElement

let getButton: HTMLButtonElement = document.getElementById("get") as HTMLButtonElement
getButton.addEventListener("click", getCustomers)

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

  let uri: string = "https://restcustomers3rvice.azurewebsites.net/api/customer";

  axios.get<ICustomer[]>(uri)

      .then(function (response: AxiosResponse<ICustomer[]>): void {
          let result: string = "<ol>";

          response.data.forEach((c: ICustomer) => {

              result += "<li>" + c.firstName + " " + c.lastName + "</li>";

          });

          result += "</ol>";

          outputElement.innerHTML = result;

      })


