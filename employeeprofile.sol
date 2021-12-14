pragma solidity ^0.5.0;
 contract employeeprofile

 {

     struct details
     {
         string firstname;
         string lastname;
         string email;
         string designation;
         string ph;
         string country;
         address payable  employee;


     }

    mapping(string => details) profile;
    mapping(uint => string) ipfsUrl;

    function setEmployee(string memory empid,string memory firstname,string memory lastname, string memory email,string memory designation,string memory ph,string memory country,address payable employee) public
    {
        profile[empid]=details(firstname,lastname,email,designation,ph,country,employee);
        
    }

    function getEmployee(string memory empid)public view returns(string memory firstname,string memory lastname, string memory email,string memory designation,string memory ph,string memory country,address employee)
    {
        return(profile[empid].firstname,profile[empid].lastname,profile[empid].email,profile[empid].designation,profile[empid].ph,profile[empid].country,profile[empid].employee);
        
    }
    
    function setIfpsUrl(uint empid, string memory _url) public {
        ipfsUrl[empid] = _url;
    }

 }

