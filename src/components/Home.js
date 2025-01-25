import React from 'react';
import styles from '../styles/Home.css'
import { Briefcase, Target, UserCheck, MessageSquare } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={`${styles.card} ${className}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`${styles.card} ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`${styles.card} ${className}`}>{children}</h3>
);

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 bg-blue-600 text-white rounded ${className}`} {...props}>
    {children}
  </button>
);

export default function FinMatchDescription() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">FinMatch</h1>
        <p className="text-lg text-gray-600">
          Revolutionizing the way you invest by seamlessly matching prospective investors with financial advisors using AI and machine learning.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader className="flex items-center justify-center">
            <Target className="text-blue-600 w-10 h-10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-semibold text-center mb-2">Intelligent Surveys</CardTitle>
            <p className="text-sm text-gray-600 text-center">
              AI-powered surveys capture your financial goals and preferences effortlessly.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader className="flex items-center justify-center">
            <Briefcase className="text-green-600 w-10 h-10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-semibold text-center mb-2">Smart Matching</CardTitle>
            <p className="text-sm text-gray-600 text-center">
              Our ML algorithms pair you with top advisors based on your unique portfolio needs.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader className="flex items-center justify-center">
            <UserCheck className="text-purple-600 w-10 h-10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-semibold text-center mb-2">Vetted Advisors</CardTitle>
            <p className="text-sm text-gray-600 text-center">
              Work with trusted advisors, reviewed and rated for their expertise.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader className="flex items-center justify-center">
            <MessageSquare className="text-yellow-600 w-10 h-10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-semibold text-center mb-2">Seamless Communication</CardTitle>
            <p className="text-sm text-gray-600 text-center">
              Connect with your advisor directly to discuss strategies and updates.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Take the Guesswork Out of Investing</h2>
        <p className="text-gray-600 mb-6">
          Let FinMatch bring you one step closer to achieving your financial goals with tailored expertise and effortless matching.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg">
          Get Started Today
        </Button>
      </div>
    </div>
  );
}
