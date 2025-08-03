// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Chat {
    struct Message {
        string id;
        string text;
        string date;
    }

    address internal owner;
    Message[] public message;

    constructor(){
      owner = msg.sender;
    }

    function sendMessage(string calldata id, string calldata text, string calldata date) public {
      message.push(Message(id, text, date));
    }

    function getMessages() public view returns (Message[] memory) {
        return message;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
