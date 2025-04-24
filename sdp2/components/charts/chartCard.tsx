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
    <Card className="flex flex-col sm:w-full md:w-[45%] lg:w-[25%] aspect-video bg-[var(--navy)] text-white border-[var(--navy)] shadow-xl rounded-lg">
      <CardHeader className="bg-[var(--lightestNavy)] rounded-t-lg p-4">
        {title}
      </CardHeader>
      <CardContent className="flex-1 py-4 content-center">
        {children}
      </CardContent>
    </Card>
  );
}
