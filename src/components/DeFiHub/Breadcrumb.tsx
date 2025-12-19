import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb component for navigation
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-bodyTextDim mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <Icon icon="mdi:chevron-right" width={16} className="text-bodyTextDim" />
          )}
          {item.path && index < items.length - 1 ? (
            <Link
              to={item.path}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? "text-bodyText" : ""}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};


