import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {

        await Moralis.start({
            apiKey: "J2PssSLgubh4ainuAWiwR0KFw1U4sERe1sp3XsLVD0oXRJq3dOJL3LeRe5GuTycT",
            
        });

        const address = '0x758ED5580B5Abad3cb71B5B597E58aaEF8f62788';

        const chain = EvmChain.ETHEREUM;

        const response = await Moralis.EvmApi.balance.getNativeBalance({
            address,
            chain,
        });
        
        res.status(200).send({ Collection:response});
        // console.log(response.toJSON());

    }
    else{
        res.status(200).json({ message: "NOT GET METHOD" })
    }
}


