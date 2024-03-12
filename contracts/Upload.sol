//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
contract Upload {
    struct Access {
        address user;
        bool access;
    }
    // for displaying list of users having access to the _user's drive
    mapping(address => Access[]) accessList;

    // Urls of images stored by _user
    mapping(address => string[]) imageUrls;

    // ownership[user1][user2] = true -> user1 has given access to user2
    mapping(address => mapping(address => bool)) ownership;

    // for caching purposes
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, string memory url) public {
        imageUrls[_user].push(url);
    }
    function allow(address _user) public {
        ownership[msg.sender][_user] = true;
        if (previousData[msg.sender][_user] = false) {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        } else {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    if (accessList[msg.sender][i].access = false)
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
    function display(address _user) public view returns(string[]  memory){
        require(_user == msg.sender || ownership[msg.sender][_user] == true, "You don't have access");
        return imageUrls[_user];
    }

    function shareAccessList() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}
