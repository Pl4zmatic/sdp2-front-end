import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface props {
  children: ReactNode,
  title: string,
}

export default function ChartCard({ children, title }: props) {
  return (
    <Card className="flex flex-col sm:w-full md:w-[45%] lg:w-[32%] aspect-video dark:bg-[var(--navy)] dark:text-white bg-white dark:border-[var(--navy)] shadow-xl rounded-lg">
      <CardHeader className="bg-bgGray text-darkGray dark:text-white font-semibold dark:bg-[var(--lightestNavy)] rounded-t-lg p-4">
        {title}
      </CardHeader>
      <CardContent className="flex-1 py-4 content-center text-black dark:text-white">
        {children}
      </CardContent>
    </Card>
  );
}
