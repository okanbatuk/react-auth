# Auth react Project

Tutorial React project with identity authorization and verification. Also added user CRUD operations.

## Tools Used

* Routing and protection of routes => React-router-dom
* For client requests => Axios
* Authorization => Jsonwebtoken
* Manage session informations => React Context
* Save inputs => Localstorage
* Icons => fontawesome
* Other => Lodash
* API => [node-auth](https://github.com/okanbatuk/node-auth)


## Lessons Learned

* Effective use of useState
* Accessing DOM elements using useRef
* Perform various side effects on components using useEffect
* Performing routing operations with useNavigate and carrying info with state it contains
* Defining referral links with Link keyword
* Managing and protecting nested routes with Outlet keyword
* Adding useInput(custom hook) to save user inputs to localStorage
* UseContext to use user session information within the application
* Generating a Context Provider with createContext and using its contained values between pages
* Creating useFetch to perform API fetch operations
* Adding header information to requests using Axios interceptors
* In case of token expired error from API, regenerate token using Axios interceptors and perform request again

