import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
export function CardsBottom() {
  return (
    <div className="flex flex-wrap w-full justify-center">
        <div className="pd-5">
            <Card className="w-full bg-[#FFF5EE]">
            <CardHeader >
                
            </CardHeader>
            <CardContent>
                
            </CardContent>
            <CardFooter className="flex justify-between">
                
            </CardFooter>
            </Card>
        </div>

        <div className=" pd-5">
            <Card className="w-full">
            <CardHeader >
                
            </CardHeader>
            <CardContent>
                
            </CardContent>
            <CardFooter className="flex justify-between">
                
            </CardFooter>
            </Card>
        </div>

    </div>

    
)
}