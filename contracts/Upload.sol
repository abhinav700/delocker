//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
contract Upload {
    struct Access {
        address user;
        bool access;
    }
    struct File{
        string fileName;
        string hash;
        string fileType;
        string uploadDate;
    }
    // for displaying list of users having access to the _user's        drive
    mapping(address => Access[]) accessList;

    // Urls of images stored by _user
    mapping(address => File[]) fileData;

    // ownership[user1][user2] = true -> user1 has given access to user2
    mapping(address => mapping(address => bool)) ownership;

    // for caching purposes
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, File memory file) public {
        fileData[_user].push(file);
    }
    function deleteFile(string memory _hash)public { 
        
        for(uint i = 0; i < fileData[msg.sender].length; i++){
            File memory file = fileData[msg.sender][i];
            if(keccak256(abi.encodePacked(file.hash)) == keccak256(abi.encodePacked(_hash))){
              for(uint j = i; j < fileData[msg.sender].length-1; j++)
                fileData[msg.sender][j]  = fileData[msg.sender][j+1];
              fileData[msg.sender].pop();
            }
            
        }   
    }
    function shareAccess(address _user) public {
        ownership[msg.sender][_user] = true;
        if (previousData[msg.sender][_user] == false) {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        } else {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                        accessList[msg.sender][i].access = true;
                }
            }
        }
    }

    function disallow(address _user) public {
        ownership[msg.sender][_user] = false;
        if (previousData[msg.sender][_user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender][i].access = false;
                }
            }
        }
    }
    function display(address _user) public view returns(File[]  memory){
        require(_user == msg.sender || ownership[_user][msg.sender] == true, "You don't have access");
        return fileData[_user];
    }

    function shareAccessList() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}
