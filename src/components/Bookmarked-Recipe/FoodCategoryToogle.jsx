import vage from "../../assets/svg/vage.svg";
import nonVage from "../../assets/svg/nonVage.svg";
import { useFilter } from "../../context/FilterContext";

const FoodCategoryToggle = () => {
  const { isVeg, isNonVeg, toggleVeg, toggleNonVeg } = useFilter();

  return (
    <div className="toggleButton flex items-center sm:gap-4 gap-2 justify-center w-fit">
      <div onClick={toggleVeg} className="veg cursor-pointer">
        <div className="toggle h-9 w-16 relative flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-[#1e1f22]">
          <div
            className={`h-3 w-11 rounded-full transition-colors duration-300 ${
              isVeg ? "bg-[#1ba672]" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <img
              src={vage}
              alt="veg"
              className={`h-5 absolute top-[0.45rem] transition-transform duration-300 ${
                isVeg ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      <div onClick={toggleNonVeg} className="nonVeg cursor-pointer">
        <div className="toggle h-9 w-16 relative flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-[#1e1f22]">
          <div
            className={`h-3 w-11 rounded-full transition-colors duration-300 ${
              isNonVeg ? "bg-[#e53554]" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <img
              src={nonVage}
              alt="non-veg"
              className={`h-5 absolute top-[0.45rem] transition-transform duration-300 ${
                isNonVeg ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCategoryToggle;
