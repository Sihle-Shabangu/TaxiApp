/* eslint-disable react-hooks/exhaustive-deps */
import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Home() {
    const {
        address,
        getUserAddress,
        sendCUSD,
        mintMinipayNFT,
        getNFTs,
        signTransaction,
    } = useWeb3();
    const [cUSDLoading, setCUSDLoading] = useState(false);
    const [signingLoading, setSigningLoading] = useState(false);
    const [userOwnedNFTs, setUserOwnedNFTs] = useState<string[]>([]);
    const [tx, setTx] = useState<any>(undefined);
    const router = useRouter();

    useEffect(() => {
        getUserAddress();
    }, []);

    useEffect(() => {
        const getData = async () => {
            const tokenURIs = await getNFTs();
            setUserOwnedNFTs(tokenURIs);
        };
        if (address) {
            getData();
        }
    }, [address]);

    async function scanToPay() {
    //    logic for openning qr code scanner
    router.push(`/scanToPay`);
    }

    async function signMessage() {
        setCUSDLoading(true);
        try {
            await signTransaction();
        } catch (error) {
            console.log(error);
        } finally {
            setCUSDLoading(false);
        }
    }

    async function topUp() {
        // logic for opennig top ip page
        router.push(`/topUpTrips`);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            
           <div className="h1">Title of the App</div>
           <div className="w-full px-3 mt-7">
                <PrimaryButton
                    loading={signingLoading}
                    onClick={scanToPay}
                    title="Scan QR Code"
                    // widthFull
                />
            </div>
           {/* <div className="h1">Top Up </div> */}
           <div className="w-full px-3 mt-7">
                        <PrimaryButton
                            loading={signingLoading}
                            onClick={topUp}
                            title="Top Up Trips"
                            widthFull
                        />
                    </div>
           {/* <div className="h1">Login / Signup page</div> */}
           {/* login /sign  */}
        </div>
    );
}
