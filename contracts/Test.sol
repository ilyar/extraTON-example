pragma solidity >=0.6.0;
pragma AbiHeader expire;

contract Test {
    function result(uint i) public pure returns (uint) {
        if (i == 0) {
            return 1;
        }

        return i * result(i - 1);
    }
}
