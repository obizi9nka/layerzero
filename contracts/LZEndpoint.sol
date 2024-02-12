// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@layerzerolabs/lz-evm-protocol-v2/contracts/EndpointV2.sol";

contract LZEndpoint is EndpointV2 {
    constructor(uint32 eid) EndpointV2(eid, msg.sender){    }
}