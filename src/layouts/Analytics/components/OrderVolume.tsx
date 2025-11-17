import KiachowOrderVolume from "./KiachowOrderVolume";

export const OrderVolume = () => {

    return (
    <div className="flex w-full flex-col">
        <div className="flex w-full gap-4 justify-between items-center">
            <p className="font-bold">Order Volume</p>
            <p className="font-bold text-primary cursor-pointer">View Details</p>
        </div>
        {/* Order Volume */}
        <div>
            <KiachowOrderVolume/>
        </div>
    </div>
  );
}
