import { task } from "hardhat/config"


task("peer", "wire up contracts on different chain", require("./setPeer"))
    .addParam(
        "remote" // network name witch we want to wire up
    )

task("send", "send oft", require("./send"))
    .addParam(
        "value" // token vakue
    )
    .addParam(
        "to" // network name witch we want to wire up
    )
    .addParam(
        "dst" //
    )

task("balance", "get  balaance", require("./balance"))
    .addParam(
        "address"
    )