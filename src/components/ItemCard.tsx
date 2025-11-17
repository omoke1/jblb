import { Icon } from "@iconify/react";
import { Button } from "./Button";

type ItemCardProps = {
    img: string;
    bestSeller?: boolean;
    active?: boolean;
    itemName: string;
    amount: string;
    description: string;
    rating: number;
    reviews: number;
    orders: number;
};
export const ItemCard = ({
    img,
    bestSeller,
    active,
    itemName,
    amount,
    description,
    rating,
    reviews,
    orders
}:ItemCardProps) => {
   return (
    <div className={`cursor-pointer shadow-md  flex flex-col   min-w-[200px] max-w-[45vw] sm:max-w-[280px] bg-white w-fit text-bodyText rounded-md`}>
        <div
            className="w-full h-64 rounded-md bg-cover bg-center flex justify-between items-start p-2"
            style={{ backgroundImage: `url(${img})` }}
        >
            {bestSeller && 
                <div className="flex p-1 bg-[#EAB308] items-center rounded-4xl w-fit">
                    <Icon icon="mdi:crown" width={20} color="white" />
                    <p className="text-white text-xs sm:text-sm">Best Seller</p>
                </div>
            }
            {active && 
                <div className="flex p-1 bg-[#22C55E] rounded-4xl w-fit">
                    <p className="text-white text-xs sm:text-sm">Active</p>
                </div>
            }
        </div>
        <div className="flex flex-col gap-2 p-4">
            <div className="flex justify-between w-full font-bold text-sm sm:text-lg text-primary">
                <p className="text-black">{itemName}</p>
                <p>${amount}</p>
            </div>
            <p className="text-bodyText text-xs sm:text-sm">{description}</p>
            <div className="text-xs sm:text-sm font-bold text-bodyText flex justify-between gap-4 items-center">
                <div className="flex items-center justify-start text-xs sm:text-sm">
                    <Icon icon="material-symbols:star-rounded" width={28} color="#EAB308"/>
                    <p className="text-[#EAB308]">{rating}({reviews} reviews)</p>
                </div>
                <p >{orders} orders</p>
            </div>
            <div className="flex justify-between">
                <Button title="Edit" icon="tabler:edit" className="w-[55%]"/>
                <Icon icon="mdi:eye" width={36} color="#4B5563" className="bg-bgColor p-2 rounded-md"/>
                <Icon icon="iwwa:option" width={36} color="#4B5563" className="bg-bgColor p-2 rounded-md"/>
            </div>
        </div>
    </div>
  );
}
