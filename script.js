//1. fetch 20 random user on page load

//2. filter user by gender
//3. filter user by name
// alert("hi")


const apiUrl = "https://randomuser.me/api/?";
const listElm = document.querySelector("#user-list");
let usrArgs = [];
const counterElm = document.getElementById("user-count");

const displayUsers = users => {
    let str ="";
    

    users.map((user) => {
        str += 
        `
        <div class="col-md-6 col-lg-3 py-2">
            <div class="card fs-6 user-card h-100">
                    <img src="${user.picture.large}" class="card-img-top" alt="...">
                    
                    <h4 class="text-center mt-3" >${user.name.title} ${user.name.first} ${user.name.last}</h4>
                    <div class="card-body">
                        <div><span><i class="fa-solid fa-phone-volume"></i></span> ${user.cell} </div>
                        <div><span><i class="fa-solid fa-envelope"></i></span> ${user.email} </div>
                        <div><span><i class="fa-solid fa-location-pin"></i></span> ${user.location.city}, ${user.location.country}</div>
                    </div>
                    
                        
            </div>
        </div>
        
        `;
    });
    listElm.innerHTML = str;
    //document.getElementById("user-count").innerText = users.length; // will show the length of the items we found
    counterElm.innerText = users.length;
};


const fetchUser = ( params ="results=20" )=> {
    //fetch from api
    fetch(apiUrl + params)
    .then((response)=>response.json())
    .then((data) => {
    //console.log(data);
    // const users = data.results;
    usrArgs = data.results;
    displayUsers(usrArgs);
    })
    .catch((error) => console.log(error));
};
    
fetchUser();

// for dropdown menu change
const handleOnChange = e =>{
    console.log(e.value);
    const params = `results=20&gender=${e.value} `;
    fetchUser(params);

};

// when on key down
const handleOnSearch = event => {
    const str = event.value.toLowerCase();
    const filteredArgs = usrArgs.filter((item) => {
        const userFullName = (item.name.first + " " + item.name.last).toLowerCase();
        //console.log(item);
        if(userFullName.includes(str)){
            return item;

        }
        
    });
    displayUsers(filteredArgs);
    //console.log(event.value);
};




    
