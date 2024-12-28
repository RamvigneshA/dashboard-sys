import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const BatteryCard = ({ batteryData }) => (
  <Card className="flex flex-col dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className="dark:text-white">Battery Status</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col justify-center flex-grow">
      <CardTitle className="text-6xl">🔋</CardTitle>
      <div className="flex flex-col items-center flex-grow justify-center">
        <BatteryInfo 
          title="Battery Percentage ⚡️" 
          value={`${batteryData?.percentage}%`} 
        />
        <BatteryInfo 
          title="Battery Time Remaining" 
          value={batteryData?.isCharging ? "Charging" : `${batteryData?.timeRemaining} minutes`} 
        />
        <BatteryInfo 
          title="Battery is Charging" 
          value={`${batteryData?.isCharging}`} 
        />
      </div>
    </CardContent>
  </Card>
);

const BatteryInfo = ({ title, value }) => (
  <div className="flex flex-col items-center">
    <CardTitle className="dark:text-white">{title}</CardTitle>
    <CardDescription className="text-md font-bold dark:text-gray-300">
      {value}
    </CardDescription>
  </div>
); 
