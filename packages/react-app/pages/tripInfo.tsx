import PrimaryButton from "@/components/Button";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';



export default function Home() {

    const [signingLoading] = useState(false);
    const router = useRouter();

    async function confirmTripInfo() {
        //    logic for confirmation of trip info, ideally a pop up window with the info and a button to continue to pay
        router.push(`/tripInfo`);
        }
    return(
        <div className="flex flex-col justify-center items-center">
            <div className="h1">Map data (Where I am)</div>
            <div className="h1">Route Details</div>
            <div className="h1">Fare</div>
            <div className="h1">No. of Seats</div>
            <div className="h1">Taxi ID</div>    

            <div className="w-full px-3 mt-7">
                <PrimaryButton
                    loading={signingLoading}
                    onClick={confirmTripInfo}
                    title="Continue to pay"
                />
            </div>
        </div>
    );
}