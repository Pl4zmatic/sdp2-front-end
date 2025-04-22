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
  children: ReactNode;
}

export default function ChartCard({ children }: props) {
  return (
    <Card className="flex flex-col sm:w-full md:w-[45%] lg:w-[30%] bg-[var(--navy)] text-white border-[var(--lightestNavy)] shadow-xl rounded-b-lg">
      <CardHeader className="bg-[var(--lightestNavy)] rounded-t-lg p-4">
        Title
      </CardHeader>
      <CardContent className="flex-1 py-4 content-center">
        {children}
      </CardContent>
    </Card>
  );
}
