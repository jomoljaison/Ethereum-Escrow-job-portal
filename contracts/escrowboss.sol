// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.4.16 <0.9.0;

contract employeeprofile

 {

     struct details
     {
         string firstname;
         string lastname;
         string email;
        //  string designation;
         string ph;
         string country;
         address   employee;
         string designation;
         string password;

     }

    mapping(string => details) profile;
    mapping(address => bool) allowedEmployee;
    mapping(string => string) ipfsUrl;

    function setEmployee(string memory empid,string memory firstname,string memory lastname, string memory email,string memory ph,string memory country,address  employee,string memory designation,string memory password) public
    {
        profile[empid]=details(firstname,lastname,email,ph,country,employee,designation,password);
        allowedEmployee[employee]=true;
        
    }
   
    //  function whitelistAddress (address user) onlyArbiter public {
    //     allowedUsers[user]=true;
    // } 
      
    function setIfpsUrl(string memory empid, string memory _url) public {
        ipfsUrl[empid] = _url;
    }

    function getEmployee(string memory empid)public view returns(string memory firstname,string memory lastname, string memory email,string memory ph,string memory country,address employee,string memory _url)
    {
        return(profile[empid].firstname,profile[empid].lastname,profile[empid].email,profile[empid].ph,profile[empid].country,profile[empid].employee,ipfsUrl[empid]);
        
    }
 
 }

contract esrowboss is employeeprofile{

	// Declaring the state variables

	address payable public boss;
    address payable public employee;
	uint public price;
	address payable public arbiter;
	uint public invoiceCount = 0;
    
    mapping(address=>bool) allowedUsers;


   struct Invoice {
        address payable employee;

        string id;
        string companyname;
		string employeename;
		string invonumber;
		string work;
		string salary;
        address payable boss;
      
    }

 struct Job{
        string jobname;
        string location;
        string jtype;
        string jd;
        string abtcompany;
        address payable boss;
        
    }


 struct profiles{
        uint[] workList;
    }

	struct Work
    {
		string empid;
		string name;
		address payable employee;
        address payable boss;
	}
struct msgs
    {
    address payable boss;
    address payable employee;
    string position;    
    }
   
    mapping(string=>Work)public works;
    mapping(uint=>Invoice)public Invoices;

    mapping(string => string) workipfsUrl;
    mapping(uint => string) invoUrl;
    
    mapping(uint=>Job)public jobs;

    mapping(address=>Invoice)public AdrsInvoices;

    mapping(address =>msgs)message;
    mapping(address => string) adrsinvoUrl;
    mapping(address => string) resume;

	enum State
    {
		awate_payment, awate_delivery, complete
	}

	
	State public state;
	
	modifier instate(State expected_state){
		
		require(state == expected_state);
		_;
	}

modifier onlyArbiter(){
		require(msg.sender== arbiter);
		_;
	}


     modifier onlyBoss() {
        //How can i assign access to users address in the array listuser
        require(allowedUsers[msg.sender]);
        _;
    }

	modifier onlyEmployee(){
        require(allowedEmployee[msg.sender]);
		_;
	}
	
	// event gets(string name);
    event confirmpayment(address boss);

	constructor() public{
		
		arbiter = msg.sender;
		// boss = _boss;
		// employee = _employee;
		state = State.awate_payment;
	}
	                   
    function addjob(uint jobid,string memory jobname,string memory location,string memory jtype, string memory jd,string memory abtcompany,address payable boss) public
    {
              jobs[jobid]=Job(jobname,location,jtype,jd,abtcompany,boss);
    }
	

/////////////////message between employee and boss///////////////////////

    function sendmsgtoboss(address payable boss,address payable employee,string memory position,string memory uploadFile) public{
    message[boss].boss = boss;
    message[boss].employee = employee;
    message[boss].position = position;

    resume[boss]=uploadFile;
    }


    function getmsgbyboss(address boss) public view returns(address payable employee,string memory uploadFile){
    return(message[boss].employee,resume[boss]);
    }

/////////////////////////////////////////////////////////////////////
	  
      
     function whitelistAddress (address user) onlyArbiter public {
        allowedUsers[user]=true;
    } 
            
      
        function createInvoiceToempAddress(address payable employee,string memory id, string memory companyname,string memory employeename,string memory invonumber,string memory work,string memory salary,string memory uploadFile)
		 public  onlyBoss returns(bool)
	{

         AdrsInvoices[employee].employee =employee;
         AdrsInvoices[employee].id =id;
         AdrsInvoices[employee].companyname = companyname;
         AdrsInvoices[employee].employeename = employeename;  
		 AdrsInvoices[employee].invonumber = invonumber;
         AdrsInvoices[employee].work = work;
         AdrsInvoices[employee].salary = salary;
        adrsinvoUrl[employee]=uploadFile; 
    
         AdrsInvoices[employee].boss = msg.sender;
         
        //  emit gets(companyname);
    }


	
     function viewDetailsbyemp(address payable employee) public view returns (string memory companyname,string memory employeename,string memory invonumber,string memory work,string memory salary){
        
        
        return(AdrsInvoices[employee].companyname,AdrsInvoices[employee].employeename,AdrsInvoices[employee].invonumber,AdrsInvoices[employee].work,AdrsInvoices[employee].salary);
    }
    

	  
// 	     function getInvoice(uint _id) public view returns (string memory uploadFile)
// 	{
// 		return(invoUrl[_id]);
       
//     }
    
	   
	   //sending work to boss
	    function creatework(string memory empid,string memory uploadFile) public onlyEmployee 
	{
     
        works[empid].empid = empid;
       
        workipfsUrl[empid]=uploadFile;

        works[empid].employee = msg.sender;
         
        //  emit gets(_name);
    }


     function getwork(string memory empid) public view returns (string memory uploadFile)
	{
		return(workipfsUrl[empid]);
       
    }

    
	function confirmPayment() onlyBoss external payable{

		state = State.awate_delivery;
		emit confirmpayment( boss);

	}  
	
	function confirmDelivery() onlyBoss external{
		employee.transfer(address(this).balance);
		state = State.complete;
		
	}
	
	function ReturnPayment() onlyEmployee instate(
	State.awate_delivery)public{
	boss.transfer(address(this).balance);
	}
	
}