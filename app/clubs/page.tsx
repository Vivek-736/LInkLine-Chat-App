"use client";
import { useRouter } from 'next/navigation';

const ClubsPage: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/users');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button 
                onClick={handleBackClick} 
                className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Back
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Clubs Page</h1>
            <p className="text-lg text-gray-600 mb-2">
                This is the Clubs page where club groups will be displayed in the future.
            </p>
            <p className="text-lg text-gray-600 mb-2">
                Currently, this page is under development.
            </p>
            <p className="text-2xl text-green-600">
                Stay tuned for updates!
            </p>
        </div>
    );
};

export default ClubsPage;
