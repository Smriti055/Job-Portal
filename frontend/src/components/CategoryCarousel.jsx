import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Machine Learning",
  "Graphic Designer",
];

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browser");
  };

  return (
    <div className="w-full flex flex-col items-center py-12 bg-gradient-to-b from-gray-100 to-white">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Explore Job Categories
      </h2>

      {/* Carousel */}
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent className="flex justify-center gap-2">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/3">
              <Button
                onClick={() => searchJobHandler(cat)}
                className="rounded-full py-3 px-6 text-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 shadow-lg"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
