import PrimaryButton from "@/components/Button";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


export default function Home() {
    const [signingLoading] = useState(false);
    const router = useRouter();

    async function tripInfo() {
        //    logic for trip info page
        router.push(`/tripInfo`);
        }


    return(
        <div className="flex flex-col justify-center items-center">
           <div className="h1">Scan to pay page</div>
           <div className="w-full px-3 mt-7">
                <PrimaryButton
                    loading={signingLoading}
                    onClick={tripInfo}
                    title="Let's Assume you successfuly scanned the qr code"
                />
            </div>
        </div>
    );
}