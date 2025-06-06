import { useApi } from "../../context/apiContext";
import { MdShare } from "react-icons/md";
import { CgTimelapse } from "react-icons/cg";
import vage from "../../assets/svg/vage.svg";
import nonVage from "../../assets/svg/nonVage.svg";
import ImageWithFallback from "../New-Arrival-Recipes/ImageWithFallback";
import RatingBadge from "../New-Arrival-Recipes/RatingBadge";
import CategoryTag from "../New-Arrival-Recipes/CategoryTag";
import { motion } from "framer-motion";
import formatTime from "../Utils/formatedTime";
import { Link, useParams } from "react-router";
import { useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";

const UplodedRecipes = () => {
  const { userId } = useParams();
  const { bookMarked, toggleBookmark } = useContext(BookmarkContext);
  const {
    detailRecipeData,
    detailRecipeDataLoading,
    recipeSliderData,
    sliderDataLoading,
  } = useApi();
  if (detailRecipeDataLoading || sliderDataLoading) {
    return (
      <ul className="grid grid-cols-2 2xl:grid-cols-4 gap-2 lg:grid-cols-3 w-full">
        {[...Array(4)].map((_, index) => {
          return (
            <li
              key={index}
              className="h-full p-4 rounded-md md:rounded-2xl w-full dark:bg-[#1a1a1a] flex flex-col bg-[#f0f3f5]"
            >
              <figure className="rounded-md h-[20vh] w-full bg-[#d8dee2] dark:bg-[#3a3f44] animate-shimmer"></figure>
              <div className="reicpeInfo mt-2 w-full flex flex-col">
                <div className="recipeName flex items-center justify-between">
                  <p className="w-[60%] rounded-sm h-5 bg-[#d8dee2] dark:bg-[#3a3f44] animate-shimmer"></p>
                  <p className="w-[15%] rounded-sm h-5 bg-[#d8dee2] dark:bg-[#3a3f44] animate-shimmer"></p>
                </div>
                <div className="categoryName w-[30%] mt-2 rounded-full h-5 bg-[#d8dee2] dark:bg-[#3a3f44] animate-shimmer"></div>
                <div className="actionButton flex mt-3 items-center justify-between">
                  <p className="w-[25%] rounded-full h-5 bg-[#d8dee2] dark:bg-[#3a3f44] animate-shimmer"></p>
                  <p className="w-[20%] rounded-sm h-5 bg-[#d8dee2] dark:bg-[#3a3f44] animate-shimmer"></p>
                </div>
                <div className="fullRecipe mt-2 rounded-md w-full h-8 bg-[#d8dee2] dark:bg-[#3a3f44] animate-shimmer"></div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  const uploadedRecipes = detailRecipeData.filter(
    (recipe) => recipe.user === userId
  );

  const uploadedRecipeIds = uploadedRecipes.map((recipe) => recipe._id);

  const fullRecipeDetails = recipeSliderData.filter((recipe) =>
    uploadedRecipeIds.includes(recipe.full_recipe)
  );

  return (
    <ul className="grid grid-cols-2 2xl:grid-cols-4 gap-2 lg:grid-cols-3">
      {fullRecipeDetails.map((item, index) => {
        return (
          <motion.li
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={index}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="recipeCard group cursor-pointer inline-block h-auto overflow-hidden "
          >
            <article className="p-2 select-none bg-[#f0f3f5] rounded-md md:rounded-2xl border w-full border-theme-light dark:border-2 dark:bg-[#1e1e1e] dark:border-[#2d2d2d]">
              <figure className="relative rounded-md overflow-hidden w-full h-full md:rounded-xl">
                <div className="acatios w-full h-fit top-2 z-10 px-2 absolute flex items-center justify-between">
                  <div className="veg w-fit flex items-center justify-center">
                    <span>
                      <img
                        src={item.Isvage ? vage : nonVage}
                        alt="vegIcon"
                        className="h-6 w-6 group-hover:scale-110"
                      />
                    </span>
                  </div>
                  <div className="bookMark bg-black min-h-9 min-w-9 rounded-full flex items-center justify-center">
                    <span
                      onClick={() => {
                        toggleBookmark(item._id, item.name);
                      }}
                      className={`bookmark-icon p-1 flex items-center justify-center transition-transform duration-300 ${
                        bookMarked.includes(item._id) ? "bookmarked" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <defs>
                          <linearGradient
                            id="bookmark-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: "#e53935" }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#e35d5b" }}
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
                          fill={
                            bookMarked.includes(item._id)
                              ? "url(#bookmark-gradient)"
                              : "none"
                          }
                          stroke={
                            bookMarked.includes(item._id)
                              ? "url(#bookmark-gradient)"
                              : "#ffffff"
                          }
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <ImageWithFallback
                  src={`https://taste-bite-api.onrender.com/${item.Thumbnail_img}`}
                  alt="recipeImage"
                />
                <div className="linearGrident absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent"></div>
              </figure>
              <div className="recipeInformations py-1 flex flex-col gap-1 w-full h-fit">
                <div className="recipeNameAndRating flex items-center justify-between">
                  <h3 className="recipeName truncate w-[80%] font-semibold text-[1.1rem] 2xl:text-[1.5rem] md:text-xl xl:text-[1.35rem] dark:text-white">
                    {item.name}
                  </h3>
                  <RatingBadge rating={item.rating} />
                </div>
                <CategoryTag categoryData={item.categories} />
                <div className="line border-gray-400 dark:border-[#2d2d2d] dark:border-b-[0.125rem] h-1 w-full border-b-1 my-1 border-dashed"></div>
                <div className="shareAndCookTime flex items-center justify-between my-1">
                  <div
                    onClick={() => {
                      const fullURL = window.location.href;
                      navigator.clipboard.writeText(fullURL);
                      alert("Recipe link copied to clipboard!");
                    }}
                    className="ShareIcon cursor-pointer flex w-fit border-1 border-theme-light rounded-full px-1.5 items-center justify-center gap-1 bg-transperent-dark"
                  >
                    <span className="icon">
                      <MdShare className="text-theme-light 2xl:text-[1.1rem]" />
                    </span>
                    <span className="shareText xl:text-[1.01rem] 2xl:text-[1.1rem] text-theme-light">
                      Share
                    </span>
                  </div>
                  <div className="cookTime flex justify-center items-center gap-0.5">
                    <span className="timerIcon">
                      <CgTimelapse className="text-gray-500 dark:text-gray-400 text-[1rem] 2xl:text-[1.1rem]" />
                    </span>
                    <span className="time font-semibold text-gray-500 2xl:text-[1.1rem] xl:text-[1.01rem] dark:text-gray-400">
                      {formatTime(item.cookingTime)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to={`/Recipe/${item.categories}/${item._id}`}
                className="w-full"
              >
                <button className="viweFullRecipeButtom w-full transition-transform duration-300 shadow-md hover:cursor-pointer hover:scale-98 flex items-center justify-center rounded-md py-1 bg-[linear-gradient(to_right,#e53935,#e35d5b)] md:rounded-xl md:text-[1.2rem] 2xl:mt-1">
                  <p className="text-white font-semibold">View Full Recipe</p>
                </button>
              </Link>
            </article>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default UplodedRecipes;
