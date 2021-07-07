// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract button {
    uint256 public buttonCount = 0;
    address public addr;
    uint256 public contractBalance;
    bool public finish = false;
    
    uint256 public openingTime = 0;
    address payable wallet;
    
    event Received(address,uint);
    receive() external payable {}
    
    function addButton()
    public
    payable
    returns(address)
    {
        // Contract Balance
        if ((openingTime >= block.timestamp) || (openingTime == 0)) {
            openingTime = block.timestamp + 10;
            buttonCount += 1;
            addr = msg.sender;
            return (addr);
        }
        else{
            finish = true;
            contractBalance = address(this).balance;
            payable(addr).transfer(contractBalance);
            return (addr);
        }
    }
    
    function resetContract()
    public
    {
        finish = false;
        openingTime = 0;
    }
}