import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { Separator } from "../ui/separator";

interface props {
  children: ReactNode;
  title: string;
}

export default function ChartCard({ children, title }: props) {
  return (
    <Card className="flex flex-col border-none shadow-none sm:w-full md:w-[45%] lg:w-[32%] aspect-video dark:bg-navy  dark:text-white bg-white rounded-lg">
      <CardHeader className="bg-transparent font-bold text-darkGray dark:text-white  dark:bg-navy rounded-xl p-4">
        {title}
        <Separator className="mt-4" />
      </CardHeader>
      <CardContent className="flex-1 py-4 content-center text-black dark:text-white">
        {children}
      </CardContent>
    </Card>
  );
}
