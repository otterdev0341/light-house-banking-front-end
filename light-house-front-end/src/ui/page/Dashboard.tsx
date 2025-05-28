import { DisplayChart1 } from "../components/charts/chart1";
import { DisplayChart2 } from "../components/charts/chart2";
import { DisplayChart3 } from "../components/charts/chart3";
import { DisplayChart4 } from "../components/charts/chart4";
import { DisplayChart5 } from "../components/charts/chart5";
import { DisplayChart6 } from "../components/charts/chart6";
import { DisplayChart7 } from "../components/charts/chart7";
import { DisplayChart8 } from "../components/charts/chart8";
import { DisplayChart9 } from "../components/charts/chart9";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-5 px-4">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart1 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart2 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart3 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart4 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart5 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart6 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart7 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart8 />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 h-[500px]">
                    <DisplayChart9 />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;