import { getPlaceholderImage } from '@/utils/image'
import { CTAButton } from "@/components/cta-button";
import Image from "next/image";

interface MealGridProps {
  meals: {
    id: string;
    image: string;
    title: string;
    summary: string;
    creator: string;
  }[];
  className?: string;
}

export default async function MealGrid({ meals, className }: MealGridProps) {
  const mealsWithPlaceholders = await Promise.all(
    meals.map(async (meal) => {
      const placeholder = await getPlaceholderImage(meal.image)
      return {
        ...meal,
        placeholder
      };
    }),
  )

  return (
    <div className={`mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-8 ${className}`}>
      {mealsWithPlaceholders.map((meal) => {
        return (
          <div
            key={meal.id}
            className="flex h-full flex-col rounded-lg bg-gradient-to-tr from-red-950 to-red-900 shadow-lg"
          >
            <div className="h-1/2">
              <Image
                src={meal?.image}
                alt={meal?.title}
                fill
                blurDataURL={meal.placeholder}
                placeholder="blur"
                className="!relative w-full h-full rounded-t-lg object-cover"
              />
            </div>
            <div className="flex h-full flex-col justify-between gap-6 rounded-b-lg bg-black bg-opacity-70 px-6 pb-6 pt-4 backdrop-blur-xl">
              <h1 className="text-2xl font-bold">{meal.title}</h1>
              <p className="-mt-4 text-gray-300">by {meal.creator}</p>
              <p className="hyphens-auto text-xl font-light text-gray-300">
                {meal?.summary}
              </p>
              <CTAButton
                className="ml-auto scale-90 text-center text-lg"
                href={`/meals/${meal.id}`}
              >
                View Details
              </CTAButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}
