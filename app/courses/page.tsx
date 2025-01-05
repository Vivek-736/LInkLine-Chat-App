import React from 'react';

const CoursesPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Courses Page</h1>
            <p className="text-lg text-gray-600 mb-2">
                This is the Courses page where course groups will be displayed in the future.
            </p>
            <p className="text-lg text-gray-600">
                Currently, this page is under development. Stay tuned for updates!
            </p>
        </div>
    );
};

export default CoursesPage;