import { Icon } from "@iconify/react";

type ButtonProps = {
    title: string;
    className?: string;
    icon?: string
};
export const Button = ({title, className, icon}:ButtonProps) => {
   return (
    <div
      className={`h-fit cursor-pointer border-[0.5px] hover:bg-primary/10 border-primary/10 flex justify-center items-center gap-2 text-xs sm:text-sm ${className}  p-6`}
    >
      {icon && <Icon icon={icon} width={20} className=" cursor-pointer"/>}
      <p className={` text-xs xl:text-lg sm:block`}>{title}</p>
    </div>
  );
}
