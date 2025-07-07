import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Laptop, 
  Gamepad2, 
  Tv, 
  Tablet, 
  Headphones,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Electronics Repair Service
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert technicians, quality parts, and guaranteed satisfaction for all your electronic devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Devices We Repair
            </h2>
            <p className="text-xl text-gray-600">
              We specialize in repairing all types of electronic devices with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: Smartphone, name: 'Mobile Phones' },
              { icon: Laptop, name: 'Laptops' },
              { icon: Gamepad2, name: 'Gaming Consoles' },
              { icon: Tv, name: 'Smart TVs' },
              { icon: Tablet, name: 'Tablets' },
              { icon: Headphones, name: 'Audio Devices' },
            ].map((service, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transform transition-transform">
                  <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ElectroRepair?
            </h2>
            <p className="text-xl text-gray-600">
              We provide reliable, efficient, and professional repair services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Quality Guarantee',
                description: 'All repairs come with a comprehensive warranty and quality assurance.',
              },
              {
                icon: Clock,
                title: 'Fast Turnaround',
                description: 'Most repairs completed within 2-4 days with express options available.',
              },
              {
                icon: CheckCircle,
                title: 'Expert Technicians',
                description: 'Certified professionals with years of experience in electronics repair.',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Repair Your Device?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust us with their electronics.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Book Your Repair
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;