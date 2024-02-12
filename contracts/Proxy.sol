// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFTAdapter.sol";

interface IToken {
    function mint(address account, uint256 amount) external;
    function burn(address account, uint256 amount) external;
}

contract Proxy is OFTAdapter {
    constructor(address _token, address _lzEndpoint) OFTAdapter(_token, _lzEndpoint, msg.sender){}

    function _debit(
        uint256 _amountLD,
        uint256 _minAmountLD,
        uint32 _dstEid
    ) internal virtual override returns (uint256 amountSentLD, uint256 amountReceivedLD) {
        (amountSentLD, amountReceivedLD) = _debitView(_amountLD, _minAmountLD, _dstEid);

        IToken(address(innerToken)).burn(msg.sender, amountSentLD);
    }

    function _credit(
        address _to,
        uint256 _amountLD,
        uint32 /*_srcEid*/
    ) internal virtual override returns (uint256 amountReceivedLD) {
        IToken(address(innerToken)).mint(_to, _amountLD);

        return _amountLD;
    }
}