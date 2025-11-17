import { Icon } from "@iconify/react";

type ButtonProps = {
    title: string;
    className?: string;
    secondary?: boolean;
    icon?: string
    rounded?: boolean
};
export const Button = ({title, rounded, className, icon, secondary}:ButtonProps) => {
   return (
    <div
      className={`cursor-pointer ${
        secondary ? 'text-black bg-white' : 'text-black bg-primary'
      } ${rounded ? 'rounded-full' : 'rounded-md'} flex justify-center items-center gap-2 text-xs sm:text-sm ${className} p-2`}
    >
      {icon && <Icon icon={icon} width={20} className=" cursor-pointer"/>}
      <p className={`text-xs sm:text-lg sm:block`}>{title}</p>
    </div>
  );
}
