import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

export const StatsGridData = [
    {
        statsImage: <IoBagHandle className="text-white text-2xl"/>,
        statsImageBackColor: "bg-sky-500",
        statsName: "Total Sales",
        statsValueDollar: "$74598",
        statsValue: "+651",
        statsValuecolor: "text-green-500"
    },
    {
        statsImage: <IoPieChart className="text-white text-2xl" />,
        statsImageBackColor: "bg-orange-600",
        statsName: "Total Expenses",
        statsValueDollar: "$4859",
        statsValue: "-375",
        statsValuecolor: "text-green-500"
    },
    {
        statsImage: <IoPeople className="text-white text-2xl" />,
        statsImageBackColor: "bg-yellow-400",
        statsName: "Total Customers",
        statsValueDollar: "$95456",
        statsValue: "-45",
        statsValuecolor: "text-red-500",
    },
    {
        statsImage: <IoCart className="text-white text-2xl" />,
        statsImageBackColor: "bg-green-600",
        statsName: "Total Orders",
        statsValueDollar: "$2965",
        statsValue: "-86",
        statsValuecolor: "text-red-500",
    },
]
